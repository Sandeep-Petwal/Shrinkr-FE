import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyUrls } from '../store/urlSlice';
import UrlForm from '../components/url/UrlForm';
import { Link } from 'react-router-dom';
import { BarChart3, Link2 } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { urls, isLoading } = useSelector(state => state.url);
  
  useEffect(() => {
    dispatch(fetchMyUrls({ limit: 5 }));
  }, [dispatch]);
  
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back, {user?.name}!</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Create New Short URL</h2>
              <Link2 className="text-blue-400" size={24} />
            </div>
            <UrlForm />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent URLs</h2>
              <Link to="/my-urls" className="text-blue-400 hover:text-blue-300">View All</Link>
            </div>
            
            {isLoading ? (
              <p className="text-center py-6 text-gray-400">Loading...</p>
            ) : urls.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Original URL</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Short URL</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {urls.map((url) => {
                      const shortText = url.shortUrl.split('/').pop();
                      return (
                        <tr key={url._id}>
                          <td className="px-4 py-4 text-sm text-gray-300 truncate max-w-[200px]">
                            <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {url.originalUrl}
                            </a>
                          </td>
                          <td className="px-4 py-4 text-sm text-blue-400">
                            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {url.shortUrl}
                            </a>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-400">
                            {new Date(url.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <Link to={`/analytics/${shortText}`} className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                              <BarChart3 size={16} />
                              Analytics
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <p>You haven't created any URLs yet.</p>
                <p className="mt-2">Use the form above to create your first short URL!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Stats</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-gray-400 text-sm">Total URLs</p>
                <p className="text-2xl font-semibold text-white">{urls.length}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-gray-400 text-sm">Account Status</p>
                <p className="text-2xl font-semibold text-white">Active</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">Pro Tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Use custom URL text for branded links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Check analytics to see who's clicking your links</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>Share your shortened URLs on social media</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
