import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">Shrinkr</Link>
            <p className="mt-4 text-gray-400">
              Simple, fast, and reliable URL shortening service to make your links more manageable.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold ">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
              <li><Link to="/my-urls" className="text-gray-400 hover:text-white">My URLs</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white">Sign Up</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold">Made with ❤️ by Sandeep Prasad</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://github.com/Sandeep-Petwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-2"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/Sanju_Petwal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-2"
                >
                  <Twitter size={20} />
                  <span>X</span>
                </a>
              </li>
              <li>
                <a
                  href="https://sandeepprasad.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-2"
                >
                  <Globe size={20} />
                  <span>Website</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Shrinkr by Sandeep Prasad.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
