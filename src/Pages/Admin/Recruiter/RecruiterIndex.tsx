import { useState, useEffect } from "react";
import axios from "axios";
import RecruiterCreateForm from "../../../Components/Recruiters/RecruiterCreateForm";
import RecruiterTable from "../../../Components/Recruiters/RecruiterTable";
import { useAuth } from "../../../Providers/AuthContext";

const RecruiterIndex = () => {
  const { token, user } = useAuth();
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [editingRecruiter, setEditingRecruiter] = useState<any>(null);
  const [showRecruiterTable, setShowRecruiterTable] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecruiters, setTotalRecruiters] = useState(0);
  const recruitersPerPage = 10;

  // Fetch recruiters from API
  useEffect(() => {
    const fetchRecruiters = async (page = 1) => {
      try {
        const response = await axios.get(
          `/api/admin/recruiter?page=${page}&limit=${recruitersPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRecruiters(response.data.recruiters);
        setTotalRecruiters(response.data.recruiters.length);
      } catch (error) {
        if (user !== null) {
          console.error("Error fetching recruiters:", error);
        }
      }
    };

    fetchRecruiters(currentPage);
  }, [token, currentPage]);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const addRecruiter = async (newRecruiter: any, { resetForm }: any) => {
    if (isSubmitting) return; // Prevent duplicate submissions
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/admin/recruiter", newRecruiter, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecruiters((prevRecruiters) => [
        ...prevRecruiters,
        response.data.recruiter,
      ]);
      setTotalRecruiters((prevTotal) => prevTotal + 1);

      resetForm();
      closeForm();
      setToastMessage("Recruiter created successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error adding recruiter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const editRecruiter = (recruiterId: string) => {
    const recruiterToEdit = recruiters.find(
      (recruiter) => recruiter._id === recruiterId,
    );
    setEditingRecruiter(recruiterToEdit);
    setShowRecruiterTable(false);
  };

  const handleSaveRecruiter = async (updatedRecruiter: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const recruiterId = updatedRecruiter._id || updatedRecruiter.id;
      const response = await axios.put(
        `/api/admin/recruiter/${recruiterId}`,
        updatedRecruiter,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRecruiters((prev) =>
        prev.map((recruiter) =>
          recruiter._id === recruiterId ? response.data.recruiter : recruiter,
        ),
      );
      setEditingRecruiter(null);
      setShowRecruiterTable(true);
      setToastMessage("Recruiter updated successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error saving recruiter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRecruiter = async (id) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.delete(`/api/admin/recruiter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the local state to reflect the deletion
      setRecruiters((prevRecruiters) =>
        prevRecruiters.filter((recruiter) => recruiter._id !== id),
      );
      setTotalRecruiters((prevTotal) => prevTotal - 1);

      setToastMessage(
        response.data.message || "Recruiter deleted successfully.",
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error deleting recruiter:", error);
      alert("Failed to delete recruiter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setShowRecruiterTable(true);
  };

  const resetForm = () => {
    setEditingRecruiter(null);
    setShowRecruiterTable(true);
  };

  const bulkDeleteRecruiters = async (recruiterIds) => {
    try {
      await axios.post(
        "/api/admin/recruiters/bulk-delete",
        { recruiterIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRecruiters((prev) =>
        prev.filter((r) => !recruiterIds.includes(r._id)),
      );
      setToastMessage("Selected Recruiters Deleted Successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Error bulk deleting recruiters:", error);
    }
  };

  return (
    <div>
      {showToast && (
        <div
          id="toast-success"
          className="absolute right-3 top-16 z-50 mb-4 flex max-w-xs items-center rounded-lg border border-gray-200 bg-gray-800 p-4 text-white shadow dark:border-gray-700 dark:bg-white dark:text-gray-800"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <svg
              className="h-5 w-5"
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

      {showRecruiterTable ? (
        <RecruiterTable
          recruiters={recruiters}
          onEditRecruiter={editRecruiter}
          onDeleteRecruiter={deleteRecruiter}
          toggleModal={toggleModal}
          totalRecruiters={totalRecruiters}
          currentPage={currentPage}
          recruitersPerPage={recruitersPerPage}
          onPageChange={setCurrentPage}
          onBulkDeleteRecruiters={bulkDeleteRecruiters}
        />
      ) : editingRecruiter ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
          <RecruiterCreateForm
            recruiter={editingRecruiter}
            onSubmit={(updatedRecruiter) =>
              handleSaveRecruiter(updatedRecruiter)
            }
            closeForm={closeForm}
            resetForm={resetForm}
            setShowRecruiterTable={setShowRecruiterTable}
          />
        </div>
      ) : (
        <RecruiterCreateForm
          onSubmit={addRecruiter}
          closeForm={closeForm}
          resetForm={resetForm}
        />
      )}
      {isModalOpen && (
        <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 md:inset-0 md:h-full">
          <div className="relative w-full max-w-3xl p-4 md:h-auto">
            <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create Recruiter
                </h3>
                <button
                  type="button"
                  onClick={closeForm}
                  className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto">
                <RecruiterCreateForm
                  onSubmit={addRecruiter}
                  closeForm={closeForm}
                  resetForm={resetForm}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterIndex;
