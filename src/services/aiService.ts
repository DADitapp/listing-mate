import { openai } from '@/lib/openai';
import { ListingInput, ListingOutput } from '@/types/listing';

const SYSTEM_PROMPT = `You are a senior real estate copywriter with 15+ years of experience writing high-converting MLS listing descriptions.
You understand MLS compliance, persuasive property marketing, and buyer psychology.
Your writing is professional, specific, and persuasive without being exaggerated.
NERVER use emojis or excessive exclamation marks. Avoid Fair Housing violations.
Always highlight the most valuable selling points and use vivid but accurate descriptions.`;

export async function generateListingPackage(input: ListingInput): Promise<ListingOutput> {
    const prompt = `Write a complete real estate marketing package for the following property:
  
  Address: \${input.address}
  Bedrooms: \${input.beds}
  Bathrooms: \${input.baths}
  Square Feet: \${input.sqft}
  Price: \${input.price}
  Features: \${input.features}
  Tone: \${input.tone}

  Generate the following 5 outputs in valid JSON format:
  1. mlsDescription: A professional MLS listing description (150-250 words).
  2. socialMediaPost: An object with 'facebook' and 'instagram' posts.
  3. emailAnnouncement: An object with a 'subject' line and 'body' for an email.
  4. shortDescription: A 50-80 word summary for Zillow/portals.
  5. headlines: An array of 5 catchy headlines.

  Ensure the output is strictly valid JSON.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('Failed to generate content');

    return JSON.parse(content) as ListingOutput;
}
