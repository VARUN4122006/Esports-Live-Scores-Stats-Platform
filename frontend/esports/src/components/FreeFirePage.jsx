import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, User, BarChart3, Radio, ChevronRight, MapPin, Swords, Target, Zap, AlertTriangle, RefreshCw, Clock, Heart, UserPlus } from 'lucide-react';
import { useFollowedTeams } from '../context/FollowedTeamsContext';
import { ffData } from '../data/ffData';

import GameBackground from './ui/GameBackground';

const FreeFirePage = ({ onBack }) => {
    const [activeSection, setActiveSection] = useState('live');
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataLoadedAt, setDataLoadedAt] = useState(null);

    const navItems = [
        { id: 'live', name: 'Live Matches', icon: Radio },
        { id: 'tournaments', name: 'Tournaments', icon: Trophy },
        { id: 'teams', name: 'Teams', icon: Users },
        { id: 'players', name: 'Players', icon: User },
        { id: 'stats', name: 'Stats', icon: BarChart3 },
    ];

    useEffect(() => {
        loadFFData();
    }, []);

    const loadFFData = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            if (Math.random() < 0.05) {
                setError("Failed to synchronize with Garena servers.");
                setIsLoading(false);
                return;
            }
            setDataLoadedAt(new Date(Date.now() - 5 * 60 * 1000));
            setIsLoading(false);
        }, 1200);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Transmission Error</h2>
                <p className="text-gray-500 max-w-md mb-8 font-bold uppercase text-xs tracking-widest leading-loose">{error}</p>
                <div className="flex gap-4">
                    <button onClick={onBack} className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest rounded-full transition-all border border-white/10">Abort</button>
                    <button onClick={loadFFData} className="px-8 py-3 bg-[#FFD700] hover:bg-[#FFC000] text-black font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,215,0,0.3)]"><RefreshCw className="w-4 h-4" /> Retry Link</button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden font-body"
        >
            {/* Universal Esports Background */}
            <GameBackground game="freefire" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors group bg-black/40 backdrop-blur-md border border-white/5">
                        <ChevronRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-heading font-black uppercase tracking-tighter flex items-center gap-3 italic">
                            Free Fire <span className="text-[#FFD700] not-italic">Hub</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-body font-medium tracking-tight uppercase italic flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
                            Survivor Arena • Live Coverage
                        </p>
                    </div>
                </div>

                <div className="sticky top-20 z-40 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 mb-10 flex flex-wrap gap-2 shadow-2xl">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => !isLoading && setActiveSection(item.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-button font-black uppercase text-xs tracking-widest transition-all ${activeSection === item.id ? 'bg-[#FFD700] text-black shadow-[0_0_20px_rgba(255,215,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <motion.div
                        key={i}
                        whileHover={{ y: -8, scale: 1.01 }}
                        className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-xl relative overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    </motion.div>
                ))}
            </div>
        );
    }
    if (type === 'stats') {
        return (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
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
                <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
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
                <div key={i} className="bg-[#111] border border-white/10 rounded-3xl p-8 shadow-xl overflow-hidden">
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
    if (!ffData.liveMatches || ffData.liveMatches.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-[#FFD700]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#FFD700]/20">
                    <Radio className="w-10 h-10 text-[#FFD700] opacity-60" />
                </div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter mb-2">No Live Matches Right Now</h3>
                <p className="text-gray-500 font-body font-bold uppercase text-xs tracking-widest max-w-md leading-relaxed">Check back soon for upcoming games. Live arena feeds will appear here.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ffData.liveMatches.map((match) => (
                <div key={match.id} onClick={() => onSelectMatch(match)} className="group relative bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-[#FFD700]/30 transition-all cursor-pointer overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-6"><span className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full text-[10px] font-button font-black uppercase animate-pulse"><Radio className="w-3 h-3" /> Live</span></div>
                    <div className="mb-6"><h3 className="text-[#FFD700] font-heading font-black uppercase text-sm tracking-widest mb-1">{match.tournament}</h3><p className="text-gray-500 text-xs font-body font-bold uppercase">{match.round} • {match.map}</p></div>
                    <div className="space-y-4">
                        {match.teams.map((team, idx) => (
                            <div key={team.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-4"><span className={`w-1 h-10 rounded-full ${idx === 0 ? 'bg-[#FFD700]' : 'bg-gray-700'}`} /><div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-black text-xs">{team.logo}</div><span className="font-bold text-lg">{team.name}</span></div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-body font-bold">Kills</p><p className="font-heading font-black text-xl">{team.kills}</p></div>
                                    <div className="text-right min-w-[40px]"><p className="text-[10px] text-gray-500 uppercase font-body font-bold">Rank</p><p className={`font-heading font-black text-xl ${idx === 0 ? 'text-[#FFD700]' : ''}`}>#{team.rank}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-[#FFD700] transition-colors"><span className="text-xs font-button font-black uppercase tracking-widest">Open Match Center</span><ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></div>
                </div>
            ))}
        </div>
    );
};

const MatchCenter = ({ match, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(255,215,0,0.15)] flex flex-col md:flex-row h-full max-h-[85vh]">
            <div className="p-10 bg-[#FFD700] text-black w-full md:w-80 shrink-0 flex flex-col justify-between">
                <div>
                    <button onClick={onClose} className="mb-8 hover:bg-black/10 p-2 rounded-full transition-colors"><ChevronRight className="w-8 h-8 rotate-180" /></button>
                    <h2 className="text-5xl font-heading font-black uppercase tracking-tighter leading-none mb-4">Match<br />Center</h2>
                    <div className="bg-black text-white px-3 py-1 inline-block rounded-full text-[10px] font-button font-black uppercase tracking-widest mb-6">Live Coverage</div>
                    <div className="space-y-4"><div className="flex items-center gap-3"><MapPin className="w-4 h-4" /><span className="text-sm font-button font-black uppercase">Purgatory</span></div><div className="flex items-center gap-3"><Radio className="w-4 h-4" /><span className="text-sm font-button font-black uppercase">Round 4 / 6</span></div></div>
                </div>
                <div className="mt-10">
                    <p className="text-[10px] uppercase font-bold opacity-60 mb-2">Current MVP</p>
                    <div className="flex items-center gap-4"><div className="w-12 h-12 bg-black rounded-xl" /><div><p className="font-black uppercase text-sm">VasiyoCRJ</p><p className="text-[10px] uppercase font-bold opacity-60">Team Elite</p></div></div>
                </div>
            </div>
            <div className="flex-1 p-10 overflow-y-auto">
                <div className="flex items-center justify-between mb-8"><h3 className="text-2xl font-heading font-black uppercase tracking-tight">Real-time Leaderboard</h3><BarChart3 className="w-6 h-6 text-[#FFD700]" /></div>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-white/20 transition-all">
                            <div className="flex items-center gap-6"><span className={`text-xl font-black ${i === 1 ? 'text-[#FFD700]' : 'text-gray-500'}`}>0{i}</span><div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-xs">TEAM</div><div><p className="font-bold uppercase tracking-wide">Elite Squad {i}</p><p className="text-[10px] text-gray-500 font-bold uppercase">4 Survival Points</p></div></div>
                            <div className="flex items-center gap-8"><div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold">Kills</p><p className="font-black text-lg">{15 - i}</p></div><div className="text-right min-w-[60px] bg-[#FFD700]/10 px-4 py-2 rounded-xl"><p className="text-[10px] text-[#FFD700] uppercase font-bold">Points</p><p className="font-black text-lg text-[#FFD700]">{22 - i * 2}</p></div></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);

const TournamentHub = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ffData.tournaments.map((tourney) => (
            <div key={tourney.id} className="group bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-[#111] hover:to-[#FFD700]/5 hover:border-[#FFD700]/20 transition-all">
                <div className="flex justify-between items-start mb-6"><div className="p-4 bg-[#FFD700]/10 rounded-2xl"><Trophy className="w-8 h-8 text-[#FFD700]" /></div><span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tourney.status === 'Ongoing' ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white'}`}>{tourney.status}</span></div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tighter mb-2 group-hover:text-[#FFD700] transition-colors">{tourney.name}</h3>
                <p className="text-gray-500 text-sm font-bold uppercase mb-6">{tourney.region} • {tourney.format}</p>
                <div className="grid grid-cols-2 gap-4"><div className="bg-white/5 p-4 rounded-2xl"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Prize Pool</p><p className="text-lg font-black text-[#FFD700]">{tourney.prizePool}</p></div><div className="bg-white/5 p-4 rounded-2xl"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Total Teams</p><p className="text-lg font-black">{tourney.teams}</p></div></div>
            </div>
        ))}
    </div>
);

const TeamSection = () => {
    const { toggleFollow, isFollowing } = useFollowedTeams();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ffData.teams.map((team) => {
                const followed = isFollowing(team.id);
                return (
                    <div key={team.id} className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-[#FFD700]/20 transition-all">
                        <div className="flex items-center gap-6 mb-8"><div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-3xl font-heading font-black border border-white/10" style={{ color: team.color }}>{team.logo}</div><div className="flex-1"><h3 className="text-3xl font-heading font-black uppercase tracking-tighter">{team.name}</h3><div className="flex gap-2 mt-2">{team.achievements.slice(0, 1).map((ach) => (<span key={ach} className="text-[10px] font-button font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-[#FF8C00]">🏆 {ach}</span>))}</div></div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleFollow({ ...team, game: 'Free Fire' })}
                                className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 border ${followed
                                    ? 'bg-[#FF8C00]/20 border-[#FF8C00]/40 text-[#FF8C00]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                <Heart className={`w-3.5 h-3.5 transition-all duration-200 ${followed ? 'fill-[#FF8C00]' : ''}`} />
                                {followed ? 'Following' : 'Follow'}
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-8"><StatCard label="Win Rate" value={team.stats.winRate} /><StatCard label="Avg Pts" value={team.stats.avgPoints} /><StatCard label="Avg Kills" value={team.stats.avgKills} /></div>
                        <div className="space-y-2"><p className="text-[10px] text-gray-500 uppercase font-bold ml-2 mb-2 tracking-widest">Active Roster</p><div className="flex flex-wrap gap-2">{team.roster.map((p) => (<span key={p} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors uppercase cursor-default">{p}</span>))}</div></div>
                    </div>
                );
            })}
        </div>
    );
};

const PlayerSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ffData.players.map((player) => (
            <div key={player.id} className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:border-[#FFD700]/20 transition-all flex flex-col xl:flex-row gap-8">
                <div className="shrink-0 text-center xl:text-left"><div className="w-24 h-24 bg-gradient-to-br from-[#FFD700]/20 to-[#FF8C00]/20 rounded-[2rem] mx-auto xl:mx-0 mb-4 border border-white/10 flex items-center justify-center p-2"><img src={player.img} alt={player.name} className="w-full h-full" /></div><span className="px-4 py-1 bg-[#FFD700] text-black text-[10px] font-black uppercase tracking-widest rounded-full">{player.role}</span></div>
                <div className="flex-1">
                    <div className="mb-6 flex flex-col xl:flex-row xl:items-end justify-between gap-4"><div><h3 className="text-3xl font-heading font-black uppercase tracking-tighter mb-1">{player.name}</h3><p className="text-gray-500 text-xs font-body font-bold uppercase tracking-widest">{player.team}</p></div><div className="flex gap-1 h-6">{player.performance.map((val, idx) => (<div key={idx} className="w-2 bg-[#FFD700]/30 rounded-t-sm self-end" style={{ height: `${(val / 20) * 100}%` }} />))}</div></div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"><MiniStat label="K/D" value={player.stats.kd} icon={Target} /><MiniStat label="Kills" value={player.stats.kills} icon={Swords} /><MiniStat label="Matches" value={player.stats.matches} icon={Zap} /><MiniStat label="MVP" value={player.stats.mvp} icon={Trophy} color="text-[#FFD700]" /></div>
                </div>
            </div>
        ))}
    </div>
);

const StatsSection = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
            <h3 className="text-2xl font-heading font-black uppercase tracking-tight flex items-center gap-3"><Swords className="text-[#FFD700]" /> Season MVPs</h3>
            <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`flex items-center justify-between py-6 ${i !== 3 ? 'border-b border-white/5' : ''}`}>
                        <div className="flex items-center gap-6"><span className="text-2xl font-black text-gray-500 italic">0{i}</span><div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-bold">FF</div><div><p className="font-black uppercase tracking-tight text-lg">Elite Player {i}</p><p className="text-[10px] text-gray-500 font-bold uppercase">Team Elite</p></div></div>
                        <div className="text-right"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Avg Damage</p><p className="font-black text-xl text-[#FFD700]">{1000 - i * 50}</p></div>
                    </div>
                ))}
            </div>
        </div>
        <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tight">Global Ranks</h3>
            <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                        <span className={`w-8 font-black ${i === 1 ? 'text-[#FFD700]' : 'text-gray-500'}`}>{i}.</span>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1"><span className="font-bold text-xs uppercase">Power Team {i}</span><span className="font-black text-xs text-[#FFD700]">{95 - i * 2}%</span></div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00]" style={{ width: `${95 - i * 2}%` }} /></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const StatCard = ({ label, value }) => (<div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{label}</p><p className="text-xl font-black">{value}</p></div>);
const MiniStat = ({ label, value, icon: Icon, color = "text-white" }) => (
    <div className="text-center xl:text-left"><div className="flex items-center gap-2 mb-1 justify-center xl:justify-start"><Icon className="w-3 h-3 text-gray-500" /><p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">{label}</p></div><p className={`text-sm font-black uppercase ${color}`}>{value}</p></div>
);

export default FreeFirePage;
