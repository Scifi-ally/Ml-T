import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingSpinner from '@/components/LoadingSpinner';
import { dataService, ProjectData } from '@/lib/dataService';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle,
  Download,
  Code,
  FileText,
  GitBranch,
  ExternalLink,
  Clock,
  Users,
  Star,
  Target,
  Layers
} from 'lucide-react';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const projects = dataService.getProjectData();
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject || null);
      setIsLoading(false);
    };

    loadProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner size="lg" text="Loading project details..." />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested project could not be found.</p>
          <Link to="/ml-course">
            <Button variant="outline">Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completedSteps = project.steps?.filter(step => step.completed).length || 0;
  const progressPercent = project.steps ? (completedSteps / project.steps.length) * 100 : 0;

  const toggleStepCompletion = (stepIndex: number) => {
    if (project.steps) {
      project.steps[stepIndex].completed = !project.steps[stepIndex].completed;
      setCurrentStep(stepIndex + 1);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-600';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-rose-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/ml-course" className="flex items-center text-foreground hover:text-muted-foreground transition-colors group">
                <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Course
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">{project.title}</h1>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-foreground">
                Progress: <span className="font-semibold">{completedSteps}/{project.steps?.length || 0} steps</span>
              </div>
              <Progress value={progressPercent} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Overview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card border border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${getDifficultyColor(project.difficulty)} rounded-lg flex items-center justify-center`}>
                      <Code className="w-4 h-4 text-white" />
                    </div>
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${getDifficultyColor(project.difficulty)} text-white`}
                    >
                      {project.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-xs">Duration</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">{project.estimatedHours}h</div>
                    </div>
                    <div>
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Layers className="w-4 h-4 mr-1" />
                        <span className="text-xs">Steps</span>
                      </div>
                      <div className="text-lg font-semibold text-foreground">{project.steps?.length || 0}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.steps && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Progress</h4>
                      <div className="space-y-2">
                        {project.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle 
                              className={`w-4 h-4 ${step.completed ? 'text-green-500' : 'text-muted-foreground'}`}
                            />
                            <span className={`text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resources
                    </Button>
                    <Button variant="outline" className="w-full">
                      <GitBranch className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Project Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Project Header Info */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-foreground">{project.title}</h2>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <Card className="bg-muted/30 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-foreground">Real-world Impact</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.realWorldApplication}</p>
                  </Card>
                  
                  <Card className="bg-muted/30 p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-foreground">Industry Relevance</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.industryRelevance}</p>
                  </Card>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
                  <TabsTrigger value="overview" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="steps" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Implementation
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">What You'll Learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {project.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="steps" className="space-y-6">
                  {project.steps?.map((step, index) => (
                    <Card key={index} className="bg-card border border-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step.completed ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <CardTitle className="text-foreground">{step.title}</CardTitle>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {step.estimatedMinutes} minutes
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={step.completed ? "default" : "outline"}
                            onClick={() => toggleStepCompletion(index)}
                          >
                            {step.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{step.description}</p>
                        
                        {step.theory && (
                          <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              Theory
                            </h5>
                            <p className="text-sm text-muted-foreground">{step.theory}</p>
                          </div>
                        )}

                        {step.codeExample && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-foreground flex items-center">
                                <Code className="w-4 h-4 mr-2" />
                                Code Example
                              </h5>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(step.codeExample)}
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Copy
                              </Button>
                            </div>
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                              <code>{step.codeExample}</code>
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Documentation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Project README
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          API Documentation
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Code className="w-4 h-4 mr-2" />
                          Code Templates
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">External Resources</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <GitBranch className="w-4 h-4 mr-2" />
                          GitHub Repository
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Dataset Download
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
