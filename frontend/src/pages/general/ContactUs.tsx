import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const contactMethods = [
    {
      icon: <FiMail className="text-2xl text-deepbrown" />,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "info@bookhaven.com",
      link: "mailto:info@bookhaven.com"
    },
    {
      icon: <FiPhone className="text-2xl text-deepbrown" />,
      title: "Call Us",
      description: "Available 9am-5pm, Mon-Fri",
      details: "+1 (438) 994-4503",
      link: "tel:+4389944503"
    },
    {
      icon: <FiMapPin className="text-2xl text-deepbrown" />,
      title: "Visit Us",
      description: "Come browse our collection",
      details: "6391 Rue Pascal Street, Montreal Canada",
      link: "https://maps.google.com"
    },
    {
      icon: <FiClock className="text-2xl text-deepbrown" />,
      title: "Hours",
      description: "Our store opening hours",
      details: "Mon-Fri: 9am-7pm\nSat-Sun: 10am-5pm"
    }
];

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Add your form submission logic here
    reset();
  };

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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-4">
          Contact <span className="text-deepbrown">Book Haven</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
          We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Methods */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 font-display">
              Ways to Reach Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{method.title}</h3>
                      <p className="text-gray-500 text-sm mb-2 font-body">{method.description}</p>
                      {method.link ? (
                        <a 
                          href={method.link} 
                          className="text-gray-700 hover:text-deepbrown transition-colors font-body"
                        >
                          {method.details}
                        </a>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-line font-body">{method.details}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 font-display">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-body">
      Your Name
    </label>
    <input
      id="name"
      type="text"
      {...register("name", { required: "Name is required" })}
      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-deepbrown focus:border-deepbrown`}
    />
    {errors.name && (
      <p className="mt-1 text-sm text-red-600 font-body">
        {errors.name.message as string}
      </p>
    )}
  </div>

  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-body">
      Email Address
    </label>
    <input
      id="email"
      type="email"
      {...register("email", { 
        required: "Email is required",
        pattern: {
            message: "Invalid email address",
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i          
        }
      })}
      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-deepbrown focus:border-deepbrown`}
    />
    {errors.email && (
      <p className="mt-1 text-sm text-red-600 font-body">
        {errors.email.message as string}
      </p>
    )}
  </div>

  <div>
    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 font-body">
      Subject
    </label>
    <select
      id="subject"
      {...register("subject", { required: "Subject is required" })}
      className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-deepbrown focus:border-deepbrown`}
    >
      <option value="">Select a subject</option>
      <option value="order">Order Inquiry</option>
      <option value="shipping">Shipping Question</option>
      <option value="returns">Returns</option>
      <option value="suggestion">Book Suggestion</option>
      <option value="other">Other</option>
    </select>
    {errors.subject && (
      <p className="mt-1 text-sm text-red-600 font-body">
        {errors.subject.message as string}
      </p>
    )}
  </div>

  <div>
    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-body">
      Your Message
    </label>
    <textarea
      id="message"
      rows={4}
      {...register("message", { required: "Message is required" })}
      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-deepbrown focus:border-deepbrown`}
    />
    {errors.message && (
      <p className="mt-1 text-sm text-red-600 font-body">
        {errors.message.message as string}
      </p>
    )}
  </div>

  <motion.button
    type="submit"
    className="w-full flex items-center justify-center gap-2 bg-black hover:bg-rose-400 
    text-white py-3 px-6 rounded-lg transition-colors font-semibold font-body"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
  >
    <FiSend className="text-lg" />
    Send Message
  </motion.button>
</form>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          className="mt-16 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215373510518!2d-73.9878449242392!3d40.74844047138981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689876423585!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;