import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardPage } from "../pages/DashboardPage"
import { DetailUserPage } from "../pages/DetailUserPage"


export const AdminRoute = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/detail/:id" element={<DetailUserPage />} /> 
        
        <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
