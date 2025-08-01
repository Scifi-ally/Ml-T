import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Coffee,
  Target,
  TrendingUp,
  Brain,
  Zap,
} from "lucide-react";

interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  type: "study" | "break";
  completed: boolean;
}

interface StudyTimerProps {
  onSessionComplete?: (session: StudySession) => void;
  className?: string;
}

const StudyTimer: React.FC<StudyTimerProps> = ({
  onSessionComplete,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<"study" | "break">("study");
  const [sessionCount, setSessionCount] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(
    null,
  );

  const STUDY_TIME = 25 * 60; // 25 minutes
  const SHORT_BREAK = 5 * 60; // 5 minutes
  const LONG_BREAK = 15 * 60; // 15 minutes

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    const total =
      sessionType === "study"
        ? STUDY_TIME
        : sessionCount > 0 && sessionCount % 4 === 0
          ? LONG_BREAK
          : SHORT_BREAK;
    return ((total - timeLeft) / total) * 100;
  };

  const startSession = useCallback(() => {
    const session: StudySession = {
      id: Date.now().toString(),
      startTime: new Date(),
      duration:
        sessionType === "study"
          ? STUDY_TIME
          : sessionCount > 0 && sessionCount % 4 === 0
            ? LONG_BREAK
            : SHORT_BREAK,
      type: sessionType,
      completed: false,
    };
    setCurrentSession(session);
    setIsActive(true);
  }, [sessionType, sessionCount]);

  const pauseSession = () => {
    setIsActive(false);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(
      sessionType === "study"
        ? STUDY_TIME
        : sessionCount > 0 && sessionCount % 4 === 0
          ? LONG_BREAK
          : SHORT_BREAK,
    );
    setCurrentSession(null);
  };

  const completeSession = useCallback(() => {
    if (currentSession) {
      const completedSession: StudySession = {
        ...currentSession,
        endTime: new Date(),
        completed: true,
      };

      onSessionComplete?.(completedSession);

      if (sessionType === "study") {
        setSessionCount((prev) => prev + 1);
        setTotalStudyTime((prev) => prev + STUDY_TIME);
        // Switch to break
        setSessionType("break");
        setTimeLeft(
          sessionCount > 0 && (sessionCount + 1) % 4 === 0
            ? LONG_BREAK
            : SHORT_BREAK,
        );
      } else {
        // Switch back to study
        setSessionType("study");
        setTimeLeft(STUDY_TIME);
      }

      setIsActive(false);
      setCurrentSession(null);

      // Play completion sound (if audio is enabled)
      try {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaBkOY1/Gq+8B8NQ==",
        );
        audio.play().catch(() => {});
      } catch (e) {}
    }
  }, [currentSession, sessionType, sessionCount, onSessionComplete]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft <= 1) {
            completeSession();
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, completeSession]);

  const getSessionTypeIcon = () => {
    if (sessionType === "study") return <Brain className="w-4 h-4" />;
    return sessionCount > 0 && sessionCount % 4 === 0 ? (
      <Coffee className="w-4 h-4" />
    ) : (
      <Zap className="w-4 h-4" />
    );
  };

  const getSessionTypeLabel = () => {
    if (sessionType === "study") return "Focus Session";
    return sessionCount > 0 && sessionCount % 4 === 0
      ? "Long Break"
      : "Short Break";
  };

  const getMotivationalMessage = () => {
    if (sessionType === "study") {
      if (timeLeft > STUDY_TIME * 0.75)
        return "Getting started! You've got this! 🚀";
      if (timeLeft > STUDY_TIME * 0.5) return "Great momentum! Keep going! 💪";
      if (timeLeft > STUDY_TIME * 0.25)
        return "You're in the zone! Almost there! 🔥";
      return "Final push! Stay focused! ⚡";
    } else {
      return "Recharge time! Take a deep breath! 🌱";
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-smooth ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Study Timer</h3>
            <p className="text-xs text-gray-500">Pomodoro Technique</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center space-x-1">
            {getSessionTypeIcon()}
            <span className="text-xs">{getSessionTypeLabel()}</span>
          </Badge>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="relative mb-4">
          <svg className="w-32 h-32 mx-auto transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="#000"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={351.86}
              strokeDashoffset={
                351.86 - (351.86 * getProgressPercentage()) / 100
              }
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-gray-500">remaining</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">{getMotivationalMessage()}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-3 mb-6">
        {!isActive ? (
          <Button
            onClick={startSession}
            className="bg-black text-white font-medium py-2 px-6 rounded-lg transition-smooth interactive-element"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        ) : (
          <Button
            onClick={pauseSession}
            variant="outline"
            className="font-medium py-2 px-6 rounded-lg transition-smooth interactive-element"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}

        <Button
          onClick={resetSession}
          variant="outline"
          className="font-medium py-2 px-4 rounded-lg transition-smooth interactive-element"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-lg font-bold text-black">{sessionCount}</div>
          <div className="text-xs text-gray-500">Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-black">
            {Math.floor(totalStudyTime / 3600)}
          </div>
          <div className="text-xs text-gray-500">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-black">
            {sessionCount > 0 ? Math.floor((sessionCount / 4) * 100) : 0}%
          </div>
          <div className="text-xs text-gray-500">Focus Rate</div>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
