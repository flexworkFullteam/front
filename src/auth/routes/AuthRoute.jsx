import { Route, Routes } from "react-router-dom";
import { LoginProfePage } from "../pages/LoginProfePage";
import { LoginCompanyPage } from "../pages/LoginCompanyPage";
import { RegisterProfePage } from "../pages/RegisterProfePage";
import { RegisterCompanyPage } from "../pages/RegisterCompanyPage";

export const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/loginProf" element={<LoginProfePage />} />
      <Route path="/loginComp" element={<LoginCompanyPage />} />
      {/* <Route path="login" element={<h1>LoginPage</h1> } /> */}
      <Route path="/registerProf" element={<RegisterProfePage />} />
      <Route path="/registerComp" element={<RegisterCompanyPage />} />
      {/* <Route path="register" element={<h1>RegisterPage</h1>} /> */}
      {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
    </Routes>
  );
};
