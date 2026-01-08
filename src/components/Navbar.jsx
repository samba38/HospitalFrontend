import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css";

function Navbar() {
  const adminToken = Cookies.get("admin_token");
  const patientToken = Cookies.get("patient_token");
  const doctorToken = Cookies.get("doctor_token");
  const navigate = useNavigate();

  const logout = (type) => {
    Cookies.remove(type, { path: "/" });

    if (type === "admin_token") navigate("/");
    if (type === "patient_token") navigate("/");
    if (type === "doctor_token") navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        🏥 Sunrise Multi-Specialty Hospital
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* ===== ADMIN ===== */}
        {adminToken && (
          <>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <button onClick={() => logout("admin_token")}>Logout</button>
          </>
        )}

        {/* ===== DOCTOR ===== */}
        {doctorToken && !adminToken && (
          <>
            <Link to="/doctor/dashboard">Dashboard</Link>
            <button onClick={() => logout("doctor_token")}>Logout</button>
          </>
        )}

        {/* ===== PATIENT ===== */}
        {patientToken && !adminToken && !doctorToken && (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/my-appointments">My Appointments</Link>
            <button onClick={() => logout("patient_token")}>Logout</button>
          </>
        )}

        {/* ===== GUEST ===== */}
        {!adminToken && !patientToken && !doctorToken && (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/login/patient">Patient Login</Link>
            <Link to="/login/doctor">Doctor Login</Link>
            <Link to="/login/admin">Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
