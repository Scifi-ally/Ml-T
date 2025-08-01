import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}) => {
  const sizeConfig = {
    sm: { spinner: 'w-4 h-4', text: 'text-sm', container: 'gap-2' },
    md: { spinner: 'w-6 h-6', text: 'text-base', container: 'gap-3' },
    lg: { spinner: 'w-8 h-8', text: 'text-lg', container: 'gap-4' }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center justify-center ${config.container} ${className}`}>
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`${config.spinner} border-2 border-primary/30 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner rotating dot */}
        <motion.div
          className={`absolute top-0 left-0 ${config.spinner} border-2 border-transparent border-t-primary rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center pulse dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      
      {text && (
        <motion.span
          className={`${config.text} text-muted-foreground font-medium`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};

// Skeleton loader for cards
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Header skeleton */}
        <div className="h-32 bg-gradient-to-br from-muted to-muted/50" />
        
        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
          
          {/* Progress skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
            <div className="h-2 bg-muted rounded w-full" />
          </div>
          
          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-muted/50 rounded-lg p-3 space-y-2">
                <div className="h-3 bg-muted rounded w-8 mx-auto" />
                <div className="h-4 bg-muted rounded w-6 mx-auto" />
                <div className="h-2 bg-muted rounded w-12 mx-auto" />
              </div>
            ))}
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 bg-muted rounded-lg w-full" />
        </div>
      </div>
    </div>
  );
};

// Tab loading animation
export const TabLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        {/* Multiple bouncing dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Text */}
        <motion.p
          className="text-sm text-muted-foreground mt-4 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading content...
        </motion.p>
      </div>
    </div>
  );
};

// Page transition loader
export const PageLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="relative mb-4">
          {/* Spinning gradient ring */}
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary border-r-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center logo or icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-6 h-6 bg-primary rounded-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
        
        <motion.h3
          className="text-lg font-semibold text-foreground mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Experience
        </motion.h3>
        
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Preparing your learning journey...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
