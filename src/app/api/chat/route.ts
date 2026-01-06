import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// System prompt para el asistente de aprendizaje de programación
const SYSTEM_PROMPT = `Eres un asistente de programación amigable y entusiasta 💻✨

Tu objetivo es ayudar a aprender programación de manera clara, divertida y práctica.

PRINCIPIOS FUNDAMENTALES:

- Explica conceptos de forma simple y con ejemplos prácticos
- Usa analogías cuando sea útil para entender mejor
- Celebra los logros y anima cuando hay dificultades
- Sé paciente y comprensivo
- Usa emojis con moderación para hacer la experiencia más amigable 😊🚀💡
- Adapta tu explicación al nivel del estudiante

ÁREAS DE CONOCIMIENTO:

1) FUNDAMENTOS DE PROGRAMACIÓN
- Variables, tipos de datos, operadores
- Estructuras de control (if/else, loops, switch)
- Funciones y métodos
- Arrays y objetos
- Scope y hoisting

2) JAVASCRIPT
- Sintaxis básica y moderna (ES6+)
- DOM manipulation
- Eventos
- Async/await y Promises
- Closures y callbacks
- Destructuring, spread operator, template literals

3) HTML Y CSS
- Estructura semántica
- Selectores CSS
- Flexbox y Grid
- Responsive design
- Animaciones y transiciones

4) REACT Y NEXT.JS
- Componentes y props
- Hooks (useState, useEffect, etc.)
- State management
- Routing
- Server-side rendering

5) CONCEPTOS AVANZADOS
- Arquitectura de aplicaciones
- Patrones de diseño
- Testing
- Performance optimization
- Git y control de versiones

ESTILO DE ENSEÑANZA:

- Responde en español de forma clara y directa
- Proporciona ejemplos de código cuando sea relevante
- Si el código tiene errores, explícalos de forma constructiva
- Sugiere ejercicios prácticos para reforzar el aprendizaje
- Relaciona conceptos nuevos con cosas que ya se conocen

CUANDO ALGUIEN PREGUNTA:

1. Si es una pregunta conceptual:
   - Explica el concepto de forma clara
   - Da un ejemplo simple
   - Si es relevante, muestra código

2. Si hay un error en el código:
   - Identifica el problema
   - Explica por qué ocurre
   - Muestra cómo solucionarlo
   - Sugiere buenas prácticas

3. Si piden ayuda con un proyecto:
   - Pregunta sobre el contexto
   - Sugiere un enfoque paso a paso
   - Ofrece código de ejemplo cuando sea útil
   - Explica las decisiones de diseño

4. Si están bloqueados:
   - Anima y tranquiliza
   - Divide el problema en partes más pequeñas
   - Sugiere recursos adicionales si es necesario
   - Celebra pequeños avances

TONO:

- Amigable y alentador
- Profesional pero accesible
- Entusiasta sobre el aprendizaje
- Paciente con principiantes
- Respetuoso y positivo

RECUERDA:

✅ Siempre prioriza la comprensión sobre memorización
✅ Usa ejemplos del mundo real cuando sea posible
✅ Fomenta la experimentación y el aprendizaje por prueba y error
✅ Celebra los logros, por pequeños que sean
✅ Si no estás seguro de algo, admítelo y sugiere buscar más información

Tu misión es hacer que aprender a programar sea una experiencia positiva, clara y motivadora. ¡Vamos a construir cosas increíbles juntos! 🚀`;

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
};

// Mark route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'El mensaje es requerido.' },
        { status: 400 },
      );
    }

    const apiKey = getApiKey();

    if (!apiKey) {
      console.error('Gemini API key not found');
      return NextResponse.json(
        { error: 'Servicio de IA no configurado' },
        { status: 500 },
      );
    }

    try {
      // Inicializar Gemini
      const genAI = new GoogleGenerativeAI(apiKey);

      // Construir el historial de conversación
      const chatHistory: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
      
      if (Array.isArray(history) && history.length > 0) {
        history.forEach((msg) => {
          if (msg.role === 'user') {
            chatHistory.push({
              role: 'user',
              parts: [{ text: msg.parts?.[0]?.text || msg.content || '' }],
            });
          } else if (msg.role === 'assistant') {
            chatHistory.push({
              role: 'model',
              parts: [{ text: msg.parts?.[0]?.text || msg.content || '' }],
            });
          }
        });
      }

      // Construir prompt completo con historial
      let fullPrompt = SYSTEM_PROMPT + '\n\n';
      
      if (chatHistory.length > 0) {
        fullPrompt += 'Historial de conversación:\n';
        chatHistory.forEach((msg) => {
          const role = msg.role === 'user' ? 'Usuario' : 'Asistente';
          const text = msg.parts?.[0]?.text || '';
          fullPrompt += `${role}: ${text}\n`;
        });
        fullPrompt += '\n';
      }

      fullPrompt += `Usuario: ${message.trim()}\n\nAsistente:`;

      // Modelos con fallback
      const modelsToTry = ['gemini-2.0-flash-exp', 'gemini-1.5-flash', 'gemini-1.5-pro'];

      let result;
      let aiResponse = '';

      for (const modelName of modelsToTry) {
        try {
          console.log(`Attempting to use model: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          
          result = await model.generateContent(fullPrompt);
          aiResponse = result.response.text();

          if (aiResponse) {
            console.log(`Successfully generated response using ${modelName}`);
            break;
          }
        } catch (modelError: unknown) {
          const modelErrorMessage =
            (modelError as { message?: string })?.message ??
            String(modelError);
          console.log(`Model ${modelName} failed:`, modelErrorMessage);
          if (modelName === modelsToTry[modelsToTry.length - 1]) {
            throw modelError;
          }
          continue;
        }
      }

      if (!aiResponse) {
        throw new Error('No se pudo generar una respuesta con ningún modelo disponible.');
      }

      return NextResponse.json({
        response: aiResponse,
        timestamp: new Date().toISOString(),
        messageId: Date.now().toString(),
      });
    } catch (geminiError: unknown) {
      console.error('Gemini API error:', geminiError);
      try {
        console.error('Error details:', JSON.stringify(geminiError, null, 2));
      } catch {
        // Ignore JSON stringify failures
      }

      const errorMessage =
        (geminiError as { message?: string })?.message ||
        String(geminiError) ||
        'Error desconocido';

      return NextResponse.json(
        {
          error: 'Error al procesar tu mensaje. Por favor, intenta de nuevo.',
          details: errorMessage,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error en /api/chat:', error);

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

