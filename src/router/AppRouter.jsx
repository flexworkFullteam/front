import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";
import { useProjectStore } from "../hooks/useProjectStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { AdminRoute } from "../admin/routes/AdminRoute";

export const AppRouter = () => {
  const { projects, startLoadingProject } = useProjectStore();
  const { user, status, startLoginWithToken } = useAuthStore();

  useEffect(() => {
    startLoadingProject();
    startLoginWithToken();
  }, []);

  return (
    <>
      <Nav />
      <Routes>
        {user.type === 1 || user.type === 2 || user.type === 3 ? (
          <Route path="/*" element={<ProjectRoute status={status} />} />
        ) : null}
        
        {status === 'not-authenticated' && (
          <>
            <Route path="/auth/*" element={<AuthRoute />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        )}

        {user.type === 1 && (
          <Route path="/*" element={<AdminRoute />} />
        )}

        {user.type === 4 && (
          <Route path="/*" element={<YourComponentForUserType4 />} />
        )}
      </Routes>
      <Footer />
    </>
  );
};
