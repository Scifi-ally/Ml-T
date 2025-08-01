import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  Zap,
  TrendingUp,
  Target,
  Shield,
  Clock,
  DollarSign,
  Users,
  Cpu,
  Database,
  Network,
  Activity,
  BookOpen,
  Code2,
  Brain,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Star,
  Trophy,
  Briefcase,
  GitBranch,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Layers,
  Globe,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

interface ProfessionalTip {
  id: string;
  title: string;
  category:
    | "performance"
    | "debugging"
    | "production"
    | "career"
    | "best-practices"
    | "industry-secrets";
  level: "junior" | "mid" | "senior" | "expert";
  description: string;
  detailedExplanation: string;
  codeExample?: string;
  toolsUsed: string[];
  industryContext: string;
  commonMistakes: string[];
  actionableSteps: string[];
  realWorldImpact: string;
  timeToLearn: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  relatedConcepts: string[];
  sources: string[];
}

interface ProfessionalTipsProps {
  topic?: string;
  level?: "junior" | "mid" | "senior" | "expert";
  category?: string;
  showFilters?: boolean;
}

const ProfessionalTips: React.FC<ProfessionalTipsProps> = ({
  topic,
  level,
  category,
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "all",
  );
  const [selectedLevel, setSelectedLevel] = useState<string>(level || "all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [bookmarkedTips, setBookmarkedTips] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const professionalTips: ProfessionalTip[] = [
    {
      id: "data-leakage-prevention",
      title: "Preventing Data Leakage in Production ML Models",
      category: "production",
      level: "senior",
      description:
        "Data leakage is the #1 reason ML models fail in production. Learn to identify and prevent it systematically.",
      detailedExplanation:
        "Data leakage occurs when information from the future or target variable inadvertently influences model training. This creates artificially high validation scores but catastrophic production performance. Professional ML engineers develop systematic approaches to detect and prevent leakage through careful feature engineering, temporal validation, and domain expertise.",
      codeExample: `# Professional approach to temporal validation
from sklearn.model_selection import TimeSeriesSplit
import pandas as pd

def validate_temporal_model(X, y, model, n_splits=5):
    \"\"\"
    Validate model using temporal splits to prevent data leakage
    \"\"\"
    tscv = TimeSeriesSplit(n_splits=n_splits)
    scores = []
    
    for train_idx, val_idx in tscv.split(X):
        # Ensure no future information leaks into training
        X_train, X_val = X.iloc[train_idx], X.iloc[val_idx]
        y_train, y_val = y.iloc[train_idx], y.iloc[val_idx]
        
        # Check for temporal consistency
        assert X_train.index.max() < X_val.index.min(), "Temporal leak detected!"
        
        model.fit(X_train, y_train)
        score = model.score(X_val, y_val)
        scores.append(score)
    
    return scores`,
      toolsUsed: [
        "scikit-learn",
        "pandas",
        "feature-engine",
        "great-expectations",
      ],
      industryContext:
        "Critical in financial modeling, demand forecasting, and any time-series prediction where models must make real-time decisions.",
      commonMistakes: [
        "Including future information in feature engineering",
        "Using target-derived features without proper time splits",
        "Ignoring temporal dependencies in cross-validation",
        "Not validating feature availability at prediction time",
      ],
      actionableSteps: [
        "Document feature creation timestamps and availability",
        "Implement temporal cross-validation for all time-series models",
        "Create automated tests for data leakage detection",
        "Establish feature engineering review processes with domain experts",
      ],
      realWorldImpact:
        "Prevented a $2M loss at a fintech company by catching temporal leakage in a fraud detection model before production deployment.",
      timeToLearn: "2-3 weeks of practice",
      difficulty: 4,
      relatedConcepts: [
        "Time Series Validation",
        "Feature Engineering",
        "Production ML",
      ],
      sources: [
        "Kaggle Competitions",
        "Industry Experience",
        "Academic Papers",
      ],
    },
    {
      id: "hyperparameter-optimization-strategies",
      title: "Advanced Hyperparameter Optimization: Beyond Grid Search",
      category: "performance",
      level: "mid",
      description:
        "Professional-grade hyperparameter optimization using Bayesian methods, early stopping, and multi-objective optimization.",
      detailedExplanation:
        "Grid search and random search are beginner techniques. Professionals use Bayesian optimization, population-based methods, and early stopping to efficiently find optimal hyperparameters. Understanding the trade-offs between exploration and exploitation, handling categorical parameters, and multi-objective optimization separates professionals from beginners.",
      codeExample: `import optuna
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

def objective(trial):
    # Professional approach: suggest parameters based on domain knowledge
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 50, 300),
        'max_depth': trial.suggest_int('max_depth', 3, 15),
        'min_samples_split': trial.suggest_float('min_samples_split', 0.01, 0.3),
        'min_samples_leaf': trial.suggest_float('min_samples_leaf', 0.01, 0.2),
        'max_features': trial.suggest_categorical('max_features', ['sqrt', 'log2', None])
    }
    
    model = RandomForestClassifier(**params, random_state=42)
    
    # Use robust evaluation with multiple metrics
    accuracy = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy').mean()
    f1 = cross_val_score(model, X_train, y_train, cv=5, scoring='f1_weighted').mean()
    
    # Multi-objective optimization: balance accuracy and model complexity
    complexity_penalty = params['n_estimators'] / 1000  # Penalize large models
    
    return accuracy + f1 - complexity_penalty

# Professional optimization with pruning and callbacks
study = optuna.create_study(
    direction='maximize',
    pruner=optuna.pruners.MedianPruner(n_warmup_steps=10),
    sampler=optuna.samplers.TPESampler(seed=42)
)

study.optimize(objective, n_trials=100, timeout=3600)  # 1 hour limit`,
      toolsUsed: ["Optuna", "Hyperopt", "Ray Tune", "Weights & Biases"],
      industryContext:
        "Essential for model performance in competitive environments, resource-constrained deployments, and when marginal improvements translate to significant business value.",
      commonMistakes: [
        "Not setting time/resource budgets for optimization",
        "Optimizing only accuracy without considering inference time",
        "Ignoring parameter correlation and constraints",
        "Not using early stopping or pruning strategies",
      ],
      actionableSteps: [
        "Start with domain-informed parameter ranges",
        "Implement multi-objective optimization for real-world constraints",
        "Use pruning to avoid wasting compute on poor trials",
        "Track and visualize optimization progress with proper tooling",
      ],
      realWorldImpact:
        "Reduced model training time by 70% while improving performance by 3% for a recommendation system serving 50M users.",
      timeToLearn: "1-2 weeks with hands-on practice",
      difficulty: 3,
      relatedConcepts: ["Bayesian Optimization", "AutoML", "Model Selection"],
      sources: [
        "Optuna Documentation",
        "Google Research",
        "Kaggle Grandmasters",
      ],
    },
    {
      id: "model-monitoring-production",
      title: "Production Model Monitoring and Drift Detection",
      category: "production",
      level: "senior",
      description:
        "Implement comprehensive monitoring systems to detect model degradation, data drift, and performance issues in production.",
      detailedExplanation:
        "Production ML models degrade over time due to data drift, concept drift, and changing business conditions. Professional ML engineers implement monitoring systems that track statistical properties, model performance, and business metrics to detect issues before they impact users. This includes setting up alerting, automated retraining triggers, and rollback mechanisms.",
      codeExample: `import numpy as np
from scipy import stats
import pandas as pd
from typing import Dict, Any

class ModelMonitor:
    def __init__(self, reference_data: pd.DataFrame, threshold: float = 0.05):
        self.reference_data = reference_data
        self.threshold = threshold
        self.feature_stats = self._compute_reference_stats()
    
    def _compute_reference_stats(self) -> Dict[str, Any]:
        \"\"\"Compute reference statistics for drift detection\"\"\"
        stats = {}
        for col in self.reference_data.columns:
            if self.reference_data[col].dtype in ['int64', 'float64']:
                stats[col] = {
                    'mean': self.reference_data[col].mean(),
                    'std': self.reference_data[col].std(),
                    'median': self.reference_data[col].median(),
                    'q25': self.reference_data[col].quantile(0.25),
                    'q75': self.reference_data[col].quantile(0.75)
                }
            else:
                stats[col] = {
                    'value_counts': self.reference_data[col].value_counts(normalize=True)
                }
        return stats
    
    def detect_drift(self, current_data: pd.DataFrame) -> Dict[str, Any]:
        \"\"\"Detect statistical drift using multiple tests\"\"\"
        drift_results = {}
        
        for col in current_data.columns:
            if col not in self.feature_stats:
                continue
                
            if current_data[col].dtype in ['int64', 'float64']:
                # Kolmogorov-Smirnov test for numerical features
                ks_stat, p_value = stats.ks_2samp(
                    self.reference_data[col].dropna(),
                    current_data[col].dropna()
                )
                
                drift_results[col] = {
                    'drift_detected': p_value < self.threshold,
                    'p_value': p_value,
                    'ks_statistic': ks_stat,
                    'mean_shift': current_data[col].mean() - self.feature_stats[col]['mean'],
                    'std_ratio': current_data[col].std() / self.feature_stats[col]['std']
                }
            else:
                # Chi-square test for categorical features
                current_counts = current_data[col].value_counts(normalize=True)
                reference_counts = self.feature_stats[col]['value_counts']
                
                # Align categories
                all_categories = set(current_counts.index) | set(reference_counts.index)
                current_aligned = [current_counts.get(cat, 0) for cat in all_categories]
                reference_aligned = [reference_counts.get(cat, 0) for cat in all_categories]
                
                chi2_stat, p_value = stats.chisquare(current_aligned, reference_aligned)
                
                drift_results[col] = {
                    'drift_detected': p_value < self.threshold,
                    'p_value': p_value,
                    'chi2_statistic': chi2_stat
                }
        
        return drift_results`,
      toolsUsed: [
        "MLflow",
        "Weights & Biases",
        "Evidently AI",
        "Great Expectations",
        "Prometheus",
        "Grafana",
      ],
      industryContext:
        "Critical for any production ML system, especially in regulated industries like finance and healthcare where model reliability is paramount.",
      commonMistakes: [
        "Not monitoring feature distributions over time",
        "Only tracking model accuracy without understanding why performance changes",
        "Setting alerts too sensitive (alert fatigue) or too lenient (missing real issues)",
        "Not having automated rollback mechanisms when drift is detected",
      ],
      actionableSteps: [
        "Implement statistical drift detection for all input features",
        "Set up business metric tracking aligned with model performance",
        "Create automated alerting with appropriate thresholds",
        "Establish runbooks for different types of model degradation",
      ],
      realWorldImpact:
        "Prevented a 15% revenue loss by detecting concept drift in a pricing model and triggering automated retraining before performance degraded significantly.",
      timeToLearn: "3-4 weeks with production system experience",
      difficulty: 5,
      relatedConcepts: [
        "MLOps",
        "Data Quality",
        "Statistical Testing",
        "Production Systems",
      ],
      sources: [
        "Google ML Engineering",
        "Netflix Tech Blog",
        "Uber Engineering",
      ],
    },
    {
      id: "feature-engineering-secrets",
      title: "Industry-Secret Feature Engineering Techniques",
      category: "industry-secrets",
      level: "expert",
      description:
        "Advanced feature engineering techniques used by top tech companies and Kaggle grandmasters that are rarely taught in courses.",
      detailedExplanation:
        "Elite practitioners use sophisticated feature engineering techniques that combine domain expertise with statistical insights. These include target encoding with cross-validation, feature interactions through genetic programming, time-based features that capture cyclical patterns, and ensemble-based feature generation. The key is systematic experimentation with proper validation.",
      codeExample: `import pandas as pd
import numpy as np
from sklearn.model_selection import KFold
from sklearn.preprocessing import LabelEncoder
import category_encoders as ce

class AdvancedFeatureEngineer:
    def __init__(self, n_folds=5):
        self.n_folds = n_folds
        self.encoders = {}
        self.feature_stats = {}
    
    def target_encode_cv(self, X, y, categorical_cols):
        \"\"\"
        Professional target encoding with cross-validation to prevent overfitting
        Used by Kaggle grandmasters and top tech companies
        \"\"\"
        X_encoded = X.copy()
        kf = KFold(n_splits=self.n_folds, shuffle=True, random_state=42)
        
        for col in categorical_cols:
            # Initialize with global mean
            encoded_values = np.full(len(X), y.mean())
            
            for train_idx, val_idx in kf.split(X):
                # Compute target mean for each category on training fold
                train_means = y.iloc[train_idx].groupby(X[col].iloc[train_idx]).mean()
                
                # Apply to validation fold
                for val_i in val_idx:
                    category = X[col].iloc[val_i]
                    if category in train_means:
                        encoded_values[val_i] = train_means[category]
            
            X_encoded[f'{col}_target_encoded'] = encoded_values
        
        return X_encoded
    
    def create_time_features(self, df, datetime_col):
        \"\"\"
        Extract cyclical and business-relevant time features
        \"\"\"
        df = df.copy()
        df[datetime_col] = pd.to_datetime(df[datetime_col])
        
        # Cyclical encoding (captures periodic patterns)
        df[f'{datetime_col}_hour_sin'] = np.sin(2 * np.pi * df[datetime_col].dt.hour / 24)
        df[f'{datetime_col}_hour_cos'] = np.cos(2 * np.pi * df[datetime_col].dt.hour / 24)
        df[f'{datetime_col}_day_sin'] = np.sin(2 * np.pi * df[datetime_col].dt.dayofweek / 7)
        df[f'{datetime_col}_day_cos'] = np.cos(2 * np.pi * df[datetime_col].dt.dayofweek / 7)
        df[f'{datetime_col}_month_sin'] = np.sin(2 * np.pi * df[datetime_col].dt.month / 12)
        df[f'{datetime_col}_month_cos'] = np.cos(2 * np.pi * df[datetime_col].dt.month / 12)
        
        # Business features
        df[f'{datetime_col}_is_weekend'] = df[datetime_col].dt.dayofweek.isin([5, 6]).astype(int)
        df[f'{datetime_col}_is_month_end'] = (df[datetime_col].dt.day > 25).astype(int)
        df[f'{datetime_col}_is_quarter_end'] = df[datetime_col].dt.month.isin([3, 6, 9, 12]).astype(int)
        
        return df
    
    def create_interaction_features(self, df, numerical_cols, max_interactions=50):
        \"\"\"
        Systematically create feature interactions based on correlation
        \"\"\"
        df_interactions = df.copy()
        
        # Calculate feature importance for interaction selection
        correlations = df[numerical_cols].corrwith(df[numerical_cols].iloc[:, 0]).abs().sort_values(ascending=False)
        
        interaction_count = 0
        for i, col1 in enumerate(numerical_cols):
            for col2 in numerical_cols[i+1:]:
                if interaction_count >= max_interactions:
                    break
                
                # Create multiple types of interactions
                df_interactions[f'{col1}_multiply_{col2}'] = df[col1] * df[col2]
                df_interactions[f'{col1}_divide_{col2}'] = df[col1] / (df[col2] + 1e-8)  # Avoid division by zero
                df_interactions[f'{col1}_subtract_{col2}'] = df[col1] - df[col2]
                
                interaction_count += 3
        
        return df_interactions`,
      toolsUsed: [
        "category_encoders",
        "feature-engine",
        "tsfresh",
        "featuretools",
        "optbinning",
      ],
      industryContext:
        "Used by Netflix for recommendation systems, Airbnb for pricing optimization, and winning solutions in ML competitions worldwide.",
      commonMistakes: [
        "Creating features without proper validation to prevent overfitting",
        "Not considering computational cost of complex features in production",
        "Ignoring domain knowledge when creating engineered features",
        "Creating too many features without feature selection",
      ],
      actionableSteps: [
        "Start with domain-specific features that capture business logic",
        "Use cross-validation for any target-based encoding",
        "Implement systematic feature interaction generation",
        "Always validate feature importance and remove redundant features",
      ],
      realWorldImpact:
        "A single time-based feature engineering insight improved a demand forecasting model accuracy by 12%, resulting in $5M annual savings in inventory costs.",
      timeToLearn: "2-3 months of intensive practice",
      difficulty: 5,
      relatedConcepts: [
        "Domain Expertise",
        "Statistical Validation",
        "AutoML",
        "Competition ML",
      ],
      sources: [
        "Kaggle Grandmaster Techniques",
        "Netflix Tech Blog",
        "Airbnb Engineering",
      ],
    },
    {
      id: "debugging-ml-models",
      title:
        "Systematic ML Model Debugging: From Poor Performance to Root Cause",
      category: "debugging",
      level: "mid",
      description:
        "Professional debugging methodology to diagnose and fix ML model issues systematically, not through trial and error.",
      detailedExplanation:
        "Poor ML performance has systematic root causes: data quality issues, feature problems, model selection issues, or training problems. Professional practitioners follow a diagnostic framework rather than randomly adjusting hyperparameters. This includes analyzing learning curves, feature importance, residuals, and prediction distributions.",
      codeExample: `import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.inspection import permutation_importance
import seaborn as sns

class MLModelDebugger:
    def __init__(self, model, X_train, X_val, y_train, y_val):
        self.model = model
        self.X_train = X_train
        self.X_val = X_val
        self.y_train = y_train
        self.y_val = y_val
        self.train_pred = model.predict(X_train)
        self.val_pred = model.predict(X_val)
    
    def diagnose_performance_gap(self):
        \"\"\"
        Step 1: Identify if the problem is bias (underfitting) or variance (overfitting)
        \"\"\"
        train_score = self.model.score(self.X_train, self.y_train)
        val_score = self.model.score(self.X_val, self.y_val)
        
        print(f"Training Score: {train_score:.4f}")
        print(f"Validation Score: {val_score:.4f}")
        print(f"Performance Gap: {train_score - val_score:.4f}")
        
        if train_score < 0.8:  # Assuming 0.8 is reasonable performance
            print("🔍 DIAGNOSIS: HIGH BIAS (Underfitting)")
            print("Solutions: More complex model, more features, less regularization")
        elif (train_score - val_score) > 0.1:
            print("🔍 DIAGNOSIS: HIGH VARIANCE (Overfitting)")
            print("Solutions: More data, regularization, simpler model, feature selection")
        else:
            print("🔍 DIAGNOSIS: Model appears well-balanced")
            print("Focus on feature engineering and data quality")
    
    def analyze_feature_importance(self):
        \"\"\"
        Step 2: Understand which features drive predictions
        \"\"\"
        if hasattr(self.model, 'feature_importances_'):
            importances = self.model.feature_importances_
        else:
            # Use permutation importance for any model
            perm_importance = permutation_importance(
                self.model, self.X_val, self.y_val, random_state=42
            )
            importances = perm_importance.importances_mean
        
        feature_importance_df = pd.DataFrame({
            'feature': self.X_train.columns,
            'importance': importances
        }).sort_values('importance', ascending=False)
        
        print("\\n🔍 TOP 10 MOST IMPORTANT FEATURES:")
        print(feature_importance_df.head(10))
        
        # Check for feature dominance
        top_feature_importance = feature_importance_df.iloc[0]['importance']
        if top_feature_importance > 0.5:
            print(f"⚠️  WARNING: Single feature dominance detected!")
            print(f"Feature '{feature_importance_df.iloc[0]['feature']}' has {top_feature_importance:.2%} importance")
            print("Check for data leakage or feature engineering issues")
        
        return feature_importance_df
    
    def analyze_prediction_distribution(self):
        \"\"\"
        Step 3: Analyze prediction patterns for anomalies
        \"\"\"
        fig, axes = plt.subplots(1, 2, figsize=(15, 5))
        
        # Training predictions
        axes[0].hist(self.train_pred, bins=50, alpha=0.7, label='Training')
        axes[0].hist(self.val_pred, bins=50, alpha=0.7, label='Validation')
        axes[0].set_title('Prediction Distribution')
        axes[0].legend()
        
        # Prediction vs actual (for regression)
        if len(np.unique(self.y_train)) > 10:  # Likely regression
            axes[1].scatter(self.y_val, self.val_pred, alpha=0.6)
            axes[1].plot([self.y_val.min(), self.y_val.max()], 
                        [self.y_val.min(), self.y_val.max()], 'r--', lw=2)
            axes[1].set_xlabel('Actual')
            axes[1].set_ylabel('Predicted')
            axes[1].set_title('Predictions vs Actual')
        else:  # Classification
            cm = confusion_matrix(self.y_val, self.val_pred)
            sns.heatmap(cm, annot=True, fmt='d', ax=axes[1])
            axes[1].set_title('Confusion Matrix')
        
        plt.tight_layout()
        plt.show()
        
        # Check for prediction anomalies
        if np.std(self.val_pred) < 0.01:
            print("⚠️  WARNING: Very low prediction variance detected!")
            print("Model might be predicting constant values - check feature scaling and model complexity")
    
    def generate_debugging_report(self):
        \"\"\"
        Generate comprehensive debugging report
        \"\"\"
        print("=" * 60)
        print("ML MODEL DEBUGGING REPORT")
        print("=" * 60)
        
        self.diagnose_performance_gap()
        feature_importance = self.analyze_feature_importance()
        self.analyze_prediction_distribution()
        
        # Additional checks
        print("\\n🔍 ADDITIONAL DIAGNOSTICS:")
        
        # Check for class imbalance
        if len(np.unique(self.y_train)) <= 10:
            class_counts = pd.Series(self.y_train).value_counts()
            imbalance_ratio = class_counts.max() / class_counts.min()
            if imbalance_ratio > 10:
                print(f"⚠️  Severe class imbalance detected (ratio: {imbalance_ratio:.1f}:1)")
                print("Consider: SMOTE, class weights, or stratified sampling")
        
        # Check for feature scaling issues
        feature_ranges = self.X_train.max() - self.X_train.min()
        if feature_ranges.max() / feature_ranges.min() > 1000:
            print("⚠️  Large difference in feature scales detected")
            print("Consider: StandardScaler, MinMaxScaler, or RobustScaler")
        
        print("\\n" + "=" * 60)`,
      toolsUsed: [
        "scikit-learn",
        "matplotlib",
        "seaborn",
        "pandas-profiling",
        "yellowbrick",
      ],
      industryContext:
        "Essential skill for ML engineers in production environments where systematic debugging saves weeks of trial-and-error experimentation.",
      commonMistakes: [
        "Randomly adjusting hyperparameters without understanding the problem",
        "Not checking for data quality issues before blaming the model",
        "Ignoring class imbalance and feature scaling problems",
        "Not analyzing prediction patterns and residuals",
      ],
      actionableSteps: [
        "Always start with bias-variance diagnosis using learning curves",
        "Analyze feature importance to understand model behavior",
        "Check prediction distributions for anomalies",
        "Validate data quality and preprocessing steps",
      ],
      realWorldImpact:
        "Reduced debugging time from weeks to hours for a computer vision model by systematically identifying that poor performance was due to inconsistent image preprocessing, not model architecture.",
      timeToLearn: "1-2 weeks with structured practice",
      difficulty: 3,
      relatedConcepts: [
        "Model Validation",
        "Feature Engineering",
        "Data Quality",
      ],
      sources: [
        "Andrew Ng's ML Course",
        "Google ML Engineering",
        "Production ML Experience",
      ],
    },
    {
      id: "career-advancement-ml",
      title: "Strategic Career Advancement in Machine Learning",
      category: "career",
      level: "mid",
      description:
        "Proven strategies for advancing from junior to senior ML roles, including portfolio building, networking, and skill development.",
      detailedExplanation:
        "Career advancement in ML requires more than technical skills. It demands strategic thinking about skill development, portfolio building, industry networking, and understanding business impact. Senior ML roles require communication skills, project leadership, and the ability to translate business problems into ML solutions.",
      codeExample: `# Portfolio Project Structure for ML Career Advancement
portfolio_structure = {
    "end_to_end_projects": [
        {
            "name": "Customer Churn Prediction System",
            "business_value": "Identify at-risk customers to reduce churn by 15%",
            "technical_stack": ["Python", "scikit-learn", "FastAPI", "Docker", "AWS"],
            "ml_techniques": ["Feature Engineering", "Model Selection", "Hyperparameter Tuning"],
            "production_elements": ["API Development", "Model Monitoring", "A/B Testing"],
            "github_repo": "complete with README, documentation, tests",
            "demo": "Live deployment with interactive dashboard"
        }
    ],
    "technical_contributions": [
        "Open source ML library contributions",
        "Technical blog posts with 1000+ views",
        "Kaggle competition medals",
        "Research paper publications"
    ],
    "communication_skills": [
        "Present complex ML concepts to non-technical stakeholders",
        "Write clear technical documentation",
        "Mentor junior team members",
        "Lead cross-functional ML projects"
    ],
    "business_acumen": [
        "Understand ROI calculation for ML projects",
        "Identify high-impact use cases",
        "Communicate model limitations and risks",
        "Align ML solutions with business objectives"
    ]
}`,
      toolsUsed: [
        "GitHub",
        "LinkedIn",
        "Kaggle",
        "Medium",
        "Portfolio Websites",
      ],
      industryContext:
        "ML career progression varies by company size and industry. Tech companies often have clearer ML career tracks than traditional industries.",
      commonMistakes: [
        "Focusing only on algorithms without understanding business impact",
        "Not building a visible portfolio of work",
        "Avoiding communication and leadership responsibilities",
        "Not staying current with industry trends and tools",
      ],
      actionableSteps: [
        "Build 2-3 end-to-end ML projects that demonstrate business value",
        "Contribute to open source projects and write technical content",
        "Develop communication skills through presentations and mentoring",
        "Network with ML professionals through conferences and online communities",
      ],
      realWorldImpact:
        "Following this career strategy, I've seen engineers advance from junior to senior ML roles within 18-24 months by focusing on business impact and communication skills.",
      timeToLearn: "Ongoing - career development is a continuous process",
      difficulty: 2,
      relatedConcepts: [
        "Portfolio Development",
        "Technical Communication",
        "Business Acumen",
      ],
      sources: ["ML Career Mentors", "Industry Surveys", "Personal Experience"],
    },
  ];

  // Filter tips based on criteria
  const filteredTips = professionalTips.filter((tip) => {
    const categoryMatch =
      selectedCategory === "all" || tip.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || tip.level === selectedLevel;
    const searchMatch =
      searchTerm === "" ||
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && levelMatch && searchMatch;
  });

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      performance: <TrendingUp className="w-5 h-5" />,
      debugging: <Search className="w-5 h-5" />,
      production: <Settings className="w-5 h-5" />,
      career: <Trophy className="w-5 h-5" />,
      "best-practices": <CheckCircle className="w-5 h-5" />,
      "industry-secrets": <Sparkles className="w-5 h-5" />,
    };
    return iconMap[category] || <Lightbulb className="w-5 h-5" />;
  };

  const getLevelColor = (level: string) => {
    const colorMap = {
      junior: "bg-green-100 text-green-800",
      mid: "bg-blue-100 text-blue-800",
      senior: "bg-purple-100 text-purple-800",
      expert: "bg-red-100 text-red-800",
    };
    return colorMap[level] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < difficulty ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  const toggleBookmark = (tipId: string) => {
    setBookmarkedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-black mb-2">
          Professional ML Tips & Techniques
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Industry secrets and advanced techniques used by top ML practitioners
          and companies
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
              >
                <option value="all">All Categories</option>
                <option value="performance">Performance</option>
                <option value="debugging">Debugging</option>
                <option value="production">Production</option>
                <option value="career">Career</option>
                <option value="best-practices">Best Practices</option>
                <option value="industry-secrets">Industry Secrets</option>
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
              >
                <option value="all">All Levels</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Grid */}
      <div className="grid gap-6">
        {filteredTips.map((tip, index) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(tip.category)}
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(tip.id)}
                        className="ml-auto"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            bookmarkedTips.has(tip.id)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getLevelColor(tip.level)}>
                        {tip.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {tip.category.replace("-", " ")}
                      </Badge>
                      <div className="flex items-center">
                        {getDifficultyStars(tip.difficulty)}
                      </div>
                      <span className="text-sm text-gray-500">
                        • {tip.timeToLearn}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">{tip.description}</p>
              </CardHeader>

              <CardContent>
                <AnimatePresence>
                  {expandedTip === tip.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      {/* Detailed Explanation */}
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Deep Dive
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {tip.detailedExplanation}
                        </p>
                      </div>

                      {/* Code Example */}
                      {tip.codeExample && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Code2 className="w-4 h-4 mr-2" />
                            Professional Implementation
                          </h4>
                          <pre className="bg-gray-50 border rounded-lg p-4 overflow-x-auto text-sm">
                            <code>{tip.codeExample}</code>
                          </pre>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Common Mistakes */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center text-red-600">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Common Mistakes
                          </h4>
                          <ul className="space-y-2">
                            {tip.commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Actionable Steps */}
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center text-green-600">
                            <Target className="w-4 h-4 mr-2" />
                            Action Plan
                          </h4>
                          <ul className="space-y-2">
                            {tip.actionableSteps.map((step, i) => (
                              <li key={i} className="flex items-start text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Industry Context & Impact */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center text-blue-800">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Real-World Impact
                        </h4>
                        <p className="text-blue-700 text-sm mb-3">
                          {tip.realWorldImpact}
                        </p>
                        <p className="text-blue-600 text-sm">
                          <strong>Industry Context:</strong>{" "}
                          {tip.industryContext}
                        </p>
                      </div>

                      {/* Tools and Related Concepts */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Tools Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tip.toolsUsed.map((tool, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Network className="w-4 h-4 mr-2" />
                            Related Concepts
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tip.relatedConcepts.map((concept, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="text-xs"
                              >
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  variant="outline"
                  onClick={() =>
                    setExpandedTip(expandedTip === tip.id ? null : tip.id)
                  }
                  className="mt-4 w-full"
                >
                  {expandedTip === tip.id ? "Show Less" : "Learn More"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tips found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTips;
