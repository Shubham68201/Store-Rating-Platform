import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyStoreRatings } from '../../features/ratingSlice';
import StatsCard from '../../components/StatsCard';
import StarRating from '../../components/StarRating';
import { HiOutlineStar, HiOutlineUsers, HiOutlineUser } from 'react-icons/hi';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OwnerDashboard = () => {
    const dispatch = useDispatch();
    const { myStoreData, isLoading } = useSelector((state) => state.ratings);

    useEffect(() => {
        dispatch(getMyStoreRatings());
    }, [dispatch]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    if (!myStoreData) {
        return (
            <div className="p-6 page-enter">
                <div className="glass-card p-12 text-center">
                    <HiOutlineBuildingStorefront className="text-5xl mx-auto mb-3 text-slate-500" />
                    <h2 className="text-xl font-semibold text-slate-300">No Store Assigned</h2>
                    <p className="text-slate-400 mt-2">You don't have a store assigned to your account yet.</p>
                </div>
            </div>
        );
    }

    const { store, ratings, totalRatings } = myStoreData;

    // Rating distribution
    const ratingDist = [1, 2, 3, 4, 5].map((r) => ratings.filter((rt) => rt.rating === r).length);

    const barData = {
        labels: ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'],
        datasets: [{
            label: 'Ratings',
            data: ratingDist,
            backgroundColor: ['rgba(239,68,68,0.6)', 'rgba(245,158,11,0.6)', 'rgba(234,179,8,0.6)', 'rgba(34,197,94,0.6)', 'rgba(99,102,241,0.6)'],
            borderColor: ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#6366f1'],
            borderWidth: 2,
            borderRadius: 8,
        }],
    };

    return (
        <div className="p-6 page-enter">
            <h1 className="text-3xl font-bold gradient-text mb-2">Store Dashboard</h1>
            <p className="text-slate-400 mb-8">{store.name}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard title="Average Rating" value={store.averageRating?.toFixed(1) || '0.0'} icon={HiOutlineStar} color="amber" />
                <StatsCard title="Total Ratings" value={totalRatings} icon={HiOutlineUsers} color="indigo" />
                <StatsCard title="Store Email" value={store.email} icon={HiOutlineBuildingStorefront} color="violet" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rating distribution chart */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Rating Distribution</h3>
                    <Bar data={barData} options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { ticks: { color: '#64748b', stepSize: 1 }, grid: { color: 'rgba(51,65,85,0.3)' } },
                            x: { ticks: { color: '#64748b' }, grid: { display: false } },
                        },
                    }} />
                </div>

                {/* Average rating display */}
                <div className="glass-card p-6 flex flex-col items-center justify-center">
                    <p className="text-slate-400 text-sm mb-2">Overall Rating</p>
                    <p className="text-6xl font-bold gradient-text mb-3">{store.averageRating?.toFixed(1) || '0.0'}</p>
                    <StarRating rating={Math.round(store.averageRating)} size="text-3xl" />
                    <p className="text-slate-400 text-sm mt-3">Based on {totalRatings} rating{totalRatings !== 1 ? 's' : ''}</p>
                </div>
            </div>

            {/* Users who rated */}
            <div className="glass-card p-6 mt-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-4">Users Who Rated Your Store</h3>
                {ratings.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No ratings yet</p>
                ) : (
                    <div className="space-y-3">
                        {ratings.map((r) => (
                            <div key={r._id} className="flex items-center justify-between p-3 rounded-xl bg-base-300/30 hover:bg-base-300/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                                        {r.user?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{r.user?.name || 'Unknown'}</p>
                                        <p className="text-xs text-slate-400">{r.user?.email || ''}</p>
                                        {r.review && <p className="text-sm text-slate-300 mt-1 italic">"{r.review}"</p>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-start mt-2 sm:mt-0">
                                    <StarRating rating={r.rating} size="text-sm" />
                                    <span className="text-sm font-medium text-white">{r.rating}/5</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;
