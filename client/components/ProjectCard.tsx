import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Clock,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Layers,
  Target,
} from "lucide-react";
import { ProjectData } from "@/lib/dataService";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  completionPercentage?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  completionPercentage = 0,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-gray-100 text-black";
      case "intermediate":
        return "bg-gray-200 text-black";
      case "advanced":
        return "bg-gray-300 text-black";
      default:
        return "bg-gray-100 text-black";
    }
  };

  const completedSteps = project.steps.filter((step) => step.completed).length;
  const projectProgress = (completedSteps / project.steps.length) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col card-interactive transition-smooth">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white micro-bounce">
              <Code2 className="w-5 h-5" />
            </div>
            <Badge
              className={`${getDifficultyColor(project.difficulty)} text-xs font-medium transition-smooth`}
            >
              {project.difficulty}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-amber-500">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-xs font-medium">4.8</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-black mb-2 leading-tight">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6">
        {/* Project Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-black">Duration</span>
            </div>
            <div className="text-lg font-bold text-black">
              {project.estimatedHours}h
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Layers className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-black">Steps</span>
            </div>
            <div className="text-lg font-bold text-black">
              {project.steps.length}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {projectProgress > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-black">Progress</span>
              <span className="text-sm text-gray-500">
                {completedSteps}/{project.steps.length} steps
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-2 progress-bar">
              <div
                className="bg-black h-2 rounded-full progress-fill"
                style={{ width: `${projectProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{projectProgress.toFixed(0)}% complete</span>
              <span>
                ~
                {Math.round(
                  (project.estimatedHours * (100 - projectProgress)) / 100,
                )}
                h remaining
              </span>
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6">
          <div className="text-sm font-medium text-black mb-3">
            Technologies
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <Badge
                key={techIndex}
                variant="outline"
                className="text-xs bg-white border-gray-200 transition-smooth hover:bg-gray-50"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-500"
              >
                +{project.technologies.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Real-world Application */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-black">
              Real-world Impact
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {project.realWorldApplication}
          </p>
        </div>

        {/* Learning Objectives Preview */}
        <div className="mb-6">
          <div className="text-sm font-medium text-black mb-3">
            You'll Learn
          </div>
          <div className="space-y-2">
            {project.learningObjectives
              .slice(0, 2)
              .map((objective, objIndex) => (
                <div
                  key={objIndex}
                  className="flex items-start space-x-2 text-sm"
                >
                  <CheckCircle2 className="w-3 h-3 text-black mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{objective}</span>
                </div>
              ))}
            {project.learningObjectives.length > 2 && (
              <div className="text-sm text-gray-500 ml-5">
                +{project.learningObjectives.length - 2} more objectives
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 pt-0">
        <Link to={`/project/${project.id}`} className="block">
          <Button
            className="w-full bg-black text-white font-medium py-3 transition-smooth interactive-element btn-press"
            size="lg"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            {projectProgress > 0 ? "Continue Project" : "Start Project"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
