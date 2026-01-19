"use client";

import { useCallback } from 'react';
import * as Babel from '@babel/standalone';

type CodeRunnerResult = {
  logs: string[];
  alertCalled: boolean;
  error?: string;
};

export function useCodeRunner() {
  const runCode = useCallback((code: string): CodeRunnerResult => {
    const logs: string[] = [];
    let alertCalled = false;

    // Mock console.log
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(a => String(a)).join(' '));
      }
    };

    // Mock alert
    const mockAlert = (msg: string) => {
      alertCalled = true;
      logs.push(`🔔 ALERTA: "${msg}"`);
      // We also trigger the real alert for effect, but maybe delayed?
      // Legacy did setTimeout 10ms.
      setTimeout(() => window.alert(msg), 10);
    };

    try {
      // Lightweight shims so React/JSX snippets don't crash execution.
      const reactShim = `
        const React = {
          createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
          Fragment: 'fragment',
          Component: class {}
        };
        const Fragment = React.Fragment;
        const useState = (initial) => {
          let value = initial;
          const setValue = (next) => { value = typeof next === 'function' ? next(value) : next; };
          return [value, setValue];
        };
        const useEffect = () => {};
        const useRef = (val = null) => ({ current: val });
        const useMemo = (fn) => fn();
        const useCallback = (fn) => fn;
        const Suspense = ({ children }) => children;
        const createContext = (v) => ({ Provider: ({ children }) => children, Consumer: ({ children }) => children(v) });
        const useContext = (ctx) => ctx;
        const useReducer = (reducer, init) => [init, () => {}];
        const memo = (comp) => comp;
        const lazy = (loader) => loader();
        const forwardRef = (fn) => fn;
        const createPortal = (node) => node;
      `;

      // Strip TypeScript type annotations for execution
      let jsCode = code
        .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '')
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
        .replace(/enum\s+\w+\s*\{[\s\S]*?\}/g, '')
        .replace(/\s+as\s+\w+(?:\s*\|\s*\w+)*/g, '')
        .replace(/\):\s*(?:string|number|boolean|void|any|\w+\s*\|\s*\w+)\s*{/g, ') {')
        .replace(/(\([^)]*\))\s*=>/g, (match, params) => {
          if (!params || params === '()') return match;
          const paramList = params.slice(1, -1);
          if (!paramList.trim()) return match;
          const cleaned = paramList.split(',').map((p: string) => {
            const param = p.trim();
            return param.replace(/\?:\s*[^,]+/, '').replace(/:\s*[^,]+/, '').trim();
          }).join(', ');
          return `(${cleaned}) =>`;
        })
        .replace(/(\w+):\s*[^=,=>\n]+(?=\s*=>)/g, '$1')
        .replace(/function\s+\w+\s*(\([^)]*\))/g, (match, params) => {
          if (!params || params === '()') return match;
          const paramList = params.slice(1, -1);
          if (!paramList.trim()) return match;
          const cleaned = paramList.split(',').map((p: string) => {
            const param = p.trim();
            return param.replace(/\?:\s*[^,]+/, '').replace(/:\s*[^,]+/, '').trim();
          }).join(', ');
          return match.replace(params, `(${cleaned})`);
        })
        .replace(/(let|const|var)\s+(\w+):\s*[^=;,\n\[\]]+(?:\[\])?/g, '$1 $2')
        .replace(/(\w+):\s*\w+\[\]/g, '$1')
        .replace(/:\s*(?:string|number|boolean|void|any|\w+\s*\|\s*\w+)(?:\[\])?(?=\s*[=,;\)\]\n])/g, '');

      // Try to transpile JSX/TSX if present. Use modules: "commonjs" so
      // import/export are converted to require/exports (new Function runs as script, not module).
      try {
        jsCode = Babel.transform(jsCode, {
          presets: [
            ["env", { modules: "commonjs" }],
            ["react", { runtime: "classic" }],
            "typescript",
          ],
          sourceType: "module",
          filename: "user-code.tsx",
        }).code || jsCode;
      } catch (e) {
        // If Babel fails, keep the stripped JS.
      }

      // CommonJS + require shim so "import X from 'react'" becomes "require('react')" and works.
      const moduleShim = `
        var exports = {}; var module = { exports: exports };
        function require(name) {
          if (name === 'react') {
            var m = {
              createElement: React.createElement, Fragment: React.Fragment, Component: React.Component,
              useState, useEffect, useRef, useMemo, useCallback, createContext, useContext,
              useReducer, memo, lazy, forwardRef, createPortal, Suspense
            };
            m.default = m;
            return m;
          }
          if (name === 'react-dom') {
            var d = { createRoot: function(){ return { render: function(){} }; }, render: function(){} };
            d.default = d;
            return d;
          }
          throw new Error('Module not found: ' + name);
        }
      `;

      const wrappedCode = `${reactShim}\n${moduleShim}\n${jsCode}`;

      const func = new Function('console', 'alert', wrappedCode);
      func(mockConsole, mockAlert);
    } catch (e: any) {
      logs.push(`❌ Error: ${e.message}`);
      return { logs, alertCalled, error: e.message };
    }

    return { logs, alertCalled };
  }, []);

  return { runCode };
}
