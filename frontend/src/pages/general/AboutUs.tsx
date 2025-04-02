import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiAward, FiHeart } from 'react-icons/fi';
import teamImage from '../../assets/book1.jpg';
import storeImage from '../../assets/blog2.jpg';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { icon: <FiBook className="text-3xl" />, value: "10,000+", label: "Books Available" },
    { icon: <FiUsers className="text-3xl" />, value: "50,000+", label: "Happy Customers" },
    { icon: <FiAward className="text-3xl" />, value: "15+", label: "Years Experience" },
    { icon: <FiHeart className="text-3xl" />, value: "100%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
          Our <span className="text-deepbrown">Story</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-body">
          Discover the passion behind Book Haven and our journey to becoming your favorite literary destination.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Our Story Section */}
        <motion.section 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-display">
              How It All Began
            </h2>
            <div className="space-y-4 text-gray-600 font-body">
              <p>
                Founded in 2008 by lifelong book lover Sarah Johnson, Book Haven started as a small independent bookstore in the heart of the city. What began as a humble shop with just 500 titles has grown into one of the region's most beloved literary destinations.
              </p>
              <p>
                Our mission has always been simple: to connect readers with books they'll love and create a welcoming space for the community to discover, discuss, and celebrate literature.
              </p>
              <p>
                Today, we're proud to offer an extensive collection of new, used, and rare books across all genres, with a special focus on supporting local authors and independent publishers.
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <img 
              src={storeImage} 
              alt="Our bookstore" 
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-deepbrown mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-500 font-body">{stat.label}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 font-display">
              Meet Our <span className="text-deepbrown">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-body">
              Our passionate team of book enthusiasts is here to help you find your next great read.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <img 
              src={teamImage} 
              alt="Our team" 
              className="w-full h-auto rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">Our Mission</h3>
            <p className="text-gray-600 font-body">
              To foster a lifelong love of reading by providing exceptional service, carefully curated selections, and a welcoming space for all book lovers.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">Our Values</h3>
            <ul className="space-y-2 text-gray-600 font-body">
              <li>• Passion for literature</li>
              <li>• Community engagement</li>
              <li>• Sustainability</li>
              <li>• Inclusivity</li>
              <li>• Personalized service</li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">Our Promise</h3>
            <p className="text-gray-600 font-body">
              We promise to go above and beyond to help you find the perfect book, whether you're a lifelong reader or just discovering the joy of books.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUs;