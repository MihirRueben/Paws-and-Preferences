// Cat card frame with motion tailwind
import {motion, useMotionValue, useTransform} from 'framer-motion';

const CatCard = ({cat, onSwipe}) => {
    const x = useMotionValue(0);

    //As the cards are being dragged, we rotate the card and change the background colour of the cards slightly
    const rotate = useTransform(x, [-200,200], [-25,25])
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            onSwipe('right');

        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
          style = {{x, rotate, opacity, position: 'absolute'}}
          drag = "x"
          dragConstraints = {{left: 0, right: 0}}
          onDragEnd={handleDragEnd}
          className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden cursor-grab active:curson-grabbing border-4 border-white">
            <img
                src={cat.url}
                alt = "Kitten"
                className="w-full h-full object-cover pointer-events-none"
            />
            {/* Optional: Visual cues for Like/Nope */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between pointers-events-none">
                <motion.span style={{ opacity: useTransform(x, [-100, -50], [1,0]) }} className="text-red-500 font-bold text-2xl border-red-500 p-2 rounded">NOPE</motion.span>
                <motion.span style={{ opacity: useTransform(x, [50, 100], [0,1]) }} className="text-green-500 font-bold text-2xl border-green-500 p-2 rounded">LIKE</motion.span>
            </div>
          </motion.div>
    );

};

export default CatCard;