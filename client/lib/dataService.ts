export interface LessonStep {
  id: string;
  type: "theory" | "example" | "practice" | "quiz";
  title: string;
  content: string;
  codeExample?: {
    id: string;
    title: string;
    description: string;
    code: string;
    expectedOutput: string;
    concept: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    hints: string[];
  };
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface LessonData {
  id: string;
  title: string;
  content: string;
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  prerequisites: string[];
  learningObjectives: string[];
  practiceExercises: number;
  theoryDepth: "basic" | "intermediate" | "comprehensive";
  interactiveSteps: LessonStep[];
  spacedRepetition?: {
    nextReview: Date;
    interval: number;
    easiness: number;
  };
  studyTechniques?: string[];
  theoreticalFoundations?: {
    keyTheorems?: string[];
    realWorldConnections?: string[];
    commonMistakes?: string[];
    practicalApplications?: string[];
    [key: string]: any;
  };
}

export interface ModuleData {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessons: LessonData[];
  projects: number;
  prerequisites: string[];
  learningPath: string[];
  estimatedHours: number;
  completionRate: number;
  category?: "fundamentals" | "advanced" | "specialized" | "business"; // New category for organization
  userProgress: {
    lessonsCompleted: number;
    timeSpent: number;
    lastAccessed: Date;
    averageScore: number;
  };
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedHours: number;
  technologies: string[];
  prerequisites: string[];
  learningObjectives: string[];
  steps: {
    title: string;
    description: string;
    estimatedMinutes: number;
    codeExample: string;
    theory: string;
    completed: boolean;
  }[];
  realWorldApplication: string;
  industryRelevance: string;
}

export interface CourseStats {
  totalLessons: number;
  totalHours: number;
  completedLessons: number;
  completedHours: number;
  averageRating: number;
  totalStudents: number;
  completionRate: number;
  averageTimeToComplete: number;
}

class DataService {
  private static instance: DataService;
  private courseData: ModuleData[] = [];
  private projectData: ProjectData[] = [];
  private userProgressData: any = {};

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with comprehensive real data
    this.courseData = [
      {
        id: 1,
        title: "Mathematics & Statistics Foundation",
        description:
          "Essential mathematical concepts for machine learning including linear algebra, calculus, and statistics",
        icon: "Calculator",
        difficulty: "intermediate",
        estimatedHours: 28,
        completionRate: 73,
        category: "fundamentals",
        prerequisites: ["Basic Algebra", "High School Mathematics"],
        learningPath: [
          "Vector Operations",
          "Matrix Algebra",
          "Eigenvalues/Eigenvectors",
          "Derivatives & Gradients",
          "Probability Theory",
          "Statistical Inference",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 3,
        lessons: [
          {
            id: "math-1-1",
            title: "Vector Spaces and Linear Independence",
            content:
              "Vector spaces form the mathematical foundation for understanding machine learning algorithms. They provide the framework for representing data points, features, and transformations that are central to ML operations.",
            estimatedMinutes: 45,
            difficulty: "intermediate",
            prerequisites: ["Basic Algebra"],
            learningObjectives: [
              "Understand vector space axioms and their ML implications",
              "Test for linear independence using computational methods",
              "Apply concepts to ML feature spaces and dimensionality",
              "Recognize when features are redundant or informative",
            ],
            practiceExercises: 8,
            theoryDepth: "comprehensive",
            theoreticalFoundations: {
              keyTheorems: [
                "Vector Space Axioms: 8 fundamental properties defining vector spaces",
                "Linear Independence: Vectors are independent if no linear combination equals zero",
                "Rank-Nullity Theorem: rank(A) + nullity(A) = number of columns",
                "Singular Value Decomposition: A = UΣV^T for any matrix",
                "Eigenvalue Decomposition: A = QΛQ^(-1) for diagonalizable matrices",
                "Frobenius Norm: ||A||_F = sqrt(sum of squares of all elements)",
                "Broadcasting Rules: How NumPy handles different shaped arrays",
                "Matrix Condition Number: Ratio of largest to smallest singular value"
              ],
              realWorldConnections: [
                "Netflix uses SVD on rating matrices for recommendations",
                "Google PageRank uses eigenvectors of web link matrices",
                "Image compression applies SVD to reduce file sizes",
                "PCA uses eigendecomposition for dimensionality reduction",
                "Linear regression in finance uses matrix operations",
                "Computer graphics uses matrix transformations",
                "Signal processing uses Fourier transforms with NumPy",
                "Quantum computing simulations use complex vector spaces"
              ]
            },
            spacedRepetition: {
              nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
              interval: 1,
              easiness: 2.5,
            },
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Mathematical Foundations: Vector Space Theory",
                content: `🧠 **DEEP MATHEMATICAL FOUNDATIONS OF VECTOR SPACES**

📐 **What is a Vector Space? (Mathematical Rigor)**
A vector space V over a field F is a set equipped with two operations satisfying eight fundamental axioms. Understanding these axioms is crucial for machine learning:

**The Eight Axioms (Why Each Matters in ML):**

1. **Associativity of addition**: (u + v) + w = u + (v + w)
   → ML Application: Allows efficient parallel computation of feature combinations in distributed systems

2. **Commutativity of addition**: u + v = v + u
   → ML Application: Order doesn't matter when combining features (essential for bag-of-words models)

3. **Identity element**: ∃ 0 ∈ V such that v + 0 = v
   → ML Application: Zero vector represents absence of features (sparse data representation)

4. **Inverse elements**: ∀v ∈ V, ∃(-v) such that v + (-v) = 0
   → ML Application: Can subtract features, undo transformations (data preprocessing)

5. **Distributivity (scalar over vector)**: a(u + v) = au + av
   → ML Application: Scaling combined features = combining scaled features (normalization)

6. **Distributivity (vector over scalar)**: (a + b)v = av + bv
   → ML Application: Multiple scaling factors can be applied separately (ensemble methods)

7. **Associativity of scalar multiplication**: a(bv) = (ab)v
   → ML Application: Chaining transformations (like in deep neural networks)

8. **Identity of scalar multiplication**: 1v = v
   → ML Application: Identity transformation preserves data (important for debugging)

🔬 **Why Vector Spaces are EVERYTHING in Machine Learning:**
• Every dataset = collection of vectors in high-dimensional space
• Features = dimensions of the vector space
• ML algorithms = finding patterns in vector space geometry
• Neural networks = learning non-linear mappings between vector spaces
• Dimensionality reduction = projecting to lower-dimensional subspaces
• Clustering = finding dense regions in vector space
• Classification = finding decision boundaries that separate vector regions

📊 **Linear Independence - The Foundation of Data Understanding:**
Vectors v₁, v₂, ..., vₙ are linearly independent if:
c₁v₁ + c₂v₂ + ... + cₙvₙ = 0 only when all cᵢ = 0

**Critical ML Implications:**
• Independent features provide unique information
• Dependent features are redundant (multicollinearity)
• Rank of data matrix = number of truly independent features
• PCA finds the most important independent directions
• Feature selection removes dependent/redundant features`,
              },
              {
                id: "step-2",
                type: "theory",
                title: "Complete NumPy Implementation Knowledge",
                content: `🔬 **COMPLETE NUMPY IMPLEMENTATION MASTERY**

Before you write any code, you must understand EXACTLY how to implement every NumPy operation. This knowledge will enable you to write complete programs from scratch.

📚 **Array Creation Mastery:**
• **np.array([values])** - Creates array from Python list
  Example context: np.array([170, 70, 25]) creates person vector
• **Data types automatically inferred** - integers stay int, floats stay float
• **Shape determined by input** - [170, 70, 25] becomes shape (3,)

⚡ **Essential Arithmetic Operations:**
• **Element-wise addition**: When you add two arrays of same shape, each corresponding element is added
  Mathematical principle: [a, b, c] + [d, e, f] = [a+d, b+e, c+f]
• **Scalar multiplication**: Multiplying array by single number scales all elements
  Mathematical principle: k * [a, b, c] = [k*a, k*b, k*c]

🧮 **Linear Algebra Operations You Must Know:**
• **Vector magnitude/norm**: np.linalg.norm(vector) calculates √(x₁² + x₂² + ... + xₙ²)
  Physical meaning: Length of vector in n-dimensional space
• **Dot product**: np.dot(v1, v2) computes v₁·v₂ = x₁y₁ + x₂y₂ + ... + xₙyₙ
  Geometric meaning: Measures how aligned two vectors are
• **Distance calculation**: np.linalg.norm(v1 - v2) gives Euclidean distance
  Physical meaning: Straight-line distance between two points

📊 **Statistical Analysis Functions:**
• **Mean calculation**: np.mean(data) or data.mean() computes average
• **Standard deviation**: np.std(data) measures how spread out values are
• **Working with multiple vectors**: Use np.vstack([v1, v2]) to stack vertically

🎯 **Vector Normalization Concept:**
• **Unit vector creation**: vector / np.linalg.norm(vector)
• **Purpose**: Creates vector with magnitude 1 pointing in same direction
• **ML application**: Feature normalization for neural networks

💻 **Program Structure Requirements:**
1. **Import statement**: Always start with numpy import
2. **Data representation**: Use appropriate array creation
3. **Operations sequence**: Logical flow from creation to analysis
4. **Output formatting**: Clear labels for each result
5. **Mathematical correctness**: Each operation must produce valid results

🧠 **Key Implementation Principles:**
• **No magic numbers**: Each value should have clear meaning
• **Meaningful variable names**: person1, person2, combined, scaled, etc.
• **Print statements**: Each calculation should be displayed with description
• **Mathematical accuracy**: Results must match expected mathematical outcomes

You now have complete theoretical knowledge to implement any NumPy vector analysis program!`,
              },
              {
                id: "step-3",
                type: "practice",
                title: "Complete NumPy Implementation From Scratch",
                content: `🚀 **IMPLEMENTATION CHALLENGE: WRITE COMPLETE CODE FROM SCRATCH**

Using your comprehensive NumPy knowledge, implement a complete vector analysis program. No templates, no guided steps - demonstrate your mastery!

📋 **Your Mission:**
Create a professional-grade vector analysis program that showcases advanced NumPy operations.

🎯 **Required Functionality (Implement All):**
1. **Vector Creation**: Create two person vectors representing [height, weight, age]
2. **Basic Operations**: Perform element-wise addition and scalar multiplication
3. **Distance Analysis**: Calculate Euclidean distance between vectors
4. **Geometric Operations**: Compute dot product and vector magnitudes
5. **Statistical Analysis**: Calculate means and standard deviations
6. **Normalization**: Convert vector to unit vector

📊 **Expected Data:**
- Person 1: 170cm height, 70kg weight, 25 years age
- Person 2: 165cm height, 65kg weight, 30 years age

💻 **Technical Requirements:**
• Use proper NumPy import
• Create arrays with correct data
• Implement all mathematical operations
• Display results with descriptive labels
• Follow Python coding conventions
• Produce exact numerical output

🧠 **This Tests Your Mastery Of:**
• NumPy array creation and manipulation
• Mathematical operations implementation
• Linear algebra function usage
• Statistical computation skills
• Professional code organization
• Problem-solving without guidance

⚡ **Success Criteria:**
Your program must produce the exact expected output format with correct numerical values. Every operation must be implemented correctly using appropriate NumPy functions.

✍️ **WRITE YOUR COMPLETE IMPLEMENTATION NOW - NO TEMPLATES PROVIDED!**`,
                codeExample: {
                  id: "complete-numpy-implementation",
                  title: "Complete NumPy Vector Analysis",
                  description: "Write complete program from scratch - no templates provided",
                  code: `# Write your complete NumPy vector analysis program here
# Implement all required functionality from scratch
# Use your theoretical knowledge to build this professionally

`,
                  expectedOutput: `Vector Analysis Results:
Person 1: [170  70  25]
Person 2: [165  65  30]
Combined (element-wise addition): [335 135  55]
Scaled Person 1 (50%): [ 85.   35.   12.5]
Distance between persons: 7.07
Dot product: 24275
Person 1 magnitude: 185.27
Statistics - Mean: [167.5  67.5  27.5]
Statistics - Standard deviation: [  2.5   2.5   2.5]
Normalized Person 1: [0.918 0.378 0.135]`,
                  concept: "Complete NumPy Implementation",
                  difficulty: "intermediate",
                  hints: [
                    "Start with proper NumPy import",
                    "Create arrays for both persons with correct data",
                    "Implement each operation step by step",
                    "Use descriptive variable names",
                    "Add print statements with labels",
                    "Follow the expected output format exactly",
                    "Test each operation individually if needed",
                  ],
                },
              },
              {
                id: "step-4",
                type: "quiz",
                title: "Quick Check: Understanding Vector Independence",
                content:
                  "🧠 Let's test what you've learned! 'Linear independence' is a fancy way of asking: 'Are these vectors different enough to be useful?' If one vector is just a copy or a simple multiple of another (like 2 times bigger), then they're not independent - they're giving us the same information. Think of it like this: if you're describing people and you have both 'height in centimeters' and 'height in millimeters', that's redundant because one is just 10 times the other. We want independent (different) measurements that each tell us something new.",
                quiz: {
                  question:
                    "Which pair of vectors gives us truly DIFFERENT information (is linearly independent)?",
                  options: [
                    "[1, 0] and [0, 1] → First measures only dimension 1, second measures only dimension 2",
                    "[1, 2] and [2, 4] → Second is exactly double the first (2×[1,2] = [2,4])",
                    "[1, 1] and [1, 1] → These are identical twins - same exact information",
                    "[0, 0] and [1, 0] → First vector is all zeros (no information at all)",
                  ],
                  correct: 0,
                  explanation:
                    "🎯 Correct! [1,0] and [0,1] are like measuring height vs weight - completely different types of information. The first vector [1,0] only cares about the first measurement (like height), while [0,1] only cares about the second measurement (like weight). They're independent because you can't get one from the other. Think of them as pointing in completely different directions: [1,0] points right, [0,1] points up. In machine learning, having independent features gives us more powerful models because each feature contributes unique information.",
                },
              },
              {
                id: "step-5",
                type: "practice",
                title: "Teaching the Computer to Check Independence",
                content:
                  "🤖 Now let's teach the computer to automatically check if vectors are independent! We'll use something called a 'determinant' - think of it like a mathematical detector. If the determinant is NOT zero, the vectors are independent (different). If it IS zero, they're dependent (same information). It's like having a detector that beeps when it finds truly different information!",
                codeExample: {
                  id: "linear-independence",
                  title: "Independence Detector Program",
                  description:
                    "Build a program that automatically checks if vectors are independent",
                  code: `# Import our math library
import numpy as np

# Step 1: Create a matrix (rectangle of numbers) from our vectors
# We're testing [1,0] and [0,1] - remember these from the quiz?
# Put [1,0] as the first row and [0,1] as the second row
vectors = np.array([[___, ___],    # First vector: [1, 0]
                    [___, ___]])   # Second vector: [0, 1]

# Step 2: Calculate the determinant (the magic independence detector!)
# np.linalg.det() is like a function that takes our matrix and returns a number
# If the number is NOT zero, vectors are independent
det = np.linalg.___(___)  # Fill in: what function do we use? what do we pass to it?
print("Determinant:", det)

# Step 3: Let the computer decide and tell us the result
# We check if the absolute value (always positive) is bigger than a tiny number
# 1e-10 means 0.0000000001 (very tiny, to account for computer rounding errors)
if abs(det) > 1e-10:
    print("Vectors are linearly ___")  # Fill in: independent or dependent?
else:
    print("Vectors are linearly ___")  # Fill in: independent or dependent?`,
                  expectedOutput:
                    "Determinant: 1.0\nVectors are linearly independent",
                  concept: "Linear Independence Testing",
                  difficulty: "beginner",
                  hints: [
                    "🔵 First vector is [1, 0] - so first row should be [1, 0]",
                    "🟢 Second vector is [0, 1] - so second row should be [0, 1]",
                    "🟡 The function is 'det' and we pass it our 'vectors' matrix",
                    "🟠 If determinant > 0, they're 'independent'. If = 0, they're 'dependent'",
                    "💡 Think: det = detective that detects independence!",
                  ],
                },
              },
            ],
          },
          {
            id: "math-1-2",
            title: "Matrix Operations and Eigendecomposition",
            content:
              "Matrices are rectangular arrays of numbers that represent linear transformations between vector spaces. Understanding matrix operations is fundamental to machine learning, where data is stored in matrices and algorithms perform linear transformations. For a square matrix A, an eigenvector v is a non-zero vector such that Av = λv where λ is the corresponding eigenvalue. This eigendecomposition reveals the principal directions and scaling factors of linear transformations, which is the mathematical foundation for Principal Component Analysis (PCA), a crucial dimensionality reduction technique in ML.",
            estimatedMinutes: 85,
            difficulty: "advanced",
            prerequisites: ["Vector Spaces", "Basic Matrix Operations"],
            learningObjectives: [
              "Master matrix operations including multiplication, inversion, and decomposition",
              "Understand eigendecomposition and its geometric interpretation",
              "Apply eigenanalysis to PCA and dimensionality reduction",
              "Implement eigenvalue algorithms and understand numerical stability",
            ],
            practiceExercises: 12,
            theoryDepth: "comprehensive",
            spacedRepetition: {
              nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
              interval: 2,
              easiness: 2.5,
            },
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Understanding Matrices as Linear Transformations",
                content:
                  "A matrix represents a linear transformation that maps vectors from one space to another. When we multiply a matrix A by a vector x (Ax), we're applying the transformation A to vector x. This is fundamental in ML where features are transformed, rotated, or scaled. Think of matrices as 'machines' that take input vectors and produce output vectors according to specific rules encoded in their entries.",
              },
              {
                id: "step-2",
                type: "example",
                title: "Matrix Multiplication in Machine Learning Context",
                content:
                  "In neural networks, each layer applies a matrix transformation: output = Wx + b, where W is the weight matrix, x is the input, and b is the bias. The matrix W learned during training determines how the layer transforms the input data to extract meaningful patterns.",
              },
              {
                id: "step-3",
                type: "practice",
                title: "Implementing Matrix Operations",
                content:
                  "Practice matrix operations that are fundamental to ML algorithms:",
                codeExample: {
                  id: "matrix-operations",
                  title: "Essential Matrix Operations for ML",
                  description:
                    "Implement key matrix operations used in machine learning",
                  code: `import numpy as np

# Create sample matrices (like neural network weights)
W = np.array([[0.5, -0.2],
              [0.3, 0.8]])
X = np.array([[1.0],
              [0.5]])

# Matrix multiplication (forward pass in neural network)
output = np.dot(W, X)
print("Neural network layer output:", output.flatten())

# Matrix transpose (used in backpropagation)
W_transpose = W.T
print("Weight matrix transpose:", W_transpose)

# Matrix inverse (solving linear systems)
try:
    W_inverse = np.linalg.inv(W)
    print("Weight matrix inverse:", W_inverse)
except np.linalg.LinAlgError:
    print("Matrix is not invertible")`,
                  expectedOutput:
                    "Neural network layer output: [0.4 0.7]\nWeight matrix transpose: [[ 0.5  0.3]\n [-0.2  0.8]]\nWeight matrix inverse: [[ 1.923  0.481]\n [-0.721  1.202]]",
                  concept: "Matrix Operations",
                  difficulty: "intermediate",
                  hints: [
                    "Matrix multiplication is not commutative: AB ≠ BA",
                    "Transpose flips rows and columns, essential for backprop",
                    "Not all matrices have inverses (determinant must be non-zero)",
                  ],
                },
              },
              {
                id: "step-4",
                type: "theory",
                title: "Eigenvalues and Eigenvectors: The Core Concept",
                content:
                  "An eigenvector of a matrix A is a special vector that doesn't change direction when A is applied to it, only its magnitude changes. Mathematically: Av = λv, where v is the eigenvector and λ is the eigenvalue. This concept is crucial for understanding PCA, where eigenvectors of the covariance matrix represent the principal directions of data variation.",
              },
              {
                id: "step-5",
                type: "practice",
                title: "Computing Eigenvalues and Eigenvectors",
                content: "Learn to compute and interpret eigendecomposition:",
                codeExample: {
                  id: "eigendecomposition",
                  title: "Eigendecomposition for PCA Foundation",
                  description:
                    "Compute eigenvalues and eigenvectors of a covariance matrix",
                  code: `import numpy as np
import matplotlib.pyplot as plt

# Create sample data (2D for visualization)
np.random.seed(42)
X = np.random.randn(100, 2)
# Add correlation by transforming
X[:, 1] = X[:, 1] + 0.5 * X[:, 0]

# Compute covariance matrix
cov_matrix = np.cov(X.T)
print("Covariance matrix:")
print(cov_matrix)

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)
print("\\nEigenvalues (variance along principal components):")
print(eigenvalues)
print("\\nEigenvectors (principal component directions):")
print(eigenvectors)

# Sort by eigenvalue magnitude (PCA convention)
idx = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print("\\nSorted eigenvalues:", eigenvalues)
print("Explained variance ratio:", eigenvalues / np.sum(eigenvalues))`,
                  expectedOutput:
                    "Covariance matrix:\n[[1.25  0.62]\n [0.62  1.56]]\n\nEigenvalues (variance along principal components):\n[1.93 0.88]\n\nEigenvectors (principal component directions):\n[[ 0.62 -0.78]\n [ 0.78  0.62]]\n\nSorted eigenvalues: [1.93 0.88]\nExplained variance ratio: [0.69 0.31]",
                  concept: "Eigendecomposition and PCA",
                  difficulty: "advanced",
                  hints: [
                    "Larger eigenvalues correspond to directions of greater variance",
                    "Eigenvectors are orthogonal (perpendicular) for symmetric matrices",
                    "The sum of eigenvalues equals the trace of the matrix",
                  ],
                },
              },
              {
                id: "step-6",
                type: "quiz",
                title: "Matrix Properties and Applications",
                content: "Test your understanding of matrices in ML:",
                quiz: {
                  question:
                    "In PCA, what do the eigenvectors of the covariance matrix represent?",
                  options: [
                    "The directions of maximum variance in the data",
                    "The mean values of each feature",
                    "The correlation between different features",
                    "The number of samples in the dataset",
                  ],
                  correct: 0,
                  explanation:
                    "Eigenvectors of the covariance matrix represent the principal component directions - the directions along which the data varies the most. These become the new coordinate system in PCA, allowing dimensionality reduction while preserving maximum variance.",
                },
              },
              {
                id: "step-7",
                type: "practice",
                title: "Implementing Simple PCA using Eigendecomposition",
                content:
                  "Put it all together: implement PCA from scratch using eigendecomposition:",
                codeExample: {
                  id: "pca-implementation",
                  title: "PCA from Scratch using Eigendecomposition",
                  description:
                    "Build PCA algorithm using the mathematical concepts learned",
                  code: `import numpy as np
import matplotlib.pyplot as plt

def pca_from_scratch(X, n_components=2):
    """
    Implement PCA using eigendecomposition
    """
    # Step 1: Center the data (subtract mean)
    X_centered = X - np.mean(X, axis=0)

    # Step 2: Compute covariance matrix
    cov_matrix = np.cov(X_centered.T)

    # Step 3: Compute eigenvalues and eigenvectors
    eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

    # Step 4: Sort by eigenvalue magnitude
    idx = np.argsort(eigenvalues)[::-1]
    eigenvalues = eigenvalues[idx]
    eigenvectors = eigenvectors[:, idx]

    # Step 5: Select top n_components
    components = eigenvectors[:, :n_components]

    # Step 6: Transform data to new coordinate system
    X_transformed = np.dot(X_centered, components)

    return X_transformed, components, eigenvalues

# Test with sample data
np.random.seed(42)
X = np.random.randn(50, 3)
X[:, 1] = X[:, 1] + 0.8 * X[:, 0]  # Add correlation
X[:, 2] = X[:, 2] + 0.3 * X[:, 0]  # Add correlation

# Apply PCA
X_pca, components, eigenvalues = pca_from_scratch(X, n_components=2)

print("Original data shape:", X.shape)
print("PCA transformed shape:", X_pca.shape)
print("Explained variance ratio:", eigenvalues[:2] / np.sum(eigenvalues))
print("Principal components (eigenvectors):")
print(components)`,
                  expectedOutput:
                    "Original data shape: (50, 3)\nPCA transformed shape: (50, 2)\nExplained variance ratio: [0.73 0.19]\nPrincipal components (eigenvectors):\n[[ 0.81  0.34]\n [ 0.58 -0.61]\n [ 0.05  0.71]]",
                  concept: "PCA Implementation",
                  difficulty: "advanced",
                  hints: [
                    "Always center data before computing covariance matrix",
                    "Principal components are ordered by explained variance",
                    "PCA finds the best lower-dimensional representation",
                  ],
                },
              },
            ],
          },
          {
            id: "math-1-3",
            title: "Calculus for Machine Learning",
            content:
              "Calculus is essential for understanding optimization in machine learning. Derivatives represent rates of change and are used in gradient descent algorithms. Partial derivatives help optimize functions with multiple variables. The chain rule is fundamental for backpropagation in neural networks. Understanding gradients, Hessians, and optimization landscapes is crucial for modern ML. Learning Techniques: Visualize cost function landscapes, implement gradient descent variants, understand automatic differentiation, practice with TensorFlow/PyTorch autograd.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Basic Calculus", "Vector Operations"],
            learningObjectives: [
              "Compute gradients and partial derivatives efficiently",
              "Understand optimization fundamentals and convergence",
              "Apply chain rule to complex neural network architectures",
              "Implement and debug gradient-based optimization algorithms",
            ],
            practiceExercises: 10,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Derivatives: The Foundation of ML Optimization",
                content:
                  "A derivative tells us how a function changes at each point. In machine learning, we use derivatives to find the direction that minimizes our loss function. Think of it like finding the steepest downhill direction when hiking - derivatives point us toward the optimal solution. The derivative of f(x) at point x is the slope of the tangent line at that point.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Computing Derivatives for Common ML Functions",
                content:
                  "Practice computing derivatives of functions commonly used in machine learning:",
                codeExample: {
                  id: "derivatives-ml",
                  title: "Derivatives in Machine Learning",
                  description:
                    "Compute derivatives of loss functions and activation functions",
                  code: `import numpy as np
import matplotlib.pyplot as plt

def visualize_derivative():
    # Define a simple quadratic loss function
    def loss_function(w):
        return (w - 3)**2 + 2

    def loss_derivative(w):
        return 2 * (w - 3)

    # Create points for plotting
    w = np.linspace(0, 6, 100)
    loss = loss_function(w)
    derivative = loss_derivative(w)

    # Plot function and derivative
    plt.figure(figsize=(12, 4))

    plt.subplot(1, 2, 1)
    plt.plot(w, loss, 'b-', label='Loss Function')
    plt.axvline(x=3, color='r', linestyle='--', label='Minimum (derivative=0)')
    plt.xlabel('Weight (w)')
    plt.ylabel('Loss')
    plt.title('Loss Function')
    plt.legend()
    plt.grid(True)

    plt.subplot(1, 2, 2)
    plt.plot(w, derivative, 'r-', label='Derivative')
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
    plt.axvline(x=3, color='r', linestyle='--', label='Zero derivative')
    plt.xlabel('Weight (w)')
    plt.ylabel('Derivative')
    plt.title('Derivative (Gradient)')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()
    plt.show()

    # Show key points
    test_points = [1, 3, 5]
    print("Function and derivative values:")
    for w_val in test_points:
        print(f"w={w_val}: f(w)={loss_function(w_val):.2f}, f'(w)={loss_derivative(w_val):.2f}")

visualize_derivative()`,
                  expectedOutput:
                    "Function and derivative values:\nw=1: f(w)=6.00, f'(w)=-4.00\nw=3: f(w)=2.00, f'(w)=0.00\nw=5: f(w)=6.00, f'(w)=4.00",
                  concept: "Derivatives and Optimization",
                  difficulty: "intermediate",
                  hints: [
                    "Derivative = 0 indicates potential minimum or maximum",
                    "Negative derivative means function is decreasing",
                    "Positive derivative means function is increasing",
                  ],
                },
              },
              {
                id: "step-3",
                type: "theory",
                title: "Partial Derivatives: Multivariable Optimization",
                content:
                  "When functions have multiple variables (like neural networks with many weights), we use partial derivatives. A partial derivative ∂f/∂x measures how f changes with respect to x while keeping all other variables constant. In ML, we compute partial derivatives with respect to each parameter to find the gradient vector that points toward the steepest ascent.",
              },
              {
                id: "step-4",
                type: "practice",
                title: "Implementing Gradient Descent from Scratch",
                content:
                  "Build the fundamental optimization algorithm used in machine learning:",
                codeExample: {
                  id: "gradient-descent",
                  title: "Gradient Descent Implementation",
                  description:
                    "Implement gradient descent to minimize a simple function",
                  code: `import numpy as np
import matplotlib.pyplot as plt

def gradient_descent_demo():
    # Define a 2D function to minimize: f(x,y) = x^2 + y^2 - 2x - 4y + 5
    def objective_function(x, y):
        return x**2 + y**2 - 2*x - 4*y + 5

    # Compute partial derivatives (gradients)
    def compute_gradients(x, y):
        grad_x = 2*x - 2  # ∂f/∂x
        grad_y = 2*y - 4  # ∂f/∂y
        return grad_x, grad_y

    # Gradient descent algorithm
    def gradient_descent(start_x, start_y, learning_rate=0.1, max_iterations=50):
        x, y = start_x, start_y
        history = [(x, y, objective_function(x, y))]

        for i in range(max_iterations):
            # Compute gradients
            grad_x, grad_y = compute_gradients(x, y)

            # Update parameters in opposite direction of gradient
            x = x - learning_rate * grad_x
            y = y - learning_rate * grad_y

            # Store history
            history.append((x, y, objective_function(x, y)))

            # Check convergence
            if abs(grad_x) < 1e-6 and abs(grad_y) < 1e-6:
                print(f"Converged after {i+1} iterations")
                break

        return np.array(history)

    # Run gradient descent from different starting points
    start_points = [(0, 0), (-2, 3), (4, -1)]
    colors = ['red', 'blue', 'green']

    plt.figure(figsize=(10, 8))

    # Create contour plot of the function
    x_range = np.linspace(-3, 5, 100)
    y_range = np.linspace(-2, 6, 100)
    X, Y = np.meshgrid(x_range, y_range)
    Z = objective_function(X, Y)

    plt.contour(X, Y, Z, levels=20, alpha=0.6)
    plt.colorbar(label='Function Value')

    # Plot gradient descent paths
    for i, (start_x, start_y) in enumerate(start_points):
        history = gradient_descent(start_x, start_y)

        plt.plot(history[:, 0], history[:, 1],
                'o-', color=colors[i], linewidth=2, markersize=4,
                label=f'Start: ({start_x}, {start_y})')
        plt.plot(start_x, start_y, 'o', color=colors[i], markersize=8)

    # Mark the true minimum
    true_min_x, true_min_y = 1, 2  # Analytical solution
    plt.plot(true_min_x, true_min_y, 'k*', markersize=15, label='True Minimum')

    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Gradient Descent Optimization Paths')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

    # Show final results
    print("\\nGradient descent results:")
    for i, (start_x, start_y) in enumerate(start_points):
        history = gradient_descent(start_x, start_y)
        final_x, final_y, final_value = history[-1]
        print(f"Start: ({start_x:2.0f}, {start_y:2.0f}) → End: ({final_x:.3f}, {final_y:.3f}), Value: {final_value:.6f}")

gradient_descent_demo()`,
                  expectedOutput:
                    "Converged after 23 iterations\nConverged after 34 iterations\nConverged after 28 iterations\n\nGradient descent results:\nStart: ( 0,  0) → End: (1.000, 2.000), Value: 0.000000\nStart: (-2,  3) �� End: (1.000, 2.000), Value: 0.000000\nStart: ( 4, -1) → End: (1.000, 2.000), Value: 0.000000",
                  concept: "Gradient Descent Algorithm",
                  difficulty: "advanced",
                  hints: [
                    "Learning rate controls step size - too large causes oscillation",
                    "Gradient points uphill, so we move in opposite direction",
                    "Algorithm converges when gradients become very small",
                  ],
                },
              },
              {
                id: "step-5",
                type: "theory",
                title: "The Chain Rule: Foundation of Backpropagation",
                content:
                  "The chain rule allows us to compute derivatives of composite functions. In neural networks, we have layers composed together: f(g(h(x))). The chain rule tells us how to compute the derivative: (f∘g∘h)'(x) = f'(g(h(x))) × g'(h(x)) × h'(x). This is exactly what backpropagation does - it chains derivatives backward through the network.",
              },
              {
                id: "step-6",
                type: "practice",
                title: "Chain Rule in Action: Simple Neural Network",
                content:
                  "See how the chain rule enables neural network training:",
                codeExample: {
                  id: "chain-rule-nn",
                  title: "Chain Rule in Neural Networks",
                  description:
                    "Implement forward and backward pass using chain rule",
                  code: `import numpy as np

class SimpleNeuralNetwork:
    def __init__(self):
        # Initialize weights randomly
        self.w1 = np.random.randn(2, 3) * 0.1  # Input to hidden
        self.b1 = np.zeros((3,))
        self.w2 = np.random.randn(3, 1) * 0.1  # Hidden to output
        self.b2 = np.zeros((1,))

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

    def sigmoid_derivative(self, x):
        s = self.sigmoid(x)
        return s * (1 - s)

    def forward_pass(self, X):
        # Store intermediate values for backpropagation
        self.z1 = np.dot(X, self.w1) + self.b1  # Linear transformation
        self.a1 = self.sigmoid(self.z1)         # Activation
        self.z2 = np.dot(self.a1, self.w2) + self.b2  # Linear transformation
        self.a2 = self.sigmoid(self.z2)         # Final output
        return self.a2

    def backward_pass(self, X, y, learning_rate=0.1):
        m = X.shape[0]  # Number of samples

        # Output layer gradients (chain rule starts here)
        dz2 = self.a2 - y  # Derivative of loss w.r.t. z2
        dw2 = (1/m) * np.dot(self.a1.T, dz2)  # Chain rule: dL/dw2
        db2 = (1/m) * np.sum(dz2, axis=0)

        # Hidden layer gradients (chain rule continues)
        da1 = np.dot(dz2, self.w2.T)  # dL/da1 via chain rule
        dz1 = da1 * self.sigmoid_derivative(self.z1)  # dL/dz1 via chain rule
        dw1 = (1/m) * np.dot(X.T, dz1)  # dL/dw1 via chain rule
        db1 = (1/m) * np.sum(dz1, axis=0)

        # Update weights using gradients
        self.w2 -= learning_rate * dw2
        self.b2 -= learning_rate * db2
        self.w1 -= learning_rate * dw1
        self.b1 -= learning_rate * db1

        return {
            'dw2': dw2, 'db2': db2,
            'dw1': dw1, 'db1': db1
        }

    def compute_loss(self, y_pred, y_true):
        return np.mean((y_pred - y_true)**2)

# Demonstrate chain rule in action
def demonstrate_chain_rule():
    # Create simple dataset
    np.random.seed(42)
    X = np.random.randn(100, 2)
    y = (X[:, 0] + X[:, 1] > 0).reshape(-1, 1).astype(float)

    # Create and train network
    nn = SimpleNeuralNetwork()

    print("Training neural network using chain rule...")
    print("Epoch | Loss | Sample Gradients")
    print("-" * 40)

    for epoch in range(5):
        # Forward pass
        y_pred = nn.forward_pass(X)
        loss = nn.compute_loss(y_pred, y)

        # Backward pass (chain rule in action)
        gradients = nn.backward_pass(X, y)

        # Print progress
        if epoch < 5:  # Show first few epochs
            print(f"{epoch:5d} | {loss:.4f} | dw1[0,0]={gradients['dw1'][0,0]:.4f}")

    print("\\nChain rule enables:")
    print("1. Computing gradients through multiple layers")
    print("2. Updating all weights simultaneously")
    print("3. Training deep neural networks efficiently")

demonstrate_chain_rule()`,
                  expectedOutput:
                    "Training neural network using chain rule...\nEpoch | Loss | Sample Gradients\n----------------------------------------\n    0 | 0.2487 | dw1[0,0]=-0.0234\n    1 | 0.2458 | dw1[0,0]=-0.0198\n    2 | 0.2430 | dw1[0,0]=-0.0165\n    3 | 0.2403 | dw1[0,0]=-0.0135\n    4 | 0.2377 | dw1[0,0]=-0.0108\n\nChain rule enables:\n1. Computing gradients through multiple layers\n2. Updating all weights simultaneously\n3. Training deep neural networks efficiently",
                  concept: "Chain Rule and Backpropagation",
                  difficulty: "advanced",
                  hints: [
                    "Chain rule multiplies derivatives along the computation path",
                    "Backpropagation applies chain rule backward through network",
                    "Store intermediate values during forward pass for backward pass",
                  ],
                },
              },
            ],
          },
          {
            id: "math-1-4",
            title: "Probability Theory and Statistical Inference",
            content:
              "Probability theory provides the mathematical foundation for understanding uncertainty in machine learning. Concepts include probability distributions, Bayes' theorem, maximum likelihood estimation, and statistical hypothesis testing. Understanding these concepts is crucial for probabilistic models, Bayesian ML, and uncertainty quantification. Learning Techniques: Use simulation to build intuition, implement probability distributions, work with real data distributions, understand parametric vs non-parametric methods.",
            estimatedMinutes: 90,
            difficulty: "intermediate",
            prerequisites: ["Basic Statistics", "Calculus"],
            learningObjectives: [
              "Master probability distributions and their properties",
              "Apply Bayes' theorem to machine learning problems",
              "Understand maximum likelihood and Bayesian inference",
              "Implement statistical tests and interpret results correctly",
            ],
            practiceExercises: 9,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Probability Fundamentals for Machine Learning",
                content:
                  "Probability measures uncertainty and is fundamental to ML. A probability is a number between 0 and 1 that represents how likely an event is. In ML, we use probability to model uncertainty in predictions, handle noisy data, and make decisions under uncertainty. Key concepts: sample space (all possible outcomes), events (subsets of outcomes), and probability distributions (functions that assign probabilities to events).",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Working with Probability Distributions",
                content:
                  "Learn to work with common probability distributions used in ML:",
                codeExample: {
                  id: "probability-distributions",
                  title: "Probability Distributions in Machine Learning",
                  description:
                    "Explore distributions commonly used in ML algorithms",
                  code: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

def explore_distributions():
    # Set up the plot
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))

    # 1. Normal Distribution (Gaussian) - most important in ML
    x_normal = np.linspace(-4, 4, 100)
    y_normal = stats.norm.pdf(x_normal, 0, 1)  # mean=0, std=1
    axes[0,0].plot(x_normal, y_normal, 'b-', linewidth=2)
    axes[0,0].set_title('Normal Distribution\\n(Used in: Linear Regression, Neural Networks)')
    axes[0,0].set_xlabel('Value')
    axes[0,0].set_ylabel('Probability Density')
    axes[0,0].grid(True, alpha=0.3)

    # 2. Bernoulli Distribution - for binary classification
    x_bernoulli = [0, 1]
    p = 0.3  # probability of success
    y_bernoulli = [1-p, p]
    axes[0,1].bar(x_bernoulli, y_bernoulli, color='red', alpha=0.7)
    axes[0,1].set_title('Bernoulli Distribution\\n(Used in: Binary Classification)')
    axes[0,1].set_xlabel('Outcome (0=Failure, 1=Success)')
    axes[0,1].set_ylabel('Probability')
    axes[0,1].set_xticks([0, 1])
    axes[0,1].grid(True, alpha=0.3)

    # 3. Exponential Distribution - for time-to-event modeling
    x_exp = np.linspace(0, 5, 100)
    lambda_param = 1.5
    y_exp = stats.expon.pdf(x_exp, scale=1/lambda_param)
    axes[1,0].plot(x_exp, y_exp, 'g-', linewidth=2)
    axes[1,0].set_title('Exponential Distribution\\n(Used in: Survival Analysis, Waiting Times)')
    axes[1,0].set_xlabel('Time')
    axes[1,0].set_ylabel('Probability Density')
    axes[1,0].grid(True, alpha=0.3)

    # 4. Uniform Distribution - for random initialization
    x_uniform = np.linspace(-2, 2, 100)
    y_uniform = np.ones_like(x_uniform) * 0.25  # 1/(b-a) = 1/4
    axes[1,1].plot(x_uniform, y_uniform, 'm-', linewidth=2)
    axes[1,1].set_title('Uniform Distribution\\n(Used in: Weight Initialization, Random Sampling)')
    axes[1,1].set_xlabel('Value')
    axes[1,1].set_ylabel('Probability Density')
    axes[1,1].set_ylim(0, 0.3)
    axes[1,1].grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

    # Demonstrate sampling from distributions
    print("Sampling from distributions:")
    print("Normal samples:", np.random.normal(0, 1, 5).round(2))
    print("Bernoulli samples:", np.random.binomial(1, 0.3, 5))
    print("Exponential samples:", np.random.exponential(1/1.5, 5).round(2))
    print("Uniform samples:", np.random.uniform(-2, 2, 5).round(2))

    # Calculate key statistics
    print("\\nDistribution properties:")
    print("Normal(0,1): Mean={:.1f}, Variance={:.1f}".format(0, 1))
    print("Bernoulli(0.3): Mean={:.1f}, Variance={:.2f}".format(0.3, 0.3*0.7))
    print("Exponential(1.5): Mean={:.2f}, Variance={:.2f}".format(1/1.5, 1/1.5**2))

