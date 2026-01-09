"use client";

import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import styles from "./page.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className={styles.editorLoader}>Cargando el editor...</div>,
});

type FileLanguage = "javascript" | "typescript";

type FileTab = {
  id: string;
  name: string;
  language: FileLanguage;
  content: string;
};

const defaultFiles: FileTab[] = [
  {
    id: "main",
    name: "main.ts",
    language: "typescript",
    content: `// ¡Bienvenida al laboratorio de JavaScript/TypeScript!
// Ejecuta con ▶️ o Ctrl/Cmd + Enter
import { saludar } from "./helpers";

const amigos: string[] = ["Milita", "Gorilín", "JavaScript"];
amigos.forEach(amigo => console.log(saludar(amigo)));
`,
  },
  {
    id: "helpers",
    name: "helpers.ts",
    language: "typescript",
    content: `export function saludar(nombre: string): string {
  return \`Hola \${nombre} ✨\`;
}
`,
  },
];

export default function PlaygroundPage() {
  const { runCode } = useCodeRunner();
  const [files, setFiles] = useState<FileTab[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState<string>("main");
  const [logs, setLogs] = useState<string[]>([]);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleRun = useCallback(() => {
    if (!activeFile) return;
    // Concatenate all files so TypeScript stripping in useCodeRunner handles types
    const bundle = files
      .map((file) => `// File: ${file.name}\n${file.content}`)
      .join("\n\n");
    setIsRunning(true);
    const result = runCode(bundle);
    setLogs(result.logs);
    setRuntimeError(result.error || null);
    setIsRunning(false);
  }, [activeFile, files, runCode]);

  const handleReset = useCallback(() => {
    setFiles(defaultFiles);
    setActiveFileId("main");
    setLogs([]);
    setRuntimeError(null);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        handleRun();
      }
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen, handleRun]);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const consolePanel = useMemo(
    () => (
      <div className={styles.consoleCard}>
        <div className={styles.cardHeader}>
          <div className={styles.pill}>
            <span className={styles.dot} style={{ background: "#ff5f56" }} />
            <span className={styles.dot} style={{ background: "#ffbd2e" }} />
            <span className={styles.dot} style={{ background: "#27c93f" }} />
          </div>
          <span className={styles.cardTitle}>Consola</span>
          <span className={styles.cardHint}>autocompletado activo</span>
        </div>
        <div className={styles.consoleBody}>
          {logs.length === 0 && !runtimeError ? (
            <p className={styles.placeholder}>
              Ejecuta tu código para ver los logs aquí. Usa `console.log` o `alert`.
            </p>
          ) : (
            <>
              {logs.map((log, idx) => (
                <div key={idx} className={styles.logLine}>
                  <i className="fas fa-terminal" />
                  <span>{log}</span>
                </div>
              ))}
              {runtimeError && (
                <div className={`${styles.logLine} ${styles.errorLine}`}>
                  <i className="fas fa-exclamation-triangle" />
                  <span>{runtimeError}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    ),
    [logs, runtimeError]
  );

  const editorPanel = (
    <div className={`${styles.editorCard} ${isFullscreen ? styles.isFullscreen : ""}`}>
      <div className={styles.cardHeader}>
        <div className={styles.pill}>
          <span className={styles.dot} style={{ background: "#ff5f56" }} />
          <span className={styles.dot} style={{ background: "#ffbd2e" }} />
          <span className={styles.dot} style={{ background: "#27c93f" }} />
        </div>
        <div className={styles.fileMeta}>
          <span className={styles.fileName}>{activeFile?.name || "sin-archivo.ts"}</span>
          <span className={styles.badge}>Autocomplete</span>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${styles.ghost}`}
            onClick={handleReset}
            aria-label="Restablecer código"
          >
            <i className="fas fa-undo" />
            <span>Reset</span>
          </button>
          <button
            className={`${styles.actionButton} ${styles.ghost}`}
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            <i className={`fas ${isFullscreen ? "fa-compress" : "fa-expand"}`} />
            <span>{isFullscreen ? "Salir" : "Maximizar"}</span>
          </button>
          <button
            className={styles.runButton}
            onClick={handleRun}
            aria-label="Ejecutar código"
          >
            <i className={`fas ${isRunning ? "fa-circle-notch fa-spin" : "fa-play"}`} />
            <span>{isRunning ? "Ejecutando..." : "Ejecutar"}</span>
            <kbd className={styles.kbd}>Ctrl/Cmd + Enter</kbd>
          </button>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <div className={styles.tabs}>
          {files.map((file) => (
            <button
              key={file.id}
              className={`${styles.tab} ${file.id === activeFileId ? styles.activeTab : ""}`}
              onClick={() => setActiveFileId(file.id)}
            >
              <span className={styles.tabName}>{file.name}</span>
              <span className={styles.tabLang}>{file.language === "typescript" ? "TS" : "JS"}</span>
              {files.length > 1 && (
                <i
                  className={`fas fa-times ${styles.tabClose}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles((prev) => {
                      const next = prev.filter((f) => f.id !== file.id);
                      if (file.id === activeFileId && next.length) {
                        setActiveFileId(next[0].id);
                      }
                      return next.length ? next : prev;
                    });
                  }}
                />
              )}
            </button>
          ))}
        </div>
        <div className={styles.tabActions}>
          <button
            className={styles.smallAction}
            onClick={() => {
              const idx = files.length + 1;
              const newId = `file-${idx}`;
              const newFile: FileTab = {
                id: newId,
                name: `file${idx}.ts`,
                language: "typescript",
                content: `// Nuevo archivo ${idx}\nexport const value${idx} = ${idx};\n`,
              };
              setFiles((prev) => [...prev, newFile]);
              setActiveFileId(newId);
            }}
            aria-label="Nuevo archivo"
          >
            <i className="fas fa-plus" /> Nuevo archivo
          </button>
          {activeFile && (
            <select
              className={styles.langSelect}
              value={activeFile.language}
              onChange={(e) => {
                const lang = e.target.value as FileLanguage;
                setFiles((prev) =>
                  prev.map((f) => (f.id === activeFile.id ? { ...f, language: lang } : f))
                );
              }}
              aria-label="Cambiar lenguaje"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
            </select>
          )}
        </div>
      </div>

      <div className={styles.editorBody}>
        <MonacoEditor
          language={activeFile?.language || "typescript"}
          value={activeFile?.content || ""}
          onChange={(value) =>
            setFiles((prev) =>
              prev.map((f) => (f.id === activeFileId ? { ...f, content: value || "" } : f))
            )
          }
          height={isFullscreen ? "calc(100vh - 220px)" : "420px"}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            tabSize: 2,
            cursorSmoothCaretAnimation: "on",
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabCompletion: "on",
            parameterHints: { enabled: true },
          }}
        />
      </div>

      <div className={styles.helperBar}>
        <div className={styles.tip}>
          <i className="fas fa-magic" /> Autocompletado y firmas de funciones al estilo VS Code.
        </div>
        <div className={styles.tip}>
          <i className="fas fa-bolt" /> Ejecuta con Ctrl/Cmd + Enter.
        </div>
      </div>
    </div>
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>Laboratorio interactivo</p>
          <h1 className={styles.heroTitle}>
            Juega con JavaScript en un editor con superpoderes
          </h1>
          <p className={styles.heroSubtitle}>
            Escribe, ejecuta y experimenta con autocompletado tipo VS Code, modo pantalla completa
            y una consola en vivo para ver tus resultados al instante.
          </p>
          <div className={styles.heroActions}>
            <a href="#playground" className={styles.primaryCta}>
              <i className="fas fa-play" /> Probar ahora
            </a>
            <button className={styles.secondaryCta} onClick={handleToggleFullscreen}>
              <i className="fas fa-arrows-alt" /> Abrir en grande
            </button>
          </div>
          <div className={styles.heroBadges}>
            <span><i className="fas fa-terminal" /> Consola en vivo</span>
            <span><i className="fas fa-moon" /> Tema oscuro</span>
            <span><i className="fas fa-bolt" /> Autocomplete + snippets</span>
          </div>
        </div>
        <div className={styles.heroGlow} />
      </section>

      <section id="playground" className={styles.playground}>
        <div className={styles.editorColumn}>
          {isFullscreen && mounted
            ? createPortal(
                <div className={styles.fullscreenOverlay}>
                  <div className={styles.backdrop} onClick={handleToggleFullscreen} />
                  <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                    {editorPanel}
                    <div className={styles.overlayConsole}>{consolePanel}</div>
                  </div>
                </div>,
                document.body
              )
            : editorPanel}
        </div>
        <div className={styles.outputColumn}>
          {!isFullscreen && consolePanel}
          {!isFullscreen && (
            <div className={styles.tipCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Trucos rápidos</span>
              </div>
              <ul className={styles.tipList}>
                <li><strong>Ctrl/Cmd + Enter:</strong> Ejecuta tu código.</li>
                <li><strong>console.log:</strong> Envía mensajes a la consola.</li>
                <li><strong>alert("mensaje"):</strong> Lanza alertas simpáticas.</li>
                <li><strong>Shift + Alt + F:</strong> Formatea el documento.</li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
