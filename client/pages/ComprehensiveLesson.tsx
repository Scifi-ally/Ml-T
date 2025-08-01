import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ComprehensiveLessonViewer from "@/components/ComprehensiveLessonViewer";

const ComprehensiveLesson: React.FC = () => {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState<any>(null);

  useEffect(() => {
    // Generate comprehensive lesson data
    const generateLessonData = () => {
      return {
        id: lessonId,
        title: "Deep Learning Fundamentals: From Theory to Implementation",
        description:
          "Master neural networks through comprehensive theory, interactive visualizations, and hands-on coding exercises",
        totalEstimatedMinutes: 120,
        difficulty: "intermediate" as const,
        prerequisites: [
          "Linear Algebra",
          "Python Programming",
          "Basic Statistics",
        ],
        sections: [
          {
            id: "intro-theory",
            type: "theory" as const,
            title: "Neural Network Mathematical Foundations",
            content:
              "Neural networks are mathematical models inspired by biological neural systems. Each artificial neuron computes a weighted sum of its inputs, applies a bias term, and passes the result through an activation function. The mathematical representation is: output = activation(∑(weights × inputs) + bias). This simple computation, when combined in networks with multiple layers, enables the universal approximation property - the ability to approximate any continuous function given sufficient neurons and layers.",
            estimatedMinutes: 25,
            difficulty: "intermediate" as const,
            learningObjectives: [
              "Understand the mathematical model of artificial neurons and biological inspiration",
              "Master the universal approximation theorem and its practical implications for network design",
              "Analyze different activation functions (sigmoid, ReLU, tanh) and their effects on learning",
              "Recognize how network depth and width affect model capacity and expressiveness",
            ],
            prerequisite: ["Linear Algebra", "Basic Calculus"],
            keyTakeaways: [
              "Neurons perform linear transformation followed by non-linear activation",
              "Activation functions introduce non-linearity enabling complex pattern recognition",
              "Network depth allows hierarchical feature learning from simple to complex",
              "Universal approximation theorem guarantees sufficient representational power",
              "Proper weight initialization prevents vanishing/exploding gradients",
            ],
            practicalApplications: [
              "Image recognition systems that identify objects, faces, and medical conditions",
              "Natural language processing for translation, summarization, and chatbots",
              "Recommendation systems for e-commerce, streaming, and social media",
              "Financial modeling for risk assessment, fraud detection, and algorithmic trading",
              "Autonomous vehicles for object detection, path planning, and decision making",
            ],
            commonMistakes: [
              "Using inappropriate activation functions leading to vanishing gradients",
              "Initializing weights incorrectly causing learning instability",
              "Choosing network architecture without considering problem complexity",
              "Ignoring computational costs when designing very deep networks",
              "Misunderstanding the relationship between network capacity and generalization",
            ],
            proTips: [
              "Use ReLU activation for hidden layers to avoid vanishing gradients",
              "Initialize weights using Xavier/He initialization for stable training",
              "Start with simpler architectures and gradually increase complexity",
              "Monitor training dynamics through loss curves and gradient norms",
              "Apply regularization techniques to prevent overfitting in deep networks",
            ],
            additionalResources: [
              "Deep Learning by Ian Goodfellow (Chapter 6: Deep Feedforward Networks)",
              "Neural Networks and Deep Learning by Michael Nielsen",
              "Stanford CS231n Lecture Notes on Neural Networks",
              "Distill.pub visual explanations of neural network concepts",
            ],
          },
          {
            id: "interactive-demo",
            type: "interactive" as const,
            title: "Interactive Neural Network Playground",
            content:
              "Explore how neural networks learn through interactive visualization. Adjust parameters, see real-time updates, and understand the relationship between architecture choices and learning dynamics.",
            estimatedMinutes: 30,
            difficulty: "beginner" as const,
            learningObjectives: [
              "Visualize how changing network parameters affects decision boundaries",
              "Understand the impact of learning rate on convergence speed and stability",
              "Observe how different datasets require different network architectures",
              "Experience the trade-off between model complexity and overfitting",
            ],
            prerequisite: ["Basic understanding of neural networks"],
            keyTakeaways: [
              "Visual intuition for how neural networks make decisions",
              "Parameter sensitivity analysis through interactive exploration",
              "Understanding of learning dynamics and convergence patterns",
              "Practical experience with hyperparameter effects",
            ],
            practicalApplications: [
              "Rapid prototyping of neural network architectures",
              "Educational tool for understanding ML concepts",
              "Debugging network behavior through visualization",
              "Hyperparameter sensitivity analysis",
            ],
            commonMistakes: [
              "Not understanding how visualizations relate to real problems",
              "Focusing only on accuracy without considering generalization",
              "Ignoring computational complexity of parameter choices",
            ],
            proTips: [
              "Experiment with different activation functions to see their effects",
              "Try various learning rates to understand convergence behavior",
              "Observe how regularization affects decision boundaries",
              "Use visualization insights to guide real network design",
            ],
            additionalResources: [
              "TensorFlow Playground for hands-on experimentation",
              "ConvNetJS for browser-based neural network training",
              "Netron for visualizing trained network architectures",
            ],
          },
          {
            id: "visualization",
            type: "visualization" as const,
            title: "Neural Network Learning Dynamics",
            content:
              "Watch neural networks learn in real-time through animated visualizations of forward propagation, backpropagation, and weight updates. Understand how information flows through networks and how errors propagate backward to update weights.",
            estimatedMinutes: 20,
            difficulty: "intermediate" as const,
            learningObjectives: [
              "Visualize forward propagation of information through network layers",
              "Understand backpropagation as gradient flow from output to input",
              "Observe weight update dynamics during training iterations",
              "Connect mathematical concepts to visual representations",
            ],
            prerequisite: [
              "Understanding of derivatives",
              "Basic neural network concepts",
            ],
            keyTakeaways: [
              "Forward pass computes predictions layer by layer",
              "Backward pass propagates errors to compute gradients",
              "Weight updates follow gradient descent optimization",
              "Learning is an iterative process of prediction and correction",
            ],
            practicalApplications: [
              "Debugging neural network training issues",
              "Understanding why certain architectures work better",
              "Optimizing training procedures and hyperparameters",
              "Teaching neural network concepts to others",
            ],
            commonMistakes: [
              "Confusing forward propagation with backpropagation",
              "Not understanding the role of gradients in learning",
              "Misunderstanding how layer depth affects gradient flow",
            ],
            proTips: [
              "Focus on understanding information flow patterns",
              "Pay attention to gradient magnitudes across layers",
              "Notice how different activation functions affect gradients",
              "Observe the relationship between loss and weight changes",
            ],
            additionalResources: [
              "3Blue1Brown Neural Network Series on YouTube",
              "Andrej Karpathy's blog posts on neural network training",
              "Interactive gradient descent visualization tools",
            ],
          },
          {
            id: "hands-on-coding",
            type: "code" as const,
            title: "Building Neural Networks from Scratch",
            content:
              "Implement a complete neural network using only NumPy to understand every component. Build forward propagation, backpropagation, and training loops while learning the mathematical details behind frameworks like TensorFlow and PyTorch.",
            estimatedMinutes: 45,
            difficulty: "advanced" as const,
            learningObjectives: [
              "Implement forward propagation for multi-layer networks",
              "Code backpropagation algorithm from mathematical principles",
              "Build complete training loops with optimization algorithms",
              "Understand the internals of deep learning frameworks",
            ],
            prerequisite: [
              "Python programming",
              "NumPy",
              "Calculus",
              "Linear algebra",
            ],
            keyTakeaways: [
              "Neural networks are compositions of simple mathematical operations",
              "Backpropagation is systematic application of the chain rule",
              "Optimization algorithms control how weights are updated",
              "Framework implementations follow the same principles",
            ],
            practicalApplications: [
              "Understanding deep learning framework internals",
              "Debugging complex training issues",
              "Implementing custom layers and operations",
              "Research and development of new architectures",
            ],
            commonMistakes: [
              "Incorrect matrix dimension handling in layer implementations",
              "Off-by-one errors in backpropagation gradient calculations",
              "Not handling edge cases like zero gradients or numerical instability",
              "Inefficient implementations that don't leverage vectorization",
            ],
            proTips: [
              "Always check matrix dimensions match expected shapes",
              "Use numerical gradient checking to verify backpropagation",
              "Implement layers as classes for modularity and reusability",
              "Profile code to identify and optimize computational bottlenecks",
            ],
            additionalResources: [
              "CS231n assignment implementations and solutions",
              "Karpathy's micrograd repository for educational implementations",
              "PyTorch source code for reference implementations",
            ],
            codeExamples: [
              {
                title: "Neural Network Implementation from Scratch",
                description:
                  "Complete implementation of a multi-layer neural network with forward propagation, backpropagation, and training",
                code: `import numpy as np
from typing import List, Tuple
import matplotlib.pyplot as plt

class NeuralNetwork:
    def __init__(self, layer_sizes: List[int], learning_rate: float = 0.01):
        \"\"\"
        Initialize neural network with specified architecture
        
        Args:
            layer_sizes: List of integers representing neurons in each layer
            learning_rate: Learning rate for gradient descent optimization
        \"\"\"
        self.layer_sizes = layer_sizes
        self.learning_rate = learning_rate
        self.weights = []
        self.biases = []
        
        # Initialize weights and biases using Xavier initialization
        for i in range(len(layer_sizes) - 1):
            # Xavier initialization for better gradient flow
            weight_matrix = np.random.randn(layer_sizes[i], layer_sizes[i+1]) * np.sqrt(2.0 / layer_sizes[i])
            bias_vector = np.zeros((1, layer_sizes[i+1]))
            
            self.weights.append(weight_matrix)
            self.biases.append(bias_vector)
        
        # Store activations and pre-activations for backpropagation
        self.activations = []
        self.z_values = []
    
    def sigmoid(self, x: np.ndarray) -> np.ndarray:
        \"\"\"Sigmoid activation function with numerical stability\"\"\"
        # Clip extreme values to prevent overflow
        x = np.clip(x, -500, 500)
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x: np.ndarray) -> np.ndarray:
        \"\"\"Derivative of sigmoid function\"\"\"
        s = self.sigmoid(x)
        return s * (1 - s)
    
    def relu(self, x: np.ndarray) -> np.ndarray:
        \"\"\"ReLU activation function\"\"\"
        return np.maximum(0, x)
    
    def relu_derivative(self, x: np.ndarray) -> np.ndarray:
        \"\"\"Derivative of ReLU function\"\"\"
        return (x > 0).astype(float)
    
    def forward_propagation(self, X: np.ndarray) -> np.ndarray:
        \"\"\"
        Forward propagation through the network
        
        Args:
            X: Input data of shape (batch_size, input_features)
            
        Returns:
            Output predictions of shape (batch_size, output_features)
        \"\"\"
        self.activations = [X]  # Store input as first activation
        self.z_values = []      # Store pre-activation values
        
        current_activation = X
        
        # Forward pass through each layer
        for i, (weight, bias) in enumerate(zip(self.weights, self.biases)):
            # Compute pre-activation: z = a * W + b
            z = np.dot(current_activation, weight) + bias
            self.z_values.append(z)
            
            # Apply activation function
            if i == len(self.weights) - 1:  # Output layer
                current_activation = self.sigmoid(z)  # Use sigmoid for binary classification
            else:  # Hidden layers
                current_activation = self.relu(z)     # Use ReLU for hidden layers
            
            self.activations.append(current_activation)
        
        return current_activation
    
    def backward_propagation(self, X: np.ndarray, y: np.ndarray) -> List[Tuple[np.ndarray, np.ndarray]]:
        \"\"\"
        Backward propagation to compute gradients
        
        Args:
            X: Input data
            y: True labels
            
        Returns:
            List of tuples containing (weight_gradients, bias_gradients) for each layer
        \"\"\"
        m = X.shape[0]  # Number of samples
        gradients = []
        
        # Compute output layer error
        output_error = self.activations[-1] - y  # For sigmoid + cross-entropy
        current_error = output_error
        
        # Backpropagate through layers (from output to input)
        for i in reversed(range(len(self.weights))):
            # Compute gradients for current layer
            weight_gradient = np.dot(self.activations[i].T, current_error) / m
            bias_gradient = np.mean(current_error, axis=0, keepdims=True)
            
            gradients.insert(0, (weight_gradient, bias_gradient))
            
            # Compute error for previous layer (if not at input layer)
            if i > 0:
                # Error propagated to previous layer
                error_propagated = np.dot(current_error, self.weights[i].T)
                
                # Apply derivative of activation function
                if i > 0:  # Hidden layer uses ReLU
                    current_error = error_propagated * self.relu_derivative(self.z_values[i-1])
        
        return gradients
    
    def update_weights(self, gradients: List[Tuple[np.ndarray, np.ndarray]]):
        \"\"\"Update weights and biases using computed gradients\"\"\"
        for i, (weight_grad, bias_grad) in enumerate(gradients):
            self.weights[i] -= self.learning_rate * weight_grad
            self.biases[i] -= self.learning_rate * bias_grad
    
    def compute_loss(self, y_true: np.ndarray, y_pred: np.ndarray) -> float:
        \"\"\"Compute binary cross-entropy loss\"\"\"
        # Add small epsilon to prevent log(0)
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        
        return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))
    
    def train(self, X: np.ndarray, y: np.ndarray, epochs: int = 1000, 
              X_val: np.ndarray = None, y_val: np.ndarray = None) -> dict:
        \"\"\"
        Train the neural network
        
        Args:
            X: Training input data
            y: Training labels
            epochs: Number of training epochs
            X_val: Validation input data (optional)
            y_val: Validation labels (optional)
            
        Returns:
            Dictionary containing training history
        \"\"\"
        history = {'train_loss': [], 'val_loss': [], 'train_acc': [], 'val_acc': []}
        
        for epoch in range(epochs):
            # Forward propagation
            predictions = self.forward_propagation(X)
            
            # Compute loss
            train_loss = self.compute_loss(y, predictions)
            
            # Backward propagation
            gradients = self.backward_propagation(X, y)
            
            # Update weights
            self.update_weights(gradients)
            
            # Compute training accuracy
            train_acc = np.mean((predictions > 0.5) == y)
            
            # Store training metrics
            history['train_loss'].append(train_loss)
            history['train_acc'].append(train_acc)
            
            # Validation metrics (if validation data provided)
            if X_val is not None and y_val is not None:
                val_predictions = self.forward_propagation(X_val)
                val_loss = self.compute_loss(y_val, val_predictions)
                val_acc = np.mean((val_predictions > 0.5) == y_val)
                
                history['val_loss'].append(val_loss)
                history['val_acc'].append(val_acc)
            
            # Print progress
            if epoch % 100 == 0:
                print(f"Epoch {epoch}: Train Loss = {train_loss:.4f}, Train Acc = {train_acc:.4f}")
                if X_val is not None:
                    print(f"           Val Loss = {val_loss:.4f}, Val Acc = {val_acc:.4f}")
        
        return history
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        \"\"\"Make predictions on new data\"\"\"
        return self.forward_propagation(X)

# Example usage and testing
if __name__ == "__main__":
    # Generate sample data for testing
    np.random.seed(42)
    m = 1000  # Number of samples
    
    # Create a simple binary classification dataset
    X = np.random.randn(m, 2)  # 2D input features
    y = ((X[:, 0] ** 2 + X[:, 1] ** 2) > 1).astype(float).reshape(-1, 1)  # Circle classification
    
    # Split into train and validation sets
    split_idx = int(0.8 * m)
    X_train, X_val = X[:split_idx], X[split_idx:]
    y_train, y_val = y[:split_idx], y[split_idx:]
    
    # Create and train neural network
    network = NeuralNetwork([2, 10, 8, 1], learning_rate=0.1)
    
    print("Training Neural Network...")
    history = network.train(X_train, y_train, epochs=1000, X_val=X_val, y_val=y_val)
    
    # Plot training history
    plt.figure(figsize=(12, 4))
    
    plt.subplot(1, 2, 1)
    plt.plot(history['train_loss'], label='Train Loss')
    plt.plot(history['val_loss'], label='Validation Loss')
    plt.title('Training Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    
    plt.subplot(1, 2, 2)
    plt.plot(history['train_acc'], label='Train Accuracy')
    plt.plot(history['val_acc'], label='Validation Accuracy')
    plt.title('Training Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    
    plt.tight_layout()
    plt.show()
    
    # Final evaluation
    final_predictions = network.predict(X_val)
    final_accuracy = np.mean((final_predictions > 0.5) == y_val)
    print(f"\\nFinal Validation Accuracy: {final_accuracy:.4f}")`,
                explanation:
                  "This implementation demonstrates a complete neural network built from scratch using only NumPy. Key features include: proper weight initialization using Xavier method, forward propagation with ReLU and sigmoid activations, backpropagation using chain rule, gradient descent optimization, and comprehensive training with validation. The code includes numerical stability measures, proper matrix operations, and educational comments explaining each step.",
                expectedOutput:
                  "Training progress showing decreasing loss and increasing accuracy over epochs, final validation accuracy around 85-95% for the circle classification task.",
                hints: [
                  "Pay attention to matrix dimensions throughout the implementation",
                  "Xavier initialization helps with gradient flow in deep networks",
                  "ReLU activation prevents vanishing gradients in hidden layers",
                  "Sigmoid is used in output layer for binary classification",
                  "Gradient clipping can help with numerical stability",
                ],
              },
            ],
          },
          {
            id: "professional-tips",
            type: "tips" as const,
            title: "Professional Deep Learning Techniques",
            content:
              "Learn advanced techniques used by industry practitioners and researchers to build production-ready deep learning systems.",
            estimatedMinutes: 15,
            difficulty: "advanced" as const,
            learningObjectives: [
              "Master production-ready deep learning practices",
              "Understand advanced optimization and regularization techniques",
              "Learn debugging strategies for complex neural networks",
              "Apply professional development workflows for ML projects",
            ],
            prerequisite: ["Deep learning fundamentals", "Python programming"],
            keyTakeaways: [
              "Production systems require robust monitoring and validation",
              "Advanced techniques can significantly improve model performance",
              "Systematic debugging saves time and improves results",
              "Professional workflows ensure reproducible and maintainable code",
            ],
            practicalApplications: [
              "Building scalable ML systems in production environments",
              "Debugging and optimizing complex neural network architectures",
              "Implementing state-of-the-art research techniques",
              "Leading ML projects in professional settings",
            ],
            commonMistakes: [
              "Not implementing proper experiment tracking and versioning",
              "Ignoring numerical stability and edge cases",
              "Over-optimizing on validation set without proper testing",
              "Not considering computational and memory constraints",
            ],
            proTips: [
              "Always implement gradient checking for custom layers",
              "Use mixed precision training for faster convergence",
              "Implement learning rate scheduling for better convergence",
              "Monitor gradient norms to detect training issues early",
            ],
            additionalResources: [
              "Papers With Code for latest research implementations",
              "Google AI Blog for production ML best practices",
              "OpenAI blog for advanced technique discussions",
            ],
          },
          {
            id: "assessment",
            type: "quiz" as const,
            title: "Understanding Check: Neural Network Fundamentals",
            content:
              "Test your understanding of neural network concepts through carefully designed questions that assess both theoretical knowledge and practical application.",
            estimatedMinutes: 15,
            difficulty: "intermediate" as const,
            learningObjectives: [
              "Assess understanding of neural network mathematics",
              "Evaluate knowledge of practical implementation details",
              "Test ability to apply concepts to real-world scenarios",
              "Identify areas needing additional study",
            ],
            prerequisite: ["Completion of previous sections"],
            keyTakeaways: [
              "Self-assessment of learning progress",
              "Identification of knowledge gaps",
              "Reinforcement of key concepts",
              "Preparation for advanced topics",
            ],
            practicalApplications: [
              "Interview preparation for ML positions",
              "Academic exam preparation",
              "Self-directed learning assessment",
              "Teaching and mentoring others",
            ],
            commonMistakes: [
              "Rushing through questions without careful consideration",
              "Not reviewing explanations for incorrect answers",
              "Focusing on memorization rather than understanding",
              "Not connecting concepts to practical applications",
            ],
            proTips: [
              "Read questions carefully and consider edge cases",
              "Think about practical implications of theoretical concepts",
              "Review explanations even for correct answers",
              "Use quiz results to guide further study",
            ],
            additionalResources: [
              "Deep Learning textbook practice problems",
              "Coursera course quizzes and assignments",
              "Kaggle Learn micro-courses for additional practice",
            ],
            assessmentQuestions: [
              {
                question:
                  "What is the primary purpose of activation functions in neural networks?",
                options: [
                  "To introduce non-linearity enabling complex pattern recognition",
                  "To normalize input data for faster training",
                  "To prevent overfitting by adding regularization",
                  "To reduce computational complexity of matrix operations",
                ],
                correct: 0,
                explanation:
                  "Activation functions introduce non-linearity into neural networks. Without them, multiple layers would simply perform linear transformations, which can be reduced to a single linear transformation. Non-linearity enables neural networks to learn complex patterns and approximate any continuous function (universal approximation theorem).",
              },
              {
                question:
                  "Why is proper weight initialization important in deep neural networks?",
                options: [
                  "It determines the final accuracy of the trained model",
                  "It prevents vanishing/exploding gradients and enables stable training",
                  "It reduces the computational cost of training",
                  "It eliminates the need for regularization techniques",
                ],
                correct: 1,
                explanation:
                  "Proper weight initialization (like Xavier or He initialization) ensures that gradients neither vanish nor explode during backpropagation. Poor initialization can lead to training instability, slow convergence, or complete failure to learn. It doesn't determine final accuracy directly but enables the training process to proceed effectively.",
              },
              {
                question:
                  "In the context of the universal approximation theorem, what does it mean for neural networks?",
                options: [
                  "Any neural network can approximate any function perfectly",
                  "Neural networks with sufficient width can approximate any continuous function",
                  "Deep networks always perform better than shallow networks",
                  "Neural networks can only approximate linear functions",
                ],
                correct: 1,
                explanation:
                  "The universal approximation theorem states that a feedforward neural network with a single hidden layer containing a finite number of neurons can approximate any continuous function on a compact subset of Rn to arbitrary accuracy, given sufficient neurons. This provides theoretical justification for neural networks' representational power, though it doesn't guarantee efficient learning or generalization.",
              },
            ],
          },
        ],
      };
    };

    setLessonData(generateLessonData());
  }, [lessonId]);

  const handleComplete = () => {
    // Handle lesson completion
    console.log("Lesson completed!");
    navigate(`/ml-course`);
  };

  const handleProgress = (sectionId: string, timeSpent: number) => {
    // Handle progress tracking
    console.log(`Section ${sectionId} completed in ${timeSpent} minutes`);
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading comprehensive lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50"
    >
      <ComprehensiveLessonViewer
        lessonId={lessonData.id}
        title={lessonData.title}
        description={lessonData.description}
        sections={lessonData.sections}
        totalEstimatedMinutes={lessonData.totalEstimatedMinutes}
        difficulty={lessonData.difficulty}
        prerequisites={lessonData.prerequisites}
        onComplete={handleComplete}
        onProgress={handleProgress}
      />
    </motion.div>
  );
};

export default ComprehensiveLesson;