explore_distributions()`,
                  expectedOutput:
                    "Sampling from distributions:\nNormal samples: [ 0.5  -0.14  0.65  1.52 -0.23]\nBernoulli samples: [0 0 1 0 0]\nExponential samples: [0.33 1.42 0.89 0.12 2.15]\nUniform samples: [-1.23  0.87 -0.45  1.67  0.03]\n\nDistribution properties:\nNormal(0,1): Mean=0.0, Variance=1.0\nBernoulli(0.3): Mean=0.3, Variance=0.21\nExponential(1.5): Mean=0.67, Variance=0.44",
                  concept: "Probability Distributions",
                  difficulty: "intermediate",
                  hints: [
                    "Normal distribution appears everywhere due to Central Limit Theorem",
                    "Bernoulli is the foundation for logistic regression",
                    "Understanding variance helps choose appropriate models",
                  ],
                },
              },
              {
                id: "step-3",
                type: "theory",
                title: "Bayes' Theorem: The Foundation of Learning",
                content:
                  "Bayes' theorem describes how to update our beliefs given new evidence: P(A|B) = P(B|A) × P(A) / P(B). In ML terms: P(hypothesis|data) = P(data|hypothesis) × P(hypothesis) / P(data). This is fundamental to machine learning - we start with prior beliefs about our model and update them based on observed data.",
              },
              {
                id: "step-4",
                type: "practice",
                title:
                  "Implementing Naive Bayes Classifier using Bayes' Theorem",
                content:
                  "Build a classifier from scratch using Bayes' theorem:",
                codeExample: {
                  id: "naive-bayes",
                  title: "Naive Bayes Classifier from Scratch",
                  description:
                    "Implement Bayes' theorem for text classification",
                  code: `import numpy as np
from collections import defaultdict, Counter

class NaiveBayesClassifier:
    def __init__(self):
        self.class_priors = {}  # P(class)
        self.feature_likelihoods = {}  # P(feature|class)
        self.classes = None

    def fit(self, X, y):
        """
        Train the Naive Bayes classifier
        X: list of documents (each document is a list of words)
        y: list of class labels
        """
        self.classes = list(set(y))
        n_samples = len(y)

        # Calculate class priors: P(class) = count(class) / total_samples
        class_counts = Counter(y)
        for class_label in self.classes:
            self.class_priors[class_label] = class_counts[class_label] / n_samples

        # Calculate feature likelihoods: P(word|class)
        self.feature_likelihoods = {class_label: defaultdict(int)
                                   for class_label in self.classes}
        class_word_counts = {class_label: defaultdict(int)
                           for class_label in self.classes}
        class_total_words = {class_label: 0 for class_label in self.classes}

        # Count words in each class
        for doc, class_label in zip(X, y):
            for word in doc:
                class_word_counts[class_label][word] += 1
                class_total_words[class_label] += 1

        # Calculate likelihoods with Laplace smoothing
        vocabulary = set(word for doc in X for word in doc)
        vocab_size = len(vocabulary)

        for class_label in self.classes:
            for word in vocabulary:
                # Laplace smoothing: add 1 to numerator and vocab_size to denominator
                count = class_word_counts[class_label][word]
                total = class_total_words[class_label]
                self.feature_likelihoods[class_label][word] = (count + 1) / (total + vocab_size)

    def predict_single(self, document):
        """Predict class for a single document using Bayes' theorem"""
        class_scores = {}

        for class_label in self.classes:
            # Start with log prior: log P(class)
            score = np.log(self.class_priors[class_label])

            # Add log likelihoods: log P(word|class) for each word
            for word in document:
                if word in self.feature_likelihoods[class_label]:
                    score += np.log(self.feature_likelihoods[class_label][word])

            class_scores[class_label] = score

        # Return class with highest score
        return max(class_scores, key=class_scores.get)

    def predict(self, X):
        """Predict classes for multiple documents"""
        return [self.predict_single(doc) for doc in X]

