import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const UpdateQues = () => {
  const [formData, setFormData] = useState({
    year: "",
    courseName: "",
    examType: "",
    questionType: "",
    question: "",
    choices: ["", "", ""],
    correctAnswer: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { questionId } = useParams();

  useEffect(() => {
    // Fetch the existing question data based on the questionId and populate the formData state
    axios
      .get(`http://localhost:5000/questions/${questionId}`)
      .then((response) => {
        const existingQuestion = response.data; // Replace with your actual API endpoint and data structure
        setFormData(existingQuestion);
      })
      .catch((error) => {
        setErrorMessage("Error: " + error.message);
      });
  }, [questionId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChoicesChange = (index, value) => {
    const newChoices = [...formData.choices];
    newChoices[index] = value;
    setFormData({ ...formData, choices: newChoices });
  };

  const handleAddOption = () => {
    setFormData({ ...formData, choices: [...formData.choices, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated data to your backend API to update the question
      const response = await axios.put(
        `http://localhost:5000/questions/${questionId}`,
        {
          year: formData.year,
          courseName: formData.courseName,
          examType: formData.examType,
          questionType: formData.questionType,
          question: formData.question,
          choices: formData.choices,
          correctAnswer: formData.correctAnswer,
          description: formData.description,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update the question.");
      }

      setSuccessMessage("Successfully updated the question.");
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  };

  return (
    <>
      <BackButton />
      <div>
        <h2>Update Question</h2>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg"
        >
          <div className="mb-4">
            <label className="block text-gray-600">YEAR:</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Exam course:</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Exam type:</label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Exam Type</option>
              <option value="MID">MID</option>
              <option value="FINAL">FINAL</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Question Type:</label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Question Type</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="short_answer">Short Answer</option>
              <option value="blank_space">Blank Space</option>
            </select>
          </div>

          {formData.questionType === "multiple_choice" && (
            <div className="mb-4">
              <label className="block text-gray-600">Choices:</label>
              {formData.choices.map((choice, index) => (
                <input
                  type="text"
                  key={index}
                  value={choice}
                  onChange={(e) => handleChoicesChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="mt-2 text-blue-500"
              >
                + Add Option
              </button>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-600">Question:</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Correct Answer:</label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover-bg-blue-700"
          >
            Add Question
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateQues;
