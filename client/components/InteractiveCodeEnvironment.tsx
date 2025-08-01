import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Code,
  Terminal,
  BookOpen,
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
  tests?: {
    input: any;
    expectedOutput: any;
    description: string;
  }[];
}

interface InteractiveCodeEnvironmentProps {
  codeExample: CodeExample;
  onComplete?: (success: boolean) => void;
}

const InteractiveCodeEnvironment: React.FC<InteractiveCodeEnvironmentProps> = ({
  codeExample,
  onComplete,
}) => {
  const [userCode, setUserCode] = useState(codeExample.code.replace(/# .*\n/g, ''));
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Simulate code execution (in a real implementation, this would use a sandboxed Python environment)
  const executeCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      // Simulate processing time
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      // Simple code analysis and simulation
      const result = await simulateCodeExecution(userCode);
      setOutput(result.output);
      setTestResults(result.testResults || []);

      // Check if output matches expected
      const success =
        result.output.trim() === codeExample.expectedOutput.trim();
      setIsCorrect(success);

      if (onComplete) {
        onComplete(success);
      }

      // Auto-advance if correct after a short delay
      if (success) {
        setTimeout(() => {
          // The parent component will handle the navigation
        }, 1000);
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
      setIsCorrect(false);
    }

    setIsRunning(false);
  };

  // Simulate Python code execution with comprehensive validation
  const simulateCodeExecution = async (code: string) => {
    // Check for proper import
    if (!code.includes("import numpy as np")) {
      return {
        output:
          "❌ Error: Missing NumPy import!\n\n💡 You must import NumPy with: import numpy as np",
        testResults: [
          {
            passed: false,
            description: "NumPy library not imported correctly",
          },
        ],
      };
    }

    // Advanced validation for complete implementations
    if (codeExample.id === "advanced-numpy-mastery") {
      return validateAdvancedNumPyImplementation(code);
    }

    // Check for vector operations exercise
    if (code.includes("person1") && code.includes("person2")) {
      let issues = [];
      let output = "";

      // Check if person1 is correctly defined
      if (!code.includes("person1 = np.array([170, 70, 25])")) {
        issues.push({
          passed: false,
          description:
            "person1 should be np.array([170, 70, 25]) - height, weight, age",
        });
      } else {
        issues.push({
          passed: true,
          description: "✅ person1 vector created correctly!",
        });
      }

      // Check if person2 is correctly defined
      if (!code.includes("person2 = np.array([165, 65, 30])")) {
        issues.push({
          passed: false,
          description:
            "person2 should be np.array([165, 65, 30]) - height, weight, age",
        });
      } else {
        issues.push({
          passed: true,
          description: "✅ person2 vector created correctly!",
        });
      }

      // Check vector addition
      if (
        code.includes("person1 + person2") ||
        code.includes("person2 + person1")
      ) {
        issues.push({
          passed: true,
          description: "✅ Vector addition implemented correctly!",
        });
        output += "Combined features: [335 135  55]\n";
      } else {
        issues.push({
          passed: false,
          description:
            "Vector addition missing. Use: combined = person1 + person2",
        });
      }

      // Check scalar multiplication
      if (code.includes("0.5 * person1") || code.includes("person1 * 0.5")) {
        issues.push({
          passed: true,
          description: "✅ Scalar multiplication implemented correctly!",
        });
        output += "Scaled features: [85.  35.  12.5]";
      } else {
        issues.push({
          passed: false,
          description:
            "Scalar multiplication missing. Use: scaled = 0.5 * person1",
        });
      }

      if (issues.every((issue) => issue.passed)) {
        output =
          "Combined features: [335 135  55]\nScaled features: [85.  35.  12.5]";
      } else {
        output =
          "⚠️  Some parts need fixing. Check the test results below for guidance!";
      }

      return {
        output: output,
        testResults: issues,
      };
    }

    // Check for linear independence exercise
    if (code.includes("vectors") && code.includes("det")) {
      let issues = [];
      let output = "";

      if ((code.includes("np.array([[1, 0"), code.includes("[0, 1]]"))) {
        issues.push({
          passed: true,
          description: "✅ Vectors matrix created correctly!",
        });
      } else {
        issues.push({
          passed: false,
          description: "Vectors should be [[1, 0], [0, 1]] in the np.array",
        });
      }

      if (code.includes("np.linalg.det(vectors)")) {
        issues.push({
          passed: true,
          description: "✅ Determinant calculation is correct!",
        });
        output += "Determinant: 1.0\n";
      } else {
        issues.push({
          passed: false,
          description: "Use np.linalg.det(vectors) to calculate determinant",
        });
      }

      if (code.includes("independent") && code.includes("dependent")) {
        issues.push({
          passed: true,
          description: "✅ Independence check logic implemented!",
        });
        output += "Vectors are linearly independent";
      } else {
        issues.push({
          passed: false,
          description:
            "Add the if/else logic to check independence vs dependence",
        });
      }

      if (issues.every((issue) => issue.passed)) {
        output = "Determinant: 1.0\nVectors are linearly independent";
      }

      return {
        output: output,
        testResults: issues,
      };
    }

    // Default case - basic execution
    return {
      output: codeExample.expectedOutput,
      testResults: [
        {
          passed: true,
          description: "🎉 Great job! Your code executed successfully!",
        },
      ],
    };
  };

  const resetCode = () => {
    setUserCode(codeExample.code.replace(/# .*\n/g, ''));
    setOutput("");
    setTestResults([]);
    setIsCorrect(false);
    setShowHints(false);
    setCurrentHint(0);
  };

  const getNextHint = () => {
    if (currentHint < codeExample.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHints(true);
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

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center shadow-md">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-black text-lg">
                {codeExample.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {codeExample.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              className={`text-xs border ${getDifficultyColor(codeExample.difficulty)}`}
            >
              {codeExample.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {codeExample.concept}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="code" className="w-full">
        <div className="border-b border-gray-200">
          <TabsList className="w-full justify-start bg-transparent border-0 p-0">
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              <Code className="w-4 h-4 mr-2" />
              Code Editor
            </TabsTrigger>
            <TabsTrigger
              value="output"
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Output
            </TabsTrigger>
            <TabsTrigger
              value="theory"
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Theory
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="p-4 space-y-4">
          {/* Code Editor */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">
                  main.py
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  size="sm"
                  variant="outline"
                  className={`${isDarkTheme ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  {isDarkTheme ? '☀️' : '🌙'}
                </Button>
                <Button
                  onClick={resetCode}
                  size="sm"
                  variant="outline"
                  className={`${isDarkTheme ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            <div className={`relative rounded-lg border overflow-hidden shadow-2xl ${
              isDarkTheme
                ? 'bg-gray-900 border-gray-700'
                : 'bg-white border-gray-300'
            }`}>
              {/* Line numbers */}
              <div className="flex">
                <div className={`px-4 py-6 font-mono text-sm leading-6 select-none border-r min-w-[4rem] ${
                  isDarkTheme
                    ? 'bg-gray-800 text-gray-400 border-gray-700'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  {userCode.split("\n").map((_, i) => (
                    <div
                      key={i}
                      className={`text-right pr-2 transition-colors ${
                        isDarkTheme ? 'hover:text-gray-300' : 'hover:text-gray-700'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className={`w-full h-[400px] p-6 bg-transparent font-mono text-base resize-none focus:outline-none leading-6 ${
                      isDarkTheme
                        ? 'text-green-300 placeholder-gray-500'
                        : 'text-gray-800 placeholder-gray-400'
                    }`}
                    placeholder="import numpy as np

# Fill in the missing code:
person1 = np.array([___, ___, ___])
person2 = np.array([___, ___, ___])

combined = ___ + ___
print('Combined features:', combined)

scaled = ___ * person1
print('Scaled features:', scaled)"
                    style={{
                      fontFamily:
                        'Fira Code, Monaco, Consolas, "Courier New", monospace',
                      lineHeight: "1.5rem",
                      fontSize: "15px",
                    }}
                    spellCheck={false}
                  />
                  {/* Cursor indicator */}
                  <div className="absolute top-2 right-4 flex items-center space-x-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Ready</span>
                  </div>
                </div>
              </div>
              {/* Bottom status bar */}
              <div className={`border-t px-4 py-2 flex items-center justify-between text-xs ${
                isDarkTheme
                  ? 'bg-gray-800 border-gray-700 text-gray-400'
                  : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}>
                <div className="flex items-center space-x-4">
                  <span>Python 3.9</span>
                  <span>UTF-8</span>
                  <span>
                    Ln {userCode.split("\n").length}, Col{" "}
                    {userCode.length - userCode.lastIndexOf("\n")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Ready to execute</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={executeCode}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-6 py-2 shadow-md transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? "Executing..." : "Run Code"}
                </Button>

                <Button
                  onClick={getNextHint}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-4 py-2"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Hint ({currentHint + 1}/{codeExample.hints.length})
                </Button>
              </div>

              {isCorrect && (
                <div className="flex items-center text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Excellent! Moving to next step...</span>
                </div>
              )}
            </div>
          </div>

          {/* Hints */}
          {showHints && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                <span className="font-semibold text-blue-800 text-lg">
                  💡 Hint {currentHint + 1} of {codeExample.hints.length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                <p className="text-blue-700 text-base leading-relaxed">
                  {codeExample.hints[currentHint]}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-blue-600 text-sm">
                  👆 Read this hint carefully, then look at your code and try to
                  fill in the blanks!
                </p>
                <div className="text-blue-500 text-sm">
                  {currentHint < codeExample.hints.length - 1 && (
                    <span>Click "Hint" again for more help! 🚀</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Beginner Help Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <BookOpen className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">
                🌱 New to Programming?
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-green-700">
                  📝 How to fill in blanks:
                </p>
                <ul className="text-green-600 space-y-1 text-xs">
                  <li>• Look for ___ in the code</li>
                  <li>• Replace ___ with the right word/number</li>
                  <li>• Follow the comments (lines starting with #)</li>
                  <li>• Use the hints above! 💡</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-green-700">🔧 Common fixes:</p>
                <ul className="text-green-600 space-y-1 text-xs">
                  <li>
                    • Python is case-sensitive: use 'person1' not 'Person1'
                  </li>
                  <li>• Include quotation marks for text</li>
                  <li>• Don't forget parentheses () for functions</li>
                  <li>• Numbers don't need quotes: use 170 not "170"</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="output" className="p-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[600px]">
            {/* Console Output */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Terminal className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-300 font-medium">
                      Console Output
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isRunning && (
                      <>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs">
                          Executing...
                        </span>
                      </>
                    )}
                    {!isRunning && output && (
                      <>
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-400 text-xs">Completed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 h-[520px] overflow-auto bg-gray-900">
                <pre className="text-green-300 font-mono whitespace-pre-wrap leading-7 text-base">
                  {output ||
                    `# 🐍 Python Console - Ready for your code!
#
# This is where your program output will appear.
#
# What you'll see here:
# • Print statements from your code
# • Calculation results
# • Error messages (if any)
#
# 💡 Tip: Use print() to see what your variables contain!
#
# Click 'Run Code' to execute your program →`}
                </pre>
              </div>
            </div>

            {/* Expected Output & Results */}
            <div className="space-y-4 h-[600px] overflow-auto">
              {/* Expected Output */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-blue-200 px-6 py-3 border-b border-blue-300">
                  <h4 className="font-semibold text-blue-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Expected Output
                  </h4>
                </div>
                <div className="p-6">
                  <pre className="text-blue-800 font-mono whitespace-pre-wrap leading-7 text-base bg-white p-4 rounded border border-blue-200">
                    {codeExample.expectedOutput}
                  </pre>
                  <div className="mt-4 p-4 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-700 text-sm">
                      <strong>📝 What this means:</strong> Your code should
                      produce output that exactly matches what's shown above.
                      Each line, number, and format should be identical.
                    </p>
                  </div>
                </div>
              </div>

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Automated Tests
                    </h4>
                  </div>
                  <div className="p-6 space-y-3">
                    {testResults.map((test, index) => (
                      <div
                        key={index}
                        className={`flex items-start p-4 rounded-lg border-2 ${
                          test.passed
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}
                      >
                        {test.passed ? (
                          <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-medium text-sm">
                            {test.description}
                          </span>
                          {test.passed && (
                            <p className="text-xs mt-1 opacity-75">
                              ✨ Great job! This part of your code works
                              perfectly.
                            </p>
                          )}
                          {!test.passed && (
                            <p className="text-xs mt-1 opacity-75">
                              🔍 This needs to be fixed. Check the hint below!
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Help Section */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-purple-200 px-6 py-3 border-b border-purple-300">
                  <h4 className="font-semibold text-purple-800 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Learning Tips
                  </h4>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-purple-700 text-sm font-medium">
                      🎯 What you're learning:
                    </p>
                    <p className="text-purple-600 text-sm bg-white p-3 rounded border border-purple-200">
                      {codeExample.concept} - This is a fundamental building
                      block in machine learning and data science.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-purple-700 text-sm font-medium">
                      💡 Why this matters:
                    </p>
                    <p className="text-purple-600 text-sm bg-white p-3 rounded border border-purple-200">
                      Understanding this concept will help you work with real
                      data and build machine learning models that can make
                      predictions and find patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="p-4">
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">
                  Concept: {codeExample.concept}
                </span>
              </div>
              <div className="text-blue-700 text-sm leading-relaxed">
                <p className="mb-3">
                  This exercise demonstrates {codeExample.concept.toLowerCase()}
                  , which is fundamental to machine learning and data science.
                </p>
                <p>
                  By implementing this from scratch, you gain deep understanding
                  of the underlying mathematics and computational principles
                  that power modern ML frameworks.
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-black mb-3">
                What You'll Learn:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                  Mathematical foundations of the concept
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                  Practical implementation details
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                  Real-world applications and use cases
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0" />
                  Common pitfalls and debugging techniques
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveCodeEnvironment;
