import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const UpdateQues = () => {
  const { questionId } = useParams();
  const [questionData, setQuestionData] = useState({
    questionType: "",
    question: "",
    options: [],
    isTrue: false, // Use isTrue instead of correctAnswer
    answer: false, // New field for the answer
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [additionalOption, setAdditionalOption] = useState("");

  useEffect(() => {
    // Fetch the question data for the given questionId when the component mounts
    axios
      .get(`http://localhost:5000/questions/${questionId}`)
      .then((response) => {
        setQuestionData(response.data);
      });
  }, [questionId]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setQuestionData((prevData) => {
      if (type === "radio") {
        // Handle radio buttons for "True" and "False"
        return {
          ...prevData,
          [name]: value === "true",
        };
      } else {
        // Handle other input types
        return {
          ...prevData,
          [name]: type === "checkbox" ? e.target.checked : value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a PUT request to update the question with only the changed fields
    axios
      .put(`http://localhost:5000/questions/${questionId}`, questionData)
      .then((response) => {
        setUpdateStatus("Updated Successfully");

        console.log(response.data);
        // Handle success, e.g., show a success message or redirect to a different page
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., show an error message to the user
      });
  };
  const handleAddOption = () => {
    if (additionalOption.trim() !== "") {
      setQuestionData((prevData) => ({
        ...prevData,
        options: [...prevData.options, additionalOption],
      }));
      setAdditionalOption("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="questionType"
            >
              Question Type:
            </label>
            <select
              name="questionType"
              id="questionType"
              value={questionData.questionType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="choice">Multiple Choice</option>
              <option value="truefalse">True/False</option>
              <option value="shortanswer">Short Answer</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold mb-2"
              htmlFor="question"
            >
              Question:
            </label>
            <textarea
              name="question"
              id="question"
              value={questionData.question}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          {questionData.questionType === "choice" && (
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Choices:
              </label>
              {questionData.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="mr-2">{String.fromCharCode(65 + index)})</div>
                  <input
                    type="text"
                    name={`options[${index}]`}
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...questionData.options];
                      updatedOptions[index] = e.target.value;
                      setQuestionData({
                        ...questionData,
                        options: updatedOptions,
                      });
                    }}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
              <div className="flex items-center mb-2">
                <div className="mr-2">
                  {String.fromCharCode(65 + questionData.options.length)})
                </div>
                <input
                  type="text"
                  value={additionalOption}
                  onChange={(e) => setAdditionalOption(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Add Option
              </button>
            </div>
          )}

          {questionData.questionType === "truefalse" && (
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Answer:
              </label>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value="true"
                  checked={questionData.answer === true}
                  onChange={handleInputChange}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value="false"
                  checked={questionData.answer === false}
                  onChange={handleInputChange}
                />
                False
              </label>
            </div>
          )}
          {questionData.questionType === "shortanswer" && (
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Correct Answer:
              </label>
              <input
                type="text"
                name="correctAnswer"
                value={questionData.correctAnswer}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {updateStatus === "Updated Successfully"
              ? "Updated Successfully"
              : "Update Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQues;
