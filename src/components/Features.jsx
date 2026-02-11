import { motion } from 'framer-motion';
import { Target, Trophy, Users, MonitorPlay } from 'lucide-react';

const featureList = [
    {
        icon: <MonitorPlay className="w-6 h-6" />,
        title: "Live Match Scores & Commentary",
        description: "Real-time feeds and professional commentary for every major tournament."
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Match Center & Map Stats",
        description: "Detailed round-by-round breakdown and map control analytics."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Player Profiles & Careers",
        description: "Complete history, K/D ratios, and role performance for pro players."
    },
    {
        icon: <Trophy className="w-6 h-6" />,
        title: "Tournament Standings",
        description: "Up-to-date brackets, schedules, and prize pool information."
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 bg-esports-card">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-black leading-tight">
                            Powerful <span className="text-neon-blue">Features</span><br />
                            For The Serious Fan
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Everything you need to follow the professional scene, all in one place.
                        </p>

                        <div className="space-y-6">
                            {featureList.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                    <div className="p-3 bg-neon-blue/10 text-neon-blue rounded-lg mt-1">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 p-8 shadow-2xl overflow-hidden flex flex-col justify-center"
                    >
                        {/* Abstract UI representation */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#1e1e2e_0%,_transparent_50%)]"></div>

                        <div className="relative z-10 space-y-4">
                            <div className="w-full h-12 bg-gray-800/50 rounded-lg animate-pulse"></div>
                            <div className="flex gap-4">
                                <div className="w-1/3 h-32 bg-gray-800/50 rounded-lg animate-pulse delay-75"></div>
                                <div className="w-2/3 h-32 bg-gray-800/50 rounded-lg animate-pulse delay-100"></div>
                            </div>
                            <div className="w-full h-48 bg-gray-800/30 rounded-lg border border-gray-700/50 p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-24 h-6 bg-neon-green/20 rounded animate-pulse"></div>
                                    <div className="w-16 h-6 bg-red-500/20 rounded animate-pulse"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full h-2 bg-gray-700 rounded-full"></div>
                                    <div className="w-3/4 h-2 bg-gray-700 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-neon-blue/20 blur-[80px] rounded-full"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Features;
