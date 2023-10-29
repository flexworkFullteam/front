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
import { UpdateTypePage } from "../project/pages/UpdateTypePage/UpdateTypePage";
import { UserDetail } from "../admin/components/UserDetail/UserDetail";

export const AppRouter = () => {
  const { projects, startLoadingProject } = useProjectStore();
  const { user, status, startLoginWithToken } = useAuthStore();

  useEffect(() => {
    startLoadingProject();
    startLoginWithToken();
  }, []);

  console.log(user);

  return (
    <>
      <Nav />
      <Routes>
        {user.type !== 4 && user.type !== 1 ? <Route path='/*' element={<ProjectRoute status={status} />} /> : null}

        {status === "not-authenticated" && (
          <>
            <Route path='/auth/*' element={<AuthRoute />} />
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
        )}

        {user.type === 1 && <Route path='/*' element={<AdminRoute />} />}

        {user.type === 4 && <Route path='/*' element={<UpdateTypePage />} />}
      </Routes>
      <Footer />
    </>
  );
};
