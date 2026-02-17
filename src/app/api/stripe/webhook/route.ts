
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event

    try {
        const stripe = getStripeClient()
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
    }

    const session = event.data.object as any

    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata.userId
        const region = session.metadata.region || 'ZA'
        const tier = session.metadata.tier || 'pro'

        // 1. Update user to paid status with region lock
        const { data: profile, error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({
                subscription_status: tier,
                subscription_region: region,
                stripe_customer_id: session.customer as string,
            })
            .eq('id', userId)
            .select('referred_by')
            .single()

        // 2. Handle Referral Reward Logic
        if (!updateError && profile?.referred_by) {
            console.log(`User ${userId} referred by ${profile.referred_by}. Triggering 1-month reward.`);
            await supabaseAdmin.rpc('increment_referral_reward', { referrer_id: profile.referred_by });
        }
    }

    if (event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as any
        const customerId = subscription.customer as string

        await supabaseAdmin
            .from('profiles')
            .update({
                subscription_status: 'free',
                subscription_region: null,
            })
            .eq('stripe_customer_id', customerId)
    }

    return NextResponse.json({ received: true })
}
