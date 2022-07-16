import React from "react";
import Attachment from "../assets/Attachment";
import send from "../assets/send.png";

const MessageForm = ({ handleSubmit, text, setText, setImg, loading }) => {
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label htmlFor="imageUpload">
        <Attachment />
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageUpload"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div className="text">
        <input
          type="text"
          placeholder="Start Typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
      </div>
      <div className="sm-send">
        <button type="submit">
          <img src={send} />
        </button>
      </div>
      {loading && (
        <div className="send-btn">
          <button type="submit" disabled>
            ...
          </button>
        </div>
      )}
      {!loading && (
        <div className="send-btn">
          <button type="submit">Send</button>
        </div>
      )}
    </form>
  );
};

export default MessageForm;
