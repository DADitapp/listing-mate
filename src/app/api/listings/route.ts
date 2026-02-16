
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    try {
        const supabase = await createClient();

        if (!supabase) {
            return NextResponse.json({ error: 'Supabase services are not yet configured.' }, { status: 503 });
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('listings')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Fetch Listings Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch listings' },
            { status: 500 }
        );
    }
}
