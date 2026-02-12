import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, clearSelectedUser } from '../../features/adminSlice';
import StarRating from '../../components/StarRating';
import { HiOutlineArrowLeft, HiOutlineUser, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

const UserDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedUser, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getUserById(id));
        return () => dispatch(clearSelectedUser());
    }, [dispatch, id]);

    if (isLoading || !selectedUser) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    const roleBadge = (role) => {
        const colors = { ADMIN: 'bg-indigo-500/20 text-indigo-400', USER: 'bg-cyan-500/20 text-cyan-400', OWNER: 'bg-violet-500/20 text-violet-400' };
        return <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[role]}`}>{role}</span>;
    };

    return (
        <div className="max-w-2xl mx-auto p-6 page-enter">
            <button onClick={() => navigate('/admin/users')} className="btn btn-ghost btn-sm text-slate-400 mb-4">
                <HiOutlineArrowLeft /> Back to Users
            </button>

            <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">
                        {selectedUser.name?.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{selectedUser.name}</h1>
                        {roleBadge(selectedUser.role)}
                    </div>
                </div>

                <div className="space-y-4 divide-y divide-base-300">
                    <div className="flex items-center gap-3 pt-4">
                        <HiOutlineMail className="text-indigo-400 text-xl" />
                        <div>
                            <p className="text-xs text-slate-500">Email</p>
                            <p className="text-slate-200">{selectedUser.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                        <HiOutlineLocationMarker className="text-indigo-400 text-xl" />
                        <div>
                            <p className="text-xs text-slate-500">Address</p>
                            <p className="text-slate-200">{selectedUser.address || '—'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                        <HiOutlineUser className="text-indigo-400 text-xl" />
                        <div>
                            <p className="text-xs text-slate-500">Role</p>
                            <p className="text-slate-200">{selectedUser.role}</p>
                        </div>
                    </div>

                    {/* If store owner, show store rating */}
                    {selectedUser.role === 'OWNER' && selectedUser.store && (
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold text-slate-200 mb-3">Store Information</h3>
                            <div className="bg-base-300/30 rounded-xl p-4">
                                <p className="text-slate-300 font-medium">{selectedUser.store.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <StarRating rating={Math.round(selectedUser.store.averageRating)} size="text-lg" />
                                    <span className="text-slate-400">({selectedUser.store.averageRating?.toFixed(1) || '0.0'})</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
