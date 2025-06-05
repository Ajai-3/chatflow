import React, { useEffect, useState } from "react";
import UsersList from "../components/chat/UsersList";
import ChatArea from "../components/chat/ChatArea";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatUsersThunk,
  getProfileThunk,
  searchUserThunk,
} from "../store/slice/user/user.thunk";
import {
  clearSearchResults,
  addUserToChatList,
  updateLastMessage,
} from "../store/slice/user/user.slice";
import { sendMessageThunk } from "../store/slice/message/message.thunk";
import {
  initializeSocket,
  setOnlineUsers,
} from "../store/slice/socket/socket.slice";
import { setNewMessage } from "../store/slice/message/message.slice";

const Home = () => {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);
  const currentUser = useSelector((state) => state.user.user);
  const usersWithLastMessage = useSelector((state) => state.user.chatUsers);
  const searchResults = useSelector((state) => state.user.searchResults);
  const searchLoading = useSelector((state) => state.user.searchLoading);

  const messages = useSelector((state) => state.message.messages);
  const dispatch = useDispatch();
  const { selectedUser, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm?.trim()) {
        dispatch(searchUserThunk({ username: searchTerm }));
      } else {
        dispatch(clearSearchResults());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

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
      dispatch(setNewMessage(newMessage));

      const senderId = newMessage.senderId;
      if (senderId !== user?._id) {
        let senderUser = usersWithLastMessage.find((u) => u._id === senderId);

        if (!senderUser) {
          dispatch(
            updateLastMessage({
              userId: senderId,
              message: newMessage.message,
              senderId: senderId,
            })
          );
        } else {
          dispatch(
            updateLastMessage({
              userId: senderId,
              message: newMessage.message,
              senderId: senderId,
            })
          );
        }
      }
    });

    return () => {
      socket.off("onlineUsers");
      socket.off("newMessage");
    };
  }, [socket, dispatch, user?._id, usersWithLastMessage]);

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(getChatUsersThunk());
  }, [dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && selectedUser) {
      let receiverId = selectedUser._id;

      // Check if this user is already in chat list
      const existingUser = usersWithLastMessage.find(
        (user) => user._id === selectedUser._id
      );

      // If user is not in chat list (new conversation), add them
      if (!existingUser) {
        dispatch(addUserToChatList(selectedUser));
      } else {
        // Update last message for existing user
        dispatch(
          updateLastMessage({
            userId: selectedUser._id,
            message: message,
            senderId: user?._id,
          })
        );
      }

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

  // Show loading if user is not loaded yet
  if (!user) {
    return (
      <div className="h-screen bg-base-100 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

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
            searchResults={searchResults}
            searchLoading={searchLoading}
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
            searchResults={searchResults}
            searchLoading={searchLoading}
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
