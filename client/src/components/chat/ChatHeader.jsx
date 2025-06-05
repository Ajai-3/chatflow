import React from "react";
import {
  FaCircle,
  FaPhone,
  FaVideo,
  FaEllipsisV,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import useDateFormatter from "../../hook/useDateFormatter";

const ChatHeader = ({ selectedUser, onBackToUsers, isMobile = false }) => {
  const { formatDate } = useDateFormatter();
  const onlineUsers = useSelector((state) => state.socket.onlineUsers);

  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Mobile Back Button */}
          {isMobile && onBackToUsers && (
            <button
              onClick={onBackToUsers}
              className="btn btn-ghost btn-circle btn-sm flex-shrink-0"
              aria-label="Back to users"
            >
              <FaArrowLeft />
            </button>
          )}

          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-base-300 overflow-hidden">
              <img
                src={selectedUser?.avatar}
                alt={selectedUser?.fullname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    selectedUser?.fullname || "User"
                  )}&background=random`;
                }}
              />
            </div>
            {onlineUsers?.includes(selectedUser?._id) && (
              <FaCircle className="absolute -bottom-0.5 -right-0.5 text-green-500 text-xs bg-base-100 rounded-full p-0.5" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-base text-base-content truncate">
              {selectedUser?.fullname}
            </h2>
            <p className="text-sm text-base-content/60 truncate">
              {onlineUsers?.includes(selectedUser?._id)
                ? "Online"
                : selectedUser?.lastLogout
                ? formatDate(selectedUser?.lastLogout)
                : "Last seen recently"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaPhone />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaVideo />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm">
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
