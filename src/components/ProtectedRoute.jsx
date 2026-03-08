import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

// New prop - anonymous. This prop will be used to indicate routes
// that can be visited anonymously (i.e., without authorization). 
// The two 'anonymous' routes in this application are /register 
// and /login.
export default function ProtectedRoute({
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";
  
  // Destructure isLoggedIn from the value provided by AppContext
  const { isLoggedIn } = useContext(AppContext);
  
  // If the user is logged in we redirect them away from our 
  // anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  // If a user is not logged in and tries to access a route that
  // requires authorization, we redirect them to the /login route.
  if (!anonymous && !isLoggedIn) {
    // While redirecting to /login we set the location objects
    // state.from property to store the current location value.
    // This allows us to redirect them appropriately after they
    // log in.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Otherwise, display the children of the current route.
  return children;
}