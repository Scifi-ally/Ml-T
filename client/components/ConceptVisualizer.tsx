import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Settings,
  Download,
  Eye,
  EyeOff,
  Layers,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Network,
  GitBranch,
  Activity,
} from "lucide-react";

interface DataPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
  size?: number;
}

interface ConceptVisualizerProps {
  concept: string;
  type:
    | "linear_regression"
    | "clustering"
    | "classification"
    | "neural_network"
    | "gradient_descent"
    | "decision_tree";
  data?: DataPoint[];
  interactive?: boolean;
  showControls?: boolean;
  width?: number;
  height?: number;
  onParameterChange?: (params: any) => void;
}

const ConceptVisualizer: React.FC<ConceptVisualizerProps> = ({
  concept,
  type,
  data = [],
  interactive = true,
  showControls = true,
  width = 500,
  height = 400,
  onParameterChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [parameters, setParameters] = useState({
    learningRate: 0.01,
    epochs: 100,
    clusters: 3,
    slope: 1,
    intercept: 0,
    threshold: 0.5,
  });
  const [animationStep, setAnimationStep] = useState(0);
  const [showDataPoints, setShowDataPoints] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate sample data if none provided
  const [sampleData, setSampleData] = useState<DataPoint[]>([]);

  useEffect(() => {
    if (data.length === 0) {
      generateSampleData();
    } else {
      setSampleData(data);
    }
  }, [data, type]);

  const generateSampleData = useCallback(() => {
    const points: DataPoint[] = [];

    switch (type) {
      case "linear_regression":
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * 10;
          const y = 2 * x + 1 + (Math.random() - 0.5) * 3;
          points.push({ x, y, color: "#3b82f6" });
        }
        break;

      case "clustering":
        // Generate 3 clusters
        for (let cluster = 0; cluster < 3; cluster++) {
          const centerX = (cluster + 1) * 2.5;
          const centerY = Math.random() * 5 + 2;
          const color = ["#ef4444", "#10b981", "#8b5cf6"][cluster];

          for (let i = 0; i < 20; i++) {
            const x = centerX + (Math.random() - 0.5) * 2;
            const y = centerY + (Math.random() - 0.5) * 2;
            points.push({ x, y, color, label: `Cluster ${cluster + 1}` });
          }
        }
        break;

      case "classification":
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * 10;
          const y = Math.random() * 10;
          const label = x + y > 10 ? "Class A" : "Class B";
          const color = label === "Class A" ? "#ef4444" : "#10b981";
          points.push({ x, y, label, color });
        }
        break;

      default:
        for (let i = 0; i < 30; i++) {
          points.push({
            x: Math.random() * 10,
            y: Math.random() * 10,
            color: "#6366f1",
          });
        }
    }

    setSampleData(points);
  }, [type]);

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setAnimationStep((prev) => (prev + 1) % 200);
        draw();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, parameters, animationStep]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [sampleData, parameters, showDataPoints, showPredictions, type]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx);

    // Draw based on visualization type
    switch (type) {
      case "linear_regression":
        drawLinearRegression(ctx);
        break;
      case "clustering":
        drawClustering(ctx);
        break;
      case "classification":
        drawClassification(ctx);
        break;
      case "neural_network":
        drawNeuralNetwork(ctx);
        break;
      case "gradient_descent":
        drawGradientDescent(ctx);
        break;
      case "decision_tree":
        drawDecisionTree(ctx);
        break;
    }
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(width - 50, height - 50);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, height - 50);
    ctx.stroke();
  };

  const drawLinearRegression = (ctx: CanvasRenderingContext2D) => {
    const margin = 50;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Draw data points
    if (showDataPoints) {
      sampleData.forEach((point) => {
        const x = margin + (point.x / 10) * plotWidth;
        const y = margin + (1 - point.y / 10) * plotHeight;

        ctx.fillStyle = point.color || "#3b82f6";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw regression line
    if (showPredictions) {
      const { slope, intercept } = parameters;
      const x1 = margin;
      const y1 = margin + (1 - (slope * 0 + intercept) / 10) * plotHeight;
      const x2 = width - margin;
      const y2 = margin + (1 - (slope * 10 + intercept) / 10) * plotHeight;

      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Animate line fitting
      if (isPlaying) {
        const progress = (animationStep % 100) / 100;
        const currentSlope = slope * progress;
        const currentIntercept = intercept * progress;

        const animX1 = margin;
        const animY1 =
          margin +
          (1 - (currentSlope * 0 + currentIntercept) / 10) * plotHeight;
        const animX2 = width - margin;
        const animY2 =
          margin +
          (1 - (currentSlope * 10 + currentIntercept) / 10) * plotHeight;

        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(animX1, animY1);
        ctx.lineTo(animX2, animY2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  const drawClustering = (ctx: CanvasRenderingContext2D) => {
    const margin = 50;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Draw data points
    sampleData.forEach((point) => {
      const x = margin + (point.x / 10) * plotWidth;
      const y = margin + (1 - point.y / 10) * plotHeight;

      ctx.fillStyle = point.color || "#6366f1";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw cluster centers (animated)
    if (isPlaying) {
      const clusterCenters = [
        { x: 2.5, y: 3, color: "#ef4444" },
        { x: 5, y: 6, color: "#10b981" },
        { x: 7.5, y: 4, color: "#8b5cf6" },
      ];

      clusterCenters.forEach((center) => {
        const x = margin + (center.x / 10) * plotWidth;
        const y = margin + (1 - center.y / 10) * plotHeight;
        const pulse = Math.sin(animationStep * 0.1) * 3 + 8;

        ctx.fillStyle = center.color;
        ctx.beginPath();
        ctx.arc(x, y, pulse, 0, 2 * Math.PI);
        ctx.fill();

        // Draw center marker
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  const drawClassification = (ctx: CanvasRenderingContext2D) => {
    const margin = 50;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Draw decision boundary
    if (showPredictions) {
      ctx.strokeStyle = "#6366f1";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(margin + plotWidth * 0.5, margin);
      ctx.lineTo(margin + plotWidth * 0.5, margin + plotHeight);
      ctx.stroke();
    }

    // Draw data points
    sampleData.forEach((point) => {
      const x = margin + (point.x / 10) * plotWidth;
      const y = margin + (1 - point.y / 10) * plotHeight;

      ctx.fillStyle = point.color || "#6366f1";
      const shape = point.label === "Class A" ? "circle" : "square";

      if (shape === "circle") {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.fillRect(x - 4, y - 4, 8, 8);
      }
    });
  };

  const drawNeuralNetwork = (ctx: CanvasRenderingContext2D) => {
    const layers = [3, 4, 3, 2];
    const neuronRadius = 15;
    const layerSpacing = (width - 100) / (layers.length - 1);

    layers.forEach((neuronsInLayer, layerIndex) => {
      const x = 50 + layerIndex * layerSpacing;
      const neuronSpacing = (height - 100) / (neuronsInLayer + 1);

      for (let neuronIndex = 0; neuronIndex < neuronsInLayer; neuronIndex++) {
        const y = 50 + (neuronIndex + 1) * neuronSpacing;

        // Draw connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayerNeurons = layers[layerIndex + 1];
          const nextNeuronSpacing = (height - 100) / (nextLayerNeurons + 1);

          for (
            let nextNeuron = 0;
            nextNeuron < nextLayerNeurons;
            nextNeuron++
          ) {
            const nextX = 50 + (layerIndex + 1) * layerSpacing;
            const nextY = 50 + (nextNeuron + 1) * nextNeuronSpacing;

            const weight = isPlaying
              ? Math.sin(animationStep * 0.02 + neuronIndex + nextNeuron) *
                  0.5 +
                0.5
              : Math.random();

            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 + weight * 0.6})`;
            ctx.lineWidth = 1 + weight * 3;
            ctx.beginPath();
            ctx.moveTo(x + neuronRadius, y);
            ctx.lineTo(nextX - neuronRadius, nextY);
            ctx.stroke();
          }
        }

        // Draw neuron
        const activation = isPlaying
          ? Math.sin(animationStep * 0.03 + neuronIndex * 0.5) * 0.5 + 0.5
          : 0.5;

        const intensity = 0.3 + activation * 0.7;
        ctx.fillStyle = `rgba(59, 130, 246, ${intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, neuronRadius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "#1e40af";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Activation value
        ctx.fillStyle = "#ffffff";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(activation.toFixed(1), x, y + 3);
      }
    });
  };

  const drawGradientDescent = (ctx: CanvasRenderingContext2D) => {
    // Draw cost function landscape
    const margin = 50;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Draw gradient path
    if (isPlaying) {
      const steps = Math.min(animationStep, 50);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.beginPath();

      for (let i = 0; i <= steps; i++) {
        const t = i / 50;
        const x = margin + plotWidth * (0.8 - 0.6 * t);
        const y = margin + plotHeight * (0.2 + 0.6 * Math.sin(t * Math.PI));

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        // Draw current point
        if (i === steps) {
          ctx.stroke();
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    // Draw contour lines
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const radius = (plotWidth / 10) * i;
      ctx.beginPath();
      ctx.arc(
        margin + plotWidth * 0.2,
        margin + plotHeight * 0.8,
        radius,
        0,
        2 * Math.PI,
      );
      ctx.stroke();
    }
  };

  const drawDecisionTree = (ctx: CanvasRenderingContext2D) => {
    const nodeRadius = 20;
    const levelSpacing = 80;
    const nodeSpacing = 120;

    // Draw tree structure
    const drawNode = (
      x: number,
      y: number,
      level: number,
      text: string,
      isLeaf = false,
    ) => {
      ctx.fillStyle = isLeaf ? "#10b981" : "#3b82f6";
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = "#1e40af";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(text, x, y + 4);
    };

    const rootX = width / 2;
    const rootY = 60;

    // Root node
    drawNode(rootX, rootY, 0, "x > 5?");

    // Level 1
    const level1Y = rootY + levelSpacing;
    drawNode(rootX - nodeSpacing, level1Y, 1, "y > 3?");
    drawNode(rootX + nodeSpacing, level1Y, 1, "y > 7?");

    // Level 2 (leaves)
    const level2Y = level1Y + levelSpacing;
    drawNode(rootX - nodeSpacing - 60, level2Y, 2, "A", true);
    drawNode(rootX - nodeSpacing + 60, level2Y, 2, "B", true);
    drawNode(rootX + nodeSpacing - 60, level2Y, 2, "B", true);
    drawNode(rootX + nodeSpacing + 60, level2Y, 2, "A", true);

    // Draw connections
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;

    // Root to level 1
    ctx.beginPath();
    ctx.moveTo(rootX - 15, rootY + 15);
    ctx.lineTo(rootX - nodeSpacing + 15, level1Y - 15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rootX + 15, rootY + 15);
    ctx.lineTo(rootX + nodeSpacing - 15, level1Y - 15);
    ctx.stroke();

    // Level 1 to level 2
    [
      [rootX - nodeSpacing, rootX - nodeSpacing - 60],
      [rootX - nodeSpacing, rootX - nodeSpacing + 60],
      [rootX + nodeSpacing, rootX + nodeSpacing - 60],
      [rootX + nodeSpacing, rootX + nodeSpacing + 60],
    ].forEach(([from, to]) => {
      ctx.beginPath();
      ctx.moveTo(from - 15, level1Y + 15);
      ctx.lineTo(to + 15, level2Y - 15);
      ctx.stroke();
    });
  };

  const handleParameterChange = (param: string, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    const newParams = { ...parameters, [param]: newValue };
    setParameters(newParams);
    if (onParameterChange) {
      onParameterChange(newParams);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setAnimationStep(0);
    generateSampleData();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${concept.replace(/\s+/g, "_")}_visualization.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div
      className={`space-y-4 ${isFullscreen ? "fixed inset-0 z-50 bg-white p-6" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{concept} Visualization</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDataPoints(!showDataPoints)}
          >
            {showDataPoints ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPredictions(!showPredictions)}
          >
            {showPredictions ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            Model
          </Button>
          <Button variant="outline" size="sm" onClick={downloadCanvas}>
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Visualization */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-200 rounded-lg bg-white mx-auto block"
              style={{ maxWidth: "100%" }}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <Button size="sm" onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Controls */}
      {interactive && showControls && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Interactive Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {type === "linear_regression" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Slope: {parameters.slope}
                  </label>
                  <Slider
                    value={[parameters.slope]}
                    onValueChange={(value) =>
                      handleParameterChange("slope", value)
                    }
                    min={-5}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Intercept: {parameters.intercept}
                  </label>
                  <Slider
                    value={[parameters.intercept]}
                    onValueChange={(value) =>
                      handleParameterChange("intercept", value)
                    }
                    min={-10}
                    max={10}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </>
            )}

            {type === "clustering" && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Number of Clusters: {parameters.clusters}
                </label>
                <Slider
                  value={[parameters.clusters]}
                  onValueChange={(value) =>
                    handleParameterChange("clusters", value)
                  }
                  min={2}
                  max={6}
                  step={1}
                  className="w-full"
                />
              </div>
            )}

            {(type === "neural_network" || type === "gradient_descent") && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Learning Rate: {parameters.learningRate}
                </label>
                <Slider
                  value={[parameters.learningRate]}
                  onValueChange={(value) =>
                    handleParameterChange("learningRate", value)
                  }
                  min={0.001}
                  max={0.1}
                  step={0.001}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConceptVisualizer;