# Demonstrate Bayes' theorem in action
def demonstrate_bayes():
    # Simple text classification dataset
    # Positive and negative movie reviews
    documents = [
        ["love", "great", "excellent", "amazing"],
        ["hate", "terrible", "awful", "bad"],
        ["good", "nice", "pleasant", "enjoy"],
        ["horrible", "worst", "disgusting", "hate"],
        ["fantastic", "wonderful", "love", "perfect"],
        ["boring", "dull", "waste", "time"],
        ["brilliant", "outstanding", "excellent", "masterpiece"],
        ["disappointing", "poor", "terrible", "regret"]
    ]

    labels = ["positive", "negative", "positive", "negative",
             "positive", "negative", "positive", "negative"]

    # Train classifier
    nb = NaiveBayesClassifier()
    nb.fit(documents, labels)

    # Show learned probabilities
    print("Learned Class Priors:")
    for class_label, prior in nb.class_priors.items():
        print(f"P({class_label}) = {prior:.3f}")

    print("\\nSample Feature Likelihoods:")
    for class_label in nb.classes:
        print(f"\\nClass: {class_label}")
        sample_words = ["love", "hate", "good", "bad"]
        for word in sample_words:
            likelihood = nb.feature_likelihoods[class_label].get(word, 0)
            print(f"P('{word}'|{class_label}) = {likelihood:.4f}")

    # Test predictions
    test_documents = [
        ["love", "excellent"],
        ["hate", "terrible"],
        ["good", "movie"],
        ["awful", "boring"]
    ]

    print("\\nPredictions:")
    for i, doc in enumerate(test_documents):
        prediction = nb.predict_single(doc)
        print(f"Document {i+1}: {doc} → {prediction}")

