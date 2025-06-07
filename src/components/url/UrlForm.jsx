
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUrl, createFreeUrl, clearCreatedUrl, clearError } from '../../store/urlSlice';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { ClipboardCopy, ExternalLink } from 'lucide-react';

const UrlForm = () => {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customUrlText: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [showResult, setShowResult] = useState(false);
  
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isLoading, error, createdUrl } = useSelector(state => state.url);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  useEffect(() => {
    if (createdUrl) {
      setShowResult(true);
    }
  }, [createdUrl]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.originalUrl.trim()) {
      errors.originalUrl = 'URL is required';
    } else if (!isValidUrl(formData.originalUrl)) {
      errors.originalUrl = 'Please enter a valid URL (include http:// or https://)';
    }
    
    if (formData.customUrlText && !/^[a-zA-Z0-9]{3,}$/.test(formData.customUrlText)) {
      errors.customUrlText = 'Custom text must be at least 3 alphanumeric characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isAuthenticated) {
        await dispatch(createUrl(formData)).unwrap();
      } else {
        await dispatch(createFreeUrl(formData)).unwrap();
      }
      
      // Reset form
      setFormData({
        originalUrl: '',
        customUrlText: '',
      });
      
      toast.success('URL shortened successfully!');
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(createdUrl.shortUrl);
    toast.success('Copied to clipboard!');
  };
  
  const handleCloseModal = () => {
    setShowResult(false);
    dispatch(clearCreatedUrl());
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="URL to Shorten"
          name="originalUrl"
          type="url"
          value={formData.originalUrl}
          onChange={handleChange}
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          required
          error={formErrors.originalUrl}
        />
        
        <Input
          label="Custom URL Text (Optional)"
          name="customUrlText"
          type="text"
          value={formData.customUrlText}
          onChange={handleChange}
          placeholder="yourCustomText"
          error={formErrors.customUrlText}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          disabled={isLoading}
        >
          {isLoading ? 'Shrinking...' : 'Shrink it'}
        </Button>
      </form>
      
      {/* Result Modal */}
      <Modal
        isOpen={showResult}
        onClose={handleCloseModal}
        title="Your Shortened URL"
      >
        {createdUrl && (
          <div className="space-y-4">
            <div className="bg-gray-100 p-3 rounded-md break-all">
              <p className="text-gray-700 mb-1 text-sm">Original URL:</p>
              <p className="text-gray-900">{createdUrl.originalUrl}</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-blue-700 mb-1 text-sm">Shrinken URL:</p>
              <p className="text-blue-900 font-medium break-all">{createdUrl.shortUrl}</p>
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleCopyToClipboard} className="flex items-center gap-2" fullWidth>
                <ClipboardCopy size={16} />
                Copy
              </Button>
              
              <a 
                href={createdUrl.shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" className="flex items-center gap-2" fullWidth>
                  <ExternalLink size={16} />
                  Open
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UrlForm;
