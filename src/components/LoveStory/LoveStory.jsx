import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Using placeholders for now, user can swap them
import gif3 from '../../assets/gif3.gif';
import audio3 from '../../assets/audio3.mpeg';
import gif4 from '../../assets/gif4.gif';
import gif5 from '../../assets/gif5.gif';
import gif8 from '../../assets/gif8.webp';
import gif11 from '../../assets/gif11.webp';
import gif9 from '../../assets/gif9.webp';
import gif18 from '../../assets/gif18.webp';
import gif13 from '../../assets/gif13.webp';
import gif12 from '../../assets/gif12.webp';
import gif22 from '../../assets/gif22.webp';
import gif23 from '../../assets/gif23.webp';
import gif14 from '../../assets/gif14.webp';
import gif20 from '../../assets/gif20.webp';
import gif24 from '../../assets/gif24.gif';
import gif21 from '../../assets/gif21.webp';
import gif10 from '../../assets/gif10.webp';
import gif16 from '../../assets/gif16.webp';
import gif25 from '../../assets/gif25.webp';
import gif26 from '../../assets/gif26.webp';
import gif36 from '../../assets/gif36.webp';
const storyData = [
    {
        id: 1,
        title: "The Beginning of Him",
        date: "27 February 2002",
        text: "A star was born to light up the world.",
        img: gif4,
        bgColor: "#fdd3daff" // Soft light pink
    },
    {
        id: 2,
        title: "The Beginning of Her",
        date: "04 September 2003",
        text: "And then came the one who would steal his heart.",
        img: gif8,
        bgColor: "#fdd2daff" // Slightly deeper pink
    },
    {
        id: 3,
        title: "Once-a-Year Meeting",
        date: "The Day We Waited For",
        text: ["Ella varushanum temple function eppo varum nu wait pannuvom appo tha meet panna mudiyum "],
        img: gif11,
        bgColor: "#fcd1d8ff" // Rosy pink
    },
    {
        id: 4,
        title: "The First Message 💬",
        date: "A Message from My Heart",
        text: ["That day changed my heart, and I sent my first message to you."],
        img: gif9,
        buttonText: "That message changed everything →",
        bgColor: "#eadaf5" // Lavender (original)
    },
    {
        id: 5,
        title: "Your Birthday",
        date: "27 February 2024",
        text: ["Un bday ku kk ponom unexpected ahh nadathuchi, anga vachi na unta inga en lover kuda varuven nu sonne"],
        img: gif18,
        buttonText: "The Wish That Came True →",
        bgColor: "#ceedf9ff" // Sky blue
    },
    {
        id: 6,
        title: "A Very Special Day ✨",
        date: "21 December 2024",
        text: ["That day changed me. Un veetuku na ponen nee anga illa, unna romba miss pannen. Etho puthusa na feel pannen."],
        img: gif13,
        buttonText: "Carry This Feeling →",
        bgColor: "#ded1f5ff" // Light purple
    },
    {
        id: 7,
        title: "The Question 💭",
        date: "31 December 2024",
        text: [
            <b>'Do you love me?'</b>,
            "Nee enkitta keta, ennaku athuku answer theriyum but na ethuvum sollala",
        ],
        img: gif12,
        buttonText: "My answer was coming… →",
        bgColor: "#fdd1e1ff" // Soft pink
    },
    {
        id: 8,
        title: "I Conveyed My Love 🎆",
        date: "1 January 2025",
        text: [
            "A new year. A new beginning.I finally said it. That day, years of waiting turned into one moment.",
        ],
        img: gif22,
        buttonText: "Continue Our Journey ✨",
        bgColor: "#ffd7e4ff" // Hot pink shade
    },
    {
        id: 9,
        title: "Right Moment ",
        date: "🤍❤️",
        text: ["After years of waiting, finally the right moment."],
        img: gif23,
        buttonText: "Our moments together 📸",
        bgColor: "#d0eff4ff" // Pale cyan
    },
    {
        id: 10,
        title: "The Rose ❤️",
        date: "02 January 2025",
        text: ["Nee oru red rose photo eduthu send panna athu chinna vishayam tha aana ennaku athu romba perusu and very special"],
        img: gif36,
        buttonText: "The Rose You Sent 🌹",
        bgColor: "#ffebee" // Very pale red/pink
    },
    {
        id: 11,
        title: "First outing as Lovers 💑",
        date: "13 January 2025",
        text: ["KK la oru place ku poitu intha place la vachi enkitta enna sonna nu nee keta, en lover kuda inga varuven nu munnadi sonnathu ennaku nyagam illa aana nee nyabagam vachi antha place ku kutitu pona  "],
        img: gif14,
        buttonText: "The Wish That Came True →",
        bgColor: "#e1f5fe" // Light blue
    },
    {
        id: 12,
        title: "First outing as Lovers ",
        date: "13 January 2025",
        text: [
            "At Eco Park, I proposed to you. Our first hug. Our first kiss. Our first romance. You bought flowers and gave them to me for Pongal making the festival brighter.",
        ],
        img: gif20,
        buttonText: "A Moment to Remember 🌸",
        bgColor: "#f3e5f5" // Pale purple
    },
    {
        id: 13,
        title: "Ring & Movies Night 💍",
        date: "08 March 2025",
        text: ["Ananiku night ennaku ring potu vitta apro antha night fulla unkuda tha iruthen"],
        img: gif24,
        buttonText: "Our Special Night →",
        bgColor: "#e8eaf6" // Indigo tint
    },
    {
        id: 14,
        title: "Temple Function as lovers",
        date: "6 May 2025",
        text: [
            "The first temple function… after we became lovers. That day, you saw me in a saree.",
        ],
        img: gif21,
        buttonText: "Eyes That Spoke 🌸",
        bgColor: "#fff9c4" // Light yellow
    },
    {
        id: 15,
        title: "First Meal Together🍽️",
        date: "02 August 2025",
        text: ["After my interview,We went to a hotel to eat for the first time. "],
        img: gif10,
        buttonText: "Our First Meal Together 🍽️",
        bgColor: "#fbe9e7" // Deep orange tint
    },
    {
        id: 16,
        title: "You Came to My Home 💌",
        date: "14 September 2025",
        text: [
            "You came to my home… just to see me.I gave you gulab jamun. And more than that,I gave you a letter.",
        ],
        img: gif16,
        buttonText: "A Letter for You 💌",
        bgColor: "#e0f2f1" // Teal tint
    },
    {
        id: 17,
        title: "Shopping & View Point – Kanyakumari 🌄",
        date: "21 December 2025",
        text: [
            "We shopped together in Kanyakumari. Then we went to the view point.",
        ],
        img: gif25,
        buttonText: "Together in Kanyakumari ❤️",
        bgColor: "#f1f8e9" // Light green tint
    },
    {
        id: 18,
        title: "Worth Every Wait",
        date: "🤍❤️",
        text: [
            "We waited years for this love. From once-a-year meetings to memories together.Every wait was worth you.",
        ],
        img: gif26,
        buttonText: "Worth Every Moment 🤍",
        bgColor: "#faebbfff" // Amber tint
    }
];

