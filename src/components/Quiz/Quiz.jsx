import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BrainCircuit, CheckCircle2, ArrowRight, Calendar, Star, Sparkles, HandHeart } from 'lucide-react';
import FloatingHearts from '../FloatingHearts/FloatingHearts';
import confetti from 'canvas-confetti';
import gif3 from '../../assets/gif3.gif';
import gif27 from '../../assets/gif27.gif';
import gif32 from '../../assets/gif32.webp';
import gif31 from '../../assets/gif31.webp';
import gif37 from '../../assets/gif37.webp';
import gif28 from '../../assets/gif28.webp';
import handImg from '../../assets/hand.jpeg';

const questions = [
    {
        id: 1,
        question: "Na Eppo unna Love panren nu feel pannen?💕",
        type: "date",
        correctAnswer: "2025-12-21",
        hint: "Think!",
        img: gif27
    },
    {
        id: 2,
        question: "Eppo unga veetla madila night time spend pannom ?🌃",
        type: "date",
        correctAnswer: "2025-04-15",
        hint: "Think!",
        img: gif32
    },
    {
        id: 3,
        question: "Eppo unna paaka monday market varaikum unna paka vanthen? 💖",
        type: "date",
        correctAnswer: "2025-08-04",
        hint: "Think!",
        img: gif37
    },
    {
        id: 4,
        question: "Who is my Best Friend? ",
        type: "text",
        correctAnswer: "Arun",
        hint: "Think!",
        img: gif31
    },
    {
        id: 5,
        question: "Na unna vittu poganum nu ninaipena? ",
        type: "text",
        correctAnswer: "No",
        hint: "Think!",
        img: gif28
    }
];

