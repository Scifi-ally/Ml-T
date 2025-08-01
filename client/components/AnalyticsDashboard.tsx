import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Calendar,
  Brain,
  Zap,
  Award,
  Activity,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
} from "lucide-react";

interface LearningSession {
  date: Date;
  duration: number; // minutes
  modulesStudied: string[];
  score: number;
  completed: boolean;
}

interface WeeklyProgress {
  week: string;
  totalTime: number;
  sessionsCompleted: number;
  averageScore: number;
  streak: number;
}

interface AnalyticsData {
  totalStudyTime: number; // minutes
  totalSessions: number;
  averageScore: number;
  currentStreak: number;
  longestStreak: number;
  totalModulesCompleted: number;
  learningVelocity: number; // lessons per week
  retentionRate: number; // percentage
  sessions: LearningSession[];
  weeklyProgress: WeeklyProgress[];
  studyPattern: { hour: number; minutes: number }[];
  topModules: { name: string; timeSpent: number; score: number }[];
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  className = "",
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");
  const [selectedMetric, setSelectedMetric] = useState<
    "time" | "score" | "sessions"
  >("time");
  const [showDetailed, setShowDetailed] = useState(false);

  // Mock data for demonstration
  const mockData: AnalyticsData = {
    totalStudyTime: 2450, // ~40 hours
    totalSessions: 147,
    averageScore: 87.5,
    currentStreak: 12,
    longestStreak: 28,
    totalModulesCompleted: 8,
    learningVelocity: 4.2,
    retentionRate: 91.3,
    sessions: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      duration: Math.floor(Math.random() * 120) + 30,
      modulesStudied: ["Math", "Python", "ML Fundamentals"][
        Math.floor(Math.random() * 3)
      ],
      score: Math.floor(Math.random() * 30) + 70,
      completed: Math.random() > 0.2,
    })),
    weeklyProgress: Array.from({ length: 12 }, (_, i) => ({
      week: `Week ${i + 1}`,
      totalTime: Math.floor(Math.random() * 400) + 200,
      sessionsCompleted: Math.floor(Math.random() * 15) + 5,
      averageScore: Math.floor(Math.random() * 20) + 75,
      streak: Math.floor(Math.random() * 7) + 1,
    })),
    studyPattern: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      minutes:
        Math.floor(Math.random() * 60) + (hour >= 18 && hour <= 22 ? 30 : 0),
    })),
    topModules: [
      { name: "Python for Data Science", timeSpent: 680, score: 92 },
      { name: "Machine Learning Fundamentals", timeSpent: 520, score: 89 },
      { name: "Mathematics Foundation", timeSpent: 450, score: 85 },
      { name: "Advanced ML Techniques", timeSpent: 320, score: 88 },
    ],
  };

  const analytics = data.totalStudyTime > 0 ? data : mockData;

  const chartData = useMemo(() => {
    const timeframeData = analytics.weeklyProgress.slice(
      selectedTimeframe === "week"
        ? -1
        : selectedTimeframe === "month"
          ? -4
          : selectedTimeframe === "quarter"
            ? -12
            : -52,
    );

    return timeframeData.map((week) => ({
      ...week,
      value:
        selectedMetric === "time"
          ? week.totalTime
          : selectedMetric === "score"
            ? week.averageScore
            : week.sessionsCompleted,
    }));
  }, [analytics.weeklyProgress, selectedTimeframe, selectedMetric]);

  const getMetricColor = (value: number, type: string) => {
    if (type === "score") {
      return value >= 90
        ? "text-green-600"
        : value >= 75
          ? "text-yellow-600"
          : "text-red-600";
    }
    return "text-black";
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPerformanceTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isSignificant: Math.abs(change) > 5,
    };
  };

  const exportData = () => {
    const exportObj = {
      generatedAt: new Date().toISOString(),
      timeframe: selectedTimeframe,
      analytics: analytics,
      insights: getInsights(),
    };

    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `learning-analytics-${selectedTimeframe}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getInsights = () => {
    const insights = [];

    if (analytics.currentStreak >= 7) {
      insights.push({
        type: "positive",
        text: `Great job! You're on a ${analytics.currentStreak}-day streak!`,
      });
    }

    if (analytics.averageScore >= 90) {
      insights.push({
        type: "positive",
        text: "Excellent performance! Your average score is outstanding.",
      });
    } else if (analytics.averageScore < 75) {
      insights.push({
        type: "warning",
        text: "Consider reviewing previous lessons to improve your scores.",
      });
    }

    const avgSessionTime = analytics.totalStudyTime / analytics.totalSessions;
    if (avgSessionTime < 20) {
      insights.push({
        type: "suggestion",
        text: "Try longer study sessions for better retention.",
      });
    }

    if (analytics.learningVelocity > 5) {
      insights.push({
        type: "positive",
        text: "You're learning at an impressive pace!",
      });
    }

    return insights;
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-smooth ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">
              Learning Analytics
            </h3>
            <p className="text-xs text-gray-500">Your progress insights</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowDetailed(!showDetailed)}
            variant="outline"
            size="sm"
            className="p-2"
            title={showDetailed ? "Hide details" : "Show details"}
          >
            {showDetailed ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={exportData}
            variant="outline"
            size="sm"
            className="p-2"
            title="Export analytics"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-black">Study Time</span>
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {formatTime(analytics.totalStudyTime)}
          </div>
          <div className="text-xs text-gray-500">
            Avg:{" "}
            {formatTime(
              Math.floor(analytics.totalStudyTime / analytics.totalSessions),
            )}{" "}
            per session
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-black">Avg Score</span>
          </div>
          <div
            className={`text-2xl font-bold mb-1 ${getMetricColor(analytics.averageScore, "score")}`}
          >
            {analytics.averageScore.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">
            Retention: {analytics.retentionRate}%
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-black">
              Current Streak
            </span>
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {analytics.currentStreak}
          </div>
          <div className="text-xs text-gray-500">
            Best: {analytics.longestStreak} days
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-black">Velocity</span>
          </div>
          <div className="text-2xl font-bold text-black mb-1">
            {analytics.learningVelocity.toFixed(1)}
          </div>
          <div className="text-xs text-gray-500">lessons/week</div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Timeframe:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(["week", "month", "quarter", "year"] as const).map(
              (timeframe) => (
                <Button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  variant={
                    selectedTimeframe === timeframe ? "default" : "ghost"
                  }
                  size="sm"
                  className={`rounded-none border-0 ${
                    selectedTimeframe === timeframe
                      ? "bg-black text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </Button>
              ),
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-black">Metric:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(
              [
                { key: "time", label: "Time", icon: Clock },
                { key: "score", label: "Score", icon: Target },
                { key: "sessions", label: "Sessions", icon: Activity },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                onClick={() => setSelectedMetric(key)}
                variant={selectedMetric === key ? "default" : "ghost"}
                size="sm"
                className={`rounded-none border-0 ${
                  selectedMetric === key
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Simple Chart */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-black mb-4">
            {selectedMetric === "time"
              ? "Study Time"
              : selectedMetric === "score"
                ? "Average Score"
                : "Sessions Completed"}{" "}
            Trend
          </h4>
          <div className="flex items-end space-x-2 h-32">
            {chartData.map((item, index) => {
              const maxValue = Math.max(...chartData.map((d) => d.value));
              const height = (item.value / maxValue) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-black rounded-t transition-all duration-500 hover:bg-gray-700"
                    style={{ height: `${height}%` }}
                    title={`${item.week}: ${
                      selectedMetric === "time"
                        ? formatTime(item.value)
                        : selectedMetric === "score"
                          ? `${item.value}%`
                          : `${item.value} sessions`
                    }`}
                  />
                  <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                    {item.week.replace("Week ", "W")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Study Pattern Heatmap */}
      {showDetailed && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-black mb-4">
            Daily Study Pattern
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-12 gap-1">
              {analytics.studyPattern.map((item, index) => {
                const intensity = Math.min(item.minutes / 60, 1);
                const opacity = Math.max(intensity, 0.1);

                return (
                  <div
                    key={index}
                    className="aspect-square rounded border border-gray-200 transition-all hover:scale-110"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                      minHeight: "20px",
                    }}
                    title={`${item.hour}:00 - ${formatTime(item.minutes)}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Performing Modules */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-black mb-4">
          Top Performing Modules
        </h4>
        <div className="space-y-3">
          {analytics.topModules
            .slice(0, showDetailed ? 6 : 3)
            .map((module, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black">
                      {module.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(module.timeSpent)} studied
                    </div>
                  </div>
                </div>
                <Badge
                  className={`${getMetricColor(module.score, "score")} bg-transparent border-current`}
                >
                  {module.score}%
                </Badge>
              </div>
            ))}
        </div>
      </div>

      {/* Insights */}
      <div>
        <h4 className="text-sm font-semibold text-black mb-4">AI Insights</h4>
        <div className="space-y-2">
          {getInsights().map((insight, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                insight.type === "positive"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : insight.type === "warning"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              <div className="flex items-start space-x-2">
                {insight.type === "positive" ? (
                  <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : insight.type === "warning" ? (
                  <TrendingDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                ) : (
                  <Brain className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <span className="text-sm">{insight.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
