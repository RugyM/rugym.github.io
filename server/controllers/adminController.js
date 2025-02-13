import Quiz from "../models/Quiz.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Create Recruiter
export const createRecruiter = async (req, res) => {
  try {
    const { username, email, password, ...rest } = req.body;

    const existingRecruiter = await User.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new User({
      username,
      email,
      password: hashedPassword,
      role: "Recruiter",
      ...rest,
    });

    await newRecruiter.save();
    res.status(201).json({ recruiter: newRecruiter });
  } catch (error) {
    console.error("Error creating recruiter:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update Recruiter
export const updateRecruiter = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updatedFields = { ...rest };

    if (password && password.trim() !== "") {
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    const updatedRecruiter = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true },
    );

    if (!updatedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({ recruiter: updatedRecruiter });
  } catch (error) {
    res.status(500).json({ message: "Error updating recruiter" });
  }
};

// Delete recruiter
export const deleteRecruiter = async (req, res) => {
  try {
    const recruiterId = req.params.id;
    const deletedRecruiter = await User.findByIdAndDelete(recruiterId);
    if (!deletedRecruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    // Delete all quizzes created by the recruiter
    await Quiz.deleteMany({ recruiterId });

    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    console.error("Error deleting recruiter:", error.message);
    res.status(500).json({ message: "Failed to delete recruiter" });
  }
};

// Get all recruiters
export const getAllRecruiters = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Find all users with the role "Recruiter"
    const recruiters = await User.find({ role: "Recruiter" })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCount = await User.countDocuments({ role: "Recruiter" });

    res.json({ recruiters, totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("recruiterId");
    res.json(quizzes);
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

// Bulk delete recruiters
export const bulkDeleteRecruiters = async (req, res) => {
  try {
    const { recruiterIds } = req.body; // Expect an array of recruiter IDs
    if (!Array.isArray(recruiterIds) || recruiterIds.length === 0) {
      return res.status(400).json({ message: "No recruiter IDs provided." });
    }

    // Delete recruiters and their associated quizzes
    await User.deleteMany({ _id: { $in: recruiterIds } });
    await Quiz.deleteMany({ recruiterId: { $in: recruiterIds } });

    res.json({
      message: "Recruiters and associated quizzes deleted successfully.",
    });
  } catch (error) {
    console.error("Error bulk deleting recruiters:", error.message);
    res.status(500).json({ message: "Failed to bulk delete recruiters." });
  }
};

// Bulk delete quizzes
export const bulkDeleteQuizzes = async (req, res) => {
  try {
    const { quizIds } = req.body; // Expect an array of quiz IDs
    if (!Array.isArray(quizIds) || quizIds.length === 0) {
      return res.status(400).json({ message: "No quiz IDs provided." });
    }

    await Quiz.deleteMany({ _id: { $in: quizIds } });

    res.json({ message: "Quizzes deleted successfully." });
  } catch (error) {
    console.error("Error bulk deleting quizzes:", error.message);
    res.status(500).json({ message: "Failed to bulk delete quizzes." });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    // Fetch all recruiters
    const totalRecruiters = await User.countDocuments({ role: "Recruiter" });

    // Fetch all quizzes
    const quizzes = await Quiz.find();
    const totalQuizzes = quizzes.length;

    // Calculate payments
    const totalPayments = quizzes
      .filter((quiz) => !quiz.paymentRequired)
      .reduce((sum, quiz) => sum + quiz.studentNames.length * 10, 0);

    res.status(200).json({
      totalRecruiters,
      totalQuizzes,
      totalPayments,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
