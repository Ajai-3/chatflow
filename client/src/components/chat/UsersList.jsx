import React from "react";
import { FaSearch, FaCircle, FaRocket } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";

const UsersList = ({ 
  users, 
  selectedUser, 
  setSelectedUser, 
  searchTerm, 
  setSearchTerm 
}) => {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`p-4 border-b border-base-300/50 cursor-pointer hover:bg-base-300/50 transition-colors ${
              selectedUser?.id === user.id ? "bg-primary/10 border-l-4 border-l-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-base-300 overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
                    }}
                  />
                </div>
                {user.online && (
                  <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs bg-base-200 rounded-full" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-base-content truncate">{user.name}</h3>
                  <span className="text-xs text-base-content/60">{user.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-base-content/70 truncate">{user.lastMessage}</p>
                  {user.unread > 0 && (
                    <span className="bg-primary text-primary-content text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
