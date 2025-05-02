import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check authentication status
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Check auth status when component mounts
    checkAuthStatus();

    // Create a custom event listener for auth changes
    window.addEventListener('storage', (event) => {
      if (event.key === 'token') {
        checkAuthStatus();
      }
    });

    // Create a custom event listener for auth changes from within the app
    window.addEventListener('authChange', checkAuthStatus);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authChange', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    setIsLoggedIn(false);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <img 
              src="/assets/ai_quiz.png" 
              alt="AI Quiz Logo" 
              className="h-25 w-auto rounded-md"
            />
            <span className="text-white font-bold text-xl hidden sm:block">AI Quiz Generator</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to={isLoggedIn ? "/dashboard" : "/"} className="text-white hover:text-indigo-200 transition-colors px-3 py-2 text-sm font-medium">
              {isLoggedIn ? "Dashboard" : "Home"}
            </Link>
            <Link to="/about" className="text-white hover:text-indigo-200 transition-colors px-3 py-2 text-sm font-medium">
              About
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white hover:text-indigo-200 transition-colors px-3 py-2 text-sm font-medium">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-white text-indigo-600 hover:bg-indigo-100 transition-colors px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to={isLoggedIn ? "/dashboard" : "/"} className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-bold">
              {isLoggedIn ? "Dashboard" : "Home"}
            </Link>
            <Link to="/about" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-bold">
              About
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-bold">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left bg-white text-indigo-600 hover:bg-indigo-100 block px-3 py-2 rounded-md text-base font-bold mt-1 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="w-full text-left bg-white text-indigo-600 hover:bg-indigo-100 block px-3 py-2 rounded-md text-base font-bold mt-1 shadow-md">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;