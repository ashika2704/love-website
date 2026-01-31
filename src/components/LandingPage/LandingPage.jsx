import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import romanticGif from '../../assets/gif5.gif';

const LandingPage = ({ onEnter }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onEnter();
        }, 15000); // 15 seconds

        return () => clearTimeout(timer);
    }, [onEnter]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center text-center overflow-hidden"
            style={{ backgroundColor: '#fae8e8', fontFamily: 'var(--font-serif)' }}>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.5 }}
                        animate={{
                            y: '-10vh',
                            rotate: 360,
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: Math.random() * 5
                        }}
                        style={{ color: i % 2 === 0 ? '#ff4d6d' : '#ffffff' }} // Red and White hearts
                    >
                        <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="z-10 px-4 flex flex-col items-center max-w-lg w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >
                {/* GIF Display */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80"
                >
                    <img src={romanticGif} alt="Romantic Moment" className="w-full max-w-xs md:max-w-sm object-cover" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl mb-5 mt-5 text-[#d90429] drop-shadow-sm font-normal leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                >
                    Hey Love… <br /> I made something special for you 💕
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 13, duration: 1 }}
                    className="text-gray-500 font-serif italic text-sm"
                    style={{ fontFamily: 'var(--font-playfair-display)' }}
                >
                    Opening heart...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LandingPage;
