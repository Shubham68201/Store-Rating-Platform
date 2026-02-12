import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup, clearError } from '../../features/authSlice';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineLocationMarker } from 'react-icons/hi';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            navigate('/stores');
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const validate = () => {
        const errs = {};
        if (form.name.length < 20) errs.name = 'Name must be at least 20 characters';
        if (form.name.length > 60) errs.name = 'Name must not exceed 60 characters';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
        if (form.password.length < 8) errs.password = 'Password must be at least 8 characters';
        if (form.password.length > 16) errs.password = 'Password must not exceed 16 characters';
        if (!/[A-Z]/.test(form.password)) errs.password = 'Password must have at least one uppercase letter';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) errs.password = 'Password must have at least one special character';
        if (form.address.length > 400) errs.address = 'Address must not exceed 400 characters';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(signup(form));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 page-enter">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-3xl font-bold gradient-text mb-2">
                        <HiOutlineBuildingStorefront className="text-4xl text-indigo-400" />
                        StoreRate
                    </div>
                    <p className="text-slate-400">Create your account</p>
                </div>

                <div className="glass-card p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                    placeholder="Enter your full name (min 20 chars)"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                            <p className="text-slate-500 text-xs mt-1">{form.name.length}/60 characters (min 20)</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
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
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                    placeholder="8-16 chars, uppercase + special char"
                                    required
                                />
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Address</label>
                            <div className="relative">
                                <HiOutlineLocationMarker className="absolute left-3 top-3 text-slate-400" />
                                <textarea
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    className="textarea textarea-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none min-h-20"
                                    placeholder="Your address (max 400 chars)"
                                    rows={2}
                                />
                            </div>
                            {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn w-full bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0 shadow-lg shadow-indigo-500/25"
                        >
                            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
