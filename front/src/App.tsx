import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { DrawerProvider } from "components/drawer/DrawerContext";
import { useEffect } from "react";
import UserService from "services/UserService";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { SnackbarProvider } from "components/snackbar-context";
const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    UserService.checkAuthUser(dispatch);
},[])

  return (
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={
        <DrawerProvider>
      <AdminLayout />
      </DrawerProvider>
      } />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default App;
