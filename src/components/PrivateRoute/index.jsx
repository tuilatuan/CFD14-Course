import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import tokenMethod from "../../utils/token";
import { MODAL_TYPE } from "../../constants/general";
import PATHS from "../../constants/path";

const PrivateRoute = ({ redirecPath = "/" }) => {
  const { handleShowModal } = useAuthContext();
  if (!!!tokenMethod.get()) {
    handleShowModal?.(MODAL_TYPE.login);
    return <Navigate to={redirecPath} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
