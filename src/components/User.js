import React, { useState, useEffect } from "react";
import userImage from "../assets/userImage.png";
import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const User = ({ user, selectUser, user1, chat }) => {
  const [data, setData] = useState("");
  const { currentUser } = useAuth();
  useEffect(() => {
    const user2 = user?.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(firestore, "lastMessage", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);
  return (
    <div
      className={`user-container ${
        chat.displayName === user.displayName ? "selected-user" : ""
      }`}
      onClick={() => selectUser(user)}
    >
      <div className="user-image">
        <img src={user.photoURL ? user.photoURL : userImage} alt="user dp" />
      </div>
      <div className="user-name">
        <div className="user">
          <h3>{user.displayName}</h3>
          {data?.from !== user1 && data?.unread && (
            <small className="unread">New</small>
          )}
        </div>
        {data && (
          <div className="message-text">
            <p>
              <strong>{data.from === currentUser.uid ? "Me:" : null} </strong>
              {data.text}
            </p>
          </div>
        )}
      </div>
      <div
        className={`user-status  ${user.online ? "online" : "offline"}`}
      ></div>
    </div>
  );
};

export default User;
