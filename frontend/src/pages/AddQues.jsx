import { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

const AddQues = () => {
  const [questionData, setQuestionData] = useState({
    questionType: "choice",
    question: "",
    options: ["", "", ""],
    correctAnswer: "",
  });

  const [isTrue, setIsTrue] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleAddOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, ""],
    });
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...questionData.options];
    newOptions.splice(index, 1);
    setQuestionData({
      ...questionData,
      options: newOptions,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Remove empty option fields
      const cleanedOptions = questionData.options.filter(
        (option) => option.trim() !== ""
      );
      setQuestionData({
        ...questionData,
        options: cleanedOptions,
      });

      // Create a new object to send the data
      const postData = {
        ...questionData,
        isTrue: questionData.questionType === "truefalse" ? isTrue : null,
      };

      await axios.post("http://localhost:5000/questions", postData);
      // Redirect to the home page (or any other desired route)
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <BackButton />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add a New Question</h2>
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
                  {index > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-600 ml-2"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                + Add Option
              </button>
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
                  name="isTrue"
                  value="true"
                  checked={isTrue === true}
                  onChange={() => setIsTrue(true)}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="isTrue"
                  value="false"
                  checked={isTrue === false}
                  onChange={() => setIsTrue(false)}
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
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQues;
