import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineStar } from 'react-icons/hi';
import { HiOutlineBuildingStorefront, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi2';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                {/* Background blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        The #1 Platform for Store Reviews
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Discover & Rate <br />
                        <span className="gradient-text">Local Businesses</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join thousands of users sharing their experiences. Find the best stores in your area
                        or manage your business reputation with our powerful tools.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/stores" className="btn btn-lg bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white border-0 shadow-lg shadow-indigo-500/25 px-8">
                            Browse Stores
                        </Link>
                        <Link to="/signup" className="btn btn-lg btn-ghost border border-base-300 hover:bg-base-200 text-slate-300">
                            Get Started <HiOutlineArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-base-200/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-8 hover:transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                                <HiOutlineBuildingStorefront className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">For Consumers</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Discover top-rated stores, read authentic reviews, and share your own experiences to help others make better choices.
                            </p>
                        </div>

                        <div className="glass-card p-8 hover:transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                                <HiOutlineUserGroup className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">For Store Owners</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Claim your store, track your ratings analytics, and engage with your customers to build trust and loyalty.
                            </p>
                        </div>

                        <div className="glass-card p-8 hover:transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                                <HiOutlineShieldCheck className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Verified Reviews</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Our trusted platform ensures that all ratings and reviews come from real users, maintaining integrity and transparency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-y border-base-300/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                            <div className="text-slate-500">Registered Stores</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold gradient-text mb-2">10k+</div>
                            <div className="text-slate-500">Happy Users</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold gradient-text mb-2">50k+</div>
                            <div className="text-slate-500">Ratings Submitted</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold gradient-text mb-2">4.8</div>
                            <div className="text-slate-500 flex items-center justify-center gap-1">
                                Average Rating <HiOutlineStar className="text-yellow-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="glass-card p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -z-10"></div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
                        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                            Join the community today. Whether you're looking for great places or managing a business, StoreRate is your partner.
                        </p>
                        <Link to="/signup" className="btn btn-lg bg-white text-indigo-600 hover:bg-slate-100 border-0 px-10">
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
