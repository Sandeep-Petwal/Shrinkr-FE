import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };
  
  return (
    <header className="bg-dark text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">URLify</Link>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-urls" className="hover:text-blue-400">My URLs</Link>
                </li>
                <li className="ml-4">
                  <span className="mr-3 text-sm">Hello, {user?.name}</span>
                  <Button onClick={handleLogout} variant="danger" className="py-1">Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li className="ml-4">
                  <Link to="/login">
                    <Button variant="secondary" className="py-1">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <Button className="py-1">Sign Up</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
