
import React from 'react';
import UrlForm from '../components/url/UrlForm';
import { Link } from 'react-router-dom';
import { ArrowRight, Link2, BarChart3, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Make Your URLs <br />Short, Simple & Powerful
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Create short, memorable links in seconds. Track your link performance with detailed analytics.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
                  Get Started
                </Link>
                <Link to="/login" className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:bg-opacity-10 transition">
                  Log In
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-gray-800 text-2xl font-bold mb-6">Shorten a URL</h2>
              <UrlForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose URLify?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 text-blue-600 rounded-full">
                <Link2 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy URL Shortening</h3>
              <p className="text-gray-600">
                Create short, memorable links in seconds that are easy to share and remember.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 text-green-600 rounded-full">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track clicks, referrers, and geographic data to understand your audience better.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-purple-100 text-purple-600 rounded-full">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your links are secure and will work reliably with our high-performance infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shortening URLs?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create an account to access advanced features like custom URLs, detailed analytics, and link management.
          </p>
          <Link to="/signup" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
            Sign Up Now
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
