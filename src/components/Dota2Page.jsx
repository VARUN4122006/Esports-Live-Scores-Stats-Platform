import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, User, BarChart3, Radio, ChevronRight, MapPin, Swords, Target, Zap, AlertTriangle, RefreshCw, Clock, Heart, UserPlus } from 'lucide-react';
import { useFollowedTeams } from '../context/FollowedTeamsContext';
import { dota2Data } from '../data/dota2Data';

const Dota2Page = ({ onBack }) => {
    const [activeSection, setActiveSection] = useState('live');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataLoadedAt, setDataLoadedAt] = useState(null);

    const navItems = [
        { id: 'live', name: 'Live', icon: Radio },
        { id: 'tournaments', name: 'Tournaments', icon: Trophy },
        { id: 'teams', name: 'Teams', icon: Users },
        { id: 'players', name: 'Players', icon: User },
        { id: 'stats', name: 'Ranks', icon: BarChart3 },
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            if (Math.random() < 0.02) {
                setError("Ancient Connection lost: Valve coordinator unavailable.");
                setIsLoading(false);
                return;
            }
            setDataLoadedAt(new Date(Date.now() - 6 * 60 * 1000));
            setIsLoading(false);
        }, 1000);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#07050a] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mb-6 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    <AlertTriangle className="w-10 h-10 text-purple-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Aegis connection Lost</h2>
                <p className="text-gray-500 max-w-md mb-8 font-bold uppercase text-xs tracking-widest leading-loose">{error}</p>
                <div className="flex gap-4">
                    <button onClick={onBack} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-full transition-all border border-white/10">Back to Base</button>
                    <button onClick={loadData} className="px-8 py-3 bg-purple-600 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.3)]"><RefreshCw className="w-4 h-4" /> Re-summon</button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#07050a] text-white pt-24 pb-20 relative overflow-hidden"
            style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(168, 85, 247, 0.15), transparent)' }}
        >
            {/* Cinematic Background Layer */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 40, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/159816.jpg")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#07050a] via-transparent to-[#07050a]" />
            </motion.div>

            {/* Pulsing Tactical Glow Orbs */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-40 -right-20 w-[500px] h-[500px] bg-amber-600 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group bg-black/40 backdrop-blur-md border border-white/5">
                        <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                            DEFENSE OF THE <span className="text-purple-500 not-italic">ANCIENTS 2</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-medium tracking-tight uppercase italic flex items-center gap-2">
                            Celestial Battle • Pro Circuit
                        </p>
                    </div>
                </div>

                <div className="sticky top-20 z-40 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 mb-10 flex flex-wrap gap-2 shadow-2xl">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => !isLoading && setActiveSection(item.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeSection === item.id ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                <main className="min-h-[60vh]">
                    <DataDelayBanner loadedAt={dataLoadedAt} />
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <SkeletonLoader key="skeleton" type={activeSection} />
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                {activeSection === 'live' && <LiveMatches onSelectMatch={setSelectedMatch} />}
                                {activeSection === 'tournaments' && <TournamentHub />}
                                {activeSection === 'teams' && <TeamSection />}
                                {activeSection === 'players' && <PlayerSection />}
                                {activeSection === 'stats' && <StatsSection />}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            <AnimatePresence>
                {selectedMatch && <MatchCenter match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
            </AnimatePresence>
        </motion.div>
    );
};

const DataDelayBanner = ({ loadedAt }) => {
    if (!loadedAt) return null;
    const mins = Math.floor((Date.now() - loadedAt.getTime()) / 60000);
    if (mins < 5) return null;
    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center gap-3 px-5 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Data delayed — last updated {mins} min ago
        </motion.div>
    );
};

const SkeletonLoader = ({ type }) => {
    if (type === 'live') {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-[#0d0912] border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-2">
                                <div className="w-32 h-4 rounded-lg skeleton-shimmer" />
                                <div className="w-24 h-3 rounded-lg skeleton-shimmer opacity-50" />
                            </div>
                            <div className="w-16 h-6 rounded-full skeleton-shimmer" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map((t) => (
                                <div key={t} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1 h-10 rounded-full skeleton-shimmer" />
                                        <div className="w-10 h-10 rounded-lg skeleton-shimmer" />
                                        <div className="w-28 h-5 rounded-lg skeleton-shimmer" />
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-8 rounded-lg skeleton-shimmer" />
                                        <div className="w-10 h-8 rounded-lg skeleton-shimmer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="w-36 h-3 rounded-lg skeleton-shimmer" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (type === 'stats') {
        return (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-[#0d0912] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-5 px-4 rounded-2xl">
                            <div className="flex items-center gap-6">
                                <div className="w-8 h-8 rounded-lg skeleton-shimmer" />
                                <div className="w-12 h-12 rounded-2xl skeleton-shimmer" />
                                <div className="space-y-2">
                                    <div className="w-32 h-5 rounded-lg skeleton-shimmer" />
                                    <div className="w-20 h-3 rounded-lg skeleton-shimmer opacity-50" />
                                </div>
                            </div>
                            <div className="w-16 h-8 rounded-lg skeleton-shimmer" />
                        </div>
                    ))}
                </div>
                <div className="bg-[#0d0912] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between"><div className="w-20 h-3 rounded skeleton-shimmer" /><div className="w-10 h-3 rounded skeleton-shimmer" /></div>
                            <div className="h-2 rounded-full skeleton-shimmer" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#0d0912] border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 rounded-2xl skeleton-shimmer" />
                        <div className="w-24 h-6 rounded-full skeleton-shimmer" />
                    </div>
                    <div className="w-3/4 h-7 rounded-lg skeleton-shimmer mb-4" />
                    <div className="w-1/2 h-4 rounded-lg skeleton-shimmer mb-8 opacity-50" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-16 rounded-2xl skeleton-shimmer" />
                        <div className="h-16 rounded-2xl skeleton-shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const LiveMatches = ({ onSelectMatch }) => {
    if (!dota2Data.liveMatches || dota2Data.liveMatches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center mb-6 border border-purple-500/20">
                    <Radio className="w-10 h-10 text-purple-500 opacity-60" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">No Live Matches Right Now</h3>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest max-w-md leading-relaxed">Check back soon for upcoming games. Live ancient feeds will appear here.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dota2Data.liveMatches.map((match) => (
                <motion.div
                    key={match.id}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="group relative bg-[#0d0912] border border-white/5 rounded-3xl p-8 hover:border-purple-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl"
                    onClick={() => onSelectMatch(match)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 p-6"><span className="flex items-center gap-2 px-3 py-1 bg-purple-600 rounded-full text-[10px] font-black uppercase animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]"><Radio className="w-3 h-3" /> Live</span></div>
                    <div className="mb-6"><h3 className="text-purple-500 font-black uppercase text-sm tracking-widest mb-1 italic">{match.tournament}</h3><p className="text-gray-500 text-xs font-bold uppercase">{match.round} • {match.map}</p></div>
                    <div className="space-y-4">
                        {match.teams.map((team, idx) => (
                            <div key={team.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-4"><span className={`w-1 h-10 rounded-full ${idx === 0 ? 'bg-purple-500' : 'bg-gray-700'}`} /><div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-black text-xs border border-white/10 shadow-inner">{team.logo}</div><span className="font-bold text-lg tracking-tight uppercase">{team.name}</span></div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold">Kills</p><p className="font-black text-2xl tracking-tighter italic">{team.kills}</p></div>
                                    <div className="text-right min-w-[40px]"><p className="text-[10px] text-gray-500 uppercase font-bold">Rank</p><p className={`font-black text-2xl tracking-tighter ${idx === 0 ? 'text-purple-500 italic' : ''}`}>#{team.rank}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-purple-500 transition-colors"><span className="text-[10px] font-black uppercase tracking-widest text-amber-500">View Aegis Center</span><ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></div>
                </motion.div>
            ))}
        </div>
    );
};

const MatchCenter = ({ match, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-5xl bg-[#08060c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)] flex flex-col md:flex-row h-full max-h-[85vh]">
            <div className="p-10 bg-purple-600 text-white w-full md:w-80 shrink-0 flex flex-col justify-between shadow-[inset_-20px_0_40px_rgba(0,0,0,0.1)]">
                <div>
                    <button onClick={onClose} className="mb-8 hover:bg-black/10 p-2 rounded-full transition-colors"><ChevronRight className="w-8 h-8 rotate-180" /></button>
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic">AEGIS<br />STATS</h2>
                    <div className="bg-black text-purple-400 px-3 py-1 inline-block rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-500/20">The International</div>
                    <div className="space-y-4 text-white/80"><div className="flex items-center gap-3 font-bold"><MapPin className="w-4 h-4" /><span className="text-sm font-black uppercase tracking-tight">{match.map}</span></div><div className="flex items-center gap-3 font-bold"><Radio className="w-4 h-4" /><span className="text-sm font-black uppercase tracking-tight">Phase: Late Game</span></div></div>
                </div>
                <div className="mt-10 pt-6 border-t border-white/20">
                    <p className="text-[10px] uppercase font-bold opacity-70 mb-2">Gold Leader</p>
                    <div className="flex items-center gap-4"><div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center font-black text-purple-500 shadow-lg">DS</div><div><p className="font-black uppercase text-sm">Yatoro</p><p className="text-[10px] uppercase font-bold opacity-70 italic text-white/60">Spirit</p></div></div>
                </div>
            </div>
            <div className="flex-1 p-10 overflow-y-auto bg-black/40 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8"><h3 className="text-2xl font-black uppercase tracking-tight italic">Leaderboard</h3><BarChart3 className="w-6 h-6 text-purple-500" /></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all group">
                            <div className="flex items-center gap-6"><span className={`text-xl font-black ${i === 1 ? 'text-purple-500 italic scale-110' : 'text-gray-500'}`}>#{i}</span><div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-black text-[10px] shadow-inner">H-{i}</div><div><p className="font-bold uppercase tracking-wide group-hover:text-purple-500 transition-colors text-lg">Hero Alpha {i}</p><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> GPM: {600 + i * 20}</p></div></div>
                            <div className="flex items-center gap-8"><div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold">K/D/A</p><p className="font-black text-xl italic">{15 - i}/{5 + i}/{12}</p></div><div className="text-right min-w-[70px] bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl"><p className="text-[10px] text-purple-500 uppercase font-bold">Impact</p><p className="font-black text-xl text-purple-500 italic">{(4.5 - i * 0.2).toFixed(1)}</p></div></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);

const TournamentHub = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dota2Data.tournaments.map((tourney) => (
            <div key={tourney.id} className="group bg-[#0d0912] border border-white/5 rounded-3xl p-8 hover:bg-purple-500/5 hover:border-purple-500/20 transition-all shadow-xl">
                <div className="flex justify-between items-start mb-6"><div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl"><Trophy className="w-8 h-8 text-purple-500" /></div><span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tourney.status === 'Ongoing' ? 'bg-purple-500 text-white border-purple-500 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-white/5 text-white border-white/10'}`}>{tourney.status}</span></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-purple-500 transition-colors italic">{tourney.name}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase mb-6 tracking-widest leading-none">Global Event • {tourney.format}</p>
                <div className="grid grid-cols-2 gap-4"><div className="bg-white/5 border border-white/5 p-4 rounded-2xl shadow-inner"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Total Prize</p><p className="text-lg font-black text-purple-500 tracking-tighter italic">{tourney.prizePool}</p></div><div className="bg-white/5 border border-white/5 p-4 rounded-2xl shadow-inner"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Seeds</p><p className="text-lg font-black tracking-tighter italic">{tourney.teams}</p></div></div>
            </div>
        ))}
    </div>
);

const TeamSection = () => {
    const { toggleFollow, isFollowing } = useFollowedTeams();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dota2Data.teams.map((team) => {
                const followed = isFollowing(team.id);
                return (
                    <div key={team.id} className="bg-[#0d0912] border border-white/5 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-6 mb-8"><div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl font-black italic shadow-[0_0_30px_rgba(168,85,247,0.1)]" style={{ color: team.color }}>{team.logo}</div><div className="flex-1"><h3 className="text-3xl font-black uppercase tracking-tighter italic">{team.name}</h3><div className="flex gap-2 mt-2">{team.achievements.slice(0, 1).map((ach) => (<span key={ach} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-500 italic shadow-sm">🏆 {ach}</span>))}</div></div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleFollow({ ...team, game: 'Dota 2' })}
                                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border ${followed
                                    ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${followed ? 'fill-white' : ''}`} />
                                {followed ? 'Following' : 'Follow'}
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center shadow-inner"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Win %</p><p className="text-xl font-black italic">{team.stats.winRate}</p></div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center shadow-inner"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Avg RR</p><p className="text-xl font-black italic">{team.stats.avgKills}</p></div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center shadow-inner"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Rating</p><p className="text-xl font-black italic">{team.stats.avgPoints}</p></div>
                        </div>
                        <div className="space-y-4 shadow-inner p-2 rounded-2xl bg-black/20 border border-white/5"><p className="text-[9px] text-gray-500 uppercase font-black ml-2 tracking-[0.2em] mb-2 leading-none">Active Roster</p><div className="flex flex-wrap gap-2">{team.roster.map((p) => (<span key={p} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black hover:bg-purple-500/10 hover:border-purple-500/30 transition-all uppercase cursor-pointer italic tracking-wider">{p}</span>))}</div></div>
                    </div>
                );
            })}
        </div>
    );
};

const PlayerSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dota2Data.players.map((player) => (
            <div key={player.id} className="bg-[#0d0912] border border-white/5 rounded-3xl p-8 transition-all flex flex-col xl:flex-row gap-8 shadow-xl border-l-[3px] border-l-purple-500">
                <div className="shrink-0 text-center xl:text-left"><div className="w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-[2.5rem] mx-auto xl:mx-0 mb-4 border border-white/10 flex items-center justify-center p-2 shadow-inner"><img src={player.img} alt={player.name} className="w-full h-full rounded-2xl" /></div><span className="px-4 py-1.5 bg-purple-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]">{player.role}</span></div>
                <div className="flex-1">
                    <div className="mb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-4"><div><h3 className="text-3xl font-black uppercase tracking-tighter mb-1 italic">{player.name}</h3><p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{player.team}</p></div><div className="flex gap-1 h-8">{player.performance.map((val, idx) => (<div key={idx} className="w-2.5 bg-purple-500/20 rounded-t-sm self-end hover:bg-purple-500 transition-colors" style={{ height: `${(val / 50) * 100}%` }} />))}</div></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Target className="w-3 h-3" /> K/D</p><p className="text-md font-black italic">{player.stats.kd}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Swords className="w-3 h-3" /> Finishes</p><p className="text-md font-black italic">{player.stats.kills}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Zap className="w-3 h-3" /> Matches</p><p className="text-md font-black italic">{player.stats.matches}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-purple-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Trophy className="w-3 h-3" /> MVP</p><p className="text-md font-black italic text-purple-500">{player.stats.mvp}</p></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const StatsSection = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 italic"><Swords className="text-purple-500" /> Professional GPM</h3>
            <div className="bg-[#0d0912] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`flex items-center justify-between py-6 ${i !== 3 ? 'border-b border-white/5' : ''} group cursor-default hover:bg-white/5 transition-colors px-4 rounded-2xl`}>
                        <div className="flex items-center gap-6"><span className={`text-2xl font-black ${i === 1 ? 'text-purple-500 italic scale-125' : 'text-gray-500'}`}>0{i}</span><div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black border border-white/5 text-xs">TI</div><div><p className="font-black uppercase tracking-tight text-xl leading-none italic group-hover:text-purple-500 transition-colors">Summoner {i}</p><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 italic">Pro Circuit</p></div></div>
                        <div className="text-right"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Avg GPM</p><p className="font-black text-2xl text-amber-500 tracking-tighter italic">{750 - i * 25}</p></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight italic">MMR Percentile</h3>
            <div className="bg-[#0d0912] border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center"><span className="font-black text-[10px] uppercase tracking-widest italic">{i === 1 ? 'Immortal Rank 1' : i === 2 ? 'Divine' : 'Ancient'}</span><span className="font-black text-xs text-purple-500 italic">{98 - i * i}%</span></div>
                        <div className="h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-purple-500 via-purple-300 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.4)]" style={{ width: `${98 - i * i}%` }} /></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Dota2Page;
