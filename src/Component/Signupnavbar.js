import React, { useState } from 'react';

function Signupnavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="signupnavbar-transparent p-4">
      <div className="max-w-6xl mx-auto flex justify-between  signupnavbar-layout items-center">
        <div className="flex items-center">
          <a href="/" className="text-xl font-semibold text-blue-900">
            TeamPassword
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <p className="text-white">Already Use TeamPassword?</p>
          <a href="/login" className="py-2 px-4 text-white transition duration-150 ease-in-out">
            Sign In
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 toggle-menu-custom">
          <p className="text-white mb-2 signup-layout-adjustment ">Already Use TeamPassword?</p>
          <a href="/login" className="py-2 px-4 text-white transition duration-150 ease-in-out">
            Sign In
          </a>
        </div>
      )}
    </nav>
  );
}

export default Signupnavbar;

