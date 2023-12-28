import React from "react";
import { userStore } from "../store/userStore";
import { Route, Routes, useLocation } from "react-router-dom";

import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { ValidateCode } from "../pages/auth/ValidateCode";
import { PersonalData } from "../pages/auth/PersonalData";
import { EntryPassword } from "../pages/auth/EntryPassword";
import { ForgotPassword } from "../pages/auth/ForgotPassword";

const PublicRouter = {
  login: "login",
  register: "register",
  PersonalData: "personal-data",
  validateCode: "validate-code",
  EntryPassword: "entry-password",
  forgotPassword: "forgot-password",
};

export const AuthRouter = () => {
  const location = useLocation();
  const {
    userData: { tokenRegister },
  } = userStore();

  if (location.pathname === "/auth/personal-data" && tokenRegister === null) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path={PublicRouter.login} element={<Login />} />
      <Route path={PublicRouter.register} element={<Register />} />
      <Route path={PublicRouter.validateCode} element={<ValidateCode />} />
      <Route path={PublicRouter.PersonalData} element={<PersonalData />} />
      <Route path={PublicRouter.EntryPassword} element={<EntryPassword />} />
      <Route path={PublicRouter.forgotPassword} element={<ForgotPassword />} />
    </Routes>
  );
};
