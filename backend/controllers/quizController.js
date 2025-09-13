import asyncHandler from "express-async-handler";

import { generateQuizAnswers } from "../services/quizservice.js";


const createQuiz = asyncHandler(async (req, res) => {
  const { questions } = req.body;

  if (!Array.isArray(questions)) {
     res.status(400)
      throw new Error("Missing required fields" )
  }

  const answers = await generateQuizAnswers({ questions });

  const quizData = {
    answers,
  };
  console.log(quizData)

  res.json(quizData);
});

export default createQuiz