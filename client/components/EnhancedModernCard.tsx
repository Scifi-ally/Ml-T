import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Play,
  ChevronDown,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { ModuleData } from "@/lib/dataService";

interface EnhancedModernCardProps {
  module: ModuleData;
  index: number;
  onStartModule: (moduleId: number) => void;
}

const EnhancedModernCard: React.FC<EnhancedModernCardProps> = ({
  module,
  index,
  onStartModule,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const progressInView = useInView(progressRef, { once: true, amount: 0.8 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const springConfig = { stiffness: 300, damping: 30 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-gray-50 border-gray-200";
      case "intermediate":
        return "bg-gray-100 border-gray-300";
      case "advanced":
        return "bg-gray-200 border-gray-400";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-white text-black border-gray-300";
      case "intermediate":
        return "bg-gray-100 text-black border-gray-400";
      case "advanced":
        return "bg-black text-white border-black";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200";
    if (progress < 30) return "bg-gray-400";
    if (progress < 70) return "bg-gray-600";
    return "bg-black";
  };

  const progressPercentage =
    (module.userProgress.lessonsCompleted / module.lessons.length) * 100;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progressPercentage}%`,
      transition: {
        duration: 1.2,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -12,
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.3, 0.6, 0.3, 0],
      scale: [1, 1.05, 1.1, 1.05, 1],
      x: [0, 5, -5, 0],
      y: [0, -3, 3, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: ySpring, opacity, scale: scaleSpring }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="relative group perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl blur-sm -z-10"
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
      />

      {/* Fluid floating particles around card when hovered */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-black rounded-full pointer-events-none"
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                x: [
                  0,
                  Math.sin(i * 0.8) * 150,
                  Math.sin(i * 0.8 + Math.PI) * 100,
                  0,
                ],
                y: [
                  0,
                  Math.cos(i * 0.8) * 100,
                  Math.cos(i * 0.8 + Math.PI) * 150,
                  0,
                ],
                scale: [0.5, 1, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5 + i * 0.1,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              style={{
                left: "50%",
                top: "50%",
              }}
            />
          ))}
        </>
      )}

      <motion.div
        variants={hoverVariants}
        className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 relative"
      >
        {/* Fluid border gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={
            isHovered
              ? {
                  background: [
                    "linear-gradient(0deg, transparent, rgba(0,0,0,0.1), transparent)",
                    "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)",
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.1), transparent)",
                    "linear-gradient(270deg, transparent, rgba(0,0,0,0.1), transparent)",
                    "linear-gradient(360deg, transparent, rgba(0,0,0,0.1), transparent)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Header with enhanced animations */}
        <motion.div
          className={`${getDifficultyColor(module.difficulty)} border-b border-gray-200 relative overflow-hidden`}
          variants={contentVariants}
        >
          {/* Fluid wave background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent"
              animate={{
                x: ["-100%", "100%"],
                scaleY: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                scaleY: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ width: "200%" }}
            />
          </div>

          <motion.div
            className="p-4 sm:p-6 relative z-10"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-3">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  x: [0, -2, 2, 0],
                  transition: {
                    x: { duration: 0.3, repeat: Infinity },
                    scale: { duration: 0.2 },
                  },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className={`${getDifficultyBadgeColor(module.difficulty)} text-xs font-medium px-3 py-1 border transition-all duration-300`}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Module {module.id}
                </Badge>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-2 h-2 bg-black rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs font-semibold text-black">
                  {module.userProgress.averageScore || 0}%
                </span>
                <Star className="w-3 h-3 text-black" />
              </motion.div>
            </div>

            <motion.h3
              className="text-lg sm:text-xl font-semibold leading-tight text-black mb-2"
              variants={itemVariants}
            >
              {module.title}
            </motion.h3>
            <motion.p
              className="text-sm text-gray-600 leading-relaxed"
              variants={itemVariants}
            >
              {module.description}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Content with enhanced animations */}
        <motion.div className="p-4 sm:p-6" variants={contentVariants}>
          {/* Progress Section with animated progress bar */}
          <motion.div className="space-y-4 mb-6" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-black flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-black" />
                Progress
              </span>
              <span className="text-xs text-gray-500">
                {module.userProgress.lessonsCompleted}/{module.lessons.length}{" "}
                lessons
              </span>
            </div>

            <div
              ref={progressRef}
              className="relative bg-gray-200 rounded-full h-3 overflow-hidden"
            >
              <motion.div
                className={`absolute top-0 left-0 h-3 rounded-full ${getProgressColor(progressPercentage)} shadow-sm`}
                variants={progressVariants}
                initial="hidden"
                animate={progressInView ? "visible" : "hidden"}
              >
                {/* Fluid shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ["-100%", "100%"],
                    scaleX: [0.5, 1, 0.8, 0.5],
                    opacity: [0.2, 0.4, 0.3, 0.2],
                  }}
                  transition={{
                    x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    scaleX: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    delay: 0.5,
                  }}
                  style={{ width: "60%" }}
                />
              </motion.div>
            </div>

            <motion.div
              className="flex items-center justify-between text-xs text-gray-500"
              variants={itemVariants}
            >
              <span className="flex items-center">
                <motion.span
                  key={progressPercentage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {progressPercentage.toFixed(0)}% complete
                </motion.span>
              </span>
              <span>{module.estimatedHours}h total</span>
            </motion.div>
          </motion.div>

          {/* Stats with staggered animations */}
          <motion.div
            className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6"
            variants={itemVariants}
          >
            {[
              {
                icon: BookOpen,
                value: `${module.lessons.length} lessons`,
                color: "text-black",
              },
              {
                icon: Clock,
                value: `${module.estimatedHours}h`,
                color: "text-black",
              },
              {
                icon: Award,
                value: `${module.projects} projects`,
                color: "text-black",
              },
            ].map((stat, statIndex) => (
              <motion.div
                key={statIndex}
                className="flex items-center group/stat cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: statIndex * 0.1 + 0.5 }}
              >
                <stat.icon
                  className={`w-4 h-4 mr-2 ${stat.color} group-hover/stat:scale-110 transition-transform duration-200`}
                />
                <span className="group-hover/stat:text-black transition-colors duration-200">
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons with enhanced effects */}
          <motion.div
            className="mb-6 flex flex-col sm:flex-row gap-3 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                onClick={() => onStartModule(module.id)}
                className="bg-black text-white font-medium py-3 px-8 rounded-lg text-sm relative overflow-hidden group/btn w-full sm:w-auto"
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 via-black to-gray-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                />

                <span className="relative z-10 flex items-center">
                  <motion.div
                    animate={
                      isHovered
                        ? {
                            scale: [1, 1.2, 1],
                            x: [0, 3, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: isHovered ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                  </motion.div>
                  {progressPercentage > 0
                    ? "Continue Learning"
                    : "Start Learning"}
                </span>

                {/* Sparkle effects on hover */}
                {isHovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                          opacity: 0,
                          x: Math.random() * 100,
                          y: Math.random() * 30,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: Math.random() * 40 - 20,
                          transition: {
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          },
                        }}
                      />
                    ))}
                  </>
                )}
              </Button>
            </motion.div>

            {/* Comprehensive Lesson Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                onClick={() =>
                  (window.location.href = `/comprehensive-lesson/${module.id}/comprehensive-intro`)
                }
                variant="outline"
                className="border-black text-black font-medium py-3 px-6 rounded-lg text-sm relative overflow-hidden group/btn2 w-full sm:w-auto hover:bg-black hover:text-white transition-colors duration-300"
              >
                <motion.div
                  animate={
                    isHovered
                      ? {
                          y: [0, -3, 0],
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                </motion.div>
                Deep Dive
              </Button>
            </motion.div>
          </motion.div>

          {/* Expand Toggle with rotation animation */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center text-xs text-gray-400 py-2 hover:text-gray-600 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">
              {isExpanded ? "Show Less" : "Show More"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {/* Expandable Details with smooth animations */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-200 pt-6 space-y-6 mt-4">
              {/* Prerequisites with staggered animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  y: isExpanded ? 0 : 20,
                }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-sm font-semibold text-black mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-black" />
                  Prerequisites
                </h4>
                <div className="flex flex-wrap gap-2">
                  {module.prerequisites.map((prereq, prereqIndex) => (
                    <motion.div
                      key={prereqIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        scale: isExpanded ? 1 : 0.8,
                      }}
                      transition={{
                        delay: 0.2 + prereqIndex * 0.05,
                        duration: 0.2,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-200 bg-gray-50 text-gray-700 px-2 py-1 hover:bg-gray-100 transition-colors duration-200"
                      >
                        {prereq}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Learning Topics with animated progress dots */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  y: isExpanded ? 0 : 20,
                }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-sm font-semibold text-black mb-3">
                  Learning Topics
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {module.learningPath.map((step, stepIndex) => (
                    <motion.div
                      key={stepIndex}
                      className="flex items-center text-sm text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isExpanded ? 1 : 0,
                        x: isExpanded ? 0 : -20,
                      }}
                      transition={{
                        delay: 0.3 + stepIndex * 0.05,
                        duration: 0.2,
                      }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                          stepIndex < module.userProgress.lessonsCompleted
                            ? "bg-black"
                            : "bg-gray-300"
                        }`}
                        animate={
                          stepIndex < module.userProgress.lessonsCompleted
                            ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: stepIndex * 0.1,
                        }}
                      />
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  y: isExpanded ? 0 : 20,
                }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      Last accessed:{" "}
                      {module.userProgress.lastAccessed.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <span>
                      Average score: {module.userProgress.averageScore}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedModernCard;
