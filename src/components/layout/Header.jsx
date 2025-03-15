import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
    <header className="bg-dark text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">MiniURL</Link>
          
          {/* Hamburger menu for mobile */}
          <button 
            className="md:hidden p-2"
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

          {/* Navigation menu */}
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto bg-dark md:bg-transparent p-4 md:p-0`}>
            <ul className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {location.pathname !== '/' && (
                <li>
                  <Link to="/" className="hover:text-blue-400 block" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </li>
              )}
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:text-blue-400 block" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/my-urls" className="hover:text-blue-400 block" onClick={() => setIsMenuOpen(false)}>My URLs</Link>
                  </li>
                  <li className="md:ml-4">
                    {/* <span className="mr-3 text-sm block md:inline">Hello, {user?.name}</span> */}
                    <Button onClick={handleLogout} variant="danger" className="py-1 mt-2 md:mt-0">Logout</Button>
                  </li>
                </>
              ) : (
                <>
                  <li className="md:ml-4">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="secondary" className="py-1 w-full md:w-auto">Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="py-1 w-full md:w-auto">Sign Up</Button>
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
