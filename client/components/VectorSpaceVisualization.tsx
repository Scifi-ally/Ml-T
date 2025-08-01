import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VectorSpaceVisualizationProps {
  concept: 'vector-space' | 'linear-independence' | 'vector-operations' | 'axioms';
  step?: number;
}

const VectorSpaceVisualization: React.FC<VectorSpaceVisualizationProps> = ({ concept, step = 0 }) => {
  const [activeAnimation, setActiveAnimation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveAnimation(prev => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const renderVectorSpace = () => (
    <div className="relative w-full h-96 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Axes */}
        <line x1="0" y1="192" x2="400" y2="192" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="200" y1="384" x2="200" y2="0" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        
        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
        </defs>
        
        {/* Axis labels */}
        <text x="390" y="210" className="text-sm font-medium fill-gray-600">x₁</text>
        <text x="210" y="15" className="text-sm font-medium fill-gray-600">x₂</text>
      </svg>

      {/* Animated vectors */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          {/* Vector v1 */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.line
              x1="200" y1="192"
              x2="280" y2="112"
              stroke="#3b82f6"
              strokeWidth="3"
              markerEnd="url(#bluearrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <defs>
              <marker id="bluearrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
          </motion.svg>
          
          {/* Vector v2 */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.line
              x1="200" y1="192"
              x2="320" y2="272"
              stroke="#ef4444"
              strokeWidth="3"
              markerEnd="url(#redarrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2 }}
            />
            <defs>
              <marker id="redarrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
            </defs>
          </motion.svg>

          {/* Labels */}
          <motion.div
            className="absolute"
            style={{ left: '290px', top: '100px' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: 'spring' }}
          >
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
              v₁ = [3, -2]
            </div>
          </motion.div>
          
          <motion.div
            className="absolute"
            style={{ left: '330px', top: '280px' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, type: 'spring' }}
          >
            <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              v₂ = [4, 2]
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const renderLinearIndependence = () => {
    const [showDependent, setShowDependent] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setShowDependent(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !showDependent 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
            }`}
          >
            ✅ Independent Vectors
          </button>
          <button
            onClick={() => setShowDependent(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showDependent 
                ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
            }`}
          >
            ❌ Dependent Vectors
          </button>
        </div>

        <div className="relative w-full h-96 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {/* Grid and axes (same as before) */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1="192" x2="400" y2="192" stroke="#374151" strokeWidth="2"/>
            <line x1="200" y1="384" x2="200" y2="0" stroke="#374151" strokeWidth="2"/>
            
            {/* Show different vector relationships */}
            <AnimatePresence mode="wait">
              {!showDependent ? (
                // Independent vectors
                <motion.g
                  key="independent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.line
                    x1="200" y1="192"
                    x2="280" y2="112"
                    stroke="#10b981"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.line
                    x1="200" y1="192"
                    x2="120" y2="272"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </motion.g>
              ) : (
                // Dependent vectors (parallel)
                <motion.g
                  key="dependent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.line
                    x1="200" y1="192"
                    x2="280" y2="112"
                    stroke="#ef4444"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.line
                    x1="200" y1="192"
                    x2="320" y2="72"
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeDasharray="8,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          {/* Mathematical explanation */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className={`p-3 rounded-lg ${
              showDependent 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <div className="text-sm font-medium">
                {showDependent ? (
                  <span className="text-red-800">
                    ❌ v₂ = 2v₁ (one is a multiple of the other)
                  </span>
                ) : (
                  <span className="text-green-800">
                    ✅ No combination c₁v₁ + c₂v₂ = 0 except c₁ = c₂ = 0
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderVectorOperations = () => {
    const [operation, setOperation] = useState<'addition' | 'scalar' | 'dot'>('addition');
    
    return (
      <div className="space-y-4">
        <div className="flex justify-center space-x-2 mb-4">
          {[
            { key: 'addition', label: 'Vector Addition', icon: '➕' },
            { key: 'scalar', label: 'Scalar Multiplication', icon: '✖️' },
            { key: 'dot', label: 'Dot Product', icon: '•' }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setOperation(key as any)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                operation === key
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="relative w-full h-80 bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
            {/* Grid */}
            <defs>
              <pattern id="opGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#opGrid)" />
            <line x1="0" y1="160" x2="400" y2="160" stroke="#374151" strokeWidth="2"/>
            <line x1="200" y1="320" x2="200" y2="0" stroke="#374151" strokeWidth="2"/>

            <AnimatePresence mode="wait">
              {operation === 'addition' && (
                <motion.g
                  key="addition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Vector A */}
                  <motion.line
                    x1="200" y1="160"
                    x2="260" y2="120"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Vector B */}
                  <motion.line
                    x1="200" y1="160"
                    x2="240" y2="200"
                    stroke="#ef4444"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  {/* Vector B starting from end of A */}
                  <motion.line
                    x1="260" y1="120"
                    x2="300" y2="160"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                  {/* Resultant vector A + B */}
                  <motion.line
                    x1="200" y1="160"
                    x2="300" y2="160"
                    stroke="#10b981"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                </motion.g>
              )}

              {operation === 'scalar' && (
                <motion.g
                  key="scalar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Original vector */}
                  <motion.line
                    x1="200" y1="160"
                    x2="260" y2="120"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Scaled vector (2x) */}
                  <motion.line
                    x1="200" y1="160"
                    x2="320" y2="80"
                    stroke="#ef4444"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  {/* Scaled vector (0.5x) */}
                  <motion.line
                    x1="200" y1="160"
                    x2="230" y2="140"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                  />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>

          {/* Operation explanation */}
          <motion.div
            className="absolute bottom-4 left-4 right-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              {operation === 'addition' && (
                <div className="text-sm">
                  <span className="text-blue-600 font-medium">Blue vector</span> + 
                  <span className="text-red-600 font-medium"> Red vector</span> = 
                  <span className="text-green-600 font-medium"> Green result</span>
                  <div className="text-gray-600 mt-1">Vector addition: tip-to-tail method</div>
                </div>
              )}
              {operation === 'scalar' && (
                <div className="text-sm">
                  <span className="text-blue-600 font-medium">Original</span>, 
                  <span className="text-red-600 font-medium"> 2× scaled</span>, 
                  <span className="text-green-600 font-medium"> 0.5× scaled</span>
                  <div className="text-gray-600 mt-1">Scalar multiplication changes magnitude, preserves direction</div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderAxioms = () => {
    const axioms = [
      { 
        title: "Associativity of Addition", 
        formula: "(u + v) + w = u + (v + w)",
        description: "Vector addition can be grouped in any order"
      },
      { 
        title: "Commutativity of Addition", 
        formula: "u + v = v + u",
        description: "Order doesn't matter in vector addition"
      },
      { 
        title: "Identity Element", 
        formula: "v + 0 = v",
        description: "Zero vector doesn't change other vectors"
      },
      { 
        title: "Inverse Elements", 
        formula: "v + (-v) = 0",
        description: "Every vector has an opposite"
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {axioms.map((axiom, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                {index + 1}
              </div>
              <h4 className="font-medium text-gray-800">{axiom.title}</h4>
            </div>
            <div className="bg-gray-50 rounded p-3 mb-3 font-mono text-sm">
              {axiom.formula}
            </div>
            <p className="text-gray-600 text-sm">{axiom.description}</p>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Visual Learning</h3>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <span>{isPlaying ? '⏸️' : '▶️'}</span>
          <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'} Animation</span>
        </button>
      </div>

      {concept === 'vector-space' && renderVectorSpace()}
      {concept === 'linear-independence' && renderLinearIndependence()}
      {concept === 'vector-operations' && renderVectorOperations()}
      {concept === 'axioms' && renderAxioms()}
    </div>
  );
};

export default VectorSpaceVisualization;
