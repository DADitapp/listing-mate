
import { NextResponse } from 'next/server';
import { generateListingPackage } from '@/services/aiService';
import { ListingInput } from '@/types/listing';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();

        if (!supabase) {
            return NextResponse.json({ error: 'Supabase services are not yet configured.' }, { status: 503 });
        }

        // Securely guard against missing AI credentials to prevent worker crash
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_openai_api_key')) {
            return NextResponse.json({ error: 'OpenAI services are not yet configured.' }, { status: 503 });
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user profile to check subscription and trial status
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('subscription_status, trial_listings_used, subscription_region')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        const isPro = profile.subscription_status === 'pro';
        const isBasic = profile.subscription_status === 'basic';
        const isPaid = isPro || isBasic;
        const trialLimit = 3;
        const basicMonthlyLimit = 10;

        const body = await req.json();
        const input: ListingInput = body.input;

        if (!input) {
            return NextResponse.json({ error: 'Input is required' }, { status: 400 });
        }

        // Region Lock: Paid users can only generate for their subscription region
        if (isPaid && profile.subscription_region && input.region) {
            if (input.region !== profile.subscription_region) {
                return NextResponse.json(
                    { error: `Your subscription covers ${profile.subscription_region} listings only. To generate ${input.region} listings, please update your subscription.` },
                    { status: 403 }
                );
            }
        }

        // Basic validation
        if (!input.address || !input.beds || !input.baths || !input.sqft || !input.price) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        // Strict Counting Logic: Hash the input using Web Crypto API (SHA-256) for Edge compatibility
        const inputString = JSON.stringify({
            address: input.address.toLowerCase().trim(),
            beds: input.beds,
            baths: input.baths,
            sqft: input.sqft,
            price: input.price,
            features: input.features.toLowerCase().trim(),
            tone: input.tone
        });

        const msgBuffer = new TextEncoder().encode(inputString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const inputHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        // Check if this exact generation already exists
        const { data: existingListing } = await supabase
            .from('listings')
            .select('generated_output')
            .eq('user_id', user.id)
            .eq('input_hash', inputHash)
            .single();

        if (existingListing) {
            // Re-use existing generation (doesn't count towards limit)
            return NextResponse.json(existingListing.generated_output);
        }

        // If it's a new generation, check limits based on tier
        if (!isPaid && profile.trial_listings_used >= trialLimit) {
            return NextResponse.json(
                { error: 'Trial limit reached. Please upgrade to continue generating listings.' },
                { status: 403 }
            );
        }

        if (isBasic && profile.trial_listings_used >= basicMonthlyLimit) {
            return NextResponse.json(
                { error: 'Monthly limit reached on Basic plan. Upgrade to Pro for unlimited listings.' },
                { status: 403 }
            );
        }

        // Proceed with AI generation
        const output = await generateListingPackage(input);

        // Save to database with the input hash
        const { error: dbError } = await supabase.from('listings').insert({
            user_id: user.id,
            address: input.address,
            beds: input.beds,
            baths: input.baths,
            sqft: input.sqft,
            price: input.price,
            features: input.features,
            tone: input.tone,
            input_hash: inputHash,
            generated_output: output,
        });

        if (dbError) {
            console.error('Database Save Error:', dbError);
        } else if (!isPro) {
            // Increment usage count for free and basic users
            await supabase
                .from('profiles')
                .update({ trial_listings_used: profile.trial_listings_used + 1 })
                .eq('id', user.id);
        }

        return NextResponse.json(output);
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate listing package' },
            { status: 500 }
        );
    }
}
