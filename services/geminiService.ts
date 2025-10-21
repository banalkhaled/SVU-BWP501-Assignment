
import { GoogleGenAI } from "@google/genai";
import { EventCategory } from '../types';

export async function generateEventDescription(title: string, category: EventCategory): Promise<string> {
  try {
    if (!process.env.API_KEY) {
        return "مفتاح API غير متوفر. يرجى إعداد متغير البيئة API_KEY.";
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `اكتب وصفًا جذابًا ومختصرًا لفعالية بعنوان "${title}" من فئة "${category}". يجب أن يكون الوصف باللغة العربية ومناسبًا للعرض في دليل فعاليات المدينة.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    return "عذرًا، حدث خطأ أثناء إنشاء الوصف. يرجى المحاولة مرة أخرى.";
  }
}
