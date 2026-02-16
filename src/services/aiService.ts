import { getOpenAIClient } from '@/lib/openai';
import { ListingInput, ListingOutput } from '@/types/listing';
import { getRegionConfig } from '@/config/regions';

const SYSTEM_PROMPT = `You are a senior real estate copywriter with 15+ years of international experience writing high-converting property listing descriptions.
You understand property marketing compliance, persuasive marketing, and buyer psychology across different markets.
Your writing is professional, specific, and persuasive without being exaggerated.

CRITICAL ACCURACY RULES — VIOLATION OF THESE IS UNACCEPTABLE:
1. You MUST use the EXACT property details provided: address, bedrooms, bathrooms, size, and price. NEVER change these numbers.
2. You may ONLY describe features that are EXPLICITLY listed in the "Features" field. Do NOT invent features, rooms, amenities, or upgrades that were not provided.
3. If no features are provided, write a general description focusing on the property's basics (location, size, layout, value) without mentioning specific finishes, appliances, or amenities.
4. NEVER use emojis or excessive exclamation marks.
5. Use the correct terminology, units, and currency for the specified region.
6. Match the requested tone precisely.`;

export async function generateListingPackage(input: ListingInput): Promise<ListingOutput> {
  const region = input.region || 'US';
  const config = getRegionConfig(region);
  const hasFeatures = input.features && input.features.trim().length > 0;

  const areaLabel = config.areaUnit === 'sqm' ? 'square meters' : 'square feet';
  const portalExamples = config.listingTerminology.portalExamples;
  const descriptionType = config.listingTerminology.descriptionLabel;

  const prompt = `Write a complete property marketing package for this listing.

REGION: ${config.name} (${region})
Use ${config.currency} (${config.currencySymbol}) for currency and ${areaLabel} for measurements.
${region === 'ZA' ? 'Do NOT use the term "MLS" — South Africa uses property portals like Property24 and Private Property. Use terminology familiar to South African estate agents.' : ''}
${region === 'UK' ? 'Use British English spelling and terminology (e.g., "lounge" not "living room", "garden" not "yard").' : ''}
${region === 'AU' ? 'Use Australian English and terminology.' : ''}

PROPERTY FACTS (use these EXACTLY — do not change any numbers):
- Address: ${input.address}
- Bedrooms: ${input.beds}
- Bathrooms: ${input.baths}
- Size: ${input.sqft} ${areaLabel}
- Listed Price: ${config.currencySymbol}${input.price}
- Tone: ${input.tone || 'Standard'}
${hasFeatures ? `- Verified Features: ${input.features}` : '- Features: None specified. Do NOT invent any features.'}

${hasFeatures
      ? 'IMPORTANT: Only mention the features listed above. Do NOT add features that were not provided.'
      : 'IMPORTANT: Since no specific features were listed, write a general description about the home\'s basics — size, layout, location appeal, and value proposition. Do NOT mention specific finishes, appliances, upgrades, or amenities.'}

Generate the following in valid JSON format with these exact keys:
{
  "mlsDescription": "Professional ${descriptionType}, 150-250 words, using ONLY the facts and features above. Written for ${config.name} estate agents.",
  "socialMediaPost": {
    "facebook": "Engaging Facebook post with the property facts, using ${config.currencySymbol} for price",
    "instagram": "Instagram caption with relevant hashtags${region === 'ZA' ? ' including #Property24 #SouthAfricanProperty' : ''}"
  },
  "emailAnnouncement": {
    "subject": "Email subject line",
    "body": "Email body for agent's contact list"
  },
  "shortDescription": "50-80 word summary for ${portalExamples}",
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
