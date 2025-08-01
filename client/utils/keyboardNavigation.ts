// Utility to detect keyboard navigation and enhance accessibility
export const initKeyboardNavigation = () => {
  let hadKeyboardEvent = false;
  let hadMouseEvent = false;

  const keyboardThrottleTimeout = 100;
  const mouseThrottleTimeout = 200;

  function addKeyboardClass() {
    if (!hadKeyboardEvent) {
      hadKeyboardEvent = true;
      hadMouseEvent = false;
      document.documentElement.classList.add("keyboard-user");
      document.documentElement.classList.remove("mouse-user");
    }
  }

  function addMouseClass() {
    if (!hadMouseEvent) {
      hadMouseEvent = true;
      hadKeyboardEvent = false;
      document.documentElement.classList.add("mouse-user");
      document.documentElement.classList.remove("keyboard-user");
    }
  }

  // Throttled keyboard event handler
  let keyboardTimeout: NodeJS.Timeout;
  function handleKeyboardEvent(e: KeyboardEvent) {
    clearTimeout(keyboardTimeout);
    keyboardTimeout = setTimeout(() => {
      if (
        e.key === "Tab" ||
        e.key === "Enter" ||
        e.key === " " ||
        e.key.startsWith("Arrow")
      ) {
        addKeyboardClass();
      }
    }, keyboardThrottleTimeout);
  }

  // Throttled mouse event handler
  let mouseTimeout: NodeJS.Timeout;
  function handleMouseEvent() {
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      addMouseClass();
    }, mouseThrottleTimeout);
  }

  // Add event listeners
  document.addEventListener("keydown", handleKeyboardEvent, true);
  document.addEventListener("mousedown", handleMouseEvent, true);
  document.addEventListener("mousemove", handleMouseEvent, true);

  // Cleanup function
  return () => {
    clearTimeout(keyboardTimeout);
    clearTimeout(mouseTimeout);
    document.removeEventListener("keydown", handleKeyboardEvent, true);
    document.removeEventListener("mousedown", handleMouseEvent, true);
    document.removeEventListener("mousemove", handleMouseEvent, true);
  };
};

// Enhanced focus management for better accessibility
export const manageFocus = {
  // Trap focus within a container
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  },

  // Save and restore focus
  saveFocus: () => {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      if (activeElement && typeof activeElement.focus === "function") {
        activeElement.focus();
      }
    };
  },

  // Move focus to element with announcement
  moveTo: (element: HTMLElement, announce = true) => {
    element.focus();
    if (announce && element.getAttribute("aria-label")) {
      // Announce to screen readers
      element.setAttribute("aria-live", "polite");
      setTimeout(() => {
        element.removeAttribute("aria-live");
      }, 1000);
    }
  },
};

// Keyboard shortcuts manager
export class KeyboardShortcuts {
  private shortcuts: Map<string, () => void> = new Map();
  private isEnabled = true;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  // Register a keyboard shortcut
  register(combination: string, callback: () => void) {
    this.shortcuts.set(combination.toLowerCase(), callback);
  }

  // Unregister a keyboard shortcut
  unregister(combination: string) {
    this.shortcuts.delete(combination.toLowerCase());
  }

  // Enable/disable all shortcuts
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.isEnabled) return;

    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable
    ) {
      return;
    }

    const combination = this.getCombination(event);
    const callback = this.shortcuts.get(combination);

    if (callback) {
      event.preventDefault();
      callback();
    }
  }

  private getCombination(event: KeyboardEvent): string {
    const parts: string[] = [];

    if (event.ctrlKey || event.metaKey) parts.push("ctrl");
    if (event.altKey) parts.push("alt");
    if (event.shiftKey) parts.push("shift");

    parts.push(event.key.toLowerCase());

    return parts.join("+");
  }

  // Cleanup
  destroy() {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.shortcuts.clear();
  }
}
