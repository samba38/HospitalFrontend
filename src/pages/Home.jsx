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
      <div className="items-container">
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
          <li className="list-items" key={index}>{a}</li>
        ))}
      </ul>

      <h3 className="home-hopsital-achievements">Stats</h3>
      <p className="total-list">Total Doctors: {hospital.totalDoctors}</p>
      <video
       src='https://res.cloudinary.com/dqpacvvei/video/upload/v1769168580/Ultra-realistic_3D_hospital_discussion_scene___group_of_professional_doctors_standing_together___doc_seed3985681899_avycvi.mp4'
       autoPlay
       loop
       muted
       playsInline 
       className="hospital-img3"
  />
      <p className="total-list">Total Staff: {hospital.totalStaff}</p>
      <video
       src='https://res.cloudinary.com/dqpacvvei/video/upload/v1769168614/Ultra-realistic_3D_hospital_consultation_and_discussion_scene___doctor__nurse__hospital_manager__and_seed1757313548_aeckqg.mp4'
       autoPlay
       loop
       muted
       playsInline 
       className="hospital-img3"
  />
      <p className="total-list">Total Operations: {hospital.totalOperations}</p>
      <video
       src='https://res.cloudinary.com/dqpacvvei/video/upload/v1769173317/Ultra-realistic_3D_hospital_heart_surgery_scene___experienced_cardiac_surgeons_performing_open_heart_seed2703415290_if50ms.mp4'
       autoPlay
       loop
       muted
       playsInline 
       className="hospital-img3"
  />
      </div>
    </div>
  );
}

export default Home;
