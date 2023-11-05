import { Navigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import getLocalstorage from "../utils/getLocalStorage";
import toastError from "../utils/toastError";
import toastInfo from "../utils/toastInfo";

export function SecuredRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");
  const paramID = useLoaderData();

  if (!currentUser || paramID !== currentUser.accountID) {
    // insert toast/alert here
    toastError("Prohibited link");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}

export function SecuredAdminRoute({ children }) {
  const paramID = useLoaderData();
  const currentUser = getLocalstorage("CurrentUser");
  console.log(paramID);
  if (!currentUser || currentUser.isAdmin === false) {
    // insert toast/alert here
    toastError("You are not allowed to access this link");
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}

export function LoggedInRoute({ children }) {
  const currentUser = getLocalstorage("CurrentUser");
  const paramID = useLoaderData();
  console.log(paramID);

  if (currentUser && currentUser.isAdmin === true) {
    // insert toast/alert here
    toastInfo("You are already logged in");
    return <Navigate to={`/admin`} replace={true} />;
  } else if (currentUser && currentUser.isAdmin === false) {
    toastInfo(`You are already logged in 2!`);
    return (
      <Navigate to={`/overview/${currentUser.accountID}`} replace={true} />
    );
  }
  return <>{children}</>;
}
