import { Route, Routes } from "react-router-dom"


export const ProjectRoute = () => {
  return (
    <Routes>
        <Route path="/*" element={<div>ProjectRoute</div>} />


    </Routes>
  )
}
