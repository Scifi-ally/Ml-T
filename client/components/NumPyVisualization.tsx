import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NumPyVisualizationProps {
  operation: "array-creation" | "arithmetic" | "linear-algebra" | "statistics";
}

const NumPyVisualization: React.FC<NumPyVisualizationProps> = ({
  operation,
}) => {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
      }, 2500);
      return () => clearInterval(timer);
    }
  }, [autoPlay]);

  const renderArrayCreation = () => {
    const arrays = [
      {
        code: "np.array([170, 70, 25])",
        values: [170, 70, 25],
        label: "Person 1",
      },
      {
        code: "np.array([165, 65, 30])",
        values: [165, 65, 30],
        label: "Person 2",
      },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            NumPy Array Creation
          </h4>
          <p className="text-gray-600 text-sm">
            Watch how Python lists transform into NumPy arrays
          </p>
        </div>

        {arrays.map((array, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-700">
                {array.label}
              </div>
              <div className="text-xs text-gray-500">Step {index + 1}</div>
            </div>

            {/* Code representation */}
            <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.5 + 0.5 }}
              >
                {array.code}
              </motion.span>
            </div>

            {/* Visual array representation */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Result:</span>
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {array.values.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.5 + 1 + i * 0.2 }}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-sm"
                  >
                    {value}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>
            </div>

            {/* Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5 + 2 }}
              className="mt-4 grid grid-cols-3 gap-4 text-xs"
            >
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Shape</div>
                <div className="font-mono">({array.values.length},)</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Size</div>
                <div className="font-mono">{array.values.length}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <div className="text-gray-500">Type</div>
                <div className="font-mono">int64</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderArithmetic = () => {
    const person1 = [170, 70, 25];
    const person2 = [165, 65, 30];
    const combined = person1.map((v, i) => v + person2[i]);
    const scaled = person1.map((v) => v * 0.5);

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Vector Arithmetic Operations
          </h4>
          <p className="text-gray-600 text-sm">
            Element-wise operations in action
          </p>
        </div>

        {/* Vector Addition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">
            Element-wise Addition
          </h5>

          <div className="space-y-4">
            {/* Visual representation */}
            <div className="flex items-center justify-center space-x-4 text-sm">
              {/* Person 1 */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {person1.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono"
                  >
                    {val}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl font-bold text-gray-600"
              >
                +
              </motion.span>

              {/* Person 2 */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {person2.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.2 }}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono"
                  >
                    {val}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="text-xl font-bold text-gray-600"
              >
                =
              </motion.span>

              {/* Result */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {combined.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3 + i * 0.2 }}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono"
                  >
                    {val}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>
            </div>

            {/* Mathematical breakdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="bg-gray-50 p-3 rounded text-xs space-y-1"
            >
              <div className="font-mono">Height: 170 + 165 = 335</div>
              <div className="font-mono">Weight: 70 + 65 = 135</div>
              <div className="font-mono">Age: 25 + 30 = 55</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scalar Multiplication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">
            Scalar Multiplication
          </h5>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-purple-100 text-purple-800 px-3 py-2 rounded font-mono text-lg"
              >
                0.5
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-xl font-bold text-gray-600"
              >
                ×
              </motion.span>

              {/* Original vector */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {person1.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5 + i * 0.2 }}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono"
                  >
                    {val}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="text-xl font-bold text-gray-600"
              >
                =
              </motion.span>

              {/* Scaled result */}
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">[</span>
                {scaled.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 4 + i * 0.2 }}
                    className="bg-orange-100 text-orange-800 px-2 py-1 rounded font-mono"
                  >
                    {val}
                  </motion.div>
                ))}
                <span className="text-gray-400">]</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderLinearAlgebra = () => {
    const person1 = [170, 70, 25];
    const person2 = [165, 65, 30];
    const dotProduct = person1.reduce(
      (sum, val, i) => sum + val * person2[i],
      0,
    );
    const magnitude1 = Math.sqrt(
      person1.reduce((sum, val) => sum + val * val, 0),
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Linear Algebra Operations
          </h4>
          <p className="text-gray-600 text-sm">
            Advanced mathematical computations
          </p>
        </div>

        {/* Dot Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">
            Dot Product Calculation
          </h5>

          <div className="space-y-4">
            {/* Formula */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm font-mono text-center">
                v₁ · v₂ = x₁y₁ + x₂y₂ + x₃y₃
              </div>
            </div>

            {/* Step by step calculation */}
            <div className="space-y-2">
              {person1.map((val1, i) => {
                const val2 = person2[i];
                const product = val1 * val2;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5 }}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                        {val1}
                      </div>
                      <span>×</span>
                      <div className="bg-red-100 text-red-800 px-2 py-1 rounded font-mono">
                        {val2}
                      </div>
                      <span>=</span>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded font-mono">
                        {product}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {i === 0 ? "Height" : i === 1 ? "Weight" : "Age"}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Final result */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
            >
              <div className="text-lg font-bold text-green-800">
                Dot Product = {dotProduct.toLocaleString()}
              </div>
              <div className="text-sm text-green-600 mt-1">
                Measures similarity between vectors
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vector Magnitude */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">
            Vector Magnitude (Length)
          </h5>

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="text-sm font-mono text-center">
                ||v|| = √(x₁² + x₂² + x₃²)
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <div className="text-sm font-mono">
                ||person1|| = √({person1[0]}² + {person1[1]}² + {person1[2]}²) ={" "}
                {magnitude1.toFixed(2)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderStatistics = () => {
    const data = [
      [170, 70, 25],
      [165, 65, 30],
    ];
    const means = [167.5, 67.5, 27.5];
    const stds = [2.5, 2.5, 2.5];

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Statistical Analysis
          </h4>
          <p className="text-gray-600 text-sm">
            Understanding data through statistics
          </p>
        </div>

        {/* Data visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">Dataset Overview</h5>

          <div className="grid grid-cols-3 gap-4">
            {["Height (cm)", "Weight (kg)", "Age (years)"].map(
              (label, colIndex) => (
                <div key={colIndex} className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </div>
                  <div className="space-y-2">
                    {data.map((person, rowIndex) => (
                      <motion.div
                        key={rowIndex}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: colIndex * 0.2 + rowIndex * 0.1 }}
                        className={`p-2 rounded text-sm font-mono ${
                          rowIndex === 0
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {person[colIndex]}
                      </motion.div>
                    ))}
                  </div>

                  {/* Statistics */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + colIndex * 0.2 }}
                    className="mt-4 space-y-1"
                  >
                    <div className="bg-green-50 border border-green-200 p-2 rounded">
                      <div className="text-xs text-green-600">Mean</div>
                      <div className="font-mono text-green-800">
                        {means[colIndex]}
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 p-2 rounded">
                      <div className="text-xs text-orange-600">Std Dev</div>
                      <div className="font-mono text-orange-800">
                        {stds[colIndex]}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ),
            )}
          </div>
        </motion.div>

        {/* Statistical formulas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h5 className="font-medium text-gray-800 mb-4">
            Statistical Formulas
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm font-medium text-green-800 mb-2">
                Mean (Average)
              </div>
              <div className="font-mono text-sm text-green-700">
                μ = (Σx) / n
              </div>
              <div className="text-xs text-green-600 mt-2">
                Sum of all values divided by count
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm font-medium text-orange-800 mb-2">
                Standard Deviation
              </div>
              <div className="font-mono text-sm text-orange-700">
                σ = √(Σ(x - μ)² / n)
              </div>
              <div className="text-xs text-orange-600 mt-2">
                Measures spread of data around mean
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          NumPy Operations Visualization
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
          >
            <span>{autoPlay ? "⏸️" : "▶️"}</span>
            <span>{autoPlay ? "Pause" : "Auto Play"}</span>
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {operation === "array-creation" && renderArrayCreation()}
      {operation === "arithmetic" && renderArithmetic()}
      {operation === "linear-algebra" && renderLinearAlgebra()}
      {operation === "statistics" && renderStatistics()}
    </div>
  );
};

export default NumPyVisualization;
