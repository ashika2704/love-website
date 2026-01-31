import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative z-10 p-4">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, type: 'spring' }}
                className="text-center"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block mb-8"
                >
                    <Heart size={100} fill="#ff4d6d" color="#ff4d6d" className="drop-shadow-lg" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-8xl text-primary mb-4 drop-shadow-md"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-color)' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    For My Valentine
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl italic opacity-80"
                    style={{ fontFamily: 'var(--font-serif)' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Every moment with you is a treasure.
                </motion.p>
            </motion.div>

            <motion.div
                className="absolute bottom-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <p className="text-sm opacity-60">Scroll Down</p>
            </motion.div>
        </section>
    );
};

export default Hero;
