import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
const DeleteQues = () => {
  const [loading, setLoading] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);
  const navigate = useNavigate();
  const { questionId } = useParams();

  useEffect(() => {
    if (!loading && deletionComplete) {
      // After a successful deletion, wait for a moment and then redirect
      const timer = setTimeout(() => {
        navigate("/questions"); // Redirect to the questions page after a delay
      }, 2000); // Adjust the delay as needed

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    }
  }, [loading, deletionComplete, navigate]);

  const handleDelete = () => {
    setLoading(true);

    // Send a DELETE request to your server to delete the question
    axios
      .delete(`http://localhost:5000/questions/${questionId}`)
      .then(() => {
        // Set deletionComplete to true
        setDeletionComplete(true);
      })
      .catch((error) => {
        console.error("Error deleting question:", error);

        // Close the modal in case of an error
        setLoading(false);
      });
  };

  return (
    <>
      <BackButton />
      <div className="bg-white p-8 shadow-lg rounded-md w-96 mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Delete Question</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this question?
        </p>
        {deletionComplete ? (
          <div>
            <p className="text-green-600 font-semibold">Deleted Successfully</p>
            <Link to={`/`} className="text-blue-500 hover:underline">
              <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 px-3 py-1 rounded-md">
                ⬅️ Back
              </button>
            </Link>
          </div>
        ) : (
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`${
              loading
                ? "bg-red-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } text-white px-4 py-2 rounded-md`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </>
  );
};

export default DeleteQues;
