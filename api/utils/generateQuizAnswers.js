import { geminiModel } from "./geminiClient.js"; 

export async function generateQuizAnswers({ questions }) {
  const prompt = `
    You are a knowledgeable tutor. 
    Provide clear, correct answers to the following quiz questions.
    Return your response STRICTLY as a JSON array with items like this:

    {
      "question": "...",
      "answer": "..."
    }

    Questions:
    ${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
  `;


  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  let text = await response.text();

  text = text.trim();
  if (text.startsWith("```")) {
    text = text.replace(/```(json)?/g, "").trim();
  }


  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("Gemini response was not valid JSON: " + text);
  }
}
