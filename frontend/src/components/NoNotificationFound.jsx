import React from "react";

const NoNotificationFound = () => {
  return (
    <div className="card bg-base-200 p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">No notifications yet</h3>
      <p className="text-base-content opacity-70">
        When you receive friend requests or messages, they'll appear here!
      </p>
    </div>
  );
};

export default NoNotificationFound;
