// Utility to save learning progress locally
export interface LearningProgress {
  userId: string;
  timestamp: number;
  completedLessons: string[];
  moduleProgress: Record<string, number>;
  totalTimeSpent: number;
  preferences: {
    theme: "light" | "dark";
    animationsEnabled: boolean;
    soundEnabled: boolean;
  };
}

class ProgressManager {
  private static readonly STORAGE_KEY = "ml_learning_progress";
  private static readonly BACKUP_KEY = "ml_learning_backup";

  static saveProgress(progress: Partial<LearningProgress>): void {
    try {
      const existingProgress = this.loadProgress();
      const updatedProgress: LearningProgress = {
        ...existingProgress,
        ...progress,
        timestamp: Date.now(),
      };

      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProgress));

      // Create backup
      this.createBackup(updatedProgress);

      console.log("Progress saved successfully!", updatedProgress);
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  }

  static loadProgress(): LearningProgress {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }

    // Return default progress
    return {
      userId: this.generateUserId(),
      timestamp: Date.now(),
      completedLessons: [],
      moduleProgress: {},
      totalTimeSpent: 0,
      preferences: {
        theme: "light",
        animationsEnabled: true,
        soundEnabled: false,
      },
    };
  }

  static exportProgress(): string {
    const progress = this.loadProgress();
    const exportData = {
      ...progress,
      exportDate: new Date().toISOString(),
      version: "1.0.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);

    // Create downloadable file
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `ml-learning-progress-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    return dataStr;
  }

  static importProgress(fileContent: string): boolean {
    try {
      const imported = JSON.parse(fileContent);

      // Validate imported data
      if (this.validateProgressData(imported)) {
        this.saveProgress(imported);
        return true;
      }

      throw new Error("Invalid progress data format");
    } catch (error) {
      console.error("Failed to import progress:", error);
      return false;
    }
  }

  static clearProgress(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.BACKUP_KEY);
      console.log("Progress cleared successfully!");
    } catch (error) {
      console.error("Failed to clear progress:", error);
    }
  }

  static getProgressSummary(): {
    totalLessons: number;
    completedLessons: number;
    completionRate: number;
    timeSpent: string;
    lastActive: string;
  } {
    const progress = this.loadProgress();
    const totalLessons = Object.keys(progress.moduleProgress).length * 10; // Estimate
    const completedLessons = progress.completedLessons.length;
    const completionRate =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return {
      totalLessons,
      completedLessons,
      completionRate: Math.round(completionRate),
      timeSpent: this.formatTime(progress.totalTimeSpent),
      lastActive: new Date(progress.timestamp).toLocaleDateString(),
    };
  }

  private static createBackup(progress: LearningProgress): void {
    try {
      const backups = this.getBackups();
      backups.push({
        ...progress,
        backupDate: Date.now(),
      });

      // Keep only last 5 backups
      const limitedBackups = backups.slice(-5);
      localStorage.setItem(this.BACKUP_KEY, JSON.stringify(limitedBackups));
    } catch (error) {
      console.error("Failed to create backup:", error);
    }
  }

  private static getBackups(): any[] {
    try {
      const backups = localStorage.getItem(this.BACKUP_KEY);
      return backups ? JSON.parse(backups) : [];
    } catch {
      return [];
    }
  }

  private static validateProgressData(data: any): boolean {
    return (
      data &&
      typeof data.userId === "string" &&
      typeof data.timestamp === "number" &&
      Array.isArray(data.completedLessons) &&
      typeof data.moduleProgress === "object" &&
      typeof data.totalTimeSpent === "number"
    );
  }

  private static generateUserId(): string {
    return "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
  }

  private static formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  }

  // Auto-save functionality
  static enableAutoSave(intervalMinutes: number = 5): () => void {
    const interval = setInterval(
      () => {
        const currentProgress = this.loadProgress();
        this.saveProgress({
          ...currentProgress,
          timestamp: Date.now(),
        });
      },
      intervalMinutes * 60 * 1000,
    );

    return () => clearInterval(interval);
  }

  // Sync across tabs
  static enableCrossTabSync(): () => void {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === this.STORAGE_KEY && e.newValue) {
        // Notify about progress update
        window.dispatchEvent(
          new CustomEvent("progressUpdated", {
            detail: JSON.parse(e.newValue),
          }),
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }
}

export default ProgressManager;

// Usage example:
/*
// Save lesson completion
ProgressManager.saveProgress({
  completedLessons: ['lesson-1', 'lesson-2'],
  moduleProgress: { 'module-1': 75 },
  totalTimeSpent: 120
});

// Export progress
ProgressManager.exportProgress();

// Get summary
const summary = ProgressManager.getProgressSummary();
console.log(summary);

// Enable auto-save every 5 minutes
const stopAutoSave = ProgressManager.enableAutoSave(5);

// Enable cross-tab sync
const stopSync = ProgressManager.enableCrossTabSync();
*/
