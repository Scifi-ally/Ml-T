import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptExplorerProps {
  concepts: Array<{
    title: string;
    description: string;
    example: string;
    visualization: 'array' | 'operation' | 'formula';
    data?: any;
  }>;
}

const ConceptExplorer: React.FC<ConceptExplorerProps> = ({ concepts }) => {
  const [activeConcept, setActiveConcept] = useState(0);

  const renderVisualization = (type: string, data: any) => {
    switch (type) {
      case 'array':
        return (
          <div className="flex items-center justify-center space-x-2 p-4">
            <span className="text-gray-400 text-xl">[</span>
            {data?.values?.map((value: number, i: number) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-mono font-bold text-lg shadow-md"
              >
                {value}
              </motion.div>
            )) || [170, 70, 25].map((value, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg font-mono font-bold text-lg shadow-md"
              >
                {value}
              </motion.div>
            ))}
            <span className="text-gray-400 text-xl">]</span>
          </div>
        );
      
      case 'operation':
        return (
          <div className="p-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-mono">
                np.array([170, 70, 25])
              </div>
              <span className="text-2xl font-bold text-gray-600">+</span>
              <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-mono">
                np.array([165, 65, 30])
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">⬇️</div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-mono inline-block">
                [335, 135, 55]
              </div>
            </div>
          </div>
        );
      
      case 'formula':
        return (
          <div className="p-6 bg-gray-900 text-green-400 rounded-lg font-mono">
            <div className="text-center space-y-2">
              <div className="text-lg">import numpy as np</div>
              <div className="text-lg">person1 = np.array([170, 70, 25])</div>
              <div className="text-lg">person2 = np.array([165, 65, 30])</div>
              <div className="text-lg text-yellow-400">combined = person1 + person2</div>
              <div className="text-lg text-blue-400">print(combined)</div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Concept Tabs */}
      <div className="flex border-b border-gray-200">
        {concepts.map((concept, index) => (
          <button
            key={index}
            onClick={() => setActiveConcept(index)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeConcept === index
                ? 'bg-blue-50 text-blue-800 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {concept.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeConcept}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {concepts[activeConcept].title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {concepts[activeConcept].description}
              </p>
            </div>

            {/* Visualization */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg">
              {renderVisualization(
                concepts[activeConcept].visualization,
                concepts[activeConcept].data
              )}
            </div>

            {/* Example */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-sm font-medium text-yellow-800 mb-2">
                💡 Example Application
              </div>
              <div className="text-yellow-700 text-sm">
                {concepts[activeConcept].example}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ConceptExplorer;
