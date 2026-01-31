import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, X } from 'lucide-react';
import msgImg from '../../assets/Msg.jpeg';
import loveMsgImg from '../../assets/loveMsg.jpeg';
import flowerImg from '../../assets/Flower.jpeg';
import video1 from '../../assets/video1.mp4';
import letter1 from '../../assets/letter1.jpeg';
import letter2 from '../../assets/letter2.jpeg';
import letter3 from '../../assets/Letter-3.jpeg';
import letterDash1 from '../../assets/Letter-1.jpeg';
import letterDash2 from '../../assets/Letter-2.jpeg';
import nameImg from '../../assets/name.jpeg';
import ringImg from '../../assets/ring.jpeg';
import video2 from '../../assets/video2.mp4';
import video4 from '../../assets/video4.mp4';

const GalleryItem = ({ item, index, onClick }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);

    const handleNext = (e) => {
        e.stopPropagation();
        setCarouselIndex((prev) => (prev + 1) % item.src.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCarouselIndex((prev) => (prev - 1 + item.src.length) % item.src.length);
    };

    const currentSrc = item.type === 'carousel' ? item.src[carouselIndex] : item.src;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onClick({ ...item, currentSrcIndex: carouselIndex })}
            className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group border-5 border-white"
        >
            {/* Media Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
                {item.type === 'video' ? (
                    <VideoPlayer
                        src={currentSrc}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    item.type === 'carousel' ? (
                        <motion.img
                            key={carouselIndex}
                            src={currentSrc}
                            alt={item.caption}
                            className="w-full h-full object-cover object-[50%_30%]"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x; // Drag distance
                                if (swipe < -50) {
                                    handleNext(e);
                                } else if (swipe > 50) {
                                    handlePrev(e);
                                }
                            }}
                            whileTap={{ cursor: "grabbing" }}
                        />
                    ) : (
                        <img src={currentSrc} alt={item.caption} className="w-full h-full object-cover object-[50%_30%]" />
                    )
                )}

                {/* Carousel Controls */}
                {item.type === 'carousel' && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-30"
                        >
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                        {/* Dots */}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1 z-30">
                            {item.src.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full ${idx === carouselIndex ? 'bg-white' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <p className="text-white text-xs text-center">{item.caption}</p>
                </div>
            </div>

            {/* Hover Heart Icon Overlay (re-added for consistency) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none z-20">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-full p-3">
                        <Heart className="w-6 h-6 text-pink-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const VideoPlayer = ({ src, className, controls = false }) => {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            muted={!controls} // Muted if no controls (thumbnail)
            controls={controls}
            autoPlay
            loop
            playsInline
        />
    );
};

const LoveSection = ({ onBack, onContinue }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Placeholder media - user will add their actual photos/videos
    const mediaItems = [
        { id: 1, type: 'image', src: msgImg, caption: 'Our first moment' },
        { id: 2, type: 'image', src: loveMsgImg, caption: 'The proposal' },
        { id: 3, type: 'image', src: flowerImg, caption: 'A special memory' },
        { id: 4, type: 'carousel', src: [letter2, letter1], caption: 'Love Letters' },
        // { id: 5, type: 'image', src: msgImg, caption: 'Love in the air' },
        { id: 6, type: 'carousel', src: [letterDash1, letterDash2, letter3], caption: 'Letter' },
        { id: 7, type: 'image', src: nameImg, caption: 'Forever & Always' },
        { id: 8, type: 'image', src: ringImg, caption: 'The Promise' },
        { id: 10, type: 'video', src: video2, caption: 'Moments Together 2' },
        { id: 11, type: 'video', src: video4, caption: 'Moments Together 3' },
        { id: 9, type: 'video', src: video1, caption: 'Our video' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-pink-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mb-2 mt-2">
                        <Heart className="w-12 h-12 text-white" fill="white" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Love 💕
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700 italic max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                        This is where our story turned into love in moments of magic, hugs, promises, and forever feelings.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {mediaItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={(media) => setSelectedMedia(media)}
                        />
                    ))}
                </div>

                {/* Add Media Instructions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center mb-12"
                >

                </motion.div>

                {/* Back Button - Bottom of Page */}
                <div className="flex justify-end pb-4 pt-4">
                    <motion.button
                        onClick={onBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-right gap-2 px-2 py-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all text-pink-600 font-medium border border-pink-100"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </motion.button>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedMedia && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedMedia(null)}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button - Outside Top Right */}
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-8 right-0 md:-right-8 p-2 text-white/70 hover:text-white transition-colors z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="w-full h-full flex items-center justify-center overflow-hidden relative group rounded-xl">
                            {selectedMedia.type === 'video' ? (
                                <VideoPlayer
                                    src={selectedMedia.src}
                                    className="max-w-full max-h-[80vh] object-contain"
                                    controls={true}
                                />
                            ) : (
                                selectedMedia.type === 'carousel' ? (
                                    <>
                                        {/* Main Image */}
                                        <img
                                            src={selectedMedia.src[selectedMedia.currentSrcIndex || 0]}
                                            alt={selectedMedia.caption}
                                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                                        />

                                        {/* Carousel Navigation - Floating Arrows */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMedia(prev => ({
                                                    ...prev,
                                                    currentSrcIndex: ((prev.currentSrcIndex || 0) - 1 + prev.src.length) % prev.src.length
                                                }));
                                            }}
                                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                                        >
                                            <ArrowLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMedia(prev => ({
                                                    ...prev,
                                                    currentSrcIndex: ((prev.currentSrcIndex || 0) + 1) % prev.src.length
                                                }));
                                            }}
                                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                                        >
                                            <ArrowLeft className="w-6 h-6 rotate-180" />
                                        </button>

                                        {/* Pagination Dots */}
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                            {selectedMedia.src.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`w-2 h-2 rounded-full shadow-sm ${idx === (selectedMedia.currentSrcIndex || 0) ? 'bg-white' : 'bg-white/40'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <img src={selectedMedia.src} alt={selectedMedia.caption} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
                                )
                            )}
                        </div>
                        <p className="text-xl font-bold text-white/90 mt-4 text-center font-sans">{selectedMedia.caption}</p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default LoveSection;
