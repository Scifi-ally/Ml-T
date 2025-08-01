import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Brain } from "lucide-react";
import StudyTechniques from "@/components/StudyTechniques";

const Practice = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link
              to="/ml-course"
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course
            </Link>

            <div className="h-4 w-px bg-gray-300" />

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-black">
                  Advanced Practice
                </h1>
                <p className="text-xs text-gray-600">
                  Scientifically-proven learning techniques
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <StudyTechniques />
    </div>
  );
};

export default Practice;
