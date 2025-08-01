import React, { useState } from "react";
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
} from "lucide-react";
import { ModuleData } from "@/lib/dataService";

interface ModernCardProps {
  module: ModuleData;
  index: number;
  onStartModule: (moduleId: number) => void;
}

const ModernCard: React.FC<ModernCardProps> = ({
  module,
  index,
  onStartModule,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200";
    if (progress < 30) return "bg-gray-400";
    if (progress < 70) return "bg-gray-600";
    return "bg-black";
  };

  const progressPercentage =
    (module.userProgress.lessonsCompleted / module.lessons.length) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden card-interactive transition-smooth">
      {/* Header */}
      <div
        className={`${getDifficultyColor(module.difficulty)} border-b border-gray-200`}
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className="bg-black text-white text-xs font-medium px-2 py-1 transition-smooth"
            >
              Module {module.id}
            </Badge>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-black rounded-full pulse-active" />
              <span className="text-xs font-semibold text-black">
                {module.userProgress.averageScore || 0}%
              </span>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold leading-tight text-black mb-2">
            {module.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Progress Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-black">Progress</span>
            <span className="text-xs text-gray-500">
              {module.userProgress.lessonsCompleted}/{module.lessons.length}{" "}
              lessons
            </span>
          </div>

          <div className="relative bg-gray-200 rounded-full h-2 progress-bar">
            <div
              className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor(progressPercentage)} progress-fill`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{progressPercentage.toFixed(0)}% complete</span>
            <span>{module.estimatedHours}h total</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{module.lessons.length} lessons</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>{module.estimatedHours}h</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-2" />
            <span>{module.projects} projects</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6 flex justify-center">
          <Button
            onClick={() => onStartModule(module.id)}
            className="bg-black text-white font-medium py-3 px-8 rounded-lg text-sm transition-smooth interactive-element btn-press"
          >
            <Play className="w-4 h-4 mr-2" />
            {progressPercentage > 0 ? "Continue Learning" : "Start Learning"}
          </Button>
        </div>

        {/* Expand Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center text-xs text-gray-400 py-2 transition-smooth interactive-element hover:text-gray-600"
        >
          <span className="mr-2">{isExpanded ? "Show Less" : "Show More"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expandable Details */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-6 space-y-6 mt-4 fade-in">
            {/* Prerequisites */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-3">
                Prerequisites
              </h4>
              <div className="flex flex-wrap gap-2">
                {module.prerequisites.map((prereq, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-gray-200 bg-gray-50 text-gray-700 px-2 py-1 transition-smooth hover:bg-gray-100"
                  >
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Learning Topics */}
            <div>
              <h4 className="text-sm font-semibold text-black mb-3">
                Learning Topics
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {module.learningPath.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                        index < module.userProgress.lessonsCompleted
                          ? "bg-black"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 rounded-lg p-4 transition-smooth hover:bg-gray-100">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernCard;
