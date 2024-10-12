import axios from "axios";
import { useState } from "react";
import { setTokenAndRedirect } from "../common";
import React from "react";
import { resetService } from "@/services";

import "./style.css";
import { Link } from "react-router-dom";
import { showToast } from "@/utils/toast";

const ResetForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const input = { email, newPassword: password };

    const { status, cls, msg, payload } = await resetService(input);

    showToast(msg, cls);

    if (!status) {
      return;
    }

    setTimeout(() => {
      setTokenAndRedirect(payload);
    }, 2000);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>BookSwap</h2>
        <p style={{textAlign: "center", marginBottom: "1rem"}}>Share the Joy of Reading</p>
        <h2>Reset Password</h2>
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
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-btn" type="submit">
          Reset
        </button>

        <Link className="forgot-password-link" to="/login">
          Remember Password? 
        </Link>
      </form>
    </div>
  );
};

const ForgotPasswordPage = () => {
  return (
    <main className="login-page">
      <ResetForm />
    </main>
  );
};

export default ForgotPasswordPage;
