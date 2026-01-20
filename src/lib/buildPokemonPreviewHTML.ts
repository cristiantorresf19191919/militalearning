/**
 * Builds an HTML document that runs compiled React + Axios code in an iframe.
 * Used by the Pokemon API block on /backend. Loads: React, ReactDOM, Axios.
 * PokeAPI is fetched from the iframe (CORS allowed by pokeapi.co).
 */

const baseStyles = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 20px;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
    color: #e5e7eb;
    min-height: 100vh;
  }
  .pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
    padding: 8px 0;
  }
  .pokemon-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 12px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pokemon-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.3);
    border-color: rgba(251, 191, 36, 0.4);
  }
  .pokemon-card img {
    width: 96px;
    height: 96px;
    object-fit: contain;
    display: block;
    margin: 0 auto 8px;
  }
  .pokemon-card span {
    display: block;
    font-weight: 600;
    text-transform: capitalize;
    font-size: 0.95rem;
    color: #f9fafb;
  }
  .pokemon-grid + p, .pokemon-loading, .pokemon-err {
    padding: 1rem;
    text-align: center;
    color: #94a3b8;
  }
  .pokemon-err { color: #f87171; }
`;

export function buildPokemonPreviewHTML(compiled: string): string {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <style>${baseStyles}</style>
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
        if (name === 'axios') return (window.axios && (window.axios.default || window.axios)) || window.axios;
        throw new Error('Module not found: ' + name);
      }
      try {
        if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
          throw new Error('React o ReactDOM no se cargaron. Comprueba tu conexión.');
        }
        if (typeof axios === 'undefined') {
          throw new Error('Axios no se cargó. Comprueba tu conexión.');
        }
        ${compiled}
        var ComponentToRender = (exports && exports.default) || (module.exports && module.exports.default);
        if (!ComponentToRender || typeof ComponentToRender !== 'function') {
          throw new Error('No se encontró export default (App). Revisa tu App.jsx.');
        }
        var root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(React.createElement(ComponentToRender));
      } catch (e) {
        var pre = document.createElement('pre');
        pre.style.cssText = 'color:#fca5a5;margin:1rem;padding:1rem;background:rgba(0,0,0,0.4);border-radius:12px;white-space:pre-wrap;font-size:13px;border:1px solid rgba(248,113,113,0.3);';
        pre.textContent = (e && e.message) || String(e);
        document.body.appendChild(pre);
      }
    </script>
  </body>
</html>`;
}
