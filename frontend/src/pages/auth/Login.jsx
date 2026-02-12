import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../../features/authSlice';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            const routes = { ADMIN: '/admin/dashboard', USER: '/stores', OWNER: '/owner/dashboard' };
            navigate(routes[user.role] || '/stores');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 page-enter">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-3xl font-bold gradient-text mb-2">
                        <HiOutlineBuildingStorefront className="text-4xl text-indigo-400" />
                        StoreRate
                    </div>
                    <p className="text-slate-400">Sign in to your account</p>
                </div>

                {/* Form card */}
                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn w-full bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0 shadow-lg shadow-indigo-500/25"
                        >
                            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
