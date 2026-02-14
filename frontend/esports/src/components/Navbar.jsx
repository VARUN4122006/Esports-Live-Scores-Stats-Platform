import { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = ({ onSignInClick, user, onLogout, showNavLinks = true }) => {
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
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div
                    onClick={(e) => handleNavClick(e, '/')}
                    className="flex items-center gap-2 text-2xl font-heading font-bold tracking-tighter text-white cursor-pointer group transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                    <Zap className="w-8 h-8 text-gold group-hover:rotate-12 transition-transform duration-300" />
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:to-gold transition-all">
                        EsportsBuzz
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {showNavLinks && navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-300 hover:text-gold transition-all duration-200 text-sm font-body font-semibold uppercase tracking-widest hover:tracking-[0.15em] relative py-1 group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2 focus:outline-none group focus-visible:ring-2 focus-visible:ring-gold rounded-full p-0.5 transition-transform active:scale-95 duration-100"
                                    title={`Logged in as ${user.username || 'User'} — Access Dashboard & Session controls`}
                                >
                                    <div className="relative">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full border-2 border-amber object-cover group-hover:border-gold transition-colors" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber to-gold flex items-center justify-center text-white font-bold border-2 border-white/20 text-sm shadow-lg group-hover:shadow-amber/50 transition-all">
                                                {user.username ? user.username.substring(0, 1).toUpperCase() : 'G'}
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#39FF14] rounded-full border-2 border-bg-dark shadow-[0_0_8px_#39FF14]"></div>
                                    </div>
                                </button>

                                {/* Dropdown */}
                                <div
                                    className={`absolute right-0 top-full mt-3 w-48 bg-card border border-gold/20 rounded-xl shadow-2xl overflow-hidden z-[60] origin-top-right transition-all duration-200 ease-out ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
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
                                            className="flex items-center gap-3 px-4 py-2.5 text-xs text-gray-300 hover:bg-white/5 hover:text-gold transition-colors group"
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
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleSignInClick}
                                className="relative z-[60] px-6 py-2 bg-gradient-to-r from-gold to-amber text-bg-dark border border-gold hover:brightness-110 transition-all duration-300 rounded-full font-button font-bold uppercase text-xs tracking-widest cursor-pointer hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`absolute top-full left-0 w-full bg-card border-b border-gold/10 md:hidden flex flex-col items-center py-8 gap-6 shadow-2xl transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
            >
                {showNavLinks && navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            handleNavClick(e, link.href);
                        }}
                        className="text-xl text-white font-bold hover:text-gold transition-colors"
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
                        className="px-8 py-3 bg-gradient-to-r from-gold to-amber text-bg-dark rounded-full font-bold cursor-pointer hover:brightness-110 transition-colors"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
