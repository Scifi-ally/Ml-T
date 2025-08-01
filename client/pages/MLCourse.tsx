import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ChevronLeft,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Target,
  Zap,
  CheckCircle,
  Calendar,
  BarChart3,
  Sparkles,
  Rocket,
  Keyboard,
  Search,
  Filter,
  Star,
} from "lucide-react";

import ModernCard from "@/components/ModernCard";
import ProjectCard from "@/components/ProjectCard";
import LearningPathway from "@/components/LearningPathway";

import {
  dataService,
  ModuleData,
  ProjectData,
  CourseStats,
} from "@/lib/dataService";

const MLCourse = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("curriculum");
  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [courseStats, setCourseStats] = useState<CourseStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  useEffect(() => {
    // Load data immediately
    const modules = dataService.getModuleData();
    const projects = dataService.getProjectData();
    const stats = dataService.calculateCourseStats();

    setModuleData(modules);
    setProjectData(projects);
    setCourseStats(stats);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "1":
            e.preventDefault();
            setSelectedTab("curriculum");
            break;
          case "2":
            e.preventDefault();
            setSelectedTab("projects");
            break;
          case "3":
            e.preventDefault();
            setSelectedTab("resources");
            break;
          case "k":
            e.preventDefault();
            setShowKeyboardShortcuts(!showKeyboardShortcuts);
            break;
          case "/":
            e.preventDefault();
            document.getElementById("search-input")?.focus();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showKeyboardShortcuts]);

  // Filter modules based on search, difficulty, and category
  const filteredModules = moduleData.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "all" || module.difficulty === filterDifficulty;
    const matchesCategory =
      filterCategory === "all" || module.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // Filter projects based on search and difficulty
  const filteredProjects = projectData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "all" || project.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handleTabChange = (value: string) => {
    if (value === selectedTab) return;
    setSelectedTab(value);
  };

  const handleStartModule = (moduleId: number) => {
    // Find first lesson in module
    const module = moduleData.find((m) => m.id === moduleId);
    if (module && module.lessons.length > 0) {
      navigate(`/ml-course/${moduleId}/${module.lessons[0].id}`);
    }
  };

  return (
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-black rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      {/* Enhanced Header with glassmorphism */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 flex-shrink-0">
        <div className="px-4 py-4 relative">
          {/* Animated border */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50" />

          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-black transition-all duration-300 group"
              >
                <div className="mr-1">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <span className="text-sm group-hover:underline">Back</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center relative overflow-hidden">
                <div>
                  <Brain className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-sm font-semibold text-black">
                ML Course
              </span>
            </div>

            {courseStats && (
              <div className="text-right">
                <div className="text-sm font-semibold text-black">
                  {courseStats.completionRate}%
                </div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-4 relative z-10 flex-1 overflow-y-auto">
        {/* Streamlined Hero Section */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight leading-tight">
              Complete AI/ML Mastery Program
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              700+ hours of comprehensive content covering fundamentals to
              cutting-edge research. From beginner-friendly basics to advanced
              AI systems used in industry.
            </p>
          </div>

          {courseStats && (
            <div className="flex items-center justify-center gap-4 sm:gap-6 max-w-xl mx-auto mb-4 px-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black mb-1">
                  {courseStats.completedLessons}/{courseStats.totalLessons}
                </div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black mb-1">
                  {courseStats.completionRate}%
                </div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
              <div className="w-px h-6 sm:h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black mb-1">
                  {courseStats.completedHours}h
                  <span className="text-sm text-gray-400 font-normal">
                    /700+
                  </span>
                </div>
                <div className="text-xs text-gray-500">Practiced</div>
              </div>
            </div>
          )}

          {/* Learning Pathway */}
          <div className="max-w-3xl mx-auto mb-4 px-4">
            <LearningPathway
              steps={[
                {
                  id: "1",
                  title: "Mathematics & Statistics Foundation",
                  completed: false,
                  current: true,
                },
                {
                  id: "2",
                  title: "Python for Data Science",
                  completed: false,
                  current: false,
                },
                {
                  id: "3",
                  title: "Machine Learning Fundamentals",
                  completed: false,
                  current: false,
                },
                {
                  id: "4",
                  title: "Advanced ML Techniques",
                  completed: false,
                  current: false,
                },
                {
                  id: "5",
                  title: "Real-world Projects",
                  completed: false,
                  current: false,
                },
              ]}
            />
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search modules and projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
                />
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth appearance-none bg-white text-sm"
                  >
                    <option value="all">All Topics</option>
                    <option value="fundamentals">🏗️ Fundamentals</option>
                    <option value="advanced">🚀 Advanced</option>
                    <option value="specialized">🎯 Specialized</option>
                    <option value="business">💼 Business</option>
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth appearance-none bg-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs
          value={selectedTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="mb-8">
            <div className="max-w-md mx-auto mb-8 px-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50 border border-gray-200 p-1 rounded-lg">
                <TabsTrigger
                  value="curriculum"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-medium py-2.5 rounded-md text-sm transition-smooth interactive-element"
                >
                  Learn{" "}
                  {filteredModules.length > 0 && `(${filteredModules.length})`}
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-medium py-2.5 rounded-md text-sm transition-smooth interactive-element"
                >
                  Build{" "}
                  {filteredProjects.length > 0 &&
                    `(${filteredProjects.length})`}
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-black data-[state=active]:text-white font-medium py-2.5 rounded-md text-sm transition-smooth interactive-element"
                >
                  Practice
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <div>
            <TabsContent value="curriculum" className="space-y-4 px-4">
              {filteredModules.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No modules found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 max-w-4xl mx-auto">
                  {filteredModules.map((module, index) => (
                    <div key={module.id} className="perspective-1000">
                      <ModernCard
                        module={module}
                        index={index}
                        onStartModule={handleStartModule}
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4 px-4">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProjectCard
                        project={project}
                        index={index}
                        completionPercentage={Math.random() * 100}
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-black mb-2">
                    Advanced Study Techniques
                  </h2>
                  <p className="text-gray-600">
                    Master ML concepts using scientifically-proven learning
                    methods
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
                  {[
                    {
                      title: "Spaced Repetition System",
                      description:
                        "Optimize long-term retention using scientifically-proven intervals based on forgetting curves",
                      icon: <BarChart3 className="w-8 h-8" />,
                      gradient: "from-gray-800 to-black",
                      features: [
                        "SM-2 algorithm implementation",
                        "Adaptive difficulty adjustment",
                        "Progress tracking and analytics",
                        "Optimal review scheduling",
                      ],
                      route: "/practice/spaced-repetition",
                    },
                    {
                      title: "Feynman Technique",
                      description:
                        "Learn by explaining concepts in simple terms to identify and fill knowledge gaps",
                      icon: <Zap className="w-8 h-8" />,
                      gradient: "from-gray-700 to-gray-900",
                      features: [
                        "Guided explanation prompts",
                        "AI-powered feedback",
                        "Complexity assessment",
                        "Iterative improvement tracking",
                      ],
                      route: "/practice/feynman",
                    },
                    {
                      title: "Active Recall Environment",
                      description:
                        "Test your knowledge without looking at notes using deliberate practice principles",
                      icon: <Target className="w-8 h-8" />,
                      gradient: "from-gray-600 to-gray-800",
                      features: [
                        "Concept-based questioning",
                        "Immediate feedback loops",
                        "Difficulty progression",
                        "Mastery verification",
                      ],
                      route: "/practice/active-recall",
                    },
                  ].map((technique, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-200"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${technique.gradient} rounded-xl flex items-center justify-center text-white mb-4`}
                      >
                        {technique.icon}
                      </div>

                      <h3 className="text-lg font-semibold text-black mb-3">
                        {technique.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {technique.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {technique.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-black flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-center">
                        <Link to="/practice">
                          <Button className="bg-black text-white font-medium py-2.5 px-6 rounded-lg transition-smooth interactive-element">
                            Start Practice
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Quick Study Session Preview
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-black mb-2">
                        Today's Focus: Neural Networks
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Cards due for review:</span>
                          <span className="font-medium text-black">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated time:</span>
                          <span className="font-medium text-black">15 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Difficulty level:</span>
                          <Badge variant="outline" className="text-xs">
                            Intermediate
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-black mb-2">
                        Learning Analytics
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Average retention:</span>
                          <span className="font-medium text-green-600">
                            87%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Study streak:</span>
                          <span className="font-medium text-black">
                            12 days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Concepts mastered:</span>
                          <span className="font-medium text-black">23/45</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MLCourse;
