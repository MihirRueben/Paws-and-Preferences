// Cat card frame with motion tailwind
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const CatCard = ({ cat, onSwipe, isTopCard }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation and scale based on movement
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const scale = useTransform(x, [-120, 0, 120], [0.95, 1, 0.95]);
  
  // Responsive swipe thresholds
  const getThreshold = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      return width < 640 ? 80 : width < 1024 ? 100 : 120;
    }
    return 120;
  };
  
  // Minimalist Stamp Opacities (Corner placement)
  const likeOpacity = useTransform(x, [40, getThreshold()], [0, 1]);
  const nopeOpacity = useTransform(x, [-getThreshold(), -40], [1, 0]);

  const handleDragEnd = (event, info) => {
    if (!isTopCard) return;
    
    const threshold = getThreshold();
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const handleButtonClick = (direction) => {
    if (!isTopCard) return;
    onSwipe(direction);
  };

  return (
    <motion.div
      style={{ 
        x, y, rotate, scale, 
        position: 'absolute',
        zIndex: isTopCard ? 50 : 0 
      }}
      drag={isTopCard}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-full h-full bg-zinc-100 rounded-2xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-none ring-1 ring-black/5"
    >
      {/* Main Image */}
      <img
        src={cat.url}
        alt="Cute Kitten"
        className="w-full h-full object-cover select-none"
        draggable="false"
      />

      {/* Visible Action Buttons */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
        {/* Dislike Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('left')}
          disabled={!isTopCard}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X size={20} sm={24} md={28} strokeWidth={3} />
        </motion.button>
        
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleButtonClick('right')}
          disabled={!isTopCard}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Heart size={20} sm={24} md={28} strokeWidth={3} fill="currentColor" />
        </motion.button>
      </div>

      {/* Ultra-Minimalist Info Section */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
        <div className="text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {cat.name} <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light opacity-80">{cat.age}</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-medium opacity-70 mt-1 uppercase tracking-widest">
            Purrfect Match
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CatCard;