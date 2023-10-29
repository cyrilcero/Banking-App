import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import getLocalstorage from "../utils/getLocalstorage";

export function SecuredRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");
  const paramID = useLoaderData();

  if (!currentUser || paramID !== currentUser.accountID) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}

export function SecuredAdminRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");

  if (!currentUser || currentUser.isAdmin === false) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}
