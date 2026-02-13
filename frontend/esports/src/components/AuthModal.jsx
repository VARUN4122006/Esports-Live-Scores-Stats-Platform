import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogIn, Mail, Eye, EyeOff } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [activeTab, setActiveTab] = useState('existing'); // 'new', 'existing', or 'recovery'
    const [signupStep, setSignupStep] = useState(1); // 1: Email, 2: OTP
    const [recoveryStep, setRecoveryStep] = useState(1); // 1: Email, 2: Success
    const [formData, setFormData] = useState({ username: '', password: '', email: '', otp: '', fullName: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle Escape key to close modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Reset steps when tab changes
    useEffect(() => {
        setSignupStep(1);
        setRecoveryStep(1);
        setError('');
    }, [activeTab]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        // Mock authentication delay
        setTimeout(() => {
            setIsLoading(false);
            console.log('Logged in:', formData);
            if (onLoginSuccess) {
                onLoginSuccess({ username: formData.username });
            }
            onClose();
        }, 1500);
    };

    const handleSendOTP = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.fullName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        // Username Validation
        // Starts with alphabet, no spaces, only alphanumeric and underscores allowed
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (!usernameRegex.test(formData.username)) {
            setError('Username must start with a letter and contain only letters, numbers, or underscores.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.edu\.in)$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid Gmail (@gmail.com) or educational (@...edu.in) address.');
            return;
        }

        // Password Validation
        // Min 8 chars, 1 uppercase, 1 lowercase, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        // Mock OTP sending
        setTimeout(() => {
            setIsLoading(false);
            setSignupStep(2);
            console.log('OTP sent to:', formData.email, '(Mock OTP: 123456)');
        }, 1500);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setError('');

        if (formData.otp !== '123456') {
            setError('Invalid OTP. Please try again.');
            return;
        }

        setIsLoading(true);
        // Mock verification
        setTimeout(() => {
            setIsLoading(false);
            const mockUser = {
                name: formData.fullName,
                email: formData.email,
                username: formData.username
            };

            if (onLoginSuccess) {
                onLoginSuccess(mockUser);
            }
            onClose();
        }, 1500);
    };

    const handlePasswordRecovery = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email) {
            setError('Please enter your email address.');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.edu\.in)$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid Gmail (@gmail.com) or educational (@...edu.in) address.');
            return;
        }

        setIsLoading(true);
        // Mock recovery link sending
        setTimeout(() => {
            setIsLoading(false);
            setRecoveryStep(2);
            console.log('Recovery link sent to:', formData.email);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        key="auth-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        key="auth-modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-esports-card border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-[10000]"
                    >
                        {/* Subtle Header Glow */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"></div>

                        <motion.button
                            onClick={onClose}
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all cursor-pointer p-1 rounded-lg hover:bg-white/5"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-heading font-black tracking-tighter text-white mb-2 uppercase">
                                {activeTab === 'new' ? 'Create Account' : activeTab === 'existing' ? 'Welcome Back' : 'Recover Access'}
                            </h2>
                            <p className="text-gray-400 text-sm font-body">
                                {activeTab === 'recovery' ? 'Enter your details to reset password.' : 'Join the elite arena of esports analytics.'}
                            </p>
                        </div>

                        {/* Tab Switcher */}
                        <div className="flex p-1.5 bg-white/5 rounded-2xl mb-8 border border-white/10 relative">
                            {['new', 'existing'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2.5 text-xs font-button font-black uppercase tracking-widest rounded-xl transition-all relative z-10 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {tab === 'new' ? 'New User' : 'Existing User'}
                                    {['new', 'existing'].includes(activeTab) && activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTabGlow"
                                            className="absolute inset-0 bg-white/10 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'new' ? (
                                <motion.div
                                    key="new"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="space-y-6"
                                >
                                    {signupStep === 1 ? (
                                        <form onSubmit={handleSendOTP} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="text"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-4 focus:ring-neon-blue/10 transition-all placeholder:text-gray-600"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="text"
                                                        value={formData.username}
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-4 focus:ring-neon-blue/10 transition-all placeholder:text-gray-600"
                                                        placeholder="GamerPro123"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-4 focus:ring-neon-blue/10 transition-all placeholder:text-gray-600"
                                                        placeholder="username@gmail.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                                                <div className="relative">
                                                    <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-neon-blue focus:ring-4 focus:ring-neon-blue/10 transition-all placeholder:text-gray-600"
                                                        placeholder="••••••••"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                                    >
                                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Confirm Password</label>
                                                <div className="relative">
                                                    <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        value={formData.confirmPassword}
                                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                                        placeholder="••••••••"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                                    >
                                                        {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>

                                            {error && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold ml-1">
                                                    {error}
                                                </motion.p>
                                            )}

                                            <motion.button
                                                type="submit"
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.02, backgroundColor: 'var(--color-neon-blue)', color: 'black' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-white text-black font-button font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait shadow-xl"
                                            >
                                                {isLoading ? 'Sending OTP...' : 'Send OTP to Gmail'}
                                            </motion.button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Enter OTP</label>
                                                <div className="relative">
                                                    <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="text"
                                                        maxLength="6"
                                                        value={formData.otp}
                                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-neon-purple transition-colors"
                                                        placeholder="••••••"
                                                        required
                                                    />
                                                </div>
                                                <p className="text-[10px] font-dashboard text-gray-500 text-center mt-2 italic">Mock OTP: 123456</p>
                                            </div>

                                            {error && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold ml-1">
                                                    {error}
                                                </motion.p>
                                            )}

                                            <motion.button
                                                type="submit"
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.02, backgroundColor: 'white', color: 'black' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-neon-purple text-white font-button font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait shadow-xl"
                                            >
                                                {isLoading ? 'Verifying...' : 'Verify Access'}
                                            </motion.button>
                                            <button
                                                type="button"
                                                onClick={() => setSignupStep(1)}
                                                className="w-full text-xs text-gray-500 hover:text-white transition-colors uppercase font-button font-bold tracking-widest"
                                            >
                                                Change Email
                                            </button>
                                        </form>
                                    )}

                                    <p className="text-center text-[10px] font-body text-gray-500 px-4">
                                        By signing up, you agree to our <span className="text-white cursor-pointer hover:underline">Terms of Service</span> and <span className="text-white cursor-pointer hover:underline">Privacy Policy</span>.
                                    </p>
                                </motion.div>
                            ) : activeTab === 'existing' ? (
                                <motion.div
                                    key="existing"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type="text"
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                                    placeholder="Enter your username"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="text-[10px] font-body font-bold uppercase tracking-widest text-gray-500">Password</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab('recovery')}
                                                    className="text-[9px] font-button font-bold uppercase tracking-widest text-neon-blue hover:text-white transition-colors"
                                                >
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-500 text-xs font-bold ml-1"
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            whileHover={{ scale: 1.02, opacity: 0.9 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-4 bg-neon-purple text-white font-button font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait shadow-xl mt-4"
                                        >
                                            {isLoading ? 'Authenticating...' : 'Login to Arena'}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="recovery"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-6"
                                >
                                    {recoveryStep === 1 ? (
                                        <form onSubmit={handlePasswordRecovery} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue transition-colors"
                                                        placeholder="username@gmail.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {error && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-bold ml-1">
                                                    {error}
                                                </motion.p>
                                            )}

                                            <motion.button
                                                type="submit"
                                                disabled={isLoading}
                                                whileHover={{ scale: 1.02, backgroundColor: 'var(--color-neon-blue)', color: 'black' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 bg-white text-black font-button font-bold uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait shadow-xl"
                                            >
                                                {isLoading ? 'Sending...' : 'Send Recovery Link'}
                                            </motion.button>

                                            <button
                                                type="button"
                                                onClick={() => setActiveTab('existing')}
                                                className="w-full text-xs text-gray-500 hover:text-white transition-colors uppercase font-button font-bold tracking-widest text-center"
                                            >
                                                Back to Login
                                            </button>
                                        </form>
                                    ) : (
                                        <div className="text-center py-8 space-y-6">
                                            <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto">
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", damping: 12 }}
                                                >
                                                    <Mail className="w-10 h-10 text-neon-green" />
                                                </motion.div>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-bold text-white">Check Your Mail</h3>
                                                <p className="text-gray-400 text-sm px-4">
                                                    We've sent a recovery link to <span className="text-neon-blue font-bold">{formData.email}</span>. Please check your inbox.
                                                </p>
                                            </div>
                                            <motion.button
                                                onClick={() => setActiveTab('existing')}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="text-xs font-bold uppercase tracking-widest text-neon-green bg-neon-green/10 py-2 px-6 rounded-lg hover:bg-neon-green/20 transition-all"
                                            >
                                                Return to Login
                                            </motion.button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
