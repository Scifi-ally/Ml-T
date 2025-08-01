import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Clock,
  RefreshCw,
  Target,
  Zap,
  BookOpen,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  Award,
  Lightbulb,
  MessageSquare,
  BarChart3,
} from "lucide-react";

interface SpacedRepetitionCard {
  id: string;
  concept: string;
  question: string;
  answer: string;
  difficulty: number; // 1-5
  nextReview: Date;
  interval: number; // days
  easeFactor: number;
  reviews: number;
  successRate: number;
}

interface StudySession {
  id: string;
  technique: "spaced-repetition" | "feynman" | "active-recall" | "interleaving";
  startTime: Date;
  endTime?: Date;
  cardsReviewed: number;
  accuracy: number;
  concepts: string[];
}

const StudyTechniques: React.FC = () => {
  const [activeTab, setActiveTab] = useState("spaced-repetition");
  const [cards, setCards] = useState<SpacedRepetitionCard[]>([]);
  const [currentCard, setCurrentCard] = useState<SpacedRepetitionCard | null>(
    null,
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    cardsReviewed: 0,
    correctAnswers: 0,
    sessionTime: 0,
  });
  const [feynmanMode, setFeynmanMode] = useState(false);
  const [feynmanExplanation, setFeynmanExplanation] = useState("");

  // Initialize sample cards based on ML concepts
  useEffect(() => {
    const sampleCards: SpacedRepetitionCard[] = [
      {
        id: "1",
        concept: "Neural Networks",
        question:
          "What is the Universal Approximation Theorem and why is it important for neural networks?",
        answer:
          "The Universal Approximation Theorem states that a feedforward neural network with a single hidden layer containing a finite number of neurons can approximate any continuous function on compact subsets of Rⁿ, under mild assumptions on the activation function. This is important because it provides theoretical justification that neural networks can learn any pattern, given sufficient capacity.",
        difficulty: 3,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        interval: 1,
        easeFactor: 2.5,
        reviews: 0,
        successRate: 0,
      },
      {
        id: "2",
        concept: "Backpropagation",
        question: "Explain how backpropagation computes gradients efficiently.",
        answer:
          "Backpropagation uses the chain rule of calculus to efficiently compute gradients by propagating errors backward through the network. It works in two phases: forward pass (compute outputs) and backward pass (compute gradients). The key insight is that gradients can be computed layer by layer, reusing intermediate computations to avoid redundant calculations.",
        difficulty: 4,
        nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        interval: 2,
        easeFactor: 2.3,
        reviews: 1,
        successRate: 100,
      },
      {
        id: "3",
        concept: "Bias-Variance Tradeoff",
        question:
          "What is the bias-variance tradeoff and how does it relate to overfitting?",
        answer:
          "The bias-variance tradeoff describes the fundamental tension between model simplicity and complexity. Bias measures how far off predictions are on average (underfitting), while variance measures how much predictions vary with different training sets (overfitting). Total error = bias² + variance + irreducible error. The goal is to find the sweet spot that minimizes total error.",
        difficulty: 3,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000),
        interval: 1,
        easeFactor: 2.5,
        reviews: 0,
        successRate: 0,
      },
    ];
    setCards(sampleCards);
    setCurrentCard(sampleCards[0]);
  }, []);

  // Spaced Repetition Algorithm (SM-2)
  const updateCardDifficulty = (
    card: SpacedRepetitionCard,
    quality: number,
  ) => {
    let newInterval = card.interval;
    let newEaseFactor = card.easeFactor;

    if (quality >= 3) {
      // Correct answer
      if (card.reviews === 0) {
        newInterval = 1;
      } else if (card.reviews === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(card.interval * card.easeFactor);
      }
    } else {
      // Incorrect answer
      newInterval = 1;
    }

    newEaseFactor =
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    newEaseFactor = Math.max(1.3, newEaseFactor);

    const nextReview = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000);

    return {
      ...card,
      interval: newInterval,
      easeFactor: newEaseFactor,
      nextReview,
      reviews: card.reviews + 1,
      successRate:
        (card.successRate * card.reviews + (quality >= 3 ? 100 : 0)) /
        (card.reviews + 1),
    };
  };

  const handleCardResponse = (quality: number) => {
    if (!currentCard) return;

    const updatedCard = updateCardDifficulty(currentCard, quality);
    const updatedCards = cards.map((card) =>
      card.id === currentCard.id ? updatedCard : card,
    );

    setCards(updatedCards);
    setSessionStats((prev) => ({
      cardsReviewed: prev.cardsReviewed + 1,
      correctAnswers: prev.correctAnswers + (quality >= 3 ? 1 : 0),
      sessionTime: prev.sessionTime,
    }));

    // Move to next card
    const nextCardIndex =
      cards.findIndex((card) => card.id === currentCard.id) + 1;
    if (nextCardIndex < cards.length) {
      setCurrentCard(cards[nextCardIndex]);
    } else {
      setCurrentCard(cards[0]); // Loop back to first card
    }

    setShowAnswer(false);
  };

  const getDueCards = () => {
    const now = new Date();
    return cards.filter((card) => card.nextReview <= now);
  };

  const getCardsDueToday = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return cards.filter((card) => card.nextReview <= today).length;
  };

  const accuracy =
    sessionStats.cardsReviewed > 0
      ? (sessionStats.correctAnswers / sessionStats.cardsReviewed) * 100
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          Advanced Study Techniques
        </h1>
        <p className="text-gray-600">
          Master machine learning concepts using scientifically-proven learning
          methods
        </p>
      </div>

      {/* Session Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-black">
              {sessionStats.cardsReviewed}
            </div>
            <div className="text-sm text-gray-600">Cards Reviewed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-black">
              {accuracy.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-black">
              {getCardsDueToday()}
            </div>
            <div className="text-sm text-gray-600">Due Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-black">{cards.length}</div>
            <div className="text-sm text-gray-600">Total Cards</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="spaced-repetition" className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Spaced Repetition
          </TabsTrigger>
          <TabsTrigger value="feynman" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Feynman Technique
          </TabsTrigger>
          <TabsTrigger value="active-recall" className="flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Active Recall
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Spaced Repetition */}
        <TabsContent value="spaced-repetition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2" />
                Spaced Repetition System
              </CardTitle>
              <CardDescription>
                Optimize long-term retention using scientifically-proven
                intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentCard && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{currentCard.concept}</Badge>
                    <div className="text-sm text-gray-600">
                      Reviews: {currentCard.reviews} | Success Rate:{" "}
                      {currentCard.successRate.toFixed(0)}%
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-medium text-blue-900 mb-3">
                      Question:
                    </h3>
                    <p className="text-blue-800 leading-relaxed">
                      {currentCard.question}
                    </p>
                  </div>

                  {!showAnswer ? (
                    <div className="text-center">
                      <Button
                        onClick={() => setShowAnswer(true)}
                        className="bg-black text-white px-8 py-3"
                      >
                        Show Answer
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-medium text-green-900 mb-3">
                          Answer:
                        </h3>
                        <p className="text-green-800 leading-relaxed">
                          {currentCard.answer}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-600 mb-4">
                          How well did you know this?
                        </p>
                        <div className="flex justify-center space-x-3">
                          <Button
                            onClick={() => handleCardResponse(1)}
                            variant="outline"
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Hard (1)
                          </Button>
                          <Button
                            onClick={() => handleCardResponse(3)}
                            variant="outline"
                            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Good (3)
                          </Button>
                          <Button
                            onClick={() => handleCardResponse(5)}
                            variant="outline"
                            className="border-green-300 text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Easy (5)
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feynman Technique */}
        <TabsContent value="feynman" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Feynman Technique
              </CardTitle>
              <CardDescription>
                Explain concepts in simple terms to identify knowledge gaps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-900 mb-2">
                  Today's Concept: Neural Networks
                </h3>
                <p className="text-yellow-800 text-sm">
                  Explain how neural networks learn, as if teaching a
                  12-year-old
                </p>
              </div>

              <div className="space-y-4">
                <textarea
                  value={feynmanExplanation}
                  onChange={(e) => setFeynmanExplanation(e.target.value)}
                  placeholder="Start explaining the concept in simple terms..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Words:{" "}
                    {
                      feynmanExplanation
                        .split(" ")
                        .filter((word) => word.length > 0).length
                    }
                  </div>
                  <Button className="bg-black text-white">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Feedback
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Step 1: Explain
                  </h4>
                  <p className="text-blue-800 text-sm">
                    Write your explanation using simple language
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">
                    Step 2: Identify Gaps
                  </h4>
                  <p className="text-green-800 text-sm">
                    Find areas where your explanation breaks down
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">
                    Step 3: Simplify
                  </h4>
                  <p className="text-purple-800 text-sm">
                    Use analogies and remove jargon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Recall */}
        <TabsContent value="active-recall" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Active Recall Practice
              </CardTitle>
              <CardDescription>
                Test your knowledge without looking at notes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">
                  Quick Recall Challenge
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        What is overfitting?
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Recall
                        </Button>
                        <Button size="sm" variant="ghost">
                          Skip
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Explain gradient descent
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Recall
                        </Button>
                        <Button size="sm" variant="ghost">
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        What is cross-validation?
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Recall
                        </Button>
                        <Button size="sm" variant="ghost">
                          Skip
                        </Button>
                      </div>
                    </div>
                    <div className="p-3 bg-white border border-gray-200 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">
                        Bias vs Variance
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button size="sm" variant="outline">
                          Recall
                        </Button>
                        <Button size="sm" variant="ghost">
                          Skip
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {card.concept}
                        </p>
                        <p className="text-sm text-gray-600">
                          {card.reviews} reviews | {card.successRate.toFixed(0)}
                          % success
                        </p>
                      </div>
                      <Progress value={card.successRate} className="w-20 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Study Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">Today</p>
                      <p className="text-sm text-blue-700">
                        {getCardsDueToday()} cards due
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Due</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Tomorrow</p>
                      <p className="text-sm text-gray-600">3 cards due</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">This Week</p>
                      <p className="text-sm text-gray-600">12 cards due</p>
                    </div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyTechniques;
