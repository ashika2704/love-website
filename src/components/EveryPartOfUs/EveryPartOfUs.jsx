import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, MessageCircle, HandHeart, BrainCircuit } from 'lucide-react';

const sections = [
    {
        id: 'love',
        title: 'Love',
        icon: Heart,
        color: 'from-pink-400 to-red-400',
        bgColor: 'bg-gradient-to-br from-pink-100 to-red-100',
        description: 'Romantic moments, proposals, and sweet memories'
    },
    {
        id: 'memories',
        title: 'Memories',
        icon: Camera,
        color: 'from-purple-400 to-pink-400',
        bgColor: 'bg-gradient-to-br from-purple-100 to-pink-100',
        description: 'Trips, festivals, and everyday moments together'
    },
    {
        id: 'fights-convincing',
        title: 'Fights & Convincing',
        icon: HandHeart,
        color: 'from-amber-400 to-orange-500',
        bgColor: 'bg-gradient-to-br from-amber-100 to-orange-100',
        description: 'Our struggles and how we chose each other'
    }
];

const EveryPartOfUs = ({ onSectionSelect }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4 ">
            <div className="max-w-4xl mx-auto ">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 pt-4  mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        Every Part of Us 💕
                    </h1>
                    <p className="text-lg text-gray-600 italic mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Love isn't just romance, it's memories, fights, understanding, and choosing each other.
                    </p>
                </motion.div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {sections.map((section, index) => {
                        const Icon = section.icon;

                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => onSectionSelect(section.id)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`${section.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all text-left relative overflow-hidden group`}
                            >
                                {/* Background Icon */}
                                <div className="absolute -right-1 -bottom-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Icon className="w-16 h-16" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon and Title/Explore in Flex Row */}
                                    <div className="flex items-start gap-4">
                                        <div className={`p-4 rounded-2xl bg-gradient-to-r ${section.color}`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-800 mb-2 mt-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                                {section.title}
                                            </h2>

                                            {/* Explore Button */}
                                            <div className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors">
                                                <span className="text-xs font-medium mr-1">Explore</span>
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Quiz Button */}
                <button
                    onClick={() => onSectionSelect('quiz')}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 md:p-4 shadow-2xl flex items-center gap-2 z-50 transition-none"
                    style={{ borderRadius: '10px' }}
                >
                    <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="font-bold text-sm md:text-base pr-1">Quiz for You</span>
                </button>
            </div>
        </div>
    );
};

export default EveryPartOfUs;
