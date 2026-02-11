import { useState, useEffect, useRef } from 'react';
import {
    User, Settings, Trophy, Users, Bell, History, Camera,
    Check, X, ChevronRight, Gamepad2, ArrowRight, Star,
    BellOff, Clock, ShieldCheck, Heart, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dashboardData } from '../data/dashboardData';
import { useFollowedTeams } from '../context/FollowedTeamsContext';

const gameLogos = {
    "Free Fire": "https://static-cdn.jtvnw.net/ttv-boxart/502732-600x800.jpg",
    "Battlegrounds Mobile India": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMqXdkuLMcpArjl9XsU0gvWSscdyHefkoh9Q&s",
    "Valorant": "https://static-cdn.jtvnw.net/ttv-boxart/516575-600x800.jpg",
    "League of Legends": "https://static-cdn.jtvnw.net/ttv-boxart/21779-600x800.jpg",
    "Dota 2": "https://static-cdn.jtvnw.net/ttv-boxart/29595-600x800.jpg",
    "Counter-Strike 2": "https://static-cdn.jtvnw.net/ttv-boxart/32399-600x800.jpg"
};

const Dashboard = ({ onBack }) => {
    const { followedTeams, unfollowTeam } = useFollowedTeams();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? { ...dashboardData.user, ...JSON.parse(savedUser) } : dashboardData.user;
    });
    const [followedPlayers, setFollowedPlayers] = useState(dashboardData.followedPlayers);
    const [notifications, setNotifications] = useState(dashboardData.notifications);
    const [favGames, setFavGames] = useState(() => {
        const saved = localStorage.getItem('esportsFavGames');
        return saved ? JSON.parse(saved) : ["Valorant", "League of Legends"];
    });
    const [notifSettings, setNotifSettings] = useState({
        matchStart: true,
        favTeam: true,
        results: false
    });
    const [followTab, setFollowTab] = useState('teams');
    const fileInputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('esportsFavGames', JSON.stringify(favGames));
    }, [favGames]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedUser = { ...user, avatar: reader.result };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        localStorage.setItem('user', JSON.stringify(user));
        setIsEditing(false);
    };

    const toggleGame = (game) => {
        setFavGames(prev =>
            prev.includes(game) ? prev.filter(g => g !== game) : [...prev, game]
        );
    };



    const unfollowPlayer = (id) => {
        setFollowedPlayers(prev => prev.filter(p => p.id !== id));
    };

    const sidebarItems = [
        { id: 'profile', label: 'Overview', icon: User },
        { id: 'games', label: 'My Games', icon: Gamepad2 },
        { id: 'following', label: 'Following', icon: Trophy },
        { id: 'history', label: 'History', icon: History },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden selection:bg-neon-green selection:text-black">
            {/* Background Decorative Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-green/10 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group bg-white/5 border border-white/10">
                            <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Command <span className="text-neon-green not-italic">Center</span></h1>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">User Dashboard • Access Granted</p>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all relative">
                            <Bell className="w-6 h-6 text-gray-400 group-hover:text-white" />
                            {notifications.some(n => n.unread) && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-black" />
                            )}
                        </div>
                        {/* Instant Dropdown Mock */}
                        <div className="absolute right-0 top-full mt-2 w-72 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all shadow-2xl z-50">
                            <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex justify-between">
                                Notifications <span className="text-neon-green">{notifications.length}</span>
                            </h4>
                            <div className="space-y-3">
                                {notifications.map(n => (
                                    <div key={n.id} className="text-xs border-b border-white/5 pb-2 last:border-0 hover:bg-white/5 p-1 rounded transition-colors cursor-pointer">
                                        <p className={`${n.unread ? 'text-white' : 'text-gray-500'} font-medium`}>{n.message}</p>
                                        <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold">{n.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3 space-y-2">
                        {sidebarItems.map(item => (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all group relative overflow-hidden ${activeTab === item.id ? 'bg-neon-green text-black shadow-[0_0_30px_rgba(57,255,20,0.2)]' : 'text-gray-500 hover:text-white'}`}
                            >
                                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-black' : 'group-hover:text-neon-green'} transition-colors duration-200`} />
                                {item.label}
                                {activeTab === item.id && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="ml-auto"
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </motion.button>
                        ))}
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-9 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden min-h-[70vh]">
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-12"
                                >
                                    {/* Profile Header */}
                                    <div className="flex flex-col md:flex-row items-center gap-8">
                                        <div className="relative group">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-neon-green/20 p-2 overflow-hidden bg-black/50 group-hover:border-neon-green/40 transition-colors">
                                                <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-2 right-2 p-3 bg-neon-green text-black rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
                                            >
                                                <Camera className="w-5 h-5" />
                                            </button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </div>
                                        <div className="text-center md:text-left flex-1">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                    className="text-5xl font-black uppercase tracking-tighter mb-2 italic bg-white/10 border border-white/20 rounded-xl px-4 py-2 w-full text-white focus:outline-none focus:border-neon-green"
                                                    autoFocus
                                                />
                                            ) : (
                                                <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">{user.name}</h2>
                                            )}
                                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><ShieldCheck className="w-3 h-3 text-neon-green" /> {user.rank}</span>
                                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10"><Trophy className="w-3 h-3 text-yellow-500" /> {user.points} Points</span>
                                                <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 italic">{user.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                                            className={`px-8 py-3 font-black uppercase tracking-widest rounded-xl transition-[background-color,color,transform] duration-200 shadow-xl active:scale-95 ${isEditing ? 'bg-neon-green text-black hover:bg-white' : 'bg-white text-black hover:bg-neon-green'}`}
                                        >
                                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                                        </button>
                                    </div>

                                    {/* Quick Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Matches Watched', value: '42', icon: Clock },
                                            { label: 'Fav Teams', value: followedTeams.length, icon: Users },
                                            { label: 'Followed Players', value: followedPlayers.length, icon: Heart },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                                                className="bg-black/40 border border-white/5 p-6 rounded-3xl transition-all flex items-center gap-6 group cursor-default"
                                            >
                                                <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-neon-green group-hover:text-black transition-all duration-300">
                                                    <stat.icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
                                                    <p className="text-3xl font-black italic tracking-tighter">{stat.value}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-neon-green/5 border border-neon-green/20 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-neon-green text-black rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">?</div>
                                            <div>
                                                <h4 className="text-xl font-black uppercase italic">Complete Your Daily Mission</h4>
                                                <p className="text-gray-400 text-sm font-medium">Watch a live match for 10 minutes to earn 200 XP.</p>
                                            </div>
                                        </div>
                                        <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest rounded-xl transition-all border border-white/10">Explore Matches</button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'games' && (
                                <motion.div
                                    key="games"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Favorite <span className="text-neon-green">Games</span></h2>
                                        <p className="text-gray-500 uppercase font-black text-[10px] tracking-widest leading-none">Customize your dashboard experience by selecting titles you follow.</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {[
                                            "Free Fire", "Battlegrounds Mobile India", "Valorant",
                                            "Counter-Strike 2", "Dota 2", "League of Legends"
                                        ].map(game => (
                                            <div
                                                key={game}
                                                onClick={() => toggleGame(game)}
                                                className={`relative group cursor-pointer p-4 rounded-3xl border transition-[background-color,border-color,box-shadow] duration-200 ease-out flex flex-col items-center gap-4 text-center overflow-hidden will-change-[background-color,border-color] ${favGames.includes(game) ? 'bg-neon-green/10 border-neon-green shadow-[0_0_20px_rgba(57,255,20,0.1)] font-bold' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
                                            >
                                                <div className={`w-full aspect-[3/4] rounded-2xl overflow-hidden relative mb-2 group-hover:scale-[1.02] transition-transform duration-200 ease-out will-change-transform transform-gpu`}>
                                                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 transition-opacity duration-200 ${favGames.includes(game) ? 'opacity-30' : ''}`} />
                                                    <img
                                                        src={gameLogos[game]}
                                                        alt={game}
                                                        className={`w-full h-full object-cover transition-[filter,opacity] duration-200 ease-out ${favGames.includes(game) ? 'grayscale-0 opacity-100' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <h3 className={`font-black uppercase text-sm tracking-widest leading-none transition-colors duration-200 ${favGames.includes(game) ? 'text-white' : 'text-gray-500'}`}>{game}</h3>
                                                {favGames.includes(game) && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        className="absolute top-4 right-4 bg-neon-green text-black p-1 rounded-full shadow-[0_0_10px_rgba(57,255,20,0.5)] z-20"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                    </motion.div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'following' && (
                                <motion.div
                                    key="following"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                                        <div>
                                            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">My <span className="text-neon-green">Following</span></h2>
                                            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mt-4">
                                                <button onClick={() => setFollowTab('teams')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${followTab === 'teams' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>Teams</button>
                                                <button onClick={() => setFollowTab('players')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${followTab === 'players' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>Players</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {followTab === 'teams' ? (
                                            followedTeams.length > 0 ? followedTeams.map(team => (
                                                <div key={team.id} className="bg-black/40 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all shadow-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-inner border border-white/5" style={{ color: team.color }}>{team.logo}</div>
                                                        <div>
                                                            <h4 className="text-xl font-black uppercase italic leading-none">{team.name}</h4>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">{team.game}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => unfollowTeam(team.id)} className="p-3 bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-500 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                                </div>
                                            )) : (
                                                <EmptyState message="You haven't followed any teams yet" icon={Users} />
                                            )
                                        ) : (
                                            followedPlayers.length > 0 ? followedPlayers.map(player => (
                                                <div key={player.id} className="bg-black/40 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all shadow-lg">
                                                    <div className="flex items-center gap-4">
                                                        <img src={player.img} alt={player.name} className="w-16 h-16 rounded-2xl bg-white/5 object-cover shadow-inner border border-white/5" />
                                                        <div>
                                                            <h4 className="text-xl font-black uppercase italic leading-none">{player.name}</h4>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase mt-2 tracking-widest">{player.team} • {player.game}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => unfollowPlayer(player.id)} className="p-3 bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-500 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                                </div>
                                            )) : (
                                                <EmptyState message="No players followed. Follow the legends." icon={User} />
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'history' && (
                                <motion.div
                                    key="history"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Watch <span className="text-neon-green">History</span></h2>
                                            <p className="text-gray-500 uppercase font-black text-[10px] tracking-widest leading-none">Recently viewed matches and results.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                                        {dashboardData.matchHistory.map(match => (
                                            <div key={match.id} className="bg-black/40 border border-white/5 p-6 rounded-3xl hover:border-white/20 transition-all group flex flex-col md:flex-row items-center gap-8 cursor-pointer shadow-lg active:scale-[0.99]">
                                                <div className="flex items-center gap-4 text-center md:text-left shrink-0">
                                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black italic shadow-inner border border-white/10 group-hover:bg-neon-green/10 transition-colors group-hover:text-neon-green">
                                                        {match.game[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black uppercase italic leading-none">{match.game}</h4>
                                                        <p className="text-[10px] text-gray-600 font-bold uppercase mt-1 tracking-widest">{match.status}</p>
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-center md:text-left">
                                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 leading-none">{match.title}</p>
                                                    <div className="flex items-center justify-center md:justify-start gap-4">
                                                        <span className="font-black uppercase text-xl md:text-2xl tracking-tighter italic whitespace-nowrap">{match.teams[0]}</span>
                                                        <span className="bg-white/10 px-3 py-1 rounded-lg font-black text-xs text-neon-green shadow-inner border border-white/5">{match.result}</span>
                                                        <span className="font-black uppercase text-xl md:text-2xl tracking-tighter italic whitespace-nowrap">{match.teams[1]}</span>
                                                    </div>
                                                </div>
                                                <div className="text-center md:text-right shrink-0">
                                                    <p className="text-md font-black italic">{match.date}</p>
                                                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest leading-none mt-1">{match.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="space-y-12"
                                >
                                    <div>
                                        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-2">Notification <span className="text-neon-green">Alerts</span></h2>
                                        <p className="text-gray-500 uppercase font-black text-[10px] tracking-widest leading-none">Control the data flow and how you receive tactical updates.</p>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { id: 'matchStart', label: 'Match Start Alerts', desc: 'Get notified when a match you follow begins.', icon: Bell },
                                            { id: 'favTeam', label: 'Favorite Team Activities', desc: 'Updates on news, roster changes, and new results.', icon: Heart },
                                            { id: 'results', label: 'Detailed Match Results', desc: 'Instant kill-feed and stat-heavy summaries.', icon: History },
                                        ].map(setting => (
                                            <div key={setting.id} className="bg-black/40 border border-white/5 p-8 rounded-[2rem] flex items-center justify-between gap-6 group hover:border-white/10 transition-colors">
                                                <div className="flex items-center gap-6">
                                                    <div className={`p-4 rounded-2xl transition-colors ${notifSettings[setting.id] ? 'bg-neon-green/10 text-neon-green' : 'bg-white/5 text-gray-500'}`}>
                                                        <setting.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-black uppercase italic leading-none mb-1">{setting.label}</h4>
                                                        <p className="text-sm text-gray-500 font-medium">{setting.desc}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setNotifSettings(prev => ({ ...prev, [setting.id]: !prev[setting.id] }))}
                                                    className={`w-14 h-8 rounded-full transition-all relative ${notifSettings[setting.id] ? 'bg-neon-green' : 'bg-white/10'}`}
                                                >
                                                    <motion.div
                                                        animate={{ x: notifSettings[setting.id] ? 26 : 4 }}
                                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-8 border-t border-white/5">
                                        <button className="flex items-center gap-3 text-red-500 hover:text-red-400 font-black uppercase tracking-widest text-xs transition-colors group">
                                            <BellOff className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            Disable All Notifications
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Background Section Accent */}
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none select-none">
                            <span className="text-[120px] font-black uppercase tracking-tighter leading-none italic">{activeTab}</span>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

const EmptyState = ({ message, icon: Icon }) => (
    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-5 bg-black/40 border border-white/5 rounded-3xl border-dashed">
        <div className="w-20 h-20 bg-neon-green/10 rounded-3xl flex items-center justify-center border border-neon-green/20">
            <Icon className="w-10 h-10 text-neon-green opacity-60" />
        </div>
        <div>
            <p className="text-gray-300 font-black uppercase tracking-widest text-xs mb-1">{message}</p>
            <p className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">Explore matches and tournaments to start following</p>
        </div>
        <button className="px-6 py-2 bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-black uppercase tracking-widest rounded-xl hover:bg-neon-green/20 transition-all">Browse Directory</button>
    </div>
);

const SkeletonLoader = () => (
    <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-40 rounded-full skeleton-shimmer shrink-0" />
            <div className="space-y-4 flex-1 w-full">
                <div className="w-64 h-12 skeleton-shimmer rounded-xl" />
                <div className="flex gap-4">
                    <div className="w-32 h-8 skeleton-shimmer rounded-full" />
                    <div className="w-32 h-8 skeleton-shimmer rounded-full" />
                    <div className="w-40 h-8 skeleton-shimmer rounded-full" />
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-black/40 border border-white/5 rounded-3xl p-6 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl skeleton-shimmer" />
                    <div className="space-y-2 flex-1">
                        <div className="w-20 h-3 skeleton-shimmer rounded" />
                        <div className="w-12 h-8 skeleton-shimmer rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
        <div className="h-32 rounded-[2rem] skeleton-shimmer" />
    </div>
);

export default Dashboard;
