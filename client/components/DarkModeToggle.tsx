import React, { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

interface DarkModeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className = "",
  size = "md",
}) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or default to system
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className={`${getSizeClass()} text-yellow-500`} />;
      case "dark":
        return <Moon className={`${getSizeClass()} text-blue-400`} />;
      case "system":
        return <Monitor className={`${getSizeClass()} text-gray-600`} />;
      default:
        return <Sun className={getSizeClass()} />;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "md":
        return "w-4 h-4";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "md":
        return "w-10 h-10";
      case "lg":
        return "w-12 h-12";
      default:
        return "w-10 h-10";
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Light";
    }
  };

  if (!mounted) {
    return (
      <div
        className={`${getButtonSize()} bg-gray-100 rounded-lg animate-pulse ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        onClick={cycleTheme}
        variant="outline"
        size="sm"
        className={`${getButtonSize()} p-0 border-gray-200 hover:bg-gray-50 transition-smooth interactive-element`}
        title={`Current theme: ${getThemeLabel()}. Click to cycle.`}
      >
        {getIcon()}
      </Button>
      {size === "lg" && (
        <span className="text-xs text-gray-500 font-medium">
          {getThemeLabel()}
        </span>
      )}
    </div>
  );
};

// Hook to use theme in other components
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);

    const updateIsDark = () => {
      if (savedTheme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      } else {
        setIsDark(savedTheme === "dark");
      }
    };

    updateIsDark();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateIsDark);

    return () => mediaQuery.removeEventListener("change", updateIsDark);
  }, []);

  return { theme, isDark };
};

export default DarkModeToggle;
