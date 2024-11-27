import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import book2 from "../../assets/book2.png"
import book3 from "../../assets/book3.png"
import book4 from "../../assets/book4.png"


interface BannerSlide {
    title: string;
    subtitle: string;
    description: string;
    buttonLabel: string;
    imageSrc: string;
  }


  const slides: BannerSlide[] = [
    {
      title: 'ISBN Search Feature',
      subtitle: 'Search Books Easily',
      description: 'Search books using ISBN numbers or Author names and save your time.',
      buttonLabel: 'Explore Now',
      imageSrc: book4
    },
    {
      title: 'Wide Collection of Books',
      subtitle: 'Browse By Categories',
      description: 'Explore thousands of books across different genres and categories.',
      buttonLabel: 'Shop Now',
      imageSrc: book3
    },
    {
      title: 'Fast and Secure Checkout',
      subtitle: 'Hassle-Free Shopping',
      description: 'Enjoy a seamless and secure checkout process with multiple payment options.',
      buttonLabel: 'Get Started',
      imageSrc: book2
    },
  ];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [slides.length]);

    // Slide navigation handlers
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      };


  return (
    <div className="pb-10 relative w-full min-h-screen flex
        flex-col md:flex-row overflow-hidden z-10">
      {/* Content Section */}
      <motion.div 
        className="w-full md:w-1/2 flex items-center justify-center 
                    px-6 md:px-12 lg:px-20 z-10 py-12 md:py-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        key={`content-${currentSlide}`}
      >
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <p className="uppercase text-lg text-gray-600 tracking-wide font-body">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold 
                text-gray-900 mb-4 font-display">
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <>
                    {i > 0 && ' '}
                    {i === 1 ? (
                      <span key={i} className="text-deepbrown">
                        {word}
                      </span>
                    ) : (
                      <span key={i}>{word}</span>
                    )}
                  </>
                ))}
              </h1>
              <p className="text-gray-600 text-xl mb-6 font-body">
                {slides[currentSlide].description}
              </p>
              <motion.button 
                className="bg-black font-semibold font-body
                text-white py-3 px-6 rounded-lg hover:bg-rose-400
                  transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {slides[currentSlide].buttonLabel}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className="w-full md:w-1/2 h-[50vh] md:h-screen relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`image-${currentSlide}`}
            src={slides[currentSlide].imageSrc}
            alt={slides[currentSlide].title}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Navigation Arrows */}
      <div className="absolute z-20 top-1/2 w-full flex justify-between px-4">
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/50 hover:bg-white/70
            rounded-full p-2 backdrop-blur-sm"
        >
          ←
        </motion.button>
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/50 hover:bg-white/70
            rounded-full p-2 backdrop-blur-sm"
        >
          →
        </motion.button>
      </div>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-6 left-1/2 transform
        -translate-x-1/2 flex space-x-2 z-50">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-rose-400' : 'bg-gray-300'
            }`}
            animate={{
              scale: index === currentSlide ? 1.5 : 1,
              backgroundColor: index === currentSlide ? '#f43f5e' : '#d1d5db'
            }}
            transition={{ duration: 0.3 }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div> */}
    </div>
  )
}

export default Banner