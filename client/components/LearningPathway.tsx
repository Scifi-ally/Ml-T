import React from "react";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

interface PathStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface LearningPathwayProps {
  steps: PathStep[];
  className?: string;
}

const LearningPathway: React.FC<LearningPathwayProps> = ({
  steps,
  className = "",
}) => {
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 sm:p-6 transition-smooth card-interactive ${className}`}
    >
      <h4 className="text-sm font-semibold text-black mb-4">
        Your Learning Path
      </h4>

      <div className="space-y-3 mb-6">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center space-x-3 transition-smooth hover:bg-gray-50 -mx-2 px-2 py-1 rounded"
          >
            <div
              className={`flex-shrink-0 transition-smooth ${
                step.completed
                  ? "text-black"
                  : step.current
                    ? "text-black pulse-active"
                    : "text-gray-300"
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle
                  className={`w-4 h-4 ${step.current ? "fill-black" : ""}`}
                />
              )}
            </div>

            <div className="flex-1">
              <span
                className={`text-sm transition-smooth ${
                  step.current
                    ? "text-black font-medium"
                    : step.completed
                      ? "text-gray-700"
                      : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>

            {step.current && (
              <div className="text-black pulse-active">
                <ArrowRight className="w-3 h-3" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-200 rounded-full h-2 mb-3 progress-bar">
        <div
          className="bg-black h-2 rounded-full progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="text-xs text-gray-500 text-center">
        {completedSteps} of {steps.length} modules completed
      </div>
    </div>
  );
};

export default LearningPathway;
