import React from "react";
import bookbg1 from "../../assets/bookbg1.png"
import { motion} from 'framer-motion';

const BookFestival: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[400px] lg:h-[80vh]
      bg-cover bg-no-repeat bg-center bg-fixed" 
      style={{ 
        backgroundImage: `url(${bookbg1})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition:"right"
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black-100 to-pink-300 opacity-80"></div>
      <div className="relative z-10 flex flex-col items-center
        justify-center h-full space-y-4 md:space-y-6
        lg:space-y-8 px-4 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 font-display">
          BOOK FESTIVAL
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-body">
          Shop wide range of collections
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-body">
          All Books are 50% Off
        </p>
        <motion.a href="/books-store"
          className="bg-black font-semibold font-body
          text-white py-3 px-6 rounded-lg hover:bg-rose-400
            transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SHOP NOW
        </motion.a>
      </div>
    </div>
  );
};

export default BookFestival;