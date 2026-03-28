import React from 'react';

const UserAvatar = ({ user, size = "w-10 h-10", textSize = "text-xs", showBorder = true }) => {
  const borderClass = showBorder ? "border-2 border-cashGreen" : "";
  if (user && user.avatar) return <img src={user.avatar} alt="Profile" className={`${size} rounded-full object-cover ${borderClass} shadow-lg bg-gray-800`} />;
  return (
    <div className={`${size} rounded-full bg-gray-700 ${borderClass} flex items-center justify-center text-white font-bold ${textSize} shadow-lg`}>
       {user && user.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
    </div>
  );
};

export default UserAvatar;