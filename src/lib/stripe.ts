import Stripe from 'stripe'

let stripeInstance: Stripe | null = null;

export const getStripeClient = () => {
    if (!stripeInstance) {
        const apiKey = process.env.STRIPE_SECRET_KEY;

        if (!apiKey && typeof window === 'undefined') {
            // Return a dummy instance for build analysis.
            // API versions must match your project requirement.
            return new Stripe('sk_test_dummy', {
                apiVersion: '2024-12-18.acacia' as any,
            });
        }

        stripeInstance = new Stripe(apiKey!, {
            apiVersion: '2024-12-18.acacia' as any,
            appInfo: {
                name: 'ListingMate',
                version: '1.0.0',
            },
        });
    }
    return stripeInstance;
};

// Deprecated: Use getStripeClient() instead.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
    apiVersion: '2024-12-18.acacia' as any,
});
