import React from 'react';
import { motion } from 'framer-motion';

const images = [
    'https://picsum.photos/id/1011/400/600',
    'https://picsum.photos/id/1015/400/600',
    'https://picsum.photos/id/1018/400/600',
    'https://picsum.photos/id/1024/400/600',
    'https://picsum.photos/id/1019/400/600',
    'https://picsum.photos/id/1016/400/600',
];

const Gallery = () => {
    return (
        <section className="min-h-screen py-20 px-4">
            <div className="container mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl text-center mb-16 text-primary"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-color)' }}
                >
                    Our Memories
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="glass-card overflow-hidden h-96 relative group cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                        >
                            <img
                                src={img}
                                alt={`Memory ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <p className="text-white text-lg font-serif">April {20 + index}, 2023</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
