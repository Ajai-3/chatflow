import React, { useEffect, useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatArea from "../components/chat/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatUsersThunk,
  getProfileThunk,
} from "../store/slice/user/user.thunk";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getChatUsersThunk());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.user);
  const usersWithLastMessage = useSelector((state) => state.user.chatUsers)


  // Mock messages for selected user
  const messages = selectedUser
    ? [
        {
          id: 1,
          text: "Hey! How are you doing?",
          sender: selectedUser.id,
          time: "10:30 AM",
          isMine: false,
        },
        {
          id: 2,
          text: "I'm doing great! Thanks for asking. How about you?",
          sender: "me",
          time: "10:32 AM",
          isMine: true,
        },
        {
          id: 3,
          text: "I'm good too! Working on some exciting projects",
          sender: selectedUser.id,
          time: "10:35 AM",
          isMine: false,
        },
        {
          id: 4,
          text: "That sounds awesome! Would love to hear more about it",
          sender: "me",
          time: "10:36 AM",
          isMine: true,
        },
      ]
    : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      console.log("Sending message:", message, "to user:", selectedUser.name);
      setMessage("");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex">
      <UsersList
        usersWithLastMessage={usersWithLastMessage}
        currentUser={currentUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ChatArea
        selectedUser={selectedUser}
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Home;
