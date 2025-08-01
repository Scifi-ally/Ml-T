import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  ChevronLeft, 
  Play, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Globe,
  Database,
  Server,
  Smartphone,
  Shield,
  Zap,
  Palette,
  Settings
} from 'lucide-react';

const WebDev = () => {
  const modules = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      duration: "8 hours",
      lessons: 15,
      description: "Master the building blocks of web development",
      icon: Globe,
      color: "bg-orange-500",
      progress: 0,
      topics: [
        "HTML5 Semantic Elements",
        "CSS Grid & Flexbox",
        "Responsive Design Principles",
        "CSS Animations & Transitions",
        "Accessibility Best Practices",
        "Modern CSS Features"
      ]
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      duration: "12 hours",
      lessons: 20,
      description: "From basics to advanced JavaScript concepts",
      icon: Code,
      color: "bg-yellow-500",
      progress: 0,
      topics: [
        "ES6+ Modern Features",
        "Async/Await & Promises",
        "DOM Manipulation",
        "Event Handling",
        "Modules & Bundling",
        "Testing with Jest"
      ]
    },
    {
      id: 3,
      title: "React Development",
      duration: "14 hours",
      lessons: 22,
      description: "Build modern user interfaces with React",
      icon: Zap,
      color: "bg-blue-500",
      progress: 0,
      topics: [
        "Components & JSX",
        "State Management",
        "React Router",
        "Context API",
        "Custom Hooks",
        "Performance Optimization"
      ]
    },
    {
      id: 4,
      title: "TypeScript for Web",
      duration: "6 hours",
      lessons: 10,
      description: "Add type safety to your JavaScript applications",
      icon: Shield,
      color: "bg-blue-600",
      progress: 0,
      topics: [
        "TypeScript Fundamentals",
        "Types & Interfaces",
        "Generics",
        "React with TypeScript",
        "Advanced Types",
        "Configuration & Setup"
      ]
    },
    {
      id: 5,
      title: "Styling & Design Systems",
      duration: "8 hours",
      lessons: 12,
      description: "Create beautiful and consistent user interfaces",
      icon: Palette,
      color: "bg-pink-500",
      progress: 0,
      topics: [
        "Design Principles",
        "TailwindCSS Mastery",
        "Component Libraries",
        "CSS-in-JS Solutions",
        "Theme Management",
        "Design Tokens"
      ]
    },
    {
      id: 6,
      title: "Backend Development",
      duration: "16 hours",
      lessons: 25,
      description: "Server-side development with Node.js",
      icon: Server,
      color: "bg-green-500",
      progress: 0,
      topics: [
        "Node.js & Express",
        "RESTful API Design",
        "Authentication & Authorization",
        "Middleware & Error Handling",
        "File Uploads & Processing",
        "API Documentation"
      ]
    },
    {
      id: 7,
      title: "Database Management",
      duration: "10 hours",
      lessons: 16,
      description: "Work with both SQL and NoSQL databases",
      icon: Database,
      color: "bg-purple-500",
      progress: 0,
      topics: [
        "SQL Fundamentals",
        "PostgreSQL Advanced",
        "MongoDB & Mongoose",
        "Database Design",
        "Migrations & Seeding",
        "Performance Optimization"
      ]
    },
    {
      id: 8,
      title: "Full-Stack Integration",
      duration: "12 hours",
      lessons: 18,
      description: "Connect frontend and backend applications",
      icon: Settings,
      color: "bg-indigo-500",
      progress: 0,
      topics: [
        "API Integration",
        "State Management",
        "Real-time Features",
        "File Upload Systems",
        "Error Handling",
        "Testing Strategies"
      ]
    },
    {
      id: 9,
      title: "Deployment & DevOps",
      duration: "8 hours",
      lessons: 12,
      description: "Deploy and maintain web applications",
      icon: Zap,
      color: "bg-cyan-500",
      progress: 0,
      topics: [
        "Git Workflows",
        "CI/CD Pipelines",
        "Docker Containers",
        "Cloud Deployment",
        "Monitoring & Logging",
        "Performance Optimization"
      ]
    },
    {
      id: 10,
      title: "Advanced Topics",
      duration: "10 hours",
      lessons: 15,
      description: "Modern web development patterns and practices",
      icon: Code,
      color: "bg-red-500",
      progress: 0,
      topics: [
        "Microservices Architecture",
        "GraphQL APIs",
        "PWA Development",
        "WebAssembly",
        "Performance Monitoring",
        "Security Best Practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6 text-brand-500" />
                <span className="font-semibold text-lg">Full-Stack Web Development</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: <span className="font-semibold">0/165 lessons</span>
              </div>
              <Progress value={0} className="w-24" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Full-Stack Web Development</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Master modern web development from frontend to backend. Build complete web applications 
            with React, Node.js, databases, and deployment strategies.
          </p>
        </div>

        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-6">
            <div className="grid gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <Card key={module.id} className="group hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <CardTitle className="text-xl">{module.title}</CardTitle>
                              <Badge variant="outline">Module {module.id}</Badge>
                            </div>
                            <CardDescription className="text-base mb-3">
                              {module.description}
                            </CardDescription>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {module.duration}
                              </div>
                              <div className="flex items-center">
                                <BookOpen className="w-4 h-4 mr-1" />
                                {module.lessons} lessons
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Module
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-semibold">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                        
                        <div className="grid md:grid-cols-2 gap-2 pt-2">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 mr-2 text-gray-400" />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Portfolio</CardTitle>
                  <CardDescription>Build a responsive portfolio website with modern design</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary">Beginner</Badge>
                    <p className="text-sm text-gray-600">
                      HTML, CSS, JavaScript fundamentals with responsive design and animations.
                    </p>
                    <Button className="w-full">Start Project</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Todo App with React</CardTitle>
                  <CardDescription>Interactive todo application with local storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary">Intermediate</Badge>
                    <p className="text-sm text-gray-600">
                      React components, state management, and local data persistence.
                    </p>
                    <Button className="w-full">Start Project</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Platform</CardTitle>
                  <CardDescription>Full-stack e-commerce with payment integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary">Advanced</Badge>
                    <p className="text-sm text-gray-600">
                      Complete CRUD operations, user authentication, and payment processing.
                    </p>
                    <Button className="w-full">Start Project</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Dashboard</CardTitle>
                  <CardDescription>Real-time dashboard with data visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary">Advanced</Badge>
                    <p className="text-sm text-gray-600">
                      WebSocket connections, charts, real-time updates, and responsive design.
                    </p>
                    <Button className="w-full">Start Project</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>Ready-to-use code snippets and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• React Component Library</li>
                    <li>• API Integration Examples</li>
                    <li>• Authentication Patterns</li>
                    <li>• Responsive Design Templates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development Tools</CardTitle>
                  <CardDescription>Essential tools and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• VS Code Extensions</li>
                    <li>• Webpack Configurations</li>
                    <li>• ESLint & Prettier Setup</li>
                    <li>• Docker Templates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deployment Guides</CardTitle>
                  <CardDescription>Step-by-step deployment instructions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Netlify Deployment</li>
                    <li>• Vercel Setup</li>
                    <li>• AWS Deployment</li>
                    <li>• Custom Domain Setup</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WebDev;
