import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ message, user1 }) => {
  const scrollref = useRef();

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div
      className={`message-wrapper ${message.from === user1 ? "own" : ""}`}
      ref={scrollref}
    >
      <p className={`${message.from === user1 ? "me" : "friend"}`}>
        {message.media ? <img src={message.media} alt={message.text} /> : null}
        {message.text}
        <br />
        <small>
          <Moment fromNow>{message.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
