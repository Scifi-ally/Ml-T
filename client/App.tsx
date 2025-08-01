import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { initKeyboardNavigation } from "./utils/keyboardNavigation";
import Index from "./pages/Index";
import MLCourse from "./pages/MLCourse";
import WebDev from "./pages/WebDev";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Lesson from "./pages/Lesson";
import ComprehensiveLesson from "./pages/ComprehensiveLesson";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -20,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/ml-course" element={<MLCourse />} />
          <Route path="/web-dev" element={<WebDev />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/ml-course/:moduleId/:lessonId" element={<Lesson />} />
          <Route
            path="/comprehensive-lesson/:moduleId/:lessonId"
            element={<ComprehensiveLesson />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize keyboard navigation detection
    const cleanup = initKeyboardNavigation();

    // Add smooth text rendering class to body
    document.body.classList.add("text-smooth");

    // Prevent default focus outline styles from showing on mouse click
    document.body.classList.add("no-tap-highlight");

    return cleanup;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
