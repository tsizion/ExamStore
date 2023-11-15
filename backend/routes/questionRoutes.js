/* The code is defining a set of routes for a RESTful API using the Express framework in JavaScript. */
import express, { Router } from "express";
const router = express.Router();
import { Question } from "../models/question.js";
import { Exam } from "../models/exam.js";
// route for adding a question
router.post("/questions", async (req, res) => {
  try {
    const {
      examId,
      question_type,
      question,
      choices,
      correctAnswer,
      description,
    } = req.body;

    if (!question_type || !question) {
      return res
        .status(400)
        .json({ error: "questionType and question are required fields" });
    }

    // Create a new question instance based on the extracted data
    const newQuestion = new Question({
      examId,
      question_type,
      question,
      choices,
      correctAnswer,
      description,
    });

    // Save the new question to the database
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/exams", async (req, res) => {
  try {
    const { courseName, examType, year } = req.body;

    if (!courseName || !examType) {
      return res
        .status(400)
        .json({ error: "courseName and examType are required fields" });
    }
    const newExam = new Exam({
      courseName,
      examType,
      year,
    });

    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a route to get all questions
router.get("/questions", async (req, res) => {
  try {
    // Retrieve all questions from the database
    const questions = await Question.find();
    res.status(200).json({ count: questions.length, data: questions });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// get all exams
router.get("/exams", async (req, res) => {
  try {
    // Retrieve all questions from the database
    const exam = await Exam.find();

    res.status(200).json({ count: exam.length, data: exam });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a route to get a question by ID
router.get("/questions/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Retrieve the question by its ID from the database
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a route to update a question by ID
router.put("/questions/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Retrieve the question by its ID from the database
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the question with the data from the request body
    question.questionType = req.body.questionType || question.questionType;
    question.question = req.body.question || question.question;
    question.options = req.body.options || question.options;
    question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
    question.isTrue = req.body.isTrue || question.isTrue;

    // Save the updated question to the database
    const updatedQuestion = await question.save();

    res
      .status(200)
      .json({ message: "question updated", data: updatedQuestion });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Create a route to delete a question by ID
router.delete("/questions/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Check if the question exists by its ID
    const question = await Question.findByIdAndDelete(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Delete the question from the database
    return res.status(200).send({ message: "question deleted succesfully" }); // Respond with a status code of 204 (No Content)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
export default router;
