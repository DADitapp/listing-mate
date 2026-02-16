
import { NextResponse } from 'next/server';
import { generateListingPackage } from '@/services/aiService';
import { ListingInput } from '@/types/listing';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user profile to check subscription and trial status
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('subscription_status, trial_listings_used')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        const isPro = profile.subscription_status === 'pro';
        const trialLimit = 5;

        const body = await req.json();
        const input: ListingInput = body.input;

        if (!input) {
            return NextResponse.json({ error: 'Input is required' }, { status: 400 });
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

        // If it's a new generation, check trial limits for free users
        if (!isPro && profile.trial_listings_used >= trialLimit) {
            return NextResponse.json(
                { error: 'Trial limit reached. Please upgrade to Pro for unlimited generations.' },
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
            // Increment trial count for free users
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
