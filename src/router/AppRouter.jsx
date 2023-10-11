import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Nav } from "../components/Nav/Nav";

export const AppRouter = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};