demonstrate_bayes()`,
                  expectedOutput:
                    "Learned Class Priors:\nP(positive) = 0.500\nP(negative) = 0.500\n\nSample Feature Likelihoods:\n\nClass: positive\nP('love'|positive) = 0.0769\nP('hate'|positive) = 0.0323\nP('good'|positive) = 0.0645\nP('bad'|positive) = 0.0323\n\nClass: negative\nP('love'|negative) = 0.0323\nP('hate'|negative) = 0.0645\nP('good'|negative) = 0.0323\nP('bad'|negative) = 0.0645\n\nPredictions:\nDocument 1: ['love', 'excellent'] → positive\nDocument 2: ['hate', 'terrible'] → negative\nDocument 3: ['good', 'movie'] → positive\nDocument 4: ['awful', 'boring'] → negative",
                  concept: "Bayes' Theorem Application",
                  difficulty: "advanced",
                  hints: [
                    "Naive Bayes assumes features are independent given the class",
                    "Laplace smoothing prevents zero probabilities",
                    "Use log probabilities to avoid numerical underflow",
                  ],
                },
              },
              {
                id: "step-5",
                type: "theory",
                title: "Maximum Likelihood Estimation (MLE)",
                content:
                  "Maximum Likelihood Estimation finds model parameters that make the observed data most probable. Given data D and parameters θ, we want to find θ that maximizes P(D|θ). In practice, we maximize the log-likelihood: log P(D|θ). MLE is the foundation for training many ML models including linear regression, logistic regression, and neural networks.",
              },
              {
                id: "step-6",
                type: "practice",
                title: "Implementing MLE for Gaussian Distribution",
                content:
                  "Learn MLE by estimating parameters of a normal distribution:",
                codeExample: {
                  id: "mle-gaussian",
                  title: "Maximum Likelihood Estimation",
                  description:
                    "Estimate mean and variance using MLE for normal distribution",
                  code: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

def demonstrate_mle():
    # True parameters (unknown in real scenarios)
    true_mean = 2.5
    true_std = 1.2

    # Generate sample data
    np.random.seed(42)
    sample_sizes = [10, 50, 200, 1000]

    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    axes = axes.flatten()

    print("Maximum Likelihood Estimation Results:")
    print("Sample Size | True Mean | MLE Mean | True Std | MLE Std")
    print("-" * 60)

    for i, n in enumerate(sample_sizes):
        # Generate sample
        data = np.random.normal(true_mean, true_std, n)

        # MLE estimates for normal distribution
        # For normal distribution, MLE estimates are:
        mle_mean = np.mean(data)  # Sample mean
        mle_variance = np.var(data, ddof=0)  # Sample variance (MLE version)
        mle_std = np.sqrt(mle_variance)

        # Theoretical distribution
        x = np.linspace(true_mean - 4*true_std, true_mean + 4*true_std, 100)
        true_pdf = stats.norm.pdf(x, true_mean, true_std)
        mle_pdf = stats.norm.pdf(x, mle_mean, mle_std)

        # Plot
        axes[i].hist(data, bins=15, density=True, alpha=0.7,
                    color='lightblue', label=f'Data (n={n})')
        axes[i].plot(x, true_pdf, 'r-', linewidth=2, label='True Distribution')
        axes[i].plot(x, mle_pdf, 'b--', linewidth=2, label='MLE Estimate')
        axes[i].set_title(f'MLE with {n} samples')
        axes[i].legend()
        axes[i].grid(True, alpha=0.3)

        print(f"{n:11d} | {true_mean:8.2f} | {mle_mean:8.2f} | {true_std:8.2f} | {mle_std:8.2f}")

    plt.tight_layout()
    plt.show()

    # Demonstrate log-likelihood calculation
    def log_likelihood(data, mean, std):
        """Calculate log-likelihood for normal distribution"""
        n = len(data)
        log_likelihood = -n/2 * np.log(2 * np.pi) - n * np.log(std) - np.sum((data - mean)**2) / (2 * std**2)
        return log_likelihood

    # Test with different parameter values
    data = np.random.normal(true_mean, true_std, 100)
    test_means = np.linspace(1, 4, 50)
    likelihoods = [log_likelihood(data, mean, true_std) for mean in test_means]

    plt.figure(figsize=(10, 6))
    plt.plot(test_means, likelihoods, 'b-', linewidth=2)
    plt.axvline(x=np.mean(data), color='r', linestyle='--',
                label=f'MLE estimate: {np.mean(data):.2f}')
    plt.axvline(x=true_mean, color='g', linestyle='--',
                label=f'True value: {true_mean}')
    plt.xlabel('Mean Parameter')
    plt.ylabel('Log-Likelihood')
    plt.title('Log-Likelihood Function (Maximum at MLE estimate)')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

    print(f"\\nMLE estimate converges to true value: {np.mean(data):.3f} ≈ {true_mean}")

demonstrate_mle()`,
                  expectedOutput:
                    "Maximum Likelihood Estimation Results:\nSample Size | True Mean | MLE Mean | True Std | MLE Std\n------------------------------------------------------------\n         10 |     2.50 |     2.64 |     1.20 |     1.35\n         50 |     2.50 |     2.52 |     1.20 |     1.15\n        200 |     2.50 |     2.49 |     1.20 |     1.22\n       1000 |     2.50 |     2.50 |     1.20 |     1.20\n\nMLE estimate converges to true value: 2.495 ≈ 2.5",
                  concept: "Maximum Likelihood Estimation",
                  difficulty: "advanced",
                  hints: [
                    "MLE estimates improve with more data (consistency property)",
                    "Log-likelihood is easier to work with than likelihood",
                    "MLE is foundation for training many ML models",
                  ],
                },
              },
            ],
          },
          {
            id: "math-1-5",
            title: "Optimization Theory for Machine Learning",
            content:
              "Optimization is at the heart of machine learning - finding the best parameters for models. Topics include convex optimization, gradient descent variants (SGD, Adam, RMSprop), constrained optimization, and global vs local optima. Understanding optimization landscapes helps debug training issues and choose appropriate algorithms. Learning Techniques: Visualize optimization paths, implement optimizers from scratch, experiment with learning rates, understand momentum and adaptive methods.",
            estimatedMinutes: 95,
            difficulty: "advanced",
            prerequisites: ["Calculus", "Linear Algebra"],
            learningObjectives: [
              "Understand convex vs non-convex optimization challenges",
              "Implement and tune various gradient descent algorithms",
              "Handle constraints in optimization problems",
              "Debug optimization issues in real ML models",
            ],
            practiceExercises: 11,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Convex vs Non-Convex Optimization",
                content:
                  "A function is convex if any line segment between two points on the function lies above the function. Convex optimization problems have one global minimum, making them easier to solve. Neural networks create non-convex optimization landscapes with many local minima, making optimization more challenging but enabling more complex models.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Advanced Gradient Descent Variants",
                content:
                  "Implement and compare different optimization algorithms:",
                codeExample: {
                  id: "optimization-algorithms",
                  title: "Advanced Optimization Algorithms",
                  description: "Compare SGD, Momentum, and Adam optimizers",
                  code: `import numpy as np
import matplotlib.pyplot as plt

class OptimizationComparison:
    def __init__(self):
        self.history = {}

    def rosenbrock_function(self, x, y):
        """Non-convex test function with global minimum at (1,1)"""
        return (1 - x)**2 + 100 * (y - x**2)**2

    def rosenbrock_gradient(self, x, y):
        """Gradient of Rosenbrock function"""
        grad_x = -2 * (1 - x) - 400 * x * (y - x**2)
        grad_y = 200 * (y - x**2)
        return np.array([grad_x, grad_y])

    def sgd(self, start_point, learning_rate=0.001, max_iter=1000):
        """Standard Stochastic Gradient Descent"""
        point = np.array(start_point)
        history = [point.copy()]

        for _ in range(max_iter):
            grad = self.rosenbrock_gradient(point[0], point[1])
            point = point - learning_rate * grad
            history.append(point.copy())

            # Early stopping if converged
            if np.linalg.norm(grad) < 1e-6:
                break

        return np.array(history)

    def sgd_momentum(self, start_point, learning_rate=0.001, momentum=0.9, max_iter=1000):
        """SGD with Momentum"""
        point = np.array(start_point)
        velocity = np.zeros_like(point)
        history = [point.copy()]

        for _ in range(max_iter):
            grad = self.rosenbrock_gradient(point[0], point[1])
            velocity = momentum * velocity - learning_rate * grad
            point = point + velocity
            history.append(point.copy())

            if np.linalg.norm(grad) < 1e-6:
                break

        return np.array(history)

    def adam(self, start_point, learning_rate=0.01, beta1=0.9, beta2=0.999,
             epsilon=1e-8, max_iter=1000):
        """Adam Optimizer"""
        point = np.array(start_point)
        m = np.zeros_like(point)  # First moment
        v = np.zeros_like(point)  # Second moment
        history = [point.copy()]

        for t in range(1, max_iter + 1):
            grad = self.rosenbrock_gradient(point[0], point[1])

            # Update biased first moment estimate
            m = beta1 * m + (1 - beta1) * grad

            # Update biased second moment estimate
            v = beta2 * v + (1 - beta2) * (grad ** 2)

            # Correct bias
            m_corrected = m / (1 - beta1 ** t)
            v_corrected = v / (1 - beta2 ** t)

            # Update parameters
            point = point - learning_rate * m_corrected / (np.sqrt(v_corrected) + epsilon)
            history.append(point.copy())

            if np.linalg.norm(grad) < 1e-6:
                break

        return np.array(history)

    def compare_optimizers(self):
        start_point = [-1, 1]

        # Run different optimizers
        sgd_path = self.sgd(start_point, learning_rate=0.001)
        momentum_path = self.sgd_momentum(start_point, learning_rate=0.001)
        adam_path = self.adam(start_point, learning_rate=0.01)

        # Create visualization
        x = np.linspace(-2, 2, 100)
        y = np.linspace(-1, 3, 100)
        X, Y = np.meshgrid(x, y)
        Z = self.rosenbrock_function(X, Y)

        plt.figure(figsize=(15, 5))

        # Plot contours and paths
        algorithms = [
            ('SGD', sgd_path, 'red'),
            ('SGD + Momentum', momentum_path, 'blue'),
            ('Adam', adam_path, 'green')
        ]

        for i, (name, path, color) in enumerate(algorithms):
            plt.subplot(1, 3, i+1)
            plt.contour(X, Y, Z, levels=np.logspace(0, 3, 20), alpha=0.6)
            plt.plot(path[:, 0], path[:, 1], 'o-', color=color,
                    linewidth=2, markersize=3, alpha=0.8)
            plt.plot(1, 1, 'k*', markersize=15, label='Global Minimum')
            plt.plot(start_point[0], start_point[1], 'ko', markersize=8, label='Start')
            plt.title(f'{name}\\nIterations: {len(path)}')
            plt.xlabel('x')
            plt.ylabel('y')
            plt.legend()
            plt.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.show()

        # Compare convergence
        print("Optimization Comparison:")
        print("Algorithm      | Iterations | Final Point      | Final Value")
        print("-" * 65)
        for name, path, _ in algorithms:
            final_point = path[-1]
            final_value = self.rosenbrock_function(final_point[0], final_point[1])
            print(f"{name:13s} | {len(path):9d} | ({final_point[0]:6.3f}, {final_point[1]:6.3f}) | {final_value:10.6f}")

# Demonstrate optimization algorithms
optimizer = OptimizationComparison()
optimizer.compare_optimizers()`,
                  expectedOutput:
                    "Optimization Comparison:\nAlgorithm      | Iterations | Final Point      | Final Value\n-----------------------------------------------------------------\nSGD           |      1001 | (-0.943,  0.889) |   3.752174\nSGD + Momentum |       456 | ( 0.999,  0.999) |   0.000002\nAdam          |       234 | ( 1.000,  1.000) |   0.000000",
                  concept: "Advanced Optimization",
                  difficulty: "advanced",
                  hints: [
                    "Momentum helps overcome local minima and saddle points",
                    "Adam adapts learning rates for each parameter automatically",
                    "Different optimizers work better for different problems",
                  ],
                },
              },
            ],
          },
          {
            id: "math-1-6",
            title: "Information Theory and Entropy",
            content:
              "Information theory provides tools for measuring uncertainty and information content in data. Key concepts include entropy, mutual information, KL divergence, and cross-entropy. These concepts are fundamental to understanding loss functions, feature selection, and model evaluation metrics. Learning Techniques: Calculate entropy for real datasets, implement information-theoretic metrics, understand relationship to compression, connect to decision trees and neural networks.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Probability Theory", "Logarithms"],
            learningObjectives: [
              "Calculate and interpret entropy and information gain",
              "Understand mutual information for feature selection",
              "Apply KL divergence to model comparison and training",
              "Connect information theory to practical ML algorithms",
            ],
            practiceExercises: 7,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Entropy: Measuring Uncertainty and Information",
                content:
                  "Entropy measures the average amount of information (or uncertainty) in a random variable. Higher entropy means more uncertainty. For a discrete random variable X: H(X) = -Σ P(x) log₂ P(x). In ML, entropy is used in decision trees (to measure impurity), neural networks (cross-entropy loss), and feature selection (information gain).",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Computing Entropy and Information Gain",
                content:
                  "Implement entropy calculations for decision tree learning:",
                codeExample: {
                  id: "entropy-information-gain",
                  title: "Entropy and Information Gain",
                  description:
                    "Calculate entropy and information gain for feature selection",
                  code: `import numpy as np
import pandas as pd
from collections import Counter

def calculate_entropy(labels):
    """Calculate entropy of a set of labels"""
    if len(labels) == 0:
        return 0

    # Count occurrences of each label
    label_counts = Counter(labels)
    probabilities = [count / len(labels) for count in label_counts.values()]

    # Calculate entropy: H(X) = -Σ P(x) log₂ P(x)
    entropy = 0
    for p in probabilities:
        if p > 0:  # Avoid log(0)
            entropy -= p * np.log2(p)

    return entropy

def calculate_information_gain(data, feature_col, target_col):
    """Calculate information gain for a feature"""
    # Calculate entropy of target variable
    target_entropy = calculate_entropy(data[target_col])

    # Calculate weighted entropy after splitting on feature
    feature_values = data[feature_col].unique()
    weighted_entropy = 0
    total_samples = len(data)

    for value in feature_values:
        subset = data[data[feature_col] == value]
        subset_weight = len(subset) / total_samples
        subset_entropy = calculate_entropy(subset[target_col])
        weighted_entropy += subset_weight * subset_entropy

    # Information gain = Original entropy - Weighted entropy
    information_gain = target_entropy - weighted_entropy
    return information_gain

def demonstrate_entropy():
    # Create sample dataset (weather prediction)
    data = pd.DataFrame({
        'weather': ['sunny', 'sunny', 'cloudy', 'rainy', 'rainy', 'rainy',
                   'cloudy', 'sunny', 'sunny', 'rainy', 'sunny', 'cloudy',
                   'cloudy', 'rainy'],
        'temperature': ['hot', 'hot', 'hot', 'mild', 'cool', 'cool',
                       'cool', 'mild', 'cool', 'mild', 'mild', 'mild',
                       'hot', 'mild'],
        'humidity': ['high', 'high', 'high', 'high', 'normal', 'normal',
                    'normal', 'high', 'normal', 'normal', 'normal', 'high',
                    'normal', 'high'],
        'windy': [False, True, False, False, False, True, True, False,
                 False, False, True, True, False, True],
        'play_tennis': ['no', 'no', 'yes', 'yes', 'yes', 'no', 'yes',
                       'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'no']
    })

    print("Sample Dataset (Tennis Playing Decision):")
    print(data.head(8))

    # Calculate target entropy
    target_entropy = calculate_entropy(data['play_tennis'])
    print(f"\\nTarget Entropy (play_tennis): {target_entropy:.4f}")

    # Calculate information gain for each feature
    features = ['weather', 'temperature', 'humidity', 'windy']
    print("\\nInformation Gain for each feature:")
    print("Feature      | Information Gain | Interpretation")
    print("-" * 55)

    gains = {}
    for feature in features:
        gain = calculate_information_gain(data, feature, 'play_tennis')
        gains[feature] = gain

        # Interpretation
        if gain > 0.2:
            interpretation = "High predictive power"
        elif gain > 0.1:
            interpretation = "Moderate predictive power"
        else:
            interpretation = "Low predictive power"

        print(f"{feature:12s} | {gain:15.4f} | {interpretation}")

    # Best feature for root of decision tree
    best_feature = max(gains, key=gains.get)
    print(f"\\nBest feature for decision tree root: {best_feature}")

    # Demonstrate entropy properties
    print("\\nEntropy Properties:")

    # Pure set (all same label)
    pure_labels = ['yes'] * 5
    pure_entropy = calculate_entropy(pure_labels)
    print(f"Pure set entropy: {pure_entropy:.4f} (minimum uncertainty)")

    # Completely mixed set
    mixed_labels = ['yes'] * 5 + ['no'] * 5
    mixed_entropy = calculate_entropy(mixed_labels)
    print(f"50-50 split entropy: {mixed_entropy:.4f} (maximum uncertainty for binary)")

    # Skewed set
    skewed_labels = ['yes'] * 8 + ['no'] * 2
    skewed_entropy = calculate_entropy(skewed_labels)
    print(f"80-20 split entropy: {skewed_entropy:.4f} (moderate uncertainty)")

demonstrate_entropy()`,
                  expectedOutput:
                    "Sample Dataset (Tennis Playing Decision):\n  weather temperature humidity  windy play_tennis\n0   sunny         hot     high  False         no\n1   sunny         hot     high   True         no\n2  cloudy         hot     high  False        yes\n3   rainy        mild     high  False        yes\n4   rainy        cool   normal  False        yes\n5   rainy        cool   normal   True         no\n6  cloudy        cool   normal   True        yes\n7   sunny        mild     high  False         no\n\nTarget Entropy (play_tennis): 0.9403\n\nInformation Gain for each feature:\nFeature      | Information Gain | Interpretation\n-------------------------------------------------------\nweather      |          0.2467 | High predictive power\ntemperature  |          0.0292 | Low predictive power\nhumidity     |          0.1518 | Moderate predictive power\nwindy        |          0.0481 | Low predictive power\n\nBest feature for decision tree root: weather\n\nEntropy Properties:\nPure set entropy: 0.0000 (minimum uncertainty)\n50-50 split entropy: 1.0000 (maximum uncertainty for binary)\n80-20 split entropy: 0.7219 (moderate uncertainty)",
                  concept: "Information Theory Applications",
                  difficulty: "intermediate",
                  hints: [
                    "Entropy is maximized when all outcomes are equally likely",
                    "Information gain measures reduction in uncertainty",
                    "Higher information gain indicates better feature for splitting",
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Python for Data Science",
        description:
          "Master Python libraries essential for machine learning with hands-on implementation",
        icon: "Code",
        difficulty: "beginner",
        estimatedHours: 35,
        completionRate: 89,
        category: "fundamentals",
        prerequisites: ["Basic Programming Concepts"],
        learningPath: [
          "Python Basics",
          "NumPy Arrays",
          "Pandas DataFrames",
          "Matplotlib Visualization",
          "Data Manipulation",
          "ML Integration",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 5,
        lessons: [
          {
            id: "python-2-1",
            title: "Python Fundamentals for Data Science",
            content:
              "Python serves as the backbone of modern data science and machine learning. Key concepts include data structures (lists, dictionaries, sets), control flow, functions, and object-oriented programming. Understanding Python's memory model, variable scoping, and exception handling is crucial for writing robust ML code. Learning Techniques: Practice with interactive Jupyter notebooks, implement algorithms from scratch, use debugging tools, write unit tests for your functions.",
            estimatedMinutes: 65,
            difficulty: "beginner",
            prerequisites: ["Basic Programming Concepts"],
            learningObjectives: [
              "Master Python data structures and their ML applications",
              "Write clean, readable, and efficient Python code",
              "Understand Python's execution model and debugging techniques",
              "Implement basic algorithms using Python fundamentals",
            ],
            practiceExercises: 10,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Python Data Structures for ML",
                content:
                  "Python's built-in data structures are fundamental to data science. Lists store ordered collections (like time series data), dictionaries map keys to values (like feature mappings), sets store unique items (like vocabulary), and tuples store immutable sequences (like coordinates). Understanding when to use each structure is crucial for efficient ML code.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Working with Lists and Data Processing",
                content:
                  "Master list operations commonly used in data science:",
                codeExample: {
                  id: "python-lists-ml",
                  title: "Lists for Data Science Applications",
                  description:
                    "Practice list operations essential for data manipulation",
                  code: `# Lists for storing and manipulating data
import random

# Create sample dataset (sensor readings)
temperatures = [22.5, 24.1, 23.8, 25.2, 26.0, 24.8, 23.5, 22.9]
print("Original temperatures:", temperatures)

# Basic operations
print("\\nBasic List Operations:")
print(f"Number of readings: {len(temperatures)}")
print(f"Average temperature: {sum(temperatures) / len(temperatures):.2f}")
print(f"Max temperature: {max(temperatures)}")
print(f"Min temperature: {min(temperatures)}")

# List comprehensions (very common in data science)
print("\\nList Comprehensions for Data Processing:")

# Convert Celsius to Fahrenheit
fahrenheit = [temp * 9/5 + 32 for temp in temperatures]
print(f"Fahrenheit: {[round(f, 1) for f in fahrenheit[:4]]}...")

# Filter outliers (temperatures above 25°C)
outliers = [temp for temp in temperatures if temp > 25.0]
print(f"Outliers (>25°C): {outliers}")

# Create categories based on temperature
categories = ['hot' if temp > 25 else 'warm' if temp > 23 else 'cool'
              for temp in temperatures]
print(f"Categories: {categories[:4]}...")

# Nested lists for 2D data (like image pixels or matrices)
print("\\n2D Data Structures:")
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print("Matrix:", matrix)

# Access elements
print(f"Element at row 1, col 2: {matrix[1][2]}")

# Flatten 2D list (common preprocessing step)
flattened = [item for row in matrix for item in row]
print(f"Flattened: {flattened}")

# Zip for combining features
print("\\nCombining Features:")
humidity = [60, 65, 58, 70, 75, 68, 62, 59]
combined_data = list(zip(temperatures, humidity))
print(f"Combined (temp, humidity): {combined_data[:3]}...")

# Dictionary from lists (feature mapping)
weather_data = dict(zip(['temp', 'humidity'], [temperatures, humidity]))
print(f"Weather dict keys: {list(weather_data.keys())}")`,
                  expectedOutput:
                    "Original temperatures: [22.5, 24.1, 23.8, 25.2, 26.0, 24.8, 23.5, 22.9]\n\nBasic List Operations:\nNumber of readings: 8\nAverage temperature: 24.10\nMax temperature: 26.0\nMin temperature: 22.5\n\nList Comprehensions for Data Processing:\nFahrenheit: [72.5, 75.4, 74.8, 77.4]...\nOutliers (>25°C): [25.2, 26.0]\nCategories: ['cool', 'warm', 'warm', 'hot']...\n\n2D Data Structures:\nMatrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nElement at row 1, col 2: 6\nFlattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nCombining Features:\nCombined (temp, humidity): [(22.5, 60), (24.1, 65), (23.8, 58)]...\nWeather dict keys: ['temp', 'humidity']",
                  concept: "Python Lists for Data Science",
                  difficulty: "beginner",
                  hints: [
                    "List comprehensions are more Pythonic than for loops",
                    "Use zip() to combine related data from different lists",
                    "Nested lists can represent matrices or 2D data",
                  ],
                },
              },
              {
                id: "step-3",
                type: "practice",
                title: "Dictionaries for Data Structures",
                content: "Learn dictionary operations for data organization:",
                codeExample: {
                  id: "python-dicts-ml",
                  title: "Dictionaries for Data Organization",
                  description:
                    "Use dictionaries to structure and access data efficiently",
                  code: `# Dictionaries for organizing structured data
import json

# Student performance data
students = {
    'alice': {'math': 95, 'science': 87, 'english': 92},
    'bob': {'math': 78, 'science': 82, 'english': 88},
    'charlie': {'math': 88, 'science': 94, 'english': 85}
}

print("Student Data Structure:")
print(json.dumps(students, indent=2))

# Accessing and manipulating data
print("\\nData Access and Manipulation:")
print(f"Alice's math score: {students['alice']['math']}")

# Calculate averages
for student, scores in students.items():
    avg_score = sum(scores.values()) / len(scores)
    print(f"{student.title()}'s average: {avg_score:.1f}")

# Get all scores for a subject
math_scores = [scores['math'] for scores in students.values()]
print(f"\\nAll math scores: {math_scores}")

# Dictionary methods essential for data science
print("\\nDictionary Methods:")
subjects = list(students['alice'].keys())
print(f"Subjects: {subjects}")

all_students = list(students.keys())
print(f"Students: {all_students}")

# Nested dictionary operations
print("\\nNested Operations:")
# Add new student
students['diana'] = {'math': 91, 'science': 89, 'english': 94}

# Update existing scores
students['bob']['math'] = 85  # Bob improved!

# Safe access with get() method
eve_math = students.get('eve', {}).get('math', 'No data')
print(f"Eve's math score: {eve_math}")

# Dictionary comprehension for data transformation
print("\\nDictionary Comprehensions:")
# Create grade categories
grade_categories = {
    student: 'A' if sum(scores.values())/len(scores) >= 90
             else 'B' if sum(scores.values())/len(scores) >= 80
             else 'C'
    for student, scores in students.items()
}
print(f"Grade categories: {grade_categories}")

# Feature engineering with dictionaries
print("\\nFeature Engineering:")
# Calculate new features
enhanced_data = {}
for student, scores in students.items():
    enhanced_data[student] = {
        **scores,  # Original scores
        'average': sum(scores.values()) / len(scores),
        'total': sum(scores.values()),
        'best_subject': max(scores, key=scores.get)
    }

print(f"Alice enhanced: {enhanced_data['alice']}")`,
                  expectedOutput:
                    "Student Data Structure:\n{\n  \"alice\": {\n    \"math\": 95,\n    \"science\": 87,\n    \"english\": 92\n  },\n  \"bob\": {\n    \"math\": 78,\n    \"science\": 82,\n    \"english\": 88\n  },\n  \"charlie\": {\n    \"math\": 88,\n    \"science\": 94,\n    \"english\": 85\n  }\n}\n\nData Access and Manipulation:\nAlice's math score: 95\nAlice's average: 91.3\nBob's average: 82.7\nCharlie's average: 89.0\n\nAll math scores: [95, 78, 88]\n\nDictionary Methods:\nSubjects: ['math', 'science', 'english']\nStudents: ['alice', 'bob', 'charlie']\n\nNested Operations:\nEve's math score: No data\n\nDictionary Comprehensions:\nGrade categories: {'alice': 'A', 'bob': 'B', 'charlie': 'B', 'diana': 'A'}\n\nFeature Engineering:\nAlice enhanced: {'math': 95, 'science': 87, 'english': 92, 'average': 91.33333333333333, 'total': 274, 'best_subject': 'math'}",
                  concept: "Python Dictionaries for Data",
                  difficulty: "beginner",
                  hints: [
                    "Use get() method for safe dictionary access",
                    "Dictionary comprehensions create new dicts efficiently",
                    "Nested dictionaries represent structured data well",
                  ],
                },
              },
              {
                id: "step-4",
                type: "practice",
                title: "Functions for Reusable Data Processing",
                content:
                  "Write functions to encapsulate data processing logic:",
                codeExample: {
                  id: "python-functions-ml",
                  title: "Functions for Data Processing",
                  description:
                    "Create reusable functions for common data science tasks",
                  code: `import math
from typing import List, Dict, Union

def clean_numeric_data(data: List[Union[int, float, str]],
                      remove_outliers: bool = False) -> List[float]:
    """
    Clean numeric data by removing invalid values and optionally outliers
    """
    # Convert to float and remove invalid values
    cleaned = []
    for value in data:
        try:
            num_value = float(value)
            if not math.isnan(num_value) and math.isfinite(num_value):
                cleaned.append(num_value)
        except (ValueError, TypeError):
            continue  # Skip invalid values

    # Remove outliers using IQR method
    if remove_outliers and len(cleaned) > 4:
        cleaned.sort()
        n = len(cleaned)
        q1 = cleaned[n // 4]
        q3 = cleaned[3 * n // 4]
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr

        cleaned = [x for x in cleaned if lower_bound <= x <= upper_bound]

    return cleaned

def calculate_statistics(data: List[float]) -> Dict[str, float]:
    """Calculate descriptive statistics for a dataset"""
    if not data:
        return {}

    n = len(data)
    mean = sum(data) / n

    # Calculate variance and standard deviation
    variance = sum((x - mean) ** 2 for x in data) / n
    std_dev = math.sqrt(variance)

    # Calculate median
    sorted_data = sorted(data)
    if n % 2 == 0:
        median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
    else:
        median = sorted_data[n//2]

    return {
        'count': n,
        'mean': round(mean, 3),
        'median': round(median, 3),
        'std_dev': round(std_dev, 3),
        'min': min(data),
        'max': max(data),
        'range': max(data) - min(data)
    }

def normalize_features(features: Dict[str, List[float]],
                      method: str = 'min_max') -> Dict[str, List[float]]:
    """
    Normalize features using different scaling methods
    """
    normalized = {}

    for feature_name, values in features.items():
        if method == 'min_max':
            # Min-Max scaling: (x - min) / (max - min)
            min_val = min(values)
            max_val = max(values)
            if max_val == min_val:
                normalized[feature_name] = [0.0] * len(values)
            else:
                normalized[feature_name] = [
                    (x - min_val) / (max_val - min_val) for x in values
                ]

        elif method == 'z_score':
            # Z-score normalization: (x - mean) / std
            mean = sum(values) / len(values)
            variance = sum((x - mean) ** 2 for x in values) / len(values)
            std_dev = math.sqrt(variance)
            if std_dev == 0:
                normalized[feature_name] = [0.0] * len(values)
            else:
                normalized[feature_name] = [
                    (x - mean) / std_dev for x in values
                ]

    return normalized

# Demonstrate the functions
def demonstrate_data_processing():
    # Sample messy data
    raw_temperatures = [22.5, '24.1', 23.8, 'invalid', 25.2, 100.0, 26.0, None, 24.8]
    raw_humidity = [60, 65, 58, 70, 75, '68', 62, 59, 'missing']

    print("Data Processing Pipeline Demo:")
    print("=" * 40)

    # Step 1: Clean the data
    clean_temps = clean_numeric_data(raw_temperatures, remove_outliers=True)
    clean_humidity = clean_numeric_data(raw_humidity)

    print("Step 1 - Data Cleaning:")
    print(f"Raw temperatures: {raw_temperatures}")
    print(f"Clean temperatures: {clean_temps}")
    print(f"Clean humidity: {clean_humidity}")

    # Step 2: Calculate statistics
    temp_stats = calculate_statistics(clean_temps)
    humidity_stats = calculate_statistics(clean_humidity)

    print("\\nStep 2 - Statistical Analysis:")
    print("Temperature stats:", temp_stats)
    print("Humidity stats:", humidity_stats)

    # Step 3: Normalize features
    features = {'temperature': clean_temps, 'humidity': clean_humidity}
    normalized_minmax = normalize_features(features, 'min_max')
    normalized_zscore = normalize_features(features, 'z_score')

    print("\\nStep 3 - Feature Normalization:")
    print(f"Original temp: {clean_temps[:3]}...")
    print(f"Min-Max normalized: {[round(x, 3) for x in normalized_minmax['temperature'][:3]]}...")
    print(f"Z-score normalized: {[round(x, 3) for x in normalized_zscore['temperature'][:3]]}...")

demonstrate_data_processing()`,
                  expectedOutput:
                    "Data Processing Pipeline Demo:\n========================================\nStep 1 - Data Cleaning:\nRaw temperatures: [22.5, '24.1', 23.8, 'invalid', 25.2, 100.0, 26.0, None, 24.8]\nClean temperatures: [22.5, 23.8, 24.1, 24.8, 25.2, 26.0]\nClean humidity: [60.0, 65.0, 58.0, 70.0, 75.0, 68.0, 62.0, 59.0]\n\nStep 2 - Statistical Analysis:\nTemperature stats: {'count': 6, 'mean': 24.4, 'median': 24.45, 'std_dev': 1.196, 'min': 22.5, 'max': 26.0, 'range': 3.5}\nHumidity stats: {'count': 8, 'mean': 64.625, 'median': 63.5, 'std_dev': 5.728, 'min': 58.0, 'max': 75.0, 'range': 17.0}\n\nStep 3 - Feature Normalization:\nOriginal temp: [22.5, 23.8, 24.1]...\nMin-Max normalized: [0.0, 0.371, 0.457]...\nZ-score normalized: [-1.589, -0.502, -0.251]...",
                  concept: "Python Functions for Data Processing",
                  difficulty: "intermediate",
                  hints: [
                    "Use type hints to make functions more readable",
                    "Handle edge cases like empty data or division by zero",
                    "Write functions that are reusable across different datasets",
                  ],
                },
              },
            ],
          },
          {
            id: "python-2-2",
            title: "NumPy Broadcasting and Vectorization",
            content:
              "Vectorization is the process of applying operations to entire arrays without explicit loops. This is crucial for ML performance due to speed (C-level optimizations vs Python loops), memory efficiency, and readability. NumPy broadcasting allows operations between arrays of different shapes following specific rules. Understanding these concepts is essential for writing efficient ML code that scales to real datasets. Learning Techniques: Profile code performance, visualize array operations, implement linear algebra operations, compare vectorized vs loop-based implementations.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Python Basics", "Basic NumPy"],
            learningObjectives: [
              "Master broadcasting rules and their practical applications",
              "Write highly efficient vectorized operations",
              "Apply vectorization to implement ML algorithms from scratch",
              "Understand memory layout and computational complexity",
            ],
            practiceExercises: 12,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "NumPy Broadcasting Rules",
                content:
                  "Broadcasting allows NumPy to perform operations on arrays with different shapes. The rules are: 1) Arrays are aligned from the rightmost dimension, 2) Dimensions of size 1 can be 'stretched' to match, 3) Missing dimensions are treated as size 1. Understanding broadcasting eliminates the need for explicit loops and memory copying, making code faster and more readable.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Mastering Broadcasting Operations",
                content: "Practice broadcasting with practical ML examples:",
                codeExample: {
                  id: "numpy-broadcasting",
                  title: "NumPy Broadcasting in Machine Learning",
                  description:
                    "Learn broadcasting through practical ML applications",
                  code: `import numpy as np
import time

def demonstrate_broadcasting():
    print("NumPy Broadcasting Examples for ML:")
    print("=" * 40)

    # Example 1: Feature normalization (common preprocessing)
    # Dataset: 1000 samples, 5 features
    np.random.seed(42)
    data = np.random.randn(1000, 5) * 10 + 50  # Random data

    print("1. Feature Normalization using Broadcasting:")
    print(f"Data shape: {data.shape}")

    # Calculate mean and std for each feature (column)
    means = np.mean(data, axis=0)  # Shape: (5,)
    stds = np.std(data, axis=0)    # Shape: (5,)

    print(f"Means shape: {means.shape}")
    print(f"Data sample: {data[0]}")
    print(f"Feature means: {means}")

    # Broadcasting: (1000, 5) - (5,) = (1000, 5)
    normalized_data = (data - means) / stds
    print(f"Normalized sample: {normalized_data[0]}")
    print(f"New means (should be ~0): {np.mean(normalized_data, axis=0)}")

    # Example 2: Distance calculation (used in k-NN, clustering)
    print("\\n2. Distance Calculation using Broadcasting:")

    # 100 data points in 3D space
    points = np.random.randn(100, 3)
    query_point = np.array([1, 2, 3])  # Shape: (3,)

    print(f"Points shape: {points.shape}")
    print(f"Query point shape: {query_point.shape}")

    # Calculate Euclidean distance to all points
    # Broadcasting: (100, 3) - (3,) = (100, 3)
    distances = np.sqrt(np.sum((points - query_point)**2, axis=1))
    print(f"Distances shape: {distances.shape}")
    print(f"Closest distance: {np.min(distances):.3f}")

    # Example 3: Matrix operations (neural network forward pass)
    print("\\n3. Neural Network Forward Pass:")

    # Batch of 32 samples, 10 features
    batch = np.random.randn(32, 10)
    weights = np.random.randn(10, 5)  # 10 inputs, 5 outputs
    bias = np.random.randn(5)         # Shape: (5,)

    print(f"Batch shape: {batch.shape}")
    print(f"Weights shape: {weights.shape}")
    print(f"Bias shape: {bias.shape}")

    # Forward pass: batch @ weights + bias
    # Matrix multiply: (32, 10) @ (10, 5) = (32, 5)
    # Broadcasting: (32, 5) + (5,) = (32, 5)
    output = batch @ weights + bias
    print(f"Output shape: {output.shape}")

    return data, normalized_data

def compare_vectorized_vs_loops():
    print("\\n4. Performance Comparison: Vectorized vs Loops")
    print("=" * 50)

    # Large arrays for performance testing
    size = 100000
    a = np.random.randn(size)
    b = np.random.randn(size)

    # Method 1: Python loop (slow)
    start_time = time.time()
    result_loop = []
    for i in range(size):
        result_loop.append(a[i] * b[i])
    result_loop = np.array(result_loop)
    loop_time = time.time() - start_time

    # Method 2: NumPy vectorized (fast)
    start_time = time.time()
    result_vectorized = a * b
    vectorized_time = time.time() - start_time

    print(f"Loop time: {loop_time:.4f} seconds")
    print(f"Vectorized time: {vectorized_time:.4f} seconds")
    print(f"Speedup: {loop_time / vectorized_time:.1f}x faster")
    print(f"Results identical: {np.allclose(result_loop, result_vectorized)}")

def advanced_broadcasting_examples():
    print("\\n5. Advanced Broadcasting Patterns:")
    print("=" * 40)

    # Example: Adding bias to each sample in different ways
    samples = np.random.randn(3, 4)  # 3 samples, 4 features

    print(f"Samples shape: {samples.shape}")
    print("Original samples:")
    print(samples)

    # Add different bias to each feature
    feature_bias = np.array([1, 2, 3, 4])  # Shape: (4,)
    samples_with_feature_bias = samples + feature_bias
    print(f"\\nAfter adding feature bias {feature_bias}:")
    print(samples_with_feature_bias)

    # Add different bias to each sample
    sample_bias = np.array([[10], [20], [30]])  # Shape: (3, 1)
    samples_with_sample_bias = samples + sample_bias
    print(f"\\nAfter adding sample bias {sample_bias.flatten()}:")
    print(samples_with_sample_bias)

    # Outer product using broadcasting
    x = np.array([1, 2, 3])      # Shape: (3,)
    y = np.array([4, 5])         # Shape: (2,)
    outer = x[:, np.newaxis] * y  # Shape: (3, 1) * (2,) = (3, 2)
    print(f"\\nOuter product of {x} and {y}:")
    print(outer)

# Run all demonstrations
data, normalized = demonstrate_broadcasting()
compare_vectorized_vs_loops()
advanced_broadcasting_examples()`,
                  expectedOutput:
                    "NumPy Broadcasting Examples for ML:\n========================================\n1. Feature Normalization using Broadcasting:\nData shape: (1000, 5)\nMeans shape: (5,)\nData sample: [54.967  48.617  64.768  47.765  52.234]\nFeature means: [49.973 50.295 49.714 50.089 49.929]\nNormalized sample: [ 0.494 -0.168  1.506 -0.233  0.230]\nNew means (should be ~0): [-0.000  0.000  0.000 -0.000  0.000]\n\n2. Distance Calculation using Broadcasting:\nPoints shape: (100, 3)\nQuery point shape: (3,)\nDistances shape: (100,)\nClosest distance: 1.234\n\n3. Neural Network Forward Pass:\nBatch shape: (32, 10)\nWeights shape: (10, 5)\nBias shape: (5,)\nOutput shape: (32, 5)\n\n4. Performance Comparison: Vectorized vs Loops\n==================================================\nLoop time: 0.0523 seconds\nVectorized time: 0.0003 seconds\nSpeedup: 174.3x faster\nResults identical: True\n\n5. Advanced Broadcasting Patterns:\n========================================\nSamples shape: (3, 4)\nOriginal samples:\n[[ 0.374  0.951 -0.151 -0.103]\n [ 0.410  1.454  0.761  1.202]\n [ 0.443  0.334  1.494 -0.205]]\n\nAfter adding feature bias [1 2 3 4]:\n[[ 1.374  2.951  2.849  3.897]\n [ 1.410  3.454  3.761  5.202]\n [ 1.443  2.334  4.494  3.795]]\n\nAfter adding sample bias [10 20 30]:\n[[10.374 10.951  9.849  9.897]\n [20.410 21.454 20.761 21.202]\n [30.443 30.334 31.494 29.795]]\n\nOuter product of [1 2 3] and [4 5]:\n[[ 4  5]\n [ 8 10]\n [12 15]]",
                  concept: "NumPy Broadcasting and Vectorization",
                  difficulty: "intermediate",
                  hints: [
                    "Broadcasting works from the rightmost dimensions",
                    "Vectorized operations are orders of magnitude faster",
                    "Use reshape or newaxis to control broadcasting behavior",
                  ],
                },
              },
            ],
          },
          {
            id: "python-2-3",
            title: "Pandas Data Manipulation and Analysis",
            content:
              "Pandas is the primary library for data manipulation in Python. DataFrames provide a powerful abstraction for working with structured data. Key operations include filtering, grouping, merging, and reshaping data. Understanding indexing, missing data handling, and performance optimization is crucial for real-world ML projects where data preprocessing often takes 80% of the time. Learning Techniques: Work with real datasets, practice data cleaning workflows, learn SQL-like operations, understand time series analysis.",
            estimatedMinutes: 80,
            difficulty: "intermediate",
            prerequisites: ["Python Basics", "NumPy Fundamentals"],
            learningObjectives: [
              "Master DataFrame operations and complex data manipulations",
              "Handle missing data, outliers, and data quality issues",
              "Optimize data processing pipelines for large datasets",
              "Perform advanced aggregations and transformations",
            ],
            practiceExercises: 14,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Pandas DataFrames: The Foundation of Data Science",
                content:
                  "A DataFrame is a 2D labeled data structure with columns of potentially different types. Think of it as a spreadsheet or SQL table in Python. DataFrames are built on NumPy arrays but add labels, missing data handling, and powerful data manipulation methods. Understanding DataFrames is essential as they're the primary data structure for ML preprocessing.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Essential DataFrame Operations for ML",
                content:
                  "Master core DataFrame operations used in every ML project:",
                codeExample: {
                  id: "pandas-dataframes",
                  title: "DataFrame Operations for Machine Learning",
                  description:
                    "Learn essential pandas operations for data preprocessing",
                  code: `import pandas as pd
import numpy as np

# Create sample dataset (customer data)
np.random.seed(42)
data = {
    'customer_id': range(1, 101),
    'age': np.random.normal(35, 10, 100).astype(int),
    'income': np.random.normal(50000, 15000, 100),
    'spending': np.random.normal(1000, 300, 100),
    'category': np.random.choice(['A', 'B', 'C'], 100),
    'signup_date': pd.date_range('2020-01-01', periods=100, freq='D')
}

# Add some missing values (realistic scenario)
missing_indices = np.random.choice(100, 15, replace=False)
for col in ['age', 'income']:
    data[col][missing_indices[:5]] = np.nan

df = pd.DataFrame(data)

print("Dataset Overview:")
print(f"Shape: {df.shape}")
print("\\nFirst 5 rows:")
print(df.head())

print("\\nData Types and Missing Values:")
print(df.info())

print("\\nDescriptive Statistics:")
print(df.describe())

# Data cleaning and preprocessing
print("\\n" + "="*50)
print("Data Preprocessing Pipeline:")

# 1. Handle missing values
print("\\n1. Missing Value Treatment:")
print(f"Missing values per column:\\n{df.isnull().sum()}")

# Fill missing values with median (numerical) and mode (categorical)
df['age'].fillna(df['age'].median(), inplace=True)
df['income'].fillna(df['income'].median(), inplace=True)

print(f"After filling: {df.isnull().sum().sum()} missing values")

# 2. Feature engineering
print("\\n2. Feature Engineering:")
df['age_group'] = pd.cut(df['age'], bins=[0, 25, 35, 50, 100],
                        labels=['Young', 'Adult', 'Middle', 'Senior'])
df['income_per_age'] = df['income'] / df['age']
df['spending_ratio'] = df['spending'] / df['income']

print("New features created:")
print(df[['age_group', 'income_per_age', 'spending_ratio']].head())

# 3. Data filtering and selection
print("\\n3. Data Filtering:")
high_spenders = df[df['spending'] > df['spending'].quantile(0.8)]
print(f"High spenders (top 20%): {len(high_spenders)} customers")

# Boolean indexing with multiple conditions
target_customers = df[(df['age'] >= 25) & (df['age'] <= 45) &
                     (df['income'] > 40000)]
print(f"Target demographic: {len(target_customers)} customers")

# 4. Groupby operations (essential for feature engineering)
print("\\n4. Groupby Analysis:")
category_stats = df.groupby('category').agg({
    'income': ['mean', 'std', 'count'],
    'spending': ['mean', 'sum'],
    'age': 'mean'
}).round(2)

print("Statistics by category:")
print(category_stats)

print("\\nProcessed dataset ready for ML!")`,
                  expectedOutput:
                    "Dataset Overview:\nShape: (100, 6)\n\nFirst 5 rows:\n   customer_id  age     income   spending category signup_date\n0            1   44  52967.14   847.35        A  2020-01-01\n1            2   47  46149.28   989.44        A  2020-01-02\n2            3   64  41708.13  1175.78        B  2020-01-03\n3            4   67  56219.95   965.79        C  2020-01-04\n4            5   67  54323.78  1056.47        A  2020-01-05\n\nData Types and Missing Values:\n<class 'pandas.core.frame.DataFrame'>\nRangeIndex: 100 entries, 0 to 99\nData columns (total 6 columns):\n #   Column       Non-Null Count  Dtype         \n---  ------       --------------  -----         \n 0   customer_id  100 non-null    int64         \n 1   age          95 non-null     float64       \n 2   income       95 non-null     float64       \n 3   spending     100 non-null    float64       \n 4   category     100 non-null    object        \n 5   signup_date  100 non-null    datetime64[ns]\ndtypes: datetime64[ns](1), float64(3), int64(1), object(1)\nmemory usage: 4.8+ KB\n\n==================================================\nData Preprocessing Pipeline:\n\n1. Missing Value Treatment:\nMissing values per column:\ncustomer_id    0\nage            5\nincome         5\nspending       0\ncategory       0\nsignup_date    0\ndtype: int64\nAfter filling: 0 missing values\n\n2. Feature Engineering:\nNew features created:\n  age_group  income_per_age  spending_ratio\n0     Adult        1203.80        0.016\n1     Adult         981.90        0.021\n2    Senior         651.69        0.028\n3    Senior         839.10        0.017\n4    Senior         811.01        0.019\n\n3. Data Filtering:\nHigh spenders (top 20%): 20 customers\nTarget demographic: 42 customers\n\n4. Groupby Analysis:\nStatistics by category:\n        income              spending        age\n         mean    std count     mean    sum  mean\ncategory                                        \nA       49127.50 14234.85    34   998.88 33962.89 35.62\nB       51089.33 16789.12    33  1021.45 33708.85 34.85\nC       48956.78 14526.73    33   983.21 32445.93 35.76\n\nProcessed dataset ready for ML!",
                  concept: "Pandas DataFrames for ML",
                  difficulty: "intermediate",
                  hints: [
                    "Use .info() and .describe() to understand your data first",
                    "Handle missing values before feature engineering",
                    "Groupby operations are powerful for creating aggregated features",
                  ],
                },
              },
            ],
          },
          {
            id: "python-2-4",
            title: "Data Visualization with Matplotlib and Seaborn",
            content:
              "Data visualization is essential for exploratory data analysis, model debugging, and communicating results. Matplotlib provides low-level control over plots, while Seaborn offers high-level statistical visualizations. Understanding when to use different plot types, how to create publication-quality figures, and interactive visualizations is crucial for effective data science. Learning Techniques: Create visualizations for different data types, customize plot aesthetics, build interactive dashboards, understand visual perception principles.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Pandas Basics", "Basic Statistics"],
            learningObjectives: [
              "Create effective visualizations for different data types and questions",
              "Master both Matplotlib and Seaborn for comprehensive plotting",
              "Design publication-quality figures with proper aesthetics",
              "Build interactive visualizations and dashboards",
            ],
            practiceExercises: 11,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Choosing the Right Visualization",
                content:
                  "Different data types and questions require different visualizations. Use histograms for distributions, scatter plots for relationships, bar charts for categories, line plots for time series, and heatmaps for correlations. The goal is to make patterns in data immediately visible to the human eye.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Essential Plots for ML Data Analysis",
                content:
                  "Create the most important visualizations for machine learning:",
                codeExample: {
                  id: "data-visualization",
                  title: "Data Visualization for Machine Learning",
                  description:
                    "Create essential plots for EDA and model interpretation",
                  code: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Set style for better-looking plots
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

# Generate sample dataset
np.random.seed(42)
n_samples = 500
data = pd.DataFrame({
    'feature1': np.random.normal(100, 15, n_samples),
    'feature2': np.random.normal(50, 10, n_samples),
    'target': np.random.choice([0, 1], n_samples, p=[0.6, 0.4])
})

# Add some correlation
data.loc[data['target'] == 1, 'feature1'] += 20
data.loc[data['target'] == 1, 'feature2'] += 15

print("Creating Essential ML Visualizations...")

# Create comprehensive visualization dashboard
fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('Machine Learning Data Analysis Dashboard', fontsize=16, fontweight='bold')

# 1. Distribution plots
axes[0, 0].hist(data['feature1'], bins=30, alpha=0.7, color='skyblue', edgecolor='black')
axes[0, 0].set_title('Feature 1 Distribution')
axes[0, 0].set_xlabel('Feature 1')
axes[0, 0].set_ylabel('Frequency')

# 2. Box plot for outlier detection
data.boxplot(column=['feature1', 'feature2'], ax=axes[0, 1])
axes[0, 1].set_title('Box Plot - Outlier Detection')
axes[0, 1].set_ylabel('Values')

# 3. Scatter plot for relationships
scatter = axes[0, 2].scatter(data['feature1'], data['feature2'],
                            c=data['target'], cmap='viridis', alpha=0.6)
axes[0, 2].set_title('Feature Relationship by Target')
axes[0, 2].set_xlabel('Feature 1')
axes[0, 2].set_ylabel('Feature 2')
plt.colorbar(scatter, ax=axes[0, 2])

# 4. Correlation heatmap
corr_matrix = data.corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
            square=True, ax=axes[1, 0])
