export type Region = 'ZA' | 'US' | 'UK' | 'AU';

export interface RegionConfig {
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
    areaUnit: string;
    areaUnitLabel: string;
    listingTerminology: {
        /** What to call the main listing description */
        descriptionLabel: string;
        /** Tab label for the description */
        descriptionTab: string;
        /** What to call the portal/short description */
        portalLabel: string;
        /** Portal tab label */
        portalTab: string;
        /** Portal examples */
        portalExamples: string;
    };
    tones: string[];
    /** Placeholder for the address field */
    addressPlaceholder: string;
    /** Placeholder for the price field */
    pricePlaceholder: string;
    /** Examples of portals for marketing */
    portalBrands: string[];
    /** Additional SA-specific feature categories */
    extraFeatures?: Record<string, string[]>;
}

export const REGION_CONFIGS: Record<Region, RegionConfig> = {
    ZA: {
        name: 'South Africa',
        flag: '🇿🇦',
        currency: 'ZAR',
        currencySymbol: 'R',
        areaUnit: 'sqm',
        areaUnitLabel: 'm²',
        listingTerminology: {
            descriptionLabel: 'Listing Description',
            descriptionTab: 'Listing',
            portalLabel: 'Portal Description (Property24)',
            portalTab: 'Portal',
            portalExamples: 'Property24/Private Property',
        },
        tones: ['Standard', 'Luxury', 'Family', 'Investor', 'Coastal', 'Estate Living', 'Security Estate', 'Golf Estate'],
        addressPlaceholder: 'e.g. 12 Ocean View Dr, Camps Bay, Cape Town',
        pricePlaceholder: '3,500,000',
        portalBrands: ['PROPERTY24', 'PRIVATE PROPERTY', 'RE/MAX', 'PAM GOLDING', 'SEEFF'],
        extraFeatures: {
            'Security & Estate': [
                'Security Estate', 'Gated Community', '24hr Security',
                'Electric Fencing', 'CCTV', 'Guard House',
                'Alarm System', 'Beams', 'Security Gates'
            ],
            'Outdoor Living': [
                'Braai Area', 'Lapa', 'Boma',
                'Jacuzzi', 'Koi Pond', 'Fruit Trees',
                'Staff Quarters', 'Flatlet', 'Granny Flat'
            ],
        },
    },
    US: {
        name: 'United States',
        flag: '🇺🇸',
        currency: 'USD',
        currencySymbol: '$',
        areaUnit: 'sqft',
        areaUnitLabel: 'sq ft',
        listingTerminology: {
            descriptionLabel: 'MLS Description',
            descriptionTab: 'MLS',
            portalLabel: 'Short Description (Zillow/Portal)',
            portalTab: 'Zillow',
            portalExamples: 'Zillow/Realtor.com',
        },
        tones: ['Standard', 'Luxury', 'Family', 'Investor'],
        addressPlaceholder: 'e.g. 123 Main St, Anytown, NC 27000',
        pricePlaceholder: '250,000',
        portalBrands: ['ZILLOW', 'MLS', 'COMPASS', 'RE/MAX', 'KELLER WILLIAMS'],
    },
    UK: {
        name: 'United Kingdom',
        flag: '🇬🇧',
        currency: 'GBP',
        currencySymbol: '£',
        areaUnit: 'sqft',
        areaUnitLabel: 'sq ft',
        listingTerminology: {
            descriptionLabel: 'Property Description',
            descriptionTab: 'Description',
            portalLabel: 'Portal Description (Rightmove)',
            portalTab: 'Portal',
            portalExamples: 'Rightmove/Zoopla',
        },
        tones: ['Standard', 'Luxury', 'Family', 'Investor', 'Period Property', 'New Build'],
        addressPlaceholder: 'e.g. 14 Kensington Gardens, London SW7',
        pricePlaceholder: '450,000',
        portalBrands: ['RIGHTMOVE', 'ZOOPLA', 'ONTHEMARKET', 'PURPLEBRICKS', 'FOXTONS'],
    },
    AU: {
        name: 'Australia',
        flag: '🇦🇺',
        currency: 'AUD',
        currencySymbol: '$',
        areaUnit: 'sqm',
        areaUnitLabel: 'm²',
        listingTerminology: {
            descriptionLabel: 'Property Description',
            descriptionTab: 'Description',
            portalLabel: 'Portal Description (Domain)',
            portalTab: 'Portal',
            portalExamples: 'Domain/realestate.com.au',
        },
        tones: ['Standard', 'Luxury', 'Family', 'Investor', 'Coastal', 'Rural'],
        addressPlaceholder: 'e.g. 42 Harbour St, Sydney NSW 2000',
        pricePlaceholder: '850,000',
        portalBrands: ['DOMAIN', 'REALESTATE.COM.AU', 'RAY WHITE', 'LJ HOOKER', 'MCGRATH'],
    },
};

export function getRegionConfig(region: Region): RegionConfig {
    return REGION_CONFIGS[region];
}
