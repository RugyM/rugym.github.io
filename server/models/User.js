import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  phone: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["Admin", "Recruiter", "Student"],
    default: "Recruiter",
  },
  companyName: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
  industrySpecialization: { type: String, default: "" },
});

export default mongoose.model("User", userSchema);
