import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Loader } from "../Components";
import { PublicRouter } from "./PublicRouter";
import { userStore } from "../store/userStore";
import { PrivateRouter } from "./PrivateRouter";
import { AuthProvider } from "../auth/authProvider";

export const AppRouter = () => {
  const {
    userData: { logged, checking, ...state },
    setUserData,
  } = userStore();

  const { verifyToken } = AuthProvider();

  useEffect(() => {
    verifyToken(state, setUserData);
  }, []);

  if (checking) return <Loader />;

  return (
    <Routes>
      <Route
        path="/auth/*"
        element={<PublicRouter isAuthenticated={logged} />}
      />
      <Route
        path="/dashboard"
        element={<PrivateRouter isAuthenticated={logged} />}
      />
    </Routes>
  );
};
