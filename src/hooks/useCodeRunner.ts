"use client";

import { useState, useCallback } from 'react';

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
      // Strip TypeScript type annotations for execution
      // This is a simple approach - remove type annotations from function parameters and variables
      let jsCode = code
        // Remove interface/type/enum declarations first (they're compile-time only)
        .replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '')
        .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
        .replace(/enum\s+\w+\s*\{[\s\S]*?\}/g, '')
        // Remove type assertions: value as Type -> value
        .replace(/\s+as\s+\w+(?:\s*\|\s*\w+)*/g, '')
        // Remove return type annotations: function name(): Type -> function name()
        .replace(/\):\s*(?:string|number|boolean|void|any|\w+\s*\|\s*\w+)\s*{/g, ') {')
        // Remove type annotations from function parameters: (param: Type) -> (param)
        // Handle complex cases like (param: string | number) or (param?: string)
        .replace(/\(([^)]*)\)/g, (match, params) => {
          if (!params.trim()) return match;
          const cleaned = params.split(',').map((p: string) => {
            const param = p.trim();
            // Remove optional marker and type
            return param.replace(/\?:\s*[^,]+/, '').replace(/:\s*[^,]+/, '').trim();
          }).join(', ');
          return `(${cleaned})`;
        })
        // Remove type annotations from variable declarations: let x: Type -> let x
        .replace(/(let|const|var)\s+(\w+):\s*[^=;,\n\[\]]+(?:\[\])?/g, '$1 $2')
        // Remove array type annotations: string[] -> (keep the array syntax)
        .replace(/(\w+):\s*\w+\[\]/g, '$1')
        // Clean up any remaining type annotations
        .replace(/:\s*(?:string|number|boolean|void|any|\w+\s*\|\s*\w+)(?:\[\])?/g, '');
      
      // Create a function that takes console and alert as arguments
      // We treat the user code as the body of this function
      const func = new Function('console', 'alert', jsCode);
      func(mockConsole, mockAlert);
    } catch (e: any) {
      logs.push(`❌ Error: ${e.message}`);
      return { logs, alertCalled, error: e.message };
    }

    return { logs, alertCalled };
  }, []);

  return { runCode };
}
