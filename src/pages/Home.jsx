import React from 'react';
import UrlForm from '../components/url/UrlForm';
import { Link } from 'react-router-dom';
import { ArrowRight, Link2, BarChart3, Shield } from 'lucide-react';
import StatsSection from '../components/landing/StatsSection';

const Home = () => {
  return (
    <div className="bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Make Your URLs <br />Short, Simple & Powerful
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Create short, memorable links in seconds. Track your link performance with detailed analytics.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
                  Get Started
                </Link>
                <Link to="/login" className="border border-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300">
                  Log In
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-xl border border-gray-500">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Shorten a URL</h2>
              <UrlForm />
            </div>
          </div>
        </div>
      </section>

      <StatsSection />


      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Cut the Length, Keep the Power</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center hover:border-blue-500/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-900/50 text-blue-400 rounded-full">
                <Link2 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Easy URL Shortening</h3>
              <p className="text-gray-400">
                Create short, memorable links in seconds that are easy to share and remember.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center hover:border-indigo-500/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-indigo-900/50 text-indigo-400 rounded-full">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Detailed Analytics</h3>
              <p className="text-gray-400">
                Track clicks, referrers, and geographic data to understand your audience better.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700 text-center hover:border-purple-500/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-purple-900/50 text-purple-400 rounded-full">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">Secure & Reliable</h3>
              <p className="text-gray-400">
                Your links are secure and will work reliably with our high-performance infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Get more by signing up !</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Create an account to access advanced features like custom URLs, detailed analytics, and link management.
          </p>
          <Link to="/signup" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20">
            Sign Up Now
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
