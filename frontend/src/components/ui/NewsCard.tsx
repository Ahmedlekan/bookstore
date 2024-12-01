import React from "react";

interface NewsCardProps {
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ image, author, date, title, description }) => {
  return (
    <div className="bg-white shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-auto h-auto object-cover" />
      <div className="p-6">
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="mr-2">👤</span>
          <p className=" font-body">{author}</p>
          <span className="mx-2">|</span>
          <span className="mr-2">📅</span>
          <p>{date}</p>
        </div>
        <h3 className="text-xl font-display font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 font-body">{description}</p>
        <button className="bg-black font-semibold font-body text-white
          px-4 py-2 rounded-md hover:bg-black/80 transition">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard