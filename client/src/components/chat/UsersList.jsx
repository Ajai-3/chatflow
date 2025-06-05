import React from "react";
import { FaSearch, FaCircle, FaRocket } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../../store/slice/user/user.thunk";
import { setSelectUser } from "../../store/slice/user/user.slice";
import { setOnlineUsers } from "../../store/slice/socket/socket.slice";

const UsersList = ({
  selectedUser,
  usersWithLastMessage,
  currentUser,
  searchTerm,
  setSearchTerm,
}) => {
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
  };

  return (
    <div className="w-80 bg-base-200 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <FaRocket />
            MyApp Chat
          </h1>
          <ThemeSwitcher />
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-base-100 border border-base-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {usersWithLastMessage?.map((user) => (
          <div
            key={user?._id}
            onClick={() => handleSelectUser(user)}
            className={`p-4 border-b border-base-300/50 cursor-pointer hover:bg-base-300/50 transition-colors ${
              selectedUser?._id === user._id
                ? "bg-primary/10 border-l-4 border-l-primary"
                : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
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
                  <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-base-200 rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-base-content truncate">
                    {user?.fullname}
                  </h3>
                  <span className="text-xs text-base-content/60">
                    {user?.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-base-content/70 truncate">
                    {user?.lastMessage || "No message yet"}
                  </p>
                  {user?.unread > 0 && (
                    <span className="bg-primary text-primary-content text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {user?.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        key={currentUser?.id}
        className="p-4 flex justify-between items-center border-t border-amber-50"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-base-300 overflow-hidden">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.fullname}
                className="w-full h-full object-cover"
              />
            </div>
            <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-base-200 rounded-full" />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-base-content truncate">
                {currentUser?.fullname}
              </h3>
              <h3 className="truncate text-gray-500">
                @{currentUser?.username}
              </h3>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-2 py-1 rounded-2xl hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
