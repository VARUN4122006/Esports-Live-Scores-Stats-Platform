import { motion } from 'framer-motion';
import { Zap, BarChart3, Gamepad2, Globe } from 'lucide-react';

const features = [
    {
        icon: <Zap className="w-8 h-8 text-neon-blue" />,
        title: "Real-Time Updates",
        description: "Instant score updates with zero latency. Stay ahead of every play."
    },
    {
        icon: <BarChart3 className="w-8 h-8 text-neon-green" />,
        title: "Detailed Statistics",
        description: "Deep dive into player performance, map control, and economy stats."
    },
    {
        icon: <Globe className="w-8 h-8 text-neon-purple" />,
        title: "Global Coverage",
        description: "From local tournaments to world championships, we cover it all."
    },
    {
        icon: <Gamepad2 className="w-8 h-8 text-pink-500" />,
        title: "Multi-Game Support",
        description: "All your favorite competitive titles in one seamless platform."
    }
];

const WhyUs = () => {
    return (
        <section id="why-us" className="py-20 bg-esports-dark relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-neon-purple/5 blur-[100px]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 uppercase tracking-tight">
                        Why <span className="text-neon-blue">EsportsBuzz?</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-body">
                        Built for the competitive gamer who demands speed, accuracy, and depth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 bg-esports-card border border-gray-800 rounded-2xl hover:border-neon-blue/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.1)] transition-all group"
                        >
                            <div className="mb-6 p-4 bg-gray-900/50 rounded-full inline-block group-hover:bg-gray-800 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-heading font-bold mb-3 text-white group-hover:text-neon-blue transition-colors uppercase tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-body">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
