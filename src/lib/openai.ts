import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

export const getOpenAIClient = () => {
    if (!openaiInstance) {
        const apiKey = process.env.OPENAI_API_KEY;

        // In build environments, we might not have the API key.
        // We only throw if we're actually trying to use it in a real request.
        if (!apiKey && typeof window === 'undefined') {
            // Return a dummy instance during build if necessary, 
            // but usually just avoiding the constructor throw is enough.
            return new OpenAI({ apiKey: 'dummy-key-for-build' });
        }

        openaiInstance = new OpenAI({
            apiKey: apiKey,
        });
    }
    return openaiInstance;
};

// Deprecated: Use getOpenAIClient() instead. 
// Keeping this for compatibility during transition if needed, but better to refactor.
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
});
