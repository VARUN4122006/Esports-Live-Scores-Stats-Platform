import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="py-32 relative bg-esports-dark overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-blue/20 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                        Track every match.<br />
                        Analyze every player.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">
                            Stay ahead in esports.
                        </span>
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
