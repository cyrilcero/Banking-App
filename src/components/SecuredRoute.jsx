import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";
import { toastInfo, toastError } from "../utils/toastify";

export function SecuredRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");
  const paramID = useLoaderData();

  if (!currentUser || paramID !== currentUser.accountID) {
    // insert toast/alert here
    toastError("Prohibited link");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}

export function SecuredAdminRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");

  if (!currentUser || currentUser.isAdmin === false) {
    // insert toast/alert here
    toastError("You are not allowed to access this link");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}

export function LoggedInRoute({ children }) {
  const currentUser = getLocalStorage("CurrentUser");

  if (currentUser && currentUser.isAdmin === true) {
    // insert toast/alert here
    toastInfo("You are already logged in");
    return <Navigate to={`/admin`} replace={true} />;
  } else if (currentUser && currentUser.isAdmin === false) {
    toastInfo(`You are already logged in!`);
    return (
      <Navigate to={`/overview/${currentUser.accountID}`} replace={true} />
    );
  }
  return <>{children}</>;
}