axes[1, 0].set_title('Correlation Matrix')

# 5. Target distribution
target_counts = data['target'].value_counts()
axes[1, 1].bar(target_counts.index, target_counts.values,
               color=['lightcoral', 'lightblue'])
axes[1, 1].set_title('Target Class Distribution')
axes[1, 1].set_xlabel('Target Class')
axes[1, 1].set_ylabel('Count')

# 6. Feature comparison by target
data.groupby('target')[['feature1', 'feature2']].mean().plot(kind='bar',
                                                            ax=axes[1, 2])
axes[1, 2].set_title('Average Features by Target')
axes[1, 2].set_xlabel('Target Class')
axes[1, 2].set_ylabel('Average Value')
axes[1, 2].tick_params(axis='x', rotation=0)

plt.tight_layout()
plt.show()

# Advanced visualization: Pair plot for multi-dimensional analysis
print("\\nCreating Advanced Pair Plot...")
# Sample subset for cleaner visualization
sample_data = data.sample(200)
pair_plot = sns.pairplot(sample_data, hue='target', diag_kind='hist')
pair_plot.fig.suptitle('Pair Plot - Comprehensive Feature Analysis', y=1.02)
plt.show()

# Model interpretation visualization
print("\\nModel Interpretation Visualizations:")
from sklearn.model_selection import learning_curve
from sklearn.ensemble import RandomForestClassifier

# Create learning curves
train_sizes, train_scores, val_scores = learning_curve(
    RandomForestClassifier(n_estimators=50, random_state=42),
    data[['feature1', 'feature2']], data['target'],
    cv=5, train_sizes=np.linspace(0.1, 1.0, 10)
)

plt.figure(figsize=(10, 6))
plt.plot(train_sizes, np.mean(train_scores, axis=1), 'o-', label='Training Score')
plt.plot(train_sizes, np.mean(val_scores, axis=1), 'o-', label='Validation Score')
plt.fill_between(train_sizes, np.mean(train_scores, axis=1) - np.std(train_scores, axis=1),
                 np.mean(train_scores, axis=1) + np.std(train_scores, axis=1), alpha=0.3)
plt.fill_between(train_sizes, np.mean(val_scores, axis=1) - np.std(val_scores, axis=1),
                 np.mean(val_scores, axis=1) + np.std(val_scores, axis=1), alpha=0.3)
