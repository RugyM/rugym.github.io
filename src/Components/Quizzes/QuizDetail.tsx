import { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAuth } from "../../Providers/AuthContext";
import { executeCode } from "../../../server/utils/api";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

const QuizDetail = ({ selectedQuiz, handleBackClick }) => {
  const { token } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});
  const [updatingFeedback, setUpdatingFeedback] = useState(false);
  const [quizDetails, setQuizDetails] = useState(selectedQuiz);
  const [output, setOutput] = useState("");
  const [expandedStudentIdx, setExpandedStudentIdx] = useState(null);
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState({});

  const requestPayment = quizDetails.paymentRequired;

  useEffect(() => {
    const initialFeedbacks = {};
    selectedQuiz.studentAttempts.forEach((attempt) => {
      attempt.answers.forEach((answer, answerIdx) => {
        // Get corresponding question ID from quiz's questions array
        const questionId = selectedQuiz.questions[answerIdx]?._id;
        if (questionId) {
          initialFeedbacks[`${attempt.studentId}-${questionId}`] =
            answer.feedback || "";
        }
      });
    });
    setFeedbacks(initialFeedbacks);
  }, [selectedQuiz]);

  const toggleStudentAccordion = (idx) => {
    setExpandedStudentIdx(idx === expandedStudentIdx ? null : idx);
  };

  const toggleQuestionAccordion = (studentId, questionIdx) => {
    setExpandedQuestionIdx((prev) => ({
      ...prev,
      [studentId]: questionIdx === prev[studentId] ? null : questionIdx,
    }));
  };

  const totalAmount = selectedQuiz.studentNames.length * 1;

  const copyShareLink = (studentId) => {
    const studentLink = `${window.location.origin}/attempt-quiz/${selectedQuiz._id}/${studentId}`;
    navigator.clipboard.writeText(studentLink);
    setToastMessage("Link copied successfully.");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const handleApprove = async (data) => {
    try {
      const response = await axios.post("/api/payments/capture-order", {
        orderId: data.orderID,
      });

      if (response.data.status === "COMPLETED") {
        // Update backend payment status
        await axios.put(
          `/api/quizzes/${selectedQuiz._id}`,
          { paymentRequired: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // Update local state to reflect payment status change
        setQuizDetails((prev) => ({
          ...prev,
          paymentRequired: false,
        }));

        setShowModal(false);
        setToastMessage("Payment successful. Thank you for your purchase!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        alert("Payment capture failed.");
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFeedbackChange = (studentId, questionId, value) => {
    setFeedbacks((prev) => ({
      ...prev,
      [`${studentId}-${questionId}`]: value,
    }));
  };

  const updateFeedback = async (studentId, questionId) => {
    setUpdatingFeedback(true);
    try {
      const feedback = feedbacks[`${studentId}-${questionId}`]; // Get feedback for the specific student and question
      if (!feedback) {
        alert("Feedback is required");
        return;
      }

      const response = await axios.put(
        `/api/quizzes/${selectedQuiz._id}/feedback`,
        {
          studentId,
          questionId,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setToastMessage("Feedback updated successfully.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    } finally {
      setUpdatingFeedback(false);
    }
  };

  const clickPayButton = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle run code functionality
  const handleRunCode = async (code, language) => {
    if (!code.trim()) {
      setOutput("No code provided.");
      return;
    }
    try {
      const result = await executeCode(language, code);
      const outputData = result.run.output || result.run.stderr || "No output.";
      setOutput(outputData);
    } catch (error) {
      console.error("Execution Error:", error.message);
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <>
      {showToast && (
        <div
          id="toast-success"
          className="fixed right-10 top-24 z-10 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800"
          role="alert"
        >
          <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="size-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{toastMessage}</div>
        </div>
      )}
      {/* Modal for Paypal */}
      {showModal && (
        <div
          id="paypalModalMain"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[50%] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6l8 8M6 14l8-8"
                ></path>
              </svg>
            </button>
            <h2 className="my-5 text-xl font-semibold text-gray-900 dark:text-white">
              Complete Your Payment To Get Shareable Assessment Link
            </h2>

            {/* PayPal Buttons */}
            <div className="mt-6 rounded border border-gray-200 bg-gray-50 px-3 pt-5 dark:bg-gray-200">
              <PayPalScriptProvider
                options={{
                  "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
                }}
              >
                <PayPalButtons
                  createOrder={async () => {
                    try {
                      const response = await axios.post(
                        "/api/payments/create-order",
                        { amount: totalAmount },
                      );
                      return response.data.id;
                    } catch (error) {
                      console.error("Error creating order:", error);
                      alert("Could not initiate payment. Please try again.");
                    }
                  }}
                  onApprove={handleApprove}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    alert("Payment error occurred. Please try again.");
                  }}
                  style={{
                    layout: "vertical",
                    shape: "rect",
                    color: "gold",
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between">
          <button
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            onClick={handleBackClick}
          >
            Back to Assessments
          </button>
          {requestPayment ? (
            <button
              onClick={clickPayButton}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
            >
              <span className="relative rounded bg-white px-4 py-2 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Pay Now ${totalAmount}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              <svg
                className="size-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                />
              </svg>
              <span>Share Links Generated!</span>
            </div>
          )}
        </div>
        <h3 className="mb-3 text-center text-4xl font-semibold text-gray-900 dark:text-white">
          {selectedQuiz.title}
        </h3>
        <p className="mb-3 mt-2 text-center text-lg text-gray-700 dark:text-gray-300">
          {selectedQuiz.description}
        </p>
        <div className="my-5 pt-5">
          <strong className="text-xl text-gray-900 dark:text-white">
            {selectedQuiz.studentNames.length === 1 ? "Student" : "Candidates"}:
          </strong>
          <div
            id="accordion-collapse"
            className="mt-4"
            data-accordion="collapse"
          >
            {selectedQuiz.studentNames.map((student, studentIdx) => (
              <div key={studentIdx}>
                {/* Student Name Row */}
                <span
                  className="mt-4 flex w-full cursor-pointer items-center justify-between gap-2 rounded border border-gray-200 px-4 py-3 font-medium text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                  onClick={() => toggleStudentAccordion(studentIdx)}
                >
                  <span>{student.name}</span>
                  <span className="flex items-center gap-4">
                    {requestPayment ? null : (
                      <button
                        className="rounded-full bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyShareLink(student.id);
                        }}
                      >
                        Copy Share Link
                      </button>
                    )}
                    <svg
                      className={`size-3 transform ${expandedStudentIdx === studentIdx ? "rotate-180" : ""}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </span>
                </span>

                {/* Questions Accordion - Visible only if Student is Expanded */}
                {expandedStudentIdx === studentIdx && (
                  <div
                    className="px-1"
                    id="accordion-collapse"
                    data-accordion="collapse"
                  >
                    {/* <h2 className="py-2 pl-1 text-base font-medium text-gray-900 dark:text-white">
                      Questions:
                    </h2> */}
                    {selectedQuiz.questions.map((question, questionIdx) => {
                      const studentAttempt = selectedQuiz.studentAttempts.find(
                        (attempt) => attempt.studentId === student.id,
                      );
                      const answerData = studentAttempt?.answers[questionIdx];
                      const questionId = question._id;

                      return (
                        <div key={questionId}>
                          {/* Question Title */}
                          <h2
                            id={`accordion-collapse-heading-${studentIdx}-${questionIdx}`}
                          >
                            <button
                              type="button"
                              className="flex w-full items-center justify-between gap-3 border border-gray-200 p-5 font-medium text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                              onClick={() =>
                                toggleQuestionAccordion(student.id, questionIdx)
                              }
                              aria-expanded={
                                expandedQuestionIdx[student.id] === questionIdx
                              }
                              aria-controls={`accordion-collapse-body-${studentIdx}-${questionIdx}`}
                            >
                              <span>{question.title}</span>
                              <svg
                                className={`size-3 transform ${expandedQuestionIdx[student.id] === questionIdx ? "rotate-180" : ""}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5 5 1 1 5"
                                />
                              </svg>
                            </button>
                          </h2>

                          {/* Scenario + Answer + Output */}
                          <div
                            id={`accordion-collapse-body-${studentIdx}-${questionIdx}`}
                            className={`${expandedQuestionIdx[student.id] === questionIdx ? "block" : "hidden"} border border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
                            aria-labelledby={`accordion-collapse-heading-${studentIdx}-${questionIdx}`}
                          >
                            <div className="relative p-5">
                              <p className="mb-2 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                                Scenario:
                              </p>
                              <p
                                className="my-2 text-gray-700 dark:text-gray-300"
                                dangerouslySetInnerHTML={{
                                  __html: question.scenario,
                                }}
                              />

                              <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                Answer:
                              </p>
                              <div className="my-2 text-gray-700 dark:text-gray-300">
                                {answerData?.answer ? (
                                  <>
                                    <p className="mb-2">
                                      Click on{" "}
                                      <span className="text-gray-400 dark:text-white">
                                        "Run Code"
                                      </span>{" "}
                                      button to validate the answer.
                                    </p>
                                    <div className="flex gap-4">
                                      {/* Left Side - Monaco Editor */}
                                      <div className="w-1/2 flex-1 rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                                        <h4 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                                          Language
                                        </h4>
                                        <div className="my-2 w-full rounded-md bg-green-600 px-6 py-2 text-center capitalize text-white">
                                          {answerData.language}
                                        </div>
                                        <MonacoEditor
                                          height="350px"
                                          language={answerData.language}
                                          value={answerData.answer}
                                          className="overflow-hidden rounded-md border border-gray-300 dark:text-white"
                                          theme="vs-dark"
                                          options={{
                                            readOnly: true,
                                            scrollBeyondLastLine: false,
                                            minimap: { enabled: false },
                                            automaticLayout: true,
                                          }}
                                        />
                                      </div>

                                      {/* Right Side - Output Panel */}
                                      <div className="w-1/2 rounded-lg border border-gray-300 p-4 dark:border-gray-700">
                                        <h4 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                                          Output
                                        </h4>
                                        <button
                                          onClick={() =>
                                            handleRunCode(
                                              answerData.answer,
                                              answerData.language,
                                            )
                                          }
                                          className="mt-2 w-full rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600"
                                        >
                                          Run Code
                                        </button>
                                        <div
                                          className="mt-2 rounded-md border border-gray-300 bg-white p-2 dark:bg-gray-700 dark:text-white"
                                          style={{
                                            height: "350px",
                                            overflowY: "auto",
                                          }}
                                        >
                                          <pre className="text-sm text-gray-700 dark:text-white">
                                            {output ||
                                              'Click "Run Code" to see the output here.'}
                                          </pre>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  "Not answered yet"
                                )}
                              </div>

                              {/* Feedback Section */}
                              {answerData?.answer && (
                                <div>
                                  <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    Feedback:
                                  </p>
                                  {/* <textarea
                                    id={`feedback-${student.id}-${question._id}`}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={existingFeedback ?? ""}
                                    onChange={(e) =>
                                      handleFeedbackChange(
                                        student.id,
                                        question._id,
                                        e.target.value,
                                      )
                                    }
                                  /> */}
                                  <textarea
                                    id={`feedback-${student.id}-${questionId}`}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={
                                      feedbacks[
                                        `${student.id}-${questionId}`
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      handleFeedbackChange(
                                        student.id,
                                        questionId, // Use question._id here
                                        e.target.value,
                                      )
                                    }
                                  />

                                  <button
                                    onClick={
                                      () =>
                                        updateFeedback(student.id, questionId) // Use question._id here
                                    }
                                    className={`mt-2 inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                                      updatingFeedback
                                        ? "cursor-not-allowed bg-gray-400 text-white"
                                        : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                    disabled={updatingFeedback}
                                  >
                                    {updatingFeedback
                                      ? "Updating..."
                                      : "Update Feedback"}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizDetail;
