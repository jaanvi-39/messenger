import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

//styles

import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const history = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    history("/");
  };

  return (
    <div className="profile">
      <div className="profile-image"></div>
      <div className="details">
        <div className="details-container">
          <div className="image-container">
            <img src={currentUser.photoURL} alt="profile photo"></img>
          </div>
          <label htmlFor="user-email">Email</label>
          <input id="user-email" value={currentUser.email} readOnly />
          <label htmlFor="username">Username</label>
          <input id="username" value={currentUser.displayName} readOnly></input>
          <label htmlFor="user-created">Created at</label>
          <input id="user-created" value={currentUser.email} readOnly></input>
          <button onClick={handleClick}>Go to Chats</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
