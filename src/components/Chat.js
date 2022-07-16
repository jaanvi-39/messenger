import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore, timestamp, storage } from "../firebase/config";
import {
  collection,
  doc,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

//styles and components
import "./Chat.css";
import MessageForm from "./MessageForm";
import Message from "./Message";

const Chat = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const user1 = currentUser.uid;
  const [chatToggle, setChatToggle] = useState(false);

  useEffect(() => {
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(firestore, "messages", id, "chats");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  }, [chat]);
  console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user1 = currentUser.uid;
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url;
    if (img) {
      const imgRef = ref(storage, `images/${new Date().getTime()}-${img.name}`);
      const snap = await uploadBytes(imgRef, img);
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlurl;
    }
    await addDoc(collection(firestore, "messages", id, "chats"), {
      text,
      from: user1,
      to: user2,
      createdAt: timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(firestore, "lastMessage", id), {
      text,
      from: user1,
      to: user2,
      createdAt: timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setLoading(false);
  };
  return (
    <div className="chat-section">
      {chat ? (
        <>
          <div className="chat-header">
            <h4>{chat.displayName}</h4>
          </div>
          <div className="chats">
            {messages.length
              ? messages.map((message, index) => (
                  <Message key={index} message={message} user1={user1} />
                ))
              : null}
          </div>
          <MessageForm
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
            setImg={setImg}
            loading={loading}
          />
        </>
      ) : (
        <div className="no-chat">
          <h4>Select a user to start conversation</h4>
        </div>
      )}
    </div>
  );
};

export default Chat;
