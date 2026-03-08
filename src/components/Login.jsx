import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import "./styles/Login.css";

// Destructure the prop.
const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit prevents the default browser behavior and calls
  // the login handler.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="login">
      <Logo title={"CryptoDucks"} />
      <p className="login__welcome">
        This app contains highly sensitive information. Please sign in or
        register to access CryptoDucks.
      </p>
      {/* Add the submission handler as the form's onSubmit attribute. */} 
      <form className="login__form" onSubmit={handleSubmit}>
        {/* ... */}
      </form>
    </div>
  );
};

export default Login;
