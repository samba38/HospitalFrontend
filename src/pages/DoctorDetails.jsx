import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Cookies from "js-cookie";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/doctors/${id}`).then(res => {
      setDoctor(res.data);
    });
  }, [id]);

  if (!doctor) {
    return <p style={{ padding: "40px" }}>Loading doctor details...</p>;
  }

  const handleBook = () => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Please login to book an appointment");
      navigate("/login/patient");
      return;
    }

    navigate(`/book/${id}`);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ marginBottom: "10px" }}>{doctor.name}</h1>

      <p><b>Specialization:</b> {doctor.specialization}</p>
      <p><b>Experience:</b> {doctor.experience} years</p>
      <p><b>Email:</b> {doctor.email}</p>
      <p><b>Phone:</b> {doctor.phone}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>About Doctor</h3>
      <p>{doctor.bio}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3>Operations Performed</h3>
      {doctor.operationsPerformed && doctor.operationsPerformed.length > 0 ? (
        <ul>
          {doctor.operationsPerformed.map((op, index) => (
            <li key={index}>{op}</li>
          ))}
        </ul>
      ) : (
        <p>No operations data available</p>
      )}

      <hr style={{ margin: "30px 0" }} />

      <button
        onClick={handleBook}
        style={{
          padding: "10px 20px",
          backgroundColor: "#445a64",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorDetails;
