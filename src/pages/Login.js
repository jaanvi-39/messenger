import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
//Styles
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      history("/");
    } catch {
      setError("Failed to Login! Try Again.");
    }

    setLoading(false);
  };
  return (
    <div className="login">
      <div className="login-container">
        <h2>Log in </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            {error && <p className="error">{error}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              required
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {loading && (
            <div className="btn-login">
              <button type="submit" disabled>
                {" "}
                Logging In
              </button>
            </div>
          )}
          {!loading && (
            <div className="btn-login">
              <button type="submit"> Log In</button>
            </div>
          )}
        </form>
      </div>
      <p>
        Don't have an account?
        <Link to="/signup" className="goto">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
