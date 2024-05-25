import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './Dashboard/components/shared/Layout.jsx';
import CreateUsers from './Dashboard/pages/CreateUsers';
import Dashboard from './Dashboard/pages/Dashboard.jsx';
import ExamDetails from './Dashboard/pages/ExamDetails';
import Feedback from './Dashboard/pages/Feedback';
import ViewExam from './Dashboard/pages/ViewExam';
import ViewUsers from './Dashboard/pages/ViewUsers';
import AddExamMaterials from './pages/AddExamMaterials';
import AllExamsResult from './pages/AllExamsResult';
import { Contact } from './pages/Contact.jsx';
import ExamDashboard from './pages/ExamDashboard';
import ExamMaterials from './pages/ExamMaterials';
import ExamResultDetails from './pages/ExamResultDetails';
import ExamRoom from './pages/ExamRoom';
import FeedbackForm from './pages/FeedbackForm';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import CreateExam from './Dashboard/pages/CreateExam';
import ExamResultsDashboard from './Dashboard/pages/ExamResultsDashboard';
import AllStudentMarksList from './Dashboard/pages/AllStudentMarksList';
import ProfilePage from './pages/ProfilePage';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Admin */}
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/admin/create-users" element={<CreateUsers />} />
                    <Route path="/admin/view-users" element={<ViewUsers />} />
                    <Route path="/admin/add-exam-materials" element={<AddExamMaterials />} />
                    <Route path="/admin/feedback" element={<Feedback />} />

                    <Route path="/admin/create-exam" element={<CreateExam />} />

                    <Route path="/admin/view-exam">
                        <Route index element={<ViewExam />} />
                        <Route path="/admin/view-exam/:examID" element={<ExamDetails />} />
                    </Route>

                    <Route path="/admin/results">
                        <Route index element={<ExamResultsDashboard />} />
                        <Route path=':examID' element={<AllStudentMarksList />} />
                    </Route>

                </Route>

                <Route path="/exams" element={<ExamDashboard />} />
                <Route path="/exams/:examID" element={<ExamRoom />} />

                <Route path="/results" element={<AllExamsResult />} />
                <Route path="/results/:examID" element={<ExamResultDetails />} />
                <Route path="/exam-materials/:examID" element={<ExamMaterials />} />

                <Route path="/feedback" element={<FeedbackForm />} />
            </Routes>
        </div>
    );
}

export default App;
