import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, User, BarChart3, Radio, ChevronRight, MapPin, Swords, Target, Zap, AlertTriangle, RefreshCw, Clock, Heart, UserPlus } from 'lucide-react';
import { useFollowedTeams } from '../context/FollowedTeamsContext';
import { bgmiData } from '../data/bgmiData';

const BGMIPage = ({ onBack }) => {
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
        loadBGMIData();
    }, []);

    const loadBGMIData = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            if (Math.random() < 0.03) {
                setError("Protocol interruption: Krafton servers unreachable.");
                setIsLoading(false);
                return;
            }
            setDataLoadedAt(new Date(Date.now() - 7 * 60 * 1000));
            setIsLoading(false);
        }, 1200);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#080a08] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 italic">Connection Failed</h2>
                <p className="text-gray-500 max-w-md mb-8 font-bold uppercase text-xs tracking-widest leading-loose">{error}</p>
                <div className="flex gap-4">
                    <button onClick={onBack} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-full transition-all border border-white/10">Back to Base</button>
                    <button onClick={loadBGMIData} className="px-8 py-3 bg-amber-400 hover:bg-white text-black font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,215,0,0.2)]"><RefreshCw className="w-4 h-4" /> Re-link</button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#080a08] text-white pt-24 pb-20 relative overflow-hidden font-outfit"
            style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(255, 215, 0, 0.1), transparent)' }}
        >
            {/* Cinematic Background Layer with Parallax */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.15 }}
                transition={{ duration: 40, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
                className="absolute inset-0 z-0 opacity-30 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/424/314/HD-wallpaper-battlegrounds-mobile-india-esports-bgmi.jpg")' }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#080a08] via-transparent to-[#080a08]" />
            </motion.div>

            {/* Pulsing Tactical Glow Orbs (Standardized with FF Hub) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-amber-400 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-40 -right-20 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px] opacity-60" />
            </div>

            {/* Subtle Tactical Scanlines */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group bg-black/40 backdrop-blur-md border border-white/5">
                        <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
                            BATTLEGROUNDS MOBILE <span className="text-[#FFD700] not-italic">INDIA</span>
                        </h1>
                        <p className="text-red-500 text-sm font-medium tracking-widest uppercase italic flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                            Level 3 Tactical • Pro Series
                        </p>
                    </div>
                </div>

                <div className="sticky top-20 z-40 bg-black/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-2 mb-20 flex flex-wrap gap-2 shadow-2xl">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => !isLoading && setActiveSection(item.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeSection === item.id ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <div key={i} className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden">
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
                <div className="xl:col-span-2 bg-black/40 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
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
                <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
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
                <div key={i} className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden">
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
    if (!bgmiData.liveMatches || bgmiData.liveMatches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-amber-400/10 rounded-3xl flex items-center justify-center mb-6 border border-amber-400/20">
                    <Radio className="w-10 h-10 text-amber-400 opacity-60" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-2">No Live Matches Right Now</h3>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest max-w-md leading-relaxed">Check back soon for upcoming games. Live battleground feeds will appear here.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bgmiData.liveMatches.map((match) => (
                <motion.div
                    key={match.id}
                    whileHover={{ y: -8, scale: 1.01 }}
                    className="group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-amber-400/40 transition-all cursor-pointer overflow-hidden shadow-2xl"
                    onClick={() => onSelectMatch(match)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-0 right-0 p-6"><span className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full text-[10px] font-black uppercase animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]"><Radio className="w-3 h-3" /> Live</span></div>
                    <div className="mb-6"><h3 className="text-amber-400 font-black uppercase text-sm tracking-widest mb-1 italic">{match.tournament}</h3><p className="text-gray-500 text-xs font-bold uppercase">{match.round} • {match.map}</p></div>
                    <div className="space-y-4">
                        {match.teams.map((team, idx) => (
                            <div key={team.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-4"><span className={`w-1 h-10 rounded-full ${idx === 0 ? 'bg-amber-400' : 'bg-gray-700'}`} /><div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-black text-xs border border-white/10">{team.logo}</div><span className="font-bold text-lg tracking-tight uppercase">{team.name}</span></div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold">Finishes</p><p className="font-black text-2xl tracking-tighter italic">{team.kills}</p></div>
                                    <div className="text-right min-w-[40px]"><p className="text-[10px] text-gray-500 uppercase font-bold">Rank</p><p className={`font-black text-2xl tracking-tighter ${idx === 0 ? 'text-amber-400 italic' : ''}`}>#{team.rank}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-amber-400 transition-colors"><span className="text-[10px] font-black uppercase tracking-widest">Awaiting Spectate...</span><ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></div>
                </motion.div>
            ))}
        </div>
    );
};

const MatchCenter = ({ match, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-5xl bg-[#080a08] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(255,215,0,0.1)] flex flex-col md:flex-row h-full max-h-[85vh]">
            <div className="p-10 bg-amber-400 text-black w-full md:w-80 shrink-0 flex flex-col justify-between shadow-[inset_-20px_0_40px_rgba(0,0,0,0.1)]">
                <div>
                    <button onClick={onClose} className="mb-8 hover:bg-black/10 p-2 rounded-full transition-colors"><ChevronRight className="w-8 h-8 rotate-180" /></button>
                    <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4 italic text-black">BATTLE<br />STATS</h2>
                    <div className="bg-black text-amber-400 px-3 py-1 inline-block rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-400/20">Real-time Optic</div>
                    <div className="space-y-4 text-black/80"><div className="flex items-center gap-3 font-bold"><MapPin className="w-4 h-4" /><span className="text-sm font-black uppercase tracking-tight">{match.map}</span></div><div className="flex items-center gap-3 font-bold"><Radio className="w-4 h-4" /><span className="text-sm font-black uppercase tracking-tight">Phase 5 / 8</span></div></div>
                </div>
                <div className="mt-10 pt-6 border-t border-black/10">
                    <p className="text-[10px] uppercase font-bold opacity-70 mb-2">Kill Leader</p>
                    <div className="flex items-center gap-4"><div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center font-black text-amber-400">GL</div><div><p className="font-black uppercase text-sm">Jonathan</p><p className="text-[10px] uppercase font-bold opacity-70 italic text-black/60">GodLike</p></div></div>
                </div>
            </div>
            <div className="flex-1 p-10 overflow-y-auto">
                <div className="flex items-center justify-between mb-8"><h3 className="text-2xl font-black uppercase tracking-tight italic">Leaderboard</h3><BarChart3 className="w-6 h-6 text-amber-400" /></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
                            <div className="flex items-center gap-6"><span className={`text-xl font-black ${i === 1 ? 'text-amber-400 italic scale-110' : 'text-gray-500'}`}>#{i}</span><div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-black text-[10px]">T-{i}</div><div><p className="font-bold uppercase tracking-wide group-hover:text-amber-400 transition-colors">Squad Alpha {i}</p><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">Alive: 4</p></div></div>
                            <div className="flex items-center gap-8"><div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold">Finishes</p><p className="font-black text-xl italic">{20 - i * 2}</p></div><div className="text-right min-w-[70px] bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-xl"><p className="text-[10px] text-amber-400 uppercase font-bold">Rank Pts</p><p className="font-black text-xl text-amber-400 italic">{25 - i * 3}</p></div></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);

const TournamentHub = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bgmiData.tournaments.map((tourney) => (
            <div key={tourney.id} className="group bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-amber-400/5 hover:border-amber-400/20 transition-all shadow-xl">
                <div className="flex justify-between items-start mb-6"><div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-2xl"><Trophy className="w-8 h-8 text-amber-400" /></div><span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${tourney.status === 'Ongoing' ? 'bg-amber-400 text-black border-amber-400 transition-colors' : 'bg-white/5 text-white border-white/10'}`}>{tourney.status}</span></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:text-amber-400 transition-colors italic">{tourney.name}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase mb-6 tracking-widest leading-none">Global Event • {tourney.format}</p>
                <div className="grid grid-cols-2 gap-4"><div className="bg-white/5 border border-white/5 p-4 rounded-2xl"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Total Prize</p><p className="text-lg font-black text-amber-400 tracking-tighter italic">{tourney.prizePool}</p></div><div className="bg-white/5 border border-white/5 p-4 rounded-2xl"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Squads</p><p className="text-lg font-black tracking-tighter italic">{tourney.teams}</p></div></div>
            </div>
        ))}
    </div>
);

const TeamSection = () => {
    const { toggleFollow, isFollowing } = useFollowedTeams();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bgmiData.teams.map((team) => {
                const followed = isFollowing(team.id);
                return (
                    <div key={team.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-6 mb-8"><div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center text-3xl font-black italic shadow-[0_0_30px_rgba(255,255,255,0.05)]" style={{ color: team.color }}>{team.logo}</div><div className="flex-1"><h3 className="text-3xl font-black uppercase tracking-tighter italic">{team.name}</h3><div className="flex gap-2 mt-2">{team.achievements.slice(0, 1).map((ach) => (<span key={ach} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 italic">🏆 {ach}</span>))}</div></div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleFollow({ ...team, game: 'BGMI' })}
                                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border ${followed
                                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${followed ? 'fill-black' : ''}`} />
                                {followed ? 'Following' : 'Follow'}
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Win %</p><p className="text-xl font-black italic">{team.stats.winRate}</p></div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Avg Fin</p><p className="text-xl font-black italic">{team.stats.avgKills}</p></div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center"><p className="text-[9px] text-gray-500 uppercase font-bold mb-1 tracking-widest leading-none">Avg Pts</p><p className="text-xl font-black italic">{team.stats.avgPoints}</p></div>
                        </div>
                        <div className="space-y-4 shadow-inner p-2 rounded-2xl bg-black/20"><p className="text-[9px] text-gray-500 uppercase font-black ml-2 tracking-[0.2em] mb-2 leading-none">Tactical Roster</p><div className="flex flex-wrap gap-2">{team.roster.map((p) => (<span key={p} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black hover:bg-white/10 transition-colors uppercase cursor-pointer italic tracking-wider">{p}</span>))}</div></div>
                    </div>
                );
            })}
        </div>
    );
};

const PlayerSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bgmiData.players.map((player) => (
            <div key={player.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all flex flex-col xl:flex-row gap-8 shadow-xl border-l-[3px] border-l-amber-400">
                <div className="shrink-0 text-center xl:text-left"><div className="w-24 h-24 bg-gradient-to-br from-amber-400/10 to-transparent rounded-[2.5rem] mx-auto xl:mx-0 mb-4 border border-white/10 flex items-center justify-center p-2"><img src={player.img} alt={player.name} className="w-full h-full rounded-2xl" /></div><span className="px-4 py-1.5 bg-amber-400 text-black text-[9px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(255,215,0,0.2)]">{player.role}</span></div>
                <div className="flex-1">
                    <div className="mb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-4"><div><h3 className="text-3xl font-black uppercase tracking-tighter mb-1 italic">{player.name}</h3><p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{player.team}</p></div><div className="flex gap-1 h-8">{player.performance.map((val, idx) => (<div key={idx} className="w-2.5 bg-amber-400/20 rounded-t-sm self-end hover:bg-amber-400 transition-colors" style={{ height: `${(val / 30) * 100}%` }} />))}</div></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Target className="w-3 h-3" /> F/D</p><p className="text-md font-black italic">{player.stats.kd}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Swords className="w-3 h-3" /> Fin</p><p className="text-md font-black italic">{player.stats.kills}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Zap className="w-3 h-3" /> Optic</p><p className="text-md font-black italic">{player.stats.matches}</p></div>
                        <div className="text-center xl:text-left"><p className="text-[9px] text-amber-400 uppercase font-black tracking-widest flex items-center gap-1 justify-center xl:justify-start mb-1 leading-none"><Trophy className="w-3 h-3" /> MVP</p><p className="text-md font-black italic text-amber-400">{player.stats.mvp}</p></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const StatsSection = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 italic"><Swords className="text-amber-400" /> Finisher Power</h3>
            <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`flex items-center justify-between py-6 ${i !== 3 ? 'border-b border-white/5' : ''} group cursor-default hover:bg-white/5 transition-colors px-4 rounded-2xl`}>
                        <div className="flex items-center gap-6"><span className={`text-2xl font-black ${i === 1 ? 'text-amber-400 italic scale-125' : 'text-gray-500'}`}>0{i}</span><div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black border border-white/5">GL</div><div><p className="font-black uppercase tracking-tight text-xl leading-none italic group-hover:text-amber-400 transition-colors">Combatant {i}</p><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1 italic">GodLike Esports</p></div></div>
                        <div className="text-right"><p className="text-[9px] text-gray-500 uppercase font-black mb-1 tracking-widest">Avg Finishe</p><p className="font-black text-2xl text-red-500 tracking-tighter italic">{5.0 - i * 0.5}</p></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight italic">Tier Standings</h3>
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center"><span className="font-black text-[10px] uppercase tracking-widest italic">{i === 1 ? 'Conqueror Tier' : i === 2 ? 'Ace Master' : 'Ace Tier'}</span><span className="font-black text-xs text-amber-400 italic">{98 - i * i}%</span></div>
                        <div className="h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden shadow-inner"><div className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent shadow-[0_0_10px_rgba(255,215,0,0.4)]" style={{ width: `${98 - i * i}%` }} /></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default BGMIPage;
