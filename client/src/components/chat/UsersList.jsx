import React from "react";
import {
  FaSearch,
  FaCircle,
  FaRocket,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../store/slice/user/user.thunk";
import {
  setSelectUser,
  clearSearchResults,
} from "../../store/slice/user/user.slice";
import useDateFormatter from "../../hook/useDateFormatter";

const UsersList = ({
  selectedUser,
  usersWithLastMessage,
  currentUser,
  searchTerm,
  setSearchTerm,
  setShowMobileChat,
  searchResults = [],
  searchLoading = false,
}) => {
  const { formatDate } = useDateFormatter();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onlineUsers, socket } = useSelector((state) => state.socket);

  const handleLogout = async () => {
    if (socket) {
      socket.disconnect();
    }
    dispatch(logoutUserThunk());
    toast.success("Logout successfull");
    navigate("/login");
  };

  const handleSelectUser = (user) => {
    dispatch(setSelectUser(user));

    if (searchTerm.trim()) {
      setSearchTerm("");
      dispatch(clearSearchResults());
    }

    if (setShowMobileChat) {
      setShowMobileChat(true);
    }
  };

  const displayUsers = searchTerm.trim() ? searchResults : usersWithLastMessage;

  return (
    <div className="w-full h-full bg-base-200 md:border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <FaRocket />
            ChatFlow
          </h1>
          <ThemeSwitcher />
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search users by username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchLoading ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="loading loading-spinner loading-sm"></div>
            </div>
          ) : searchTerm.trim() ? (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          ) : null}
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {searchTerm.trim() && searchResults.length === 0 && !searchLoading ? (
          <div className="p-4 text-center text-base-content/60">
            <p>No users found matching "{searchTerm}"</p>
          </div>
        ) : (
          displayUsers?.map((user) => (
            <div
              key={user?._id}
              onClick={() => handleSelectUser(user)}
              className={`p-4 border-b border-base-300/50 cursor-pointer hover:bg-base-300/50 transition-colors active:bg-base-300/70 ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 border-l-4 border-l-primary"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-base-300 overflow-hidden">
                    <img
                      src={user?.avatar}
                      alt={user?.fullname}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.fullname
                        )}&background=random`;
                      }}
                    />
                  </div>
                  {onlineUsers?.includes(user?._id) && (
                    <FaCircle className="absolute -bottom-0.5 -right-0.5 text-green-500 text-xs bg-base-200 rounded-full p-0.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-base text-base-content truncate">
                      {user?.fullname}
                    </h3>
                    {!searchTerm.trim() && (
                      <span className="text-xs text-base-content/60 flex-shrink-0 ml-2">
                        {formatDate(user?.time)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-base-content/70 truncate">
                      {searchTerm.trim()
                        ? `@${user?.username}`
                        : user?.lastMessage || "No message yet"}
                    </p>
                    {!searchTerm.trim() && user?.unread > 0 && (
                      <span className="bg-primary text-primary-content text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0 ml-2">
                        {user?.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Current User Profile */}
      <div className="p-4 flex justify-between items-center border-t border-base-300 bg-base-200/50">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-base-300 overflow-hidden">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.fullname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    currentUser?.fullname || "User"
                  )}&background=random`;
                }}
              />
            </div>
            <FaCircle className="absolute -bottom-0.5 -right-0.5 text-green-500 text-xs bg-base-200 rounded-full p-0.5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base text-base-content truncate">
              {currentUser?.fullname}
            </h3>
            <p className="text-sm text-base-content/60 truncate">
              @{currentUser?.username}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-error btn-sm ml-2 flex-shrink-0"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-1" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
