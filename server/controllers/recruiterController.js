import Recruiter from "../models/Recruiter.js";
import Quiz from "../models/Quiz.js";

export const createRecruiter = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      companyName,
      jobTitle,
      industrySpecialization,
      password,
    } = req.body;

    // Check if a recruiter with the given email already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }

    const recruiter = new Recruiter({
      username,
      email,
      phone,
      companyName,
      jobTitle,
      industrySpecialization,
      password, // Raw password, will be hashed by the model
    });

    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all recruiters. (Admin-only)
 */
export const getRecruiters = async (req, res) => {
  try {
    const { email } = req.query;

    if (email) {
      const recruiter = await Recruiter.findOne({ email });
      return res.json({ recruiter });
    }

    const recruiters = await Recruiter.find();
    res.json({ recruiters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a recruiter by ID.
 */
export const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a recruiter by ID.
 */
export const updateRecruiter = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // Update fields
    Object.assign(recruiter, rest);

    // If a new password is provided, it will be hashed by the `pre` hook
    if (password) {
      recruiter.password = password;
    }

    await recruiter.save(); // Save with hashed password if applicable
    res.json(recruiter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a recruiter by ID.
 */
export const deleteRecruiter = async (req, res) => {
  try {
    const deleted = await Recruiter.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Recruiter not found" });
    }
    res.json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get quizzes for the logged-in recruiter.
 * Assumes the verifyToken middleware has attached the token payload
 * on req.user and that req.user.id is available.
 */
export const getRecruiterQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ recruiterId: req.user.id });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
