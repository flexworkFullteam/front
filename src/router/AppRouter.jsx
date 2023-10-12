import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../project/pages/HomePage/HomePage";
import { Nav } from "../project/components/Nav/Nav";
import { AuthRoute } from "../auth/routes/AuthRoute";

export const AppRouter = () => {
  const { status } = useSelector((state) => state);
  console.log(status);
  return (
    <>
      <Nav />
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<HomePage />} />
        ) : (
          <Route path="/auth/*" element={<AuthRoute />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  );
};
