import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../features/adminSlice';
import StatsCard from '../../components/StatsCard';
import { HiOutlineUsers, HiOutlineStar } from 'react-icons/hi';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { stats, isLoading } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    const doughnutData = {
        labels: ['Users', 'Stores', 'Ratings'],
        datasets: [{
            data: stats ? [stats.totalUsers, stats.totalStores, stats.totalRatings] : [0, 0, 0],
            backgroundColor: ['rgba(99, 102, 241, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(6, 182, 212, 0.8)'],
            borderColor: ['rgba(99, 102, 241, 1)', 'rgba(139, 92, 246, 1)', 'rgba(6, 182, 212, 1)'],
            borderWidth: 2,
        }],
    };

    const barData = {
        labels: ['Users', 'Stores', 'Ratings'],
        datasets: [{
            label: 'Count',
            data: stats ? [stats.totalUsers, stats.totalStores, stats.totalRatings] : [0, 0, 0],
            backgroundColor: ['rgba(99, 102, 241, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(6, 182, 212, 0.6)'],
            borderColor: ['rgba(99, 102, 241, 1)', 'rgba(139, 92, 246, 1)', 'rgba(6, 182, 212, 1)'],
            borderWidth: 2,
            borderRadius: 8,
        }],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { labels: { color: '#94a3b8', font: { size: 13 } } },
        },
        scales: {
            y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51, 65, 85, 0.3)' } },
            x: { ticks: { color: '#64748b' }, grid: { display: false } },
        },
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-6 page-enter">
            <h1 className="text-3xl font-bold gradient-text mb-8">Admin Dashboard</h1>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatsCard title="Total Users" value={stats?.totalUsers} icon={HiOutlineUsers} color="indigo" />
                <StatsCard title="Total Stores" value={stats?.totalStores} icon={HiOutlineBuildingStorefront} color="violet" />
                <StatsCard title="Total Ratings" value={stats?.totalRatings} icon={HiOutlineStar} color="cyan" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Platform Overview</h3>
                    <div className="max-w-xs mx-auto">
                        <Doughnut data={doughnutData} options={{ plugins: { legend: { labels: { color: '#94a3b8' } } } }} />
                    </div>
                </div>
                <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-slate-200 mb-4">Statistics</h3>
                    <Bar data={barData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
