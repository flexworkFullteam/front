import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";
import { useProjectStore } from "../hooks/useProjectStore";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  const { projects, startLoadingProject } = useProjectStore();
  const { status, startLoginWithToken } = useAuthStore();

  useEffect(() => {
    startLoadingProject();
    startLoginWithToken();
  }, []);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/*" element={<ProjectRoute status={status} />} />

        {status === "not-auhenticated" && 
          <div>
            <Route path="/auth/*" element={<AuthRoute />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </div>
        }
      </Routes>

      <Footer />
    </>
  );
};
