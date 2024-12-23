import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">
          <Link to="/">NFL Analysis</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
