import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute"; // New import
import * as auth from "../utils/auth";
import * as api from "../utils/api";
import AppContext from "../context/AppContext";
import "./styles/App.css";

function App() {
  // New state variable - userData
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  // Invoke the hook. It's necessary to invoke the hook in both 
  // components.
  const location = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
        // Remove the call to the navigate() hook: it's not
        // necessary anymore.
      })
      .catch(console.error);
  }, []);

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }

    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          
          // After login, instead of navigating always to /ducks, 
          // navigate to the location that is stored in state. If
          // there is no stored location, we default to 
          // redirecting to /ducks.
          const redirectPath = location.state?.from?.pathname || "/ducks";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(username, email, password)
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  };
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Routes>
        <Route
          path="/ducks"
          element={
            <ProtectedRoute>
              <Ducks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfile userData={userData} />
            </ProtectedRoute>
          }
        />
        {/* Wrap our /login route in a ProtectedRoute. Make sure to 
        specify the anoymous prop, to redirect logged-in users 
        to "/". */}
        <Route
          path="/login"
          element={
            <ProtectedRoute anonymous>
              <div className="loginContainer">
                <Login handleLogin={handleLogin} />
              </div>
            </ProtectedRoute>
          }
        />
        {/* Wrap our /register route in a ProtectedRoute. Make sure to
        specify the anoymous prop, to redirect logged-in users 
        to "/". */}
        <Route
          path="/register"
          element={
            <ProtectedRoute anonymous>
              <div className="registerContainer">
                <Register handleRegistration={handleRegistration} />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/ducks" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;