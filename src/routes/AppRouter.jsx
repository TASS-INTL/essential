import React, { useEffect } from "react";
// import { useContextChatApp } from "../context/useContext";

// import { Loader } from "../components";
// import { PrivateRouter } from "./PrivateRouter";
import { Login } from "../pages/auth/Login";
import { PublicRouter } from "./PublicRouter";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  //   const { verifyToken, auth } = useContextChatApp().useAuthContext;

  //   useEffect(() => {
  //     verifyToken();
  //   }, [verifyToken]);

  //   if (auth.checking) {
  //     return <Loader />;
  //   }

  return (
    <Routes>
      <Route path="*" element={<PublicRouter isAuthenticated={false} />} />
      {/* 
      <Route
        path="/chat"
        element={<PrivateRouter isAuthenticated={auth.logged} />}
      /> */}
    </Routes>
  );
};
