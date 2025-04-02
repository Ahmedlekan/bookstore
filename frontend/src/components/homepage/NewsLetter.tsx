import { useState } from "react";
import { motion} from 'framer-motion';

const NewsLetter = () => {

    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim() === "") {
          alert("Please enter a valid email address.");
          return;
        }
        // Logic for subscribing (e.g., API call)
        alert(`Subscribed with ${email}`);
        setEmail("");
      };

  return (
    <section className="bg-gray-100 py-12 px-4 md:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-black font-display mb-4">
          SUBSCRIBE TO OUR NEWSLETTER
        </h2>
        <p className="text-gray-600 mb-8 px-4 md:px-0 font-body">
          Enter your email address to receive regular updates, as well as news on
          upcoming events and specific offers.
        </p>

        <form 
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center
            justify-center gap-4 max-w-xl mx-auto px-4"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 px-6 py-3 border border-deepbrown 
              rounded-md focus:outline-none focus:ring-2 focus:ring-deepbrown
              placeholder:text-gray-400"
          />
          <motion.button
            type="submit"
            className="w-full sm:w-32 bg-black text-white px-6 py-3 
              rounded-md hover:bg-rose-400 transition-colors duration-300
              font-medium font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
      </div>
    </section>
  )
}

export default NewsLetter