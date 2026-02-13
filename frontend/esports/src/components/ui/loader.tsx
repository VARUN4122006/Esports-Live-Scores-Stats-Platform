import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoaderThree - A premium, futuristic loading overlay
 * Features a minimalist Neon Green Zap icon with a white tracing border animation.
 * Optimized for maximum smoothness and zero-lag performance.
 */
export default function LoaderThree({ isLoading = true }: { isLoading?: boolean }) {
    // Zap SVG Path (Standard Lightning Bolt)
    const zapPath = "M13 2L3 14h9l-1 8 10-12h-9l1-8z";

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-esports-dark/95 backdrop-blur-3xl overflow-hidden"
                >
                    <div
                        className="relative flex items-center justify-center scale-[2.5]"
                        style={{ willChange: 'transform' }}
                    >
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Base Zap Shape (Neon Green Border) */}
                            <path
                                d={zapPath}
                                stroke="var(--color-neon-green)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="opacity-30"
                            />

                            {/* Tracing White Line */}
                            <motion.path
                                d={zapPath}
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                animate={{
                                    pathLength: 0.3,
                                    pathOffset: [0, 1]
                                }}
                                transition={{
                                    duration: 1.0,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                                    willChange: 'pathLength, pathOffset'
                                }}
                            />
                        </svg>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
