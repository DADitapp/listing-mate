import { getOpenAIClient } from '@/lib/openai';
import { ListingInput, ListingOutput } from '@/types/listing';

const SYSTEM_PROMPT = `You are a senior real estate copywriter with 15+ years of experience writing high-converting MLS listing descriptions.
You understand MLS compliance, persuasive property marketing, and buyer psychology.
Your writing is professional, specific, and persuasive without being exaggerated.

CRITICAL RULES:
- You MUST use the EXACT property details provided (address, beds, baths, sqft, price). NEVER invent or change these values.
- NEVER use emojis or excessive exclamation marks.
- Avoid Fair Housing violations (no references to race, religion, national origin, sex, familial status, disability, or neighborhood demographics).
- Always highlight the most valuable selling points and use vivid but accurate descriptions.
- If no special features are provided, focus on the property's location, layout, and value proposition.
- Match the requested tone precisely.`;

export async function generateListingPackage(input: ListingInput): Promise<ListingOutput> {
    const prompt = `Write a complete real estate marketing package for the following property:
  
  Address: ${input.address}
  Bedrooms: ${input.beds}
  Bathrooms: ${input.baths}
  Square Feet: ${input.sqft}
  Price: ${input.price}
  Features: ${input.features || 'None specified'}
  Tone: ${input.tone || 'Professional'}

  IMPORTANT: You MUST use the EXACT details above. Do NOT change the number of bedrooms, bathrooms, square footage, or price. These are verified facts.

  Generate the following 5 outputs in valid JSON format:
  1. "mlsDescription": A professional MLS listing description (150-250 words) using the EXACT property details above.
  2. "socialMediaPost": An object with "facebook" and "instagram" posts.
  3. "emailAnnouncement": An object with a "subject" line and "body" for an email blast.
  4. "shortDescription": A 50-80 word summary for Zillow/portals.
  5. "headlines": An array of 5 catchy headlines.

  Ensure the output is strictly valid JSON with these exact keys.`;

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
