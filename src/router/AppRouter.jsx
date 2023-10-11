import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Nav } from "../components/Nav/Nav";

export const AppRouter = () => {
  
  const { status } = useSelector(state => state);
  return (
    <Nav />
    <Routes >

      {status === 'authenticated' 
        ? <Route path="/*" element={<HomePage />} />
        : <Route path="/auth/*" element={<HomePage />} />
      } 


      {/* // <Route path="/*" element={<HomePage />} /> */}

     <Route path="/*" element={<Navigate to="/auth/login" />} />

    </Routes>
  )
}
