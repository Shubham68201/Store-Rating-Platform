import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirect to appropriate page based on role
        const roleRedirect = {
            ADMIN: '/admin/dashboard',
            USER: '/stores',
            OWNER: '/owner/dashboard',
        };
        return <Navigate to={roleRedirect[user.role] || '/login'} replace />;
    }

    return children;
};

export default ProtectedRoute;
