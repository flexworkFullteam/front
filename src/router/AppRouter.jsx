import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";
import { useProjectStore } from "../hooks/useProjectStore";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const { projects, startLoadingProject } = useProjectStore();

  useEffect(() => {
    startLoadingProject();
  }, []);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/*" element={<ProjectRoute />} />

        <Route path="/auth/*" element={<AuthRoute />} />

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>

      <Footer />
    </>
  );
};
