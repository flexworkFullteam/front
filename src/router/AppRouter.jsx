import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../project/pages/HomePage/HomePage";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  console.log(status);
  return (
    <>
      <Nav />
      <Routes>
        {status === "authenticated" ? (
          <Route path="/*" element={<ProjectRoute />} />
        ) : (
          <Route path="/auth/*" element={<AuthRoute />} />
        )}

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
      <Footer />
    </>
  );
};
