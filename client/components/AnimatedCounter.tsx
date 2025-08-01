import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  delay = 0,
  suffix = "",
  className = "",
}) => {
  const [count, setCount] = useState(from);
  const controls = useAnimation();

  useEffect(() => {
    const animateCount = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));

      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = from + (to - from) * easeOut;

        setCount(Math.round(currentCount));

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    };

    animateCount();
  }, [from, to, duration, delay]);

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
