import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css'
function AdminDashboard() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const [hospital, setHospital] = useState({
    name: "",
    description: "",
    achievements: "",
    totalStaff: "",
    departments: "",
    facilities: "",
    surgeriesPerformed: "",
    establishedYear: "",
    founders: "",
  });

  // 🔹 Load hospital info
  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const res = await api.get("/hospital");

        setHospital({
          name: res.data.name || "",
          description: res.data.description || "",
          achievements: res.data.achievements?.join("\n") || "",
          totalStaff: res.data.totalStaff || "",
          departments: res.data.departments?.join("\n") || "",
          facilities: res.data.facilities?.join("\n") || "",
          surgeriesPerformed: res.data.surgeriesPerformed || "",
          establishedYear: res.data.establishedYear || "",
          founders: res.data.founders?.join("\n") || "",
        });
      } catch (err) {
        console.error("Failed to load hospital info");
      }
    };

    fetchHospitalInfo();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };

  // 🔹 Update hospital info
  const updateHospital = async () => {
    try {
      await api.put(
        "/hospital",
        {
          name: hospital.name,
          description: hospital.description,
          achievements: hospital.achievements.split("\n"),
          totalStaff: Number(hospital.totalStaff),
          departments: hospital.departments.split("\n"),
          facilities: hospital.facilities.split("\n"),
          surgeriesPerformed: Number(hospital.surgeriesPerformed),
          establishedYear: Number(hospital.establishedYear),
          founders: hospital.founders.split("\n"),
        },
        { withCredentials: true }
      );

      setStatus("✅ Hospital information updated successfully");
    } catch (err) {
      setStatus("❌ Update failed (Admin only)");
    }
  };

  // 🔹 Logout
  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login/admin");
  };

  return (
     <div className="admin-container">
    <h1>Admin Dashboard</h1>

    {status && <p className="status">{status}</p>}

    <div className="form-grid">

      <div className="form-group">
        <label>Hospital Name</label>
        <input name="name" value={hospital.name} onChange={handleChange} />
      </div>

      <div className="form-group full">
        <label>Description</label>
        <textarea name="description" rows="4" value={hospital.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Total Staff</label>
        <input type="number" name="totalStaff" value={hospital.totalStaff} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Surgeries Performed</label>
        <input type="number" name="surgeriesPerformed" value={hospital.surgeriesPerformed} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Established Year</label>
        <input type="number" name="establishedYear" value={hospital.establishedYear} onChange={handleChange} />
      </div>

      <div className="form-group full">
        <label>Achievements (one per line)</label>
        <textarea name="achievements" rows="4" value={hospital.achievements} onChange={handleChange} />
      </div>

      <div className="form-group full">
        <label>Departments (one per line)</label>
        <textarea name="departments" rows="4" value={hospital.departments} onChange={handleChange} />
      </div>

      <div className="form-group full">
        <label>Facilities (one per line)</label>
        <textarea name="facilities" rows="4" value={hospital.facilities} onChange={handleChange} />
      </div>

      <div className="form-group full">
        <label>Founders (one per line)</label>
        <textarea name="founders" rows="2" value={hospital.founders} onChange={handleChange} />
      </div>

    </div>

    <div className="actions">
      <button onClick={updateHospital}>Update Hospital Info</button>
      <button className="logout" onClick={logout}>Logout</button>
    </div>
  </div>
  );
}

export default AdminDashboard;
