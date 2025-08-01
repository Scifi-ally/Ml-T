import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MLTIcon } from "@/components/ui/ml-t-icon";

const Index = () => {
  const fadeInVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Minimal Header */}
      <motion.header
        className="bg-white border-b border-gray-200 flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 py-4 sm:py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center">
                <MLTIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-black">
                LearnForge
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Takes remaining space */}
      <section className="flex-1 flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-2xl"
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Machine Learning
            <br />
            <span className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-normal">
              From fundamentals to expertise
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Complete, self-contained course designed to take you from beginner
            to expert.
          </motion.p>

          {/* Single CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/ml-course">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white font-semibold px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg transition-all duration-200"
              >
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Start ML Journey
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
