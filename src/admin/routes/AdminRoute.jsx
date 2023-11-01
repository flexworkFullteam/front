import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { DetailUserPage } from "../pages/DetailUserPage";
import { UserDetail } from "../components/UserDetail/UserDetail";
import { DetailPage } from "../../project/pages/DetailPage/DetailPage";
import { CompanyDetail } from "../components/CompanyDetail/CompanyDetail";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/*' element={<DashboardPage />} />

      <Route path='/user/detail/:id' element={<UserDetail />} />

      <Route path='/project/detail/:id' element={<DetailPage />} />
      <Route path='/company/detail/:id' element={<CompanyDetail />} />
    </Routes>
  );
};
