import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HandHeart, ArrowLeft, X, Heart, ShieldAlert } from 'lucide-react';

// Import Assets
import sorryMsgImg from '../../assets/sorry msg.jpeg';
import sorryImg from '../../assets/sorry.jpeg';
import video3 from '../../assets/video3.mp4';


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
                            className="w-full h-full object-cover object-center"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                const swipe = offset.x;
                                if (swipe < -50) {
                                    handleNext(e);
                                } else if (swipe > 50) {
                                    handlePrev(e);
                                }
                            }}
                            whileTap={{ cursor: "grabbing" }}
                        />
                    ) : (
                        <img
                            src={currentSrc}
                            alt={item.caption}
                            className="w-full h-full object-cover object-[50%_30%]"
                        />
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

            {/* Hover Heart Icon Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center pointer-events-none z-20">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white rounded-full p-3">
                        <ShieldAlert className="w-6 h-6 text-amber-500" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const FightsConvincingSection = ({ onBack, onContinue }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);

    const mediaItems = [
        { id: 1, type: 'image', src: sorryImg, caption: 'Healing Hearts ❤️🩹' },
        { id: 2, type: 'image', src: sorryMsgImg, caption: 'The Heartfelt Apology' },

        { id: 4, type: 'video', src: video3, caption: 'Sorry' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 py-8 px-4 relative flex flex-col items-center">
            <div className="max-w-6xl w-full">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-4 bg-amber-500/20 rounded-full mb-2 mt-2 backdrop-blur-sm border border-amber-500/30">
                        <HandHeart className="w-12 h-12 text-amber-400" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Fights & Understanding 🤝
                    </h1>

                    <p className="text-lg md:text-xl text-amber-100/80 italic max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
                        We didn't always agree, but we never stopped caring. Moments when we chose patience over pride.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {mediaItems.map((item, index) => (
                        <div key={item.id} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                            <GalleryItem
                                item={item}
                                index={index}
                                onClick={(media) => setSelectedMedia(media)}
                            />
                        </div>
                    ))}
                </div>

                {/* Back Button */}
                <div className="flex justify-end pb-4 pt-4">
                    <motion.button
                        onClick={onBack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-2 py-2 bg-white/10 backdrop-blur-md text-white rounded-full shadow-lg hover:shadow-xl transition-all border border-white/20 font-medium"
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
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-8 right-0 p-2 text-white/70 hover:text-white transition-colors z-50"
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
                                        <img
                                            src={selectedMedia.src[selectedMedia.currentSrcIndex || 0]}
                                            alt={selectedMedia.caption}
                                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                        />

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
                                    <img
                                        src={selectedMedia.src}
                                        alt={selectedMedia.caption}
                                        className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                    />
                                )
                            )}
                        </div>
                        <p className="text-xl font-bold text-white/90 mt-4 text-center font-sans tracking-wide">
                            {selectedMedia.caption}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default FightsConvincingSection;
