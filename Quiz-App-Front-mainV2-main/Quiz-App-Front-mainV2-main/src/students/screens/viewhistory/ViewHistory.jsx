import { useFetch } from "../../../hooks/useFetch";
import "./viewhistory.css";
import Loader from "../../../components/loader/Loader";
import loadingImg from '../../../images/Loading-rafiki (1).png'
import NotFoundData from "../../../components/notFoundData/NotFoundData";

export default function ViewHistory() {
  const { data: historyResponse, loading, error } = useFetch("results/viewhistory");
  const history = historyResponse?.data || historyResponse || {};
  const {
    total = 0,
    avg = 0,
    highest = 0,
    lowest = 0,
    passRate = 0,
    quizzes = [],
  } = history;


  if (loading) return <Loader />;
  if (error)
    return (
      <NotFoundData
        message="Error loading "
        imag={loadingImg}
      />
    );

  return (
    <div className="history-page">
      <h1 className="history-title">Quiz History</h1>

      <div className="stats-container">
        <div>Total Quizzes: {total}</div>
        <div>Average Score: {avg}%</div>
        <div>Highest Score: {highest}%</div>
        <div>Lowest Score:  {lowest}%</div>
        <div>Pass Rate: {passRate}%</div>
      </div>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Score</th>
              <th>Correct</th>
              <th>Wrong</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index}>
                <td>{quiz.name || quiz.title}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${quiz.score}%`,
                        backgroundColor: quiz.score >= 80 ? "#4caf50" : quiz.score >= 50 ? "#ffb300" : "#e53935",
                      }}
                    >
                      {quiz.score}%
                    </div>
                  </div>
                </td>
                <td>{quiz.correct}</td>
                <td>{quiz.wrong}</td>
                <td>{quiz.score >= 50 ? "Passed" : "Failed"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
