import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  Zap,
  Award,
  RefreshCw,
  BookOpen,
} from "lucide-react";

interface LearningSession {
  date: Date;
  duration: number; // minutes
  conceptsLearned: string[];
  masteryScore: number;
  practiceProblems: number;
}

interface ConceptMastery {
  concept: string;
  masteryLevel: number; // 0-100
  lastReviewed: Date;
  nextReview: Date;
  reviewCount: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface LearningTrackerProps {
  sessions: LearningSession[];
  concepts: ConceptMastery[];
  currentStreak: number;
  totalStudyTime: number; // hours
}

const LearningTracker: React.FC<LearningTrackerProps> = ({
  sessions,
  concepts,
  currentStreak,
  totalStudyTime,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "all"
  >("week");

  // Calculate statistics
  const averageMastery =
    concepts.length > 0
      ? Math.round(
          concepts.reduce((sum, c) => sum + c.masteryLevel, 0) /
            concepts.length,
        )
      : 0;

  const conceptsToReview = concepts.filter(
    (c) => new Date() >= c.nextReview,
  ).length;
  const masteredConcepts = concepts.filter((c) => c.masteryLevel >= 80).length;

  const recentSessions = sessions.slice(-7); // Last 7 sessions
  const averageSessionTime =
    recentSessions.length > 0
      ? Math.round(
          recentSessions.reduce((sum, s) => sum + s.duration, 0) /
            recentSessions.length,
        )
      : 0;

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your learning journey today!";
    if (streak === 1) return "Great start! Keep it up!";
    if (streak < 7) return `${streak} days strong! Building momentum!`;
    if (streak < 30) return `${streak} days! You're developing a habit!`;
    return `${streak} days! You're a learning machine!`;
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return "text-green-600 bg-green-50";
    if (level >= 60) return "text-yellow-600 bg-yellow-50";
    if (level >= 40) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-6">
      {/* Personal Learning Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {averageMastery}%
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Average Mastery
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-black" />
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {masteredConcepts}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Concepts Mastered
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-500 font-medium">Day Streak</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-gray-200 text-center"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-black" />
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {totalStudyTime}h
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Total Practice
          </div>
        </motion.div>
      </div>

      {/* Learning Streak */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-black">Learning Momentum</h3>
              <p className="text-sm text-gray-500">
                {getStreakMessage(currentStreak)}
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active Learner
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Weekly Goal Progress</span>
            <span className="text-black font-medium">5/7 days</span>
          </div>
          <Progress value={(currentStreak % 7) * (100 / 7)} className="h-2" />
        </div>
      </motion.div>

      {/* Concepts Due for Review */}
      {conceptsToReview > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <RefreshCw className="w-5 h-5 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-900">
                Spaced Repetition Review
              </h3>
              <p className="text-sm text-yellow-700">
                {conceptsToReview} concept{conceptsToReview > 1 ? "s" : ""}{" "}
                ready for review
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {concepts
              .filter((c) => new Date() >= c.nextReview)
              .slice(0, 3)
              .map((concept, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-lg p-3"
                >
                  <span className="text-sm font-medium text-black">
                    {concept.concept}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`text-xs ${getMasteryColor(concept.masteryLevel)}`}
                    >
                      {concept.masteryLevel}%
                    </Badge>
                    <span className="text-xs text-gray-500">
                      Due{" "}
                      {Math.floor(
                        (new Date().getTime() - concept.nextReview.getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days ago
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Recent Learning Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-black">Recent Learning Sessions</h3>
        </div>

        <div className="space-y-3">
          {recentSessions.slice(0, 5).map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium text-black">
                  {session.conceptsLearned.length} concepts practiced
                </div>
                <div className="text-xs text-gray-500">
                  {session.date.toLocaleDateString()} • {session.duration}{" "}
                  minutes
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="text-xs bg-gray-100 text-gray-700">
                  {Math.round(session.masteryScore * 100)}% mastery
                </Badge>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          ))}

          {recentSessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start your first learning session!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LearningTracker;
