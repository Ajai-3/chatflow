import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import UsersList from "../components/chat/UsersList";
import ChatArea from "../components/chat/ChatArea";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      lastMessage: "Hey! How are you doing?",
      time: "2m ago",
      unread: 3,
      online: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      lastMessage: "Thanks for the help yesterday",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Carol Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      lastMessage: "See you tomorrow!",
      time: "3h ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "David Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastMessage: "The project looks great",
      time: "1d ago",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "Emma Brown",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      lastMessage: "Can we schedule a meeting?",
      time: "2d ago",
      unread: 2,
      online: true,
    },
  ];

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
        users={users}
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

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--fallback-b1,oklch(var(--b1)))",
            color: "var(--fallback-bc,oklch(var(--bc)))",
            border: "1px solid var(--fallback-b3,oklch(var(--b3)))",
          },
        }}
      />
    </div>
  );
};

export default Home;
