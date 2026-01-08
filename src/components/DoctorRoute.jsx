import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function DoctorRoute({ children }) {
  const doctorToken = Cookies.get("doctor_token");

  if (!doctorToken) {
    return <Navigate to="/login/doctor" />;
  }

  return children;
}

export default DoctorRoute;

