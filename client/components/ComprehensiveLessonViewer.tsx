import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Brain,
  Code2,
  Eye,
  Lightbulb,
  Target,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  Clock,
  Star,
  PlayCircle,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  Settings,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  GitBranch,
  Database,
  BarChart3,
  PieChart,
  Activity,
  Network,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";

import InteractiveTheory from "./InteractiveTheory";
import ConceptVisualizer from "./ConceptVisualizer";
import ProfessionalTips from "./ProfessionalTips";
import CodePlayground from "./CodePlayground";

interface LessonSection {
  id: string;
  type:
    | "theory"
    | "interactive"
    | "visualization"
    | "code"
    | "quiz"
    | "tips"
    | "practice"
    | "reflection";
  title: string;
  content: string;
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  learningObjectives: string[];
  prerequisite?: string[];
  keyTakeaways: string[];
  practicalApplications: string[];
  commonMistakes: string[];
  proTips: string[];
  additionalResources: string[];
  assessmentQuestions?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    explanation: string;
    expectedOutput: string;
    hints: string[];
  }[];
  visualizations?: {
    type: string;
    data: any[];
    interactive: boolean;
  }[];
}

interface ComprehensiveLessonViewerProps {
  lessonId: string;
  title: string;
  description: string;
  sections: LessonSection[];
  totalEstimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  onComplete: () => void;
  onProgress: (sectionId: string, timeSpent: number) => void;
}

