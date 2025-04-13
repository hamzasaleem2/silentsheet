import React, { useState, useCallback, useRef, useEffect } from 'react';
import { SilentSheet as CoreSilentSheet, Size, Theme, Font } from '@silentsheet/core';
import { FiCopy, FiDownload, FiTrash2 } from 'react-icons/fi';
import './styles.css';

const widths: Record<Size, string> = {
  small: '50%',
  medium: '75%',
  large: '90%',
  full: '100%'
};

const backgrounds: Record<Theme, string> = {
  sepia: '#f9f7ee',
  light: '#ffffff',
  night: '#1a1a1a'
};

interface SilentSheetProps {
  placeholder?: string;
  onChange?: (text: string) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const SilentSheet: React.FC<SilentSheetProps> = ({ 
  placeholder = "Begin your story here...",
  onChange 
}) => {
  const instance = useRef(new CoreSilentSheet());
  const [uiState, setUIState] = useState(instance.current.getState());
  const [stats, setStats] = useState({ words: 0, chars: 0 });
  const actions = instance.current.getActions();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const updateUIState = useCallback(() => {
    setUIState(instance.current.getState());
  }, []);

  const updateStats = useCallback((text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const chars = text.length;
    setStats({ words, chars });
  }, []);

  const saveContent = useCallback((content: string) => {
    actions.setContent(content);
    actions.saveContent();
  }, [actions]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const text = e.target.value;
    updateStats(text);
    onChange?.(text);
    timeoutRef.current = setTimeout(() => {
      saveContent(text);
    }, 1000);
  }, [saveContent, updateStats, onChange]);

  useEffect(() => {
    updateStats(uiState.content);
  }, [uiState.content, updateStats]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = instance.current.subscribeToUI(updateUIState);
    return () => unsubscribe();
  }, [updateUIState]);

  const handleContentBlur = useCallback(() => {
    if (textareaRef.current) {
      saveContent(textareaRef.current.value);
    }
  }, [saveContent]);

  return (
    <div 
      className="silentsheet-root"
      data-theme={uiState.theme}
      style={{
        background: backgrounds[uiState.theme],
        color: uiState.theme === 'night' ? '#ffffff' : '#000000'
      }}
    >
      <div 
        className="container"
        style={{
          width: widths[uiState.size]
        }}
      >
        <a
          href="https://github.com/hamzasaleem2/silentsheet"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          open source
        </a>
        <textarea
          ref={textareaRef}
          className="textarea"
          style={{
            fontFamily: uiState.font,
            fontSize: `${uiState.fontSize}px`
          }}
          defaultValue={uiState.content}
          onChange={handleContentChange}
          onBlur={handleContentBlur}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          data-gramm="false"
        />
        <div className="controls">
          <div className="controls-group">
            <button
              className="timer-button"
              onClick={actions.toggleTimer}
              title={`${uiState.timerRunning ? 'Stop' : 'Start'} Timer`}
            >
              {formatTime(uiState.timerSeconds)}
            </button>
            <select
              className="select"
              value={uiState.font}
              onChange={e => {
                actions.setFont(e.target.value as Font);
                updateUIState();
              }}
              title="Font Family"
              style={{
                '--bg-color': backgrounds[uiState.theme],
                '--text-color': uiState.theme === 'night' ? '#ffffff' : '#000000'
              } as React.CSSProperties}
            >
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="monospace">Monospace</option>
            </select>
            <div className="font-size-control">
              <input
                type="range"
                className="range"
                min="14"
                max="28"
                value={uiState.fontSize}
                onChange={e => {
                  actions.setFontSize(Number(e.target.value));
                  updateUIState();
                }}
                title="Font Size"
              />
              <span className="font-size-value">{uiState.fontSize}</span>
            </div>
          </div>
          <div className="controls-group">
            <select
              className="select"
              value={uiState.theme}
              onChange={e => {
                actions.setTheme(e.target.value as Theme);
                updateUIState();
              }}
              title="Theme"
              style={{
                '--bg-color': backgrounds[uiState.theme],
                '--text-color': uiState.theme === 'night' ? '#ffffff' : '#000000'
              } as React.CSSProperties}
            >
              <option value="light">Light</option>
              <option value="sepia">Sepia</option>
              <option value="night">Night</option>
            </select>
            <select
              className="select"
              value={uiState.size}
              onChange={e => {
                actions.setSize(e.target.value as Size);
                updateUIState();
              }}
              title="Width"
              style={{
                '--bg-color': backgrounds[uiState.theme],
                '--text-color': uiState.theme === 'night' ? '#ffffff' : '#000000'
              } as React.CSSProperties}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="controls-group">
            <button 
              className="icon-button"
              onClick={() => {
                if (textareaRef.current) {
                  navigator.clipboard.writeText(textareaRef.current.value);
                }
              }}
              title="Copy to Clipboard"
            >
              <FiCopy />
            </button>
            <button 
              className="icon-button"
              onClick={() => {
                if (textareaRef.current) {
                  const blob = new Blob([textareaRef.current.value], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'silentsheet.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }
              }}
              title="Download as Text"
            >
              <FiDownload />
            </button>
            <button 
              className="icon-button"
              onClick={() => {
                if (textareaRef.current) {
                  textareaRef.current.value = '';
                  actions.clearContent();
                  updateUIState();
                }
              }}
              title="Clear Content"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        <div className="word-count">
          {stats.words} words, {stats.chars} characters
        </div>
      </div>
    </div>
  );
}; 