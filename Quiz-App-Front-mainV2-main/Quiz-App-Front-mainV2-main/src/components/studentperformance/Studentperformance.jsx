import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import './studentperformance.css';
import { useFetch } from "../../hooks/useFetch";
import Loader from "../loader/Loader";
import loadingImg from '../../images/Loading-rafiki (1).png'
import NotFoundData from '../notFoundData/NotFoundData'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Studentperformance() {


    const { data: response, loading, error } = useFetch('students/performance');
    const stats = response?.stats || response || {};
   if (loading) return <Loader />;

    if (error)
        return (
            <NotFoundData
                message="Error loading students performance"
                imag={loadingImg}
            />
        );
    const passFailData = {
        labels: ['Pass', 'Fail'],
        datasets: [{
            label: 'Pass vs Fail',
            data: [stats.passRate || 0, stats.failRate || 0],
            backgroundColor: ['#82ca9d', '#FF6B6B'],
        }]
    };

    const motivatedWeakData = {
        labels: ['Motivated', 'Weak'],
        datasets: [{
            label: 'Students Count',
            data: [stats.motivatedStudents || 0, stats.weakStudents || 0],
            backgroundColor: ['#547EB0', '#BB8D3F']
        }]
    };

    return (
        <div className="admin-dashboard-container">
            <h1 >Student Performance</h1>

            <div className="summary-metrics">
                <div className="metric">
                    <h4>Total Students</h4>
                    <p>{stats.totalStudents || 0}</p>
                </div>
                <div className="metric">
                    <h4>Average Score</h4>
                    <p>{stats.avgScore || 0}</p>
                </div>
            </div>

            <div className="charts-container">
                <div className="chart-card">
                    <h4>Pass vs Fail</h4>
                    <div className="chart-wrapper">
                        <Pie data={passFailData} className="chart" options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>

                <div className="chart-card">
                    <h4>Motivated vs Weak Students</h4>
                    <div className="chart-wrapper">
                        <Bar data={motivatedWeakData} className="chart" options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );


}