const ComprehensiveLessonViewer: React.FC<ComprehensiveLessonViewerProps> = ({
  lessonId,
  title,
  description,
  sections,
  totalEstimatedMinutes,
  difficulty,
  prerequisites,
  onComplete,
  onProgress,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(
    new Set(),
  );
  const [sectionProgress, setSectionProgress] = useState<{
    [key: number]: number;
  }>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});
  const [showSettings, setShowSettings] = useState(false);
  const [learningPreferences, setLearningPreferences] = useState({
    autoAdvance: false,
    showHints: true,
    playbackSpeed: 1,
    theme: "light",
  });

  const currentSectionData = sections[currentSection];
  const totalSections = sections.length;
  const overallProgress = (completedSections.size / totalSections) * 100;

  // Timer for tracking time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto-advance if enabled
  useEffect(() => {
    if (
      learningPreferences.autoAdvance &&
      sectionProgress[currentSection] >= 100 &&
      currentSection < totalSections - 1
    ) {
      setTimeout(() => {
        handleNextSection();
      }, 2000);
    }
  }, [sectionProgress, currentSection, learningPreferences.autoAdvance]);

  const handleNextSection = () => {
    if (currentSection < totalSections - 1) {
      // Mark current section as completed
      setCompletedSections((prev) => new Set([...prev, currentSection]));

      // Report progress
      const timeSpent = (Date.now() - startTime) / 1000 / 60; // minutes
      onProgress(currentSectionData.id, timeSpent);

      // Move to next section
      setCurrentSection(currentSection + 1);
      setStartTime(Date.now());
    } else {
      // Complete the lesson
      setCompletedSections((prev) => new Set([...prev, currentSection]));
      onComplete();
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setStartTime(Date.now());
    }
  };

  const handleSectionProgress = (progress: number) => {
    setSectionProgress((prev) => ({
      ...prev,
      [currentSection]: progress,
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSectionIcon = (type: string) => {
    const iconMap = {
      theory: <BookOpen className="w-5 h-5" />,
      interactive: <Brain className="w-5 h-5" />,
      visualization: <BarChart3 className="w-5 h-5" />,
      code: <Code2 className="w-5 h-5" />,
      quiz: <Target className="w-5 h-5" />,
      tips: <Lightbulb className="w-5 h-5" />,
      practice: <Activity className="w-5 h-5" />,
      reflection: <Eye className="w-5 h-5" />,
    };
    return iconMap[type] || <BookOpen className="w-5 h-5" />;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderSectionContent = () => {
    switch (currentSectionData.type) {
      case "theory":
        return (
          <div className="space-y-6">
            {/* Main Content */}
            <div className="prose max-w-none">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Core Concept
                </h3>
                <p className="text-blue-700 leading-relaxed">
                  {currentSectionData.content}
                </p>
              </div>

              {/* Learning Objectives */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSectionData.learningObjectives.map(
                      (objective, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Takeaways */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">
                        ✓ Remember These
                      </h4>
                      <ul className="space-y-1">
                        {currentSectionData.keyTakeaways.map(
                          (takeaway, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              • {takeaway}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-600">
                        🎯 Practical Uses
                      </h4>
                      <ul className="space-y-1">
                        {currentSectionData.practicalApplications.map(
                          (app, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              • {app}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "interactive":
        return (
          <InteractiveTheory
            topic={currentSectionData.title}
            steps={[
              {
                id: "step-1",
                title: currentSectionData.title,
                concept: currentSectionData.content,
                explanation: "Interactive explanation with hands-on elements",
                visualization: "neural_network",
                keyPoints: currentSectionData.keyTakeaways,
                realWorldExample:
                  currentSectionData.practicalApplications[0] ||
                  "Real-world application",
                commonMistakes: currentSectionData.commonMistakes,
                proTips: currentSectionData.proTips,
              },
            ]}
            difficulty={currentSectionData.difficulty}
            estimatedMinutes={currentSectionData.estimatedMinutes}
            onComplete={() => handleSectionProgress(100)}
          />
        );

      case "visualization":
        return (
          <div className="space-y-6">
            <ConceptVisualizer
              concept={currentSectionData.title}
              type="neural_network"
              interactive={true}
              showControls={true}
              onParameterChange={(params) => console.log("Parameters:", params)}
            />

            <Card>
              <CardHeader>
                <CardTitle>Understanding the Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  {currentSectionData.content}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">What to Look For:</h4>
                    <ul className="space-y-1 text-sm">
                      {currentSectionData.keyTakeaways.map(
                        (takeaway, index) => (
                          <li key={index}>• {takeaway}</li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Try This:</h4>
                    <ul className="space-y-1 text-sm">
                      {currentSectionData.practicalApplications.map(
                        (app, index) => (
                          <li key={index}>• {app}</li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "code":
        return (
          <div className="space-y-6">
            {currentSectionData.codeExamples?.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    {example.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{example.description}</p>

                  <CodePlayground
                    initialCode={example.code}
                    language="python"
                    expectedOutput={example.expectedOutput}
                    hints={example.hints}
                    onRunCode={(code) => console.log("Running:", code)}
                  />

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-gray-700 text-sm">
                      {example.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "tips":
        return (
          <ProfessionalTips
            topic={currentSectionData.title}
            level={currentSectionData.difficulty}
            showFilters={false}
          />
        );

      case "quiz":
        return (
          <div className="space-y-6">
            {currentSectionData.assessmentQuestions?.map((question, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Question {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-4">{question.question}</h3>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        variant="outline"
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => {
                          if (optionIndex === question.correct) {
                            handleSectionProgress(100);
                          }
                        }}
                      >
                        <span className="mr-3 font-semibold">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Explanation:
                    </h4>
                    <p className="text-blue-700 text-sm">
                      {question.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Content type not yet implemented</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""} min-h-screen`}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>

              <div>
                <h1 className="text-xl font-bold text-black">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                {totalEstimatedMinutes} min
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress: {Math.round(overallProgress)}%</span>
              <span>Time Spent: {formatTime(totalTimeSpent)}</span>
            </div>
            <Progress value={overallProgress} className="h-2" />

            {/* Section Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant={index === currentSection ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentSection(index)}
                  className="flex-shrink-0"
                >
                  {getSectionIcon(section.type)}
                  <span className="ml-2">{index + 1}</span>
                  {completedSections.has(index) && (
                    <CheckCircle className="w-3 h-3 ml-2 text-green-600" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getSectionIcon(currentSectionData.type)}
                  <div>
                    <h2 className="text-xl font-semibold">
                      {currentSectionData.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Badge variant="outline">{currentSectionData.type}</Badge>
                      <span>•</span>
                      <span>{currentSectionData.estimatedMinutes} min</span>
                      <span>•</span>
                      <Badge
                        className={getDifficultyColor(
                          currentSectionData.difficulty,
                        )}
                      >
                        {currentSectionData.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Prerequisites Warning */}
              {currentSectionData.prerequisite &&
                currentSectionData.prerequisite.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Prerequisites
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentSectionData.prerequisite.map((prereq, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-yellow-700 border-yellow-300"
                        >
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderSectionContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-600">
                Section {currentSection + 1} of {totalSections}
              </div>

              <Button
                onClick={handleNextSection}
                className="flex items-center gap-2"
              >
                {currentSection === totalSections - 1
                  ? "Complete Lesson"
                  : "Next Section"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Personal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes[currentSection] || ""}
                  onChange={(e) =>
                    setNotes((prev) => ({
                      ...prev,
                      [currentSection]: e.target.value,
                    }))
                  }
                  placeholder="Add your notes for this section..."
                  className="w-full h-32 p-3 text-sm border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            {currentSectionData.commonMistakes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Avoid These Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSectionData.commonMistakes
                      .slice(0, 3)
                      .map((mistake, index) => (
                        <li
                          key={index}
                          className="text-xs text-red-700 flex items-start"
                        >
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          {mistake}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Pro Tips */}
            {currentSectionData.proTips.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center text-blue-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSectionData.proTips
                      .slice(0, 3)
                      .map((tip, index) => (
                        <li
                          key={index}
                          className="text-xs text-blue-700 flex items-start"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Additional Resources */}
            {currentSectionData.additionalResources.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    Additional Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSectionData.additionalResources.map(
                      (resource, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="text-xs text-blue-600 hover:underline flex items-center"
                          >
                            <Globe className="w-3 h-3 mr-1" />
                            {resource}
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Learning Preferences</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-advance sections</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setLearningPreferences((prev) => ({
                      ...prev,
                      autoAdvance: !prev.autoAdvance,
                    }))
                  }
                >
                  {learningPreferences.autoAdvance ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Show hints</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setLearningPreferences((prev) => ({
                      ...prev,
                      showHints: !prev.showHints,
                    }))
                  }
                >
                  {learningPreferences.showHints ? "On" : "Off"}
                </Button>
              </div>

              <div>
                <span className="text-sm block mb-2">
                  Playback speed: {learningPreferences.playbackSpeed}x
                </span>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.25"
                  value={learningPreferences.playbackSpeed}
                  onChange={(e) =>
                    setLearningPreferences((prev) => ({
                      ...prev,
                      playbackSpeed: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComprehensiveLessonViewer;
