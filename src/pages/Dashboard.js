import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "./Dashboard.css";
import ChatUserDetails from "../components/ChatUserDetails";
const Dashboard = () => {
  const [chat, setChat] = useState("");

  return (
    <div className="dashboard">
      <div className="sidebar-components">
        <Sidebar chat={chat} setChat={setChat} />
      </div>

      <div className="chat">
        <Chat chat={chat} />
      </div>
      {chat && (
        <div className="details">
          <ChatUserDetails chat={chat} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