const LoveStory = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < storyData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    React.useEffect(() => {
        const audio = new Audio(audio3);
        audio.loop = true;
        audio.play().catch(e => console.log("Audio playback failed", e));

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const currentStory = storyData[currentIndex];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 pt-4 pb-8 relative overflow-hidden"
            style={{
                backgroundColor: '#f9f6f1',
                backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
            }}>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="z-10 max-w-[340px] md:max-w-sm w-full bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100"
                >
                    {/* Top Section - GIF/Image with curve */}
                    <div className="h-48 md:h-64 flex items-center justify-center md:pb-8 relative transition-colors duration-700"
                        style={{
                            clipPath: 'ellipse(80% 95% at 50% 0%)',
                            backgroundColor: currentStory.bgColor || '#eadaf5'
                        }}>
                        <motion.img
                            src={currentStory.img}
                            alt="Story Moment"
                            className="w-32 h-32 md:w-48 md:h-48 object-contain md:mb-8" // Reduced size from w-full h-full
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>

                    {/* Bottom Section - Text */}
                    <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2 md:pt-4 text-center flex flex-col items-center">
                        <h5 className="text-xs md:text-xs text-[#7c3aed] mb-1 md:mb-2 " style={{ fontFamily: 'var(--font-serif)' }}>
                            {currentStory.title}
                        </h5>

                        <div className="text-xs md:text-xs font-semibold text-gray-400 tracking-wide mb-1">
                            {currentStory.date}
                        </div>

                        <div className="min-h-[80px] md:min-h-[100px] flex flex-col justify-center px-3 pb-1">
                            {Array.isArray(currentStory.text) ? (
                                <div>
                                    {currentStory.text.map((paragraph, index) => (
                                        <p key={index} className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                    {currentStory.text}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 md:gap-6 mt-6 md:mt-8 z-10 mt-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transition-all ${currentIndex === 0 ? 'bg-gray-200 cursor-not-allowed text-gray-400' : 'bg-[#f7a8c4] text-white hover:shadow-xl'
                        }`}
                    style={{ borderRadius: '25%' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-[#8b94f6] text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ borderRadius: '25%' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </motion.button>
            </div>
        </section>
    );
};

export default LoveStory;
