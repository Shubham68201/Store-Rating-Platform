const StatsCard = ({ title, value, icon: Icon, color = 'indigo' }) => {
    const colorMap = {
        indigo: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
        violet: 'from-violet-500/20 to-violet-600/5 text-violet-400 border-violet-500/20',
        cyan: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20',
        emerald: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
        amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    };

    const classes = colorMap[color] || colorMap.indigo;

    return (
        <div className={`stat-glow glass-card p-6 bg-linear-to-br ${classes} border`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400 font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-1">{value ?? '—'}</p>
                </div>
                {Icon && (
                    <div className="p-3 rounded-xl bg-white/5">
                        <Icon className="text-2xl" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
