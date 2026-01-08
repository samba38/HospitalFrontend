import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function BookAppointment() {
  const { id } = useParams(); // doctorId
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      await api.post(
        "/appointments/book",
        {
          doctorId: id,
          date,
          time,
          reason,
        },
        {
          withCredentials: true, // cookie JWT
        }
      );

      navigate("/my-appointments");
    } catch (err) {
      setError("Failed to book appointment");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h2>Book Appointment</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ❌ NO <form> */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <textarea
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      {/* 🔥 IMPORTANT */}
      <button type="button" onClick={submit}>
        Confirm Appointment
      </button>
    </div>
  );
}

export default BookAppointment;
