import "./Login.css";
import React, { useState, useContext } from "react";
import logo from "../../assets/icons/logo-dolphin.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import AuthContext from "../../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      login(data.token, data.user);
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-back">Welcome back!</div>
      <img src={logo} alt="" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="login-form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <GreenButton text="login" type="submit" />
      </form>
      <div className="sign-up-account">
        <span>Don't have an account?</span>
        <Link to="/signup" style={{ textDecoration: "none", width: "100%" }}>
          <GreenButton
            text="sign up"
            style={{
              backgroundColor: "#EAEAEA",
              color: "#53A856",
              border: "1px solid #53A856",
              width: "100%",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
