import React, { useEffect, useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatArea from "../components/chat/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatUsersThunk,
  getProfileThunk,
} from "../store/slice/user/user.thunk";
import { sendMessageThunk } from "../store/slice/message/message.thunk";
import {
  initializeSocket,
  setOnlineUsers,
} from "../store/slice/socket/socket.slice";
import EmojiPicker from "emoji-picker-react";
import { setNewMessage } from "../store/slice/message/message.slice";

const Home = () => {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  const dispatch = useDispatch();
  const { selectedUser, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    if (user?._id) {
      if (socket) socket.disconnect();

      dispatch(initializeSocket(user._id));
    }
  }, [isAuthenticated, user?._id, dispatch]);

  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    })

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getChatUsersThunk());
  }, [dispatch]);

  const currentUser = useSelector((state) => state.user.user);
  const usersWithLastMessage = useSelector((state) => state.user.chatUsers);

  const messages = useSelector((state) => state.message.messages);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && selectedUser) {
      let receiverId = selectedUser._id;
      dispatch(sendMessageThunk({ receiverId, message }));
      setMessage("");
    }
  };

  // Handle mobile chat view when user is selected
  useEffect(() => {
    if (selectedUser) {
      setShowMobileChat(true);
    }
  }, [selectedUser]);

  // Handle back button functionality
  const handleBackToUsers = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="h-screen bg-base-100 flex">
      {/* Mobile View - Show either users list or chat */}
      <div className="md:hidden w-full">
        {!showMobileChat ? (
          <UsersList
            usersWithLastMessage={usersWithLastMessage}
            selectedUser={selectedUser}
            currentUser={currentUser}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowMobileChat={setShowMobileChat}
          />
        ) : (
          <ChatArea
            selectedUser={selectedUser}
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            onBackToUsers={handleBackToUsers}
            isMobile={true}
          />
        )}
      </div>

      {/* Desktop View - Show both sidebar and chat */}
      <div className="hidden md:flex w-full">
        {/* Users List Sidebar */}
        <div className="w-80 lg:w-96 flex-shrink-0">
          <UsersList
            usersWithLastMessage={usersWithLastMessage}
            selectedUser={selectedUser}
            currentUser={currentUser}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1">
          <ChatArea
            selectedUser={selectedUser}
            messages={messages}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isMobile={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
