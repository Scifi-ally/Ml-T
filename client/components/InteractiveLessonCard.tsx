import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  Code,
  Brain,
  Target,
  ArrowRight,
  Lightbulb,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CodePlayground from "./CodePlayground";

interface LessonStep {
  id: string;
  type: "theory" | "example" | "practice" | "quiz";
  title: string;
  content: string;
  codeExample?: {
    id: string;
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
    concept: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    hints: string[];
  };
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

interface InteractiveLessonData {
  id: string;
  title: string;
  concept: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  learningObjectives: string[];
  prerequisiteCheck: string[];
  steps: LessonStep[];
  spacedRepetition: {
    nextReview: Date;
    interval: number; // days
    easiness: number;
  };
}

interface InteractiveLessonCardProps {
  lesson: InteractiveLessonData;
  onComplete?: (lessonId: string, masteryLevel: number) => void;
}

const InteractiveLessonCard: React.FC<InteractiveLessonCardProps> = ({
  lesson,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [masteryScore, setMasteryScore] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const progressPercentage =
    (completedSteps.length / lesson.steps.length) * 100;
  const currentStepData = lesson.steps[currentStep];
  const isStepCompleted = completedSteps.includes(currentStep);

  useEffect(() => {
    if (!startTime) {
      setStartTime(new Date());
    }
  }, []);

  const markStepComplete = (stepIndex: number, score: number = 1) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      setMasteryScore((prev) => prev + score);
    }
  };

  const nextStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    } else if (completedSteps.length === lesson.steps.length) {
      // Lesson completed
      const finalScore = masteryScore / lesson.steps.length;
      onComplete?.(lesson.id, finalScore);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowQuizResult(false);
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowQuizResult(true);

    if (currentStepData.quiz) {
      const isCorrect = optionIndex === currentStepData.quiz.correct;
      markStepComplete(currentStep, isCorrect ? 1 : 0.5);
    }
  };

  const handleCodeComplete = (success: boolean) => {
    markStepComplete(currentStep, success ? 1 : 0.7);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "theory":
        return <BookOpen className="w-4 h-4" />;
      case "example":
        return <Lightbulb className="w-4 h-4" />;
      case "practice":
        return <Code className="w-4 h-4" />;
      case "quiz":
        return <Brain className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-black">{lesson.title}</h3>
              <p className="text-sm text-gray-500">{lesson.concept}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}
            >
              {lesson.difficulty}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {lesson.estimatedMinutes}m
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="text-black font-medium">
              {completedSteps.length}/{lesson.steps.length} steps
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-black">
            Learning Objectives
          </span>
        </div>
        <ul className="space-y-1">
          {lesson.learningObjectives.map((objective, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-3 h-3 mr-2 text-gray-400" />
              {objective}
            </li>
          ))}
        </ul>
      </div>

      {/* Current Step */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              {getStepIcon(currentStepData.type)}
            </div>
            <div>
              <h4 className="font-medium text-black">
                {currentStepData.title}
              </h4>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {currentStepData.type}
              </span>
            </div>
          </div>
          {isStepCompleted && (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
        </div>

        {/* Step Content */}
        <div className="space-y-4">
          {/* Theory/Example Content */}
          {(currentStepData.type === "theory" ||
            currentStepData.type === "example") && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {currentStepData.content}
              </p>
              {!isStepCompleted && (
                <Button
                  onClick={() => markStepComplete(currentStep)}
                  className="mt-4 bg-black hover:bg-gray-800 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Understood
                </Button>
              )}
            </div>
          )}

          {/* Practice Code */}
          {currentStepData.type === "practice" &&
            currentStepData.codeExample && (
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {currentStepData.content}
                </p>
                <CodePlayground
                  example={currentStepData.codeExample}
                  onComplete={handleCodeComplete}
                />
              </div>
            )}

          {/* Quiz */}
          {currentStepData.type === "quiz" && currentStepData.quiz && (
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed font-medium">
                {currentStepData.quiz.question}
              </p>
              <div className="space-y-2">
                {currentStepData.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={showQuizResult}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedAnswer === index
                        ? showQuizResult
                          ? index === currentStepData.quiz!.correct
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-red-500 bg-red-50 text-red-800"
                          : "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm">{option}</span>
                  </button>
                ))}
              </div>

              {showQuizResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                >
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong>{" "}
                    {currentStepData.quiz.explanation}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={previousStep}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            Previous
          </Button>

          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {lesson.steps.length}
          </span>

          <Button
            onClick={nextStep}
            disabled={!isStepCompleted && currentStepData.type !== "theory"}
            className="bg-black hover:bg-gray-800 text-white flex items-center"
          >
            {currentStep === lesson.steps.length - 1
              ? "Complete Lesson"
              : "Next Step"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Step Overview (Expandable) */}
      <div className="border-t border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-black">Step Overview</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200"
            >
              <div className="p-4 bg-gray-50 space-y-2">
                {lesson.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      index === currentStep
                        ? "bg-black text-white"
                        : completedSteps.includes(index)
                          ? "bg-green-100 text-green-800"
                          : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className="flex items-center space-x-2">
                      {getStepIcon(step.type)}
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                    {completedSteps.includes(index) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InteractiveLessonCard;
