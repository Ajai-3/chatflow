import React from "react";
import { FaPaperPlane, FaSmile, FaPaperclip } from "react-icons/fa";

const MessageInput = ({
  message,
  setMessage,
  handleEmojiBUttonClick,
  handleSendMessage,
}) => {
  return (
    <div className="p-4 border-t border-base-300 bg-base-100">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          className="btn btn-ghost btn-circle btn-sm flex-shrink-0"
          aria-label="Attach file"
        >
          <FaPaperclip />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-base-200 border border-base-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="button"
            onClick={handleEmojiBUttonClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
            aria-label="Add emoji"
          >
            <FaSmile className="text-3xl" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim()}
          className="btn btn-primary btn-circle btn-sm flex-shrink-0 disabled:opacity-50"
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
