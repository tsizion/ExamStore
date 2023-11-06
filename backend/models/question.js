import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.ObjectId,
    ref: "exams",
    required: true,
  },
  question_type: {
    type: String,
    enum: ["multiple_choice", "blank_space", "short_answer"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
  description: String,
});

export const Question = mongoose.model("Question", questionSchema);
