import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ChevronRight, Target, Zap, Trophy, BarChart3 } from 'lucide-react';
import { useRef } from 'react';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) - 0.5;
        const y = (clientY / innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const translate1 = useTransform(dx, [-.5, .5], [-20, 20]);
    const translate1y = useTransform(dy, [-.5, .5], [-20, 20]);
    const translate2 = useTransform(dx, [-.5, .5], [20, -20]);
    const translate2y = useTransform(dy, [-.5, .5], [20, -20]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-esports-dark pt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#0a0a0a_100%)] opacity-80"></div>

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                {/* Floating Elements */}
                <motion.div style={{ x: translate1, y: translate1y }} className="absolute top-[15%] left-[10%] w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]" />
                <motion.div style={{ x: translate2, y: translate2y }} className="absolute bottom-[15%] right-[10%] w-80 h-80 bg-neon-purple/10 rounded-full blur-[100px]" />
                <motion.div style={{ x: translate1, y: translate2y }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                {/* Flying Icons */}
                <FloatingIcon Icon={Target} color="text-neon-green" delay={0} top="20%" left="15%" />
                <FloatingIcon Icon={Zap} color="text-neon-blue" delay={1} top="70%" left="10%" />
                <FloatingIcon Icon={Trophy} color="text-yellow-500" delay={2} top="30%" right="15%" />
                <FloatingIcon Icon={BarChart3} color="text-neon-purple" delay={1.5} top="60%" right="12%" />
            </div>

            <motion.div
                style={{ scale, opacity }}
                className="container mx-auto px-6 relative z-10 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-neon-green animate-pulse"></span>
                        <span className="text-gray-300 text-xs font-bold tracking-[0.2em] uppercase">
                            Experience the Evolution
                        </span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
                        <motion.span
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="block text-white"
                        >
                            DOMINATE
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"
                        >
                            THE ARENA
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-gray-400 text-xl md:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
                    >
                        Real-time analytics and live insights for the <span className="text-white font-semibold">elite esports competitor</span>.
                        Every frame matters. Every stat counts.
                    </motion.p>

                </motion.div>
            </motion.div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-neon-blue/10 blur-[60px] rounded-full pointer-events-none"></div>
        </section>
    );
};

const FloatingIcon = ({ Icon, color, delay, top, left, right }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
        }}
        transition={{
            duration: 5,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className={`absolute ${color} pointer-events-none opacity-20`}
        style={{ top, left, right }}
    >
        <Icon size={48} strokeWidth={1} />
    </motion.div>
);

export default Hero;
