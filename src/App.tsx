import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Appointments from "./GemPages/Appointments";
import ScheduleAppointment from "./GemPages/ScheduleAppointment";
import Prescriptions from "./GemPages/Prescriptions";
import VideoCall from "./GemPages/VideoCall";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            {/* Dashboard Layout */}
            {/* <Route path="/Telehealth/" element={<AppLayout />}> */}
            <Route path="/Telehealth/" element={ <ProtectedRoute> <AppLayout /> </ProtectedRoute> }>

              <Route index element={<Appointments />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="schedule-appointment" element={<ScheduleAppointment />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="video-call" element={<VideoCall />} />

            </Route>

            {/* Auth Layout */}
            <Route path="/Telehealth/signin" element={<SignIn />} />
            <Route path="/Telehealth/signup" element={<SignUp />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