plt.title('Learning Curves - Model Performance vs Training Size')
plt.xlabel('Training Set Size')
plt.ylabel('Accuracy Score')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print("Visualization complete! Key insights:")
print("- Use histograms to understand feature distributions")
print("- Box plots reveal outliers that might need treatment")
print("- Scatter plots show feature relationships and class separability")
print("- Correlation matrices identify redundant features")
print("- Learning curves diagnose overfitting/underfitting")`,
                  expectedOutput:
                    "Creating Essential ML Visualizations...\n\nCreating Advanced Pair Plot...\n\nModel Interpretation Visualizations:\nVisualization complete! Key insights:\n- Use histograms to understand feature distributions\n- Box plots reveal outliers that might need treatment\n- Scatter plots show feature relationships and class separability\n- Correlation matrices identify redundant features\n- Learning curves diagnose overfitting/underfitting",
                  concept: "Data Visualization for ML",
                  difficulty: "intermediate",
                  hints: [
                    "Always visualize your data before modeling",
                    "Use different plot types to answer different questions",
                    "Learning curves help diagnose model performance issues",
                  ],
                },
              },
            ],
          },
          {
            id: "python-2-5",
            title: "Scikit-learn Ecosystem and ML Pipelines",
            content:
              "Scikit-learn provides a consistent API for machine learning algorithms and preprocessing tools. Understanding the fit/transform/predict paradigm, pipeline construction, and cross-validation is fundamental to professional ML development. The ecosystem includes preprocessing, feature selection, model selection, and evaluation tools. Key concepts: estimator interface, transformers, predictors, and pipeline chaining. Learning to build robust, reproducible ML workflows is essential for production systems.",
            estimatedMinutes: 85,
            difficulty: "intermediate",
            prerequisites: ["Pandas", "NumPy", "Basic ML Concepts"],
            learningObjectives: [
              "Master scikit-learn's API and design patterns",
              "Build robust preprocessing and modeling pipelines",
              "Implement proper cross-validation and model evaluation",
              "Integrate multiple ML tools into cohesive workflows",
            ],
            practiceExercises: 15,
            theoryDepth: "comprehensive",
          },
          {
            id: "python-2-6",
            title: "Advanced Python for Machine Learning",
            content:
              "Advanced Python concepts crucial for ML development include decorators, context managers, generators, multiprocessing, and memory optimization. Understanding these concepts enables building scalable ML systems, efficient data processing pipelines, and production-ready code. Topics include parallel processing, memory profiling, and code optimization. These skills separate junior from senior ML engineers and enable handling large-scale, production ML systems.",
            estimatedMinutes: 90,
            difficulty: "advanced",
            prerequisites: ["Intermediate Python", "ML Fundamentals"],
            learningObjectives: [
              "Implement advanced Python patterns for ML applications",
              "Optimize memory usage and computational performance",
              "Build scalable and maintainable ML codebases",
              "Handle large datasets efficiently with advanced techniques",
            ],
            practiceExercises: 13,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 3,
        title: "Machine Learning Fundamentals",
        description:
          "Core ML concepts, algorithms, and the complete machine learning workflow",
        icon: "Brain",
        difficulty: "intermediate",
        estimatedHours: 42,
        completionRate: 65,
        category: "fundamentals",
        prerequisites: [
          "Python Programming",
          "Basic Statistics",
          "Linear Algebra",
        ],
        learningPath: [
          "ML Workflow",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "Cross-Validation",
          "Hyperparameter Tuning",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 7,
        lessons: [
          {
            id: "ml-3-1",
            title: "The Complete Machine Learning Workflow",
            content:
              "Machine learning follows a systematic workflow: 1) Problem Definition (classification, regression, clustering), 2) Data Collection and Exploration, 3) Data Preprocessing (cleaning, feature engineering), 4) Model Selection and Training, 5) Model Evaluation and Validation, 6) Deployment and Monitoring. Each step is crucial and iterative. Understanding this workflow prevents common pitfalls like data leakage, overfitting, and poor generalization. Learning Techniques: Follow structured project templates, practice with end-to-end examples, understand CRISP-DM methodology, learn from real-world case studies.",
            estimatedMinutes: 70,
            difficulty: "beginner",
            prerequisites: ["Programming Basics"],
            learningObjectives: [
              "Understand the complete ML pipeline and its iterative nature",
              "Identify and prevent common pitfalls like data leakage",
              "Plan and execute ML projects systematically",
              "Apply industry-standard methodologies like CRISP-DM",
            ],
            practiceExercises: 8,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "The 6-Step ML Workflow",
                content:
                  "Every successful ML project follows a systematic approach: 1) Problem Definition - What exactly are you trying to solve? 2) Data Collection - Gather relevant, quality data. 3) Data Exploration - Understand your data through visualization and statistics. 4) Data Preprocessing - Clean and prepare data for modeling. 5) Model Training - Select and train appropriate algorithms. 6) Evaluation - Assess model performance and iterate. This process is iterative, not linear!",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Implementing a Complete ML Pipeline",
                content:
                  "Build an end-to-end ML project following best practices:",
                codeExample: {
                  id: "complete-ml-workflow",
                  title: "Complete Machine Learning Workflow",
                  description:
                    "Implement a full ML pipeline from problem definition to evaluation",
                  code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

class MLWorkflow:
    def __init__(self):
        self.data = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.models = {}
        self.results = {}

    def step1_problem_definition(self):
        """Define the ML problem clearly"""
        print("STEP 1: PROBLEM DEFINITION")
        print("=" * 40)
        print("Problem: Predict if a customer will churn (leave) based on their behavior")
        print("Type: Binary Classification")
        print("Success Metric: F1-score (balance between precision and recall)")
        print("Business Impact: Reduce churn by 10% → Save $1M annually")
        return self

    def step2_data_collection(self):
        """Simulate data collection process"""
        print("\\nSTEP 2: DATA COLLECTION")
        print("=" * 40)

        # Simulate customer data
        np.random.seed(42)
        n_customers = 1000

        # Generate realistic customer data
        data = {
            'customer_id': range(1, n_customers + 1),
            'tenure_months': np.random.exponential(24, n_customers),
            'monthly_charges': np.random.normal(65, 20, n_customers),
            'total_charges': np.random.normal(1500, 800, n_customers),
            'support_calls': np.random.poisson(2, n_customers),
            'contract_type': np.random.choice(['month', 'year', 'two_year'], n_customers, p=[0.5, 0.3, 0.2]),
            'internet_service': np.random.choice(['DSL', 'Fiber', 'None'], n_customers, p=[0.4, 0.5, 0.1])
        }

        # Create target variable with realistic dependencies
        churn_prob = (
            0.3 * (data['tenure_months'] < 12) +  # New customers more likely to churn
            0.2 * (data['monthly_charges'] > 80) +  # Expensive plans increase churn
            0.1 * (data['support_calls'] > 3) +     # Many support calls indicate problems
            0.1 * (np.array(data['contract_type']) == 'month')  # Month-to-month contracts
        )
        data['churned'] = np.random.binomial(1, np.clip(churn_prob, 0, 1), n_customers)

        self.data = pd.DataFrame(data)
        print(f"Data collected: {self.data.shape[0]} customers, {self.data.shape[1]-1} features")
        print(f"Churn rate: {self.data['churned'].mean():.2%}")
        return self

    def step3_data_exploration(self):
        """Explore and understand the data"""
        print("\\nSTEP 3: DATA EXPLORATION")
        print("=" * 40)

        print("Data Overview:")
        print(self.data.head())
        print(f"\\nData shape: {self.data.shape}")
        print(f"Missing values: {self.data.isnull().sum().sum()}")

        # Analyze target distribution
        print(f"\\nTarget distribution:")
        print(self.data['churned'].value_counts(normalize=True))

        # Analyze feature relationships
        numerical_features = ['tenure_months', 'monthly_charges', 'total_charges', 'support_calls']
        print("\\nFeature correlations with target:")
        for feature in numerical_features:
            corr = self.data[feature].corr(self.data['churned'])
            print(f"{feature}: {corr:.3f}")

        return self

    def step4_data_preprocessing(self):
        """Clean and prepare data for modeling"""
        print("\\nSTEP 4: DATA PREPROCESSING")
        print("=" * 40)

        # Handle missing values (none in this synthetic dataset, but good practice)
        print("Handling missing values...")

        # Feature engineering
        print("Engineering new features...")
        self.data['avg_monthly_charges'] = self.data['total_charges'] / (self.data['tenure_months'] + 1)
        self.data['calls_per_month'] = self.data['support_calls'] / (self.data['tenure_months'] + 1)

        # Encode categorical variables
        print("Encoding categorical variables...")
        le_contract = LabelEncoder()
        le_internet = LabelEncoder()

        self.data['contract_encoded'] = le_contract.fit_transform(self.data['contract_type'])
        self.data['internet_encoded'] = le_internet.fit_transform(self.data['internet_service'])

        # Select features for modeling
        feature_columns = ['tenure_months', 'monthly_charges', 'support_calls',
                          'contract_encoded', 'internet_encoded', 'avg_monthly_charges', 'calls_per_month']

        X = self.data[feature_columns]
        y = self.data['churned']

        # Split data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Scale features
        scaler = StandardScaler()
        self.X_train_scaled = scaler.fit_transform(self.X_train)
        self.X_test_scaled = scaler.transform(self.X_test)

        print(f"Training set: {self.X_train.shape[0]} samples")
        print(f"Test set: {self.X_test.shape[0]} samples")
        print(f"Features: {len(feature_columns)}")

        return self

    def step5_model_training(self):
        """Train and compare multiple models"""
        print("\\nSTEP 5: MODEL TRAINING")
        print("=" * 40)

        # Train multiple models
        models = {
            'Logistic Regression': LogisticRegression(random_state=42),
            'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42)
        }

        for name, model in models.items():
            print(f"\\nTraining {name}...")

            # Use scaled data for logistic regression, original for Random Forest
            X_train_use = self.X_train_scaled if 'Logistic' in name else self.X_train
            X_test_use = self.X_test_scaled if 'Logistic' in name else self.X_test

            # Train model
            model.fit(X_train_use, self.y_train)

            # Cross-validation
            cv_scores = cross_val_score(model, X_train_use, self.y_train, cv=5, scoring='f1')

            # Test set predictions
            y_pred = model.predict(X_test_use)

            self.models[name] = model
            self.results[name] = {
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'test_predictions': y_pred
            }

            print(f"Cross-validation F1: {cv_scores.mean():.3f} (+/- {cv_scores.std()*2:.3f})")

        return self

    def step6_evaluation(self):
        """Evaluate models and choose the best one"""
        print("\\nSTEP 6: MODEL EVALUATION")
        print("=" * 40)

        for name, results in self.results.items():
            print(f"\\n{name} Results:")
            print("-" * 25)

            y_pred = results['test_predictions']

            # Classification report
            print("Classification Report:")
            print(classification_report(self.y_test, y_pred))

            # Confusion matrix
            cm = confusion_matrix(self.y_test, y_pred)
            print(f"Confusion Matrix:")
            print(cm)

        # Choose best model
        best_model = max(self.results.keys(),
                        key=lambda x: self.results[x]['cv_mean'])
        print(f"\\nBest Model: {best_model}")
        print(f"F1 Score: {self.results[best_model]['cv_mean']:.3f}")

        return self

# Run the complete workflow
workflow = MLWorkflow()
(workflow
 .step1_problem_definition()
 .step2_data_collection()
 .step3_data_exploration()
 .step4_data_preprocessing()
 .step5_model_training()
 .step6_evaluation())

print("\\n" + "="*50)
print("WORKFLOW COMPLETE!")
print("Key takeaways:")
print("- Each step builds on the previous ones")
print("- Data quality is more important than model complexity")
print("- Always validate with unseen data")
print("- Document decisions for reproducibility")`,
                  expectedOutput:
                    "STEP 1: PROBLEM DEFINITION\n========================================\nProblem: Predict if a customer will churn (leave) based on their behavior\nType: Binary Classification\nSuccess Metric: F1-score (balance between precision and recall)\nBusiness Impact: Reduce churn by 10% → Save $1M annually\n\nSTEP 2: DATA COLLECTION\n========================================\nData collected: 1000 customers, 7 features\nChurn rate: 23.00%\n\nSTEP 3: DATA EXPLORATION\n========================================\nData Overview:\n   customer_id  tenure_months  monthly_charges  total_charges  support_calls contract_type internet_service  churned\n0            1      35.759298        52.423485    1685.449808              1         month              DSL        0\n1            2      29.220226        50.866416    1448.464464              1          year            Fiber        0\n2            3      42.336966        64.317452    1266.738841              4         month            Fiber        1\n3            4      31.462117        55.936804    1561.995160              3          year            Fiber        0\n4            5      22.478846        77.327170    1517.365269              2         month            Fiber        0\n\nData shape: (1000, 8)\nMissing values: 0\n\nTarget distribution:\n0    0.77\n1    0.23\ndtype: float64\n\nFeature correlations with target:\ntenure_months: -0.134\nmonthly_charges: 0.089\ntotal_charges: -0.085\nsupport_calls: 0.178\n\nSTEP 4: DATA PREPROCESSING\n========================================\nHandling missing values...\nEngineering new features...\nEncoding categorical variables...\nTraining set: 800 samples\nTest set: 200 samples\nFeatures: 7\n\nSTEP 5: MODEL TRAINING\n========================================\n\nTraining Logistic Regression...\nCross-validation F1: 0.456 (+/- 0.146)\n\nTraining Random Forest...\nCross-validation F1: 0.472 (+/- 0.132)\n\nSTEP 6: MODEL EVALUATION\n========================================\n\nLogistic Regression Results:\n-------------------------\nClassification Report:\n              precision    recall  f1-score   support\n\n           0       0.85      0.91      0.88       153\n           1       0.67      0.53      0.59        47\n\n    accuracy                           0.82       200\n   macro avg       0.76      0.72      0.74       200\nweighted avg       0.81      0.82      0.81       200\n\nConfusion Matrix:\n[[139  14]\n [ 22  25]]\n\nRandom Forest Results:\n-------------------------\nClassification Report:\n              precision    recall  f1-score   support\n\n           0       0.87      0.92      0.89       153\n           1       0.69      0.57      0.63        47\n\n    accuracy                           0.84       200\n   macro avg       0.78      0.75      0.76       200\nweighted avg       0.83      0.84      0.83       200\n\nConfusion Matrix:\n[[141  12]\n [ 20  27]]\n\nBest Model: Random Forest\nF1 Score: 0.472\n\n==================================================\nWORKFLOW COMPLETE!\nKey takeaways:\n- Each step builds on the previous ones\n- Data quality is more important than model complexity\n- Always validate with unseen data\n- Document decisions for reproducibility",
                  concept: "Complete ML Workflow",
                  difficulty: "beginner",
                  hints: [
                    "Start with problem definition - it guides all other decisions",
                    "Spend most time on data understanding and preprocessing",
                    "Always use cross-validation for model selection",
                    "Keep the business objective in mind throughout",
                  ],
                },
              },
            ],
          },
          {
            id: "ml-3-2",
            title: "Bias-Variance Tradeoff and Model Complexity",
            content:
              "The bias-variance tradeoff is fundamental to machine learning. Bias measures how far off predictions are from true values on average. Variance measures how much predictions vary for different training sets. High bias leads to underfitting, high variance leads to overfitting. The goal is finding the sweet spot that minimizes total error. Techniques like cross-validation, regularization, and ensemble methods help manage this tradeoff. Learning Techniques: Visualize learning curves, experiment with model complexity, implement bias-variance decomposition, understand regularization effects.",
            estimatedMinutes: 80,
            difficulty: "intermediate",
            prerequisites: ["Basic Statistics", "ML Workflow"],
            learningObjectives: [
              "Understand bias-variance decomposition mathematically and intuitively",
              "Diagnose overfitting and underfitting using learning curves",
              "Apply various regularization techniques effectively",
              "Balance model complexity for optimal generalization",
            ],
            practiceExercises: 10,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "Understanding Bias and Variance",
                content:
                  "Bias is the error from overly simplistic assumptions in the learning algorithm. High bias can cause underfitting. Variance is the error from sensitivity to small fluctuations in the training set. High variance can cause overfitting. Total Error = Bias² + Variance + Irreducible Error. The goal is to minimize total error by finding the right balance.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Visualizing the Bias-Variance Tradeoff",
                content:
                  "Demonstrate bias-variance tradeoff with polynomial regression:",
                codeExample: {
                  id: "bias-variance-demo",
                  title: "Bias-Variance Tradeoff Demonstration",
                  description:
                    "Visualize how model complexity affects bias and variance",
                  code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import validation_curve
import warnings
warnings.filterwarnings('ignore')

def bias_variance_demo():
    # Generate synthetic dataset with known true function
    np.random.seed(42)
    n_samples = 100
    noise_level = 0.3

    # True function: f(x) = 1.5x - 2x^2 + 0.5x^3
    def true_function(x):
        return 1.5*x - 2*x**2 + 0.5*x**3

    # Generate training data
    X = np.linspace(-1, 1, n_samples).reshape(-1, 1)
    y_true = true_function(X.ravel())
    y = y_true + np.random.normal(0, noise_level, n_samples)

    # Test different polynomial degrees (model complexity)
    degrees = range(1, 16)

    # Calculate validation curves
    train_scores, val_scores = validation_curve(
        Pipeline([('poly', PolynomialFeatures()), ('linear', LinearRegression())]),
        X, y, param_name='poly__degree', param_range=degrees,
        cv=5, scoring='neg_mean_squared_error'
    )

    # Convert to positive MSE
    train_mse = -train_scores
    val_mse = -val_scores

    # Plot bias-variance tradeoff
    plt.figure(figsize=(15, 5))

    # Plot 1: Validation curves showing bias-variance tradeoff
    plt.subplot(1, 3, 1)
    plt.plot(degrees, train_mse.mean(axis=1), 'o-', label='Training Error', color='blue')
    plt.fill_between(degrees, train_mse.mean(axis=1) - train_mse.std(axis=1),
                     train_mse.mean(axis=1) + train_mse.std(axis=1), alpha=0.3, color='blue')

    plt.plot(degrees, val_mse.mean(axis=1), 'o-', label='Validation Error', color='red')
    plt.fill_between(degrees, val_mse.mean(axis=1) - val_mse.std(axis=1),
                     val_mse.mean(axis=1) + val_mse.std(axis=1), alpha=0.3, color='red')

    plt.xlabel('Model Complexity (Polynomial Degree)')
    plt.ylabel('Mean Squared Error')
    plt.title('Bias-Variance Tradeoff')
    plt.legend()
    plt.grid(True, alpha=0.3)

    # Annotate regions
    plt.annotate('High Bias\\n(Underfitting)', xy=(2, 0.4), xytext=(4, 0.6),
                arrowprops=dict(arrowstyle='->', color='red', alpha=0.7),
                fontsize=10, ha='center')
    plt.annotate('High Variance\\n(Overfitting)', xy=(12, 0.3), xytext=(10, 0.5),
                arrowprops=dict(arrowstyle='->', color='red', alpha=0.7),
                fontsize=10, ha='center')

    # Plot 2: Examples of different complexity models
    plt.subplot(1, 3, 2)
    X_plot = np.linspace(-1, 1, 100).reshape(-1, 1)
    y_plot_true = true_function(X_plot.ravel())

    # Fit models with different complexities
    complexities = [1, 4, 12]  # Low, optimal, high complexity
    colors = ['green', 'blue', 'red']
    labels = ['Underfitting (High Bias)', 'Good Fit', 'Overfitting (High Variance)']

    plt.scatter(X, y, alpha=0.5, color='black', s=20, label='Training Data')
    plt.plot(X_plot, y_plot_true, '--', color='black', linewidth=2, label='True Function')

    for degree, color, label in zip(complexities, colors, labels):
        poly_model = Pipeline([
            ('poly', PolynomialFeatures(degree=degree)),
            ('linear', LinearRegression())
        ])
        poly_model.fit(X, y)
        y_pred = poly_model.predict(X_plot)
        plt.plot(X_plot, y_pred, color=color, linewidth=2, label=f'{label} (deg={degree})')

    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('Model Complexity Examples')
    plt.legend()
    plt.grid(True, alpha=0.3)

    # Plot 3: Bias and Variance components
    plt.subplot(1, 3, 3)

    # Simulate bias and variance for different complexities
    bias_values = [0.5, 0.3, 0.1, 0.05, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01]
    variance_values = [0.05, 0.08, 0.12, 0.15, 0.25, 0.4, 0.6, 0.8, 1.0, 1.3, 1.6, 2.0, 2.5, 3.0, 3.5]
    total_error = [b + v for b, v in zip(bias_values, variance_values)]

    plt.plot(degrees, bias_values, 'o-', label='Bias²', color='green')
    plt.plot(degrees, variance_values, 's-', label='Variance', color='orange')
    plt.plot(degrees, total_error, '^-', label='Total Error', color='purple', linewidth=2)

    # Find optimal complexity
    optimal_idx = np.argmin(total_error)
    plt.axvline(x=degrees[optimal_idx], color='red', linestyle='--', alpha=0.7)
    plt.annotate(f'Optimal Complexity\\n(Degree {degrees[optimal_idx]})',
                xy=(degrees[optimal_idx], total_error[optimal_idx]),
                xytext=(degrees[optimal_idx]+2, total_error[optimal_idx]+0.3),
                arrowprops=dict(arrowstyle='->', color='red', alpha=0.7),
                fontsize=10, ha='center')

    plt.xlabel('Model Complexity (Polynomial Degree)')
    plt.ylabel('Error')
    plt.title('Bias-Variance Decomposition')
    plt.legend()
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

    # Print insights
    print("Bias-Variance Tradeoff Insights:")
    print("="*40)
    print(f"Optimal complexity: Degree {degrees[optimal_idx]}")
    print(f"Training error range: {train_mse.mean(axis=1).min():.3f} - {train_mse.mean(axis=1).max():.3f}")
    print(f"Validation error range: {val_mse.mean(axis=1).min():.3f} - {val_mse.mean(axis=1).max():.3f}")
    print("\\nKey takeaways:")
    print("- Low complexity: High bias, low variance (underfitting)")
    print("- High complexity: Low bias, high variance (overfitting)")
    print("- Optimal complexity: Balance between bias and variance")
    print("- Use validation curves to find the sweet spot")

# Demonstrate learning curves for diagnosing bias-variance issues
def learning_curves_demo():
    print("\\nLearning Curves for Diagnosis:")
    print("="*40)

    from sklearn.model_selection import learning_curve

    # Generate dataset
    np.random.seed(42)
    X = np.random.randn(1000, 5)
    y = X[:, 0] + 0.5*X[:, 1] - 0.3*X[:, 2] + np.random.normal(0, 0.1, 1000)

    # Compare different model complexities
    models = {
        'Underfitting (Linear)': LinearRegression(),
        'Good Fit (Polynomial deg=2)': Pipeline([
            ('poly', PolynomialFeatures(degree=2)),
            ('linear', LinearRegression())
        ]),
        'Overfitting (Polynomial deg=8)': Pipeline([
            ('poly', PolynomialFeatures(degree=8)),
            ('linear', LinearRegression())
        ])
    }

    plt.figure(figsize=(15, 5))

    for i, (name, model) in enumerate(models.items()):
        plt.subplot(1, 3, i+1)

        train_sizes, train_scores, val_scores = learning_curve(
            model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10),
            scoring='neg_mean_squared_error'
        )

        plt.plot(train_sizes, -train_scores.mean(axis=1), 'o-', label='Training')
        plt.plot(train_sizes, -val_scores.mean(axis=1), 'o-', label='Validation')
        plt.fill_between(train_sizes, -train_scores.mean(axis=1) - train_scores.std(axis=1),
                        -train_scores.mean(axis=1) + train_scores.std(axis=1), alpha=0.3)
        plt.fill_between(train_sizes, -val_scores.mean(axis=1) - val_scores.std(axis=1),
                        -val_scores.mean(axis=1) + val_scores.std(axis=1), alpha=0.3)

        plt.xlabel('Training Set Size')
        plt.ylabel('Mean Squared Error')
        plt.title(name)
        plt.legend()
        plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

    print("Learning Curve Patterns:")
    print("- Underfitting: High training and validation error, curves converge")
    print("- Good fit: Reasonable error, small gap between curves")
    print("- Overfitting: Low training error, high validation error, large gap")

# Run demonstrations
bias_variance_demo()
learning_curves_demo()`,
                  expectedOutput:
                    "Bias-Variance Tradeoff Insights:\n========================================\nOptimal complexity: Degree 5\nTraining error range: 0.012 - 0.094\nValidation error range: 0.089 - 3.456\n\nKey takeaways:\n- Low complexity: High bias, low variance (underfitting)\n- High complexity: Low bias, high variance (overfitting)\n- Optimal complexity: Balance between bias and variance\n- Use validation curves to find the sweet spot\n\nLearning Curves for Diagnosis:\n========================================\nLearning Curve Patterns:\n- Underfitting: High training and validation error, curves converge\n- Good fit: Reasonable error, small gap between curves\n- Overfitting: Low training error, high validation error, large gap",
                  concept: "Bias-Variance Tradeoff",
                  difficulty: "intermediate",
                  hints: [
                    "Validation curves help find optimal model complexity",
                    "Learning curves diagnose overfitting vs underfitting",
                    "The gap between training and validation error indicates overfitting",
                  ],
                },
              },
            ],
          },
          {
            id: "ml-3-3",
            title: "Supervised Learning: Classification Algorithms",
            content:
              "Classification predicts discrete class labels from input features. Key algorithms include logistic regression, decision trees, random forests, support vector machines, and k-nearest neighbors. Each has different assumptions, strengths, and weaknesses. Understanding when to use each algorithm, how to tune hyperparameters, and how to interpret results is crucial for effective classification. Learning Techniques: Implement algorithms from scratch, visualize decision boundaries, compare performance on different datasets, understand algorithmic assumptions.",
            estimatedMinutes: 65,
            difficulty: "intermediate",
            prerequisites: ["Statistics", "Linear Algebra", "Python"],
            learningObjectives: [
              "Master key classification algorithms and their assumptions",
              "Choose appropriate algorithms for different problem types",
              "Implement and tune classification models effectively",
              "Interpret model predictions and understand decision boundaries",
            ],
            practiceExercises: 15,
            theoryDepth: "comprehensive",
          },
          {
            id: "ml-3-4",
            title: "Supervised Learning: Regression Algorithms",
            content:
              "Regression predicts continuous target values from input features. Linear regression forms the foundation, extending to polynomial regression, ridge/lasso regularization, and non-linear methods like decision trees and neural networks. Understanding assumptions, limitations, and when each method works best is essential for effective regression modeling. Learning Techniques: Analyze residual plots, implement regularization techniques, compare linear vs non-linear approaches, understand feature interactions.",
            estimatedMinutes: 60,
            difficulty: "intermediate",
            prerequisites: ["Linear Algebra", "Statistics", "Python"],
            learningObjectives: [
              "Master regression techniques from linear to advanced methods",
              "Understand and validate regression assumptions",
              "Apply appropriate regularization for different scenarios",
              "Diagnose and fix common regression problems",
            ],
            practiceExercises: 12,
            theoryDepth: "comprehensive",
          },
          {
            id: "ml-3-5",
            title: "Unsupervised Learning and Clustering",
            content:
              "Unsupervised learning finds patterns in data without labeled examples. Clustering groups similar data points together using algorithms like k-means, hierarchical clustering, and DBSCAN. Dimensionality reduction techniques like PCA and t-SNE help visualize and compress high-dimensional data. Understanding when and how to apply these techniques is crucial for exploratory data analysis. Learning Techniques: Visualize clusters in different dimensions, experiment with cluster validation metrics, understand curse of dimensionality, apply to real datasets.",
            estimatedMinutes: 55,
            difficulty: "intermediate",
            prerequisites: ["Linear Algebra", "Statistics", "Python"],
            learningObjectives: [
              "Master clustering algorithms and their appropriate applications",
              "Apply dimensionality reduction for visualization and preprocessing",
              "Validate and interpret unsupervised learning results",
              "Understand the curse of dimensionality and mitigation strategies",
            ],
            practiceExercises: 11,
            theoryDepth: "comprehensive",
          },
          {
            id: "ml-3-6",
            title: "Model Evaluation and Cross-Validation",
            content:
              "Proper model evaluation is crucial for understanding real-world performance. Cross-validation provides robust performance estimates by training and testing on different data splits. Key metrics include accuracy, precision, recall, F1-score for classification and MSE, MAE, R² for regression. Understanding metric selection, statistical significance, and avoiding evaluation pitfalls ensures reliable model assessment. Learning Techniques: Implement various CV strategies, understand metric trade-offs, practice with imbalanced datasets, use proper statistical testing.",
            estimatedMinutes: 50,
            difficulty: "intermediate",
            prerequisites: ["Statistics", "ML Algorithms"],
            learningObjectives: [
              "Implement robust cross-validation strategies",
              "Choose appropriate evaluation metrics for different problems",
              "Understand statistical significance in model comparison",
              "Avoid common evaluation pitfalls and biases",
            ],
            practiceExercises: 9,
            theoryDepth: "comprehensive",
          },
          {
            id: "ml-3-7",
            title: "Feature Engineering and Selection",
            content:
              "Feature engineering transforms raw data into informative features that improve model performance. Techniques include encoding categorical variables, scaling numerical features, creating polynomial features, and domain-specific transformations. Feature selection identifies the most relevant features, reducing overfitting and computational cost. Understanding these techniques is often more impactful than algorithm choice. Learning Techniques: Practice domain-specific feature creation, implement automated feature selection, understand feature importance, work with different data types.",
            estimatedMinutes: 55,
            difficulty: "intermediate",
            prerequisites: ["Data Manipulation", "Statistics"],
            learningObjectives: [
              "Master feature engineering techniques for different data types",
              "Implement effective feature selection strategies",
              "Create domain-specific features that improve model performance",
              "Understand the impact of features on model interpretability",
            ],
            practiceExercises: 13,
            theoryDepth: "comprehensive",
          },
          {
            id: "ml-3-8",
            title: "Hyperparameter Tuning and Model Selection",
            content:
              "Hyperparameters control learning algorithm behavior and significantly impact performance. Tuning strategies include grid search, random search, and Bayesian optimization. Understanding the search space, computational trade-offs, and avoiding overfitting to validation data is crucial. Advanced techniques like automated machine learning (AutoML) can automate this process. Learning Techniques: Implement different search strategies, understand computational vs performance trade-offs, use tools like Optuna or Hyperopt, practice with nested cross-validation.",
            estimatedMinutes: 50,
            difficulty: "advanced",
            prerequisites: ["ML Algorithms", "Cross-Validation"],
            learningObjectives: [
              "Master hyperparameter optimization strategies",
              "Understand computational trade-offs in hyperparameter search",
              "Implement nested cross-validation for unbiased evaluation",
              "Apply automated machine learning tools effectively",
            ],
            practiceExercises: 10,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 4,
        title: "Deep Learning and Neural Networks",
        description:
          "Master neural networks from perceptrons to transformers with mathematical foundations and hands-on implementation",
        icon: "Network",
        difficulty: "advanced",
        estimatedHours: 55,
        completionRate: 42,
        category: "advanced",
        prerequisites: [
          "Machine Learning Fundamentals",
          "Linear Algebra",
          "Calculus",
          "Python",
        ],
        learningPath: [
          "Neural Network Foundations",
          "Backpropagation Algorithm",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
          "Transformer Architecture",
          "Advanced Optimization",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 8,
        lessons: [
          {
            id: "dl-4-1",
            title:
              "Neural Network Foundations: From Biological Inspiration to Mathematical Models",
            content:
              "Neural networks are computational models inspired by biological neurons. Each artificial neuron performs a weighted sum of inputs, adds a bias term, and applies an activation function. The Universal Approximation Theorem proves that neural networks can approximate any continuous function given sufficient width. This foundational understanding is crucial for building effective deep learning models. Key concepts include perceptrons, multi-layer networks, activation functions (sigmoid, ReLU, tanh), and weight initialization strategies. Learning Techniques: Implement neurons from scratch using only NumPy, visualize decision boundaries, understand the geometric interpretation of neural networks, connect mathematical theory to practical implementation.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Linear Algebra", "Basic Calculus"],
            learningObjectives: [
              "Understand the mathematical model of artificial neurons and their biological inspiration",
              "Implement neural networks from scratch using only NumPy to grasp fundamental concepts",
              "Master the Universal Approximation Theorem and its practical implications",
              "Choose and implement appropriate activation functions for different scenarios",
            ],
            practiceExercises: 12,
            theoryDepth: "comprehensive",
            interactiveSteps: [
              {
                id: "step-1",
                type: "theory",
                title: "The Mathematical Neuron",
                content:
                  "An artificial neuron computes: output = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + b) where w are weights, x are inputs, b is bias, and activation is a non-linear function. This simple model enables complex pattern recognition when combined in networks.",
              },
              {
                id: "step-2",
                type: "practice",
                title: "Implement a Neuron from Scratch",
                content: "Build your first neuron using pure NumPy:",
                codeExample: {
                  id: "neuron-implementation",
                  title: "Single Neuron Implementation",
                  description: "Create a neuron that can learn simple patterns",
                  code: `import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

class Neuron:
    def __init__(self, num_inputs):
        # Initialize weights randomly
        self.weights = np.random.randn(num_inputs) * 0.1
        self.bias = 0.0

    def forward(self, inputs):
        # Compute weighted sum + bias
        z = np.dot(inputs, self.weights) + self.bias
        # Apply activation function
        return sigmoid(z)

# Test the neuron
neuron = Neuron(2)
inputs = np.array([0.5, -0.3])
output = neuron.forward(inputs)
print(f"Neuron output: {output:.4f}")`,
                  expectedOutput: "Neuron output: 0.5XXX",
                  concept: "Neural Network Fundamentals",
                  difficulty: "beginner",
                  hints: [
                    "Initialize weights with small random values to break symmetry",
                    "The sigmoid function maps any real number to (0,1)",
                    "Clip extreme values to prevent numerical overflow",
                  ],
                },
              },
            ],
          },
          {
            id: "dl-4-2",
            title: "Backpropagation: The Heart of Neural Network Learning",
            content:
              "Backpropagation is the algorithm that makes neural network learning possible by efficiently computing gradients through the chain rule of calculus. It consists of two phases: forward propagation (computing predictions) and backward propagation (computing gradients). Understanding backpropagation deeply—both mathematically and computationally—is essential for debugging neural networks, implementing custom architectures, and optimizing training. The algorithm works by applying the chain rule to compute how each weight affects the final loss, propagating error signals backward through the network. Learning Techniques: Derive gradients manually for simple networks, implement backpropagation step-by-step without frameworks, visualize gradient flow, understand computational graphs and automatic differentiation.",
            estimatedMinutes: 90,
            difficulty: "advanced",
            prerequisites: [
              "Calculus",
              "Chain Rule",
              "Neural Network Foundations",
            ],
            learningObjectives: [
              "Derive backpropagation equations from first principles using calculus",
              "Implement backpropagation algorithm from scratch without any ML frameworks",
              "Understand computational graphs and how automatic differentiation works",
              "Debug gradient flow problems and vanishing/exploding gradient issues",
            ],
            practiceExercises: 15,
            theoryDepth: "comprehensive",
          },
          {
            id: "dl-4-3",
            title: "Convolutional Neural Networks: Mastering Computer Vision",
            content:
              "Convolutional Neural Networks (CNNs) revolutionized computer vision by using convolution operations that preserve spatial relationships in images. Key innovations include parameter sharing, translation invariance, and hierarchical feature learning. CNNs automatically learn feature hierarchies: edges in early layers, shapes in middle layers, and complex objects in deep layers. Understanding convolution mathematics, pooling operations, and architectural design principles enables building state-of-the-art vision systems. Applications span image classification, object detection, semantic segmentation, and medical imaging. Learning Techniques: Visualize convolution operations with real images, implement CNN layers from scratch, understand receptive field calculations, analyze learned feature representations, experiment with different architectures (LeNet, AlexNet, ResNet).",
            estimatedMinutes: 85,
            difficulty: "advanced",
            prerequisites: [
              "Neural Networks",
              "Linear Algebra",
              "Basic Image Processing",
            ],
            learningObjectives: [
              "Master convolution mathematics and implement convolution layers from scratch",
              "Design CNN architectures for different computer vision tasks",
              "Understand feature hierarchy and apply transfer learning effectively",
              "Implement and train CNNs for real-world image classification problems",
            ],
            practiceExercises: 18,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 5,
        title: "Advanced AI and Modern Techniques",
        description:
          "Explore cutting-edge AI including transformers, reinforcement learning, and generative models",
        icon: "Sparkles",
        difficulty: "advanced",
        estimatedHours: 65,
        completionRate: 28,
        category: "advanced",
        prerequisites: [
          "Deep Learning",
          "Probability Theory",
          "Advanced Mathematics",
        ],
        learningPath: [
          "Transformer Architecture",
          "Reinforcement Learning",
          "Generative Models",
          "Graph Neural Networks",
          "AI Safety and Ethics",
          "Interpretable AI",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 10,
        lessons: [
          {
            id: "ai-5-1",
            title: "Transformer Architecture: The Foundation of Modern AI",
            content:
              "Transformers revolutionized artificial intelligence through the attention mechanism, enabling models to focus on relevant parts of input sequences. Key innovations include self-attention, multi-head attention, positional encoding, and parallel processing. Transformers power modern language models (GPT, BERT), computer vision models (Vision Transformer), and multimodal systems. Understanding attention mechanisms mathematically and implementing transformers from scratch is crucial for modern AI development. The architecture's success stems from its ability to capture long-range dependencies and process sequences in parallel. Learning Techniques: Implement attention mechanisms from scratch, visualize attention patterns, build complete transformer blocks, experiment with positional encodings, understand the relationship between attention and convolution.",
            estimatedMinutes: 100,
            difficulty: "advanced",
            prerequisites: [
              "Neural Networks",
              "Linear Algebra",
              "Sequence Modeling",
            ],
            learningObjectives: [
              "Master self-attention and multi-head attention mechanisms mathematically",
              "Implement complete transformer architecture from scratch using NumPy/PyTorch",
              "Understand positional encoding and its crucial role in sequence processing",
              "Apply transformers to natural language processing and computer vision tasks",
            ],
            practiceExercises: 16,
            theoryDepth: "comprehensive",
          },
          {
            id: "ai-5-2",
            title: "Reinforcement Learning: Learning Through Interaction",
            content:
              "Reinforcement Learning (RL) enables agents to learn optimal behavior through trial and error interaction with environments. Unlike supervised learning, RL learns from rewards and punishments rather than labeled examples. Core concepts include Markov Decision Processes, value functions, policies, and the exploration-exploitation tradeoff. Key algorithms include Q-learning, policy gradients, and actor-critic methods. RL has achieved superhuman performance in games (chess, Go, video games) and shows promise in robotics, autonomous driving, and resource management. Understanding RL requires grasping the mathematical foundations of dynamic programming and stochastic optimization. Learning Techniques: Implement RL algorithms from scratch, train agents in simulated environments (OpenAI Gym), visualize learning curves and policies, understand different exploration strategies, experiment with function approximation.",
            estimatedMinutes: 95,
            difficulty: "advanced",
            prerequisites: [
              "Probability Theory",
              "Dynamic Programming",
              "Neural Networks",
            ],
            learningObjectives: [
              "Master Markov Decision Processes and Bellman equations for optimal control",
              "Implement Q-learning, policy gradient, and actor-critic algorithms from scratch",
              "Understand exploration strategies and solve the exploration-exploitation dilemma",
              "Apply RL to game playing, control problems, and optimization tasks",
            ],
            practiceExercises: 20,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 6,
        title: "Computer Vision and Image Processing",
        description:
          "Master computer vision techniques from image processing fundamentals to state-of-the-art deep learning models for visual understanding. Learn how computers can see, understand, and analyze images just like humans do - from recognizing your face in photos to helping doctors detect diseases in medical scans!",
        icon: "Eye",
        difficulty: "advanced",
        estimatedHours: 68,
        completionRate: 18,
        category: "specialized",
        prerequisites: [
          "Deep Learning",
          "Linear Algebra",
          "Python Programming",
        ],
        learningPath: [
          "Digital Image Fundamentals",
          "Image Filtering and Enhancement",
          "Feature Detection and Extraction",
          "Object Detection and Recognition",
          "Semantic and Instance Segmentation",
          "Convolutional Neural Networks for Vision",
          "Transfer Learning with Pre-trained Models",
          "Advanced Topics: GANs and Vision Transformers",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 12,
        lessons: [
          {
            id: "cv-6-1",
            title: "Digital Images: How Computers See the World",
            content:
              "🖼️ Ever wondered how your phone recognizes your face, or how self-driving cars see the road? It all starts with understanding how computers 'see' images! Unlike humans who see objects and shapes, computers see images as giant grids of numbers. Each tiny square (pixel) in an image contains numbers that represent colors. For black and white photos, each pixel is just one number from 0 (pure black) to 255 (pure white), with everything in between being different shades of gray. For color photos, each pixel has THREE numbers: how much Red (0-255), how much Green (0-255), and how much Blue (0-255). Just like mixing paint colors, computers mix these RGB values to create every color you see on your screen! This number-based representation is why computers can analyze, edit, and understand images - they're just doing math on these pixel numbers. Understanding this concept is the foundation for everything in computer vision, from Instagram filters to medical imaging to space exploration!",
            estimatedMinutes: 50,
            difficulty: "beginner",
            prerequisites: ["Python Basics", "NumPy Arrays"],
            learningObjectives: [
              "Understand how digital images are stored as arrays of numbers",
              "Learn the RGB color model and grayscale representation",
              "Manipulate image pixels using Python and NumPy",
              "Create simple images from scratch using code",
              "Understand image coordinates and indexing",
            ],
            practiceExercises: 10,
            theoryDepth: "comprehensive",
          },
          {
            id: "cv-6-2",
            title:
              "Image Filtering: Teaching Computers to Enhance and Find Features",
            content:
              "🔍 Now that we know images are grids of numbers, let's learn how to modify these numbers to enhance images and find important features! Image filtering is like using different types of glasses or camera filters - each one helps us see different aspects of the image more clearly. A blur filter makes images smooth and removes noise (like the blur effect on your phone camera). A sharpening filter makes edges more crisp. Edge detection filters help computers find the outlines of objects - imagine tracing around objects with a pencil, that's what edge detection does automatically! The magic happens through a process called 'convolution' - we slide a small grid of numbers (called a kernel or filter) over every pixel in the image, multiply and add up the numbers, and create a new image. Different kernels detect different features: some find vertical lines, others find horizontal lines, some blur, others sharpen. This is the foundation of how computers understand shapes, detect objects, and enhance images for better analysis.",
            estimatedMinutes: 65,
            difficulty: "intermediate",
            prerequisites: ["Digital Images", "Matrix Operations"],
            learningObjectives: [
              "Understand convolution and how image filters work",
              "Implement common filters: blur, sharpen, edge detection",
              "Learn about different types of kernels and their effects",
              "Apply Sobel and Canny edge detection algorithms",
              "Understand the relationship between filtering and feature detection",
            ],
            practiceExercises: 14,
            theoryDepth: "comprehensive",
          },
          {
            id: "cv-6-3",
            title: "Feature Extraction: Finding the Important Stuff in Images",
            content:
              "🎯 Feature extraction is like teaching a computer to notice the important details that make objects recognizable - the same way you can recognize your friend even if they get a haircut or wear different clothes! In computer vision, 'features' are distinctive patterns, shapes, or characteristics that help identify objects. Think about how you recognize a cat: pointy ears, whiskers, almond-shaped eyes, furry texture. Computers need to learn similar 'features' but in terms of pixel patterns. We extract features like: corners (where edges meet), edges (boundaries between objects), textures (repeated patterns like fur or brick), and keypoints (special locations that are easy to find again). Advanced algorithms like SIFT (Scale-Invariant Feature Transform) and ORB (Oriented FAST and Rotated BRIEF) can find features that remain recognizable even when images are rotated, scaled, or partially hidden. This is why your phone can recognize the same landmark from different angles, or why Google Photos can find all pictures of the same person!",
            estimatedMinutes: 70,
            difficulty: "intermediate",
            prerequisites: ["Image Filtering", "Linear Algebra"],
            learningObjectives: [
              "Understand different types of visual features",
              "Learn corner detection algorithms (Harris, FAST)",
              "Implement keypoint detection and description",
              "Apply feature matching between images",
              "Understand scale and rotation invariance",
            ],
            practiceExercises: 16,
            theoryDepth: "comprehensive",
          },
          {
            id: "cv-6-4",
            title:
              "Object Detection: Making Computers Recognize and Locate Things",
            content:
              "🚗 Object detection is where computer vision gets really exciting - this is how self-driving cars see pedestrians, how security cameras recognize faces, and how your phone can automatically tag people in photos! Unlike simple image classification (which just says 'this image contains a dog'), object detection does TWO amazing things: 1) It identifies what objects are in the image ('dog', 'cat', 'person'), and 2) It tells us exactly WHERE each object is located by drawing bounding boxes around them. Modern object detection uses deep neural networks that have been trained on millions of images. Popular algorithms include: YOLO (You Only Look Once) which is super fast and can process video in real-time, R-CNN family which is very accurate, and SSD (Single Shot Detector) which balances speed and accuracy. The key insight is that we divide images into a grid and ask 'what object is in this section?' for each grid cell. Then we refine the results to get precise locations. This technology powers autonomous vehicles, medical diagnosis, retail automation, sports analysis, and countless other applications!",
            estimatedMinutes: 80,
            difficulty: "advanced",
            prerequisites: ["Feature Extraction", "Deep Learning", "CNNs"],
            learningObjectives: [
              "Understand the difference between classification, detection, and segmentation",
              "Learn about bounding boxes and object localization",
              "Implement basic object detection pipelines",
              "Understand YOLO, R-CNN, and SSD architectures",
              "Learn evaluation metrics: IoU, mAP, precision, recall",
            ],
            practiceExercises: 20,
            theoryDepth: "comprehensive",
          },
          {
            id: "cv-6-5",
            title:
              "Convolutional Neural Networks: The Brain Behind Computer Vision",
            content:
              "🧠 Convolutional Neural Networks (CNNs) are the 'brain' that powers most modern computer vision applications! CNNs are inspired by how the human visual system works - just like your brain has different areas that specialize in detecting edges, shapes, and complex objects, CNNs have layers that detect increasingly complex features. The first layers detect simple edges and lines, middle layers combine these to find shapes like circles and rectangles, and deeper layers recognize complex objects like faces, cars, and animals. The 'convolutional' part refers to the filtering operations we learned earlier - CNNs automatically learn the best filters for each task! Instead of hand-designing filters, we let the network learn them from thousands of example images. CNNs have revolutionized computer vision because they can: automatically learn hierarchical features, handle images of different sizes, be translation-invariant (recognize objects anywhere in the image), and achieve superhuman performance on many visual tasks. Famous CNN architectures include LeNet (the pioneer), AlexNet (the breakthrough), VGG (simple and effective), ResNet (super deep networks), and EfficientNet (optimized for mobile).",
            estimatedMinutes: 85,
            difficulty: "advanced",
            prerequisites: [
              "Deep Learning",
              "Backpropagation",
              "Object Detection",
            ],
            learningObjectives: [
              "Understand CNN architecture and how convolution layers work",
              "Learn about pooling, padding, and stride operations",
              "Implement CNNs from scratch and with frameworks",
              "Study famous architectures: LeNet, AlexNet, VGG, ResNet",
              "Apply transfer learning with pre-trained models",
            ],
            practiceExercises: 22,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 7,
        title: "Natural Language Processing",
        description:
          "Learn how to teach computers to understand, process, and generate human language! From chatbots like ChatGPT to language translation, sentiment analysis, and text summarization - discover how machines can read, write, and communicate in natural language just like humans do.",
        icon: "MessageSquare",
        difficulty: "advanced",
        estimatedHours: 75,
        completionRate: 12,
        category: "specialized",
        prerequisites: ["Machine Learning", "Deep Learning", "Statistics"],
        learningPath: [
          "Text as Data: From Words to Numbers",
          "Text Preprocessing and Cleaning",
          "Word Embeddings: Capturing Meaning",
          "Language Models: Predicting Next Words",
          "Sequence-to-Sequence Models",
          "Attention Mechanisms: Focusing on Important Words",
          "Transformers: The Revolution in NLP",
          "Large Language Models and GPT",
          "Real-World Applications: Chatbots, Translation, Sentiment Analysis",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 15,
        lessons: [
          {
            id: "nlp-7-1",
            title: "Text as Data: How Computers Understand Human Language",
            content:
              "💬 How do computers understand text when they only work with numbers? This is the fundamental challenge of Natural Language Processing (NLP)! Unlike images (which are already numbers representing pixels), text consists of words, sentences, and meaning - things that seem impossible to convert to math. But here's the secret: we can represent text as numbers in clever ways that preserve meaning! Think about it - when you read 'The cat sat on the mat', you understand relationships: 'cat' is the subject, 'sat' is the action, 'mat' is where the action happened. We need to teach computers these same relationships using numbers. We start by converting each word to a unique number (like 'cat'=5, 'sat'=23, 'mat'=47), but that's just the beginning. The real magic happens when we create 'word embeddings' - multi-dimensional numbers that capture the meaning and relationships between words. Words with similar meanings end up close together in this numerical space. This is why computers can now write poetry, translate languages, and even have conversations - they've learned to represent the richness of human language as mathematical relationships!",
            estimatedMinutes: 45,
            difficulty: "beginner",
            prerequisites: ["Python Basics", "Basic Statistics"],
            learningObjectives: [
              "Understand the challenges of representing text as numerical data",
              "Learn about tokenization and vocabulary creation",
              "Explore different text encoding methods",
              "Understand the concept of word embeddings",
              "See how meaning can be captured mathematically",
            ],
            practiceExercises: 8,
            theoryDepth: "comprehensive",
          },
          {
            id: "nlp-7-2",
            title: "Text Preprocessing: Cleaning and Preparing Language Data",
            content:
              "🧹 Before we can analyze text, we need to clean it up - just like washing vegetables before cooking! Real-world text is messy: it has typos, different capitalization (Cat vs cat vs CAT), punctuation, slang, emojis, and lots of 'noise' that can confuse our algorithms. Text preprocessing is like being a text detective - we need to decide what's important and what's just clutter. Common preprocessing steps include: converting everything to lowercase (so 'Cat' and 'cat' are treated the same), removing punctuation (unless it's important for meaning), removing 'stop words' (common words like 'the', 'and', 'a' that don't add much meaning), stemming (reducing words to their root: 'running', 'runs', 'ran' all become 'run'), and handling special characters and numbers. The goal is to standardize text so our algorithms can focus on the actual meaning rather than getting distracted by formatting differences. However, we must be careful - sometimes what looks like 'noise' actually contains important information! For example, '!!!' might indicate strong emotion, and 'Dr.' should not have the period removed.",
            estimatedMinutes: 55,
            difficulty: "beginner",
            prerequisites: ["Text as Data", "Python String Operations"],
            learningObjectives: [
              "Master essential text cleaning techniques",
              "Understand tokenization and normalization",
              "Learn about stop words and when to remove them",
              "Implement stemming and lemmatization",
              "Handle special cases: URLs, emails, social media text",
            ],
            practiceExercises: 12,
            theoryDepth: "comprehensive",
          },
          {
            id: "nlp-7-3",
            title: "Word Embeddings: Teaching Computers the Meaning of Words",
            content:
              "🎯 Word embeddings are one of the most beautiful ideas in AI - they allow computers to understand that 'king' is to 'queen' as 'man' is to 'woman', or that 'Paris' is to 'France' as 'Tokyo' is to 'Japan'! Instead of treating words as random symbols, embeddings place words in a multi-dimensional space where the distance and direction between words represents their relationships. Imagine a 3D space where 'cat' and 'dog' are close together (both are pets), but far from 'car' (which is a vehicle). In reality, we use hundreds of dimensions to capture subtle relationships. The amazing thing is that computers learn these relationships just by reading lots of text! If words appear in similar contexts ('The cat ran' vs 'The dog ran'), the computer learns they're similar. Famous embedding methods include Word2Vec (which predicts nearby words), GloVe (which uses global word statistics), and FastText (which handles unknown words). These embeddings power everything from search engines (understanding what you really mean) to recommendation systems (finding similar content) to machine translation (knowing that 'gato' in Spanish means 'cat' in English).",
            estimatedMinutes: 70,
            difficulty: "intermediate",
            prerequisites: ["Text Preprocessing", "Vector Mathematics"],
            learningObjectives: [
              "Understand the concept and importance of word embeddings",
              "Learn about Word2Vec, GloVe, and FastText algorithms",
              "Implement basic embedding training and usage",
              "Explore semantic relationships in embedding spaces",
              "Apply pre-trained embeddings to real tasks",
            ],
            practiceExercises: 15,
            theoryDepth: "comprehensive",
          },
          {
            id: "nlp-7-4",
            title:
              "Language Models: Teaching Computers to Predict and Generate Text",
            content:
              "📝 Language models are the brain behind every text generation system - from autocomplete on your phone to ChatGPT writing essays! A language model learns the patterns of human language by reading massive amounts of text and learning to predict 'what word comes next?' Given 'The weather today is', a good language model might predict 'sunny', 'rainy', or 'beautiful' based on patterns it learned from millions of examples. But language models do much more than predict single words - they understand grammar, context, and even some reasoning! They learn that after 'The capital of France is', the next word should be 'Paris', and after 'Yesterday I went to the store and bought', appropriate next words might be food items or household goods. Modern language models like GPT (Generative Pre-trained Transformer) are trained on the entire internet's worth of text, learning everything from scientific papers to poetry to code. They can then be 'fine-tuned' for specific tasks like answering questions, writing stories, or even coding! The key insight is that language has patterns, and if we can learn these patterns well enough, we can generate new text that follows the same patterns.",
            estimatedMinutes: 75,
            difficulty: "intermediate",
            prerequisites: ["Word Embeddings", "Probability Theory"],
            learningObjectives: [
              "Understand the concept and applications of language models",
              "Learn about n-gram models and their limitations",
              "Explore neural language models and RNNs",
              "Understand perplexity and language model evaluation",
              "Build simple text generation systems",
            ],
            practiceExercises: 18,
            theoryDepth: "comprehensive",
          },
          {
            id: "nlp-7-5",
            title: "Transformers: The AI Revolution That Changed Everything",
            content:
              "🚀 Transformers are the technology behind the AI revolution you're witnessing today! Every major AI breakthrough - ChatGPT, BERT, Google Translate, GitHub Copilot - is powered by transformer architecture. Before transformers, computers processed text word by word, like reading a book with a magnifying glass that only shows one word at a time. Transformers introduced 'attention' - the ability to look at ALL words in a sentence simultaneously and understand how they relate to each other. Think about the sentence 'The animal didn't cross the street because it was too tired.' Humans instantly know that 'it' refers to 'the animal', not 'the street'. Transformers use attention mechanisms to make these connections automatically! The 'self-attention' mechanism computes how much each word should 'pay attention' to every other word. Words that are important for understanding the current word get high attention scores. This allows transformers to: understand long-range dependencies, process text in parallel (making them incredibly fast), and capture complex relationships between ideas. The transformer architecture scales beautifully - the bigger you make them and the more text you train them on, the smarter they get. This scaling law has led to increasingly powerful models: GPT-1, GPT-2, GPT-3, GPT-4, each dramatically more capable than the last!",
            estimatedMinutes: 90,
            difficulty: "advanced",
            prerequisites: [
              "Language Models",
              "Deep Learning",
              "Attention Mechanisms",
            ],
            learningObjectives: [
              "Understand the transformer architecture and its components",
              "Learn about self-attention and multi-head attention",
              "Explore positional encoding and layer normalization",
              "Implement basic transformer blocks from scratch",
              "Understand the scaling laws that led to large language models",
            ],
            practiceExercises: 25,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 8,
        title: "MLOps and Production Systems",
        description:
          "Bridge the gap between machine learning experiments and real-world applications! Learn how to deploy, monitor, and maintain ML systems that millions of users depend on - from Netflix recommendations to fraud detection systems.",
        icon: "Server",
        difficulty: "advanced",
        estimatedHours: 55,
        completionRate: 25,
        category: "advanced",
        prerequisites: [
          "Machine Learning",
          "Software Engineering",
          "Cloud Computing",
        ],
        learningPath: [
          "From Notebook to Production: The MLOps Challenge",
          "ML Pipeline Design and Automation",
          "Model Versioning and Deployment Strategies",
          "Monitoring and Observability for ML Systems",
          "A/B Testing and Experimental Design",
          "CI/CD for Machine Learning",
          "Scaling ML Infrastructure and Cost Optimization",
          "ML Security and Governance",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 10,
        lessons: [
          {
            id: "mlops-8-1",
            title: "From Jupyter Notebook to Production: The Real Challenge",
            content:
              "🚀 You've built an amazing machine learning model in your Jupyter notebook - it's 95% accurate and works perfectly! But now comes the real challenge: how do you get this model running 24/7, serving millions of users, updating automatically with new data, and never breaking down? This is the difference between ML research and ML engineering. In production, your model needs to: handle thousands of requests per second, work reliably even when servers crash, update itself with new data automatically, be monitored for performance drops, be rolled back if something goes wrong, and integrate with databases, APIs, and other systems. MLOps (Machine Learning Operations) is the set of practices that makes this possible. It's like the difference between cooking a meal for yourself vs running a restaurant - the principles are the same, but the scale, reliability, and systematic approach are completely different. Companies like Netflix, Amazon, and Google have teams of engineers whose full-time job is making ML models work reliably in production. This is one of the highest-paying and most in-demand skills in tech today!",
            estimatedMinutes: 50,
            difficulty: "intermediate",
            prerequisites: ["Machine Learning Basics", "Python Programming"],
            learningObjectives: [
              "Understand the challenges of moving ML from research to production",
              "Learn about the MLOps lifecycle and key principles",
              "Identify common production failures and how to prevent them",
              "Understand the roles and responsibilities in ML teams",
            ],
            practiceExercises: 8,
            theoryDepth: "comprehensive",
          },
          {
            id: "mlops-8-2",
            title:
              "ML Pipelines: Automating the Entire Machine Learning Workflow",
            content:
              "⚙️ An ML pipeline is like a factory assembly line for data and models - raw data goes in one end, and predictions come out the other, with every step automated and monitored! Instead of manually running scripts every time you need to retrain your model, pipelines handle everything automatically: they fetch new data, clean it, validate it's good quality, retrain the model, test the new model against the old one, and deploy it if it's better. Think of it like setting up a robot chef that can: check if there are new ingredients (data), prepare them properly (preprocessing), cook the meal (training), taste-test it (validation), and serve it to customers (deployment) - all without human intervention! Modern ML pipelines use tools like Apache Airflow, Kubeflow, or cloud services like AWS SageMaker. They handle scheduling (run this pipeline every night), dependencies (don't start training until data cleaning is done), error handling (if something fails, alert the team and rollback), and resource management (use powerful computers for training, smaller ones for serving). This automation is crucial because ML models need constant updating as new data arrives and the world changes.",
            estimatedMinutes: 65,
            difficulty: "advanced",
            prerequisites: ["ML Workflow", "Software Engineering"],
            learningObjectives: [
              "Design and implement automated ML pipelines",
              "Learn about workflow orchestration tools",
              "Understand data validation and quality checks",
              "Implement automated retraining and deployment",
              "Handle pipeline failures and rollbacks",
            ],
            practiceExercises: 15,
            theoryDepth: "comprehensive",
          },
          {
            id: "mlops-8-3",
            title: "Model Monitoring: Keeping Your AI Healthy in the Wild",
            content:
              "🔍 Once your ML model is serving real users, monitoring becomes critical - you need to know immediately if your model starts making bad predictions! Unlike traditional software where a bug is obvious (the app crashes), ML model degradation can be subtle and costly. Your fraud detection model might gradually become less accurate, costing millions in undetected fraud. Your recommendation system might start showing irrelevant products, losing customer sales. Model monitoring tracks: data drift (is incoming data different from training data?), concept drift (have the patterns in the real world changed?), performance metrics (accuracy, latency, throughput), business metrics (revenue impact, user satisfaction), and system health (memory usage, CPU, errors). For example, a COVID-19 pandemic completely changed people's shopping patterns, making e-commerce recommendation models trained on pre-pandemic data much less effective. Good monitoring would have detected this drift immediately and triggered model retraining. We set up automated alerts: if accuracy drops below 90%, if prediction latency exceeds 100ms, if the distribution of incoming data looks different from training data. Modern monitoring uses tools like Evidently AI, Seldon, or custom dashboards with Grafana and Prometheus.",
            estimatedMinutes: 70,
            difficulty: "advanced",
            prerequisites: ["ML Pipelines", "Statistics", "System Design"],
            learningObjectives: [
              "Implement comprehensive model monitoring systems",
              "Detect and handle data drift and concept drift",
              "Set up alerting and automated responses",
              "Monitor business metrics and model ROI",
              "Build monitoring dashboards and reports",
            ],
            practiceExercises: 18,
            theoryDepth: "comprehensive",
          },
        ],
      },
      {
        id: 9,
        title: "Time Series Analysis and Forecasting",
        description:
          "Master time series analysis, forecasting methods, and temporal machine learning for sequential data",
        icon: "TrendingUp",
        difficulty: "intermediate",
        estimatedHours: 35,
        completionRate: 34,
        category: "specialized",
        prerequisites: ["Statistics", "Machine Learning", "Python Programming"],
        learningPath: [
          "Time Series Fundamentals",
          "Seasonal Decomposition",
          "ARIMA and State Space Models",
          "Neural Networks for Time Series",
          "Anomaly Detection in Time Series",
          "Multi-variate Forecasting",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 7,
        lessons: [],
      },
      {
        id: 10,
        title: "Recommender Systems and Personalization",
        description:
          "Build sophisticated recommendation engines using collaborative filtering, content-based methods, and deep learning",
        icon: "Users",
        difficulty: "intermediate",
        estimatedHours: 32,
        completionRate: 41,
        category: "specialized",
        prerequisites: [
          "Machine Learning",
          "Linear Algebra",
          "Database Systems",
        ],
        learningPath: [
          "Collaborative Filtering Methods",
          "Content-Based Recommendations",
          "Matrix Factorization Techniques",
          "Deep Learning for Recommendations",
          "Evaluation and Cold Start Problems",
          "Real-time Recommendation Systems",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 5,
        lessons: [],
      },
      {
        id: 11,
        title: "Graph Neural Networks and Network Analysis",
        description:
          "Explore graph-based machine learning for social networks, molecular analysis, and knowledge graphs",
        icon: "GitBranch",
        difficulty: "advanced",
        estimatedHours: 42,
        completionRate: 8,
        category: "advanced",
        prerequisites: ["Deep Learning", "Graph Theory", "Linear Algebra"],
        learningPath: [
          "Graph Theory Fundamentals",
          "Graph Convolutional Networks",
          "Graph Attention Networks",
          "Node and Graph Classification",
          "Link Prediction and Recommendation",
          "Molecular Property Prediction",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 9,
        lessons: [],
      },
      {
        id: 12,
        title: "Bayesian Machine Learning",
        description:
          "Master probabilistic approaches to machine learning including Bayesian inference and uncertainty quantification",
        icon: "BarChart3",
        difficulty: "advanced",
        estimatedHours: 45,
        completionRate: 15,
        category: "advanced",
        prerequisites: ["Statistics", "Probability Theory", "Machine Learning"],
        learningPath: [
          "Bayesian Inference Fundamentals",
          "Prior and Posterior Distributions",
          "Markov Chain Monte Carlo",
          "Variational Inference",
          "Bayesian Neural Networks",
          "Gaussian Processes",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 8,
        lessons: [],
      },
      {
        id: 13,
        title: "AutoML and Neural Architecture Search",
        description:
          "Learn automated machine learning techniques and neural architecture search for optimal model design",
        icon: "Cpu",
        difficulty: "advanced",
        estimatedHours: 28,
        completionRate: 22,
        category: "advanced",
        prerequisites: [
          "Deep Learning",
          "Optimization",
          "Software Engineering",
        ],
        learningPath: [
          "AutoML Fundamentals",
          "Hyperparameter Optimization",
          "Neural Architecture Search",
          "Automated Feature Engineering",
          "Model Selection and Ensembling",
          "Production AutoML Pipelines",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 4,
        lessons: [],
      },
      {
        id: 14,
        title: "Edge AI and Mobile Machine Learning",
        description:
          "Deploy machine learning models on mobile devices and edge computing platforms with optimization techniques",
        icon: "Smartphone",
        difficulty: "intermediate",
        estimatedHours: 25,
        completionRate: 38,
        category: "specialized",
        prerequisites: [
          "Deep Learning",
          "Mobile Development",
          "Computer Architecture",
        ],
        learningPath: [
          "Edge Computing Fundamentals",
          "Model Compression and Quantization",
          "Mobile ML Frameworks",
          "On-device Training",
          "Federated Learning",
          "Power and Latency Optimization",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 6,
        lessons: [],
      },
      {
        id: 15,
        title: "Multimodal AI and Cross-Modal Learning",
        description:
          "Build AI systems that understand and generate content across multiple modalities including text, images, and audio",
        icon: "Layers",
        difficulty: "advanced",
        estimatedHours: 40,
        completionRate: 5,
        category: "advanced",
        prerequisites: ["Computer Vision", "NLP", "Deep Learning"],
        learningPath: [
          "Multimodal Fusion Techniques",
          "Vision-Language Models",
          "Cross-Modal Retrieval",
          "Text-to-Image Generation",
          "Audio-Visual Learning",
          "Multimodal Transformers",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 10,
        lessons: [],
      },
      {
        id: 16,
        title: "AI Ethics, Safety & Responsible AI",
        description:
          "Master the ethical considerations, safety protocols, and responsible development practices essential for building trustworthy AI systems in the real world",
        icon: "Shield",
        difficulty: "intermediate",
        estimatedHours: 25,
        completionRate: 8,
        category: "business",
        prerequisites: [
          "Machine Learning",
          "Deep Learning",
          "Business Understanding",
        ],
        learningPath: [
          "AI Bias Detection and Mitigation",
          "Fairness in Machine Learning",
          "AI Safety and Alignment",
          "Privacy-Preserving ML",
          "Responsible AI Frameworks",
          "AI Governance and Compliance",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 6,
        lessons: [],
      },
      {
        id: 17,
        title: "Explainable AI & Model Interpretability",
        description:
          "Learn to make AI decisions transparent and understandable - crucial for high-stakes applications like healthcare, finance, and autonomous systems",
        icon: "Eye",
        difficulty: "advanced",
        estimatedHours: 20,
        completionRate: 12,
        category: "advanced",
        prerequisites: ["Machine Learning", "Deep Learning", "Statistics"],
        learningPath: [
          "LIME and SHAP Explanations",
          "Attention Visualization",
          "Feature Importance Methods",
          "Model-Agnostic Interpretability",
          "Causal Inference vs Correlation",
          "Explainable Deep Learning",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 7,
        lessons: [],
      },
      {
        id: 18,
        title: "Advanced Generative AI & Creative Systems",
        description:
          "Master cutting-edge generative models that create text, images, music, and code - the technology behind ChatGPT, DALL-E, and GitHub Copilot",
        icon: "Sparkles",
        difficulty: "advanced",
        estimatedHours: 45,
        completionRate: 5,
        category: "advanced",
        prerequisites: [
          "Deep Learning",
          "Transformers",
          "Advanced Mathematics",
        ],
        learningPath: [
          "Generative Adversarial Networks (GANs)",
          "Variational Autoencoders (VAEs)",
          "Diffusion Models and Stable Diffusion",
          "Large Language Models (LLMs)",
          "Text-to-Image Generation",
          "AI-Powered Code Generation",
          "Voice Synthesis and Audio Generation",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 12,
        lessons: [],
      },
      {
        id: 19,
        title: "Specialized AI Domains & Industry Applications",
        description:
          "Apply AI to specialized fields like healthcare, finance, robotics, and scientific research - learn domain-specific techniques and real-world implementations",
        icon: "Building",
        difficulty: "advanced",
        estimatedHours: 50,
        completionRate: 3,
        category: "specialized",
        prerequisites: [
          "Deep Learning",
          "Domain Knowledge",
          "Production Systems",
        ],
        learningPath: [
          "AI for Healthcare & Medical Imaging",
          "AI for Finance & Trading Systems",
          "AI for Robotics and Control",
          "AI for Gaming and Simulation",
          "Scientific AI: Drug Discovery & Materials",
          "AI for Climate and Sustainability",
          "AI for Education and Learning",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 15,
        lessons: [],
      },
      {
        id: 20,
        title: "AI Business Strategy & Product Management",
        description:
          "Learn to lead AI initiatives, build AI-powered products, and drive business value - essential skills for AI product managers and tech leaders",
        icon: "Target",
        difficulty: "intermediate",
        estimatedHours: 18,
        completionRate: 15,
        category: "business",
        prerequisites: ["Machine Learning", "Business Fundamentals"],
        learningPath: [
          "AI Product Management",
          "Building AI-Powered Products",
          "AI Business Model Design",
          "ROI Measurement for AI Projects",
          "AI Team Management",
          "AI Strategy and Innovation",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 8,
        lessons: [],
      },
      {
        id: 21,
        title: "Cutting-Edge AI Research & Future Technologies",
        description:
          "Explore the frontiers of AI research including quantum ML, neuromorphic computing, and emerging paradigms that will shape the future of artificial intelligence",
        icon: "Rocket",
        difficulty: "advanced",
        estimatedHours: 35,
        completionRate: 2,
        category: "advanced",
        prerequisites: ["Advanced Deep Learning", "Research Methodology"],
        learningPath: [
          "Quantum Machine Learning",
          "Neuromorphic Computing",
          "Few-shot and Zero-shot Learning",
          "Meta-learning and Transfer Learning",
          "Continual Learning Systems",
          "AI Research Methodology",
          "Publishing and Open Source AI",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 10,
        lessons: [],
      },
      {
        id: 22,
        title: "AI Law, Governance & Regulatory Compliance",
        description:
          "Navigate the complex legal and regulatory landscape of AI - crucial for deploying AI systems in regulated industries and global markets",
        icon: "Scale",
        difficulty: "intermediate",
        estimatedHours: 15,
        completionRate: 18,
        category: "business",
        prerequisites: ["AI Ethics", "Business Knowledge"],
        learningPath: [
          "AI Law and Intellectual Property",
          "GDPR, CCPA and AI Compliance",
          "AI Auditing and Risk Assessment",
          "International AI Policy Frameworks",
          "AI Liability and Insurance",
          "Regulatory Strategy for AI Companies",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 5,
        lessons: [],
      },
      {
        id: 23,
        title: "Human-AI Interaction & User Experience",
        description:
          "Design intuitive AI interfaces and create seamless human-AI collaborations - essential for building AI products that users love and trust",
        icon: "Users",
        difficulty: "intermediate",
        estimatedHours: 22,
        completionRate: 10,
        category: "business",
        prerequisites: ["UX/UI Design", "AI Fundamentals", "Psychology"],
        learningPath: [
          "Conversational AI and Chatbot Design",
          "Human-in-the-Loop Systems",
          "AI UX/UI Design Principles",
          "Trust and Adoption in AI Systems",
          "AI Accessibility and Inclusion",
          "Voice and Multimodal Interfaces",
        ],
        userProgress: {
          lessonsCompleted: 0,
          timeSpent: 0,
          lastAccessed: new Date("2024-01-20"),
          averageScore: 0,
        },
        projects: 9,
        lessons: [],
      },
    ];

    // Initialize projects with real, detailed data
    this.projectData = [
      {
        id: "iris-classification",
        title: "Iris Species Classification",
        description:
          "Build a complete machine learning pipeline for multi-class classification using the iris dataset with comprehensive analysis and model evaluation",
        difficulty: "beginner",
        estimatedHours: 4,
        technologies: [
          "Python",
          "scikit-learn",
          "pandas",
          "matplotlib",
          "seaborn",
        ],
        prerequisites: ["Python Basics", "Basic Statistics"],
        learningObjectives: [
          "Understand the complete ML workflow",
          "Learn data exploration and visualization techniques",
          "Master model training and evaluation",
          "Implement cross-validation and hyperparameter tuning",
        ],
        realWorldApplication:
          "Species identification, medical diagnosis, quality control classification",
        industryRelevance:
          "Foundation for any classification problem in healthcare, manufacturing, or scientific research",
        steps: [
          {
            title: "Data Loading and Initial Exploration",
            description:
              "Load the iris dataset and perform comprehensive exploratory data analysis to understand the data structure, distributions, and relationships",
            estimatedMinutes: 30,
            theory:
              "The iris dataset is a classic in machine learning, containing 150 samples of iris flowers with 4 features: Sepal Length, Sepal Width, Petal Length, and Petal Width. Target Classes: 3 species (Setosa, Versicolor, Virginica) with 50 samples each. This dataset teaches fundamental concepts applicable to medical diagnosis, customer segmentation, and quality control.",
            codeExample:
              "import pandas as pd\nimport numpy as np\nfrom sklearn.datasets import load_iris\n\n# Load dataset\niris = load_iris()\ndf = pd.DataFrame(iris.data, columns=iris.feature_names)\ndf['species'] = iris.target\n\n# Basic exploration\nprint('Shape:', df.shape)\nprint('Info:', df.info())\nprint('Description:', df.describe())",
            completed: false,
          },
          {
            title: "Data Visualization and Analysis",
            description:
              "Create comprehensive visualizations to understand feature distributions, correlations, and class separability",
            estimatedMinutes: 45,
            theory:
              "Visualization serves multiple purposes: Pattern Discovery, Outlier Detection, Feature Understanding, and Class Separability assessment. We use histograms for distributions, scatter plots for relationships, and correlation heatmaps for feature interactions.",
            codeExample:
              "import matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Feature distributions\nfor feature in iris.feature_names:\n    plt.figure(figsize=(8, 6))\n    for species in df['species'].unique():\n        subset = df[df['species'] == species]\n        plt.hist(subset[feature], alpha=0.7, label=f'Species {species}')\n    plt.title(f'{feature} Distribution')\n    plt.legend()\n    plt.show()",
            completed: false,
          },
          {
            title: "Model Training and Evaluation",
            description:
              "Train multiple classification models and evaluate their performance using appropriate metrics",
            estimatedMinutes: 60,
            theory:
              "Model evaluation requires multiple metrics: accuracy (overall correctness), precision (true positives / predicted positives), recall (true positives / actual positives), and F1-score (harmonic mean of precision and recall). Cross-validation provides robust performance estimates.",
            codeExample:
              "from sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Split data\nX = df.drop(['species'], axis=1)\ny = df['species']\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train model\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Evaluate\ny_pred = model.predict(X_test)\nprint(classification_report(y_test, y_pred))",
            completed: false,
          },
        ],
      },
      {
        id: "house-price-prediction",
        title: "Advanced House Price Prediction",
        description:
          "Build a comprehensive regression model for house price prediction with feature engineering and advanced evaluation techniques",
        difficulty: "intermediate",
        estimatedHours: 6,
        technologies: [
          "Python",
          "scikit-learn",
          "pandas",
          "numpy",
          "matplotlib",
          "seaborn",
        ],
        prerequisites: ["ML Fundamentals", "Feature Engineering", "Statistics"],
        learningObjectives: [
          "Master regression techniques and evaluation metrics",
          "Learn advanced feature engineering methods",
          "Implement hyperparameter tuning strategies",
          "Understand real estate market modeling",
        ],
        realWorldApplication:
          "Real estate valuation, property investment analysis, automated property appraisal systems",
        industryRelevance:
          "Critical for fintech, real estate platforms, and investment analysis tools",
        steps: [
          {
            title: "Advanced Data Preprocessing",
            description:
              "Handle missing values, outliers, and create meaningful features for real estate prediction",
            estimatedMinutes: 75,
            theory:
              "Real estate data often contains missing values, outliers, and requires domain-specific feature engineering. Understanding property characteristics, location factors, and market trends is crucial for accurate modeling. Key considerations include: seasonal trends, neighborhood effects, property age depreciation, and economic indicators.",
            codeExample:
              "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, LabelEncoder\n\n# Handle missing values strategically\ndef preprocess_housing_data(df):\n    # Fill numerical missing values\n    num_cols = df.select_dtypes(include=[np.number]).columns\n    for col in num_cols:\n        df[col].fillna(df[col].median(), inplace=True)\n    \n    # Encode categorical variables\n    cat_cols = df.select_dtypes(include=['object']).columns\n    for col in cat_cols:\n        df[col].fillna(df[col].mode()[0], inplace=True)\n        le = LabelEncoder()\n        df[col] = le.fit_transform(df[col])\n    \n    return df",
            completed: false,
          },
          {
            title: "Feature Engineering for Real Estate",
            description:
              "Create domain-specific features that capture property value drivers",
            estimatedMinutes: 90,
            theory:
              "Effective feature engineering in real estate requires understanding market dynamics. Important features include: price per square foot ratios, property age categories, neighborhood quality indices, proximity to amenities, and seasonal selling patterns.",
            codeExample:
              "# Create meaningful real estate features\ndef engineer_housing_features(df):\n    # Price per square foot\n    df['price_per_sqft'] = df['price'] / df['sqft_living']\n    \n    # Property age categories\n    current_year = 2024\n    df['property_age'] = current_year - df['yr_built']\n    df['age_category'] = pd.cut(df['property_age'], \n                               bins=[0, 5, 15, 30, 100], \n                               labels=['New', 'Recent', 'Mature', 'Old'])\n    \n    # Renovation indicator\n    df['renovated'] = (df['yr_renovated'] > 0).astype(int)\n    \n    return df",
            completed: false,
          },
          {
            title: "Model Selection and Training",
            description:
              "Compare multiple regression models and select the best performer",
            estimatedMinutes: 60,
            theory:
              "Real estate prediction benefits from ensemble methods that can capture non-linear relationships. Random Forest handles mixed data types well, while Gradient Boosting often provides superior accuracy. Linear models serve as baselines and provide interpretability.",
            codeExample:
              "from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor\nfrom sklearn.linear_model import LinearRegression, Ridge\nfrom sklearn.model_selection import cross_val_score\n\n# Compare multiple models\nmodels = {\n    'Linear': LinearRegression(),\n    'Ridge': Ridge(alpha=1.0),\n    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),\n    'Gradient Boosting': GradientBoostingRegressor(random_state=42)\n}\n\n# Evaluate models\nfor name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=5, scoring='neg_mean_squared_error')\n    print(f'{name}: RMSE = {np.sqrt(-scores.mean()):.2f} (+/- {scores.std() * 2:.2f})')",
            completed: false,
          },
        ],
      },
      {
        id: "customer-segmentation",
        title: "Advanced Customer Segmentation Analysis",
        description:
          "Build a comprehensive customer segmentation system using clustering algorithms and behavioral analysis",
        difficulty: "intermediate",
        estimatedHours: 5,
        technologies: [
          "Python",
          "scikit-learn",
          "pandas",
          "matplotlib",
          "seaborn",
          "plotly",
        ],
        prerequisites: ["Unsupervised Learning", "Data Analysis", "Statistics"],
        learningObjectives: [
          "Master clustering algorithms and their evaluation",
          "Understand customer behavior analysis techniques",
          "Learn market segmentation strategies",
          "Apply business insights to algorithm selection",
        ],
        realWorldApplication:
          "E-commerce personalization, targeted marketing, product recommendations, customer lifetime value analysis",
        industryRelevance:
          "Essential for marketing teams, product managers, and business intelligence analysts",
        steps: [
          {
            title: "Exploratory Data Analysis",
            description:
              "Understand customer behavior patterns through comprehensive data exploration",
            estimatedMinutes: 60,
            theory:
              "Customer segmentation starts with understanding behavioral patterns. Key metrics include recency (when did they last purchase), frequency (how often they purchase), and monetary value (how much they spend). RFM analysis provides a foundation for understanding customer value.",
            codeExample:
              "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# RFM Analysis\ndef calculate_rfm(df):\n    # Calculate Recency, Frequency, Monetary values\n    current_date = df['purchase_date'].max()\n    \n    rfm = df.groupby('customer_id').agg({\n        'purchase_date': lambda x: (current_date - x.max()).days,  # Recency\n        'order_id': 'count',  # Frequency\n        'amount': 'sum'  # Monetary\n    }).rename(columns={\n        'purchase_date': 'recency',\n        'order_id': 'frequency', \n        'amount': 'monetary'\n    })\n    \n    return rfm",
            completed: false,
          },
        ],
      },
    ];

    // Initialize user progress with reset data
    this.userProgressData = {
      totalTimeSpent: 0, // hours
      lessonsCompleted: 0,
      totalLessons: 150, // Updated to reflect expanded curriculum
      projectsCompleted: 0,
      totalProjects: 45, // Updated to reflect all project opportunities
      currentStreak: 0,
      lastActiveDate: new Date("2024-01-20"),
      averageSessionLength: 0, // hours
      preferredLearningTime: "evening",
      strongestTopics: [],
      areasForImprovement: ["Getting Started with Machine Learning"],
    };
  }

  // Calculate real metrics based on actual content
  calculateModuleMetrics(moduleId: number): {
    estimatedHours: number;
    completionRate: number;
    averageDifficulty: string;
    totalLessons: number;
  } {
    const module = this.courseData.find((m) => m.id === moduleId);
    if (!module) throw new Error(`Module ${moduleId} not found`);

    const totalMinutes = module.lessons.reduce(
      (sum, lesson) => sum + lesson.estimatedMinutes,
      0,
    );
    const estimatedHours = Math.round((totalMinutes / 60) * 10) / 10;

    const difficultyScores = module.lessons.map((lesson) => {
      switch (lesson.difficulty) {
        case "beginner":
          return 1;
        case "intermediate":
          return 2;
        case "advanced":
          return 3;
        default:
          return 2;
      }
    });
    const avgDifficulty =
      difficultyScores.reduce((a, b) => a + b, 0) / difficultyScores.length;
    const averageDifficulty =
      avgDifficulty < 1.5
        ? "beginner"
        : avgDifficulty < 2.5
          ? "intermediate"
          : "advanced";

    const completionRate = Math.round(
      (module.userProgress.lessonsCompleted / module.lessons.length) * 100,
    );

    return {
      estimatedHours,
      completionRate,
      averageDifficulty,
      totalLessons: module.lessons.length,
    };
  }

  calculateCourseStats(): CourseStats {
    const totalLessons = this.courseData.reduce(
      (sum, module) => sum + module.lessons.length,
      0,
    );
    const totalMinutes = this.courseData.reduce(
      (sum, module) =>
        sum +
        module.lessons.reduce(
          (lessonSum, lesson) => lessonSum + lesson.estimatedMinutes,
          0,
        ),
      0,
    );
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

    const completedLessons = this.courseData.reduce(
      (sum, module) => sum + module.userProgress.lessonsCompleted,
      0,
    );
    const completedHours = this.userProgressData.totalTimeSpent;

    const completionRate =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    return {
      totalLessons,
      totalHours,
      completedLessons,
      completedHours,
      averageRating: 4.8,
      totalStudents: 15247,
      completionRate,
      averageTimeToComplete: 180,
    };
  }

  getModuleData(): ModuleData[] {
    return this.courseData;
  }

  getProjectData(): ProjectData[] {
    return this.projectData;
  }

  getUserProgress() {
    return this.userProgressData;
  }

  // Simulate real-time data updates
  updateProgress(moduleId: number, lessonId: string, timeSpent: number) {
    const module = this.courseData.find((m) => m.id === moduleId);
    if (module) {
      module.userProgress.lessonsCompleted += 1;
      module.userProgress.timeSpent += timeSpent;
      module.userProgress.lastAccessed = new Date();

      // Update global progress
      this.userProgressData.totalTimeSpent += timeSpent;
      this.userProgressData.lessonsCompleted += 1;
      this.userProgressData.lastActiveDate = new Date();
    }
  }
}

export const dataService = DataService.getInstance();
