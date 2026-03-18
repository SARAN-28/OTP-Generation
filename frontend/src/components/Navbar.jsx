import { useState } from "react";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import VerifyOtp from "../pages/Verifyotp";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyResetOtp from "../pages/VerifyResetOtp";
import ResetPassword from "../pages/ResetPassword";
import "../styles/navbar.css";

const Navbar = () => {

  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  
  const openForgot = () => setShowForgot(true);

  const openVerify = (email) => {
    setResetEmail(email);
    setShowForgot(false);
    setShowVerify(true);
  };

  const openReset = (email) => {
    setResetEmail(email);
    setShowVerify(false);
    setShowReset(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h2>PORTAL</h2>
        </div>

        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="nav-btn" onClick={() => setShowSignup(true)}>Signup</button>
        </div>
      </nav>

      {showSignup && (
        <Signup
          close={() => setShowSignup(false)}
          openLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {showLogin && (
        <Login
          close={() => setShowLogin(false)}
          openSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          openOtp={(email) => {
            setShowLogin(false);
            setAdminEmail(email);
            setShowOtp(true);
          }}
          openForgot={() => {
            setShowLogin(false);
            openForgot();
          }}
        />
      )}

      {showOtp && (
        <VerifyOtp
          email={adminEmail}
          close={() => setShowOtp(false)}
        />
      )}

      {showForgot && (
        <ForgotPassword
          close={() => setShowForgot(false)}
          openVerify={openVerify}
        />
      )}

      {showVerify && (
        <VerifyResetOtp
          email={resetEmail}
          close={() => setShowVerify(false)}
          openReset={openReset}
        />
      )}

      {showReset && (
        <ResetPassword
          email={resetEmail}
          close={() => setShowReset(false)}
          openLogin={() => setShowLogin(true)}
        />
      )}
    </>
  );
};

export default Navbar;