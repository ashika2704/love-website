import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ArrowRight } from 'lucide-react';
import gif3 from '../../assets/gif3.gif';
import gif7 from '../../assets/gif7.gif';
import gif1 from '../../assets/gif1.gif';
import gif6 from '../../assets/gif6.gif';

const Question = ({ onNext, audioController }) => {
    const [accepted, setAccepted] = useState(false);
    const [noMessage, setNoMessage] = useState("");
    const timerRef = React.useRef(null); // Ref to store timeout ID

    // Manage base GIF to allow switching
    const [currentBaseGif, setCurrentBaseGif] = useState(gif3);
    // Manage exact source URL (with timestamp for looping)
    const [gifSource, setGifSource] = useState(gif3);

    // Preload next GIF loop to prevent blinking
    React.useEffect(() => {
        // Reset source immediately when base changes
        setGifSource(currentBaseGif);

        const interval = setInterval(() => {
            const nextTimestamp = Date.now();
            const nextSrc = `${currentBaseGif}?t=${nextTimestamp}`;

            // Preload image in background
            const img = new Image();
            img.src = nextSrc;
            img.onload = () => {
                setGifSource(nextSrc);
            };
        }, 3000); // 3 seconds loop

        return () => clearInterval(interval);
    }, [currentBaseGif]);

    // Cleanup navigation timer on unmount
    React.useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const handleNoInteraction = () => {
        setNoMessage("Think again! 😜");
        setCurrentBaseGif(gif1);
    };

    const handleYes = () => {
        setAccepted(true);

        // Play celebration audio using shared controller
        if (audioController) {
            audioController.currentTime = 0;
            audioController.play().catch(error => console.error("Audio playback failed:", error));
        }

        // Confetti
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Navigate to timer after 10s
        timerRef.current = setTimeout(() => {
            onNext();
        }, 10000);
    };

    return (
        <section className="min-h-screen flex flex-col justify-center items-center p-4 relative text-center overflow-hidden"
            style={{ backgroundColor: '#fae8e8', fontFamily: 'var(--font-serif)' }}>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.5 }}
                        animate={{ y: '-10vh', rotate: 360 }}
                        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: 'linear', delay: Math.random() * 5 }}
                        style={{ color: i % 2 === 0 ? '#ff4d6d' : '#ffffff' }}
                    >
                        <Heart size={Math.random() * 20 + 10} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {!accepted ? (
                <motion.div
                    className="z-10 flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img src={gifSource} alt="Please say yes" className="w-48 h-auto mb-4 object-contain" />
                    <h2 className="text-5xl md:text-7xl text-[#d90429] mb-12 drop-shadow-sm font-normal" style={{ fontFamily: 'var(--font-heading)' }}>
                        Will you be my Valentine? ❤️
                    </h2>

                    <div className="flex flex-row gap-3 justify-center items-center flex-wrap mt-3">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#d90429] text-white text-2xl px-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-bold cursor-pointer z-20"
                            onClick={handleYes}
                        >
                            YES! 🤍
                        </motion.button>

                        <motion.button
                            whileHover={{ x: [0, -10, 10, -10, 10, 0] }}
                            onClick={handleNoInteraction}
                            className="bg-white text-gray-500 text-xl px-5 py-3  rounded-full shadow border border-gray-200 cursor-pointer z-10"

                        >
                            No
                        </motion.button>
                    </div>

                    {/* Feedback Text */}
                    <motion.p
                        className="text-xl text-[#d90429] font-bold mt-3 h-8"
                        animate={{ opacity: noMessage ? 1 : 0 }}
                    >
                        {noMessage}
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="z-10 flex flex-col items-center"
                >
                    {/* Happy GIF */}
                    <motion.img
                        src={gif7}
                        alt="Happy Celebration"
                        className="rounded-2xl shadow-2xl border-4 border-white mb-8 w-40 md:w-56"
                    />

                    <h2 className="text-6xl md:text-8xl text-[#d90429] mt-5 mb-6 font-normal" style={{ fontFamily: 'var(--font-heading)' }}>
                        Yay! ❤️
                    </h2>
                    <p className="text-2xl font-serif text-gray-700 mb-8">
                        I love you!!!
                    </p>

                    {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="flex items-center gap-2 bg-white text-[#d90429] px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all p-3"
                        style={{ borderRadius: '15px' }}
                    >
                        Next
                        <ArrowRight className="w-5 h-5" />
                    </motion.button> */}
                </motion.div>
            )}
        </section>
    );
};

export default Question;
