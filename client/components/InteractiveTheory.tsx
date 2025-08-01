import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  Brain,
  Eye,
  Lightbulb,
  Zap,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Target,
  Cpu,
  TrendingUp,
  Activity,
  Layers,
  Network,
  GitBranch,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

interface TheoryStep {
  id: string;
  title: string;
  concept: string;
  explanation: string;
  visualization: string;
  keyPoints: string[];
  mathematics?: {
    formula: string;
    explanation: string;
    variables: { [key: string]: string };
  };
  realWorldExample: string;
  commonMistakes: string[];
  proTips: string[];
  interactiveDemo?: string;
}

interface InteractiveTheoryProps {
  topic: string;
  steps: TheoryStep[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  onComplete: () => void;
}

const InteractiveTheory: React.FC<InteractiveTheoryProps> = ({
  topic,
  steps,
  difficulty,
  estimatedMinutes,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showMath, setShowMath] = useState(false);
  const [understandingLevel, setUnderstandingLevel] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationControls = useAnimation();

  const currentStepData = steps[currentStep];
  const totalSteps = steps.length;

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep]);

  // Neural network visualization
  useEffect(() => {
    if (
      currentStepData?.visualization === "neural_network" &&
      canvasRef.current
    ) {
      drawNeuralNetwork();
    }
  }, [currentStep]);

  const drawNeuralNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw neurons and connections with animation
    const layers = [3, 4, 2];
    const neuronRadius = 15;
    const layerSpacing = 120;
    const neuronSpacing = 50;

    layers.forEach((neuronsInLayer, layerIndex) => {
      const x = 50 + layerIndex * layerSpacing;

      for (let neuronIndex = 0; neuronIndex < neuronsInLayer; neuronIndex++) {
        const y = 50 + neuronIndex * neuronSpacing + (4 - neuronsInLayer) * 25;

        // Draw connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayerNeurons = layers[layerIndex + 1];
          for (
            let nextNeuron = 0;
            nextNeuron < nextLayerNeurons;
            nextNeuron++
          ) {
            const nextX = 50 + (layerIndex + 1) * layerSpacing;
            const nextY =
              50 + nextNeuron * neuronSpacing + (4 - nextLayerNeurons) * 25;

            // Animated connection strength
            const weight =
              Math.sin(Date.now() * 0.001 + neuronIndex + nextNeuron) * 0.5 +
              0.5;
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.2 + weight * 0.6})`;
            ctx.lineWidth = 1 + weight * 2;
            ctx.beginPath();
            ctx.moveTo(x + neuronRadius, y);
            ctx.lineTo(nextX - neuronRadius, nextY);
            ctx.stroke();
          }
        }

        // Draw neuron
        const activation =
          Math.sin(Date.now() * 0.002 + neuronIndex * 0.5) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 0, 0, ${0.3 + activation * 0.7})`;
        ctx.beginPath();
        ctx.arc(x, y, neuronRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Draw neuron border
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Animate
    requestAnimationFrame(drawNeuralNetwork);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
      setProgress(0);
      setIsPlaying(false);

      // Trigger achievement animation
      animationControls.start({
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
        transition: { duration: 0.6 },
      });
    } else {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setCompletedSteps(new Set());
    setUnderstandingLevel(0);
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

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case "neural_network":
        return <Network className="w-6 h-6" />;
      case "data_flow":
        return <GitBranch className="w-6 h-6" />;
      case "chart":
        return <BarChart3 className="w-6 h-6" />;
      case "algorithm":
        return <Cpu className="w-6 h-6" />;
      default:
        return <Eye className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center">
        <motion.h1
          className="text-3xl font-bold text-black mb-2"
          animate={animationControls}
        >
          {topic}
        </motion.h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{estimatedMinutes} minutes</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span>
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Theory Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Main Concept */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Core Concept
                </h3>
                <p className="text-blue-700">{currentStepData.concept}</p>
              </div>

              {/* Detailed Explanation */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Detailed Explanation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {currentStepData.explanation}
                </p>
              </div>

              {/* Key Points */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Key Points
                </h3>
                <ul className="space-y-2">
                  {currentStepData.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Mathematics Section */}
              {currentStepData.mathematics && (
                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMath(!showMath)}
                    className="mb-3"
                  >
                    {showMath ? "Hide" : "Show"} Mathematics
                  </Button>

                  <AnimatePresence>
                    {showMath && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gray-50 border rounded-lg p-4"
                      >
                        <h4 className="font-semibold mb-2">
                          Mathematical Foundation
                        </h4>
                        <div className="font-mono text-lg mb-2 p-2 bg-white border rounded">
                          {currentStepData.mathematics.formula}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {currentStepData.mathematics.explanation}
                        </p>
                        <div className="space-y-1">
                          <h5 className="font-medium text-sm">Variables:</h5>
                          {Object.entries(
                            currentStepData.mathematics.variables,
                          ).map(([variable, description]) => (
                            <div key={variable} className="text-sm">
                              <span className="font-mono font-semibold">
                                {variable}
                              </span>
                              : {description}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Visualization Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getVisualizationIcon(currentStepData.visualization)}
                Interactive Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Canvas for visualizations */}
              <div className="bg-gray-50 border rounded-lg p-4 mb-4 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="border bg-white rounded"
                  style={{ maxWidth: "100%", height: "300px" }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 mb-4">
                <Button
                  size="sm"
                  onClick={handlePlay}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <div className="flex-1">
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              {/* Real World Example */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Real-World Application
                </h3>
                <p className="text-green-700 text-sm">
                  {currentStepData.realWorldExample}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Professional Tips and Common Mistakes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Common Mistakes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Zap className="w-5 h-5" />
              Common Mistakes to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentStepData.commonMistakes.map((mistake, index) => (
                <motion.li
                  key={index}
                  className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-red-700 text-sm">{mistake}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Professional Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Activity className="w-5 h-5" />
              Professional Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentStepData.proTips.map((tip, index) => (
                <motion.li
                  key={index}
                  className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-blue-700 text-sm">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Understanding Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Understanding Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              How well do you understand this concept? Rate your understanding:
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <Button
                  key={level}
                  variant={understandingLevel >= level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUnderstandingLevel(level)}
                  className="w-12 h-12 rounded-full"
                >
                  {level}
                </Button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              1 = Need more practice, 5 = Completely understand
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                completedSteps.has(i)
                  ? "bg-green-500"
                  : i === currentStep
                    ? "bg-blue-500"
                    : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentStep === totalSteps - 1 ? "Complete" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default InteractiveTheory;
