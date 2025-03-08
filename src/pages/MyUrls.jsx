
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyUrls, deleteUrl } from '../store/urlSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Trash2, BarChart3, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';

const MyUrls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [confirming, setConfirming] = useState(null);
  
  const dispatch = useDispatch();
  const { urls, isLoading, pagination } = useSelector(state => state.url);
  
  useEffect(() => {
    dispatch(fetchMyUrls({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  const handleDelete = async (shortUrl) => {
    if (confirming === shortUrl) {
      try {
        await dispatch(deleteUrl(shortUrl)).unwrap();
        toast.success('URL deleted successfully');
        setConfirming(null);
      } catch (error) {
        toast.error('Failed to delete URL');
      }
    } else {
      setConfirming(shortUrl);
      // Auto-reset after 3 seconds
      setTimeout(() => {
        setConfirming(null);
      }, 3000);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My URLs</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <p>Loading...</p>
          </div>
        ) : urls.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {urls.map((url) => {
                    const shortText = url.shortUrl.split('/').pop();
                    return (
                      <tr key={url._id}>
                        <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-[250px]">
                          <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {url.originalUrl}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600">
                          <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            {url.shortUrl}
                            <ExternalLink size={14} />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(url.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 space-x-4">
                          <Link to={`/analytics/${shortText}`} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                            <BarChart3 size={16} />
                            Analytics
                          </Link>
                          <button 
                            onClick={() => handleDelete(url.shortUrl)} 
                            className={`inline-flex items-center gap-1 ${confirming === url.shortUrl ? 'text-red-600 font-medium' : 'text-gray-600 hover:text-red-600'}`}
                          >
                            <Trash2 size={16} />
                            {confirming === url.shortUrl ? 'Confirm' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing {urls.length} of {pagination.total} results
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center px-3">
                    <span className="text-gray-700">
                      Page {currentPage} of {pagination.totalPages}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't created any URLs yet.</p>
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUrls;
