// Cat card frame with motion tailwind
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import ImageSkeleton from './ImageSkeleton';
import { useState } from 'react';

const CatCard = ({ cat, onSwipe, isTopCard }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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
      {!imageLoaded && <ImageSkeleton />}
      <img
        src={cat.url}
        alt="Cute Kitten"
        className={`w-full h-full object-cover select-none transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        draggable="false"
        loading={isTopCard ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        style={{ imageRendering: 'auto' }}
      />

      {/* Visible Action Buttons */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 flex justify-center gap-6 sm:gap-8 px-4">
          {/* Dislike Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('left')}
            disabled={!isTopCard}
            style={{ backgroundColor: '#ef4444' }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover:bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
          >
            {/* Increased icon size from w-6 to w-8 */}
            <X className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" strokeWidth={3.5} />
          </motion.button>
          
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleButtonClick('right')}
            disabled={!isTopCard}
            style={{ backgroundColor: '#22c55e' }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" strokeWidth={3.5} fill="currentColor" />
          </motion.button>
        </div>

      {/* Ultra-Minimalist Info Section */}
      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
        <div className="text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.5)' }}>
            {cat.name} <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light opacity-90">{cat.age}</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-medium opacity-90 mt-1 uppercase tracking-widest" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Purrfect Match
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CatCard;