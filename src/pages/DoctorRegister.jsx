import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function DoctorRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    phone: "",
    bio: "",
  });

  const [error, setError] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/doctors/register", form);
      alert("Doctor registered successfully");
      navigate("/login/doctor");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2>Doctor Registration</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="name" placeholder="Name" onChange={change} required />
        <input name="email" placeholder="Email" onChange={change} required />
        <input type="password" name="password" placeholder="Password" onChange={change} required />
        <input name="specialization" placeholder="Specialization" onChange={change} required />
        <input name="experience" placeholder="Experience (years)" onChange={change} required />
        <input name="phone" placeholder="Phone" onChange={change} required />
        <textarea name="bio" placeholder="Bio" onChange={change} />

        <button type="submit">Register Doctor</button>
      </form>
    </div>
  );
}

export default DoctorRegister;
