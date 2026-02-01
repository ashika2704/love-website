import React from 'react';
import { motion } from 'framer-motion';
import gif6 from '../../assets/gif6.gif';

const Redirecting = ({ text = "Redirecting to our love story..." }) => {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center p-4 relative text-center overflow-hidden"
            style={{ backgroundColor: '#fae8e8', fontFamily: 'var(--font-serif)' }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="z-10 flex flex-col items-center"
            >
                <motion.img
                    src={gif6}
                    alt="Redirecting"
                    className="rounded-2xl shadow-xl border-2 border-white/50 mb-6 w-48 md:w-64"
                />
                <p className="text-lg font-serif text-[#d90429] italic mt-5">
                    {text}
                </p>
            </motion.div>
        </section>
    );
};

export default Redirecting;
