import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/common/layout";
import MainContextProvider from "./contexts/MainContext";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import CoursePage from "./pages/courses";
import CourseDetailPage from "./pages/course-detail";
import CourseCreatePage from "./pages/course-create";
import CourseManageDescriptionPage from "./pages/course-manage-description";
import CourseManageContentPage from "./pages/course-manage-content";
import AssignmentPage from "./pages/excercise";
import ExcerciseEditPage from "./pages/excercise/edit";
import OnlineCourseLearning from "./pages/course-learning/online";
import OfflineCourseLearning from "./pages/course-learning/offline";
import QuestionPage from "./pages/question";
import CreateQuestion from "./pages/question/create";
import EditQuestion from "./pages/question/edit";
import SchedulePage from "./pages/schedule";
import ManageUsersPage from "./pages/users";
import ClassDetailPage from "./pages/course-manage-content/online/class-detail";
import DoingExcercisePage from "./pages/excercise/do";
import ClassesPage from "./pages/classes";
import ClassTeachingDetailPage from "./pages/classes/teaching/students";
import StudentExcercisesPage from "./pages/classes/teaching/student-excercises";
import StudentExcerciseMarking from "./pages/classes/teaching/student-excercise-marking";
import ClassExcercisePage from "./pages/classes/learning/excercises";
import OnlineClassExcercise from "./pages/classes/teaching/excercise";
import AchievementsPage from "./pages/achievements";
import ResultPage from "./pages/result";
import NotAllowPage from "./pages/not-allow";
import NotFoundPage from "./pages/404";

import DeletePage from "./pages/delete";

const App = () => {
  return (
    <Router>
      <MainContextProvider>
          <Routes>
            <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/courses" element={<AppLayout><CoursePage /></AppLayout>} />
            <Route path="/courses/:id" element={<AppLayout><CourseDetailPage /></AppLayout>} />
            <Route path="/course-create" element={<AppLayout><CourseCreatePage /></AppLayout>} />
            <Route path="/course-manage-description/:id" element={<AppLayout><CourseManageDescriptionPage /></AppLayout>} />
            <Route path="/course-manage-content/:id" element={<AppLayout><CourseManageContentPage /></AppLayout>} />
            <Route path="/course-manage-content/:id/:classId" element={<AppLayout><ClassDetailPage /></AppLayout>} />
            <Route path="/course-manage-content/:id/create-class" element={<AppLayout><ClassDetailPage /></AppLayout>} />
            <Route path="/excercise" element={<AppLayout><AssignmentPage /></AppLayout>} />
            {/* <Route path="/excercise/edit/:id" element={<AppLayout><ExcerciseEditPage /></AppLayout>} /> */}
            <Route path="/excercise/do/:courseId/:excerciseId" element={<DoingExcercisePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/course-learning/online/:id" element={<OnlineCourseLearning />} />
            <Route path="/course-learning/offline/:id" element={<AppLayout><OfflineCourseLearning /></AppLayout>} />
            <Route path="/question" element={<AppLayout><QuestionPage /></AppLayout>} />
            <Route path="/question/create" element={<AppLayout><CreateQuestion /></AppLayout>} />
            <Route path="/question/edit/:id" element={<AppLayout><EditQuestion /></AppLayout>} />
            <Route path="/schedule" element={<AppLayout><SchedulePage /></AppLayout>} />
            <Route path="/users" element={<AppLayout><ManageUsersPage /></AppLayout>} />
            <Route path="/classes" element={<AppLayout><ClassesPage /></AppLayout>} />
            <Route path="/classes/:id/students" element={<AppLayout><ClassTeachingDetailPage /></AppLayout>} />
            <Route path="/classes/:classId/excercies/:excerciseId" element={<AppLayout><StudentExcercisesPage /></AppLayout>} />
            
            <Route path="/classes/:classId/excercies/:excerciseId/students/:studentId" element={<AppLayout><StudentExcerciseMarking /></AppLayout>} />
            
            <Route path="/classes/:id/excercises" element={<AppLayout><ClassExcercisePage /></AppLayout>} />
            <Route path="/classes/online/:id/excercises" element={<AppLayout><OnlineClassExcercise /></AppLayout>} />
            <Route path="/achievements" element={<AppLayout><AchievementsPage /></AppLayout>} />
            <Route path="/not-allow" element={<NotAllowPage />} />

            <Route path="/delete" element={<DeletePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
       </MainContextProvider>
     </Router>
  );
};

export default App;
