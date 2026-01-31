import React, { useState } from 'react';
import Hero from './components/Hero/Hero';
import Gallery from './components/Gallery/Gallery';
import Message from './components/Message/Message';
import Question from './components/Question/Question';
import FloatingHearts from './components/FloatingHearts/FloatingHearts';
import LandingPage from './components/LandingPage/LandingPage';
import LoveStory from './components/LoveStory/LoveStory';
import EveryPartOfUs from './components/EveryPartOfUs/EveryPartOfUs';
import LoveSection from './components/LoveSection/LoveSection';
import MemoriesSection from './components/LoveSection/MemoriesSection';
import FightsConvincingSection from './components/LoveSection/FightsConvincingSection';
import Quiz from './components/Quiz/Quiz';

function App() {
  const [page, setPage] = useState(0); // 0: Landing, 1: Proposal, 2: Story, 3: Every Part, 4+: Sections, 10: Main Content
  const [selectedSection, setSelectedSection] = useState(null);

  if (page === 0) {
    return <LandingPage onEnter={() => setPage(1)} />;
  }

  if (page === 1) {
    return <Question onNext={() => setPage(2)} />;
  }

  if (page === 2) {
    return <LoveStory onComplete={() => setPage(3)} />;
  }

  if (page === 3) {
    return <EveryPartOfUs onSectionSelect={(section) => {
      setSelectedSection(section);
      setPage(4);
    }} />;
  }

  if (page === 4 && selectedSection) {
    // Show specific section page
    if (selectedSection === 'love') {
      return <LoveSection
        onBack={() => setPage(3)}
        onContinue={() => setPage(10)}
      />;
    }

    if (selectedSection === 'memories') {
      return <MemoriesSection
        onBack={() => setPage(3)}
        onContinue={() => setPage(10)}
      />;
    }

    if (selectedSection === 'fights-convincing') {
      return <FightsConvincingSection
        onBack={() => setPage(3)}
        onContinue={() => setPage(10)}
      />;
    }

    if (selectedSection === 'quiz') {
      return <Quiz
        onBack={() => {
          setPage(3);
          setSelectedSection(null);
        }}
      />;
    }

    // Default placeholder
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p>Section not found</p>
          <button onClick={() => setPage(3)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingHearts />
      <Hero />
      <Gallery />
      <Message />

      <footer className="py-8 text-center text-primary/60 text-sm font-serif">
        Made with ❤️ for you
      </footer>
    </div>
  );
}

export default App;
