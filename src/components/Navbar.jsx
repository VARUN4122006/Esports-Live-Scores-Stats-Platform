import { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSignInClick, user, onLogout }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Why Us', href: '#why-us' },
        { name: 'Games', href: '#games' },
        { name: 'Features', href: '#features' },
    ];

    const handleSignInClick = () => {
        console.log('Sign In Clicked');
        if (onSignInClick) onSignInClick();
    };

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            // Internal section link
            return;
        }
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    onClick={(e) => handleNavClick(e, '/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white cursor-pointer group"
                >
                    <Zap className="w-8 h-8 text-neon-green group-hover:rotate-12 transition-transform" />
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        EsportsBuzz
                    </span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-300 hover:text-neon-blue transition-all duration-300 text-sm font-medium uppercase tracking-widest hover:tracking-[0.15em] relative py-1"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <motion.button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex items-center gap-2 focus:outline-none group focus-visible:ring-2 focus-visible:ring-neon-purple rounded-full p-0.5"
                                    title={`Logged in as ${user.username || 'User'} — Access Dashboard & Session controls`}
                                >
                                    <div className="relative">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-neon-purple object-cover group-hover:border-white transition-colors" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-white font-bold border-2 border-white/20 text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-neon-purple/50 transition-all">
                                                {user.username ? user.username.substring(0, 2).toUpperCase() : 'GP'}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-neon-green rounded-full border-2 border-black shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute right-0 top-full mt-3 w-48 bg-esports-card border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden z-[60]"
                                        >
                                            <div className="p-3 border-b border-white/5 bg-white/5">
                                                <p className="text-white font-bold truncate text-xs">{user.username || 'Gamer'}</p>
                                                <p className="text-[10px] text-gray-500 truncate">{user.email || 'user@example.com'}</p>
                                            </div>
                                            <div className="py-1">
                                                <a
                                                    href="/dashboard"
                                                    onClick={(e) => {
                                                        setIsDropdownOpen(false);
                                                        handleNavClick(e, '/dashboard');
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-neon-blue transition-colors group"
                                                >
                                                    <LayoutDashboard className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                                    Dashboard
                                                </a>
                                                <div className="h-px bg-white/5 mx-2 my-1"></div>
                                                <button
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        onLogout();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors text-left group"
                                                >
                                                    <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button
                                onClick={handleSignInClick}
                                className="relative z-[60] px-6 py-2 bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white transition-all rounded-full font-bold uppercase text-xs tracking-wider cursor-pointer"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-esports-card border-b border-gray-800 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    handleNavClick(e, link.href);
                                }}
                                className="text-xl text-white font-bold hover:text-neon-green transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        {user ? (
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    onLogout();
                                }}
                                className="px-8 py-3 bg-red-500 text-white rounded-full font-bold cursor-pointer hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleSignInClick();
                                }}
                                className="px-8 py-3 bg-neon-purple text-white rounded-full font-bold cursor-pointer"
                            >
                                Sign In
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
