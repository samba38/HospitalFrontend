import { useEffect, useState } from "react";
import api from "../api/axios";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/doctor", {
        withCredentials: true,
      });

      // always ensure array
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/appointments/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchAppointments();
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "40px", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Doctor Dashboard</h1>

      {appointments.length === 0 && <p>No appointments yet</p>}

      {appointments.map((appt) => (
        <div
          key={appt._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          {/* ✅ SAFE PATIENT ACCESS */}
          {appt.patient ? (
            <>
              <p><b>Patient:</b> {appt.patient.name}</p>
              <p><b>Email:</b> {appt.patient.email}</p>
              <p><b>Phone:</b> {appt.patient.phone}</p>
            </>
          ) : (
            <p style={{ color: "red" }}>Patient data missing</p>
          )}

          <p><b>Date:</b> {appt.date}</p>
          <p><b>Time:</b> {appt.time}</p>
          <p><b>Reason:</b> {appt.reason}</p>
          <p><b>Status:</b> {appt.status}</p>

          {appt.status === "pending" && (
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => updateStatus(appt._id, "approved")}>
                Approve
              </button>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => updateStatus(appt._id, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DoctorDashboard;
