import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './store/authSlice';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import MyUrls from './pages/MyUrls';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';
import Redirect from './pages/Redirect';
import RandomImageExplorer from './Temp';
import Temp from './Temp';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Home Route Component
const HomeRoute = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (isAuthenticated) {
    return <Dashboard />
  }

  return <Home />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public routes */}
      {/* BlackBox path */}
      {/* <Route path='test' element={<Temp />} /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeRoute />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify" element={<Verify />} />

        {/* Protected routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="my-urls" element={
          <ProtectedRoute>
            <MyUrls />
          </ProtectedRoute>
        } />
        <Route path="analytics/:shortText" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />

        {/* URL redirection route - this must come after all other routes */}
        <Route path=":shortText" element={<Redirect />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;