"use client";

import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-okaidia.css'; // Dark theme matching legacy
import styles from './CodeEditor.module.css';

export type EditorLanguage = 'javascript' | 'typescript' | 'html' | 'css';

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

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (newCode: string) => {
    setCode(newCode);
    if (onChange) onChange(newCode);
  };

  const getLanguage = (): string => {
    if (language === 'html') return 'markup';
    return language;
  };

  const getFilename = (): string => {
    if (filename) return filename;
    if (language === 'html') return 'index.html';
    if (language === 'css') return 'style.css';
    if (language === 'typescript') return 'script.ts';
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
    } else {
      prismLang = Prism.languages.javascript;
    }
    return Prism.highlight(code, prismLang, langName);
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.toolbar}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f56' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#27c93f' }} />
        </div>
        <span className={styles.filename}>{getFilename()}</span>
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
            backgroundColor: '#1e1e1e', // Match VS Code Dark
            color: '#d4d4d4'
          }}
          textareaClassName={styles.textarea}
        />
      </div>
    </div>
  );
}
