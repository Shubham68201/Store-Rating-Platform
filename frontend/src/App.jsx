import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/authSlice';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageStores from './pages/admin/ManageStores';
import AddUser from './pages/admin/AddUser';
import EditUser from './pages/admin/EditUser';
import AddStore from './pages/admin/AddStore';
import EditStore from './pages/admin/EditStore';
import UserDetail from './pages/admin/UserDetail';

// Normal User pages
import StoreList from './pages/user/StoreList';

// Owner pages
import OwnerDashboard from './pages/owner/Dashboard';

// Shared pages
import UpdatePassword from './pages/shared/UpdatePassword';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Determine home redirect based on role
  const getHomeRedirect = () => {
    if (!isAuthenticated || !user) return '/login';
    switch (user.role) {
      case 'ADMIN': return '/admin/dashboard';
      case 'USER': return '/stores';
      case 'OWNER': return '/owner/dashboard';
      default: return '/login';
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: '#1e293b' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#1e293b' } },
          }}
        />

        {isAuthenticated && <Navbar />}

        <main className="grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={getHomeRedirect()} /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to={getHomeRedirect()} /> : <Signup />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['ADMIN']}><ManageUsers /></ProtectedRoute>} />
            <Route path="/admin/users/:id" element={<ProtectedRoute roles={['ADMIN']}><UserDetail /></ProtectedRoute>} />
            <Route path="/admin/add-user" element={<ProtectedRoute roles={['ADMIN']}><AddUser /></ProtectedRoute>} />
            <Route path="/admin/edit-user/:id" element={<ProtectedRoute roles={['ADMIN']}><EditUser /></ProtectedRoute>} />
            <Route path="/admin/stores" element={<ProtectedRoute roles={['ADMIN']}><ManageStores /></ProtectedRoute>} />
            <Route path="/admin/add-store" element={<ProtectedRoute roles={['ADMIN']}><AddStore /></ProtectedRoute>} />
            <Route path="/admin/edit-store/:id" element={<ProtectedRoute roles={['ADMIN']}><EditStore /></ProtectedRoute>} />

            {/* Normal User routes */}
            <Route path="/stores" element={<ProtectedRoute roles={['USER']}><StoreList /></ProtectedRoute>} />

            {/* Store Owner routes */}
            <Route path="/owner/dashboard" element={<ProtectedRoute roles={['OWNER']}><OwnerDashboard /></ProtectedRoute>} />

            {/* Shared routes */}
            <Route path="/update-password" element={<ProtectedRoute roles={['ADMIN', 'USER', 'OWNER']}><UpdatePassword /></ProtectedRoute>} />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to={getHomeRedirect()} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
