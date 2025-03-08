
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {isLoading ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
          <p className="text-gray-600">Please wait while we redirect you to the destination.</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Link Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a 
            href="/" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go to Homepage
          </a>
        </div>
      )}
    </div>
  );
};

export default Redirect;
