import React, { useMemo } from 'react';

const useDateFormatter = () => {
  const formatDate = (date) => {
    const messageDate = new Date(date);
    const now = new Date();

    const isToday = now.toDateString() === messageDate.toDateString();
    now.setDate(now.getDate() - 1);
    const isYesterday = now.toDateString() === messageDate.toDateString();

    const timeFormat = messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (isToday) {
      return timeFormat;
    }

    if (isYesterday) {
      return "Yesterday";
    }

    return messageDate.toLocaleDateString("en-US", {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return { formatDate };
};

export default useDateFormatter;
