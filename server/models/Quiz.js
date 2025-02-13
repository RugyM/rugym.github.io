import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scenario: { type: String, required: true },
  answer: { type: String, default: null },
  answerLanguage: { type: String, default: null },
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    studentNames: {
      type: [
        {
          id: { type: String, default: uuidv4, unique: true },
          name: { type: String, required: true },
          attemptLimit: { type: Number, default: 1 },
        },
      ],
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
      validate: {
        validator: (questions) => questions.length > 0,
        message: "At least one question is required.",
      },
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    paymentRequired: { type: Boolean, default: true },
    orderId: { type: String, unique: true, sparse: true },
    studentAttempts: [
      {
        studentId: {
          type: String,
          ref: "Student",
          required: true,
        },
        answers: {
          type: [
            {
              answer: { type: String },
              language: { type: String },
              feedback: { type: String, default: null },
            },
          ],
          default: [],
        },
        submitted: { type: Boolean, default: false },
        attemptDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Quiz", quizSchema);
