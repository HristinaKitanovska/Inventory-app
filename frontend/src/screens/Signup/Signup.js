import "./Signup.css";
import React, { useState } from "react";
import logo from "../../assets/icons/logo-dolphin.svg";
import GreenButton from "../../components/GreenButton/GreenButton";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful!");
      navigate("/");
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
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
        <GreenButton text="signup" type="submit" />
      </form>
      <div className="login-account">
        <span>Already have an account?</span>
        <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
          <GreenButton
            text="log in"
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

export default Signup;
