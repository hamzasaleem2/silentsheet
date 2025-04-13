export type Font = 'serif' | 'sans-serif' | 'monospace';
export type Theme = 'light' | 'sepia' | 'night';
export type Size = 'small' | 'medium' | 'large' | 'full';

export interface UIState {
  font: Font;
  fontSize: number;
  theme: Theme;
  size: Size;
  timerRunning: boolean;
  timerSeconds: number;
}

export interface SilentSheetState extends UIState {
  content: string;
}

export interface SilentSheetActions {
  setContent: (content: string) => void;
  setFont: (font: Font) => void;
  setFontSize: (size: number) => void;
  setTheme: (theme: Theme) => void;
  setSize: (size: Size) => void;
  saveContent: () => void;
  clearContent: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export interface SilentSheetAPI {
  getState: () => SilentSheetState;
  getActions: () => SilentSheetActions;
  subscribeToUI: (callback: () => void) => () => void;
} 