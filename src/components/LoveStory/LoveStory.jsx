import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Using placeholders for now, user can swap them
import gif3 from '../../assets/gif3.gif';
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
import gif17 from '../../assets/gif17.webp';
import gif14 from '../../assets/gif14.webp';
import gif20 from '../../assets/gif20.webp';
import gif24 from '../../assets/gif24.gif';
import gif21 from '../../assets/gif21.webp';
import gif10 from '../../assets/gif10.webp';
import gif16 from '../../assets/gif16.webp';
import gif25 from '../../assets/gif25.webp';
import gif26 from '../../assets/gif26.webp';
const storyData = [
    {
        id: 1,
        title: "The Beginning of Him",
        date: "27 February 2002", // Placeholder
        text: "A star was born to light up the world.",
        img: gif4// Placeholder GIF
    },
    {
        id: 2,
        title: "The Beginning of Her",
        date: "04 September 2003", // Placeholder
        text: "And then came the one who would steal his heart.",
        img: gif8 // Placeholder GIF
    },
    {
        id: 3,
        title: "Once-a-Year Meeting",
        date: "The Day We Waited For", // Placeholder
        text: ["Ella varushanum temple function eppo varum nu wait pannuvom appo tha meet panna mudiyum ",

        ],
        img: gif11 // Placeholder, user might want a specific temple/meeting gif later
    },
    {
        id: 4,
        title: "The First Message 💬",
        date: "A Message from My Heart",
        text: [
            "That day changed my heart, and I sent my first message to you.",

        ],
        img: gif9, // Placeholder
        buttonText: "That message changed everything →"
    },
    {
        id: 5,
        title: "Your Birthday – Kanyakumari 🌊",
        date: "27 February 2024",
        text: [
            "Un bday ku kk ponom unexpected ahh nadathuchi, anga vachi na unta inga en lover kuda varuven nu sonne"
            
        ],
        img: gif18, // Placeholder - could use ocean/sunset gif
        buttonText: "The Wish That Came True →"
    },
    {
        id: 6,
        title: "A Very Special Day ✨",
        date: "21 December 2024",
        text: [
            "That day changed me. Un veetuku na ponen nee anga illa, unna romba miss pannen. Etho puthusa na feel pannen.",
        ],
        img: gif13, // Placeholder
        buttonText: "Carry This Feeling →"
    },
    {
        id: 7,
        // title: "The Question 💭",
        date: "31 December 2024",
        text: [
            <b>'Do you love me?'</b>,
            "Nee enkitta keta, ennaku athuku answer theriyum but na ethuvum sollala",

        ],
        img: gif12, // Placeholder
        buttonText: "My answer was coming… →"
    },
    {
        id: 8,
        title: "I Conveyed My Love 🎆",
        date: "1 January 2025",
        text: [
            "A new year. A new beginning.I finally said it.",
            "That day, years of waiting turned into one moment.",

        ],
        img: gif22,
        buttonText: "Continue Our Journey ✨"
    },
    {
        id: 9,
        title: "Right Moment ",
        date: "🤍❤️",
        text: [
            "After years of waiting, finally the right moment."
        ],
        img: gif23,
        buttonText: "Our moments together 📸"
    },
    {
        id: 10,
        title: "The Rose ❤️",
        date: "02 January 2025",
        text: [
            "Nee oru red rose photo eduthu send panna athu chinna vishayam tha aana ennaku athu romba perusu and very special"
            
        ],
        img: gif17,
        buttonText: "The Rose You Sent 🌹"
    },
    {
        id: 11,
        title: "First outing as Lovers 💑",
        date: "13 January 2025",
        text: [

            "KK la oru place ku poitu intha place la vachi enkitta enna sonna nu nee keta, en lover kuda inga varuven nu munnadi sonnathu ennaku nyagam illa aana nee nyabagam vachi antha place ku kutitu pona  "
        ],
        img: gif14,
        buttonText: "The Wish That Came True →"
    },
    {
        id: 12,
        title: "First outing as Lovers ",
        date: "13 January 2025",
        text: [

            "At Eco Park, I proposed to you.",
            "Our first hug. Our first kiss. Our first romance.",
            "You bought flowers and gave them to me for Pongal making the festival brighter.",

        ],
        img: gif20,
        buttonText: "A Moment to Remember 🌸"
    },
    {
        id: 13,
        title: "Ring & Movies Night 💍",
        date: "08 March 2025",
        text: [
            "Ananiku night ennaku ring potu vitta apro antha night fulla unkuda tha iruthen",
            
        ],
        img: gif24,
        buttonText: "Our Special Night →"
    },
    {
        id: 14,
        title: "Temple Function as lovers",
        date: "6 May 2025",
        text: [
            "The first temple function… after we became lovers.",
            "That day, you saw me in a saree.",

        ],
        img: gif21,
        buttonText: "Eyes That Spoke 🌸"
    },
    {
        id: 15,
        title: "First Meal Together🍽️",
        date: "02 August 2025",
        text: [

            "After my interview,We went to a hotel to eat for the first time. ",

        ],
        img: gif10,
        buttonText: "Our First Meal Together 🍽️"
    },
    {
        id: 16,
        title: "You Came to My Home 💌",
        date: "14 September 2025",
        text: [
            "You came to my home… just to see me.",
            "I gave you gulab jamun.",
            "And more than that,I gave you a letter.",

        ],
        img: gif16,
        buttonText: "A Letter for You 💌"
    },
    {
        id: 17,
        title: "Shopping & View Point – Kanyakumari 🌄",
        date: "21 December 2025",
        text: [
            "We shopped together in Kanyakumari.",
            "Then we went to the view point.",

        ],
        img: gif25,
        buttonText: "Together in Kanyakumari ❤️"
    },
    {
        id: 18,
        title: "Worth Every Wait",
        date: "🤍❤️",
        text: [
            "We waited years for this love.",
            "From once-a-year meetings to memories together.",
            "Every wait was worth you."
        ],
        img: gif26,
        buttonText: "Worth Every Moment 🤍"
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

    const currentStory = storyData[currentIndex];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-6 text-center bg-[#fae8e8] overflow-hidden relative">

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl"></div>
            </div>

            <AnimatePresence mode="wait" >
                <motion.div
                    key={currentStory.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="z-10 max-w-md w-full bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 "
                >
                    <motion.img
                        src={currentStory.img}  
                        alt="Story Moment"
                        className="w-48 h-48 object-contain  rounded-xl mx-auto"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}  
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />

                    <h2 className="text-md text-[#d90429] mt-2 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {currentStory.title}
                    </h2>

                    <div className="text-md font-bold text-gray-800 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        {currentStory.date}
                    </div>

                    {Array.isArray(currentStory.text) ? (
                        <div className="space-y-4 mb-8">
                            {currentStory.text.map((paragraph, index) => (
                                <motion.p
                                    key={index}
                                    className="text-md text-gray-600 italic"
                                    style={{ fontFamily: 'var(--font-serif)' }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.6 }}
                                >
                                    {paragraph}
                                </motion.p> 
                            ))}
                        </div>
                    ) : (
                        <p className="text-md text-gray-600 italic mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
                            {currentStory.text}
                        </p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="p-2 mb-4   bg-[#d90429] text-white rounded-3 font-serif shadow-lg hover:shadow-xl transition-all"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Array.isArray(currentStory.text) ? currentStory.text.length * 0.3 + 0.5 : 0.5 }}
                    >
                        {currentStory.buttonText || (currentIndex < storyData.length - 1 ? "Next ❤️" : "Continue Our Journey ✨")}
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default LoveStory;
