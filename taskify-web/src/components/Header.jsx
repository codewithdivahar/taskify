import React from "react";

const Header = ({ displayName, image, onLogoutClick }) => {
  return (
    <header>
      <nav className="flex w-full h-12 border-b-2 shadow-sm items-center px-8 justify-between bg-slate-800">
        <span className="text-xl font-bold text-cyan-600">Taskify</span>
        <div className="flex justify-center items-center gap-5">
          <span className="font-semibold invert">{displayName}</span>
          <button className="invert" onClick={onLogoutClick}>
            Logout
          </button>
          <img
            src={image}
            alt="user"
            className="w-9 h-9 rounded-full object-contain"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
