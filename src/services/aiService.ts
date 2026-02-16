import { getOpenAIClient } from '@/lib/openai';
import { ListingInput, ListingOutput } from '@/types/listing';

const SYSTEM_PROMPT = `You are a senior real estate copywriter with 15+ years of experience writing high-converting MLS listing descriptions.
You understand MLS compliance, persuasive property marketing, and buyer psychology.
Your writing is professional, specific, and persuasive without being exaggerated.

CRITICAL ACCURACY RULES — VIOLATION OF THESE IS UNACCEPTABLE:
1. You MUST use the EXACT property details provided: address, bedrooms, bathrooms, square footage, and price. NEVER change these numbers.
2. You may ONLY describe features that are EXPLICITLY listed in the "Features" field. Do NOT invent features, rooms, amenities, or upgrades that were not provided.
3. If no features are provided, write a general description focusing on the property's basics (location, size, layout, value) without mentioning specific finishes, appliances, or amenities.
4. NEVER use emojis or excessive exclamation marks.
5. Avoid Fair Housing violations (no references to race, religion, national origin, sex, familial status, disability, or neighborhood demographics).
6. Match the requested tone precisely: Standard (professional MLS), Luxury (upscale aspirational), Family (warm, community-focused), Investor (ROI/numbers-focused).`;

export async function generateListingPackage(input: ListingInput): Promise<ListingOutput> {
    const hasFeatures = input.features && input.features.trim().length > 0;

    const prompt = `Write a complete real estate marketing package for this property.

PROPERTY FACTS (use these EXACTLY — do not change any numbers):
- Address: ${input.address}
- Bedrooms: ${input.beds}
- Bathrooms: ${input.baths}
- Square Feet: ${input.sqft}
- Listed Price: $${input.price}
- Tone: ${input.tone || 'Standard'}
${hasFeatures ? `- Verified Features: ${input.features}` : '- Features: None specified. Do NOT invent any features.'}

${hasFeatures
            ? 'IMPORTANT: Only mention the features listed above. Do NOT add features that were not provided.'
            : 'IMPORTANT: Since no specific features were listed, write a general description about the home\'s basics — size, layout, location appeal, and value proposition. Do NOT mention specific finishes, appliances, upgrades, or amenities.'}

Generate the following in valid JSON format with these exact keys:
{
  "mlsDescription": "Professional MLS listing description, 150-250 words, using ONLY the facts and features above",
  "socialMediaPost": {
    "facebook": "Engaging Facebook post with the property facts",
    "instagram": "Instagram caption with relevant hashtags"
  },
  "emailAnnouncement": {
    "subject": "Email subject line",
    "body": "Email body for agent's contact list"
  },
  "shortDescription": "50-80 word summary for Zillow/portals",
  "headlines": ["headline1", "headline2", "headline3", "headline4", "headline5"]
}`;

    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Failed to generate content');

    return JSON.parse(content) as ListingOutput;
}
