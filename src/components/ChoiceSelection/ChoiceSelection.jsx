import React from 'react';
import { motion } from 'framer-motion';
import gif33 from '../../assets/gif33.webp';
import gif34 from '../../assets/gif34.webp';
import gif35 from '../../assets/gif35.webp';

const ChoiceSelection = ({ onSelect }) => {
    const choices = [
        {
            id: 'story',
            title: 'Our Love Story',
            gif: gif33,
            color: '#ff4d6d'
        },
        {
            id: 'quiz',
            title: 'Love Quiz',
            gif: gif35,
            color: '#d90429'
        },
        {
            id: 'everypart',
            title: 'Every Part of Us',
            gif: gif34,
            color: '#800f2f'
        }
    ];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center p-6 relative overflow-hidden"
            style={{ backgroundColor: '#fae8e8', fontFamily: 'var(--font-serif)' }}>

            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl text-[#d90429] mb-16 text-center"
                style={{ fontFamily: 'var(--font-heading)' }}
            >
                Something for you

            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full px-4">
                {choices.map((choice, index) => (
                    <motion.div
                        key={choice.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelect(choice.id)}
                        className="cursor-pointer flex items-center justify-center p-0 bg-transparent border-none shadow-none"
                    >
                        <div className="w-full flex items-center justify-center overflow-hidden">
                            <img
                                src={choice.gif}
                                alt={choice.title}
                                className="w-full h-auto object-contain max-h-[100px] md:max-h-[150px]"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ChoiceSelection;
