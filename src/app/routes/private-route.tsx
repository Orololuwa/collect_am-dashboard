import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "app/hooks";
import ExpirySession from "app/utils/expirysession";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  let location = useLocation();
  ExpirySession.get("access_token");

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
