import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PatientProtectedRoute({ children }) {
  const patientToken = Cookies.get("patient_token");

  if (!patientToken) {
    return <Navigate to="/login/patient" />;
  }

  return children;
}

export default PatientProtectedRoute;
