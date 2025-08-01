export const comprehensiveNumPyContent = {
  theoreticalFoundations: {
    title: "Complete NumPy Mastery: From Mathematical Foundations to Advanced Implementation",
    content: `
🧠 **MATHEMATICAL FOUNDATIONS OF VECTORS AND ARRAYS**

📐 **What is a Vector Space? (Deep Mathematical Understanding)**
A vector space V over a field F is a set equipped with two operations:
• Vector addition: u + v ∈ V for all u,v ∈ V
• Scalar multiplication: au ∈ V for all a ∈ F, u ∈ V

**Eight Axioms of Vector Spaces:**
1. Associativity of addition: (u + v) + w = u + (v + w)
2. Commutativity of addition: u + v = v + u  
3. Identity element: ∃ 0 ∈ V such that v + 0 = v
4. Inverse elements: ∀v ∈ V, ∃(-v) such that v + (-v) = 0
5. Distributivity (scalar over vector addition): a(u + v) = au + av
6. Distributivity (vector over scalar addition): (a + b)v = av + bv
7. Associativity of scalar multiplication: a(bv) = (ab)v
8. Identity of scalar multiplication: 1v = v

**Why This Matters in Machine Learning:**
• Every dataset is a collection of vectors in high-dimensional space
• ML algorithms find patterns in these vector spaces
• Feature engineering = transforming vector spaces
• Neural networks = learning non-linear transformations between vector spaces

🔢 **COMPLETE NUMPY ECOSYSTEM MASTERY**

**Core Array Creation Functions:**
• np.array([1,2,3]) - Convert list/tuple to ndarray
• np.asarray(data) - Convert input to array (no copy if already array)
• np.copy(array) - Create deep copy
• np.zeros(shape, dtype=float) - Array filled with zeros
• np.ones(shape, dtype=float) - Array filled with ones  
• np.full(shape, fill_value) - Array filled with specified value
• np.empty(shape) - Uninitialized array (faster than zeros)
• np.arange(start, stop, step) - Like Python range() but returns array
• np.linspace(start, stop, num) - Evenly spaced numbers
• np.logspace(start, stop, num, base=10) - Logarithmically spaced numbers
��� np.eye(N, M=None, k=0) - Identity matrix with optional offset
• np.identity(n) - Square identity matrix
• np.diag(v, k=0) - Diagonal matrix or extract diagonal

**Advanced Array Creation:**
• np.fromfunction(func, shape) - Apply function to indices
• np.meshgrid(x, y) - Create coordinate matrices
• np.mgrid[start:stop:step] - Dense multi-dimensional mesh
• np.ogrid[start:stop:step] - Open multi-dimensional mesh
• np.tile(A, reps) - Repeat array
• np.repeat(a, repeats, axis=None) - Repeat elements

**Random Number Generation (np.random):**
• np.random.random(size) - Random floats [0.0, 1.0)
• np.random.randint(low, high, size) - Random integers
• np.random.randn(d0, d1, ...) - Standard normal distribution
• np.random.normal(loc, scale, size) - Normal distribution
• np.random.uniform(low, high, size) - Uniform distribution
• np.random.choice(a, size, replace=True, p=None) - Random sampling
• np.random.shuffle(x) - Shuffle array in-place
• np.random.permutation(x) - Random permutation
• np.random.seed(seed) - Set random state for reproducibility

**Array Properties and Attributes:**
• array.shape - Dimensions tuple
• array.size - Total number of elements  
• array.ndim - Number of dimensions
• array.dtype - Data type object
• array.itemsize - Size in bytes of each element
• array.nbytes - Total bytes consumed
• array.flags - Information about memory layout
• array.strides - Bytes to step in each dimension
• array.data - Python buffer object pointing to start of data

**Data Types (dtype) Mastery:**
• Integer types: int8, int16, int32, int64, uint8, uint16, uint32, uint64
• Float types: float16, float32, float64, float128
• Complex types: complex64, complex128, complex256
• Boolean: bool
• Unicode strings: U<number>
• Object type: object (can hold any Python object)
• dtype conversion: array.astype(dtype)

**Indexing and Slicing (Advanced):**
• Basic indexing: arr[0], arr[-1], arr[1:3], arr[::2]
• Multi-dimensional: arr[i, j], arr[i, :], arr[:, j]
• Boolean indexing: arr[arr > 5], arr[condition]
• Fancy indexing: arr[[1, 3, 5]], arr[indices]
• Combined indexing: arr[condition, :]
• np.where(condition, x, y) - Conditional selection
• np.take(arr, indices, axis=None) - Take elements along axis
• np.put(arr, indices, values) - Put values at indices

**Array Operations (Element-wise):**
• Arithmetic: +, -, *, /, //, %, **
• Comparison: ==, !=, <, >, <=, >=
• Logical: &, |, ^, ~ (and, or, xor, not)
• Functions: np.add, np.subtract, np.multiply, np.divide
• In-place operations: +=, -=, *=, /=

**Broadcasting Rules (Deep Understanding):**
1. Arrays are aligned from the rightmost dimension
2. Dimensions of size 1 can be "stretched" to match
3. Missing dimensions are assumed to be size 1
4. If dimensions don't match and neither is 1, error occurs

Examples:
• (3, 4) + (4,) → (3, 4) + (1, 4) → works
• (3, 4) + (3, 1) → works  
• (3, 4) + (2, 4) → error
• Broadcasting allows efficient operations without explicit loops

**Linear Algebra (np.linalg):**
• np.dot(a, b) - Dot product/matrix multiplication
• np.matmul(a, b) or a @ b - Matrix multiplication (preferred)
• np.inner(a, b) - Inner product
• np.outer(a, b) - Outer product
• np.cross(a, b) - Cross product
• np.linalg.det(a) - Determinant
• np.linalg.inv(a) - Matrix inverse
• np.linalg.pinv(a) - Moore-Penrose pseudoinverse
• np.linalg.solve(a, b) - Solve linear system ax = b
• np.linalg.lstsq(a, b) - Least squares solution
• np.linalg.eig(a) - Eigenvalues and eigenvectors
• np.linalg.svd(a) - Singular value decomposition
• np.linalg.norm(a, ord=None) - Vector/matrix norms
• np.linalg.qr(a) - QR decomposition
• np.linalg.cholesky(a) - Cholesky decomposition

**Statistical Functions:**
• Descriptive: mean, median, std, var, min, max, ptp (peak-to-peak)
• Quantiles: percentile, quantile
• Correlation: corrcoef, cov
• Histograms: histogram, histogram2d, histogramdd
• Along axes: specify axis parameter for multi-dimensional operations

**Array Manipulation:**
• Reshaping: reshape, resize, ravel, flatten
• Splitting: split, hsplit, vsplit, dsplit
• Joining: concatenate, stack, hstack, vstack, dstack
• Transposition: transpose, swapaxes, moveaxis
• Dimension manipulation: squeeze, expand_dims
• Copying: copy, view

**Advanced Functions:**
• np.apply_along_axis(func, axis, arr) - Apply function along axis
• np.vectorize(func) - Vectorize Python function
• np.piecewise(x, condlist, funclist) - Piecewise function
• np.select(condlist, choicelist) - Multi-condition selection
• np.clip(a, min, max) - Limit values to range
• np.nan_to_num(x) - Replace NaN/inf with numbers

**Memory Layout and Performance:**
• C-order (row-major) vs F-order (column-major)
• Contiguous arrays for better cache performance
• Views vs copies: understand when data is shared
• np.may_share_memory(a, b) - Check if arrays share memory
• Memory-mapped arrays: np.memmap for large datasets

**Universal Functions (ufuncs):**
• Element-wise operations optimized in C
• Trigonometric: sin, cos, tan, arcsin, arccos, arctan, arctan2
• Hyperbolic: sinh, cosh, tanh, arcsinh, arccosh, arctanh  
• Exponential/logarithmic: exp, log, log10, log2, exp2
• Arithmetic: add, subtract, multiply, divide, power, mod
• Comparison: greater, less, equal, not_equal
• Logical: logical_and, logical_or, logical_not, logical_xor

**Error Handling and Debugging:**
• np.seterr(all='warn') - Control error handling
• np.geterr() - Get current error handling
• np.errstate() - Context manager for error handling
• np.isnan(), np.isinf(), np.isfinite() - Check for special values
• np.allclose(a, b) - Test if arrays are approximately equal

🎯 **MACHINE LEARNING APPLICATIONS:**

**Feature Engineering with NumPy:**
• Normalization: (x - mean) / std
• Min-Max scaling: (x - min) / (max - min)  
• Polynomial features: np.column_stack([x, x**2, x**3])
• Interaction features: x1 * x2, x1 / x2
• Binning: np.digitize(x, bins)

**Distance Metrics:**
• Euclidean: np.linalg.norm(a - b)
• Manhattan: np.sum(np.abs(a - b))
• Cosine similarity: np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
• Hamming distance for binary vectors

**Matrix Operations for ML:**
• Covariance matrix: np.cov(X.T)
• Correlation matrix: np.corrcoef(X.T)
• Principal Component Analysis: eigendecomposition of covariance
• Linear regression: np.linalg.lstsq(X, y)

This comprehensive knowledge forms the foundation for all machine learning implementations!
    `,
    keyTheorems: [
      "Vector Space Axioms: 8 fundamental properties that define vector spaces",
      "Broadcasting Rules: How NumPy handles operations between different shaped arrays",
      "Linear Independence: Vectors are linearly independent if none can be written as linear combination of others",
      "Eigenvalue Decomposition: A = QΛQ^(-1) for diagonalizable matrices",
      "Singular Value Decomposition: A = UΣV^T for any matrix A",
      "Frobenius Norm: ||A||_F = sqrt(sum of squares of all elements)",
      "Matrix Rank: Maximum number of linearly independent rows/columns",
      "Condition Number: Ratio of largest to smallest singular value, measures numerical stability"
    ],
    realWorldConnections: [
      "Netflix recommendation system uses SVD on user-movie rating matrices",
      "Google PageRank algorithm uses eigenvector of web link matrix",
      "Image compression using SVD to reduce file sizes",
      "Principal Component Analysis for dimensionality reduction in genetics",
      "Linear regression in economics and finance for predictive modeling",
      "Computer graphics transformations using matrix multiplication",
      "Signal processing using Fourier transforms implemented with NumPy",
      "Quantum computing simulation using complex vector spaces"
    ]
  },
  
  practicalExercises: [
    {
      title: "Complete NumPy Vector Operations Implementation",
      description: "Implement a comprehensive vector operations program demonstrating all core NumPy concepts",
      difficulty: "intermediate",
      estimatedMinutes: 30,
      learningObjectives: [
        "Master NumPy array creation and manipulation",
        "Implement vector arithmetic operations",
        "Apply linear algebra functions",
        "Understand broadcasting and array properties",
        "Use statistical functions for data analysis"
      ],
      codeTemplate: `# Complete NumPy implementation from scratch
# Demonstrate mastery of all core concepts

# Your comprehensive implementation here...`,
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
      hints: [
        "Import numpy as np first",
        "Create arrays using np.array() with the person data",
        "Use element-wise operations: +, -, *, /",
        "Calculate distance using np.linalg.norm()",
        "Use np.dot() for dot product",
        "Use np.mean() and np.std() for statistics",
        "Normalize using vector / np.linalg.norm(vector)"
      ],
      concepts: [
        "Array creation and indexing",
        "Element-wise operations",
        "Linear algebra functions",
        "Statistical computations",
        "Vector normalization",
        "Broadcasting"
      ]
    }
  ]
};
