"use client";

import { useCallback } from 'react';

type HTMLCSSRunnerResult = {
  renderedHTML: string;
  error?: string;
};

export function useHTMLCSSRunner() {
  const runHTMLCSS = useCallback((
    html: string, 
    css: string, 
    initialHTML?: string, 
    initialCSS?: string
  ): HTMLCSSRunnerResult => {
    try {
      // Combine initial and user code
      const finalHTML = html || initialHTML || '';
      const finalCSS = css || initialCSS || '';
      
      // Create a complete HTML document with embedded CSS
      const fullHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    ${finalCSS}
  </style>
</head>
<body>
  ${finalHTML}
</body>
</html>
      `.trim();
      
      return { renderedHTML: fullHTML };
    } catch (e: any) {
      return { 
        renderedHTML: '', 
        error: e.message 
      };
    }
  }, []);

  return { runHTMLCSS };
}

