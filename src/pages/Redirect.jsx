import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const Redirect = () => {
  const { shortText } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/url/get/${shortText}`);
        
        if (response.success) {
          window.location.href = response.data.originalUrl;
        } else {
          setError('Link not found or has expired');
          setIsLoading(false);
        }
      } catch (error) {
        setError('Link not found or has expired');
        setIsLoading(false);
      }
    };
    
    if (shortText) {
      fetchOriginalUrl();
    }
  }, [shortText]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Redirecting...</h1>
          <p className="text-gray-400">Please wait while we redirect you to the destination.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Link Error</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <a 
            href="/" 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            Go to Homepage
          </a>
        </div>
      )}
    </div>
  );
};

export default Redirect;
