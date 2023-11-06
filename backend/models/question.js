import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ["choice", "truefalse", "shortanswer"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [String], // For choice questions
  correctAnswer: String, // For choice and short answer questions
  isTrue: Boolean, // For true/false questions
});

export const Question = mongoose.model("Question", questionSchema);
