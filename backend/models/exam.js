import mongoose from "mongoose";
const examSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    lowerCase:true
  },
  examType: {
    type: String,
    enum: ["MID", "FINAL"],
    required: true,
  },
  year: String,
});

examSchema.index({ courseName: 1, examType: 1, year: 1 }, { unique: true });

export const Exam = mongoose.model("exam", examSchema);
