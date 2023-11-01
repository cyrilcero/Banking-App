import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";

function SecuredRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");
  const paramID = useLoaderData();

  if (!currentUser || paramID !== currentUser.accountID) {
    // insert toast/alert here
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
}

export function SecuredAdminRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");

  if (!currentUser || currentUser.isAdmin === false) {
    // insert toast/alert here
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}
export function LoggedInRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");

  if (currentUser) {
    // insert toast/alert here
    return (
      <Navigate to={`/overview/${currentUser.accountID}`} replace={true} />
    );
  }
  return <>{children}</>;
}

export default SecuredRoute