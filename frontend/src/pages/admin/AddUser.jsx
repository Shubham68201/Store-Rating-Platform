import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../features/adminSlice';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineLocationMarker } from 'react-icons/hi';
import toast from 'react-hot-toast';

const AddUser = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: 'USER' });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const validate = () => {
        const errs = {};
        if (form.name.length < 20) errs.name = 'Name must be at least 20 characters';
        if (form.name.length > 60) errs.name = 'Name must not exceed 60 characters';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
        if (form.password.length < 8 || form.password.length > 16) errs.password = 'Password must be 8-16 characters';
        if (!/[A-Z]/.test(form.password)) errs.password = 'Must have uppercase letter';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) errs.password = 'Must have special character';
        if (form.address.length > 400) errs.address = 'Address too long';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const result = await dispatch(addUser(form));
        if (!result.error) {
            toast.success('User added successfully');
            navigate('/admin/users');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 page-enter">
            <h1 className="text-2xl font-bold gradient-text mb-6">Add New User</h1>
            <div className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                        <div className="relative">
                            <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                placeholder="Full name (min 20 chars)" required />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                        <p className="text-slate-500 text-xs mt-1">{form.name.length}/60</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <div className="relative">
                            <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none" required />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <div className="relative">
                            <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="input input-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none"
                                placeholder="8-16 chars, uppercase + special" required />
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                        <div className="relative">
                            <HiOutlineLocationMarker className="absolute left-3 top-3 text-slate-400" />
                            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="textarea textarea-bordered w-full pl-10 bg-base-300/50 border-base-300 focus:border-indigo-500 focus:outline-none" rows={2} />
                        </div>
                        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="select select-bordered w-full bg-base-300/50 border-base-300">
                            <option value="USER">Normal User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="OWNER">Store Owner</option>
                        </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={isLoading}
                            className="btn flex-1 bg-linear-to-r from-indigo-500 to-violet-500 text-white border-0">
                            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Add User'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/users')} className="btn btn-ghost flex-1">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
