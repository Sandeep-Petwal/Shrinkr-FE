
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
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Verify Your Email</h2>
        
        {verificationEmail && (
          <p className="text-center mb-6 text-gray-600">
            We've sent a verification code to <strong>{verificationEmail}</strong>
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Verification Code"
            name="otp"
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Enter the code from your email"
            required
          />
          
          <Button 
            type="submit" 
            fullWidth 
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
