import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser, clearError } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';

const VerifyForm = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error: storeError } = useSelector(state => state.auth);
  
  useEffect(() => {
    // Get email from location state (passed from signup)
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email is provided, redirect to signup
      navigate('/signup');
    }
  }, [location, navigate]);
  
  useEffect(() => {
    if (storeError) {
      toast.error(storeError);
      dispatch(clearError());
    }
  }, [storeError, dispatch]);
  
  const handleChange = (e) => {
    setOtp(e.target.value);
    setError('');
  };
  
  const validateForm = () => {
    if (!otp.trim()) {
      setError('OTP is required');
      return false;
    }
    
    if (!/^\d+$/.test(otp)) {
      setError('OTP must contain only numbers');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await dispatch(verifyUser({ email, otp })).unwrap();
      toast.success('Email verified successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Verify Your Email</h2>
        <p className="text-gray-600">
          We've sent a verification code to {email}. Please enter it below to verify your account.
        </p>
      </div>
      
      <Input
        label="Verification Code"
        name="otp"
        type="text"
        value={otp}
        onChange={handleChange}
        placeholder="Enter the OTP sent to your email"
        required
        error={error}
      />
      
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={isLoading}
      >
        Verify Email
      </Button>
    </form>
  );
};

export default VerifyForm;