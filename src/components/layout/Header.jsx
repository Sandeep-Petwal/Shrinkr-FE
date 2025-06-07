import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import { LinkIcon } from 'lucide-react';

const NavLink = ({ to, children, onClick, className = '' }) => (
  <li>
    <Link
      to={to}
      className={`hover:text-blue-400 transition-colors duration-200 block ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  </li>
);

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 shadow-lg border-b border-gray-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold font-serif flex items-center gap-2">
            Shrinkr
            <LinkIcon className="w-4 h-4" />
          </Link>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <nav
            className={`
              ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'} 
              md:block absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto 
              bg-gray-900 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none
              transition-all duration-300 ease-in-out
              shadow-xl md:shadow-none
            `}
          >
            <ul className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/my-urls" onClick={() => setIsMenuOpen(false)}>
                    My URLs
                  </NavLink>
                  <li className="md:ml-4">
                    <Button
                      onClick={handleLogout}
                      variant="danger"
                      className="py-1 mt-2 md:mt-0 hover:bg-red-700 transition-colors duration-200"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="md:ml-4 hover:text-gray-400 transition-colors duration-200">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li className="md:ml-4 hover:text-gray-400 transition-colors duration-200">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
