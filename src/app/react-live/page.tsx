"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Babel from "@babel/standalone";
import { emmetJSX } from "emmet-monaco-es";
import styles from "./page.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className={styles.editorLoader}>Cargando el editor...</div>,
});

const defaultCode = `// Edita React con JSX/TSX a la izquierda y mira el preview en vivo a la derecha.
// React y ReactDOM ya están disponibles (no hace falta import).
// Usa "export default function App() { ... }" para renderizar tu componente principal.

const LikeButton = ({ liked, onToggle }) => {
  return (
    <button className="like" onClick={onToggle}>
      {liked ? "💜" : "🤍"}
    </button>
  );
};

const Thumbnail = ({ video }) => {
  return (
    <div className="thumb">
      <div className="thumb__play">▶</div>
      <span className="thumb__length">{video.length}</span>
    </div>
  );
};

export default function App() {
  const [liked, setLiked] = React.useState(false);
  const video = {
    title: "My video",
    description: "Video description",
    url: "#",
    length: "3:21",
  };

  return (
    <div className="card">
      <Thumbnail video={video} />
      <div className="card__body">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
      <LikeButton liked={liked} onToggle={() => setLiked(!liked)} />
    </div>
  );
}
`;

function buildPreviewHTML(compiled: string) {
  const stylesInline = `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.14), transparent 35%),
                  radial-gradient(circle at 80% 0%, rgba(56, 189, 248, 0.14), transparent 30%),
                  #0f1117;
      color: #e5e7eb;
    }
    .card {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 16px;
      padding: 16px 18px;
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
    }
    .thumb {
      width: 180px;
      height: 108px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0ea5e9, #8a54f8);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: white;
      box-shadow: 0 8px 20px rgba(138, 84, 248, 0.35);
    }
    .thumb__play {
      font-size: 32px;
      opacity: 0.9;
      text-shadow: 0 4px 12px rgba(0,0,0,0.35);
    }
    .thumb__length {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0,0,0,0.55);
      padding: 4px 8px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    .card__body h3 {
      margin: 0 0 4px;
      color: #f9fafb;
    }
    .card__body p {
      margin: 0;
      color: #cbd5e1;
    }
    .like {
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.05);
      color: white;
      padding: 10px 14px;
      font-size: 18px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .like:hover {
      border-color: rgba(138, 84, 248, 0.4);
      box-shadow: 0 8px 20px rgba(138, 84, 248, 0.25);
      transform: translateY(-1px);
    }
  `;

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>${stylesInline}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      var process = { env: { NODE_ENV: 'development' } };
      var exports = {};
      var module = { exports: exports };
      function require(name) {
        if (name === 'react') return window.React;
        if (name === 'react-dom') return window.ReactDOM;
        throw new Error('Module not found: ' + name);
      }
      try {
        if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
          throw new Error('React o ReactDOM no se cargaron. Comprueba tu conexión.');
        }
        ${compiled}
        var ComponentToRender = window.__APP__ || (exports && exports.default) || (module.exports && module.exports.default);
        if (!ComponentToRender || typeof ComponentToRender !== 'function') throw new Error("No se encontró un componente App export default.");
        var root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(React.createElement(ComponentToRender));
      } catch (e) {
        var pre = document.createElement('pre');
        pre.style.cssText = 'color:#fca5a5;margin:1rem;padding:1rem;background:rgba(0,0,0,0.3);border-radius:8px;white-space:pre-wrap;font-size:14px;';
        pre.textContent = (e && e.message) || String(e);
        document.body.appendChild(pre);
      }
    </script>
  </body>
