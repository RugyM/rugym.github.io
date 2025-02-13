import User from "../models/User.js";
import Quiz from "../models/Quiz.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "../utils/constants.js";
import { exec } from "child_process";

/**
 * Register a new user.
 * For demonstration, we hash the password when registering new users.
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: "Recruiter",
    });

    await user.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Login a user.
 * For testing, we are performing a plain text comparison of passwords.
 * (In production, you must compare hashed values using bcrypt.compare.)
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10h" },
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username, // Include username here
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    let updatedFields = { ...rest };

    if (password) {
      // Hash the new password if it's provided
      updatedFields.password = await bcrypt.hash(password, 10);
    }

    // Update the user in the database
    const user = await User.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true, // Return the updated document
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Guest accesses a quiz (for guest layout)
export const getQuizForGuest = async (req, res) => {
  const { id, studentId } = req.params;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const student = quiz.studentNames.find(
      (student) => student.id === studentId,
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ success: true, quiz, student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Guest attempts a quiz
export const attemptQuiz = async (req, res) => {
  try {
    const { id, studentId } = req.params;
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const student = quiz.studentNames.find(
      (student) => student.id === studentId,
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (student.attemptLimit <= 0) {
      return res.status(403).json({ message: "Quiz already attempted" });
    }

    student.attemptLimit -= 1;

    const existingAttempt = quiz.studentAttempts.find(
      (attempt) => attempt.studentId === studentId,
    );

    if (existingAttempt) {
      existingAttempt.answers = req.body.answers;
      existingAttempt.submitted = true;
    } else {
      quiz.studentAttempts.push({
        studentId,
        answers: req.body.answers,
        submitted: true,
      });
    }

    await quiz.save();
    res.json({ message: "Quiz submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const executeCode = async (req, res) => {
  const { language, sourceCode, version } = req.body;

  if (!language || !sourceCode) {
    return res
      .status(400)
      .json({ message: "Language and source code are required." });
  }
  if (language === "nextflow") {
    try {
      const command = `echo "${sourceCode}" | nextflow run -`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Execution error: ${error.message}`);
          return res
            .status(500)
            .json({ message: "Execution failed", error: error.message });
        }
        if (stderr) {
          console.error(`Execution stderr: ${stderr}`);
          return res
            .status(500)
            .json({ message: "Execution error", error: stderr });
        }
        return res.status(200).json({ output: stdout });
      });
    } catch (error) {
      console.error("Execution Error:", error);
      res
        .status(500)
        .json({ message: "Execution failed", error: error.message });
    }
  } else {
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: language,
          version: version || LANGUAGE_VERSIONS[language],
          files: [{ content: sourceCode }],
        },
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error executing code:",
        error.response?.data || error.message,
      );
      res
        .status(500)
        .json({ message: "Failed to execute code", error: error.message });
    }
  }
};
