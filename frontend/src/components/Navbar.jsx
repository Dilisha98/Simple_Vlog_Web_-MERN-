import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../pages/AuthContext';

const Navbar = () => {
  
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  return (
    <div>
      <nav className="bg-[#001123] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">CompanyName</h1>

          <div className="space-x-4">
            {username ? (
              <>
                <button
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200 font-semibold"
                  onClick={() => navigate("/createpost")}
                >
                  Create New Post
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-200 font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
