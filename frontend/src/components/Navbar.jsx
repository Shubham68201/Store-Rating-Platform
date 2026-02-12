import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { logout } from '../features/authSlice';
import { HiOutlineLogout, HiOutlineUser, HiOutlineLockClosed, HiOutlineMenuAlt3 } from 'react-icons/hi';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const navLinks = () => {
        if (!user) return [];
        switch (user.role) {
            case 'ADMIN':
                return [
                    { to: '/admin/dashboard', label: 'Dashboard' },
                    { to: '/admin/users', label: 'Users' },
                    { to: '/admin/stores', label: 'Stores' },
                ];
            case 'USER':
                return [
                    { to: '/stores', label: 'Stores' },
                ];
            case 'OWNER':
                return [
                    { to: '/owner/dashboard', label: 'Dashboard' },
                ];
            default:
                return [];
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-base-200/80 backdrop-blur-xl border-b border-base-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold gradient-text">
                        <HiOutlineBuildingStorefront className="text-2xl text-indigo-400" />
                        StoreRate
                    </Link>

                    {/* Desktop Nav */}
                    {user && (
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks().map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                                            ? 'bg-indigo-500/20 text-indigo-400'
                                            : 'text-slate-300 hover:text-white hover:bg-base-300'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* User section */}
                    {user && (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-300/50">
                                <HiOutlineUser className="text-indigo-400" />
                                <span className="text-sm text-slate-300">{user.name?.split(' ')[0]}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                                    {user.role}
                                </span>
                            </div>
                            <Link
                                to="/update-password"
                                className="btn btn-sm btn-ghost text-slate-400 hover:text-white"
                                title="Change Password"
                            >
                                <HiOutlineLockClosed />
                            </Link>
                            <button onClick={handleLogout} className="btn btn-sm btn-ghost text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                <HiOutlineLogout className="text-lg" />
                            </button>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    {user && (
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden btn btn-sm btn-ghost"
                        >
                            <HiOutlineMenuAlt3 className="text-xl" />
                        </button>
                    )}
                </div>

                {/* Mobile menu */}
                {user && mobileOpen && (
                    <div className="md:hidden pb-4 border-t border-base-300 mt-2 pt-3 space-y-1">
                        {navLinks().map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className={`block px-4 py-2 rounded-lg text-sm ${isActive(link.to) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/update-password" onClick={() => setMobileOpen(false)} className="block px-4 py-2 rounded-lg text-sm text-slate-300">
                            Change Password
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-400">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
