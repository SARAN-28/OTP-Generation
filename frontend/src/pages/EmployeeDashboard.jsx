import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const fetchEmployee = async () => {

      try {

        await api.get("/employee/employee-dashboard");

      } catch (error) {

        localStorage.removeItem("token");
        navigate("/");
      }

    };

    fetchEmployee();

  }, []);

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Employee Dashboard</h1>
      <h3>Welcome Employee</h3>
    </div>
  );
};

export default EmployeeDashboard;