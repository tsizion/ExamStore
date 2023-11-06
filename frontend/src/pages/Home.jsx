import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import Spinner from "../components/Spinner";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/questions")
      .then((response) => {
        setQuestions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Exam Store</h2>
      <Link
        to="/questions/add"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        + Add Question
      </Link>

      {loading ? (
        <Spinner />
      ) : (
        <div className="min-h-screen bg-gray-100 p-4">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Question</th>
                <th className="border p-2">Answer</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question._id} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{question.question}</td>
                  <td className="border p-2">
                    {question.questionType === "choice"
                      ? question.correctAnswer
                      : question.questionType === "truefalse"
                      ? question.isTrue
                        ? "True"
                        : "False"
                      : question.correctAnswer}
                  </td>
                  <td className="border p-2">
                    <Link
                      to={`/questions/details/${question._id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/questions/delete/${question._id}`}
                      className="bg-red-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      delete
                    </Link>
                    <Link
                      to={`/questions/update/${question._id}`}
                      className="bg-green-500 text-white py-1 px-2 rounded-md mr-2"
                    >
                      update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Home;
