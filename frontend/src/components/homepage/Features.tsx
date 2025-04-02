import React from "react";
const features = [
  {
    icon: "✈️",
    title: "FREE SHIPPING",
    description: "Order over $100",
  },
  {
    icon: "🔒",
    title: "SECURE PAYMENT",
    description: "Secure Payment",
  },
  {
    icon: "🏷️",
    title: "BEST PRICE",
    description: "Guaranteed Price",
  },
  {
    icon: "📚",
    title: "READ BOOKS ONLINE",
    description: "Over millions of books",
  },
];

const Features: React.FC = () => {


  return (
    <div className="bg-gray-200 py-6 md:-mt-20 cpb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-4"
            >
              {/* Icon */}
              <div className="text-2xl md:text-4xl">{feature.icon}</div>

              <div className=" flex flex-col gap-2">
                {/* Title */}
                <h3 className="font-bold text-sm text-nowrap md:text-lg text-gray-800 font-display">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 font-body font-semibold">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;