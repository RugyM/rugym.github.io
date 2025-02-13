import { useState } from "react";
import QuizDetail from "./QuizDetail";
import QuizPagination from "../Quizzes/QuizPagination";
import DeleteModal from "../../Components/DeleteModal";

const QuizTable = ({
  quizzes,
  onEditQuiz,
  onDeleteQuiz,
  toggleModal,
  currentPage,
  quizzesPerPage,
  onPageChange,
  onBulkDeleteQuizzes,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  const quizzesArray = Array.isArray(quizzes) ? quizzes : [];

  const filteredQuizzes = quizzesArray.filter((quiz) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm) ||
      quiz.studentName.toLowerCase().includes(searchTerm)
    );
  });

  // Pagination logic: slice the filtered quizzes based on the current page
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = filteredQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz,
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackClick = () => {
    setSelectedQuiz(null);
  };

  const confirmSingleDelete = (quiz) => {
    setQuizToDelete(quiz);
    setDeleteMessage(
      `Are you sure you want to delete the assessment "${quiz.title}"?`,
    );
    setIsModalVisible(true);
  };

  const confirmBulkDelete = () => {
    if (selectedQuizzes.length > 0) {
      setQuizToDelete(null);
      setDeleteMessage("Are you sure you want to delete the selected assessments?");
      setIsModalVisible(true);
    }
  };

  const cancelDelete = () => {
    setQuizToDelete(null);
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    if (quizToDelete) {
      // Single delete
      onDeleteQuiz(quizToDelete._id);
    } else {
      // Bulk delete
      onBulkDeleteQuizzes(selectedQuizzes);
      setSelectedQuizzes([]);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <section className="bg-gray-50 antialiased dark:bg-gray-900">
        {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12"> */}
        <div className="">
          <div className="relative border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg">
            {/* Delete Modal */}
            {isModalVisible && (
              <DeleteModal
                isOpen={isModalVisible}
                onConfirm={handleDelete}
                onCancel={cancelDelete}
                message={deleteMessage}
              />
            )}
            {!selectedQuiz && (
              <div className="mx-4 flex flex-col items-stretch justify-between space-y-3 py-4 dark:border-gray-700 md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search for quizzes"
                        required
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                  <button
                    type="button"
                    id="createQuizButton"
                    onClick={toggleModal}
                    className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      className="-ml-1 mr-1.5 h-3.5 w-3.5"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add Assessment
                  </button>
                  <button
                    onClick={confirmBulkDelete}
                    className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white ${
                      selectedQuizzes.length > 0
                        ? "bg-red-700 hover:bg-red-800"
                        : "cursor-not-allowed bg-gray-400"
                    }`}
                    disabled={selectedQuizzes.length === 0}
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}

            {!selectedQuiz ? (
              <div className="overflow-auto">
                {currentQuizzes.length === 0 ? (
                  <div className="my-6 py-6 text-center text-2xl text-white">
                    No quizzes created yet. Create one!
                  </div>
                ) : currentQuizzes.length === 0 && searchQuery.trim() ? (
                  <div className="my-6 py-6 text-center text-2xl text-white">
                    No search results found. Try a different query.
                  </div>
                ) : (
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedQuizzes(quizzes.map((q) => q._id));
                              } else {
                                setSelectedQuizzes([]);
                              }
                            }}
                            checked={selectedQuizzes.length === quizzes.length}
                          />
                        </th>
                        <th scope="col" className="p-4">
                          ID
                        </th>
                        <th scope="col" className="p-4">
                          Title
                        </th>
                        <th scope="col" className="p-4">
                          Description
                        </th>
                        <th scope="col" className="p-4">
                          Candidates
                        </th>
                        <th scope="col" className="p-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentQuizzes.map((quiz, index) => {
                        const serialNumber =
                          (currentPage - 1) * quizzesPerPage + (index + 1);
                        return (
                          <tr
                            key={quiz._id}
                            className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-teal-600 focus:ring-1 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-600"
                                checked={selectedQuizzes.includes(quiz._id)}
                                onChange={() => {
                                  if (selectedQuizzes.includes(quiz._id)) {
                                    setSelectedQuizzes((prev) =>
                                      prev.filter((q) => q !== quiz._id),
                                    );
                                  } else {
                                    setSelectedQuizzes((prev) => [
                                      ...prev,
                                      quiz._id,
                                    ]);
                                  }
                                }}
                              />
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                              {serialNumber}
                            </td>
                            <td>
                              <button
                                className="px-4 py-3 font-bold text-sky-500"
                                onClick={() => handleQuizClick(quiz)}
                              >
                                {quiz.title}
                              </button>
                            </td>
                            <td className="px-4 py-3">{quiz.description}</td>
                            <td className="px-4 py-3">
                              {quiz.studentNames
                                .map((student) => student.name)
                                .join(", ")}
                            </td>
                            <td className="relative flex gap-3 px-4 py-3">
                              <button
                                className="flex items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={() => onEditQuiz(quiz._id)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
                                onClick={() => confirmSingleDelete(quiz)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                <QuizPagination
                  currentPage={currentPage}
                  totalQuizzes={filteredQuizzes.length}
                  quizzesPerPage={quizzesPerPage}
                  onPageChange={onPageChange}
                />
              </div>
            ) : (
              <QuizDetail
                selectedQuiz={selectedQuiz}
                handleBackClick={handleBackClick}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default QuizTable;
