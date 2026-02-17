'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

// Basic disposable email domains list
const DISPOSABLE_DOMAINS = [
    'mailinator.com',
    'yopmail.com',
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'temp-mail.org',
    'throwawaymail.com',
];

export async function login(formData: FormData) {
    const supabase = await createClient()

    if (!supabase) {
        redirect('/login?error=Service unavailable')
    }

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    if (!supabase) {
        redirect('/login?error=Service unavailable')
    }

    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const referralCode = formData.get('referral_code') as string

    // 1. Check Disposable Email
    const domain = email.split('@')[1]?.toLowerCase()
    if (DISPOSABLE_DOMAINS.includes(domain)) {
        redirect('/login?error=Disposable email addresses are not allowed for trials.')
    }

    // 2. Check IP Fraud (Limit 2 accounts per IP for trial)
    const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('signup_ip', ip);

    if (!countError && count && count >= 2) {
        redirect('/login?error=Trial account limit reached for this connection.')
    }

    // 3. Handle Referral if present
    let referredBy = null
    if (referralCode) {
        const { data: referrer } = await supabase
            .from('profiles')
            .select('id')
            .eq('referral_code', referralCode)
            .single()

        if (referrer) {
            referredBy = referrer.id
        }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                signup_ip: ip,
                referred_by: referredBy,
            }
        }
    })

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await createClient()

    if (!supabase) {
        redirect('/login')
    }

    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
