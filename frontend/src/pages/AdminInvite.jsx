import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const AdminInvite = ({ close }) => {

    const [defaultPassword, setDefaultPassword] = useState("");

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const sendInvite = async (e) => {
        e.preventDefault();

        try {

            await api.post("/admin/send-invite", { name, email, defaultPassword });

            toast.success("Invitation sent Successfully")

            close();
            navigate("/admin-dashboard")


        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending invitation");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <span className="close-btn" onClick={close}>
                    <i className="fa-solid fa-circle-xmark" style={{ color: "#ff0505" }}></i>
                </span>

                <h3>Send Employee Invitations</h3>

                <form onSubmit={sendInvite}>
                    <input type="text" placeholder="Employee Name" value={name} onChange={(e) => setName(e.target.value)} required />

                    <input type="email" placeholder="Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <input type="password" placeholder="Default Password" value={defaultPassword} onChange={(e) => setDefaultPassword(e.target.value)} required />

                    <button type="submit">Send Invite</button>
                </form>
            </div>
        </div>
    );
};

export default AdminInvite;