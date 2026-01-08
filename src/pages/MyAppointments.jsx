import { useEffect, useState } from "react";
import api from "../api/axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api
      .get("/appointments/patient", { withCredentials: true })
      .then((res) => setAppointments(res.data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Appointments</h1>

      {appointments.length === 0 && <p>No appointments yet</p>}

      {appointments.map((app) => (
        <div
          key={app._id}
          style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px" }}
        >
          <p><b>Doctor:</b> {app.doctor.name}</p>
          <p><b>Date:</b> {app.date}</p>
          <p><b>Time:</b> {app.time}</p>
          <p><b>Status:</b> {app.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyAppointments;
