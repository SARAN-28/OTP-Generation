import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api/axios";
import "../styles/dialog.css";

const ForgotPassword = ({ close, openVerify }) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/forgot-password", { email });

            toast.success("OTP sent to your email");

            close();
            openVerify(email);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0505" }}></i>
                </span>

                <h3>Forgot Password</h3>

                <form onSubmit={handleSendOtp}>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default ForgotPassword;