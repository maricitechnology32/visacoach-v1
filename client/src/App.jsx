

// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';
// // Layouts & Core
// import MainLayout from './components/layout/MainLayout';
// import SuperAdminLayout from './components/layout/SuperAdminLayout';
// import ProtectedRoute from './components/ProtectedRoute';
// // Public Pages
// import LoginPage from './pages/LoginPage';
// import SetPasswordPage from './pages/SetPasswordPage';
// import LandingPage from './pages/LandingPage';
// // Shared & Feature Pages
// import DashboardPage from './pages/DashboardPage';
// import ForumPage from './pages/ForumPage';
// import PostDetailPage from './pages/PostDetailPage';
// import LessonDetailPage from './pages/LessonDetailPage';
// import ProfilePage from './pages/ProfilePage';
// import DocumentsPage from './pages/DocumentsPage';
// import CoursesPage from './pages/CoursesPage';
// import CourseDetailPage from './pages/CourseDetailPage';
// import FinancialsPage from './pages/FinancialsPage';
// import SopReviewerPage from './pages/SopReviewerPage';
// import Ds160Page from './pages/Ds160Page';
// import ChecklistPage from './pages/ChecklistPage';
// import InterviewPage from './pages/InterviewPage';
// import UniversitiesPage from './pages/UniversitiesPage';
// import LeaveReviewPage from './pages/LeaveReviewsPage';

// // Counselor Pages
// import ManageStudentsPage from './pages/ManageStudentsPage';
// import StudentDetailPage from './pages/StudentDetailPage';
// import ManageCoursesPage from './pages/ManageCoursesPage';
// import CourseEditorPage from './pages/CourseEditorPage';

// // Super Admin Pages
// import ManageConsultanciesPage from './pages/superadmin/ManageConsultanciesPage';
// import ConsultancyDetailPage from './pages/superadmin/ConsultancyDetailPage';
// import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
// import ManageChecklistsPage from './pages/superadmin/ManageChecklistsPage';
// import ChecklistDetailPage from './pages/superadmin/ChecklistDetailPage';
// import Ds160SummaryPage from './pages/Ds160SummaryPage';
// import ManageUniversitiesPage from './pages/ManageUniversitiesPage';
// import Ds160ReviewPage from './pages/Ds160ReviewPage';
// import UniversityDetailPage from './pages/UniversityDetailPage';

// function App() {
//   const { user, loading } = useAuth();
//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/set-password" element={<SetPasswordPage />} />
//         <Route path="/leave-a-review" element={<LeaveReviewPage />} />


//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           {user?.role === 'super-admin' ? (
//             <Route element={<SuperAdminLayout />}>
//               <Route path="/dashboard" element={<SuperAdminDashboard />} />
//               <Route path="/manage-consultancies" element={<ManageConsultanciesPage />} />
//               <Route path="/consultancies/:consultancyId" element={<ConsultancyDetailPage />} />
//               <Route path="/manage-checklists" element={<ManageChecklistsPage />} />
//               <Route path="/checklists/:templateId" element={<ChecklistDetailPage />} />
//             </Route>
//           ) : (
//             <Route element={<MainLayout />}>
//               {/* Routes for both Students and Counselors */}
//               <Route path="/dashboard" element={<DashboardPage />} />
//               <Route path="/forum" element={<ForumPage />} />
//               <Route path="/forums/posts/:postId" element={<PostDetailPage />} />
//               <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
//               {/* Student-Only Routes can be further nested if needed */}
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/documents" element={<DocumentsPage />} />
//               <Route path="/courses" element={<CoursesPage />} />
//               <Route path="/courses/:courseId" element={<CourseDetailPage />} />
//               <Route path="/financials" element={<FinancialsPage />} />
//               <Route path="/sop-reviewer" element={<SopReviewerPage />} />
//               <Route path="/ds160" element={<Ds160Page />} />
//               <Route path="/ds160/queue" element={<Ds160ReviewPage />} />
//               <Route path="/checklist" element={<ChecklistPage />} />
//               <Route path="/interview" element={<InterviewPage />} />
//               <Route path="/universities" element={<UniversitiesPage />} />
//               {/* Counselor-Only Routes */}
//               <Route path="/students" element={<ManageStudentsPage />} />
//               <Route path="/students/:studentId" element={<StudentDetailPage />} />
//               <Route path="/manage-courses" element={<ManageCoursesPage />} />
//               <Route path="/manage-courses/:courseId" element={<CourseEditorPage />} />
//               <Route path="/ds160-summary" element={<Ds160SummaryPage />} />
//               <Route path="/manage-universities" element={<ManageUniversitiesPage />} />

//             </Route>
//           )}
//         </Route>
//         {/* Fallback Redirect */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // Layouts & Core
// import MainLayout from './components/layout/MainLayout';
// import SuperAdminLayout from './components/layout/SuperAdminLayout';
// import ProtectedRoute from './components/ProtectedRoute';