</html>`;
}

export default function ReactLivePage() {
  const [code, setCode] = useState(defaultCode);
  const [outputHtml, setOutputHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const monacoRef = useRef<any>(null);
  const editorRef = useRef<any>(null);

  const compileCode = useCallback(() => {
    setIsRunning(true);
    setError(null);
    try {
      const wrapped = `${code}\n;window.__APP__ = typeof App !== "undefined" ? App : (typeof exports !== "undefined" ? exports.default : null);`;
      const result = Babel.transform(wrapped, {
        presets: [
          ["env", { modules: "commonjs" }],
          ["react", { runtime: "classic" }],
          "typescript",
        ],
        sourceType: "module",
        filename: "App.tsx",
      }).code;
      if (!result) throw new Error("No se pudo compilar el código.");
      const html = buildPreviewHTML(result);
      setOutputHtml(html);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  // auto-run on first load
  useEffect(() => {
    compileCode();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cmd/Ctrl + Enter to run
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        compileCode();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compileCode]);

  const previewPane = useMemo(() => {
    return (
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <span>Preview en vivo</span>
          {error ? (
            <span className={styles.badgeError}>Error</span>
          ) : (
            <span className={styles.badgeOk}>React 18</span>
          )}
        </div>
        <div className={styles.previewBody}>
          {error ? (
            <pre className={styles.errorBox}>{error}</pre>
          ) : (
            <iframe
              title="React Preview"
              className={styles.previewFrame}
              srcDoc={outputHtml}
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    );
  }, [error, outputHtml]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>React Live</p>
          <h1 className={styles.title}>Edita React a la izquierda, mira el resultado al instante</h1>
          <p className={styles.subtitle}>
            Usa JSX/TSX, hooks y componentes. No necesitas imports de React: ya está listo en la vista previa.
          </p>
          <div className={styles.actionsRow}>
            <button className={styles.runButton} onClick={compileCode}>
              <i className={`fas ${isRunning ? "fa-circle-notch fa-spin" : "fa-play"}`} />
              {isRunning ? "Compilando..." : "Ejecutar (Ctrl/Cmd + Enter)"}
            </button>
            <button
              className={styles.resetButton}
              onClick={() => {
                setCode(defaultCode);
                setError(null);
                setTimeout(() => compileCode(), 0);
              }}
            >
              <i className="fas fa-undo" /> Reset
            </button>
          </div>
        </div>
      </section>

      <section className={styles.workbench}>
        <div className={styles.editorCard}>
          <div className={styles.cardHeader}>
            <div className={styles.pill}>
              <span className={styles.dot} style={{ background: "#ff5f56" }} />
              <span className={styles.dot} style={{ background: "#ffbd2e" }} />
              <span className={styles.dot} style={{ background: "#27c93f" }} />
            </div>
            <div className={styles.cardTitle}>App.tsx</div>
            <div className={styles.cardHint}>Autocomplete + Emmet + JSX/TSX</div>
          </div>
          <div className={styles.editorBody}>
            <MonacoEditor
              language="typescript"
              path="App.tsx"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              height="600px"
              options={{
                fontSize: 15,
                fontLigatures: true,
                minimap: { enabled: false },
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                tabSize: 2,
                smoothScrolling: true,
              }}
              beforeMount={(monaco) => {
                monacoRef.current = monaco;
                // Enable Emmet for JSX/TSX: type "div.container>ul>li*3" and press Tab
                emmetJSX(monaco, ["javascript", "typescript", "typescriptreact", "tsx"]);
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                  allowJs: true,
                  jsx: monaco.languages.typescript.JsxEmit.React,
                  target: monaco.languages.typescript.ScriptTarget.ESNext,
                  module: monaco.languages.typescript.ModuleKind.ESNext,
                  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  allowNonTsExtensions: true,
                  allowImportingTsExtensions: true,
                  resolveJsonModule: true,
                  esModuleInterop: true,
                  isolatedModules: true,
                  noEmit: true,
                });

                // Inject React types
                fetch('https://unpkg.com/@types/react@18.2.42/index.d.ts')
                  .then(res => res.text())
                  .then(content => {
                    monaco.languages.typescript.typescriptDefaults.addExtraLib(content, 'file:///node_modules/@types/react/index.d.ts');
                  });

                // Inject global React declaration
                monaco.languages.typescript.typescriptDefaults.addExtraLib(`
                  import * as ReactSource from 'react';
                  declare global {
                    const React: typeof ReactSource;
                  }
                `, 'file:///global.d.ts');
              }}
              onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;
              }}
            />
          </div>
        </div>

        {previewPane}
      </section>
    </main>
  );
}
