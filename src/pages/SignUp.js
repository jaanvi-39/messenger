import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
//Styles
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useNavigate();
  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("No File Selected");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 400000) {
      setThumbnailError("Selected file size must be less than 400kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    try {
      setError(null);
      setLoading(true);
      await signup(username, email, password, thumbnail);
      history("/");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Create an account</h2>
        {error && <p className="error"> {error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              required
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              required
              placeholder="Re-enter Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-container">
            <label htmlFor="profilePic">Profile Picture</label>
            <input type="file" required onChange={handleFileChange} />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </div>
          {loading && (
            <div className="btn-signup">
              <button type="submit" disabled>
                Creating Account
              </button>
            </div>
          )}
          {!loading && (
            <div className="btn-signup">
              <button type="submit"> Register</button>
            </div>
          )}
        </form>
      </div>

      <p className="signin">
        Already have an account ?
        <Link to="/login" className="goto">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
