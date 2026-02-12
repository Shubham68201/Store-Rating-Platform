import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-base-200/50 border-t border-base-300 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold gradient-text mb-4">
                            <HiOutlineBuildingStorefront className="text-2xl text-indigo-400" />
                            StoreRate
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The premier platform for discovering and rating the best local stores. Empowering customers and business owners alike.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/stores" className="hover:text-indigo-400 transition-colors">Browse Stores</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Login</Link></li>
                            <li><Link to="/signup" className="hover:text-indigo-400 transition-colors">Sign Up</Link></li>
                            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-base-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} StoreRate Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <span className="hover:text-slate-300 cursor-pointer">Security</span>
                        <span className="hover:text-slate-300 cursor-pointer">Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
