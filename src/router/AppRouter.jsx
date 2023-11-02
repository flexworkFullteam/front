import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { PopUpPersonalData } from "../project/components/PopUpPersonalData/PopUpPersonalData";
import { Modal } from "@mui/material";

export const AppRouter = () => {
  const { projects, startLoadingProject } = useProjectStore();
  const { user, status, startLoginWithToken } = useAuthStore();
  const { getField, getType, getExp_req, getNationality, getLanguage, getItSkills } = useDbTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pathname } = useLocation();

  const handleClose = () => {
    setIsModalOpen(false);
  };

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
  useEffect(() => {
    if (!user.professional_id && !isModalOpen) {
      setIsModalOpen(true); 
    }

    if (!user.id_company && !isModalOpen) {
      setIsModalOpen(true);
    }
  }, []);

  if (status === "checking") {
    return <LoadingComponent />;
  }

  return (
    <>
      {user.type === 2 || user.type === 3 ? (
        <Modal open={isModalOpen} onClose={handleClose} disableEnforceFocus aria-hidden='true'>
          <PopUpPersonalData />
        </Modal>
      ) : null}
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
