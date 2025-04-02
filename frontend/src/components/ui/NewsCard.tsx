import React from "react";
import { motion} from 'framer-motion';

interface NewsCardProps {
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
  onReadMore?: () => void; // Optional click handler
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  image, 
  author, 
  date, 
  title, 
  description,
  onReadMore 
}) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden
      hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Image with aspect ratio */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        {/* Meta information */}
        <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-3 flex-wrap gap-2">
          <div className="flex items-center">
            <span className="mr-1" aria-hidden="true">👤</span>
            <span className="sr-only">Author:</span>
            <p className="font-body">{author}</p>
          </div>
          
          <span className="text-gray-300 hidden sm:block">|</span>
          
          <div className="flex items-center">
            <span className="mr-1" aria-hidden="true">📅</span>
            <span className="sr-only">Date:</span>
            <time dateTime={new Date(date).toISOString()}>{date}</time>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-semibold text-gray-800 mb-3
        hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 font-body text-sm sm:text-base">
          {description}
        </p>

        {/* Read More button - positioned at bottom with margin-top auto */}
        <motion.button 
          onClick={onReadMore}
          className="mt-auto bg-black hover:bg-rose-400 font-semibold font-body text-white
          px-4 py-2 rounded-md transition-colors duration-200
          w-full sm:w-auto text-sm sm:text-base"
          aria-label={`Read more about ${title}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read More
        </motion.button>
      </div>
    </article>
  );
};

export default NewsCard;