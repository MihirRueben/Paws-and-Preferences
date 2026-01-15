import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { fetchCats } from './services/catService';
import Summary from './components/Summary';
import CatCard from './components/CatCard';
import LandingPage from './components/LandingPage';
import './App.css'

function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);

  const startApp = async () => {
    setShowLanding(false);
    setLoading(true);
    const data = await fetchCats(15);
    setCats(data);
    setLoading(false);
  };

  useEffect(() => {
    // Only fetch cats if not showing landing page
    if (!showLanding) {
      const getCats = async () => {
        const data = await fetchCats(15);
        setCats(data);
        setLoading(false);
      };
      getCats();
    }
  }, [showLanding]);

  const handleSwipe = (direction, cat) => {
    if (direction === 'right') {
      setLikedCats((prev) => [...prev, cat]);
    }

    // Moving to the next cat in the stack
    setCurrentIndex((prev) => prev + 1);
  };

  const startOver = () => {
    setCats([]);
    setLikedCats([]);
    setCurrentIndex(0);
    setLoading(true);
    // Refetch cats
    const getCats = async () => {
      const data = await fetchCats(15);
      setCats(data);
      setLoading(false);
    };
    getCats();
  };

  const goToLanding = () => {
    setShowLanding(true);
    setCats([]);
    setLikedCats([]);
    setCurrentIndex(0);
  };

  // Show landing page
  if (showLanding) {
    return <LandingPage onStartApp={startApp} />;
  }

  // Show loading state
  if (loading) return <div className="flex h-screen items-center justify-center bg-white text-gray-600 px-4">Loading Cats...</div>;

  return (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 text-gray-800 tracking-tighter text-center">
      Paws & Preference
    </h1>
    
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] max-h-[500px] md:max-h-[600px] lg:max-h-[700px] flex items-center justify-center">
      {/* Check if we still have cats left to show */}
      {currentIndex < cats.length ? (
        // Render the stack. We slice the array to only show the CURRENT cat 
        // and maybe 1-2 behind it for performance and layering.
        cats.map((cat, index) => {
          if (index < currentIndex) return null; // Don't render swiped cats
          if (index > currentIndex + 2) return null; // Don't render cats too far down the stack

          return (
            <CatCard 
              key={cat.id} 
              cat={cat} 
              // Only the top card (currentIndex) should be draggable
              isTopCard={index === currentIndex}
              onSwipe={(dir) => handleSwipe(dir, cat)} 
            />
          );
        })
      ) : (
        // This is what shows when currentIndex === cats.length
        <Summary likedCats={likedCats} total={cats.length} onStartOver={startOver} onGoToLanding={goToLanding} />
      )}
    </div>
  </div>
);
}

export default App;