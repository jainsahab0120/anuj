import axios from "axios";
import { useState } from "react";
import { setTokenAndRedirect } from "../common";
import React from "react";
import { registerService } from "@/services";
import { GoogleLogin } from '@react-oauth/google';

import "./style.css";
import { Link } from "react-router-dom";
import { showToast } from "@/utils/toast";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const input = { fullName, email, password };

    const { status, cls, msg, payload } = await registerService(input);

    showToast(msg, cls);

    if (!status) {
      return;
    }

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
      <h2>BookSwap</h2>
        <p style={{textAlign: "center", marginBottom: "1rem"}}>Share the Joy of Reading</p>
        <h2>Register</h2>
        <div className="form-group">
        <GoogleLogin onSuccess={responseMessage} />
          <label style={{marginTop: "1rem"}} htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="register-btn" type="submit">
          Register
        </button>
        Already Have an Account?{" "}
        <Link className="login-link" to="/login">
          Login here
        </Link>
      </form>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <main className="register-page">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;
