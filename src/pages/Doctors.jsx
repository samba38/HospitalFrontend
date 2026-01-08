import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Doctors.css";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors/all", {
          params: { search, specialization, limit: 50 },
        });
        setDoctors(res.data.data);
      } catch {
        setError("Failed to load doctors");
      }
    };

    fetchDoctors();
  }, [search, specialization]);

  return (
    <div className="doctors-page">
      <h1 className="doctors-title">Our Doctors</h1>

      <div className="filter-bar">
        <input
          type="search"
          placeholder="Search doctor by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">All Specializations</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Neurology">Neurology</option>
          <option value="ENT">ENT</option>
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="doctors-grid">
        {doctors.map((doc) => (
          <div key={doc._id} className="doctor-card">
            <h3 className="doctor-name">{doc.name}</h3>
            <p className="doctor-detail">
              <b>Specialization:</b> {doc.specialization}
            </p>
            <p className="doctor-detail">
              <b>Experience:</b> {doc.experience} years
            </p>

            <Link to={`/doctors/${doc._id}`}>
              <button className="view-btn">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Doctors;
