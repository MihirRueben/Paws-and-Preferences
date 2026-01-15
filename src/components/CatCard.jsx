// Cat card frame with motion tailwind
import { motion, useMotionValue, useTransform } from 'framer-motion';

const CatCard = ({ cat, onSwipe, isTopCard }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation and scale based on movement
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const scale = useTransform(x, [-150, 0, 150], [0.95, 1, 0.95]);
  
  // Minimalist Stamp Opacities (Corner placement)
  const likeOpacity = useTransform(x, [50, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -50], [1, 0]);
  const superLikeOpacity = useTransform(y, [-100, -40], [1, 0]);

  const handleDragEnd = (event, info) => {
    if (!isTopCard) return;
    
    const threshold = 120;
    if (info.offset.y < -100 && Math.abs(info.offset.x) < 50) {
      onSwipe('up');
    } else if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
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
      className="relative w-full h-full bg-zinc-100 rounded-[2.5rem] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-none ring-1 ring-black/5"
    >
      {/* Main Image */}
      <img
        src={cat.url}
        alt="Cute Kitten"
        className="w-full h-full object-cover select-none"
        draggable="false"
      />

      {/* Gradient Overlay  */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Minimalist Action Stamps */}
      <div className="absolute top-8 inset-x-8 flex justify-between pointer-events-none uppercase font-black tracking-widest">
        <motion.div
          style={{ opacity: likeOpacity }}
          className="border-4 border-emerald-500 text-emerald-500 rounded-xl px-4 py-1 rotate-[-15deg] scale-125"
        >
          Like
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="border-4 border-rose-500 text-rose-500 rounded-xl px-4 py-1 rotate-[15deg] scale-125"
        >
          Nope
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: superLikeOpacity }}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 border-4 border-sky-400 text-sky-400 rounded-xl px-6 py-2 font-black uppercase tracking-tighter"
      >
        Super Like
      </motion.div>

      {/* Ultra-Minimalist Info Section */}
      <div className="absolute bottom-0 left-0 right-0 p-10">
        <div className="text-white">
          <h2 className="text-4xl font-bold tracking-tight">
            Kitten <span className="text-2xl font-light opacity-80">Fresh</span>
          </h2>
          <p className="text-sm font-medium opacity-70 mt-1 uppercase tracking-widest">
            Purrfect Match
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CatCard;