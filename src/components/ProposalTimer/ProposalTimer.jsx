import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import gif27 from '../../assets/gif27.gif';

const ProposalTimer = ({ onNext }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [balloons, setBalloons] = useState([]);

    const proposalDate = new Date('2025-01-01T01:15:00').getTime();

    useEffect(() => {
        // Generate initial balloons
        const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#ffffff', '#ffccd5'];
        const newBalloons = Array.from({ length: 1 }).map((_, i) => ({
            id: i,
            color: colors[Math.floor(Math.random() * colors.length)],
            x: Math.random() * 50,
            speed: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            scale: Math.random() * 0.5 + 0.8
        }));
        setBalloons(newBalloons);
    }, []);

    const handlePop = (id, x, y, color) => {
        // Trigger confetti
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: [color, '#ffffff', '#ff4d6d', '#3b82f6', '#22c55e'], // Red/White/Blue/Green
            disableForReducedMotion: true
        });

        // Remove balloon
        setBalloons(prev => prev.filter(b => b.id !== id));

        // Add a replacement balloon after a delay
        setTimeout(() => {
            setBalloons(prev => {
                const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#ffffff', '#ffccd5'];
                return [...prev, {
                    id: Date.now(), // unique id
                    color: colors[Math.floor(Math.random() * colors.length)],
                    x: Math.random() * 50,
                    speed: Math.random() * 15 + 10,
                    delay: 0,
                    scale: Math.random() * 0.5 + 0.8
                }];
            });
        }, 2000);
    };

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const difference = now - proposalDate;

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime(); // Initial call

        return () => clearInterval(timer);
    }, [proposalDate]);

    const TimeUnit = ({ label, value }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="bg-white/80 backdrop-blur-md w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg border border-pink-100 mb-2">
                <span className="text-2xl md:text-4xl font-bold text-pink-600" style={{ fontFamily: 'var(--font-body)' }}>
                    {value}
                </span>
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-pink-400">
                {label}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Floating Balloons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                {balloons.map((balloon) => (
                    <motion.div
                        key={balloon.id}
                        className="absolute cursor-pointer pointer-events-auto hover:brightness-110 transition-all"
                        initial={{ y: '110vh', x: `${balloon.x}vw` }}
                        animate={{ y: '-120vh' }}
                        transition={{
                            duration: balloon.speed,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: balloon.delay
                        }}
                        onClick={(e) => handlePop(balloon.id, e.clientX, e.clientY, balloon.color)}
                        style={{ scale: balloon.scale }}
                    >
                        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0Z" fill={balloon.color} />
                            <path d="M30 60L28 66H32L30 60Z" fill={balloon.color} />
                            <path d="M30 60V80" stroke="#rgba(0,0,0,0.1)" strokeWidth="1" />
                            <circle cx="20" cy="15" r="3" fill="white" fillOpacity="0.3" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                            y: '110vh',
                            x: Math.random() * 100 + 'vw',
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: Math.random() * 0.5 + 0.3
                        }}
                        animate={{
                            y: '-10vh',
                            rotate: 360,
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    >
                        <Heart
                            size={Math.random() * 20 + 10}
                            fill={i % 2 === 0 ? "#ff4d6d" : "#ffffff"}
                            color={i % 2 === 0 ? "#ff4d6d" : "#ffffff"}
                        />
                    </motion.div>
                ))}
            </div>


            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            staggerChildren: 0.3
                        }
                    }
                }}
                className="max-w-2xl w-full text-center z-10"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="inline-block mb-6"
                >
                    <img
                        src={gif27}
                        alt="Celebration"
                        className="w-36 md:w-48 h-auto rounded-2xl shadow-lg border-4 border-white"
                    />
                </motion.div>

                <motion.h6
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 mt-3"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Since Our Beautiful Proposal ✨
                </motion.h6>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 }
                    }}
                    className="flex justify-center flex-wrap gap-2 mb-12"
                >
                    <TimeUnit label="Days" value={timeLeft.days} />
                    <TimeUnit label="Hours" value={timeLeft.hours} />
                    <TimeUnit label="Mins" value={timeLeft.minutes} />
                    <TimeUnit label="Secs" value={timeLeft.seconds} />
                </motion.div>

                <motion.p
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    className="text-lg md:text-xl text-pink-600 italic mb-12 px-4 py-2"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    Always and forever together ❤️
                </motion.p>

                <motion.button
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white  rounded-full font-bold shadow-xl hover:shadow-2xl transition-all p-3"
                    style={{ borderRadius: '15px' }}
                >
                    Explore
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </motion.div>
        </div >
    );
};

export default ProposalTimer;