// // Public Pages
// import LoginPage from './pages/LoginPage';
// import SetPasswordPage from './pages/SetPasswordPage';
// import LandingPage from './pages/LandingPage';

// // Shared & Feature Pages
// import DashboardPage from './pages/DashboardPage';
// import ForumPage from './pages/ForumPage';
// import PostDetailPage from './pages/PostDetailPage';
// import LessonDetailPage from './pages/LessonDetailPage';
// import ProfilePage from './pages/ProfilePage';
// import DocumentsPage from './pages/DocumentsPage';
// import CoursesPage from './pages/CoursesPage';
// import CourseDetailPage from './pages/CourseDetailPage';
// import FinancialsPage from './pages/FinancialsPage';
// import SopReviewerPage from './pages/SopReviewerPage';
// import Ds160Page from './pages/Ds160Page';
// import ChecklistPage from './pages/ChecklistPage';
// import InterviewPage from './pages/InterviewPage';
// import UniversitiesPage from './pages/UniversitiesPage';
// import LeaveReviewPage from './pages/LeaveReviewsPage';

// // Counselor Pages
// import ManageStudentsPage from './pages/ManageStudentsPage';
// import StudentDetailPage from './pages/StudentDetailPage';
// import ManageCoursesPage from './pages/ManageCoursesPage';
// import CourseEditorPage from './pages/CourseEditorPage';

// // Super Admin Pages
// import ManageConsultanciesPage from './pages/superadmin/ManageConsultanciesPage';
// import ConsultancyDetailPage from './pages/superadmin/ConsultancyDetailPage';
// import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
// import ManageChecklistsPage from './pages/superadmin/ManageChecklistsPage';
// import ChecklistDetailPage from './pages/superadmin/ChecklistDetailPage';
// import Ds160SummaryPage from './pages/Ds160SummaryPage';
// import ManageUniversitiesPage from './pages/ManageUniversitiesPage';
// import Ds160ReviewPage from './pages/Ds160ReviewPage';
// import UniversityDetailPage from './pages/UniversityDetailPage';

// function App() {
//   const { user, loading } = useAuth();

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/set-password" element={<SetPasswordPage />} />
//         <Route path="/leave-a-review" element={<LeaveReviewPage />} />

//         {/* Protected Routes */}
//         <Route element={<ProtectedRoute />}>
//           {user?.role === 'super-admin' ? (
//             <Route element={<SuperAdminLayout />}>
//               <Route path="/dashboard" element={<SuperAdminDashboard />} />
//               <Route path="/manage-consultancies" element={<ManageConsultanciesPage />} />
//               <Route path="/consultancies/:consultancyId" element={<ConsultancyDetailPage />} />
//               <Route path="/manage-checklists" element={<ManageChecklistsPage />} />
//               <Route path="/checklists/:templateId" element={<ChecklistDetailPage />} />
//             </Route>
//           ) : (
//             <Route element={<MainLayout />}>
//               {/* Routes for both Students and Counselors */}
//               <Route path="/dashboard" element={<DashboardPage />} />
//               <Route path="/forum" element={<ForumPage />} />
//               <Route path="/forums/posts/:postId" element={<PostDetailPage />} />
//               <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
//               <Route path="/universities/:id" element={<UniversityDetailPage />} />


//               {/* Student-Only Routes can be further nested if needed */}
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/documents" element={<DocumentsPage />} />
//               <Route path="/courses" element={<CoursesPage />} />
//               <Route path="/courses/:courseId" element={<CourseDetailPage />} />
//               <Route path="/financials" element={<FinancialsPage />} />
//               <Route path="/sop-reviewer" element={<SopReviewerPage />} />
//               <Route path="/ds160" element={<Ds160Page />} />
//               <Route path="/ds160/queue" element={<Ds160ReviewPage />} />
//               <Route path="/checklist" element={<ChecklistPage />} />
//               <Route path="/interview" element={<InterviewPage />} />
//               <Route path="/universities" element={<UniversitiesPage />} />


//               {/* Counselor-Only Routes */}
//               <Route path="/students" element={<ManageStudentsPage />} />
//               <Route path="/students/:studentId" element={<StudentDetailPage />} />
//               <Route path="/manage-courses" element={<ManageCoursesPage />} />
//               <Route path="/manage-courses/:courseId" element={<CourseEditorPage />} />
//               <Route path="/ds160-summary" element={<Ds160SummaryPage />} />
//               <Route path="/manage-universities" element={<ManageUniversitiesPage />} />

//             </Route>
//           )}
//         </Route>

