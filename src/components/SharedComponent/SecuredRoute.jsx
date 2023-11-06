import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import getLocalstorage from "../../utils/getLocalstorage";

export function SecuredRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");
  const paramID = useLoaderData();

  if (!currentUser || paramID !== currentUser.accountID) {
    // insert toast/alert here
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}

export function SecuredAdminRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");

  if (!currentUser || currentUser.isAdmin === false) {
    // insert toast/alert here
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}
export function LoggedInRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");

  if (currentUser && currentUser.isAdmin === true) {
    // insert toast/alert here
    return <Navigate to={`/admin`} replace={true} />;
  } else if (currentUser && currentUser.isAdmin === false) {
    return (
      <Navigate to={`/overview/${currentUser.accountID}`} replace={true} />
    );
  }
  return <>{children}</>;
}
