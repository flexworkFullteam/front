import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";
import { useProjectStore } from "../hooks/useProjectStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { AdminRoute } from "../admin/routes/AdminRoute";
import { UpdateTypePage } from "../project/pages/UpdateTypePage/UpdateTypePage";
import { VerifyAccount } from "../project/components/VerifyAccount/VerifyAccount";
import { LoadingComponent } from "../project/components/LoadingComponent/LoadingComponent";
import { useDbTableStore } from "../hooks/useDbTableStore";

export const AppRouter = () => {
  const { projects, startLoadingProject } = useProjectStore();
  const { user, status, startLoginWithToken } = useAuthStore();
  const { getField, getType, getExp_req, getNationality, getLanguage, getItSkills } = useDbTableStore();

  const getFields = () => {
    getField();
    getType();
    getExp_req();
    getNationality();
    getLanguage();
    getItSkills();
  };

  useEffect(() => {
    startLoginWithToken();
  }, []);

  useEffect(() => {
    startLoadingProject();
  }, []);

  useEffect(() => {
    getFields();
  }, []);

  // Aca deberia haber

  if (status === "checking") {
    return <LoadingComponent />;
  }

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
        <Route path='/verify/:id/:token' element={<VerifyAccount />} />
      </Routes>
      <Footer />
    </>
  );
};
