import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AuthRoute = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      {/* <Route path="login" element={<h1>LoginPage</h1> } /> */}
      <Route path="register" element={<RegisterPage />} />
      {/* <Route path="register" element={<h1>RegisterPage</h1>} /> */}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
