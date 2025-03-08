
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUrlAnalytics } from '../store/urlSlice';
import { ArrowLeft, Globe, Clock, UserRound, Monitor } from 'lucide-react';
import Button from '../components/ui/Button';

const Analytics = () => {
  const { shortText } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isLoading, analytics } = useSelector(state => state.url);
  const analyticsData = analytics[shortText] || [];
  
  // Count clicks by date
  const [clicksByDate, setClicksByDate] = useState({});
  // Count clicks by referrer
  const [clicksByReferrer, setClicksByReferrer] = useState({});
  // Count clicks by country
  const [clicksByCountry, setClicksByCountry] = useState({});
  // Count clicks by device/user agent
  const [clicksByDevice, setClicksByDevice] = useState({});
  
  useEffect(() => {
    dispatch(fetchUrlAnalytics(shortText));
  }, [dispatch, shortText]);
  
  useEffect(() => {
    if (analyticsData.length > 0) {
      // Process analytics data
      const byDate = {};
      const byReferrer = {};
      const byCountry = {};
      const byDevice = {};
      
      analyticsData.forEach(click => {
        // Format date (YYYY-MM-DD)
        const date = new Date(click.createdAt).toISOString().split('T')[0];
        byDate[date] = (byDate[date] || 0) + 1;
        
        // Referrer
        const referrer = click.referrer || 'Unknown';
        byReferrer[referrer] = (byReferrer[referrer] || 0) + 1;
        
        // Country
        const country = click.country || 'Unknown';
        byCountry[country] = (byCountry[country] || 0) + 1;
        
        // Device (simplified)
        let device = 'Other';
        if (click.userAgent.includes('Mobile')) device = 'Mobile';
        else if (click.userAgent.includes('Tablet')) device = 'Tablet';
        else if (click.userAgent.includes('Windows') || click.userAgent.includes('Mac') || click.userAgent.includes('Linux')) device = 'Desktop';
        
        byDevice[device] = (byDevice[device] || 0) + 1;
      });
      
      setClicksByDate(byDate);
      setClicksByReferrer(byReferrer);
      setClicksByCountry(byCountry);
      setClicksByDevice(byDevice);
    }
  }, [analyticsData]);
  
  const renderBarChart = (data, title, icon) => {
    const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        <div className="space-y-3">
          {sortedEntries.length > 0 ? (
            sortedEntries.map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">{key}</span>
                  <span className="text-sm font-medium">{value} ({Math.round(value / total * 100)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.round(value / total * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No data available</p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics for /{shortText}</h1>
          <p className="text-gray-600">Track how your shortened URL is performing</p>
        </div>
        
        <div className="bg-blue-50 px-4 py-2 rounded-md">
          <p className="text-sm text-gray-600">Total Clicks</p>
          <p className="text-2xl font-bold text-blue-700">{analyticsData.length}</p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading analytics data...</p>
        </div>
      ) : analyticsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderBarChart(clicksByDate, 'Clicks by Date', <Clock size={20} className="text-blue-600" />)}
          {renderBarChart(clicksByReferrer, 'Traffic Sources', <Globe size={20} className="text-green-600" />)}
          {renderBarChart(clicksByCountry, 'Geographic Distribution', <UserRound size={20} className="text-purple-600" />)}
          {renderBarChart(clicksByDevice, 'Devices', <Monitor size={20} className="text-orange-600" />)}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">No clicks recorded for this URL yet.</p>
          <p className="text-gray-500 mb-6">Share your URL to start collecting analytics data.</p>
          <Button onClick={() => navigate('/my-urls')}>Back to My URLs</Button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
