import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Copy,
  Check,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Code,
  Terminal,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  expectedOutput: string;
  concept: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  hints: string[];
}

interface CodePlaygroundProps {
  example: CodeExample;
  onComplete?: (success: boolean) => void;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  example,
  onComplete,
}) => {
  const [code, setCode] = useState(example.code);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simulate code execution (in a real app, this would use a sandboxed Python interpreter)
  const executeCode = async () => {
    setIsRunning(true);
    setOutput("");

    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Simple code evaluation for demonstration
      // In production, this would use a proper Python interpreter like Pyodide
      let result = "";

      if (code.includes("print(")) {
        // Extract print statements for basic demonstration
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          printMatches.forEach((match) => {
            const content = match.replace(/print\(|\)/g, "");
            // Simple evaluation for strings and basic expressions
            if (content.includes('"') || content.includes("'")) {
              result += content.replace(/['"]/g, "") + "\n";
            } else {
              // For demo purposes, just show the expression
              result += `${content}\n`;
            }
          });
        }
      }

      if (code.includes("import numpy") || code.includes("import pandas")) {
        result += "Libraries imported successfully\n";
      }

      if (code.includes("np.array") || code.includes("pd.DataFrame")) {
        result += "Data structures created\n";
      }

      if (!result) {
        result = "Code executed successfully (no output)";
      }

      setOutput(result.trim());

      // Check if output matches expected result
      const success =
        result.trim().includes(example.expectedOutput.trim()) ||
        result.trim() === example.expectedOutput.trim();
      onComplete?.(success);
    } catch (error) {
      setOutput(`Error: ${error}`);
      onComplete?.(false);
    }

    setIsRunning(false);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const resetCode = () => {
    setCode(example.code);
    setOutput("");
    setCurrentHint(0);
  };

  const nextHint = () => {
    if (currentHint < example.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
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

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-black text-sm">
                {example.title}
              </h3>
              <p className="text-xs text-gray-500">{example.concept}</p>
            </div>
          </div>
          <Badge
            className={`text-xs ${getDifficultyColor(example.difficulty)}`}
          >
            {example.difficulty}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {example.description}
        </p>
      </div>

      {/* Code Editor */}
      <div className="relative">
        <div className="flex items-center justify-between bg-gray-900 text-white px-4 py-2 text-xs">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3 h-3" />
            <span>Interactive Python</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyCode}
              className="h-6 px-2 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCode}
              className="h-6 px-2 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-4 font-mono text-sm bg-gray-900 text-green-400 border-none outline-none resize-none min-h-[120px]"
            style={{
              lineHeight: "1.5",
              tabSize: 4,
            }}
            placeholder="Write your Python code here..."
            spellCheck={false}
          />
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-900 border-t border-gray-700 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              onClick={executeCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-4"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-2" />
                  Run Code
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="h-8 px-3 text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Lightbulb className="w-3 h-3 mr-2" />
              Hints ({example.hints.length})
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 px-2 text-gray-300 hover:bg-gray-800"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-gray-200"
        >
          <div className="bg-black text-green-400 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-4 h-4" />
              <span className="text-xs font-medium">Output</span>
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Hints */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-blue-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Hint {currentHint + 1} of {example.hints.length}
                  </span>
                </div>
                {currentHint < example.hints.length - 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextHint}
                    className="h-7 px-3 text-xs border-blue-200 text-blue-700 hover:bg-blue-100"
                  >
                    Next Hint
                  </Button>
                )}
              </div>
              <p className="text-sm text-blue-800 leading-relaxed">
                {example.hints[currentHint]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Learning Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 bg-gray-50"
          >
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-black">
                      Key Concepts
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Understanding {example.concept.toLowerCase()}</li>
                    <li>• Practical implementation patterns</li>
                    <li>• Common use cases and applications</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-black">
                      Expected Output
                    </span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <pre className="text-xs font-mono text-gray-700">
                      {example.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodePlayground;
