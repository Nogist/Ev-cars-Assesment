const PREFIX = 'onboarding_';
const COMPLETED_KEY = `${PREFIX}completedSteps`;

export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(`${PREFIX}${key}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  },

  getCompletedSteps(): number[] {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  markStepCompleted(step: number): void {
    const completed = this.getCompletedSteps();
    if (!completed.includes(step)) {
      completed.push(step);
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
    }
  },

  clearAll(): void {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
};
