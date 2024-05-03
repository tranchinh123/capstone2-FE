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
import NotFoundPage from "./pages/404";

const App = () => {
  return (
    <Router>
      <MainContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/courses"
            element={
              <AppLayout>
                <CoursePage />
              </AppLayout>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <AppLayout>
                <CourseDetailPage />
              </AppLayout>
            }
          />
          <Route
            path="/course-create"
            element={
              <AppLayout>
                <CourseCreatePage />
              </AppLayout>
            }
          />
          <Route
            path="/course-manage-description/:id"
            element={
              <AppLayout>
                <CourseManageDescriptionPage />
              </AppLayout>
            }
          />
          <Route
            path="/course-manage-content/:id"
            element={
              <AppLayout>
                <CourseManageContentPage />
              </AppLayout>
            }
          />
          <Route
            path="/course-manage-content/:id/:classId"
            element={
              <AppLayout>
                <ClassDetailPage />
              </AppLayout>
            }
          />
          <Route
            path="/course-manage-content/:id/create-class"
            element={
              <AppLayout>
                <ClassDetailPage />
              </AppLayout>
            }
          />
          <Route
            path="/excercise"
            element={
              <AppLayout>
                <AssignmentPage />
              </AppLayout>
            }
          />
          <Route
            path="/excercise/edit/:id"
            element={
              <AppLayout>
                <ExcerciseEditPage />
              </AppLayout>
            }
          />
          <Route
            path="/course-learning/online/:id"
            element={
              <AppLayout>
                <OnlineCourseLearning />
              </AppLayout>
            }
          />
          <Route
            path="/course-learning/online/:id"
            element={<OnlineCourseLearning />}
          />
          <Route
            path="/question"
            element={
              <AppLayout>
                <QuestionPage />
              </AppLayout>
            }
          />
          <Route
            path="/question/create"
            element={
              <AppLayout>
                <CreateQuestion />
              </AppLayout>
            }
          />
          <Route
            path="/question/edit/:id"
            element={
              <AppLayout>
                <EditQuestion />
              </AppLayout>
            }
          />
          <Route
            path="/schedule"
            element={
              <AppLayout>
                <SchedulePage />
              </AppLayout>
            }
          />
          <Route
            path="/users"
            element={
              <AppLayout>
                <ManageUsersPage />
              </AppLayout>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainContextProvider>
    </Router>
  );
};

export default App;
