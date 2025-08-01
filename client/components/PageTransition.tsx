import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);
  const [currentContent, setCurrentContent] = useState(children);

  useEffect(() => {
    if (currentContent !== children) {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentContent(children);
        setIsExiting(false);
      }, 300);
    }
  }, [children, currentContent]);

  return (
    <div 
      className={`transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0 page-enter'
      }`}
    >
      {currentContent}
    </div>
  );
};

export default PageTransition;
