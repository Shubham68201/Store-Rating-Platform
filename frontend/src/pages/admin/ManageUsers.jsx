import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../features/adminSlice';
import DataTable from '../../components/DataTable';
import { HiOutlineSearch, HiOutlineEye, HiOutlinePencil } from 'react-icons/hi';

const ManageUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, isLoading } = useSelector((state) => state.admin);
    const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        dispatch(getUsers({ ...filters, sortBy, order: sortOrder }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, sortBy, sortOrder]);

    const handleSearch = () => {
        dispatch(getUsers({ ...filters, sortBy, order: sortOrder }));
    };

    const handleSort = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const roleBadge = (role) => {
        const colors = { ADMIN: 'badge-primary', USER: 'badge-info', OWNER: 'badge-secondary' };
        return <span className={`badge badge-sm ${colors[role] || ''}`}>{role}</span>;
    };

    const columns = [
        { field: 'name', label: 'Name' },
        { field: 'email', label: 'Email' },
        { field: 'address', label: 'Address', render: (row) => <span className="text-slate-400 truncate max-w-50 block">{row.address || '—'}</span> },
        { field: 'role', label: 'Role', render: (row) => roleBadge(row.role) },
        {
            field: 'actions', label: 'Actions', sortable: false, render: (row) => (
                <div className="flex gap-2">
                    <button onClick={() => navigate(`/admin/users/${row._id}`)} className="btn btn-xs btn-ghost text-indigo-400 hover:text-indigo-300">
                        <HiOutlineEye className="text-base" /> View
                    </button>
                    <button onClick={() => navigate(`/admin/edit-user/${row._id}`)} className="btn btn-xs btn-ghost text-amber-400 hover:text-amber-300">
                        <HiOutlinePencil className="text-base" /> Edit
                    </button>
                </div>
            )
        },
    ];

    return (
        <div className="p-6 page-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold gradient-text">Manage Users</h1>
                <button onClick={() => navigate('/admin/add-user')} className="btn btn-sm bg-linear-to-r from-indigo-500 to-violet-500 text-white border-0">
                    + Add User
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <input value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by name" />
                    <input value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by email" />
                    <input value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by address" />
                    <select value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        className="select select-sm select-bordered bg-base-300/50 border-base-300">
                        <option value="">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                        <option value="OWNER">Owner</option>
                    </select>
                    <button onClick={handleSearch} className="btn btn-sm btn-primary">
                        <HiOutlineSearch /> Search
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : (
                <DataTable columns={columns} data={users} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
            )}
        </div>
    );
};

export default ManageUsers;
