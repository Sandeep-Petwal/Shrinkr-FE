import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { login, clearError } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { executeRecaptcha } = useGoogleReCaptcha();


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      alert('Recaptcha not ready. Please try again.');
      return;
    }
    const token = await executeRecaptcha('submit_contact_form');
    const payload = {
      ...formData,
      recaptchaToken: token,
    };

    console.log("payload" , payload)
  


    try {
      await dispatch(login(payload)).unwrap();
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };

  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="youremail@example.com"
            required
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            required
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
