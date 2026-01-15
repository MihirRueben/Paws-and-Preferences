//added loading skeleton for a smoother animation or loading performance

import { motion } from 'framer-motion';

const ImageSkeleton = () => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
      <motion.div
        className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
    </div>
  );
};

export default ImageSkeleton;
