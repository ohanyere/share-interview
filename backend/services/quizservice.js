import { GoogleGenerativeAI } from "@google/generative-ai";
const b = process.env.GENAI_API_KEY
const genAI = new GoogleGenerativeAI(b);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuizAnswers({ questions }) {
  const prompt = `
  You are a knowledgeable tutor. 
  Provide clear and correct answers to the following quiz questions.
  Return your response strictly as a JSON array where each item has:
  {
    "question": "...",
    "answer": "..."
  }

  Questions:
  ${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = await response.text();

  
  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/```(json)?/g, "").trim();
  }

  let answersJSON;
  try {
    answersJSON = JSON.parse(text);
  } catch (err) {
    throw new Error("Gemini response was not valid JSON: " + text);
  }

  return answersJSON;
}
