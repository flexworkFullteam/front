import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { SearchPage } from "../pages/SearchPage.jsx/SearchPage";
import { DetailPage } from "../pages/DetailPage/DetailPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { CreateProject } from "../components/CreateProject/CreateProject";

export const ProjectRoute = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />

      <Route path="/search/:term?" element={<SearchPage />} />

      <Route path="/detail/:id" element={<DetailPage />} />

      <Route path="/myaccount" element={<AccountPage />} />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
