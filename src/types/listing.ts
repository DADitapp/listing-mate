export type ListingTone = 'Standard' | 'Luxury' | 'Family' | 'Investor';

export interface ListingInput {
    address: string;
    beds: string;
    baths: string;
    sqft: string;
    price: string;
    features: string;
    tone: ListingTone;
}

export interface ListingOutput {
    mlsDescription: string;
    socialMediaPost: {
        facebook: string;
        instagram: string;
    };
    emailAnnouncement: {
        subject: string;
        body: string;
    };
    shortDescription: string;
    headlines: string[];
}

export interface Listing {
    id: string;
    userId: string;
    input: ListingInput;
    output: ListingOutput;
    createdAt: string;
}
