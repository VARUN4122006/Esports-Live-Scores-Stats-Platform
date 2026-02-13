import React from 'react';
import { motion } from 'framer-motion';

const GameBackground = ({ game }) => {

    // Common background container styles
    const containerClasses = "absolute inset-0 z-0 overflow-hidden pointer-events-none";

    const renderTheme = () => {
        switch (game) {
            case 'freefire':
                return (
                    // Free Fire: Dark base, orange/red gradients, floating ember blobs
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 20% 20%, #1a0a00 0%, transparent 50%)',
                                    'radial-gradient(circle at 80% 80%, #3e0000 0%, transparent 50%)',
                                    'radial-gradient(circle at 20% 80%, #1a0a00 0%, transparent 50%)',
                                    'radial-gradient(circle at 80% 20%, #3e0000 0%, transparent 50%)',
                                    'radial-gradient(circle at 20% 20%, #1a0a00 0%, transparent 50%)'
                                ]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-60"
                        />
                        {/* Floating Blobs */}
                        <motion.div
                            animate={{
                                x: [0, 100, -100, 0],
                                y: [0, -50, 50, 0],
                                scale: [1, 1.2, 0.8, 1],
                                opacity: [0.3, 0.4, 0.3]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#FF4D00] rounded-full blur-[150px] opacity-30 mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                x: [0, -120, 120, 0],
                                y: [0, 80, -80, 0],
                                scale: [1, 0.9, 1.3, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#8B0000] rounded-full blur-[180px] opacity-20 mix-blend-screen"
                        />
                        {/* Subtle Embers */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -200],
                                    opacity: [0, 0.5, 0]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 3
                                }}
                                className="absolute w-2 h-2 bg-orange-500 rounded-full blur-[2px]"
                                style={{
                                    left: `${30 + Math.random() * 40}%`,
                                    top: '80%'
                                }}
                            />
                        ))}
                    </>
                );

            case 'bgmi':
                return (
                    // BGMI: Dark olive green/muted blue, drifting fog
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 0% 0%, #0f1a0f 0%, transparent 60%)',
                                    'radial-gradient(circle at 100% 100%, #0a101a 0%, transparent 60%)',
                                    'radial-gradient(circle at 0% 0%, #0f1a0f 0%, transparent 60%)'
                                ]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-50"
                        />
                        {/* Fog Layers */}
                        <motion.div
                            animate={{ x: ['-20%', '20%', '-20%'] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2a382a]/20 to-transparent blur-[100px]"
                        />
                        <motion.div
                            animate={{ x: ['20%', '-20%', '20%'] }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1a2030]/20 to-transparent blur-[80px]"
                        />
                    </>
                );

            case 'valorant':
                return (
                    // Valorant: Dark purple/crimson/neon cyan, pulsing diagonal lines
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 100% 0%, #1a0a20 0%, transparent 60%)',
                                    'radial-gradient(circle at 0% 100%, #200a0a 0%, transparent 60%)',
                                    'radial-gradient(circle at 100% 0%, #1a0a20 0%, transparent 60%)'
                                ]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-50"
                        />
                        {/* Glowing Blobs */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#bd00ff] rounded-full blur-[200px] opacity-20 mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.1, 0.15, 0.1]
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ff4655] rounded-full blur-[180px] opacity-15 mix-blend-screen"
                        />

                        {/* Diagonal Lines */}
                        <div className="absolute inset-0 overflow-hidden opacity-20">
                            <motion.div
                                animate={{
                                    rotate: [45, 45],
                                    x: ['-10%', '10%'],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[-50%] left-[-20%] w-[200%] h-[10px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent blur-md"
                            />
                            <motion.div
                                animate={{
                                    rotate: [45, 45],
                                    x: ['10%', '-10%'],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-[50%] right-[-20%] w-[200%] h-[5px] bg-gradient-to-r from-transparent via-[#ff4655] to-transparent blur-md"
                            />
                        </div>
                    </>
                );

            case 'lol':
                return (
                    // LoL: Navy/Royal Blue/Gold, magical arc streaks
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 50% -20%, #000c1a 0%, transparent 70%)',
                                    'radial-gradient(circle at 50% 120%, #001a33 0%, transparent 70%)',
                                    'radial-gradient(circle at 50% -20%, #000c1a 0%, transparent 70%)'
                                ]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-60"
                        />
                        {/* Gold Highlights */}
                        <motion.div
                            animate={{ opacity: [0.05, 0.15, 0.05] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c8aa6e] rounded-full blur-[250px] opacity-10 mix-blend-screen"
                        />
                        {/* Magical Arcs (simulated with curved borders/gradients) */}
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] border-[50px] border-t-[#0ac8b9]/10 border-r-transparent border-b-transparent border-l-transparent rounded-full blur-[80px]"
                        />
                    </>
                );

            case 'dota2':
                return (
                    // Dota 2: Crimson/Maroon/Charcoal, smoky swirls
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 30% 30%, #2a0a0a 0%, transparent 60%)',
                                    'radial-gradient(circle at 70% 70%, #1a0a0a 0%, transparent 60%)',
                                    'radial-gradient(circle at 30% 30%, #2a0a0a 0%, transparent 60%)'
                                ]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-70"
                        />
                        {/* Red Energy Swirls */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] right-[20%] w-[600px] h-[600px] bg-[#ff2a00] rounded-full blur-[200px] opacity-10 mix-blend-color-dodge"
                        />
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 0]
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-[#800000] rounded-full blur-[180px] opacity-20 mix-blend-color-dodge"
                        />
                    </>
                );

            case 'cs2':
                return (
                    // CS2: Navy/Charcoal/Orange/Cool Blue, scan lines
                    <>
                        <motion.div
                            animate={{
                                background: [
                                    'radial-gradient(circle at 20% 50%, #0a0e14 0%, transparent 70%)',
                                    'radial-gradient(circle at 80% 50%, #0d121b 0%, transparent 70%)',
                                    'radial-gradient(circle at 20% 50%, #0a0e14 0%, transparent 70%)'
                                ]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-80"
                        />
                        {/* Highlights */}
                        <motion.div
                            animate={{ opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e69500] rounded-full blur-[200px] opacity-5 mix-blend-screen"
                        />
                        <motion.div
                            animate={{ opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5a9bd4] rounded-full blur-[200px] opacity-5 mix-blend-screen"
                        />
                        {/* Scan Lines */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: '100%' }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-[20%] bg-gradient-to-b from-transparent via-blue-400/5 to-transparent blur-sm"
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={containerClasses}>
            {/* Global Base darkening */}
            <div className="absolute inset-0 bg-[#050505] -z-10" />
            {renderTheme()}
            {/* Global smooth noise overlay for texture (optional, minimal GPU cost) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </div>
    );
};

export default GameBackground;
