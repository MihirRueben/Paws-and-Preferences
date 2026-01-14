import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { fetchCats } from './services/catService';
import Summary from './components/Summary';
import CatCard from './components/CatCard';
import './App.css'

function App() {
  const [cats, setCats] = useState([]);
  const [likedCats, setLikedCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCats = async () => {
      const data = await fetchCats(15);
      setCats(data);
      setLoading(false);
    };
    getCats();
  }, []);

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

  if (loading) return <div className="flex h-screen items-center justify-center">Loading Cats...</div>;

  return (
  <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4 overflow-hidden">
    <h1 className="text-4xl font-black mb-8 text-pink-500 tracking-tighter">
      Paws & Preference
    </h1>
    
    <div className="relative w-full max-w-sm h-[500px] flex items-center justify-center">
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
        <Summary likedCats={likedCats} total={cats.length} onStartOver={startOver} />
      )}
    </div>
  </div>
);
}

export default App;