//         {/* Fallback Redirect */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layouts & Core
import MainLayout from './components/layout/MainLayout';
import SuperAdminLayout from './components/layout/SuperAdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LoginPage from './pages/LoginPage';
import SetPasswordPage from './pages/SetPasswordPage';
import LandingPage from './pages/LandingPage';
import LeaveReviewPage from './pages/LeaveReviewsPage';

// Shared & Feature Pages
import DashboardPage from './pages/DashboardPage';
import ForumPage from './pages/ForumPage';
import PostDetailPage from './pages/PostDetailPage';
import LessonDetailPage from './pages/LessonDetailPage';
import ProfilePage from './pages/ProfilePage';
import DocumentsPage from './pages/DocumentsPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import FinancialsPage from './pages/FinancialsPage';
import SopReviewerPage from './pages/SopReviewerPage';
import Ds160Page from './pages/Ds160Page';
import ChecklistPage from './pages/ChecklistPage';
import InterviewPage from './pages/InterviewPage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';

// Counselor Pages
import ManageStudentsPage from './pages/ManageStudentsPage';
import StudentDetailPage from './pages/StudentDetailPage';
import ManageCoursesPage from './pages/ManageCoursesPage';
import CourseEditorPage from './pages/CourseEditorPage';
import Ds160SummaryPage from './pages/Ds160SummaryPage';
import ManageUniversitiesPage from './pages/ManageUniversitiesPage';
import Ds160ReviewPage from './pages/Ds160ReviewPage';

// Super Admin Pages
import ManageConsultanciesPage from './pages/superadmin/ManageConsultanciesPage';
import ConsultancyDetailPage from './pages/superadmin/ConsultancyDetailPage';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import ManageChecklistsPage from './pages/superadmin/ManageChecklistsPage';
import ChecklistDetailPage from './pages/superadmin/ChecklistDetailPage';
import ManageApplicationsPage from './pages/ManageApplicationsPage';
import RecommendationPage from './pages/RecommendationPage';
import Ds160QueuePage from './pages/Ds160QueuePage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ============================================= */}
        {/* ===========    PUBLIC ROUTES    =========== */}
        {/* ============================================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/set-password" element={<SetPasswordPage />} />
        <Route path="/leave-a-review" element={<LeaveReviewPage />} />


        {/* ============================================= */}
        {/* ===========  PROTECTED ROUTES   =========== */}
        {/* ============================================= */}
        <Route element={<ProtectedRoute />}>
          {/* --- Super Admin Role --- */}
          {user?.role === 'super-admin' ? (
            <Route element={<SuperAdminLayout />}>
              <Route path="/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/manage-consultancies" element={<ManageConsultanciesPage />} />
              <Route path="/consultancies/:consultancyId" element={<ConsultancyDetailPage />} />
              <Route path="/manage-checklists" element={<ManageChecklistsPage />} />
              <Route path="/checklists/:templateId" element={<ChecklistDetailPage />} />
              {/* Redirect any other path to the super-admin dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          ) : (
            // --- Student & Counselor Roles ---
            <Route element={<MainLayout />}>
              {/* === SHARED Routes (Accessible to Students & Counselors) === */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/forums/posts/:postId" element={<PostDetailPage />} />
              <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/universities" element={<UniversitiesPage />} />
              <Route path="/universities/:id" element={<UniversityDetailPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path="/ds160-summary" element={<Ds160SummaryPage />} />


              {/* === COUNSELOR-ONLY Routes === */}
              {user?.role === 'counselor' && (
                <>
                  <Route path="/students" element={<ManageStudentsPage />} />
                  <Route path="/students/:studentId" element={<StudentDetailPage />} />
                  <Route path="/manage-courses" element={<ManageCoursesPage />} />
                  <Route path="/manage-courses/:courseId" element={<CourseEditorPage />} />
                  <Route path="/ds160/review/:studentId" element={<Ds160ReviewPage />} />
                  <Route path="/manage-universities" element={<ManageUniversitiesPage />} />
                  <Route path="/applications" element={<ManageApplicationsPage />} />
                    <Route path="/ds160/queue" element={<Ds160QueuePage />} />

                  
                </>
              )}

              {/* === STUDENT-ONLY Routes === */}
              {user?.role === 'student' && (
                <>
                  <Route path="/documents" element={<DocumentsPage />} />
                  <Route path="/financials" element={<FinancialsPage />} />
                  <Route path="/sop-reviewer" element={<SopReviewerPage />} />
                  <Route path="/ds160" element={<Ds160Page />} />
                  <Route path="/checklist" element={<ChecklistPage />} />
                  <Route path="/interview" element={<InterviewPage />} />
                  <Route path="/recommendations" element={<RecommendationPage />} />
                </>
              )}
              {/* Redirect any other authenticated but un-matched path to the main dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          )}
        </Route>

        {/* Fallback for any un-matched route if not authenticated */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;