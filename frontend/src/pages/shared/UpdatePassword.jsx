import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearError, clearMessage } from '../../features/authSlice';
import { HiOutlineLockClosed } from 'react-icons/hi';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { isLoading, error, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (error) { toast.error(error); dispatch(clearError()); }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (message) { toast.success(message); dispatch(clearMessage()); setForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }
    }, [error, message, dispatch]);

    const validate = () => {
        const errs = {};
        if (form.newPassword.length < 8) errs.newPassword = 'Must be at least 8 characters';
        if (form.newPassword.length > 16) errs.newPassword = 'Must not exceed 16 characters';
        if (!/[A-Z]/.test(form.newPassword)) errs.newPassword = 'Must have at least one uppercase letter';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword)) errs.newPassword = 'Must have at least one special character';
        if (form.newPassword !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(updatePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword }));
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 page-enter">
            <h1 className="text-2xl font-bold gradient-text mb-6">Update Password</h1>
            <div className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                placeholder="8-16 chars, uppercase + special" required />
                        </div>
                        {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none" required />
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                    <button type="submit" disabled={isLoading}
                        className="btn w-full bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0">
                        {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
