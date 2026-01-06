"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css'; // Dark theme matching legacy
import styles from './CodeEditor.module.css';

export type EditorLanguage = 'javascript' | 'typescript' | 'html' | 'css' | 'react';

interface CodeEditorProps {
  initialCode: string;
  onChange?: (code: string) => void;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  language?: EditorLanguage;
  filename?: string;
}

export function CodeEditor({ initialCode, onChange, onRun, readOnly = false, language = 'javascript', filename }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const normalEditorRef = useRef<HTMLDivElement>(null);
  const fullscreenEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const handleChange = (newCode: string) => {
    setCode(newCode);
    if (onChange) onChange(newCode);
  };

  const getLanguage = (): string => {
    if (language === 'html') return 'markup';
    if (language === 'react') return 'jsx';
    return language;
  };

  const getFilename = (): string => {
    if (filename) return filename;
    if (language === 'html') return 'index.html';
    if (language === 'css') return 'style.css';
    if (language === 'typescript') return 'script.ts';
    if (language === 'react') return 'Component.jsx';
    return 'script.js';
  };

  const highlight = (code: string) => {
    const langName = getLanguage();
    let prismLang;
    if (langName === 'markup') {
      prismLang = Prism.languages.markup || Prism.languages.html;
    } else if (langName === 'css') {
      prismLang = Prism.languages.css;
    } else if (langName === 'typescript') {
      prismLang = Prism.languages.typescript;
    } else if (langName === 'jsx') {
      prismLang = Prism.languages.jsx || Prism.languages.javascript;
    } else {
      prismLang = Prism.languages.javascript;
    }
    return Prism.highlight(code, prismLang, langName);
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      setIsAnimating(true);
      setIsFullscreen(true);
      
      // Trigger animation after state update
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      setIsFullscreen(false);
      
      // Wait for animation to complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 400);
    }
  };

  const fullscreenModal = isFullscreen && mounted ? createPortal(
    <div className={styles.fullscreenBackdrop} onClick={handleFullscreenToggle}>
      <div 
        ref={fullscreenEditorRef}
        className={`${styles.editorWrapper} ${styles.fullscreen} ${isAnimating ? styles.animating : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.toolbar}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#ff5f56' }} />
            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
            <span className={styles.dot} style={{ background: '#27c93f' }} />
          </div>
          <span className={styles.filename}>{getFilename()}</span>
          <button 
            className={styles.fullscreenButton}
            onClick={handleFullscreenToggle}
            aria-label="Exit fullscreen"
            title="Exit fullscreen (Esc)"
          >
            <i className="fas fa-compress" />
          </button>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            value={code}
            onValueChange={handleChange}
            highlight={highlight}
            padding={20}
            className={styles.editor}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              minHeight: '100%',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4'
            }}
            textareaClassName={styles.textarea}
          />
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {fullscreenModal}
      <div 
        ref={normalEditorRef}
        className={`${styles.editorWrapper} ${isFullscreen ? styles.hidden : ''}`}
      >
        <div className={styles.toolbar}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#ff5f56' }} />
            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
            <span className={styles.dot} style={{ background: '#27c93f' }} />
          </div>
          <span className={styles.filename}>{getFilename()}</span>
          <button 
            className={styles.fullscreenButton}
            onClick={handleFullscreenToggle}
            aria-label="Enter fullscreen"
            title="Enter fullscreen"
          >
            <i className="fas fa-expand" />
          </button>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            value={code}
            onValueChange={handleChange}
            highlight={highlight}
            padding={15}
            className={styles.editor}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: '150px',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4'
            }}
            textareaClassName={styles.textarea}
          />
        </div>
      </div>
    </>
  );
}
