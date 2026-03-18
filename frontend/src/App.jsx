import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminInvite from "./pages/AdminInvite";
import AcceptInvite from "./pages/AcceptInvite";

function App() {
    return (

        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

                <Route path="/admin-invite" element={<AdminInvite />} />

                <Route path="/accept-invite" element={<AcceptInvite />} />
            </Routes>

            <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
        </BrowserRouter>

    );
}

export default App;