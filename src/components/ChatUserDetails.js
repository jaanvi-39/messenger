import React from "react";

const ChatUserDetails = ({ chat }) => {
  return (
    <div className="user-details">
      {chat && (
        <>
          <div className="image-container">
            <img src={chat.photoURL} alt="profile photo"></img>
          </div>
          <label htmlFor="user-email">Email</label>
          <input id="user-email" value={chat.email} readOnly />
          <label htmlFor="username">Username</label>
          <input id="username" value={chat.displayName} readOnly></input>
        </>
      )}
      {!chat && <div className="no-chat"> User Details</div>}
    </div>
  );
};

export default ChatUserDetails;
