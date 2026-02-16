
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardClient from '@/components/DashboardClient'
import LandingPage from '@/app/landing/page'

export default async function DashboardPage() {
  const supabase = await createClient()

  // If Supabase isn't configured, show landing page
  if (!supabase) {
    return <LandingPage />
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Unauthenticated visitors see the landing page
  if (!user) {
    return <LandingPage />
  }

  // Fetch full profile info
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, trial_listings_used, referral_code')
    .eq('id', user.id)
    .single()

  return (
    <DashboardClient
      userEmail={user.email!}
      subscriptionStatus={profile?.subscription_status || 'free'}
      trialUsed={profile?.trial_listings_used || 0}
      referralCode={profile?.referral_code || ''}
    />
  )
}
