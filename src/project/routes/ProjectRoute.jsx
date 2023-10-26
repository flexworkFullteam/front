import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { SearchPage } from "../pages/SearchPage.jsx/SearchPage";
import { DetailPage } from "../pages/DetailPage/DetailPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { ProfessionalDetail } from "../components/ProfessionalDetail/ProfessionalDetail";

export const ProjectRoute = ({ status }) => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />

      <Route path="/search/:term?" element={<SearchPage />} />

      <Route path="/detail/:id" element={<DetailPage />} />

      {status === "authenticated" && (
        <Route path="/myaccount" element={<AccountPage />} />
      )}
      <Route path="/professional/:id" element={<ProfessionalDetail />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
