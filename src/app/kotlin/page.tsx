"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className={styles.editorLoader}>Cargando el editor...</div>,
});

const defaultCode = `// ¡Hola Kotlin! Edita este ejemplo y explora las sugerencias (Ctrl/Cmd + Space)
// Usa funciones, clases y colecciones. Las sugerencias incluyen palabras clave y snippets.

fun greet(nombre: String): String {
    return "Hola $nombre 🌸"
}

data class Video(val title: String, val description: String)

fun main() {
    val video = Video("Mi primer video", "Aprendiendo Kotlin con Milita")
    println(greet("Milita"))
    println("Título: \${video.title}")
    println("Descripción: \${video.description}")
}
`;

const snippetCompletions = [
  {
    label: "main",
    insertText: "fun main() {\n    println(\"Hola Kotlin\")\n}",
    detail: "Función main",
  },
  {
    label: "data class",
    insertText: "data class ${1:User}(val ${2:nombre}: String, val ${3:edad}: Int)",
    detail: "Data class",
  },
  {
    label: "when",
    insertText: "when (${1:valor}) {\n    ${2:1} -> println(\"uno\")\n    ${3:else} -> println(\"otro\")\n}",
    detail: "Expresión when",
  },
  {
    label: "for",
    insertText: "for (${1:item} in ${2:items}) {\n    println(${1:item})\n}",
    detail: "Bucle for",
  },
];

export default function KotlinPage() {
  const monacoRef = useRef<any>(null);
  const registeredRef = useRef(false);
  const [code, setCode] = useState(defaultCode);

  useEffect(() => {
    if (!monacoRef.current || registeredRef.current) return;
    registeredRef.current = true;

    const monaco = monacoRef.current;
    monaco.languages.register({ id: "kotlin" });
    monaco.languages.setMonarchTokensProvider("kotlin", {
      tokenizer: {
        root: [
          [/\b(fun|val|var|if|else|when|for|while|return|class|data|object|interface|package|import|in|is|as|try|catch|finally|throw|true|false|null)\b/, "keyword"],
          [/[A-Z][\w\$]*/, "type.identifier"],
          [/[a-zA-Z_]\w*/, "identifier"],
          [/\d+/, "number"],
          [/".*?"/, "string"],
          [/\/\/.*$/, "comment"],
        ],
      },
    });

    monaco.languages.registerCompletionItemProvider("kotlin", {
      provideCompletionItems: () => {
        const suggestions = snippetCompletions.map((s) => ({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
        }));
        const keywords = [
          "fun",
          "val",
          "var",
          "when",
          "data class",
          "class",
          "object",
          "interface",
          "return",
          "for",
          "while",
          "if",
          "else",
        ].map((k) => ({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
        }));
        return { suggestions: [...suggestions, ...keywords] };
      },
    });
  }, []);

  const previewPane = useMemo(
    () => (
      <div className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <span>Conceptos clave</span>
          <span className={styles.badgeOk}>Kotlin basics</span>
        </div>
        <div className={styles.previewBody}>
          <ul className={styles.tipList}>
            <li>
              <strong>Funciones:</strong> usa <code>fun</code> y tipos explícitos.
            </li>
            <li>
              <strong>Data classes:</strong> <code>data class User(val nombre: String)</code>.
            </li>
            <li>
              <strong>Null safety:</strong> <code>String?</code> y operador <code>?.</code>.
            </li>
            <li>
              <strong>When:</strong> expresiones exhaustivas para múltiples ramas.
            </li>
            <li>
              <strong>Colecciones:</strong> <code>listOf</code>, <code>map</code>, <code>filter</code>, <code>forEach</code>.
            </li>
          </ul>
          <div className={styles.outputBox}>
            <div className={styles.outputHeader}>Salida esperada (simulada)</div>
            <pre className={styles.outputLog}>
{`Hola Milita 🌸
Título: Mi primer video
Descripción: Aprendiendo Kotlin con Milita`}
            </pre>
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Kotlin Playground</p>
        <h1 className={styles.title}>Practica Kotlin con autocompletado y snippets</h1>
        <p className={styles.subtitle}>
          Escribe funciones, data classes y control de flujo. Usa Ctrl/Cmd + Space para ver sugerencias.
          Este playground es educativo (no ejecuta Kotlin real en el navegador).
        </p>
      </section>

      <section className={styles.workbench}>
        <div className={styles.editorCard}>
          <div className={styles.cardHeader}>
            <div className={styles.pill}>
              <span className={styles.dot} style={{ background: "#ff5f56" }} />
              <span className={styles.dot} style={{ background: "#ffbd2e" }} />
              <span className={styles.dot} style={{ background: "#27c93f" }} />
            </div>
            <div className={styles.cardTitle}>Main.kt</div>
            <div className={styles.cardHint}>Autocompletado + snippets</div>
          </div>
          <div className={styles.editorBody}>
            <MonacoEditor
              language="kotlin"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              height="620px"
              options={{
                fontSize: 15,
                fontLigatures: true,
                minimap: { enabled: false },
                automaticLayout: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                tabSize: 2,
                smoothScrolling: true,
              }}
              beforeMount={(monaco) => {
                monacoRef.current = monaco;
              }}
              onMount={(editor, monaco) => {
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
