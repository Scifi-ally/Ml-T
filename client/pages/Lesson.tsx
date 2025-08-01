import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Code,
  Brain,
  Target,
  CheckCircle,
  Clock,
  Play,
  RotateCcw,
  Lightbulb,
  AlertCircle,
  Award,
  Timer,
} from "lucide-react";
import InteractiveCodeEnvironment from "@/components/InteractiveCodeEnvironment";
import { dataService, LessonData, LessonStep } from "@/lib/dataService";

const Lesson = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuizFeedback, setShowQuizFeedback] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Load lesson data
    const loadLesson = () => {
      const modules = dataService.getModuleData();
      const module = modules.find((m) => m.id === parseInt(moduleId || "0"));
      const lessonData = module?.lessons.find((l) => l.id === lessonId);

      if (lessonData) {
        setLesson(lessonData);
      }
    };

    loadLesson();
  }, [moduleId, lessonId]);

  // Timer for tracking time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset quiz state when step changes
  useEffect(() => {
    if (lesson && lesson.interactiveSteps) {
      const currentStepData = lesson.interactiveSteps[currentStep];
      if (currentStepData?.type === "quiz") {
        // Only reset if not already answered
        if (!showQuizFeedback[currentStepData.id]) {
          setQuizAnswers((prev) => {
            const newState = { ...prev };
            delete newState[currentStepData.id];
            return newState;
          });
        }
      }
    }
  }, [currentStep, lesson]);

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps((prev) => new Set([...prev, stepIndex]));

    // Auto-navigate to next step after a short delay
    setTimeout(() => {
      if (lesson && stepIndex < lesson.interactiveSteps.length - 1) {
        setCurrentStep(stepIndex + 1);
      } else {
        // If this is the last step, navigate to next lesson or course
        navigateToNext();
      }
    }, 800);
  };

  const navigateToNext = () => {
    // Find next lesson in the same module
    const modules = dataService.getModuleData();
    const module = modules.find((m) => m.id === parseInt(moduleId || "0"));

    if (module && lesson) {
      const currentLessonIndex = module.lessons.findIndex(
        (l) => l.id === lessonId,
      );

      if (currentLessonIndex < module.lessons.length - 1) {
        // Navigate to next lesson in same module
        const nextLesson = module.lessons[currentLessonIndex + 1];
        navigate(`/ml-course/${moduleId}/${nextLesson.id}`);
      } else {
        // Navigate back to course overview
        navigate(`/ml-course`);
      }
    }
  };

  const handleQuizAnswer = (stepId: string, answerIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [stepId]: answerIndex,
    }));
  };

  const checkQuizAnswer = (stepId: string, correctAnswer: number) => {
    const userAnswer = quizAnswers[stepId];
    if (userAnswer !== undefined) {
      setShowQuizFeedback((prev) => ({
        ...prev,
        [stepId]: true,
      }));

      if (userAnswer === correctAnswer) {
        const stepIndex =
          lesson?.interactiveSteps?.findIndex((s) => s.id === stepId) || 0;
        handleStepComplete(stepIndex);
      }
    }
  };

  const getNextButtonText = (stepIndex: number) => {
    if (!lesson) return "Next";

    if (stepIndex < lesson.interactiveSteps.length - 1) {
      return "Next Step";
    } else {
      // Check if there's a next lesson
      const modules = dataService.getModuleData();
      const module = modules.find((m) => m.id === parseInt(moduleId || "0"));
      if (module) {
        const currentLessonIndex = module.lessons.findIndex(
          (l) => l.id === lessonId,
        );
        if (currentLessonIndex < module.lessons.length - 1) {
          return "Next Lesson";
        }
      }
      return "Complete";
    }
  };

  const nextStep = () => {
    if (lesson && currentStep < lesson.interactiveSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset quiz state for new step
      const nextStepData = lesson.interactiveSteps[currentStep + 1];
      if (nextStepData?.type === "quiz") {
        setQuizAnswers((prev) => {
          const newState = { ...prev };
          delete newState[nextStepData.id];
          return newState;
        });
        setShowQuizFeedback((prev) => {
          const newState = { ...prev };
          delete newState[nextStepData.id];
          return newState;
        });
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Reset quiz state for previous step if it's a quiz
      if (lesson) {
        const prevStepData = lesson.interactiveSteps[currentStep - 1];
        if (prevStepData?.type === "quiz") {
          setQuizAnswers((prev) => {
            const newState = { ...prev };
            delete newState[prevStepData.id];
            return newState;
          });
          setShowQuizFeedback((prev) => {
            const newState = { ...prev };
            delete newState[prevStepData.id];
            return newState;
          });
        }
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-black mb-2">
            Lesson Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested lesson could not be found.
          </p>
          <Link to="/ml-course">
            <Button className="bg-black text-white">Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = lesson.interactiveSteps
    ? (completedSteps.size / lesson.interactiveSteps.length) * 100
    : 0;
  const currentStepData = lesson.interactiveSteps?.[currentStep];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-50 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/ml-course"
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Course
              </Link>

              <div className="h-4 w-px bg-gray-300" />

              <div>
                <h1 className="text-lg font-semibold text-black">
                  {lesson.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.estimatedMinutes} min
                  </div>
                  <Badge
                    className={`text-xs border ${getDifficultyColor(lesson.difficulty)}`}
                  >
                    {lesson.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-500">Progress:</div>
              <div className="w-16">
                <Progress value={progressPercentage} className="h-1" />
              </div>
              <div className="text-xs font-medium text-black">
                {completedSteps.size}/{lesson.interactiveSteps?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex-1 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-4 h-full">
          {/* Main Content */}
          <div className="lg:col-span-10 space-y-4 overflow-y-auto h-full">
            {/* Lesson Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    Lesson Overview
                  </h2>
                  <p className="text-gray-600">
                    Foundation concepts and theory
                  </p>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {lesson.content}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((objective, index) => (
                    <li
                      key={index}
                      className="flex items-start text-blue-700 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Steps */}
            {lesson.interactiveSteps && lesson.interactiveSteps.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mr-3">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">
                          Interactive Learning
                        </h3>
                        <p className="text-sm text-gray-600">
                          Step {currentStep + 1} of{" "}
                          {lesson.interactiveSteps.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={previousStep}
                        disabled={currentStep === 0}
                        variant="outline"
                        size="sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={
                          currentStep === lesson.interactiveSteps.length - 1
                        }
                        variant="outline"
                        size="sm"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {currentStepData && (
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-black mb-2">
                        {currentStepData.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {currentStepData.type}
                      </Badge>
                    </div>

                    {/* Theory Step */}
                    {currentStepData.type === "theory" && (
                      <div className="space-y-4">
                        <div className="prose prose-gray max-w-none">
                          <p className="text-gray-700 leading-relaxed">
                            {currentStepData.content}
                          </p>
                        </div>
                        {!completedSteps.has(currentStep) ? (
                          <Button
                            onClick={() => handleStepComplete(currentStep)}
                            className="bg-black text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {getNextButtonText(currentStep)}
                          </Button>
                        ) : (
                          <div className="flex items-center text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Step Completed!
                          </div>
                        )}
                      </div>
                    )}

                    {/* Example Step */}
                    {currentStepData.type === "example" && (
                      <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="prose prose-gray max-w-none">
                            <p className="text-yellow-800 leading-relaxed">
                              {currentStepData.content}
                            </p>
                          </div>
                        </div>
                        {!completedSteps.has(currentStep) ? (
                          <Button
                            onClick={() => handleStepComplete(currentStep)}
                            className="bg-black text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {getNextButtonText(currentStep)}
                          </Button>
                        ) : (
                          <div className="flex items-center text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Step Completed!
                          </div>
                        )}
                      </div>
                    )}

                    {/* Practice Step */}
                    {currentStepData.type === "practice" &&
                      currentStepData.codeExample && (
                        <div className="space-y-6">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-blue-800 mb-3">📝 What You'll Build</h5>
                            <p className="text-blue-700 text-sm leading-relaxed mb-4">
                              {currentStepData.content}
                            </p>
                            <div className="bg-white p-3 rounded border border-blue-200">
                              <h6 className="font-medium text-blue-800 text-sm mb-2">🎯 Your Task:</h6>
                              <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Look for the blanks (___) in the code below</li>
                                <li>• Fill them with the correct values</li>
                                <li>• Run the code to see if your output matches the expected result</li>
                                <li>• Use hints if you get stuck!</li>
                              </ul>
                            </div>
                          </div>
                          <InteractiveCodeEnvironment
                            codeExample={currentStepData.codeExample}
                            onComplete={(success) =>
                              success && handleStepComplete(currentStep)
                            }
                          />
                        </div>
                      )}

                    {/* Quiz Step */}
                    {currentStepData.type === "quiz" &&
                      currentStepData.quiz && (
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            {currentStepData.content}
                          </p>

                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-black mb-3">
                              {currentStepData.quiz.question}
                            </h5>

                            <div className="space-y-2">
                              {currentStepData.quiz.options.map(
                                (option, index) => (
                                  <label
                                    key={index}
                                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name={`quiz-${currentStepData.id}`}
                                      value={index}
                                      onChange={() =>
                                        handleQuizAnswer(
                                          currentStepData.id,
                                          index,
                                        )
                                      }
                                      className="mr-3"
                                    />
                                    <span className="text-gray-700">
                                      {option}
                                    </span>
                                  </label>
                                ),
                              )}
                            </div>

                            <div className="mt-4 flex items-center space-x-3">
                              {!showQuizFeedback[currentStepData.id] ? (
                                <Button
                                  onClick={() =>
                                    checkQuizAnswer(
                                      currentStepData.id,
                                      currentStepData.quiz!.correct,
                                    )
                                  }
                                  disabled={
                                    quizAnswers[currentStepData.id] ===
                                    undefined
                                  }
                                  className="bg-black text-white"
                                >
                                  Check Answer
                                </Button>
                              ) : (
                                <div
                                  className={`flex items-center text-sm font-medium ${
                                    quizAnswers[currentStepData.id] ===
                                    currentStepData.quiz.correct
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {quizAnswers[currentStepData.id] ===
                                  currentStepData.quiz.correct ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      {getNextButtonText(currentStep)} in 1
                                      second...
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-4 h-4 mr-2" />
                                      Try again - select a different answer
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            {showQuizFeedback[currentStepData.id] && (
                              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-blue-800 text-sm">
                                  <strong>Explanation:</strong>{" "}
                                  {currentStepData.quiz.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-3 overflow-y-auto h-full">
            {/* Progress Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="text-center space-y-2">
                <div className="text-xs text-gray-500">Progress</div>
                <div className="text-lg font-bold text-black">
                  {progressPercentage.toFixed(0)}%
                </div>
                <Progress value={progressPercentage} className="h-1" />
                <div className="text-xs text-gray-600">
                  {completedSteps.size}/{lesson.interactiveSteps?.length || 0} steps
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {lesson.prerequisites.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-black mb-2 text-sm">Prerequisites</h4>
                <div className="space-y-1">
                  {lesson.prerequisites.slice(0, 2).map((prereq, index) => (
                    <div
                      key={index}
                      className="flex items-start text-xs text-gray-600"
                    >
                      <CheckCircle className="w-2 h-2 mr-1 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-tight">{prereq}</span>
                    </div>
                  ))}
                  {lesson.prerequisites.length > 2 && (
                    <div className="text-xs text-gray-500">+{lesson.prerequisites.length - 2} more</div>
                  )}
                </div>
              </div>
            )}

            {/* Key Concepts */}
            {lesson.theoreticalFoundations && (
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-black mb-2 text-sm">Concepts</h4>
                {lesson.theoreticalFoundations.keyTheorems && (
                  <div className="space-y-1">
                    {lesson.theoreticalFoundations.keyTheorems.slice(0, 3).map(
                      (theorem, index) => (
                        <div key={index} className="text-xs text-gray-600 leading-tight">
                          • {theorem.length > 30 ? theorem.substring(0, 30) + '...' : theorem}
                        </div>
                      ),
                    )}
                    {lesson.theoreticalFoundations.keyTheorems.length > 3 && (
                      <div className="text-xs text-gray-500">+{lesson.theoreticalFoundations.keyTheorems.length - 3} more</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
