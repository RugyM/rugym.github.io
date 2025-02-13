import { useState, useEffect } from "react";
import { Formik, Field, FieldArray, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import RichTextEditor from "../ui/RichTextEditor";

// Validation schema updated to reflect the new structure.
const validationSchema = Yup.object({
  title: Yup.string().required("Quiz title is required"),
  description: Yup.string().required("Description is required"),
  // studentName: Yup.string().required("Student name is required"),
  studentNames: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Student name is required"),
      }),
    )
    .min(1, "At least one student is required"),
  questions: Yup.array()
    .of(
      Yup.object({
        title: Yup.string().required("Question title is required"),
        scenario: Yup.string().required("Scenario is required"),
      }),
    )
    .required("At least one question is required"),
});

const QuizCreateForm = ({
  quiz,
  recruiterId,
  onSubmit,
  closeForm,
  resetForm,
  setShowQuizTable,
}) => {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [isSubmitShaking, setIsSubmitShaking] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    if (quiz) {
      setOpenQuestions([]);
    }
  }, [quiz]);

  const handleBackToQuizTable = () => {
    setShowQuizTable(true);
  };

  const toggleQuestion = (index: number) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((i) => i !== index));
    } else {
      setOpenQuestions([index]);
    }
  };

  const handleAddQuestion = (arrayHelpers: any, values: any) => {
    const lastQuestion = values.questions[values.questions.length - 1];
    if (lastQuestion && (!lastQuestion.title || !lastQuestion.scenario)) {
      setShakeIndex(values.questions.length - 1);
      setTimeout(() => setShakeIndex(null), 500);
    } else {
      setOpenQuestions([]);
      arrayHelpers.push({ title: "", scenario: "" });
    }
  };

  const handleDeleteQuestion = (index: number) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteQuestion = (arrayHelpers: any) => {
    if (deleteIndex !== null) {
      if (arrayHelpers.form.values.questions.length === 1) {
        // If it's the only question, clear the values
        arrayHelpers.replace(deleteIndex, { title: "", scenario: "" });
      } else {
        // Remove the question if there are multiple questions
        arrayHelpers.remove(deleteIndex);
      }
      setDeleteIndex(null);
      setShowDeleteModal(false);
    }
  };
  const [shakeStudentIndex, setShakeStudentIndex] = useState<number | null>(
    null,
  );

  const handleAddStudent = (arrayHelpers, values) => {
    const lastStudentIndex = values.studentNames.length - 1;
    if (values.studentNames[lastStudentIndex]?.name?.trim()) {
      arrayHelpers.push({ name: "" });
    } else {
      setShakeStudentIndex(lastStudentIndex);
      setTimeout(() => setShakeStudentIndex(null), 500);
    }
  };

  return (
    <div
      className={`rounded-lg bg-white ${quiz ? "p-6" : "py-4"} transition-all dark:bg-gray-800`}
    >
      {quiz && (
        <>
          <button
            onClick={handleBackToQuizTable}
            className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Back to Quiz List
          </button>
          <h2 className="py-6 text-center text-3xl font-semibold capitalize text-white">
            Editing Quiz: <span className="text-4xl">{quiz?.title}</span>
          </h2>
        </>
      )}
      <Formik
        initialValues={{
          id: quiz?._id || "",
          title: quiz?.title || "",
          description: quiz?.description || "",
          // studentName: quiz?.studentName || "",
          studentNames:
            quiz?.studentNames && quiz.studentNames.length > 0
              ? quiz.studentNames.map((student) => ({ name: student.name }))
              : [{ name: "" }],
          recruiterId: recruiterId,
          questions: quiz?.questions || [
            {
              title: "",
              scenario: "",
            },
          ],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
          onSubmit(values, formikHelpers);
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Assessment Information
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200">
                    Assessment Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Enter assessment title"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Enter description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200">
                    Candidate Name
                  </label>
                  <FieldArray
                    name="studentNames"
                    render={(arrayHelpers) => (
                      <div>
                        {values.studentNames.map((student, index) => (
                          <div
                            key={index}
                            className={`mt-2 flex items-center space-x-4 ${
                              shakeStudentIndex === index ? "animate-shake" : ""
                            }`}
                          >
                            <Field
                              type="text"
                              name={`studentNames[${index}].name`}
                              value={student.name || ""} // Ensure value is a string
                              className={`w-full rounded-lg border p-3 ${
                                errors.studentNames?.[index]?.name
                                  ? "border-red-500"
                                  : ""
                              }`}
                              placeholder="Enter candidate name"
                            />
                            {values.studentNames.length > 1 && (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="ml-auto size-7 rounded-full bg-red-300 p-1 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-red-500 dark:hover:text-white"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="size-5"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  ></path>
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                        {errors.studentNames && (
                          <div className="mt-1 text-sm text-red-500">
                            {errors.studentNames.map((error, index) => (
                              <div key={index}>{error.name}</div>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleAddStudent(arrayHelpers, values)}
                          className="mt-4 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-white"
                        >
                          Add Candidate
                        </button>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* Questions Section */}
            <FieldArray
              name="questions"
              render={(arrayHelpers) => (
                <div className="space-y-4">
                  {values.questions.map((question, index) => (
                    <div
                      key={index}
                      className={`border-b pb-4 ${
                        shakeIndex === index ? "animate-shake" : ""
                      } ${
                        errors.questions?.[index]?.title ||
                        errors.questions?.[index]?.scenario
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <div
                        className="flex cursor-pointer items-center justify-between text-xl font-semibold text-gray-800 transition-all hover:text-blue-600 dark:text-white"
                        onClick={() => toggleQuestion(index)}
                      >
                        <div>{question.title || `Question ${index + 1}`}</div>
                        <svg
                          className={`h-5 w-5 transform transition-all ${
                            openQuestions.includes(index) ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {openQuestions.includes(index) && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-gray-700 dark:text-gray-200">
                              Question Title
                            </label>
                            <Field
                              type="text"
                              name={`questions[${index}].title`}
                              className={`mt-2 w-full rounded-lg border p-3 ${
                                errors.questions?.[index]?.title
                                  ? "border-red-500"
                                  : ""
                              }`}
                              placeholder="Enter question title"
                            />
                            <ErrorMessage
                              name={`questions[${index}].title`}
                              component="div"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 dark:text-gray-200">
                              Scenario
                            </label>
                            <RichTextEditor
                              value={values.questions[index].scenario}
                              setValue={(value: string) =>
                                setFieldValue(
                                  `questions[${index}].scenario`,
                                  value,
                                )
                              }
                            />
                            <ErrorMessage
                              name={`questions[${index}].scenario`}
                              component="div"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(index)}
                            className="mt-4 inline-flex items-center rounded-lg bg-red-500 px-4 py-2 text-white"
                          >
                            Remove Question
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddQuestion(arrayHelpers, values)}
                    className="mt-6 inline-flex items-center rounded-lg bg-green-500 px-4 py-2 text-white"
                  >
                    Add Question
                  </button>
                  {/* Delete Modal */}
                  {showDeleteModal && (
                    <div>
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                        aria-hidden="true"
                      >
                        <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                          <button
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <svg
                              className="h-5 w-5"
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
                              />
                            </svg>
                          </button>
                          <div className="p-4 text-center">
                            <svg
                              className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this question?
                            </h3>
                            <button
                              onClick={() =>
                                confirmDeleteQuestion(arrayHelpers)
                              }
                              className="mr-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(false)}
                              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            />
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full rounded-lg bg-blue-500 py-3 text-white ${
                  isSubmitShaking ? "animate-shake" : ""
                }`}
              >
                {quiz ? "Save Changes" : "Create Assessment"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizCreateForm;
