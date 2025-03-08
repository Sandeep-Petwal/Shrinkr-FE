import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="container py-12">
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
              <a href="#" className="text-gray-300 hover:text-white" aria-label="GitHub">
                <GitHub size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            &copy; {currentYear} URLify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;