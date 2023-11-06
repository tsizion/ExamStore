import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ViewQues = () => {
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const { questionId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/questions/${questionId}`)
      .then((response) => {
        setQuestion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <BackButton />
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Question Details</h2>
            <div className="mb-4">
              <p className="text-lg font-semibold">Question:</p>
              <p className="text-gray-700">{question.question}</p>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Question Type:</p>
              <p className="text-gray-700">{question.questionType}</p>
            </div>
            {question.questionType === "choice" && (
              <div className="mb-4">
                <p className="text-lg font-semibold">Options:</p>
                <ul className="list-disc ml-6">
                  {question.options.map((option, index) => (
                    <li
                      key={index}
                      className="text-gray-700 list-none list-inside"
                    >
                      {String.fromCharCode(65 + index)} ) {option}
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold">Correct Answer:</p>
                <p className="text-gray-700">{question.correctAnswer}</p>
              </div>
            )}
            {question.questionType === "truefalse" && (
              <div className="mb-4">
                <p className="text-lg font-semibold">Is True:</p>
                <p className="text-gray-700">
                  {question.isTrue ? "Yes" : "No"}
                </p>
              </div>
            )}
            {question.questionType === "shortanswer" && (
              <div className="mb-4">
                <p className="text-lg font-semibold">Correct Answer:</p>
                <p className="text-gray-700">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQues;
