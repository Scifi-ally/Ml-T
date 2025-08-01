import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, BarChart3, Target, Trophy } from 'lucide-react';

const Progress = () => {
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
                <BarChart3 className="w-6 h-6 text-brand-500" />
                <span className="font-semibold text-lg">Progress Tracker</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Progress</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your learning journey and achievements. This feature is coming soon!
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-brand-600" />
            </div>
            <CardTitle>Progress Tracking Coming Soon</CardTitle>
            <CardDescription>
              Comprehensive analytics and progress tracking for your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              We're building powerful progress tracking features including:
            </p>
            <ul className="text-left space-y-2 max-w-md mx-auto">
              <li className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-brand-500" />
                Detailed learning analytics
              </li>
              <li className="flex items-center">
                <Target className="w-4 h-4 mr-2 text-brand-500" />
                Goal setting and tracking
              </li>
              <li className="flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-brand-500" />
                Achievement badges
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/">
                <Button>Start Learning</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;
