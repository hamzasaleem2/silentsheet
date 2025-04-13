import type { SilentSheetState, SilentSheetActions, Font, Theme, Size, SilentSheetAPI } from './types';

const STORAGE_KEY = 'silentsheet';
const INITIAL_TIMER_SECONDS = 15 * 60;

const DEFAULT_OPTIONS: SilentSheetState = {
  content: '',
  font: 'sans-serif',
  fontSize: 24,
  theme: 'sepia',
  size: 'medium',
  timerRunning: false,
  timerSeconds: INITIAL_TIMER_SECONDS
};

export class SilentSheet implements SilentSheetAPI {
  private state: SilentSheetState;
  private subscribers: Set<() => void>;
  private timerInterval: NodeJS.Timeout | null = null;

  constructor(initialState?: Partial<SilentSheetState>) {
    this.subscribers = new Set();
    const savedState = this.loadState();
    this.state = {
      ...DEFAULT_OPTIONS,
      ...savedState,
      ...initialState,
      // Always reset timer state on initialization
      timerRunning: false,
      timerSeconds: INITIAL_TIMER_SECONDS
    };
  }

  private loadState(): SilentSheetState | null {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Ignore storage errors
    }
  }

  private startTimer(): void {
    if (this.timerInterval) return;
    
    this.timerInterval = setInterval(() => {
      if (this.state.timerSeconds <= 0) {
        this.stopTimer();
        alert('Time is up! Take a moment to review what you\'ve written.');
        return;
      }
      
      this.state.timerSeconds--;
      this.notifySubscribers();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getState(): SilentSheetState {
    return { ...this.state };
  }

  getActions(): SilentSheetActions {
    return {
      setContent: (content: string) => {
        this.state.content = content;
        this.notifySubscribers();
      },
      setFont: (font: Font) => {
        this.state.font = font;
        this.saveState();
        this.notifySubscribers();
      },
      setFontSize: (size: number) => {
        this.state.fontSize = size;
        this.saveState();
        this.notifySubscribers();
      },
      setTheme: (theme: Theme) => {
        this.state.theme = theme;
        this.saveState();
        this.notifySubscribers();
      },
      setSize: (size: Size) => {
        this.state.size = size;
        this.saveState();
        this.notifySubscribers();
      },
      saveContent: () => {
        this.saveState();
      },
      clearContent: () => {
        this.state.content = '';
        this.saveState();
        this.notifySubscribers();
      },
      toggleTimer: () => {
        if (this.state.timerRunning) {
          // If running, stop and reset
          this.stopTimer();
          this.state.timerRunning = false;
          this.state.timerSeconds = INITIAL_TIMER_SECONDS;
        } else {
          // If stopped, start
          this.state.timerRunning = true;
          this.startTimer();
        }
        this.notifySubscribers();
      },
      resetTimer: () => {
        this.stopTimer();
        this.state.timerRunning = false;
        this.state.timerSeconds = INITIAL_TIMER_SECONDS;
        this.notifySubscribers();
      }
    };
  }

  subscribeToUI(callback: () => void): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(subscriber => subscriber());
  }
} 