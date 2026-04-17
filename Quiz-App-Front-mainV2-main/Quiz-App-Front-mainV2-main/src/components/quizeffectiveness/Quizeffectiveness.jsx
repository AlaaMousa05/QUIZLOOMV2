import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './quizeffectiveness.css';
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import loadingImg from '../../images/Loading-rafiki (1).png'
import NotFoundData from "../notFoundData/NotFoundData";

export default function Quizeffectiveness() {
    const { data: response, loading, error } = useFetch('quizzes/effectiveness');

    if (loading) return <Loader />;
    if (error) return <NotFoundData message="Error loading Quizzes Effectiveness" imag={loadingImg} />;

    const quizzes = response?.quizzes || [];
    const chartData = quizzes.map((q) => ({
        quiz: q.title,
        Attempts: q.attempts || 0,
        Passed: q.passedAttempts || 0,
        Accuracy: q.accuracy || 0,
    }));

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Quiz Effectiveness</h1>
            {chartData.length > 0 ? (

                <ResponsiveContainer  width="100%" height={300}>
             

                    <BarChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                        <XAxis dataKey="quiz" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Attempts" fill="#547EB0" />
                        <Bar dataKey="Passed" fill="#82ca9d" />
                        <Bar dataKey="Accuracy" fill="#2c356A" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="no-quizzes">No quizzes available</p>
            )}
        </div>
    );
}
