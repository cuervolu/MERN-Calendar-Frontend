import { Routes, Route, Navigate } from "react-router-dom"
import { SignupPage, LoginPage } from "../pages"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  )
}