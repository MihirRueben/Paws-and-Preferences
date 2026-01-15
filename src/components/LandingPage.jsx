import { motion } from 'framer-motion';
import { Heart, PawPrint } from 'lucide-react';

const LandingPage = ({ onStartApp }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-12 sm:top-16 md:top-20 left-4 sm:left-6 md:left-10 text-pink-200 opacity-40 sm:opacity-50"
        >
          <PawPrint size={40} sm={50} md={60} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-12 sm:bottom-16 md:bottom-20 right-4 sm:right-6 md:right-10 text-blue-200 opacity-40 sm:opacity-50"
        >
          <Heart size={35} sm={45} md={50} />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 sm:top-1/2 left-1/5 sm:left-1/4 text-purple-200 opacity-30 sm:opacity-50 hidden xs:block"
        >
          <PawPrint size={30} sm={35} md={40} />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto z-10"
      >
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-4 sm:mb-6 md:mb-8"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl sm:shadow-2xl mx-auto">
            <PawPrint className="text-white" size={24} sm={32} md={40} strokeWidth={2} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tighter leading-tight"
        >
          Paws & Preference
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-10 lg:mb-12 font-medium leading-relaxed px-2 sm:px-0"
        >
          Find your purrfect companion among adorable kittens waiting for love
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Heart className="text-pink-500" size={16} sm={20} md={24} strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base mb-1">Like</h3>
            <p className="text-xs sm:text-sm text-gray-500">Show your love</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <PawPrint className="text-purple-500" size={16} sm={20} md={24} strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base mb-1">Find Matches</h3>
            <p className="text-xs sm:text-sm text-gray-500">Your perfect pet</p>
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartApp}
          className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl md:rounded-3xl font-bold text-base sm:text-lg md:text-xl shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 hover:from-gray-700 hover:to-gray-600 relative overflow-hidden group min-h-[44px] sm:min-h-[48px] md:min-h-[52px]"
        >
          <span className="relative z-10">Start Swiping</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          />
        </motion.button>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-xs sm:text-sm text-gray-400"
        >
          Made with ❤️ for cat lovers everywhere
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
