
import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">URLify</Link>
            <p className="mt-4 text-gray-300">
              Simple, fast, and reliable URL shortening service to make your links more manageable.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
              <li><Link to="/my-urls" className="text-gray-300 hover:text-white">My URLs</Link></li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
              <li><Link to="/signup" className="text-gray-300 hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex mt-4 space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <GitHub size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} URLify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
