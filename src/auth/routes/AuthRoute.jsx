import { Route, Routes,Navigate } from "react-router-dom";
import { LoginProfePage } from "../pages/LoginProfePage";
// import { LoginCompanyPage } from "../pages/LoginCompanyPage";
import { RegisterUserPage } from "../pages/RegisterUserPage";
// import { RegisterProfePage } from "../pages/RegisterProfePage";
// import { RegisterCompanyPage } from "../pages/RegisterCompanyPage";

export const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginProfePage />} />

      <Route path="/register" element={<RegisterUserPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
