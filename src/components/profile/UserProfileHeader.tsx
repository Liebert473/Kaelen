import React, { useState } from "react";

// Define the props interface for the UserProfileHeader component
interface UserProfileHeaderProps {
  avatarSrc: string;
  name: string;
  title: string;
}

// UserProfileHeader component
const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  avatarSrc,
  name,
  title,
}) => {
  const [activeButton, setActiveButton] = useState<string>("App"); // State to manage active button

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const Button: React.FC<{ name: string; icon: React.ReactNode }> = ({
    name,
    icon,
  }) => (
    <button
      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
        activeButton === name
          ? "bg-gray-100 text-gray-800 shadow-sm"
          : "bg-white text-gray-600 hover:bg-gray-50"
      }`}
      onClick={() => handleButtonClick(name)}
    >
      {icon}
      <span className="ml-2 font-medium">{name}</span>
    </button>
  );

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-xl overflow-hidden mr-4">
          <img
            src={avatarSrc}
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/64x64/cccccc/333333?text=AV"; // Fallback placeholder
            }}
          />
        </div>
        {/* Name and Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-500 text-sm">{title}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <Button
          name="App"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
          }
        />
        <Button
          name="Messages"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.105A9.702 9.702 0 0112 4c4.97 0 9 3.582 9 8z"
              ></path>
            </svg>
          }
        />
        <Button
          name="Settings"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.942 3.313.823 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.942 1.543-.823 3.313-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.942-3.313-.823-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.942-1.543.823-3.313 2.37-2.37a1.724 1.724 0 002.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default UserProfileHeader;
