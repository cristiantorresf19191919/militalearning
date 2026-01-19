/**
 * Builds an HTML document that runs compiled React (CommonJS) code in an iframe
 * with React/ReactDOM from UMD scripts. Used by /react-live and React lessons.
 */

/**
 * Tries to detect the main React component name from source.
 * Prefers export default so the preview renders the composed App.
 */
export function detectReactComponentName(code: string): string | null {
  // export default function App / export default App (prefer so App with <Child /> is used)
  const expDefFn = code.match(/\bexport\s+default\s+function\s+([A-Z][A-Za-z0-9]*)/);
  if (expDefFn) return expDefFn[1];
  const expDef = code.match(/\bexport\s+default\s+([A-Z][A-Za-z0-9]*)/);
  if (expDef) return expDef[1];
  // function App( or function Tigre(
  const fn = code.match(/\bfunction\s+([A-Z][A-Za-z0-9]*)\s*\(/);
  if (fn) return fn[1];
  // const App = ( or const Tigre = function
  const constFn = code.match(/\bconst\s+([A-Z][A-Za-z0-9]*)\s*=\s*(?:function|\([^)]*\)\s*=>)/);
  if (constFn) return constFn[1];
  return null;
}

export type BuildReactPreviewOptions = {
  /** Hint for the component to render (e.g. Tigre, Panda). Falls back to exports.default. */
  componentHint?: string | null;
  /** Extra CSS to inject in the preview (e.g. .card styles for /react-live demo). */
  stylesInline?: string;
};

const baseStyles = `
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
`;

export function buildReactPreviewHTML(
  compiled: string,
  opts: BuildReactPreviewOptions = {}
): string {
  const { componentHint = null, stylesInline = '' } = opts;
  const hint = componentHint || '';

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>${baseStyles}${stylesInline}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      var process = { env: { NODE_ENV: 'development' } };
      var exports = {};
      var module = { exports: exports };
      function require(name) {
        if (name === 'react') {
          var R = window.React;
          if (R && typeof R.default === 'undefined') R.default = R;
          return R;
        }
        if (name === 'react-dom') {
          var RD = window.ReactDOM;
          if (RD && typeof RD.default === 'undefined') RD.default = RD;
          return RD;
        }
        throw new Error('Module not found: ' + name);
      }
      try {
        if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
          throw new Error('React o ReactDOM no se cargaron. Comprueba tu conexión.');
        }
        ${compiled}
        var __hint = ${JSON.stringify(hint)};
        var ComponentToRender = (__hint && typeof window[__hint] !== 'undefined' ? window[__hint] : null)
          || (exports && exports.default)
          || (module.exports && module.exports.default);
        if (!ComponentToRender || typeof ComponentToRender !== 'function') {
          throw new Error('No se encontró un componente para renderizar. Define un componente (p. ej. ' + (__hint || 'App') + ') o usa export default.');
        }
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
