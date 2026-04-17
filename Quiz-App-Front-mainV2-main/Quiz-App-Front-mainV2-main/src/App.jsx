import { Routes, Route } from "react-router-dom";

// Admin Screens
import Main from "./admin/screens/main/Main";
import DashBoardScreen from "./admin/screens/dashBoard/DashBoardScreen";
import Students from "./admin/screens/students/Students";
import Categories from "./admin/screens/categories/Categories";
import AddQuiz from "./admin/screens/addQuiz/AddQuiz";
import SubCategories from "./admin/screens/subCategories/SubCategories";
import QuestionBank from "./admin/screens/questionBank/QuestionBank";

// Student Screens
import StudentMain from "./students/screens/main/StudentMain";
import Quiz from "./students/screens/quiz/Quiz";
import StudentProfile from "./students/screens/studentprofile/StudentProfile";
import ViewHistory from "./students/screens/viewhistory/ViewHistory";

// Auth & Common
import Login from "./Login/Login";
import Register from "./Login/Register";
import NotFound from "./components/notFoundpage/NotFound";
import Landingpage from './landing/Landingpage'

// Role & Guard
import { USER } from "./enums/enum";
import RoleGuard from "./components/roleGuard/RoleGuard";
import QuizResult from "./students/screens/quizResult/QuizResult";
import { AppInitializer } from "./components/appInitializer/AppInitializer";


function App() {
  return (
    <AppInitializer>
      <Routes>

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <RoleGuard allowedRoles={[USER.ADMIN]}>
              <Main />
            </RoleGuard>
          }
        >
          <Route index element={<DashBoardScreen />} />
          <Route path="students" element={<Students />} />
          <Route path="categories" element={<Categories />} />
          <Route path="addQuiz" element={<AddQuiz />} />
          <Route path="categories/:id" element={<SubCategories />} />
          <Route path="categories/:id/:questionBankId" element={<QuestionBank />} />
        </Route>

        {/* Student Routes */}
        <Route 
          path="/student" 
          element={
            <RoleGuard allowedRoles={[USER.STUDENT]}>
              <StudentMain />
            </RoleGuard>
          }
        >
          <Route index element={<Categories />} />

          <Route path={"categories/:id"} element={<SubCategories />} />
          <Route path={"quiz/:subCategoryId"} element={<Quiz />} />
           <Route path={"quiz/:quizId/submitted"} element={<QuizResult/>} />

       
          <Route path="profile" element={<StudentProfile />} />
          <Route path="history" element={<ViewHistory/>} />

        </Route>

        {/* Auth Routes */}
        <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    

        {/* Catch-All */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AppInitializer>
  );
}

export default App;
