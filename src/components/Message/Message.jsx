import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Message = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center p-4">
            <h2 className="text-4xl md:text-6xl text-center mb-12 text-primary drop-shadow-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                My Heart's Message
            </h2>

            <div className="relative w-full max-w-lg h-64 md:h-80 perspective-1000">
                <motion.div
                    className="absolute inset-0 bg-red-100 rounded-lg shadow-xl flex items-center justify-center cursor-pointer border-2 border-red-200"
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ rotateX: 0 }}
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
                >
                    {/* Front of Envelope/Card */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white rounded-lg p-8 border border-pink-100">
                        <span className="text-5xl mb-4">💌</span>
                        <p className="font-serif text-xl text-primary font-bold">Tap to Open</p>
                    </div>

                    {/* Back of Envelope (Visible when open) */}
                    <div
                        className="absolute inset-0 bg-white rounded-lg p-8 transform rotate-x-180 backface-hidden flex items-center justify-center border border-pink-100"
                        style={{ transform: 'rotateX(180deg)' }}
                    >
                        <p className="font-serif text-center text-gray-600">
                            Here are just a few reasons why I love you...
                        </p>
                    </div>
                </motion.div>

                {/* The Letter (Slides out) */}
                <motion.div
                    className="absolute inset-x-4 bg-white shadow-lg p-8 rounded-lg border border-pink-50"
                    initial={{ top: 0, opacity: 0, scale: 0.8 }}
                    animate={{
                        top: isOpen ? '100%' : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0.8,
                        rotate: isOpen ? 1 : 0
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ zIndex: 5 }}
                >
                    <h3 className="text-2xl font-serif text-primary mb-4">My Dearest,</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        You are the sunshine that lights up my darkest days. Your smile is my favorite memory, and your voice is my favorite sound.
                        I love you more than words can express.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                        <li>Your incredible kindness</li>
                        <li>The way you laugh</li>
                        <li>Your unwavering support</li>
                    </ul>
                    <p className="text-right italic text-primary">- Forever Yours</p>
                </motion.div>
            </div>
        </section>
    );
};

export default Message;
