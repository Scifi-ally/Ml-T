import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Star,
  Target,
  Zap,
  Fire,
  Award,
  Crown,
  Rocket,
  Brain,
  Clock,
  BookOpen,
  Code,
  TrendingUp,
  Calendar,
  Lock,
  CheckCircle,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "learning" | "consistency" | "mastery" | "social" | "milestone";
  rarity: "common" | "rare" | "epic" | "legendary";
  condition: (stats: UserStats) => boolean;
  progress?: (stats: UserStats) => number; // Progress percentage
  maxProgress?: number;
  unlockedAt?: Date;
  points: number;
}

interface UserStats {
  lessonsCompleted: number;
  totalStudyTime: number; // in minutes
  consecutiveDays: number;
  perfectScores: number;
  projectsCompleted: number;
  codingChallengesSolved: number;
  currentStreak: number;
  totalSessions: number;
  averageScore: number;
  timeSpentToday: number;
  loginStreak: number;
}

interface AchievementSystemProps {
  userStats: UserStats;
  onAchievementUnlocked?: (achievement: Achievement) => void;
  className?: string;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({
  userStats,
  onAchievementUnlocked,
  className = "",
}) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    Achievement[]
  >([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);
  const [showAll, setShowAll] = useState(false);

  const achievements: Achievement[] = [
    // Learning Achievements
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: <BookOpen className="w-5 h-5" />,
      category: "learning",
      rarity: "common",
      condition: (stats) => stats.lessonsCompleted >= 1,
      points: 10,
    },
    {
      id: "lesson-streak-5",
      title: "Getting Momentum",
      description: "Complete 5 lessons",
      icon: <Target className="w-5 h-5" />,
      category: "learning",
      rarity: "common",
      condition: (stats) => stats.lessonsCompleted >= 5,
      progress: (stats) => Math.min((stats.lessonsCompleted / 5) * 100, 100),
      maxProgress: 5,
      points: 25,
    },
    {
      id: "lesson-master",
      title: "Knowledge Seeker",
      description: "Complete 25 lessons",
      icon: <Brain className="w-5 h-5" />,
      category: "learning",
      rarity: "rare",
      condition: (stats) => stats.lessonsCompleted >= 25,
      progress: (stats) => Math.min((stats.lessonsCompleted / 25) * 100, 100),
      maxProgress: 25,
      points: 100,
    },
    {
      id: "lesson-legend",
      title: "Learning Legend",
      description: "Complete 100 lessons",
      icon: <Crown className="w-5 h-5" />,
      category: "learning",
      rarity: "legendary",
      condition: (stats) => stats.lessonsCompleted >= 100,
      progress: (stats) => Math.min((stats.lessonsCompleted / 100) * 100, 100),
      maxProgress: 100,
      points: 500,
    },

    // Consistency Achievements
    {
      id: "daily-learner",
      title: "Daily Learner",
      description: "Study for 3 consecutive days",
      icon: <Calendar className="w-5 h-5" />,
      category: "consistency",
      rarity: "common",
      condition: (stats) => stats.consecutiveDays >= 3,
      progress: (stats) => Math.min((stats.consecutiveDays / 3) * 100, 100),
      maxProgress: 3,
      points: 30,
    },
    {
      id: "week-warrior",
      title: "Week Warrior",
      description: "Study for 7 consecutive days",
      icon: <Fire className="w-5 h-5" />,
      category: "consistency",
      rarity: "rare",
      condition: (stats) => stats.consecutiveDays >= 7,
      progress: (stats) => Math.min((stats.consecutiveDays / 7) * 100, 100),
      maxProgress: 7,
      points: 75,
    },
    {
      id: "month-master",
      title: "Month Master",
      description: "Study for 30 consecutive days",
      icon: <Trophy className="w-5 h-5" />,
      category: "consistency",
      rarity: "epic",
      condition: (stats) => stats.consecutiveDays >= 30,
      progress: (stats) => Math.min((stats.consecutiveDays / 30) * 100, 100),
      maxProgress: 30,
      points: 300,
    },

    // Mastery Achievements
    {
      id: "perfect-score",
      title: "Perfectionist",
      description: "Score 100% on a lesson",
      icon: <Star className="w-5 h-5" />,
      category: "mastery",
      rarity: "common",
      condition: (stats) => stats.perfectScores >= 1,
      points: 50,
    },
    {
      id: "coding-ninja",
      title: "Coding Ninja",
      description: "Solve 10 coding challenges",
      icon: <Code className="w-5 h-5" />,
      category: "mastery",
      rarity: "rare",
      condition: (stats) => stats.codingChallengesSolved >= 10,
      progress: (stats) =>
        Math.min((stats.codingChallengesSolved / 10) * 100, 100),
      maxProgress: 10,
      points: 150,
    },
    {
      id: "high-achiever",
      title: "High Achiever",
      description: "Maintain 90%+ average score",
      icon: <TrendingUp className="w-5 h-5" />,
      category: "mastery",
      rarity: "epic",
      condition: (stats) => stats.averageScore >= 90,
      points: 200,
    },

    // Time-based Achievements
    {
      id: "study-session",
      title: "Focused Mind",
      description: "Study for 1 hour total",
      icon: <Clock className="w-5 h-5" />,
      category: "milestone",
      rarity: "common",
      condition: (stats) => stats.totalStudyTime >= 60,
      progress: (stats) => Math.min((stats.totalStudyTime / 60) * 100, 100),
      maxProgress: 60,
      points: 25,
    },
    {
      id: "study-marathon",
      title: "Study Marathon",
      description: "Study for 10 hours total",
      icon: <Rocket className="w-5 h-5" />,
      category: "milestone",
      rarity: "rare",
      condition: (stats) => stats.totalStudyTime >= 600,
      progress: (stats) => Math.min((stats.totalStudyTime / 600) * 100, 100),
      maxProgress: 600,
      points: 100,
    },
    {
      id: "dedication",
      title: "Dedication",
      description: "Study for 50 hours total",
      icon: <Award className="w-5 h-5" />,
      category: "milestone",
      rarity: "epic",
      condition: (stats) => stats.totalStudyTime >= 3000,
      progress: (stats) => Math.min((stats.totalStudyTime / 3000) * 100, 100),
      maxProgress: 3000,
      points: 500,
    },

    // Session Achievements
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Study before 8 AM",
      icon: <Zap className="w-5 h-5" />,
      category: "social",
      rarity: "common",
      condition: (stats) =>
        new Date().getHours() < 8 && stats.timeSpentToday > 0,
      points: 15,
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Study after 10 PM",
      icon: <Fire className="w-5 h-5" />,
      category: "social",
      rarity: "common",
      condition: (stats) =>
        new Date().getHours() >= 22 && stats.timeSpentToday > 0,
      points: 15,
    },
  ];

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: Achievement["category"]) => {
    switch (category) {
      case "learning":
        return <BookOpen className="w-3 h-3" />;
      case "consistency":
        return <Calendar className="w-3 h-3" />;
      case "mastery":
        return <Trophy className="w-3 h-3" />;
      case "social":
        return <Star className="w-3 h-3" />;
      case "milestone":
        return <Target className="w-3 h-3" />;
      default:
        return <Award className="w-3 h-3" />;
    }
  };

  const totalPoints = unlockedAchievements.reduce(
    (sum, achievement) => sum + achievement.points,
    0,
  );

  useEffect(() => {
    // Check for newly unlocked achievements
    const previouslyUnlocked = new Set(unlockedAchievements.map((a) => a.id));
    const nowUnlocked = achievements.filter(
      (achievement) =>
        achievement.condition(userStats) &&
        !previouslyUnlocked.has(achievement.id),
    );

    if (nowUnlocked.length > 0) {
      const updatedUnlocked = [...unlockedAchievements, ...nowUnlocked];
      setUnlockedAchievements(updatedUnlocked);
      setNewlyUnlocked(nowUnlocked);

      // Clear newly unlocked after 5 seconds
      setTimeout(() => setNewlyUnlocked([]), 5000);

      // Trigger callbacks
      nowUnlocked.forEach((achievement) => {
        onAchievementUnlocked?.(achievement);
      });
    }
  }, [userStats, achievements, unlockedAchievements, onAchievementUnlocked]);

  const displayedAchievements = showAll
    ? achievements
    : achievements.slice(0, 6);
  const lockedAchievements = achievements.filter(
    (a) => !unlockedAchievements.some((u) => u.id === a.id),
  );

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-smooth ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Achievements</h3>
            <p className="text-xs text-gray-500">
              {unlockedAchievements.length}/{achievements.length} unlocked •{" "}
              {totalPoints} points
            </p>
          </div>
        </div>

        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200"
        >
          Level {Math.floor(totalPoints / 100) + 1}
        </Badge>
      </div>

      {/* Newly Unlocked Notifications */}
      {newlyUnlocked.length > 0 && (
        <div className="mb-6 space-y-2">
          {newlyUnlocked.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-green-50 border border-green-200 rounded-lg p-3 success-ping"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-green-800">
                    Achievement Unlocked!
                  </div>
                  <div className="text-xs text-green-600">
                    {achievement.title} • +{achievement.points} points
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {displayedAchievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.some(
            (u) => u.id === achievement.id,
          );
          const progress = achievement.progress?.(userStats) || 0;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-smooth ${
                isUnlocked
                  ? getRarityColor(achievement.rarity) + " card-interactive"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isUnlocked
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {isUnlocked ? achievement.icon : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4
                      className={`text-sm font-semibold ${isUnlocked ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {achievement.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {getCategoryIcon(achievement.category)}
                    </Badge>
                  </div>
                  <p
                    className={`text-xs ${isUnlocked ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>

              {!isUnlocked &&
                achievement.progress &&
                achievement.maxProgress && (
                  <div className="space-y-2">
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gray-400 h-1.5 rounded-full progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {Math.floor((progress / 100) * achievement.maxProgress)}
                        /{achievement.maxProgress}
                      </span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                  </div>
                )}

              {isUnlocked && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200/50">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3" />
                    <span>Unlocked</span>
                  </div>
                  <span className="text-xs font-semibold text-green-600">
                    +{achievement.points} pts
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {achievements.length > 6 && (
        <div className="text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="font-medium py-2 px-6 rounded-lg transition-smooth interactive-element"
          >
            {showAll ? "Show Less" : `Show ${achievements.length - 6} More`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AchievementSystem;
