import Quiz from "../models/Quiz.js";
import { v4 as uuidv4 } from "uuid";

// Create a quiz for a specific student
export const createQuiz = async (req, res) => {
  const {
    title,
    description,
    studentNames,
    questions,
    recruiterId,
    paymentRequired = true,
    attemptLimit = 1,
  } = req.body;

  if (
    !title ||
    !studentNames ||
    !questions ||
    questions.length === 0 ||
    !recruiterId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Quiz title, student name, recruiter ID, and at least one question are required.",
    });
  }

  for (let question of questions) {
    if (!question.title || !question.scenario) {
      return res.status(400).json({
        success: false,
        message: "Each question must have a title and a scenario.",
      });
    }
    // Initialize answer and feedback to null.
    question.answer = null;
    question.feedback = null;
  }

  try {
    const existingQuiz = await Quiz.findOne({
      title,
      studentNames: { $in: studentNames },
      recruiterId,
    });
    if (existingQuiz) {
      return res.status(400).json({
        success: false,
        message:
          "A quiz with this title for this student by this recruiter already exists.",
      });
    }

    const quiz = new Quiz({
      title,
      description,
      studentNames,
      recruiterId,
      questions,
      paymentRequired,
      attemptLimit,
    });

    await quiz.save();

    return res.status(201).json({
      success: true,
      message: "Assessment created successfully.",
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update an existing quiz by ID
export const updateQuiz = async (req, res) => {
  try {
    if (req.body.questionId && req.body.feedback !== undefined) {
      const { questionId, feedback } = req.body; // Scoped inside the condition

      // Update feedback for a specific question
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res
          .status(404)
          .json({ success: false, message: "Quiz not found" });
      }

      const question = quiz.questions.id(questionId);
      if (!question) {
        return res
          .status(404)
          .json({ success: false, message: "Question not found" });
      }

      question.feedback = feedback; // Update the feedback field
      await quiz.save(); // Save the updated quiz

      return res.status(200).json({
        success: true,
        message: "Feedback updated successfully",
        quiz,
      });
    } else {
      // General quiz update logic
      const quiz = await Quiz.findById(req.params.id);
      const studentNames = req.body.studentNames?.map((student) => {
        const existingStudent = quiz.studentNames.find(
          (existingStudent) => existingStudent.name === student.name,
        );
        return existingStudent
          ? { id: existingStudent.id, name: student.name }
          : { id: uuidv4(), name: student.name };
      });

      const { recruiterId, ...updatedData } = req.body;
      updatedData.studentNames = studentNames;

      const updatedQuiz = await Quiz.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true },
      );

      if (!updatedQuiz) {
        return res
          .status(404)
          .json({ success: false, message: "Quiz not found" });
      }

      return res.status(200).json({ success: true, quiz: updatedQuiz });
    }
  } catch (error) {
    console.error("Error updating quiz:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch a quiz by ID
export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    return res.status(200).json({ success: true, quiz });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all quizzes (for Admin to view all quizzes)
// server/controllers/quizController.js
export const getAllQuizzes = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      // Show all quizzes
      const quizzes = await Quiz.find();
      return res.json({ quizzes });
    } else if (req.user.role === "Recruiter") {
      // Show only quizzes created by that recruiter
      const quizzes = await Quiz.find({ recruiterId: req.user.userId });
      return res.json({ quizzes });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Submit a quiz
export const submitQuiz = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }
    if (!answers || !Array.isArray(answers)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid answers format" });
    }
    // (Quiz submission logic may be implemented here)
    return res
      .status(200)
      .json({ success: true, message: "Quiz submitted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Give Feedback to an attempted quiz
export const giveFeedback = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentId, questionId, feedback } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Find student attempt
    const studentAttempt = quiz.studentAttempts.find(
      (attempt) => attempt.studentId === studentId,
    );
    if (!studentAttempt)
      return res.status(404).json({ message: "Student attempt not found" });

    // Find the question index in the quiz
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === questionId,
    );
    if (questionIndex === -1)
      return res.status(404).json({ message: "Question not found" });

    // Get the corresponding answer using the question index
    const answer = studentAttempt.answers[questionIndex];
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    // Update feedback
    answer.feedback = feedback;
    await quiz.save();

    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json({ message: "Assessment deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error.message);
    res.status(500).json({ message: "Failed to delete quiz" });
  }
};
