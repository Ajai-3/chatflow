import React, { useEffect, useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatArea from "../components/chat/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatUsersThunk,
  getProfileThunk,
} from "../store/slice/user/user.thunk";
import { sendMessageThunk } from "../store/slice/message/message.thunk";
import { initializeSocket, setOnlineUsers } from "../store/slice/socket/socket.slice";
import EmojiPicker from 'emoji-picker-react';



const Home = () => {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { selectedUser, isAuthenticated, user} = useSelector((state) => state.user)
  const { socket } = useSelector((state) => state.socket)

useEffect(() => {
  if (user?._id) {
    if (socket) socket.disconnect();
    
    dispatch(initializeSocket(user._id));
  }
}, [isAuthenticated, user?._id, dispatch]);

 useEffect(() => {
  if (!socket) return;

  socket.on("onlineUsers", (onlineUsers) => {
    console.log("Online users:", onlineUsers);
    dispatch(setOnlineUsers(onlineUsers));
  });

  return () => {
    socket.off("onlineUsers");
  };
}, [socket, dispatch]);


  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getChatUsersThunk());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.user);
  const usersWithLastMessage = useSelector((state) => state.user.chatUsers)

  const messages = useSelector((state) => state.message.messages)

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(selectedUser._id)

    if (message.trim() && selectedUser) {
      let receiverId = selectedUser._id
      dispatch(sendMessageThunk({ receiverId, message }))
      console.log("Sending message:", message, "to user:", selectedUser.fullname);
      setMessage("");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex">
      {/* <EmojiPicker onEmojiClick={(e, emojiObject) => console.log(emojiObject)} /> */}
      <UsersList
        usersWithLastMessage={usersWithLastMessage}
        selectedUser={selectedUser}
        currentUser={currentUser}
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
