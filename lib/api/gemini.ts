import { GoogleGenAI } from '@google/genai';
import { Course } from '../../types/course';

// This function is used to get the Gemini client
const getGeminiClient = () => {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API key is missing. Please set EXPO_PUBLIC_GEMINI_API_KEY in your .env file.');
    }
    return new GoogleGenAI({
        apiKey,
    });
};

export const getSmartRecommendations = async (query: string, courses: Course[]): Promise<string[]> => {
    if (!query.trim() || courses.length === 0) return [];

    try {
        const genAI = getGeminiClient();

        const courseDataStr = courses.map(c => `ID:"${c.id}"|Title:"${c.title}"|Desc:"${c.description}"|Cat:"${c.category}"`).join('\n');

        const prompt = `You are an AI course recommendation engine. 
Your ONLY job is to return a comma-separated list of course IDs that best match the user's query based on the provided course list.
NEVER explain your reasoning. NEVER apologize. NEVER return any text other than the comma-separated IDs.
If no courses match, return the single word "NONE".

=== AVAILABLE COURSES ===
${courseDataStr}

=== USER QUERY ===
"${query}"

RETURN EXACTLY 1 to 5 COURSE IDs, COMMA-SEPARATED:`;

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        let content = response.text?.trim() || '';
        console.log('Gemini raw response:', content);

        if (!content || content.toUpperCase() === 'NONE') return [];

        content = content.replace(/```[a-z]*\n/gi, '').replace(/```/g, '').trim();

        const recommendedIds = content.split(',').map(id => id.trim()).filter(id => id.length > 0);
        console.log('Parsed recommended IDs:', recommendedIds);

        return recommendedIds;
    } catch (error) {
        console.error('Gemini Smart Search Error:', error);
        throw error;
    }
};