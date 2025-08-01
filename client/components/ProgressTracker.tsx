import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Upload,
  Save,
  RotateCcw,
  Trophy,
  Clock,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Star,
  Target,
  Zap,
} from "lucide-react";
import ProgressManager, { LearningProgress } from "@/utils/saveProgress";

interface ProgressTrackerProps {
  className?: string;
  showDetails?: boolean;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  className = "",
  showDetails = true,
}) => {
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  useEffect(() => {
    loadProgress();

    // Enable auto-save and cross-tab sync
    const stopAutoSave = ProgressManager.enableAutoSave(2);
    const stopSync = ProgressManager.enableCrossTabSync();

    // Listen for progress updates
    const handleProgressUpdate = (e: CustomEvent) => {
      setProgress(e.detail);
      setSummary(ProgressManager.getProgressSummary());
      setLastSaved(new Date());
    };

    window.addEventListener(
      "progressUpdated",
      handleProgressUpdate as EventListener,
    );

    return () => {
      stopAutoSave();
      stopSync();
      window.removeEventListener(
        "progressUpdated",
        handleProgressUpdate as EventListener,
      );
    };
  }, []);

  const loadProgress = () => {
    setIsLoading(true);
    setTimeout(() => {
      const currentProgress = ProgressManager.loadProgress();
      const currentSummary = ProgressManager.getProgressSummary();

      setProgress(currentProgress);
      setSummary(currentSummary);
      setLastSaved(new Date(currentProgress.timestamp));
      setIsLoading(false);
    }, 500);
  };

  const handleSave = () => {
    if (progress) {
      ProgressManager.saveProgress(progress);
      setShowSaveAnimation(true);
      setLastSaved(new Date());

      setTimeout(() => setShowSaveAnimation(false), 2000);
    }
  };

  const handleExport = () => {
    ProgressManager.exportProgress();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (ProgressManager.importProgress(content)) {
            loadProgress();
          } else {
            alert("Failed to import progress. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone.",
      )
    ) {
      ProgressManager.clearProgress();
      loadProgress();
    }
  };

  if (isLoading) {
    return (
      <div
        className={`bg-white border border-gray-200 rounded-xl p-6 ${className}`}
      >
        <div className="flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span className="ml-3 text-sm text-gray-600">
            Loading progress...
          </span>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Save animation overlay */}
      <AnimatePresence>
        {showSaveAnimation && (
          <motion.div
            className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Progress Saved!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-black rounded-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0, 0, 0, 0.1)",
                  "0 0 0 8px rgba(0, 0, 0, 0.05)",
                  "0 0 0 0 rgba(0, 0, 0, 0.1)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Trophy className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-black">Learning Progress</h3>
              <p className="text-xs text-gray-500">
                Last saved:{" "}
                {lastSaved ? lastSaved.toLocaleTimeString() : "Never"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSave}
                size="sm"
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: BookOpen,
              label: "Lessons",
              value: `${summary.completedLessons}/${summary.totalLessons}`,
              color: "text-blue-500",
              bgColor: "bg-blue-50",
            },
            {
              icon: Target,
              label: "Completion",
              value: `${summary.completionRate}%`,
              color: "text-emerald-500",
              bgColor: "bg-emerald-50",
            },
            {
              icon: Clock,
              label: "Time Spent",
              value: summary.timeSpent,
              color: "text-amber-500",
              bgColor: "bg-amber-50",
            },
            {
              icon: Star,
              label: "Last Active",
              value: summary.lastActive,
              color: "text-purple-500",
              bgColor: "bg-purple-50",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`${stat.bgColor} rounded-lg p-4 text-center relative overflow-hidden group cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                className={`w-8 h-8 ${stat.color} mx-auto mb-2 relative z-10`}
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-full h-full" />
              </motion.div>

              <motion.div
                className="text-lg font-bold text-black relative z-10"
                key={stat.value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value}
              </motion.div>

              <div className="text-xs text-gray-600 relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-black">
              Overall Progress
            </span>
            <Badge
              className={`${summary.completionRate > 50 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}
            >
              {summary.completionRate > 75
                ? "Excellent"
                : summary.completionRate > 50
                  ? "Good Progress"
                  : summary.completionRate > 25
                    ? "Getting Started"
                    : "Just Beginning"}
            </Badge>
          </div>

          <div className="relative">
            <Progress
              value={summary.completionRate}
              className="h-3 bg-gray-200"
            />

            {/* Animated progress indicator */}
            <motion.div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${summary.completionRate}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2,
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleExport}
              size="sm"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Download className="w-3 h-3 mr-2" />
              Export
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleImport}
              size="sm"
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Upload className="w-3 h-3 mr-2" />
              Import
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset
            </Button>
          </motion.div>
        </div>

        {/* Motivational Message */}
        <motion.div
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-900">
              {summary.completionRate < 25
                ? "Just getting started! 🚀"
                : summary.completionRate < 50
                  ? "Making great progress! 💪"
                  : summary.completionRate < 75
                    ? "You're doing amazing! ⭐"
                    : "Almost there, champion! 🏆"}
            </span>
          </div>
          <p className="text-xs text-blue-700">
            {summary.completionRate < 25
              ? "Every expert was once a beginner. Keep going!"
              : summary.completionRate < 50
                ? "Consistency is key to mastery. You're building something great!"
                : summary.completionRate < 75
                  ? "Your dedication is paying off. The finish line is in sight!"
                  : "You're almost at the finish line. Complete mastery awaits!"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
