import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAdminStores } from '../../features/adminSlice';
import DataTable from '../../components/DataTable';
import StarRating from '../../components/StarRating';
import { HiOutlineSearch, HiOutlinePencil } from 'react-icons/hi';

const ManageStores = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stores, isLoading } = useSelector((state) => state.admin);
    const [filters, setFilters] = useState({ name: '', email: '', address: '' });
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        dispatch(getAdminStores({ ...filters, sortBy, order: sortOrder }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, sortBy, sortOrder]);

    const handleSearch = () => {
        dispatch(getAdminStores({ ...filters, sortBy, order: sortOrder }));
    };

    const handleSort = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const columns = [
        { field: 'name', label: 'Store Name' },
        { field: 'email', label: 'Email' },
        { field: 'address', label: 'Address', render: (row) => <span className="text-slate-400 truncate max-w-50 block">{row.address || '—'}</span> },
        {
            field: 'averageRating', label: 'Rating', render: (row) => (
                <div className="flex items-center gap-2">
                    <StarRating rating={Math.round(row.averageRating)} size="text-sm" />
                    <span className="text-sm text-slate-400">({row.averageRating?.toFixed(1) || '0.0'})</span>
                </div>
            )
        },
        {
            field: 'owner', label: 'Owner', render: (row) => (
                <span className="text-slate-300">{row.owner?.name || '—'}</span>
            )
        },
        {
            field: 'actions', label: 'Actions', sortable: false, render: (row) => (
                <button onClick={() => navigate(`/admin/edit-store/${row._id}`)} className="btn btn-xs btn-ghost text-amber-400 hover:text-amber-300">
                    <HiOutlinePencil className="text-base" /> Edit
                </button>
            )
        },
    ];

    return (
        <div className="p-6 page-enter">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold gradient-text">Manage Stores</h1>
                <button onClick={() => navigate('/admin/add-store')} className="btn btn-sm bg-linear-to-r from-indigo-500 to-violet-500 text-white border-0">
                    + Add Store
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <input value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by name" />
                    <input value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by email" />
                    <input value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} onKeyDown={handleKeyDown}
                        className="input input-sm input-bordered bg-base-300/50 border-base-300" placeholder="Filter by address" />
                    <button onClick={handleSearch} className="btn btn-sm btn-primary">
                        <HiOutlineSearch /> Search
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>
            ) : (
                <DataTable columns={columns} data={stores} onSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
            )}
        </div>
    );
};

export default ManageStores;
