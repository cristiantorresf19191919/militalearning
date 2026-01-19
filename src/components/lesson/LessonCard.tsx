"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import * as Babel from '@babel/standalone';
import { Lesson } from '@/data/lessons';
import { useCodeRunner } from '@/hooks/useCodeRunner';
import { useHTMLCSSRunner } from '@/hooks/useHTMLCSSRunner';
import { useProgress } from '@/context/ProgressContext';
import { buildReactPreviewHTML, detectReactComponentName } from '@/lib/buildReactPreviewHTML';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CodeEditor } from '@/components/editor/CodeEditor';
import styles from './LessonCard.module.css';

interface LessonCardProps {
  lesson: Lesson;
  isActive: boolean;
  onComplete: () => void;
}

export function LessonCard({ lesson, isActive, onComplete }: LessonCardProps) {
  const { markLessonComplete, isLessonComplete } = useProgress();
  const { runCode } = useCodeRunner();
  const { runHTMLCSS } = useHTMLCSSRunner();
  const [code, setCode] = useState(lesson.initialCode);
  const [htmlCode, setHtmlCode] = useState(lesson.initialHTML || '');
  const [cssCode, setCssCode] = useState(lesson.initialCSS || '');
  const [outputLogs, setOutputLogs] = useState<string[]>([]);
  const [renderedHTML, setRenderedHTML] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  // React lesson: live preview (iframe)
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [previewError, setPreviewError] = useState<string | null>(null);
  const previewFirstRunRef = useRef(true);

  const completed = isLessonComplete(lesson.id);

  useEffect(() => {
    setCode(lesson.initialCode);
    setHtmlCode(lesson.initialHTML || '');
    setCssCode(lesson.initialCSS || '');
    setRenderedHTML('');
    setOutputLogs([]);
    setFeedback(null);
    setPreviewHtml('');
    setPreviewError(null);
    previewFirstRunRef.current = true;
  }, [lesson.id]);

  const compileReactPreview = useCallback(() => {
    if (lesson.type !== 'react') return;
    setPreviewError(null);
    try {
      const result = Babel.transform(code, {
        presets: [
          ['env', { modules: 'commonjs' }],
          ['react', { runtime: 'classic' }],
          'typescript',
        ],
        sourceType: 'module',
        filename: 'Component.jsx',
      }).code;
      if (!result) throw new Error('No se pudo compilar.');
      const hint = detectReactComponentName(code);
      const html = buildReactPreviewHTML(result, { componentHint: hint });
      setPreviewHtml(html);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setPreviewError(msg);
      setPreviewHtml('');
    }
  }, [code, lesson.type]);

  useEffect(() => {
    if (lesson.type !== 'react') return;
    if (previewFirstRunRef.current) {
      previewFirstRunRef.current = false;
      compileReactPreview();
      return;
    }
    const t = setTimeout(compileReactPreview, 500);
    return () => clearTimeout(t);
  }, [code, lesson.type, compileReactPreview]);

  const handleRun = () => {
    if (lesson.type === 'html' || lesson.type === 'css') {
      // Handle HTML/CSS lessons
      const html = lesson.type === 'html' ? code : (htmlCode || lesson.initialHTML || '');
      const css = lesson.type === 'css' ? code : (cssCode || lesson.initialCSS || '');
      
      const { renderedHTML: htmlResult, error } = runHTMLCSS(html, css, lesson.initialHTML, lesson.initialCSS);
      setRenderedHTML(htmlResult);

      if (error) {
        setFeedback({ type: 'error', message: "Algo salió mal... revisa tu código 🔴" });
        return;
      }

      // Run validation logic for HTML/CSS
      const validation = lesson.validationLogic(code, [], htmlResult);

      if (validation.success) {
        setFeedback({ type: 'success', message: validation.message || "¡Bien hecho! 🎉" });
        if (!completed) {
          markLessonComplete(lesson.id);
          fireConfetti(lesson.color);
          setTimeout(() => {
               onComplete();
          }, 2000);
        }
      } else {
        setFeedback({ type: 'info', message: validation.message || "Casi lo tienes... intenta de nuevo." });
      }
    } else {
      // Handle JavaScript / React lessons: refresh live preview when verifying
      if (lesson.type === 'react') compileReactPreview();
      const { logs, alertCalled, error } = runCode(code);
      setOutputLogs(logs);

      if (error) {
        setFeedback({ type: 'error', message: "Algo salió mal... revisa la consola 🔴" });
        return;
      }

      // Run validation logic
      const validation = lesson.validationLogic(code, logs);

      if (validation.success) {
        setFeedback({ type: 'success', message: validation.message || "¡Bien hecho! 🎉" });
        if (!completed) {
          markLessonComplete(lesson.id);
          fireConfetti(lesson.color);
          setTimeout(() => {
               onComplete();
          }, 2000);
        }
      } else {
        setFeedback({ type: 'info', message: "Casi lo tienes... intenta de nuevo." });
      }
    }
  };

  const fireConfetti = (colorName: string) => {
      // Map color names to hex if needed, or rely on defaults
      const colors = colorName === 'purple' ? ['#8A54F8', '#A06AF9'] : 
                     colorName === 'pink' ? ['#F8549B', '#F96A88'] :
                     ['#2EDC9B', '#35E4B2'];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
  };

  // All lessons are now accessible - no blocking!

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
      id={`lesson-${lesson.id}`}
    >
      <Card className={styles.card}>
        <div className={styles.header}>
            <div className={`${styles.icon} ${styles[lesson.color]}`}>
                <i className={`fas ${lesson.icon}`}></i>
            </div>
            <h3 className={styles.title}>{lesson.title}</h3>
            {completed && <span className={styles.badge}>¡Completada! ✅</span>}
        </div>
        
        <p className={styles.description} dangerouslySetInnerHTML={{ __html: parseMarkdown(lesson.description) }} />
        
        <div className={`${styles.instruction} ${styles[`border-${lesson.color}`]}`}>
            <p><strong>🎯 Tu Misión:</strong> {lesson.instruction}</p>
        </div>

        <div className={styles.editorSection}>
            {/* Row 1: Code editor — full width */}
            <div className={styles.editorRow}>
              {lesson.type === 'css' && lesson.initialHTML && (
                <div className={styles.extraEditor}>
                  <CodeEditor 
                    initialCode={lesson.initialHTML} 
                    onChange={setHtmlCode}
                    language="html"
                    readOnly={true}
                  />
                </div>
              )}
              {lesson.type === 'html' && lesson.initialCSS && (
                <div className={styles.extraEditor}>
                  <CodeEditor 
                    initialCode={lesson.initialCSS} 
                    onChange={setCssCode}
                    language="css"
                    readOnly={true}
                  />
                </div>
              )}
              <CodeEditor 
                initialCode={code} 
                onChange={setCode}
                onRun={handleRun}
                language={lesson.type === 'html' ? 'html' : lesson.type === 'css' ? 'css' : lesson.type === 'typescript' ? 'typescript' : lesson.type === 'react' ? 'react' : 'javascript'}
              />
            </div>

            <div className={styles.controls}>
              <Button onClick={handleRun} variant="gradient" className={styles.runButton}>
                <i className="fas fa-play" style={{marginRight: 8}}></i> {lesson.type === 'html' || lesson.type === 'css' ? 'Ver Resultado' : lesson.type === 'react' ? 'Verificar Código React' : 'Ejecutar Código'}
              </Button>
            </div>

            {/* Row 2: React live preview — full width, one row */}
            {lesson.type === 'react' && (
              <div className={styles.previewSection}>
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <span>Preview en vivo</span>
                    {previewError ? (
                      <span className={styles.badgeError}>Error</span>
                    ) : (
                      <span className={styles.badgeOk}>React 18</span>
                    )}
                  </div>
                  <div className={styles.previewBody}>
                    {previewError ? (
                      <pre className={styles.previewError}>{previewError}</pre>
                    ) : previewHtml ? (
                      <iframe
                        title="React Preview"
                        className={styles.previewFrame}
                        srcDoc={previewHtml}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <span className={styles.placeholder}>Compilando…</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {(lesson.type === 'html' || lesson.type === 'css') ? (
              <div className={styles.output}>
                {renderedHTML ? (
                  <iframe
                    srcDoc={renderedHTML}
                    style={{
                      width: '100%',
                      minHeight: '300px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: 'white'
                    }}
                    title="Preview"
                  />
                ) : (
                  <span className={styles.placeholder}>El resultado aparecerá aquí...</span>
                )}
              </div>
            ) : (
              <div className={styles.output}>
                {outputLogs.length > 0 ? (
                    outputLogs.map((log, i) => <div key={i} className={styles.logLine}>{log}</div>)
                ) : (
                    <span className={styles.placeholder}>Los resultados aparecerán aquí...</span>
                )}
              </div>
            )}
            
            <AnimatePresence>
                {feedback && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`${styles.feedback} ${styles[feedback.type]}`}
                    >
                        {feedback.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

// Simple markdown parser for bold/code and paragraph breaks
function parseMarkdown(text: string) {
    return text
        .replace(/\n\n+/g, '<br><br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}
