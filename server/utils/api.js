import axios from "axios";

export const executeCode = async (language, sourceCode) => {
  try {
    const response = await axios.post("/api/users/execute-code", {
      language,
      sourceCode,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Code execution failed");
  }
};
