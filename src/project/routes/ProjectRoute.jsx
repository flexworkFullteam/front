import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { SearchPage } from "../pages/SearchPage.jsx/SearchPage";
import { DetailPage } from "../pages/DetailPage/DetailPage";
import { AccountPage } from "../pages/AccountPage/AccountPage";
import { Payment } from "../components/Payment/Payment";
import { Success } from "../components/Payment/Success";
import { Pending } from "@mui/icons-material";
import { Failure } from "../components/Payment/Failure";
import { ProfessionalDetail } from "../components/ProfessionalDetail/ProfessionalDetail";

export const ProjectRoute = ({ status }) => {
  return (
    <Routes>
      <Route path='/home' element={<HomePage />} />

      <Route path='/search/:term?' element={<SearchPage />} />

      <Route path='/detail/:id' element={<DetailPage />} />

      <Route path='/professional/:id' element={<ProfessionalDetail />} />

      {status === "authenticated" && <Route path='/myaccount' element={<AccountPage />} />}

      <Route path='/payment' element={<Payment />} />

      <Route path='/success/:id' element={<Success />} />

      <Route path='/pending' element={<Pending />} />

      <Route path='/failure' element={<Failure />} />

      <Route path='/*' element={<Navigate to='/home' />} />
    </Routes>
  );
};