const Quiz = ({ onBack }) => {
    const [step, setStep] = useState(0); // 0: Intro, 1-5: Questions, 6: Success Msg, 7: Reveal
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    useEffect(() => {
        if (isCorrect !== null) {
            const delay = step === 4 ? 3000 : 1000;
            const timer = setTimeout(() => {
                nextStep();
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isCorrect, step]);

    useEffect(() => {
        if (step === 6 && correctCount >= 4) {
            const timer = setTimeout(() => {
                setStep(7);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [step, correctCount]);

    useEffect(() => {
        if (step === 7) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#ff0000', '#ff69b4', '#ffffff', '#0000ff', '#00ff00']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#ff0000', '#ff69b4', '#ffffff', '#0000ff', '#00ff00']
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [step]);

    const handleAnswer = (answer) => {
        const currentQuestion = questions[step - 1];
        const isCorrectMatch = currentQuestion.type === 'text'
            ? answer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()
            : answer === currentQuestion.correctAnswer;

        if (isCorrectMatch) {
            setIsCorrect(true);
            setCorrectCount(prev => prev + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const nextStep = () => {
        setShowSuccessMsg(false);
        setIsCorrect(null);
        setUserAnswer('');
        if (step < 5) {
            setStep(step + 1);
        } else {
            setStep(6);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    const popVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        },
        exit: { scale: 0, opacity: 0 }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden ">
            <FloatingHearts />

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="intro"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-[340px] md:max-w-md w-full bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-100 text-center relative z-10 pt-3"
                    >
                        <div className="mb-6 flex justify-center">
                            <div className="p-4 bg-pink-100 rounded-full">
                                <BrainCircuit className="w-12 h-12 text-pink-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 pt-3" style={{ fontFamily: 'var(--font-heading)' }}>
                            Quiz for You 💝
                        </h1>
                        <p className="text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            Answer these questions correctly to reveal a special surprise I've prepared for you!
                        </p>
                        <button
                            onClick={() => setStep(1)}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                        >
                            Start Quiz <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}

                {step >= 1 && step <= 5 && (
                    <motion.div
                        key={`q-${step}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-[340px] md:max-w-md w-full bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-100 relative z-10"
                    >
                        {/* Progress Bar */}
                        <div className="mb-8 p-1">
                            <div className="flex justify-between text-xs font-bold text-pink-400 mb-2 uppercase tracking-widest p-3">
                                <span>Question {step} of 5</span>
                                <span>{Math.round((step / 5) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-pink-50 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${(step / 5) * 100}%` }}
                                    className="h-full bg-gradient-to-r from-red-500 to-pink-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <img
                                key={step}
                                src={questions[step - 1].img || gif3}
                                alt="Cute animation"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            />
                        </div>
                        <h6 className="text-xs font-semibold text-gray-800 pt-2 px-4" style={{ fontFamily: 'var(--font-body)' }}>
                            {questions[step - 1].question}
                        </h6>

                        <div>
                            <div>
                                <div className="relative group p-2">
                                    <input
                                        type={questions[step - 1].type === 'date' ? 'date' : 'text'}
                                        placeholder={questions[step - 1].type === 'text' ? 'Enter your answer...' : ''}
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        className="w-full bg-white/50 border-2 border-pink-100 rounded-2xl py-2 focus:outline-none focus:border-red-400 transition-all text-gray-700 font-medium cursor-pointer px-3"
                                    />
                                </div>
                                {isCorrect === null && (
                                    <p className="text-xs text-pink-400 italic text-center px-2">
                                        {questions[step - 1].hint}
                                    </p>
                                )}
                                {questions[step - 1].id === 4 && isCorrect && (
                                    <p className="text-sm text-green-500 font-bold text-center px-2 mt-2">
                                        Ennoda friend lover husband ellam nee tha 💝
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Feedback Message Overlay - Displayed Above Submit Button */}
                        <AnimatePresence>
                            {isCorrect !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className=" text-center pb-2"
                                >
                                    <div className={`flex items-center justify-center text-xs ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                        <span>{isCorrect ? `Correct! Next in ${step === 4 ? '3s' : '1s'}...` : `Oops! Wrong answer. Next in ${step === 4 ? '3s' : '1s'}...`}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button at the bottom */}
                        <div className="mt-6">
                            <button
                                onClick={() => handleAnswer(userAnswer)}
                                disabled={!userAnswer || isCorrect !== null}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                            >
                                {isCorrect !== null ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 6 && (
                    <motion.div
                        key="success-final"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="max-w-[340px] md:max-w-md w-full bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-pink-100 text-center relative z-10"
                    >
                        <div className="relative w-40 h-40 mx-auto mb-8 mt-4">
                            <svg className="w-full h-full transform -rotate-90 ">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke="rgba(254, 226, 226, 1)"
                                    strokeWidth="15"
                                />
                                <motion.circle
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    fill="none"
                                    stroke={correctCount >= 4 ? "#22c55e" : "#ef4444"}
                                    strokeWidth="15"
                                    strokeDasharray={440}
                                    initial={{ strokeDashoffset: 440 }}
                                    animate={{ strokeDashoffset: 440 - (440 * (correctCount / 5)) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-gray-800">{(correctCount / 5) * 100}%</span>
                                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Score</span>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 mt-3" style={{ fontFamily: 'var(--font-body)' }}>
                            {correctCount >= 4 ? "Strong Love! ❤️" : "Keep Trying! 💕"}
                        </h1>
                        <p className="text-gray-600 mb-8 italic" style={{ fontFamily: 'var(--font-body)' }}>
                            {correctCount >= 4
                                ? "You know us so well... something special is coming!"
                                : "You almost got it! Try again to see the surprise."}
                        </p>

                        {correctCount < 4 && (
                            <button
                                onClick={() => {
                                    setStep(0);
                                    setCorrectCount(0);
                                }}
                                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg"
                            >
                                Try Again
                            </button>
                        )}

                        {correctCount >= 4 && (
                            <div className="flex justify-center gap-2 mb-3">
                                {[1, 2, 3].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                    >
                                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {step === 7 && (
                    <motion.div
                        key="reveal"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="max-w-[340px] md:max-w-md w-full bg-white/80 backdrop-blur-md p-5 md:p-6 rounded-3xl shadow-2xl border border-pink-100 text-center relative z-10 flex flex-col items-center justify-center max-h-[90vh] overflow-hidden "
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="overflow-hidden rounded-2xl shadow-lg border-4 border-white w-40 h-40 md:w-56 md:h-56 mx-auto mt-5 flex-shrink-0 " 
                        >
                            <img
                                src={handImg}
                                alt="Our Promise"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-800 pt-3" style={{ fontFamily: 'var(--font-body)' }}>
                                My Promise to You
                            </h2>
                            <p className="text-md text-pink-600 " style={{ fontFamily: 'var(--font-body)' }}>
                                Ne enmela kova pattalum,sanda potalum neeyae po nu sonnalum,Enna nadanthalum unna vittu poga maaten un kuda tha eppavum irupen, Promise!!!
                            </p>
                            <p className="text-xl text-pink-600 font-bold  ">
                                LOVE YOU FOREVER🤍
                            </p>
                            <motion.button
                                onClick={onBack}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 bg-gray-800 text-white rounded-full font-bold shadow-lg text-sm transition-all mb-5"
                                style={{ borderRadius: '10px' }}
                            >
                                Back <ArrowLeft />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-20">
                <Sparkles className="w-24 h-24 text-pink-300" />
            </div>
            <div className="absolute bottom-0 left-0 p-8 opacity-20">
                <Star className="w-24 h-24 text-purple-300" />
            </div>
        </div>
    );
};

export default Quiz;
