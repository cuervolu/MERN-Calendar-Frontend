import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/router";
import { CalendarRoutes } from "../calendar";
import { useAuthStore } from "../hooks";
import { Preloader } from "../ui/Preloader";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <Preloader />;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarRoutes />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
