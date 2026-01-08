import { useEffect, useState } from "react";
import api from "../api/axios";
import './Home.css'
function Home() {
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await api.get("/hospital");
        setHospital(response.data);
      } catch (err) {
        setError("Failed to load hospital information");
        console.error("Hospital API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalInfo();
  }, []);

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading hospital info...</p>;
  }

  if (error) {
    return <p style={{ padding: "40px", color: "red" }}>{error}</p>;
  }

  return (
    <div className="Home-container">
      <h1 className="home-hopsital-name">{hospital.name}</h1>
      <video
       src='https://res.cloudinary.com/dqpacvvei/video/upload/v1766393788/Cinematic_3D_animated_hospital_hero_scene___five_medical_professionals_standing_heroically_in_front__seed4117926221_lzju7d.mp4'
       autoPlay
       loop
       muted
       playsInline
       className="hospital-img"
  />
      <p className="home-hopsital-description">{hospital.description}</p>
      <h3 className="home-hopsital-achievements">Achievements</h3>
       <video
       src='https://res.cloudinary.com/dqpacvvei/video/upload/v1766393126/Ultra-realistic_3D_hospital_operation_room___three_professional_surgeons_performing_surgery___realis_seed328121767_px5bpt.mp4'
       autoPlay
       loop
       muted
       playsInline
       className="hospital-img2"
  />
      <ul>
        {hospital.achievements?.map((a, index) => (
          <li key={index}>{a}</li>
        ))}
      </ul>

      <h3>Stats</h3>
      <p>Total Doctors: {hospital.totalDoctors}</p>
      <p>Total Staff: {hospital.totalStaff}</p>
      <p>Total Operations: {hospital.totalOperations}</p>
    </div>
  );
}

export default Home;
