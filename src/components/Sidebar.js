import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestore } from "../firebase/config";
import {
  collection,
  where,
  query,
  onSnapshot,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

//styles and components
import User from "./User";
import "./Sidebar.css";

const Sidebar = ({ chat, setChat }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const user1 = currentUser.uid;
  useEffect(() => {
    const usersRef = collection(firestore, "users");
    //create query
    const q = query(usersRef, where("uid", "not-in", [currentUser.uid]));
    //execute Query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);
  // console.log(users);
  const selectUser = async (user) => {
    setChat(user);
    const user2 = user.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const docSnap = await getDoc(doc(firestore, "lastMessage", id));
    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(firestore, "lastMessage", id), { unread: false });
    }
  };

  return (
    <div className="sidebar">
      <div className="user-items">
        {users.map((user) => {
          return (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
