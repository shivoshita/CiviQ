"use client";

import React, { useState, useEffect } from 'react';
import './login.css';

const Login = () => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginText, setLoginText] = useState("Sign In");

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light';
    const card = document.querySelector('.login-card');
    if (card) {
      card.style.transform = 'translateY(20px)';
      card.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
      }, 100);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginText("Signing In...");

    setTimeout(() => {
      setLoading(false);
      setLoginText("Success! Redirecting...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }, 2000);
  };

  const socialLogin = (provider) => {
    alert(`Social login with ${provider} would be implemented here`);
  };

  return (
    <>
      <div className="bg-animation"></div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? "☀️" : "🌙"}
      </button>

      <div className="login-container">
        <div className="login-card">
          <div className="logo">
            <div className="logo-icon">CQ</div>
            <div className="logo-text">CiViQ</div>
          </div>

          <div className="welcome-text">
            <h1 className="welcome-title">Welcome Back</h1>
            <p className="welcome-subtitle">Sign in to your AI Business Assistant</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                className="form-input"
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="form-input"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" id="remember" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading && <div className="loading" />}
              <span>{loginText}</span>
            </button>
          </form>

          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>

          <div className="social-login">
            <button className="social-btn" onClick={() => socialLogin('Google')}>
              <span>🔗</span> Google
            </button>
            <button className="social-btn" onClick={() => socialLogin('Microsoft')}>
              <span>🏢</span> Microsoft
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
