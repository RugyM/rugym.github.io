import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    companyName: { type: String },
    jobTitle: { type: String },
    industrySpecialization: { type: String },
  },
  {
    timestamps: true,
  },
);

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

export default Recruiter;
