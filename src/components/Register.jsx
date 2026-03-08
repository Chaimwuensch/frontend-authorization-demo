import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";
import "./styles/Register.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Declare a submission handler function. This function just needs
  // to prevent the default browser behavior, and call
  // handleRegistration, passing it the data from the form
  // submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <Logo title={"CryptoDucks"} />
      <p className="register__welcome">Please register.</p>
      {/* Add the submission handler as the form's onSubmit attribute. */} 
      <form className="register__form" onSubmit={handleSubmit}>
        {/* ... */}
      </form>
    </div>
  );
};