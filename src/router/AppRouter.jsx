import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "../project/components/Nav/Nav";
import { Footer } from "../project/components/Footer/Footer";
import { AuthRoute } from "../auth/routes/AuthRoute";
import { ProjectRoute } from "../project/routes/ProjectRoute";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  const { status } = useAuthStore();

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/*" element={<ProjectRoute status={status} />} />

        {status === "not-authenticated" && (
          <>
            <Route path="/auth/*" element={<AuthRoute />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        )}
      </Routes>

      <Footer />
    </>
  );
};
