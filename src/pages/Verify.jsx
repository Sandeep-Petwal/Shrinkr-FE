import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifySignup, clearError } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error, verificationEmail } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!verificationEmail) {
      navigate('/signup');
    }
  }, [verificationEmail, navigate]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      toast.error('Please enter your verification code');
      return;
    }
    
    try {
      await dispatch(verifySignup({
        email: verificationEmail,
        otp,
      })).unwrap();
      
      toast.success('Email verified successfully! Please login.');
      navigate('/login');
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Verify Your Email
        </h2>
        
        {verificationEmail && (
          <p className="text-center mb-6 text-gray-300">
            We've sent a verification code to <strong className="text-blue-400">{verificationEmail}</strong>
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            className="text-center bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            label="6 Digit Verification Code"
            name="otp"
            type="number"
            value={otp}
            maxLength={6}
            minLength={6}
            onChange={handleChange}
            placeholder="Enter the code from your email"
            required
          />
          
          <Button 
            type="submit" 
            fullWidth 
            disabled={isLoading || otp.length !== 6}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
