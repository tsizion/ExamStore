import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const viewQues = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { questionId } = useParams();

  useEffect(() => {
    // Fetch the question details from the backend when the component mounts
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/questions/${questionId}`
        );

        if (response.status === 200) {
          setQuestion(response.data);
          setLoading(false);
        } else {
          // Handle error or not found
          console.error("Failed to fetch question");
        }
      } catch (error) {
        console.error("Error: " + error.message);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!question) {
    return <p className="text-center mt-4">Question not found.</p>;
  }

  return (
    <>
      <BackButton />
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Question Details</h2>
        <div className="mb-2">
          <p>
            <span className="font-semibold">Year:</span> {question.year}
          </p>
          <p>
            <span className="font-semibold">Exam Course:</span>{" "}
            {question.examCourse}
          </p>
          <p>
            <span className="font-semibold">Exam Type:</span>{" "}
            {question.examType}
          </p>
          <p>
            <span className="font-semibold">Question Type:</span>{" "}
            {question.questionType}
          </p>
          <p>
            <span className="font-semibold">Question:</span> {question.question}
          </p>
          {question.questionType === "Multiple Choice" && (
            <div className="mb-2">
              <p className="font-semibold">Choices:</p>
              <ul>
                {question.choices.map((choice, index) => (
                  <li key={index}>{choice}</li>
                ))}
              </ul>
              <p>
                <span className="font-semibold">Correct Answer:</span>{" "}
                {question.correctAnswer}
              </p>
            </div>
          )}
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {question.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default viewQues;
