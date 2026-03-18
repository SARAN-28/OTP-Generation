import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AcceptInvite = ({close}) => {

    const [defaultPassword, setDefaultPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [params] = useSearchParams();

    const token = params.get("token");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/accept-invite", {
                token,
                defaultPassword,
                newPassword
            });

            toast.success("Account created successfully");

        } catch (error) {
            toast.error("Error");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0505" }}></i>
                </span>

                <h3>Update Password</h3>

                <form onSubmit={handleSubmit}>
                    <input type="password" placeholder="Enter Default Password" value={defaultPassword} onChange={(e) => setDefaultPassword(e.target.value)} required />

                    <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

                    <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
};
export default AcceptInvite;