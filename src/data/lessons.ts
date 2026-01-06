export type LessonType = 'javascript' | 'html' | 'css' | 'typescript' | 'react';
export type LessonColor = 'purple' | 'pink' | 'teal';
export type LessonSection = 'javascript' | 'html' | 'css' | 'typescript' | 'react';

export type Lesson = {
  id: number;
  title: string;
  icon: string;
  color: LessonColor;
  type: LessonType;
  section: LessonSection;
  description: string;
  instruction: string;
  initialCode: string;
  initialHTML?: string; // For CSS lessons, provide HTML structure
  initialCSS?: string; // For HTML lessons, provide CSS styling
  validationLogic: (code: string, logs: string[], renderedHTML?: string) => { success: boolean; message?: string };
};

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "Lección 1: Las Cajitas (Variables)",
    icon: "fa-box",
    color: "purple",
    type: "javascript",
    section: "javascript",
    description: "Imagina que tienes cajitas donde puedes guardar cosas. En programación, esas cajitas se llaman **Variables**. Podemos guardar números, textos (que llamamos 'strings') o incluso listas de cosas.",
    instruction: "Cambia el saludo original por uno que sea para ti, y cambia el número favorito. ¡Luego pulsa 'Ejecutar'!",
    initialCode: `let saludo = "¡Hola mundo soy Milita!";\nconsole.log(saludo);\n\nlet numeroFavorito = 8;\nconsole.log("Mi número favorito es: " + numeroFavorito);`,
    validationLogic: (code, logs) => {
      const isDefaultString = code.includes('"¡Hola mundo soy Milita!"');
      return {
        success: !isDefaultString,
        message: "¡Perfecto! Variable modificada."
      };
    }
  },
  {
    id: 2,
    title: "Lección 2: Mensajitos (Alertas)",
    icon: "fa-bell",
    color: "pink",
    type: "javascript",
    section: "javascript",
    description: "A veces queremos que la página nos hable directamente. Para eso usamos \`alert()\`. ¡Es como una ventanita sorpresa!",
    instruction: "Ejecuta el código para ver el mensajito sorpresa.",
    initialCode: `alert("¡Te quiero mucho!");\nconsole.log("Mensaje enviado con amor ❤️");`,
    validationLogic: (code, logs) => {
      const alertCalled = logs.some(l => l.includes("ALERTA:"));
      return {
        success: alertCalled,
        message: "🎉 ¡Alerta enviada! Siguiente reto..."
      };
    }
  },
  {
    id: 3,
    title: "Lección 3: Decisiones (If/Else)",
    icon: "fa-code-branch",
    color: "teal",
    type: "javascript",
    section: "javascript",
    description: "La vida está llena de decisiones. 'Si tengo hambre, como'. 'Si tengo sueño, duermo'. En código es igualito, usamos \`if\` (si pasa esto) y \`else\` (si no).",
    instruction: "Cambia la variable \`tengoHambre\` a \`true\` (verdadero) para que el Gorilín te de comida.",
    initialCode: `let tengoHambre = false;\n\nif (tengoHambre) {\n  console.log("🦍 Gorilín dice: ¡Toma tu hamburguesa! 🍔");\n} else {\n  console.log("🦍 Gorilín dice: Bueno, más comida para mí...");\n}`,
    validationLogic: (code, logs) => {
        const successMsg = "Gorilín dice: ¡Toma tu hamburguesa!";
        const hasSuccessLog = logs.some(l => l.includes(successMsg) || l.includes("hamburguesa"));
        return {
            success: hasSuccessLog,
            message: "🍔 ¡Provecho! Condicional superado."
        };
    }
  },
  {
      id: 4,
      title: "Lección 4: Repetir cosas (Bucles)",
      icon: "fa-sync-alt",
      color: "purple",
      type: "javascript",
      section: "javascript",
      description: "¿Te imaginas tener que escribir 'Te amo' 5 veces a mano? ¡Qué pereza! Mejor usamos un bucle \`for\` para que la compu lo haga por nosotros.",
      instruction: "Haz que el bucle se repita **5** veces en lugar de 3.",
      initialCode: `for (let abrazo = 1; abrazo <= 3; abrazo++) { \n  console.log("🤗 Abrazo número " + abrazo);\n}\nconsole.log(" ¡Ataque de cosquillas final! 👐");`,
      validationLogic: (code, logs) => {
          const hugCount = logs.filter(l => l.toLowerCase().includes("abrazo")).length;
          return {
              success: hugCount >= 5,
              message: "🤗🤗🤗 ¡Lluvia de abrazos! ¡Eres una pro!"
          };
      }
  },
  {
      id: 5,
      title: "Lección 5: Las Listas (Arrays)",
      icon: "fa-list-ul",
      color: "teal",
      type: "javascript",
      section: "javascript",
      description: "A veces queremos guardar muchas cosas juntas, como una lista de compras. ¡Para eso usamos los **Arrays**! Se escriben con corchetes \`[]\`.",
      instruction: "Agrega 'Helado' a la lista de compras del Gorilín. (Usa compras.push('Helado'))",
      initialCode: `let compras = ["Bananas", "Galletas", "Leche"];\nconsole.log("Lista actual: " + compras);\n\n// ¡Agrega tu código aquí abajo!\n// Tip: compras.push("Algo rico");\n\nconsole.log("¡Ahora sí! Lista completa: " + compras);`,
      validationLogic: (code, logs) => {
          const hasHelado = logs.some(l => l.includes("Helado"));
          return {
              success: hasHelado,
              message: "🍦 ¡Qué rico! Lista completada."
          };
      }
  },
  {
      id: 6,
      title: "Lección 6: Las Funciones Mágicas",
      icon: "fa-magic",
      color: "pink",
      type: "javascript",
      section: "javascript",
      description: "Una **función** es como una receta mágica. Le dices qué hacer una vez, y luego puedes usarla cuantas veces quieras. Se escribe con \`function nombre() { ... }\`",
      instruction: "Crea una función llamada \`darAbrazo\` que muestre un mensaje de abrazo. Luego llámala 2 veces.",
      initialCode: `// ¡Crea tu función aquí!\n// function darAbrazo() { ... }\n\n// Luego llama a la función:\n// darAbrazo();\n// darAbrazo();`,
      validationLogic: (code, logs) => {
          const hasFunction = code.includes("function darAbrazo") || code.includes("darAbrazo()");
          const callCount = (code.match(/darAbrazo\s*\(/g) || []).length;
          return {
              success: hasFunction && callCount >= 2,
              message: "✨ ¡Funciones mágicas aprendidas! ¡Eres una bruja del código!"
          };
      }
  },
  {
      id: 7,
      title: "Lección 7: Funciones con Superpoderes (Parámetros)",
      icon: "fa-star",
      color: "purple",
      type: "javascript",
      section: "javascript",
      description: "Las funciones pueden recibir **parámetros** - como ingredientes para tu receta mágica. Así la misma función puede hacer cosas diferentes cada vez.",
      instruction: "Completa la función \`cantarCancion\` para que reciba un nombre y cante una canción personalizada. Luego cántale a 'Milita'.",
      initialCode: `function cantarCancion(nombre) {\n  // Completa aquí para mostrar: "🎵 ¡Milita, eres la mejor! 🎵"\n  // Tip: usa console.log con el parámetro nombre\n}\n\n// Llama a la función con "Milita":\n// cantarCancion("Milita");`,
      validationLogic: (code, logs) => {
          const hasParameter = code.includes("cantarCancion(") && code.includes(")");
          const hasMilitaCall = code.includes('cantarCancion("Milita"') || code.includes("cantarCancion('Milita'");
          return {
              success: hasParameter && hasMilitaCall,
              message: "🎤 ¡Tu función canta hermoso! ¡Ya puedes crear funciones poderosas!"
          };
      }
  },
  {
      id: 8,
      title: "Lección 8: Objetos - Las Cajitas Especiales",
      icon: "fa-cube",
      color: "teal",
      type: "javascript",
      section: "javascript",
      description: "Un **objeto** es como una cajita con compartimentos. Cada compartimento tiene un nombre y puede guardar cosas diferentes. Se escriben con llaves \`{}\`.",
      instruction: "Crea un objeto llamado \`mascota\` con propiedades \`nombre\` y \`animal\`. Luego muestra: 'Mi mascota se llama [nombre] y es un/a [animal]'.",
      initialCode: `// Crea tu objeto aquí:\n// let mascota = { nombre: "...", animal: "..." };\n\n// Muestra el mensaje con console.log\n// console.log("Mi mascota se llama " + mascota.nombre + ...);`,
      validationLogic: (code, logs) => {
          const hasObject = code.includes("let mascota") || code.includes("const mascota");
          const hasProperties = code.includes("nombre:") && code.includes("animal:");
          const hasLog = logs.some(l => l.toLowerCase().includes("mascota") || l.toLowerCase().includes("llama"));
          return {
              success: hasObject && hasProperties && hasLog,
              message: "📦 ¡Objetos dominados! Ahora puedes guardar información organizada."
          };
      }
  },
  {
      id: 9,
      title: "Lección 9: Recorrer Listas con Estilo",
      icon: "fa-route",
      color: "pink",
      type: "javascript",
      section: "javascript",
      description: "Podemos usar \`forEach\` para recorrer cada elemento de una lista y hacer algo con cada uno. ¡Es como saludar a cada amigo en una fila!",
      instruction: "Usa \`forEach\` para mostrar cada nombre de la lista \`amigos\` con un mensaje de saludo.",
      initialCode: `let amigos = ["Luna", "Sol", "Estrella"];\n\n// Usa amigos.forEach para saludar a cada uno:\n// amigos.forEach(function(amigo) {\n//   console.log("¡Hola " + amigo + "!");\n// });`,
      validationLogic: (code, logs) => {
          const hasForEach = code.includes("forEach");
          const greetingsCount = logs.filter(l => l.toLowerCase().includes("hola")).length;
          return {
              success: hasForEach && greetingsCount >= 3,
              message: "👋 ¡Saludos completados! Ya sabes recorrer listas elegantemente."
          };
      }
  },
  {
      id: 10,
      title: "Lección 10: Transformar Listas (Map)",
      icon: "fa-exchange-alt",
      color: "purple",
      type: "javascript",
      section: "javascript",
      description: "\`map\` es súper poderoso: toma cada elemento de una lista, lo transforma, y crea una lista nueva. ¡Es como convertir todos los números en estrellas!",
      instruction: "Usa \`map\` para convertir cada número en la lista \`numeros\` multiplicándolo por 2, y muestra el resultado.",
      initialCode: `let numeros = [1, 2, 3, 4, 5];\n\n// Usa map para multiplicar cada número por 2:\n// let duplicados = numeros.map(function(num) {\n//   return num * 2;\n// });\n// console.log(duplicados);`,
      validationLogic: (code, logs) => {
          const hasMap = code.includes(".map(");
          const hasDuplicated = logs.some(l => l.includes("2,4,6,8,10") || l.includes("2, 4, 6, 8, 10"));
          return {
              success: hasMap && hasDuplicated,
              message: "🔄 ¡Transformación exitosa! Ya puedes cambiar listas como una pro."
          };
      }
  },
  {
      id: 11,
      title: "Lección 11: Encontrar Tesoros (Find)",
      icon: "fa-search",
      color: "teal",
      type: "javascript",
      section: "javascript",
      description: "Con \`find\` podemos buscar el primer elemento de una lista que cumpla una condición. ¡Es como buscar tu juguete favorito en una caja!",
      instruction: "Usa \`find\` para encontrar el primer número mayor que 5 en la lista \`numeros\`.",
      initialCode: `let numeros = [3, 7, 2, 9, 1, 6];\n\n// Encuentra el primer número mayor que 5:\n// let encontrado = numeros.find(function(num) {\n//   return num > 5;\n// });\n// console.log("Encontrado: " + encontrado);`,
      validationLogic: (code, logs) => {
          const hasFind = code.includes(".find(");
          const foundSeven = logs.some(l => l.includes("7") || l.includes("Encontrado: 7"));
          return {
              success: hasFind && foundSeven,
              message: "🔍 ¡Tesoro encontrado! Ya sabes buscar en listas."
          };
      }
  },
  {
      id: 12,
      title: "Lección 12: Filtrar Listas (Filter)",
      icon: "fa-filter",
      color: "pink",
      type: "javascript",
      section: "javascript",
      description: "\`filter\` crea una lista nueva solo con los elementos que cumplan una condición. ¡Es como separar las galletas de chocolate de las demás!",
      instruction: "Usa \`filter\` para crear una lista solo con los números pares (que se pueden dividir entre 2) de \`numeros\`.",
      initialCode: `let numeros = [1, 2, 3, 4, 5, 6, 7, 8];\n\n// Filtra solo los números pares:\n// let pares = numeros.filter(function(num) {\n//   return num % 2 === 0;\n// });\n// console.log("Números pares: " + pares);`,
      validationLogic: (code, logs) => {
          const hasFilter = code.includes(".filter(");
          const hasModulo = code.includes("% 2");
          const hasPares = logs.some(l => (l.includes("2,4,6,8") || l.includes("2, 4, 6, 8")) && l.toLowerCase().includes("par"));
          return {
              success: hasFilter && hasModulo && hasPares,
              message: "🎯 ¡Filtrado perfecto! Ya puedes extraer lo que necesitas de listas."
          };
      }
  },
  {
      id: 13,
      title: "Lección 13: Métodos de Strings (Textos)",
      icon: "fa-font",
      color: "purple",
      type: "javascript",
      section: "javascript",
      description: "Los textos (strings) tienen superpoderes. Puedes convertirlos a mayúsculas con \`toUpperCase()\`, a minúsculas con \`toLowerCase()\`, y más cosas chéveres.",
      instruction: "Convierte el texto \`\"Hola Mundo\"\` a mayúsculas y también obtén su longitud con \`.length\`.",
      initialCode: `let texto = "Hola Mundo";\n\n// Convierte a mayúsculas:\n// let mayusculas = texto.toUpperCase();\n// console.log(mayusculas);\n\n// Muestra la longitud:\n// console.log("Longitud: " + texto.length);`,
      validationLogic: (code, logs) => {
          const hasToUpperCase = code.includes("toUpperCase()");
          const hasLength = code.includes(".length");
          const hasMayusculas = logs.some(l => l.includes("HOLA MUNDO"));
          return {
              success: hasToUpperCase && hasLength && hasMayusculas,
              message: "📝 ¡Manipulación de textos dominada! Ya puedes jugar con palabras."
          };
      }
  },
  {
      id: 14,
      title: "Lección 14: Condiciones Múltiples (Else If)",
      icon: "fa-sitemap",
      color: "teal",
      type: "javascript",
      section: "javascript",
      description: "A veces hay más de dos opciones. Con \`else if\` puedes tener muchos caminos. ¡Es como un menú con muchas opciones!",
      instruction: "Completa el código para que muestre diferentes mensajes según la hora del día: mañana (0-12), tarde (12-18), o noche (18-24).",
      initialCode: `let hora = 15; // Cambia este número para probar\n\nif (hora < 12) {\n  console.log("☀️ ¡Buenos días!");\n} else if (hora < 18) {\n  // Completa aquí para mostrar "🌤️ ¡Buenas tardes!"\n} else {\n  // Completa aquí para mostrar "🌙 ¡Buenas noches!"\n}`,
      validationLogic: (code, logs) => {
          const hasElseIf = code.includes("else if");
          const hasTardes = code.includes("tardes") || code.includes("Buenas tardes");
          const hasNoches = code.includes("noches") || code.includes("Buenas noches");
          return {
              success: hasElseIf && hasTardes && hasNoches,
              message: "🌅 ¡Condiciones múltiples aprendidas! Tu código es cada vez más inteligente."
          };
      }
  },
  {
      id: 15,
      title: "Lección 15: Bucles While - Repetir hasta que...",
      icon: "fa-redo",
      color: "pink",
      type: "javascript",
      section: "javascript",
      description: "El bucle \`while\` repite algo mientras una condición sea verdadera. ¡Es como contar hasta que alguien te diga 'ya'!",
      instruction: "Usa un bucle \`while\` para contar desde 1 hasta 5 y mostrar cada número.",
      initialCode: `let contador = 1;\n\n// Completa el bucle while:\n// while (contador <= 5) {\n//   console.log("Número: " + contador);\n//   contador++;\n// }\n\nconsole.log("¡Listo!");`,
      validationLogic: (code, logs) => {
          const hasWhile = code.includes("while");
          const countNumbers = logs.filter(l => l.toLowerCase().includes("número") || l.toLowerCase().includes("numero")).length;
          return {
              success: hasWhile && countNumbers >= 5,
              message: "🔄 ¡Bucle while dominado! Ya puedes repetir cosas de forma inteligente."
          };
      }
  },
  // HTML Exercises (16-55)
  {
      id: 16,
      title: "HTML 1: Tu Primera Página",
      icon: "fa-file-code",
      color: "purple",
    type: "html",
    section: "html",
    description: "HTML es el esqueleto de las páginas web. Cada página comienza con etiquetas básicas como \`<h1>\` para títulos y \`<p>\` para párrafos.",
      instruction: "Crea un título \`<h1>\` que diga '¡Hola Milita!' y un párrafo \`<p>\` que diga 'Esta es mi primera página web'.",
      initialCode: `<!-- Escribe tu HTML aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasH1 = code.includes("<h1>") && code.includes("Milita");
          const hasP = code.includes("<p>");
          return {
              success: hasH1 && hasP,
              message: "🎉 ¡Tu primera página HTML está lista!"
          };
      }
  },
  {
      id: 17,
      title: "HTML 2: Encabezados",
      icon: "fa-heading",
      color: "teal",
    type: "html",
    section: "html",
    description: "Los encabezados van del \`<h1>\` (más grande) al \`<h6>\` (más pequeño). ¡Son como títulos de diferentes tamaños!",
      instruction: "Crea un \`<h1>\`, un \`<h2>\` y un \`<h3>\` con diferentes textos.",
      initialCode: `<!-- Crea tus encabezados aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasH1 = code.includes("<h1>");
          const hasH2 = code.includes("<h2>");
          const hasH3 = code.includes("<h3>");
          return {
              success: hasH1 && hasH2 && hasH3,
              message: "📝 ¡Encabezados creados! Ya sabes usar diferentes tamaños."
          };
      }
  },
  {
      id: 18,
      title: "HTML 3: Listas Ordenadas",
      icon: "fa-list-ol",
      color: "pink",
    type: "html",
    section: "html",
    description: "Las listas ordenadas \`<ol>\` muestran elementos numerados. ¡Perfectas para recetas o pasos!",
      instruction: "Crea una lista ordenada \`<ol>\` con al menos 3 elementos \`<li>\` de tu comida favorita.",
      initialCode: `<!-- Crea tu lista ordenada aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasOl = code.includes("<ol>");
          const liCount = (code.match(/<li>/g) || []).length;
          return {
              success: hasOl && liCount >= 3,
              message: "📋 ¡Lista ordenada creada! Ya puedes hacer listas numeradas."
          };
      }
  },
  {
      id: 19,
      title: "HTML 4: Listas No Ordenadas",
      icon: "fa-list-ul",
      color: "purple",
    type: "html",
    section: "html",
    description: "Las listas no ordenadas \`<ul>\` muestran viñetas. ¡Perfectas para listas de compras!",
      instruction: "Crea una lista no ordenada \`<ul>\` con al menos 3 elementos \`<li>\` de cosas que te gustan.",
      initialCode: `<!-- Crea tu lista no ordenada aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasUl = code.includes("<ul>");
          const liCount = (code.match(/<li>/g) || []).length;
          return {
              success: hasUl && liCount >= 3,
              message: "✅ ¡Lista con viñetas creada! Ya puedes hacer listas sin números."
          };
      }
  },
  {
      id: 20,
      title: "HTML 5: Enlaces",
      icon: "fa-link",
      color: "teal",
    type: "html",
    section: "html",
    description: "Los enlaces \`<a>\` te llevan a otras páginas. Usa el atributo \`href\` para decir a dónde ir.",
      instruction: "Crea un enlace \`<a href='https://www.google.com'>\` que diga 'Ir a Google'.",
      initialCode: `<!-- Crea tu enlace aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } a { color: blue; text-decoration: underline; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasA = code.includes("<a");
          const hasHref = code.includes("href=");
          return {
              success: hasA && hasHref,
              message: "🔗 ¡Enlace creado! Ya puedes conectar páginas."
          };
      }
  },
  {
      id: 21,
      title: "HTML 6: Imágenes",
      icon: "fa-image",
      color: "pink",
    type: "html",
    section: "html",
    description: "Las imágenes \`<img>\` muestran fotos. Usa \`src\` para la ruta y \`alt\` para describir la imagen.",
      instruction: "Crea una imagen \`<img src='https://via.placeholder.com/200' alt='Imagen de ejemplo'>\`.",
      initialCode: `<!-- Crea tu imagen aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasImg = code.includes("<img");
          const hasSrc = code.includes("src=");
          return {
              success: hasImg && hasSrc,
              message: "🖼️ ¡Imagen agregada! Ya puedes mostrar fotos."
          };
      }
  },
  {
      id: 22,
      title: "HTML 7: Texto en Negrita",
      icon: "fa-bold",
      color: "purple",
    type: "html",
    section: "html",
    description: "Usa \`<strong>\` o \`<b>\` para hacer texto en negrita. ¡Perfecto para resaltar cosas importantes!",
      instruction: "Crea un párrafo con texto normal y una palabra en negrita usando \`<strong>\`.",
      initialCode: `<!-- Crea tu párrafo con texto en negrita aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasStrong = code.includes("<strong>") || code.includes("<b>");
          return {
              success: hasStrong,
              message: "💪 ¡Texto en negrita creado! Ya puedes resaltar palabras."
          };
      }
  },
  {
      id: 23,
      title: "HTML 8: Texto en Cursiva",
      icon: "fa-italic",
      color: "teal",
    type: "html",
    section: "html",
    description: "Usa \`<em>\` o \`<i>\` para hacer texto en cursiva. ¡Perfecto para énfasis!",
      instruction: "Crea un párrafo con una palabra en cursiva usando \`<em>\`.",
      initialCode: `<!-- Crea tu párrafo con texto en cursiva aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasEm = code.includes("<em>") || code.includes("<i>");
          return {
              success: hasEm,
              message: "✨ ¡Texto en cursiva creado! Ya puedes dar énfasis."
          };
      }
  },
  {
      id: 24,
      title: "HTML 9: División (div)",
      icon: "fa-square",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<div>\` es como una caja invisible que agrupa elementos. ¡Muy útil para organizar!",
      instruction: "Crea un \`<div>\` con un título y un párrafo dentro.",
      initialCode: `<!-- Crea tu div aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } div { border: 2px solid #ccc; padding: 15px; margin: 10px 0; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasDiv = code.includes("<div>");
          return {
              success: hasDiv,
              message: "📦 ¡Div creado! Ya puedes agrupar elementos."
          };
      }
  },
  {
      id: 25,
      title: "HTML 10: Span",
      icon: "fa-code",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<span>\` es como un div pero para texto. ¡Perfecto para cambiar el color de una palabra!",
      instruction: "Crea un párrafo y usa \`<span>\` para cambiar el color de una palabra.",
      initialCode: `<!-- Crea tu párrafo con span aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } .rojo { color: red; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasSpan = code.includes("<span");
          return {
              success: hasSpan,
              message: "🎨 ¡Span creado! Ya puedes estilizar partes de texto."
          };
      }
  },
  {
      id: 26,
      title: "HTML 11: Botones",
      icon: "fa-hand-pointer",
      color: "teal",
    type: "html",
    section: "html",
    description: "Los botones \`<button>\` son clickeables. ¡Perfectos para acciones!",
      instruction: "Crea un botón \`<button>\` que diga 'Haz clic aquí'.",
      initialCode: `<!-- Crea tu botón aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } button { padding: 10px 20px; background: blue; color: white; border: none; cursor: pointer; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasButton = code.includes("<button>");
          return {
              success: hasButton,
              message: "🔘 ¡Botón creado! Ya puedes hacer elementos clickeables."
          };
      }
  },
  {
      id: 27,
      title: "HTML 12: Input de Texto",
      icon: "fa-keyboard",
      color: "pink",
    type: "html",
    section: "html",
    description: "Los inputs \`<input>\` permiten que los usuarios escriban. Usa \`type='text'\` para texto.",
      instruction: "Crea un \`<input type='text' placeholder='Escribe tu nombre'>\`.",
      initialCode: `<!-- Crea tu input aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } input { padding: 8px; border: 1px solid #ccc; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasInput = code.includes("<input");
          const hasType = code.includes("type=");
          return {
              success: hasInput && hasType,
              message: "⌨️ ¡Input creado! Ya puedes recibir texto de usuarios."
          };
      }
  },
  {
      id: 28,
      title: "HTML 13: Formularios",
      icon: "fa-wpforms",
      color: "purple",
    type: "html",
    section: "html",
    description: "Los formularios \`<form>\` agrupan inputs. ¡Perfectos para recopilar información!",
      instruction: "Crea un \`<form>\` con un input de texto y un botón de envío.",
      initialCode: `<!-- Crea tu formulario aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } form { display: flex; flex-direction: column; gap: 10px; } input, button { padding: 8px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasForm = code.includes("<form");
          const hasInput = code.includes("<input");
          const hasButton = code.includes("<button");
          return {
              success: hasForm && hasInput && hasButton,
              message: "📝 ¡Formulario creado! Ya puedes recopilar información."
          };
      }
  },
  {
      id: 29,
      title: "HTML 14: Tablas Básicas",
      icon: "fa-table",
      color: "teal",
    type: "html",
    section: "html",
    description: "Las tablas \`<table>\` organizan datos en filas \`<tr>\` y celdas \`<td>\`.",
      instruction: "Crea una tabla con 2 filas y 2 columnas.",
      initialCode: `<!-- Crea tu tabla aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid #ddd; padding: 8px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasTable = code.includes("<table");
          const hasTr = code.includes("<tr>");
          const hasTd = code.includes("<td>");
          return {
              success: hasTable && hasTr && hasTd,
              message: "📊 ¡Tabla creada! Ya puedes organizar datos."
          };
      }
  },
  {
      id: 30,
      title: "HTML 15: Saltos de Línea",
      icon: "fa-arrow-down",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<br>\` crea un salto de línea. ¡Útil para separar texto!",
      instruction: "Crea un párrafo con dos líneas usando \`<br>\`.",
      initialCode: `<!-- Crea tu párrafo con salto de línea aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasBr = code.includes("<br") || code.includes("<br/>");
          return {
              success: hasBr,
              message: "↩️ ¡Salto de línea creado! Ya puedes controlar el texto."
          };
      }
  },
  {
      id: 31,
      title: "HTML 16: Línea Horizontal",
      icon: "fa-minus",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<hr>\` crea una línea horizontal. ¡Perfecto para separar secciones!",
      instruction: "Crea dos párrafos separados por un \`<hr>\`.",
      initialCode: `<!-- Crea tus párrafos con línea horizontal aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasHr = code.includes("<hr") || code.includes("<hr/>");
          return {
              success: hasHr,
              message: "➖ ¡Línea horizontal creada! Ya puedes separar contenido."
          };
      }
  },
  {
      id: 32,
      title: "HTML 17: Comentarios",
      icon: "fa-comment",
      color: "teal",
    type: "html",
    section: "html",
    description: "Los comentarios \`<!-- -->\` son notas que no se ven en la página. ¡Útiles para recordar cosas!",
      instruction: "Crea un párrafo y agrega un comentario HTML explicando qué hace.",
      initialCode: `<!-- Crea tu párrafo con comentario aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasComment = code.includes("<!--") && code.includes("-->");
          return {
              success: hasComment,
              message: "💬 ¡Comentario agregado! Ya puedes documentar tu código."
          };
      }
  },
  {
      id: 33,
      title: "HTML 18: Atributos",
      icon: "fa-tag",
      color: "pink",
    type: "html",
    section: "html",
    description: "Los atributos dan información extra a las etiquetas. Como \`id\`, \`class\`, o \`style\`.",
      instruction: "Crea un párrafo con un atributo \`id='mi-parrafo'\`.",
      initialCode: `<!-- Crea tu párrafo con id aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasId = code.includes("id=");
          return {
              success: hasId,
              message: "🏷️ ¡Atributo agregado! Ya puedes identificar elementos."
          };
      }
  },
  {
      id: 34,
      title: "HTML 19: Clases",
      icon: "fa-tags",
      color: "purple",
    type: "html",
    section: "html",
    description: "Las clases \`class\` agrupan elementos para darles el mismo estilo. ¡Muy útiles con CSS!",
      instruction: "Crea dos párrafos con la misma clase \`class='destacado'\`.",
      initialCode: `<!-- Crea tus párrafos con clase aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } .destacado { background: yellow; padding: 10px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasClass = code.includes("class=");
          const classCount = (code.match(/class=/g) || []).length;
          return {
              success: hasClass && classCount >= 2,
              message: "🎯 ¡Clases agregadas! Ya puedes agrupar elementos."
          };
      }
  },
  {
      id: 35,
      title: "HTML 20: Estilos Inline",
      icon: "fa-paint-brush",
      color: "teal",
    type: "html",
    section: "html",
    description: "El atributo \`style\` permite agregar CSS directamente. ¡Útil para estilos rápidos!",
      instruction: "Crea un párrafo con \`style='color: red; font-size: 20px;'\`.",
      initialCode: `<!-- Crea tu párrafo con estilo inline aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasStyle = code.includes("style=");
          return {
              success: hasStyle,
              message: "🎨 ¡Estilo inline agregado! Ya puedes estilizar directamente."
          };
      }
  },
  {
      id: 36,
      title: "HTML 21: Secciones",
      icon: "fa-folder",
      color: "pink",
    type: "html",
    section: "html",
    description: "La etiqueta \`<section>\` agrupa contenido relacionado. ¡Perfecta para organizar!",
      instruction: "Crea una \`<section>\` con un título y un párrafo.",
      initialCode: `<!-- Crea tu sección aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } section { border: 1px solid #ccc; padding: 15px; margin: 10px 0; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasSection = code.includes("<section");
          return {
              success: hasSection,
              message: "📁 ¡Sección creada! Ya puedes organizar contenido."
          };
      }
  },
  {
      id: 37,
      title: "HTML 22: Artículos",
      icon: "fa-newspaper",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<article>\` es para contenido independiente, como un post de blog.",
      instruction: "Crea un \`<article>\` con un título y contenido.",
      initialCode: `<!-- Crea tu artículo aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } article { background: #f9f9f9; padding: 15px; margin: 10px 0; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasArticle = code.includes("<article");
          return {
              success: hasArticle,
              message: "📰 ¡Artículo creado! Ya puedes estructurar contenido."
          };
      }
  },
  {
      id: 38,
      title: "HTML 23: Encabezado y Pie",
      icon: "fa-header",
      color: "teal",
    type: "html",
    section: "html",
    description: "\`<header>\` y \`<footer>\` son para el encabezado y pie de página. ¡Estructura semántica!",
      instruction: "Crea un \`<header>\` con un título y un \`<footer>\` con texto.",
      initialCode: `<!-- Crea tu header y footer aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } header, footer { background: #333; color: white; padding: 15px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasHeader = code.includes("<header");
          const hasFooter = code.includes("<footer");
          return {
              success: hasHeader && hasFooter,
              message: "🏗️ ¡Header y footer creados! Ya puedes estructurar páginas."
          };
      }
  },
  {
      id: 39,
      title: "HTML 24: Navegación",
      icon: "fa-bars",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<nav>\` es para menús de navegación. ¡Perfecto para enlaces importantes!",
      instruction: "Crea un \`<nav>\` con al menos 2 enlaces.",
      initialCode: `<!-- Crea tu navegación aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } nav { background: #f0f0f0; padding: 10px; } nav a { margin: 0 10px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasNav = code.includes("<nav");
          const linkCount = (code.match(/<a/g) || []).length;
          return {
              success: hasNav && linkCount >= 2,
              message: "🧭 ¡Navegación creada! Ya puedes hacer menús."
          };
      }
  },
  {
      id: 40,
      title: "HTML 25: Aside",
      icon: "fa-columns",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<aside>\` es para contenido secundario, como barras laterales.",
      instruction: "Crea un \`<aside>\` con información adicional.",
      initialCode: `<!-- Crea tu aside aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } aside { background: #e8e8e8; padding: 15px; border-left: 4px solid blue; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAside = code.includes("<aside");
          return {
              success: hasAside,
              message: "📌 ¡Aside creado! Ya puedes hacer barras laterales."
          };
      }
  },
  {
      id: 41,
      title: "HTML 26: Main",
      icon: "fa-home",
      color: "teal",
    type: "html",
    section: "html",
    description: "El \`<main>\` contiene el contenido principal de la página. ¡Solo uno por página!",
      instruction: "Crea un \`<main>\` con contenido principal.",
      initialCode: `<!-- Crea tu main aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } main { padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasMain = code.includes("<main");
          return {
              success: hasMain,
              message: "🏠 ¡Main creado! Ya puedes marcar contenido principal."
          };
      }
  },
  {
      id: 42,
      title: "HTML 27: Citas",
      icon: "fa-quote-left",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<blockquote>\` es para citas largas. ¡Perfecto para frases importantes!",
      instruction: "Crea un \`<blockquote>\` con una cita.",
      initialCode: `<!-- Crea tu blockquote aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } blockquote { border-left: 4px solid #ccc; padding-left: 20px; font-style: italic; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasBlockquote = code.includes("<blockquote");
          return {
              success: hasBlockquote,
              message: "💬 ¡Cita creada! Ya puedes destacar frases importantes."
          };
      }
  },
  {
      id: 43,
      title: "HTML 28: Código",
      icon: "fa-code",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<code>\` muestra código. ¡Perfecto para tutoriales!",
      instruction: "Crea un párrafo que explique qué es HTML y usa \`<code>\` para mostrar 'HTML'.",
      initialCode: `<!-- Crea tu párrafo con código aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasCode = code.includes("<code");
          return {
              success: hasCode,
              message: "💻 ¡Código mostrado! Ya puedes formatear código."
          };
      }
  },
  {
      id: 44,
      title: "HTML 29: Preformateado",
      icon: "fa-align-left",
      color: "teal",
    type: "html",
    section: "html",
    description: "El \`<pre>\` mantiene el formato del texto, incluyendo espacios. ¡Perfecto para código!",
      instruction: "Crea un \`<pre>\` con texto que tenga múltiples espacios.",
      initialCode: `<!-- Crea tu pre aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasPre = code.includes("<pre");
          return {
              success: hasPre,
              message: "📄 ¡Texto preformateado creado! Ya puedes mantener formato."
          };
      }
  },
  {
      id: 45,
      title: "HTML 30: Abreviaciones",
      icon: "fa-info-circle",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<abbr>\` muestra abreviaciones con un tooltip. Usa \`title\` para la explicación.",
      instruction: "Crea un texto con \`<abbr title='HyperText Markup Language'>HTML</abbr>\`.",
      initialCode: `<!-- Crea tu abreviatura aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } abbr { text-decoration: underline dotted; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAbbr = code.includes("<abbr");
          const hasTitle = code.includes("title=");
          return {
              success: hasAbbr && hasTitle,
              message: "ℹ️ ¡Abreviatura creada! Ya puedes explicar términos."
          };
      }
  },
  {
      id: 46,
      title: "HTML 31: Marcado",
      icon: "fa-highlighter",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<mark>\` resalta texto como con un marcador. ¡Perfecto para destacar!",
      instruction: "Crea un párrafo y usa \`<mark>\` para resaltar una palabra importante.",
      initialCode: `<!-- Crea tu párrafo con mark aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } mark { background: yellow; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasMark = code.includes("<mark");
          return {
              success: hasMark,
              message: "🖍️ ¡Texto resaltado! Ya puedes destacar información."
          };
      }
  },
  {
      id: 47,
      title: "HTML 32: Tachado",
      icon: "fa-strikethrough",
      color: "teal",
    type: "html",
    section: "html",
    description: "El \`<del>\` muestra texto tachado. ¡Útil para mostrar cambios!",
      instruction: "Crea un párrafo con texto normal y una palabra tachada usando \`<del>\`.",
      initialCode: `<!-- Crea tu párrafo con texto tachado aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasDel = code.includes("<del");
          return {
              success: hasDel,
              message: "❌ ¡Texto tachado creado! Ya puedes mostrar eliminaciones."
          };
      }
  },
  {
      id: 48,
      title: "HTML 33: Subíndice y Superíndice",
      icon: "fa-superscript",
      color: "pink",
    type: "html",
    section: "html",
    description: "\`<sub>\` hace subíndices y \`<sup>\` hace superíndices. ¡Perfecto para fórmulas!",
      instruction: "Crea texto con H\`<sub>2</sub>\`O (agua) y E=mc\`<sup>2</sup>\`.",
      initialCode: `<!-- Crea tu texto con sub y sup aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasSub = code.includes("<sub");
          const hasSup = code.includes("<sup");
          return {
              success: hasSub && hasSup,
              message: "🔢 ¡Subíndices y superíndices creados! Ya puedes hacer fórmulas."
          };
      }
  },
  {
      id: 49,
      title: "HTML 34: Detalles",
      icon: "fa-chevron-down",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<details>\` crea contenido que se puede expandir/colapsar. ¡Interactivo!",
      instruction: "Crea un \`<details>\` con \`<summary>\` y contenido dentro.",
      initialCode: `<!-- Crea tu details aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } details { border: 1px solid #ccc; padding: 10px; } summary { cursor: pointer; font-weight: bold; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasDetails = code.includes("<details");
          const hasSummary = code.includes("<summary");
          return {
              success: hasDetails && hasSummary,
              message: "📂 ¡Detalles creados! Ya puedes hacer contenido colapsable."
          };
      }
  },
  {
      id: 50,
      title: "HTML 35: Progress",
      icon: "fa-tasks",
      color: "teal",
    type: "html",
    section: "html",
    description: "El \`<progress>\` muestra una barra de progreso. ¡Perfecto para mostrar avance!",
      instruction: "Crea un \`<progress value='50' max='100'>\` para mostrar 50%.",
      initialCode: `<!-- Crea tu barra de progreso aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasProgress = code.includes("<progress");
          const hasValue = code.includes("value=");
          return {
              success: hasProgress && hasValue,
              message: "📊 ¡Barra de progreso creada! Ya puedes mostrar avance."
          };
      }
  },
  {
      id: 51,
      title: "HTML 36: Meter",
      icon: "fa-tachometer-alt",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<meter>\` muestra un valor dentro de un rango. ¡Como un medidor!",
      instruction: "Crea un \`<meter value='0.7' min='0' max='1'>\` para mostrar 70%.",
      initialCode: `<!-- Crea tu meter aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasMeter = code.includes("<meter");
          const hasValue = code.includes("value=");
          return {
              success: hasMeter && hasValue,
              message: "📈 ¡Medidor creado! Ya puedes mostrar valores."
          };
      }
  },
  {
      id: 52,
      title: "HTML 37: Time",
      icon: "fa-clock",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<time>\` marca fechas y horas de forma semántica. Usa \`datetime\` para el formato estándar.",
      instruction: "Crea un \`<time datetime='2024-01-01'>1 de enero de 2024</time>\`.",
      initialCode: `<!-- Crea tu time aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasTime = code.includes("<time");
          const hasDatetime = code.includes("datetime=");
          return {
              success: hasTime && hasDatetime,
              message: "🕐 ¡Tiempo marcado! Ya puedes estructurar fechas."
          };
      }
  },
  {
      id: 53,
      title: "HTML 38: Address",
      icon: "fa-map-marker-alt",
      color: "teal",
    type: "html",
    section: "html",
    description: "El \`<address>\` es para información de contacto. ¡Semánticamente correcto!",
      instruction: "Crea un \`<address>\` con una dirección de correo.",
      initialCode: `<!-- Crea tu address aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } address { font-style: italic; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAddress = code.includes("<address");
          return {
              success: hasAddress,
              message: "📍 ¡Dirección creada! Ya puedes mostrar contacto."
          };
      }
  },
  {
      id: 54,
      title: "HTML 39: Figure",
      icon: "fa-image",
      color: "pink",
    type: "html",
    section: "html",
    description: "El \`<figure>\` agrupa imágenes con \`<figcaption>\` para descripciones. ¡Semántico!",
      instruction: "Crea un \`<figure>\` con una imagen y un \`<figcaption>\`.",
      initialCode: `<!-- Crea tu figure aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } figure { border: 1px solid #ccc; padding: 10px; } figcaption { font-style: italic; text-align: center; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFigure = code.includes("<figure");
          const hasFigcaption = code.includes("<figcaption");
          return {
              success: hasFigure && hasFigcaption,
              message: "🖼️ ¡Figure creado! Ya puedes agrupar imágenes con descripciones."
          };
      }
  },
  {
      id: 55,
      title: "HTML 40: Video",
      icon: "fa-video",
      color: "purple",
    type: "html",
    section: "html",
    description: "El \`<video>\` muestra videos. Usa \`src\` para la ruta y \`controls\` para controles.",
      instruction: "Crea un \`<video src='https://www.w3schools.com/html/mov_bbb.mp4' controls>\`.",
      initialCode: `<!-- Crea tu video aquí -->`,
      initialCSS: `body { font-family: Arial, sans-serif; padding: 20px; } video { width: 100%; max-width: 500px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasVideo = code.includes("<video");
          return {
              success: hasVideo,
              message: "🎥 ¡Video agregado! Ya puedes mostrar videos."
          };
      }
  },
  // CSS Flexbox Exercises (56-95)
  {
      id: 56,
      title: "CSS Flexbox 1: Introducción",
      icon: "fa-th",
      color: "teal",
    type: "css",
    section: "css",
    description: "Flexbox es una forma poderosa de organizar elementos. Usa \`display: flex;\` en el contenedor para activarlo.",
      instruction: "Agrega \`display: flex;\` al contenedor para activar flexbox.",
      initialCode: `.container {\n  /* Agrega display: flex aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasDisplayFlex = code.includes("display: flex") || code.includes("display:flex");
          return {
              success: hasDisplayFlex,
              message: "🎯 ¡Flexbox activado! Los elementos ahora están en fila."
          };
      }
  },
  {
      id: 57,
      title: "CSS Flexbox 2: Flex Direction Row",
      icon: "fa-arrows-alt-h",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`flex-direction: row;\` (por defecto) coloca elementos en fila horizontal. ¡De izquierda a derecha!",
      instruction: "Agrega \`flex-direction: row;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-direction: row aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexDirection = code.includes("flex-direction: row") || code.includes("flex-direction:row");
          return {
              success: hasFlexDirection,
              message: "➡️ ¡Fila horizontal creada! Los elementos están uno al lado del otro."
          };
      }
  },
  {
      id: 58,
      title: "CSS Flexbox 3: Flex Direction Column",
      icon: "fa-arrows-alt-v",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`flex-direction: column;\` coloca elementos en columna vertical. ¡De arriba hacia abajo!",
      instruction: "Agrega \`flex-direction: column;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-direction: column aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexDirection = code.includes("flex-direction: column") || code.includes("flex-direction:column");
          return {
              success: hasFlexDirection,
              message: "⬇️ ¡Columna vertical creada! Los elementos están uno debajo del otro."
          };
      }
  },
  {
      id: 59,
      title: "CSS Flexbox 4: Justify Content Start",
      icon: "fa-align-left",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`justify-content: flex-start;\` alinea elementos al inicio (izquierda en fila, arriba en columna).",
      instruction: "Agrega \`justify-content: flex-start;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: flex-start aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">Inicio</div>\n  <div class="item">Medio</div>\n  <div class="item">Fin</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: flex-start") || code.includes("justify-content:flex-start");
          return {
              success: hasJustifyContent,
              message: "⬅️ ¡Alineación al inicio! Los elementos están al principio."
          };
      }
  },
  {
      id: 60,
      title: "CSS Flexbox 5: Justify Content Center",
      icon: "fa-align-center",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`justify-content: center;\` centra los elementos. ¡Perfecto para centrar contenido!",
      instruction: "Agrega \`justify-content: center;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: center") || code.includes("justify-content:center");
          return {
              success: hasJustifyContent,
              message: "🎯 ¡Centrado! Los elementos están en el medio."
          };
      }
  },
  {
      id: 61,
      title: "CSS Flexbox 6: Justify Content End",
      icon: "fa-align-right",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`justify-content: flex-end;\` alinea elementos al final (derecha en fila, abajo en columna).",
      instruction: "Agrega \`justify-content: flex-end;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: flex-end aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: flex-end") || code.includes("justify-content:flex-end");
          return {
              success: hasJustifyContent,
              message: "➡️ ¡Alineación al final! Los elementos están al final."
          };
      }
  },
  {
      id: 62,
      title: "CSS Flexbox 7: Justify Content Space Between",
      icon: "fa-arrows-alt",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`justify-content: space-between;\` distribuye espacio entre elementos. ¡Espaciado uniforme!",
      instruction: "Agrega \`justify-content: space-between;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: space-between aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: space-between") || code.includes("justify-content:space-between");
          return {
              success: hasJustifyContent,
              message: "↔️ ¡Espaciado uniforme! Los elementos tienen espacio entre ellos."
          };
      }
  },
  {
      id: 63,
      title: "CSS Flexbox 8: Justify Content Space Around",
      icon: "fa-expand-arrows-alt",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`justify-content: space-around;\` distribuye espacio alrededor de cada elemento.",
      instruction: "Agrega \`justify-content: space-around;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: space-around aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: space-around") || code.includes("justify-content:space-around");
          return {
              success: hasJustifyContent,
              message: "🌐 ¡Espacio alrededor! Cada elemento tiene espacio a su alrededor."
          };
      }
  },
  {
      id: 64,
      title: "CSS Flexbox 9: Justify Content Space Evenly",
      icon: "fa-equals",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`justify-content: space-evenly;\` distribuye espacio de forma completamente uniforme.",
      instruction: "Agrega \`justify-content: space-evenly;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega justify-content: space-evenly aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustifyContent = code.includes("justify-content: space-evenly") || code.includes("justify-content:space-evenly");
          return {
              success: hasJustifyContent,
              message: "⚖️ ¡Espaciado perfecto! El espacio es completamente uniforme."
          };
      }
  },
  {
      id: 65,
      title: "CSS Flexbox 10: Align Items Start",
      icon: "fa-arrow-up",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`align-items: flex-start;\` alinea elementos al inicio del eje cruzado (arriba en fila, izquierda en columna).",
      instruction: "Agrega \`align-items: flex-start;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  height: 200px;\n  /* Agrega align-items: flex-start aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">Alto</div>\n  <div class="item">Medio</div>\n  <div class="item">Bajo</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignItems = code.includes("align-items: flex-start") || code.includes("align-items:flex-start");
          return {
              success: hasAlignItems,
              message: "⬆️ ¡Alineación al inicio! Los elementos están arriba."
          };
      }
  },
  {
      id: 66,
      title: "CSS Flexbox 11: Align Items Center",
      icon: "fa-arrows-alt-v",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`align-items: center;\` centra elementos en el eje cruzado. ¡Perfecto para centrar verticalmente!",
      instruction: "Agrega \`align-items: center;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  height: 200px;\n  /* Agrega align-items: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignItems = code.includes("align-items: center") || code.includes("align-items:center");
          return {
              success: hasAlignItems,
              message: "↕️ ¡Centrado vertical! Los elementos están en el medio verticalmente."
          };
      }
  },
  {
      id: 67,
      title: "CSS Flexbox 12: Align Items End",
      icon: "fa-arrow-down",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`align-items: flex-end;\` alinea elementos al final del eje cruzado (abajo en fila, derecha en columna).",
      instruction: "Agrega \`align-items: flex-end;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  height: 200px;\n  /* Agrega align-items: flex-end aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">A</div>\n  <div class="item">B</div>\n  <div class="item">C</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignItems = code.includes("align-items: flex-end") || code.includes("align-items:flex-end");
          return {
              success: hasAlignItems,
              message: "⬇️ ¡Alineación al final! Los elementos están abajo."
          };
      }
  },
  {
      id: 68,
      title: "CSS Flexbox 13: Align Items Stretch",
      icon: "fa-expand",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`align-items: stretch;\` (por defecto) estira elementos para llenar el contenedor.",
      instruction: "Agrega \`align-items: stretch;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  height: 200px;\n  /* Agrega align-items: stretch aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignItems = code.includes("align-items: stretch") || code.includes("align-items:stretch");
          return {
              success: hasAlignItems,
              message: "📏 ¡Estirado! Los elementos llenan toda la altura."
          };
      }
  },
  {
      id: 69,
      title: "CSS Flexbox 14: Flex Wrap",
      icon: "fa-redo",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`flex-wrap: wrap;\` permite que los elementos se envuelvan a la siguiente línea si no caben.",
      instruction: "Agrega \`flex-wrap: wrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-wrap: wrap aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; min-width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexWrap = code.includes("flex-wrap: wrap") || code.includes("flex-wrap:wrap");
          return {
              success: hasFlexWrap,
              message: "🔄 ¡Envoltorio activado! Los elementos pueden pasar a la siguiente línea."
          };
      }
  },
  {
      id: 70,
      title: "CSS Flexbox 15: Flex Grow",
      icon: "fa-expand-arrows-alt",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`flex-grow: 1;\` permite que un elemento crezca para llenar espacio disponible.",
      instruction: "Agrega \`flex-grow: 1;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega flex-grow: 1 aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2 (crece)</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexGrow = code.includes("flex-grow: 1") || code.includes("flex-grow:1");
          return {
              success: hasFlexGrow,
              message: "📈 ¡Crecimiento activado! El elemento crece para llenar espacio."
          };
      }
  },
  {
      id: 71,
      title: "CSS Flexbox 16: Flex Shrink",
      icon: "fa-compress",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`flex-shrink: 0;\` previene que un elemento se encoja cuando no hay espacio.",
      instruction: "Agrega \`flex-shrink: 0;\` al primer elemento.",
      initialCode: `.item-1 {\n  /* Agrega flex-shrink: 0 aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">No se encoge</div>\n  <div class="item item-2">2</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexShrink = code.includes("flex-shrink: 0") || code.includes("flex-shrink:0");
          return {
              success: hasFlexShrink,
              message: "🔒 ¡Sin encogimiento! El elemento mantiene su tamaño."
          };
      }
  },
  {
      id: 72,
      title: "CSS Flexbox 17: Flex Basis",
      icon: "fa-ruler",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`flex-basis: 200px;\` establece el tamaño inicial de un elemento antes de crecer o encogerse.",
      instruction: "Agrega \`flex-basis: 200px;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega flex-basis: 200px aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">200px base</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexBasis = code.includes("flex-basis: 200px") || code.includes("flex-basis:200px");
          return {
              success: hasFlexBasis,
              message: "📐 ¡Tamaño base establecido! El elemento tiene un tamaño inicial."
          };
      }
  },
  {
      id: 73,
      title: "CSS Flexbox 18: Flex (Shorthand)",
      icon: "fa-compress-arrows-alt",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`flex: 1;\` es una forma corta de escribir \`flex-grow: 1; flex-shrink: 1; flex-basis: 0;\`.",
      instruction: "Agrega \`flex: 1;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega flex: 1 aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">Flex 1</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlex = code.includes("flex: 1") || code.includes("flex:1");
          return {
              success: hasFlex,
              message: "⚡ ¡Flex shorthand! Forma rápida de hacer elementos flexibles."
          };
      }
  },
  {
      id: 74,
      title: "CSS Flexbox 19: Align Self",
      icon: "fa-user",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`align-self: center;\` permite alinear un elemento individual diferente al resto.",
      instruction: "Agrega \`align-self: center;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega align-self: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">Centrado</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; align-items: flex-start; height: 200px; } .item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignSelf = code.includes("align-self: center") || code.includes("align-self:center");
          return {
              success: hasAlignSelf,
              message: "🎯 ¡Alineación individual! Este elemento está centrado diferente."
          };
      }
  },
  {
      id: 75,
      title: "CSS Flexbox 20: Gap",
      icon: "fa-arrows-alt",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`gap: 20px;\` agrega espacio uniforme entre elementos flex. ¡Más fácil que margin!",
      instruction: "Agrega \`gap: 20px;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega gap: 20px aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasGap = code.includes("gap: 20px") || code.includes("gap:20px");
          return {
              success: hasGap,
              message: "↔️ ¡Espaciado con gap! Espacio uniforme entre elementos."
          };
      }
  },
  {
      id: 76,
      title: "CSS Flexbox 21: Row Gap",
      icon: "fa-arrows-alt-v",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`row-gap: 15px;\` controla el espacio entre filas cuando hay wrap.",
      instruction: "Agrega \`row-gap: 15px;\` y \`flex-wrap: wrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  flex-wrap: wrap;\n  /* Agrega row-gap: 15px aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasRowGap = code.includes("row-gap: 15px") || code.includes("row-gap:15px");
          return {
              success: hasRowGap,
              message: "⬆️⬇️ ¡Espacio entre filas! Control del espacio vertical."
          };
      }
  },
  {
      id: 77,
      title: "CSS Flexbox 22: Column Gap",
      icon: "fa-arrows-alt-h",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`column-gap: 10px;\` controla el espacio entre columnas.",
      instruction: "Agrega \`column-gap: 10px;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega column-gap: 10px aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasColumnGap = code.includes("column-gap: 10px") || code.includes("column-gap:10px");
          return {
              success: hasColumnGap,
              message: "⬅️➡️ ¡Espacio entre columnas! Control del espacio horizontal."
          };
      }
  },
  {
      id: 78,
      title: "CSS Flexbox 23: Order",
      icon: "fa-sort",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`order: -1;\` cambia el orden visual de elementos sin cambiar el HTML.",
      instruction: "Agrega \`order: -1;\` al tercer elemento para que aparezca primero.",
      initialCode: `.item-3 {\n  /* Agrega order: -1 aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2</div>\n  <div class="item item-3">3 (primero)</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasOrder = code.includes("order: -1") || code.includes("order:-1");
          return {
              success: hasOrder,
              message: "🔄 ¡Orden cambiado! El elemento aparece en diferente posición."
          };
      }
  },
  {
      id: 79,
      title: "CSS Flexbox 24: Flex Direction Row Reverse",
      icon: "fa-exchange-alt",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`flex-direction: row-reverse;\` invierte el orden de los elementos en fila.",
      instruction: "Agrega \`flex-direction: row-reverse;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-direction: row-reverse aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexDirection = code.includes("flex-direction: row-reverse") || code.includes("flex-direction:row-reverse");
          return {
              success: hasFlexDirection,
              message: "🔄 ¡Fila invertida! Los elementos están en orden inverso."
          };
      }
  },
  {
      id: 80,
      title: "CSS Flexbox 25: Flex Direction Column Reverse",
      icon: "fa-sort-amount-down",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`flex-direction: column-reverse;\` invierte el orden de los elementos en columna.",
      instruction: "Agrega \`flex-direction: column-reverse;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-direction: column-reverse aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexDirection = code.includes("flex-direction: column-reverse") || code.includes("flex-direction:column-reverse");
          return {
              success: hasFlexDirection,
              message: "🔄 ¡Columna invertida! Los elementos están en orden inverso vertical."
          };
      }
  },
  {
      id: 81,
      title: "CSS Flexbox 26: Align Content Start",
      icon: "fa-align-left",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`align-content: flex-start;\` alinea líneas múltiples al inicio cuando hay wrap.",
      instruction: "Agrega \`align-content: flex-start;\` y \`flex-wrap: wrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 300px;\n  /* Agrega align-content: flex-start aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignContent = code.includes("align-content: flex-start") || code.includes("align-content:flex-start");
          return {
              success: hasAlignContent,
              message: "⬆️ ¡Líneas al inicio! Las filas múltiples están arriba."
          };
      }
  },
  {
      id: 82,
      title: "CSS Flexbox 27: Align Content Center",
      icon: "fa-align-center",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`align-content: center;\` centra las líneas múltiples cuando hay wrap.",
      instruction: "Agrega \`align-content: center;\` y \`flex-wrap: wrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 300px;\n  /* Agrega align-content: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignContent = code.includes("align-content: center") || code.includes("align-content:center");
          return {
              success: hasAlignContent,
              message: "🎯 ¡Líneas centradas! Las filas múltiples están en el medio."
          };
      }
  },
  {
      id: 83,
      title: "CSS Flexbox 28: Align Content Space Between",
      icon: "fa-arrows-alt",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`align-content: space-between;\` distribuye espacio entre líneas múltiples.",
      instruction: "Agrega \`align-content: space-between;\` y \`flex-wrap: wrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  flex-wrap: wrap;\n  height: 300px;\n  /* Agrega align-content: space-between aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n  <div class="item">6</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasAlignContent = code.includes("align-content: space-between") || code.includes("align-content:space-between");
          return {
              success: hasAlignContent,
              message: "↔️ ¡Espacio entre líneas! Las filas tienen espacio uniforme."
          };
      }
  },
  {
      id: 84,
      title: "CSS Flexbox 29: Flex Wrap Nowrap",
      icon: "fa-lock",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`flex-wrap: nowrap;\` (por defecto) previene que los elementos se envuelvan.",
      instruction: "Agrega \`flex-wrap: nowrap;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-wrap: nowrap aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n</div>`,
      initialCSS: `.item { background: #F8549B; color: white; padding: 20px; margin: 5px; min-width: 200px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexWrap = code.includes("flex-wrap: nowrap") || code.includes("flex-wrap:nowrap");
          return {
              success: hasFlexWrap,
              message: "🔒 ¡Sin envoltorio! Los elementos se mantienen en una línea."
          };
      }
  },
  {
      id: 85,
      title: "CSS Flexbox 30: Flex Wrap Wrap Reverse",
      icon: "fa-redo-alt",
      color: "purple",
    type: "css",
    section: "css",
    description: "\`flex-wrap: wrap-reverse;\` envuelve elementos pero en orden inverso.",
      instruction: "Agrega \`flex-wrap: wrap-reverse;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-wrap: wrap-reverse aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n  <div class="item">5</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 20px; margin: 5px; min-width: 150px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlexWrap = code.includes("flex-wrap: wrap-reverse") || code.includes("flex-wrap:wrap-reverse");
          return {
              success: hasFlexWrap,
              message: "🔄 ¡Envoltorio inverso! Los elementos se envuelven en orden inverso."
          };
      }
  },
  {
      id: 86,
      title: "CSS Flexbox 31: Flex Shorthand 2",
      icon: "fa-compress",
      color: "teal",
    type: "css",
    section: "css",
    description: "\`flex: 0 1 auto;\` es el valor por defecto (no crece, puede encogerse, tamaño automático).",
      instruction: "Agrega \`flex: 0 1 auto;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega flex: 0 1 auto aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">0 1 auto</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #2EDC9B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlex = code.includes("flex: 0 1 auto") || code.includes("flex:0 1 auto");
          return {
              success: hasFlex,
              message: "⚙️ ¡Flex por defecto! Comportamiento estándar de flex."
          };
      }
  },
  {
      id: 87,
      title: "CSS Flexbox 32: Flex Shorthand 3",
      icon: "fa-expand",
      color: "pink",
    type: "css",
    section: "css",
    description: "\`flex: 2 1 0;\` significa crecer 2x, puede encogerse, tamaño base 0.",
      instruction: "Agrega \`flex: 2 1 0;\` al segundo elemento.",
      initialCode: `.item-2 {\n  /* Agrega flex: 2 1 0 aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item item-1">1</div>\n  <div class="item item-2">2x más grande</div>\n  <div class="item item-3">3</div>\n</div>`,
      initialCSS: `.container { display: flex; } .item { background: #F8549B; color: white; padding: 20px; margin: 5px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlex = code.includes("flex: 2 1 0") || code.includes("flex:2 1 0");
          return {
              success: hasFlex,
              message: "📈 ¡Crecimiento doble! Este elemento crece el doble."
          };
      }
  },
  {
      id: 88,
      title: "CSS Flexbox 33: Centrado Perfecto",
      icon: "fa-crosshairs",
      color: "purple",
    type: "css",
    section: "css",
    description: "Combina \`justify-content: center;\` y \`align-items: center;\` para centrar perfectamente.",
      instruction: "Agrega ambas propiedades al contenedor para centrar el elemento.",
      initialCode: `.container {\n  display: flex;\n  height: 300px;\n  /* Agrega justify-content: center y align-items: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">Centrado</div>\n</div>`,
      initialCSS: `.item { background: #8A54F8; color: white; padding: 30px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustify = code.includes("justify-content: center") || code.includes("justify-content:center");
          const hasAlign = code.includes("align-items: center") || code.includes("align-items:center");
          return {
              success: hasJustify && hasAlign,
              message: "🎯 ¡Centrado perfecto! El elemento está en el centro exacto."
          };
      }
  },
  {
      id: 89,
      title: "CSS Flexbox 34: Espaciado Uniforme",
      icon: "fa-equals",
      color: "teal",
    type: "css",
    section: "css",
    description: "Combina \`justify-content: space-evenly;\` y \`align-items: center;\` para espaciado perfecto.",
      instruction: "Agrega ambas propiedades al contenedor.",
      initialCode: `.container {\n  display: flex;\n  height: 200px;\n  /* Agrega justify-content: space-evenly y align-items: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n</div>`,
      initialCSS: `.item { background: #2EDC9B; color: white; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustify = code.includes("justify-content: space-evenly") || code.includes("justify-content:space-evenly");
          const hasAlign = code.includes("align-items: center") || code.includes("align-items:center");
          return {
              success: hasJustify && hasAlign,
              message: "⚖️ ¡Espaciado perfecto! Elementos espaciados uniformemente y centrados."
          };
      }
  },
  {
      id: 90,
      title: "CSS Flexbox 35: Layout de Tarjetas",
      icon: "fa-id-card",
      color: "pink",
    type: "css",
    section: "css",
    description: "Crea un layout de tarjetas usando flexbox con wrap y gap.",
      instruction: "Agrega \`flex-wrap: wrap;\` y \`gap: 20px;\` al contenedor.",
      initialCode: `.container {\n  display: flex;\n  /* Agrega flex-wrap: wrap y gap: 20px aquí */\n}`,
      initialHTML: `<div class="container">\n  <div class="card">Tarjeta 1</div>\n  <div class="card">Tarjeta 2</div>\n  <div class="card">Tarjeta 3</div>\n  <div class="card">Tarjeta 4</div>\n</div>`,
      initialCSS: `.card { background: #F8549B; color: white; padding: 30px; width: 200px; border-radius: 10px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasWrap = code.includes("flex-wrap: wrap") || code.includes("flex-wrap:wrap");
          const hasGap = code.includes("gap: 20px") || code.includes("gap:20px");
          return {
              success: hasWrap && hasGap,
              message: "🃏 ¡Layout de tarjetas! Perfecto para galerías y grids."
          };
      }
  },
  {
      id: 91,
      title: "CSS Flexbox 36: Barra de Navegación",
      icon: "fa-bars",
      color: "purple",
    type: "css",
    section: "css",
    description: "Crea una barra de navegación horizontal con flexbox.",
      instruction: "Agrega \`justify-content: space-between;\` y \`align-items: center;\` al contenedor.",
      initialCode: `.navbar {\n  display: flex;\n  /* Agrega justify-content: space-between y align-items: center aquí */\n}`,
      initialHTML: `<div class="navbar">\n  <div class="logo">Logo</div>\n  <nav class="nav-links">\n    <a href="#">Inicio</a>\n    <a href="#">Acerca</a>\n    <a href="#">Contacto</a>\n  </nav>\n</div>`,
      initialCSS: `.navbar { background: #8A54F8; color: white; padding: 15px; } .logo { font-weight: bold; } .nav-links { display: flex; gap: 20px; } .nav-links a { color: white; text-decoration: none; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustify = code.includes("justify-content: space-between") || code.includes("justify-content:space-between");
          const hasAlign = code.includes("align-items: center") || code.includes("align-items:center");
          return {
              success: hasJustify && hasAlign,
              message: "🧭 ¡Barra de navegación! Layout profesional creado."
          };
      }
  },
  {
      id: 92,
      title: "CSS Flexbox 37: Footer",
      icon: "fa-window-minimize",
      color: "teal",
    type: "css",
    section: "css",
    description: "Crea un footer con elementos distribuidos uniformemente.",
      instruction: "Agrega \`justify-content: space-around;\` al contenedor.",
      initialCode: `.footer {\n  display: flex;\n  /* Agrega justify-content: space-around aquí */\n}`,
      initialHTML: `<div class="footer">\n  <div>© 2024</div>\n  <div>Privacidad</div>\n  <div>Términos</div>\n  <div>Contacto</div>\n</div>`,
      initialCSS: `.footer { background: #2EDC9B; color: white; padding: 20px; } .footer > div { padding: 10px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasJustify = code.includes("justify-content: space-around") || code.includes("justify-content:space-around");
          return {
              success: hasJustify,
              message: "📄 ¡Footer creado! Elementos distribuidos uniformemente."
          };
      }
  },
  {
      id: 93,
      title: "CSS Flexbox 38: Sidebar Layout",
      icon: "fa-columns",
      color: "pink",
    type: "css",
    section: "css",
    description: "Crea un layout con sidebar usando flexbox.",
      instruction: "Agrega \`flex: 1;\` al contenido principal para que ocupe el espacio restante.",
      initialCode: `.main-content {\n  /* Agrega flex: 1 aquí */\n}`,
      initialHTML: `<div class="container">\n  <aside class="sidebar">Sidebar</aside>\n  <main class="main-content">Contenido Principal</main>\n</div>`,
      initialCSS: `.container { display: flex; height: 300px; } .sidebar { background: #F8549B; color: white; padding: 20px; width: 200px; } .main-content { background: #8A54F8; color: white; padding: 20px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasFlex = code.includes("flex: 1") || code.includes("flex:1");
          return {
              success: hasFlex,
              message: "📐 ¡Layout con sidebar! El contenido principal ocupa el espacio restante."
          };
      }
  },
  {
      id: 94,
      title: "CSS Flexbox 39: Centrado Vertical",
      icon: "fa-arrows-alt-v",
      color: "purple",
    type: "css",
    section: "css",
    description: "Centra contenido verticalmente usando flexbox en una columna.",
      instruction: "Agrega \`flex-direction: column;\`, \`justify-content: center;\` y \`align-items: center;\`.",
      initialCode: `.container {\n  display: flex;\n  height: 400px;\n  /* Agrega flex-direction: column, justify-content: center y align-items: center aquí */\n}`,
      initialHTML: `<div class="container">\n  <h1>Título</h1>\n  <p>Contenido centrado</p>\n</div>`,
      initialCSS: `.container { background: #8A54F8; color: white; } h1, p { margin: 10px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasDirection = code.includes("flex-direction: column") || code.includes("flex-direction:column");
          const hasJustify = code.includes("justify-content: center") || code.includes("justify-content:center");
          const hasAlign = code.includes("align-items: center") || code.includes("align-items:center");
          return {
              success: hasDirection && hasJustify && hasAlign,
              message: "⬆️⬇️ ¡Centrado vertical perfecto! Contenido centrado en columna."
          };
      }
  },
  {
      id: 95,
      title: "CSS Flexbox 40: Proyecto Final",
      icon: "fa-trophy",
      color: "teal",
    type: "css",
    section: "css",
    description: "¡Proyecto final! Crea un layout completo usando todas las técnicas de flexbox aprendidas.",
      instruction: "Crea un header con \`justify-content: space-between;\`, un main con \`flex: 1;\`, y un footer con \`justify-content: center;\`.",
      initialCode: `.header {\n  display: flex;\n  /* Agrega justify-content: space-between aquí */\n}\n\n.main {\n  display: flex;\n  /* Agrega flex: 1 aquí */\n}\n\n.footer {\n  display: flex;\n  /* Agrega justify-content: center aquí */\n}`,
      initialHTML: `<div class="page">\n  <header class="header">\n    <div class="logo">Logo</div>\n    <nav>Navegación</nav>\n  </header>\n  <main class="main">Contenido Principal</main>\n  <footer class="footer">© 2024</footer>\n</div>`,
      initialCSS: `.page { display: flex; flex-direction: column; height: 500px; } .header, .footer { background: #2EDC9B; color: white; padding: 15px; } .main { background: #F8549B; color: white; padding: 30px; }`,
      validationLogic: (code, logs, renderedHTML) => {
          const hasHeaderJustify = code.includes("justify-content: space-between") || code.includes("justify-content:space-between");
          const hasMainFlex = code.includes("flex: 1") || code.includes("flex:1");
          const hasFooterJustify = code.includes("justify-content: center") || code.includes("justify-content:center");
          return {
              success: hasHeaderJustify && hasMainFlex && hasFooterJustify,
              message: "🏆 ¡Proyecto completado! ¡Eres una experta en Flexbox!"
          };
      }
  },
  // TypeScript Exercises (96-120)
  {
      id: 96,
      title: "TypeScript 1: Tipos Básicos",
      icon: "fa-tag",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "¡Bienvenido a TypeScript! 🎉 TypeScript es como JavaScript pero con **tipos**. Los tipos le dicen a la computadora qué tipo de dato guardamos: \`string\` (texto), \`number\` (número), o \`boolean\` (verdadero/falso).",
      instruction: "Declara una variable \`nombre\` de tipo \`string\` con tu nombre, y una variable \`edad\` de tipo \`number\` con tu edad. Muestra ambas.",
      initialCode: `// Declara variables con tipos:\n// let nombre: string = "Tu nombre";\n// let edad: number = 10;\n\n// console.log("Me llamo " + nombre + " y tengo " + edad + " años");`,
      validationLogic: (code, logs) => {
          const hasStringType = code.includes(": string");
          const hasNumberType = code.includes(": number");
          const hasLog = logs.some(l => l.toLowerCase().includes("llamo") || l.toLowerCase().includes("años"));
          return {
              success: hasStringType && hasNumberType && hasLog,
              message: "🎯 ¡Tipos básicos aprendidos! TypeScript te ayuda a evitar errores."
          };
      }
  },
  {
      id: 97,
      title: "TypeScript 2: Arrays con Tipos",
      icon: "fa-list-ol",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "En TypeScript, también podemos decirle qué tipo de cosas guarda un array. \`string[]\` significa 'un array de textos', y \`number[]\` significa 'un array de números'.",
      instruction: "Crea un array de tipo \`string[]\` llamado \`frutas\` con al menos 3 frutas. Luego muestra la primera fruta.",
      initialCode: `// Crea un array tipado:\n// let frutas: string[] = ["Manzana", "Banana", "Naranja"];\n\n// Muestra la primera fruta:\n// console.log("Mi fruta favorita es: " + frutas[0]);`,
      validationLogic: (code, logs) => {
          const hasArrayType = code.includes("string[]");
          const hasFrutas = code.includes("frutas");
          const hasLog = logs.some(l => l.toLowerCase().includes("fruta"));
          return {
              success: hasArrayType && hasFrutas && hasLog,
              message: "🍎 ¡Arrays tipados dominados! Ahora TypeScript sabe qué guardas en tus listas."
          };
      }
  },
  {
      id: 98,
      title: "TypeScript 3: Funciones con Tipos",
      icon: "fa-function",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Las funciones en TypeScript pueden tener tipos en sus parámetros y en lo que devuelven. \`function nombre(param: tipo): tipoRetorno { ... }\`",
      instruction: "Crea una función \`saludar\` que reciba un \`nombre: string\` y devuelva un \`string\`. La función debe devolver '¡Hola [nombre]!'.",
      initialCode: `// Crea una función tipada:\n// function saludar(nombre: string): string {\n//   return "¡Hola " + nombre + "!";\n// }\n\n// Llama a la función:\n// console.log(saludar("Milita"));`,
      validationLogic: (code, logs) => {
          const hasFunctionType = code.includes("saludar(nombre: string): string");
          const hasReturn = code.includes("return");
          const hasCall = logs.some(l => l.toLowerCase().includes("hola"));
          return {
              success: hasFunctionType && hasReturn && hasCall,
              message: "✨ ¡Funciones tipadas aprendidas! TypeScript verifica que uses las funciones correctamente."
          };
      }
  },
  {
      id: 99,
      title: "TypeScript 4: El Tipo Boolean",
      icon: "fa-check-square",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "El tipo \`boolean\` solo puede ser \`true\` (verdadero) o \`false\` (falso). ¡Es perfecto para decisiones!",
      instruction: "Crea una variable \`esEstudiante\` de tipo \`boolean\` con valor \`true\`. Luego usa un \`if\` para mostrar un mensaje si es estudiante.",
      initialCode: `// Declara un boolean:\n// let esEstudiante: boolean = true;\n\n// if (esEstudiante) {\n//   console.log("🎓 ¡Eres estudiante!");\n// }`,
      validationLogic: (code, logs) => {
          const hasBooleanType = code.includes(": boolean");
          const hasTrue = code.includes("= true");
          const hasLog = logs.some(l => l.toLowerCase().includes("estudiante"));
          return {
              success: hasBooleanType && hasTrue && hasLog,
              message: "✅ ¡Boolean dominado! Ahora puedes hacer decisiones con tipos."
          };
      }
  },
  {
      id: 100,
      title: "TypeScript 5: Interfaces",
      icon: "fa-file-contract",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "Las **interfaces** son como plantillas que definen cómo debe verse un objeto. ¡Es como un molde para galletas! Una vez definida, puedes usarla para crear objetos.",
      instruction: "Crea una interfaz \`Persona\` con \`nombre: string\` y \`edad: number\`. Luego crea un objeto que use esa interfaz.",
      initialCode: `// Define la interfaz:\n// interface Persona {\n//   nombre: string;\n//   edad: number;\n// }\n\n// Crea un objeto usando la interfaz:\n// let yo: Persona = {\n//   nombre: "Milita",\n//   edad: 8\n// };\n\n// console.log(yo.nombre + " tiene " + yo.edad + " años");`,
      validationLogic: (code, logs) => {
          const hasInterface = code.includes("interface Persona");
          const hasPersonaType = code.includes(": Persona");
          const hasLog = logs.some(l => l.toLowerCase().includes("años") || l.toLowerCase().includes("tiene"));
          return {
              success: hasInterface && hasPersonaType && hasLog,
              message: "📋 ¡Interfaces aprendidas! Ahora puedes crear plantillas reutilizables."
          };
      }
  },
  {
      id: 101,
      title: "TypeScript 6: Parámetros Opcionales",
      icon: "fa-question-circle",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "A veces queremos que un parámetro sea opcional (que puedas pasarlo o no). En TypeScript usamos \`?\` después del nombre: \`param?: tipo\`",
      instruction: "Crea una función \`saludar\` que reciba \`nombre: string\` y \`apellido?: string\` (opcional). Si hay apellido, muestra nombre y apellido, si no, solo nombre.",
      initialCode: `// Función con parámetro opcional:\n// function saludar(nombre: string, apellido?: string): string {\n//   if (apellido) {\n//     return "¡Hola " + nombre + " " + apellido + "!";\n//   }\n//   return "¡Hola " + nombre + "!";\n// }\n\n// console.log(saludar("Milita"));\n// console.log(saludar("Milita", "La Vaca"));`,
      validationLogic: (code, logs) => {
          const hasOptional = code.includes("apellido?: string");
          const hasConditional = code.includes("if (apellido)");
          const hasTwoCalls = (code.match(/saludar\(/g) || []).length >= 2;
          return {
              success: hasOptional && hasConditional && hasTwoCalls,
              message: "❓ ¡Parámetros opcionales dominados! Tus funciones son más flexibles ahora."
          };
      }
  },
  {
      id: 102,
      title: "TypeScript 7: Tipos de Unión",
      icon: "fa-code-branch",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "Un **tipo de unión** permite que una variable sea de varios tipos. Se escribe con \`|\`: \`string | number\` significa 'puede ser texto O número'.",
      instruction: "Crea una variable \`id\` de tipo \`string | number\`. Asigna primero un número, luego un texto, y muestra ambos.",
      initialCode: `// Tipo de unión:\n// let id: string | number = 123;\n// console.log("ID numérico: " + id);\n\n// id = "ABC-123";\n// console.log("ID texto: " + id);`,
      validationLogic: (code, logs) => {
          const hasUnion = code.includes("string | number");
          const hasNumberAssign = code.includes("= 123") || !!code.match(/=\s*\d+/);
          const hasStringAssign = code.includes('= "') || code.includes("= '");
          return {
              success: hasUnion && hasNumberAssign && hasStringAssign,
              message: "🔀 ¡Tipos de unión aprendidos! Ahora puedes tener variables más flexibles."
          };
      }
  },
  {
      id: 103,
      title: "TypeScript 8: Arrays de Objetos Tipados",
      icon: "fa-layer-group",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "Podemos crear arrays de objetos usando interfaces. \`Persona[]\` significa 'un array de objetos Persona'.",
      instruction: "Crea una interfaz \`Animal\` con \`nombre: string\` y \`tipo: string\`. Luego crea un array \`animales: Animal[]\` con al menos 2 animales.",
      initialCode: `// Define la interfaz:\n// interface Animal {\n//   nombre: string;\n//   tipo: string;\n// }\n\n// Crea un array tipado:\n// let animales: Animal[] = [\n//   { nombre: "Firulais", tipo: "Perro" },\n//   { nombre: "Michi", tipo: "Gato" }\n// ];\n\n// animales.forEach(function(animal) {\n//   console.log(animal.nombre + " es un " + animal.tipo);\n// });`,
      validationLogic: (code, logs) => {
          const hasInterface = code.includes("interface Animal");
          const hasArrayType = code.includes("Animal[]");
          const hasForEach = code.includes("forEach");
          return {
              success: hasInterface && hasArrayType && hasForEach,
              message: "🐾 ¡Arrays de objetos tipados dominados! Estructuras de datos complejas aprendidas."
          };
      }
  },
  {
      id: 104,
      title: "TypeScript 9: Funciones Void",
      icon: "fa-ban",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Algunas funciones no devuelven nada, solo hacen algo (como mostrar un mensaje). Para eso usamos \`: void\` en lugar de un tipo de retorno.",
      instruction: "Crea una función \`mostrarMensaje\` que reciba un \`texto: string\` y no devuelva nada (\`: void\`). La función debe mostrar el texto en consola.",
      initialCode: `// Función void:\n// function mostrarMensaje(texto: string): void {\n//   console.log(texto);\n// }\n\n// mostrarMensaje("¡Hola desde TypeScript!");`,
      validationLogic: (code, logs) => {
          const hasVoid = code.includes(": void");
          const hasFunction = code.includes("function mostrarMensaje");
          const hasCall = logs.length > 0;
          return {
              success: hasVoid && hasFunction && hasCall,
              message: "🚫 ¡Void aprendido! Ahora sabes cuándo una función no devuelve nada."
          };
      }
  },
  {
      id: 105,
      title: "TypeScript 10: Tipos Literales",
      icon: "fa-quote-left",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "Un **tipo literal** es cuando el valor solo puede ser exactamente ese texto o número. \`\"rojo\" | \"azul\" | \"verde\"\` significa que solo puede ser uno de esos tres colores.",
      instruction: "Crea una variable \`color\` de tipo \`\"rojo\" | \"azul\" | \"verde\"\` y asígnala a \`\"rojo\"\`. Luego muéstrala.",
      initialCode: `// Tipo literal:\n// let color: "rojo" | "azul" | "verde" = "rojo";\n// console.log("Mi color favorito es: " + color);`,
      validationLogic: (code, logs) => {
          const hasLiteral = code.includes('"rojo" | "azul" | "verde"');
          const hasAssign = code.includes('= "rojo"');
          const hasLog = logs.some(l => l.toLowerCase().includes("color"));
          return {
              success: hasLiteral && hasAssign && hasLog,
              message: "📝 ¡Tipos literales aprendidos! Ahora puedes restringir valores específicos."
          };
      }
  },
  {
      id: 106,
      title: "TypeScript 11: Propiedades Opcionales",
      icon: "fa-toggle-off",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "En las interfaces, también podemos hacer propiedades opcionales con \`?\`. Así algunos objetos pueden tener esa propiedad y otros no.",
      instruction: "Crea una interfaz \`Usuario\` con \`nombre: string\` (obligatorio) y \`email?: string\` (opcional). Crea dos objetos: uno con email y otro sin email.",
      initialCode: `// Interface con propiedad opcional:\n// interface Usuario {\n//   nombre: string;\n//   email?: string;\n// }\n\n// let usuario1: Usuario = { nombre: "Milita", email: "milita@ejemplo.com" };\n// let usuario2: Usuario = { nombre: "Gorilín" };\n\n// console.log(usuario1.nombre + " - " + usuario1.email);\n// console.log(usuario2.nombre);`,
      validationLogic: (code, logs) => {
          const hasOptionalProp = code.includes("email?: string");
          const hasTwoObjects = (code.match(/Usuario\s*=/g) || []).length >= 2;
          const hasLogs = logs.length >= 2;
          return {
              success: hasOptionalProp && hasTwoObjects && hasLogs,
              message: "🔓 ¡Propiedades opcionales en interfaces dominadas! Objetos más flexibles."
          };
      }
  },
  {
      id: 107,
      title: "TypeScript 12: Enums",
      icon: "fa-list-ul",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Un **enum** es una forma de crear un conjunto de valores constantes con nombres. ¡Es como una lista de opciones predefinidas!",
      instruction: "Crea un enum \`Color\` con valores \`Rojo\`, \`Verde\`, \`Azul\`. Luego crea una variable de tipo \`Color\` y asígnala a \`Color.Rojo\`.",
      initialCode: `// Define el enum:\n// enum Color {\n//   Rojo,\n//   Verde,\n//   Azul\n// }\n\n// Usa el enum:\n// let miColor: Color = Color.Rojo;\n// console.log("Mi color es: " + miColor);`,
      validationLogic: (code, logs) => {
          const hasEnum = code.includes("enum Color");
          const hasColorType = code.includes(": Color");
          const hasEnumValue = code.includes("Color.Rojo");
          return {
              success: hasEnum && hasColorType && hasEnumValue,
              message: "📋 ¡Enums aprendidos! Ahora tienes valores constantes organizados."
          };
      }
  },
  {
      id: 108,
      title: "TypeScript 13: Funciones como Parámetros",
      icon: "fa-code",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "En TypeScript puedes pasar funciones como parámetros. El tipo se escribe como \`(param: tipo) => tipoRetorno\`.",
      instruction: "Crea una función \`ejecutar\` que reciba una función \`fn: () => void\` y la ejecute. Luego pásale una función que muestre '¡Hola!'.",
      initialCode: `// Función que recibe otra función:\n// function ejecutar(fn: () => void): void {\n//   fn();\n// }\n\n// ejecutar(function() {\n//   console.log("¡Hola!");\n// });`,
      validationLogic: (code, logs) => {
          const hasFunctionType = code.includes("fn: () => void");
          const hasCall = code.includes("fn()");
          const hasLog = logs.some(l => l.toLowerCase().includes("hola"));
          return {
              success: hasFunctionType && hasCall && hasLog,
              message: "🔧 ¡Funciones como parámetros aprendidas! Programación funcional avanzada."
          };
      }
  },
  {
      id: 109,
      title: "TypeScript 14: Tipos de Intersección",
      icon: "fa-link",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "Un **tipo de intersección** combina varios tipos. \`A & B\` significa que el objeto debe tener todas las propiedades de A Y todas las de B.",
      instruction: "Crea dos interfaces: \`Volador\` con \`volar: () => void\` y \`Nadador\` con \`nadar: () => void\`. Luego crea un tipo \`SuperAnimal\` que combine ambos.",
      initialCode: `// Interfaces:\n// interface Volador {\n//   volar: () => void;\n// }\n\n// interface Nadador {\n//   nadar: () => void;\n// }\n\n// Tipo de intersección:\n// type SuperAnimal = Volador & Nadador;\n\n// let pato: SuperAnimal = {\n//   volar: function() { console.log("Volando..."); },\n//   nadar: function() { console.log("Nadando..."); }\n// };\n\n// pato.volar();\n// pato.nadar();`,
      validationLogic: (code, logs) => {
          const hasIntersection = code.includes("&");
          const hasTwoInterfaces = code.includes("interface Volador") && code.includes("interface Nadador");
          const hasBothCalls = logs.some(l => l.toLowerCase().includes("volando")) && logs.some(l => l.toLowerCase().includes("nadando"));
          return {
              success: hasIntersection && hasTwoInterfaces && hasBothCalls,
              message: "🔗 ¡Tipos de intersección aprendidos! Combinación de tipos dominada."
          };
      }
  },
  {
      id: 110,
      title: "TypeScript 15: Genéricos Básicos",
      icon: "fa-cogs",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Los **genéricos** permiten crear funciones y tipos que funcionan con diferentes tipos. Se escriben con \`<T>\` donde T es el tipo genérico.",
      instruction: "Crea una función genérica \`obtenerPrimero\` que reciba un array de tipo \`T[]\` y devuelva el primer elemento de tipo \`T\`. Úsala con un array de números y otro de strings.",
      initialCode: `// Función genérica:\n// function obtenerPrimero<T>(arr: T[]): T {\n//   return arr[0];\n// }\n\n// let numeros: number[] = [1, 2, 3];\n// let textos: string[] = ["a", "b", "c"];\n\n// console.log(obtenerPrimero(numeros));\n// console.log(obtenerPrimero(textos));`,
      validationLogic: (code, logs) => {
          const hasGeneric = code.includes("<T>");
          const hasGenericArray = code.includes("arr: T[]");
          const hasTwoCalls = (code.match(/obtenerPrimero\(/g) || []).length >= 2;
          return {
              success: hasGeneric && hasGenericArray && hasTwoCalls,
              message: "⚙️ ¡Genéricos básicos aprendidos! Código reutilizable con tipos."
          };
      }
  },
  {
      id: 111,
      title: "TypeScript 16: Readonly",
      icon: "fa-lock",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "La palabra clave \`readonly\` hace que una propiedad no se pueda cambiar después de crearla. ¡Es como una caja con candado!",
      instruction: "Crea una interfaz \`Config\` con \`readonly nombre: string\` y \`puerto: number\`. Crea un objeto y muestra ambas propiedades.",
      initialCode: `// Interface con readonly:\n// interface Config {\n//   readonly nombre: string;\n//   puerto: number;\n// }\n\n// let config: Config = { nombre: "MiApp", puerto: 3000 };\n// console.log("Nombre: " + config.nombre);\n// console.log("Puerto: " + config.puerto);`,
      validationLogic: (code, logs) => {
          const hasReadonly = code.includes("readonly nombre");
          const hasInterface = code.includes("interface Config");
          const hasLogs = logs.length >= 2;
          return {
              success: hasReadonly && hasInterface && hasLogs,
              message: "🔒 ¡Readonly aprendido! Propiedades inmutables para mayor seguridad."
          };
      }
  },
  {
      id: 112,
      title: "TypeScript 17: Tipos en Callbacks",
      icon: "fa-phone",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "Los **callbacks** son funciones que se pasan a otras funciones. En TypeScript podemos tipar los callbacks para mayor seguridad.",
      instruction: "Crea una función \`procesar\` que reciba un array de números y un callback \`fn: (num: number) => number\`. Aplica el callback a cada número y muestra los resultados.",
      initialCode: `// Función con callback tipado:\n// function procesar(numeros: number[], fn: (num: number) => number): void {\n//   numeros.forEach(function(num) {\n//     console.log(fn(num));\n//   });\n// }\n\n// let nums: number[] = [1, 2, 3];\n// procesar(nums, function(n: number): number {\n//   return n * 2;\n// });`,
      validationLogic: (code, logs) => {
          const hasCallbackType = code.includes("fn: (num: number) => number");
          const hasForEach = code.includes("forEach");
          const hasResults = logs.length >= 3;
          return {
              success: hasCallbackType && hasForEach && hasResults,
              message: "📞 ¡Callbacks tipados dominados! Funciones más seguras y claras."
          };
      }
  },
  {
      id: 113,
      title: "TypeScript 18: Tuplas",
      icon: "fa-brackets-curly",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Una **tupla** es un array con un número fijo de elementos, cada uno con un tipo específico. \`[string, number]\` significa 'un array con exactamente un string y un number'.",
      instruction: "Crea una variable \`persona\` de tipo \`[string, number]\` (nombre y edad). Asigna valores y muestra ambos.",
      initialCode: `// Tupla:\n// let persona: [string, number] = ["Milita", 8];\n// console.log("Nombre: " + persona[0]);\n// console.log("Edad: " + persona[1]);`,
      validationLogic: (code, logs) => {
          const hasTuple = code.includes("[string, number]");
          const hasAssign = code.includes('= ["') || code.includes("= ['");
          const hasLogs = logs.length >= 2;
          return {
              success: hasTuple && hasAssign && hasLogs,
              message: "📦 ¡Tuplas aprendidas! Arrays con estructura fija dominados."
          };
      }
  },
  {
      id: 114,
      title: "TypeScript 19: Null y Undefined",
      icon: "fa-question",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "En TypeScript, \`null\` y \`undefined\` son tipos especiales. Puedes combinarlos con otros tipos usando unión: \`string | null\` significa 'puede ser texto o null'.",
      instruction: "Crea una variable \`nombre\` de tipo \`string | null\`. Asígnala primero a un string, luego a \`null\`, y muestra ambos casos.",
      initialCode: `// Tipo con null:\n// let nombre: string | null = "Milita";\n// console.log("Nombre: " + nombre);\n\n// nombre = null;\n// if (nombre === null) {\n//   console.log("Nombre es null");\n// } else {\n//   console.log("Nombre: " + nombre);\n// }`,
      validationLogic: (code, logs) => {
          const hasNullUnion = code.includes("string | null");
          const hasNullAssign = code.includes("= null");
          const hasConditional = code.includes("if (nombre");
          return {
              success: hasNullUnion && hasNullAssign && hasConditional,
              message: "❓ ¡Null y undefined aprendidos! Manejo de valores vacíos dominado."
          };
      }
  },
  {
      id: 115,
      title: "TypeScript 20: Type Assertions",
      icon: "fa-hand-pointer",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "A veces TypeScript no sabe qué tipo tiene algo, pero tú sí. Puedes usar **type assertions** para decirle: \`valor as Tipo\` o \`<Tipo>valor\`.",
      instruction: "Crea una variable \`dato\` de tipo \`any\` con valor \`\"123\"\`. Luego usa una aserción de tipo para tratarla como \`string\` y obtener su longitud.",
      initialCode: `// Type assertion:\n// let dato: any = "123";\n\n// Trata dato como string:\n// let texto: string = dato as string;\n// console.log("Longitud: " + texto.length);`,
      validationLogic: (code, logs) => {
          const hasAssertion = code.includes("as string");
          const hasLength = code.includes(".length");
          const hasLog = logs.some(l => l.toLowerCase().includes("longitud"));
          return {
              success: hasAssertion && hasLength && hasLog,
              message: "👆 ¡Type assertions aprendidas! Control total sobre los tipos."
          };
      }
  },
  {
      id: 116,
      title: "TypeScript 21: Tipos en Métodos de Array",
      icon: "fa-list",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Los métodos de array como \`map\`, \`filter\`, y \`find\` también funcionan con tipos. TypeScript sabe qué tipo devuelve cada método.",
      instruction: "Crea un array \`numeros: number[]\` con [1, 2, 3, 4, 5]. Usa \`map\` para multiplicar cada número por 2 y muestra el resultado.",
      initialCode: `// Array tipado:\n// let numeros: number[] = [1, 2, 3, 4, 5];\n\n// Usa map con tipos:\n// let duplicados: number[] = numeros.map(function(num: number): number {\n//   return num * 2;\n// });\n\n// console.log(duplicados);`,
      validationLogic: (code, logs) => {
          const hasArrayType = code.includes("number[]");
          const hasMap = code.includes(".map(");
          const hasTypedFunction = code.includes("num: number");
          const hasResult = logs.some(l => l.includes("2,4,6,8,10") || l.includes("2, 4, 6, 8, 10"));
          return {
              success: hasArrayType && hasMap && hasTypedFunction && hasResult,
              message: "🔢 ¡Métodos de array tipados dominados! TypeScript ayuda en cada paso."
          };
      }
  },
  {
      id: 117,
      title: "TypeScript 22: Retornos Múltiples",
      icon: "fa-exchange-alt",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "Una función puede devolver diferentes tipos usando unión. \`: string | number\` significa que puede devolver texto O número.",
      instruction: "Crea una función \`obtenerValor\` que reciba un \`tipo: \"texto\" | \"numero\"\` y devuelva \`string | number\`. Si tipo es 'texto', devuelve 'Hola', si es 'numero', devuelve 42.",
      initialCode: `// Función con retorno de unión:\n// function obtenerValor(tipo: "texto" | "numero"): string | number {\n//   if (tipo === "texto") {\n//     return "Hola";\n//   }\n//   return 42;\n// }\n\n// console.log(obtenerValor("texto"));\n// console.log(obtenerValor("numero"));`,
      validationLogic: (code, logs) => {
          const hasUnionReturn = code.includes("): string | number");
          const hasConditional = code.includes("if (tipo");
          const hasTwoCalls = (code.match(/obtenerValor\(/g) || []).length >= 2;
          return {
              success: hasUnionReturn && hasConditional && hasTwoCalls,
              message: "🔄 ¡Retornos múltiples aprendidos! Funciones más versátiles."
          };
      }
  },
  {
      id: 118,
      title: "TypeScript 23: El Tipo Any",
      icon: "fa-exclamation-triangle",
      color: "teal",
      type: "typescript",
      section: "typescript",
      description: "El tipo \`any\` significa 'cualquier tipo'. Es útil cuando no sabes qué tipo será, pero hay que usarlo con cuidado porque pierdes la protección de TypeScript.",
      instruction: "Crea una variable \`dato\` de tipo \`any\` y asígnala primero a un número, luego a un texto. Muestra ambos valores.",
      initialCode: `// Tipo any:\n// let dato: any = 100;\n// console.log("Número: " + dato);\n\n// dato = "Hola TypeScript";\n// console.log("Texto: " + dato);`,
      validationLogic: (code, logs) => {
          const hasAny = code.includes(": any");
          const hasNumberAssign = !!code.match(/=\s*\d+/);
          const hasStringAssign = code.includes('= "') || code.includes("= '");
          return {
              success: hasAny && hasNumberAssign && hasStringAssign,
              message: "⚠️ ¡Tipo any aprendido! Úsalo con cuidado, pero a veces es necesario."
          };
      }
  },
  {
      id: 119,
      title: "TypeScript 24: Tipos en Objetos",
      icon: "fa-cube",
      color: "pink",
      type: "typescript",
      section: "typescript",
      description: "Los objetos también pueden tener tipos. Podemos definir qué propiedades tiene un objeto y qué tipo tiene cada una.",
      instruction: "Crea un objeto \`mascota\` con propiedades tipadas: \`nombre: string\` y \`edad: number\`. Luego muestra ambas propiedades.",
      initialCode: `// Crea un objeto tipado:\n// let mascota: { nombre: string; edad: number } = {\n//   nombre: "Firulais",\n//   edad: 3\n// };\n\n// console.log(mascota.nombre + " tiene " + mascota.edad + " años");`,
      validationLogic: (code, logs) => {
          const hasObjectType = code.includes("{ nombre: string; edad: number }");
          const hasLog = logs.some(l => l.toLowerCase().includes("años") || l.toLowerCase().includes("tiene"));
          return {
              success: hasObjectType && hasLog,
              message: "📦 ¡Objetos tipados aprendidos! TypeScript verifica que uses las propiedades correctas."
          };
      }
  },
  {
      id: 120,
      title: "TypeScript 25: Proyecto Final",
      icon: "fa-trophy",
      color: "purple",
      type: "typescript",
      section: "typescript",
      description: "¡Felicidades! 🎉 Has llegado al final de TypeScript. Ahora combina todo lo aprendido: interfaces, tipos, funciones, arrays, y más. ¡Crea algo genial!",
      instruction: "Crea una interfaz \`Estudiante\` con \`nombre: string\`, \`edad: number\`, y \`cursos: string[]\`. Crea un array de estudiantes, usa \`map\` para obtener solo los nombres, y muéstralos.",
      initialCode: `// Interface:\n// interface Estudiante {\n//   nombre: string;\n//   edad: number;\n//   cursos: string[];\n// }\n\n// Array de estudiantes:\n// let estudiantes: Estudiante[] = [\n//   { nombre: "Milita", edad: 8, cursos: ["Matemáticas", "Programación"] },\n//   { nombre: "Gorilín", edad: 10, cursos: ["Ciencias", "Arte"] }\n// ];\n\n// Obtén solo los nombres:\n// let nombres: string[] = estudiantes.map(function(e: Estudiante): string {\n//   return e.nombre;\n// });\n\n// console.log("Estudiantes: " + nombres.join(", "));`,
      validationLogic: (code, logs) => {
          const hasInterface = code.includes("interface Estudiante");
          const hasArrayType = code.includes("Estudiante[]");
          const hasMap = code.includes(".map(");
          const hasJoin = code.includes(".join(");
          const hasLog = logs.some(l => l.toLowerCase().includes("estudiantes"));
          return {
              success: hasInterface && hasArrayType && hasMap && hasJoin && hasLog,
              message: "🏆 ¡PROYECTO FINAL COMPLETADO! ¡Eres una experta en TypeScript! ¡Increíble trabajo! 🎊"
          };
      }
  },
  // ========== REACT LESSONS - ANIMAL THEME ==========
  {
      id: 121,
      title: "React 1: ¡Hola Gatito! Tu Primer Componente",
      icon: "fa-cat",
      color: "pink",
      type: "react",
      section: "react",
      description: "¡Bienvenida a React! 🐱 Un **componente** es como un gatito adorable que puedes usar una y otra vez. En React, creamos componentes con funciones que devuelven JSX (parecido a HTML pero con superpoderes).",
      instruction: "Crea tu primer componente React llamado \`Gatito\` que muestre '¡Miau! Soy un gatito feliz 🐱'. Usa \`function Gatito() { return <h1>...</h1>; }\`",
      initialCode: `// Tu primer componente React:\n// function Gatito() {\n//   return <h1>¡Miau! Soy un gatito feliz 🐱</h1>;\n// }\n\n// Para usarlo, lo llamamos así:\n// console.log("Componente creado: Gatito");\n// Gatito();`,
      validationLogic: (code, logs) => {
          const hasFunction = code.includes("function Gatito") || code.includes("const Gatito");
          const hasReturn = code.includes("return");
          const hasJSX = code.includes("<h1>") || code.includes("Miau");
          return {
              success: hasFunction && hasReturn && hasJSX,
              message: "🐱 ¡Miau! ¡Tu primer componente React está listo! ¡Eres increíble!"
          };
      }
  },
  {
      id: 122,
      title: "React 2: El Perrito que Saluda",
      icon: "fa-dog",
      color: "purple",
      type: "react",
      section: "react",
      description: "Los componentes pueden recibir **props** (propiedades), como cuando le das un nombre a tu perrito. Las props son como regalitos que le pasas a tu componente para que sepa qué hacer.",
      instruction: "Crea un componente \`Perrito\` que reciba una prop \`nombre\` y muestre '¡Guau! Soy {nombre} 🐶'. Usa \`function Perrito({ nombre }) { ... }\`",
      initialCode: `// Componente con props:\n// function Perrito({ nombre }) {\n//   return <h2>¡Guau! Soy {nombre} 🐶</h2>;\n// }\n\n// Para usarlo:\n// console.log("Perrito con nombre: Max");\n// Perrito({ nombre: "Max" });`,
      validationLogic: (code, logs) => {
          const hasProps = code.includes("{ nombre }") || code.includes("props.nombre");
          const hasJSXWithProp = code.includes("{nombre}") || code.includes("props.nombre");
          return {
              success: hasProps && hasJSXWithProp,
              message: "🐶 ¡Guau! ¡Tu perrito ya sabe su nombre! ¡Props dominadas!"
          };
      }
  },
  {
      id: 123,
      title: "React 3: La Conejita Saltarina",
      icon: "fa-bunny",
      color: "teal",
      type: "react",
      section: "react",
      description: "En React, podemos usar **JSX** para crear HTML de forma mágica. JSX es como HTML pero dentro de JavaScript. ¡La conejita puede saltar entre etiquetas! 🐰",
      instruction: "Crea un componente \`Conejita\` que muestre un div con un párrafo que diga '¡Hop! ¡Hop! Soy una conejita saltarina 🐰'. Usa \`<div><p>...</p></div>\`",
      initialCode: `// Componente con JSX:\n// function Conejita() {\n//   return (\n//     <div>\n//       <p>¡Hop! ¡Hop! Soy una conejita saltarina 🐰</p>\n//     </div>\n//   );\n// }\n\n// console.log("Conejita creada");`,
      validationLogic: (code, logs) => {
          const hasDiv = code.includes("<div>");
          const hasParagraph = code.includes("<p>");
          const hasConejita = code.includes("Conejita");
          return {
              success: hasDiv && hasParagraph && hasConejita,
              message: "🐰 ¡Hop! ¡Tu conejita salta perfectamente! ¡JSX aprendido!"
          };
      }
  },
  {
      id: 124,
      title: "React 4: El Pajarito que Canta",
      icon: "fa-dove",
      color: "pink",
      type: "react",
      section: "react",
      description: "Los componentes pueden tener **múltiples props**. Es como darle al pajarito un nombre Y una canción favorita. ¡Puedes pasarle todas las propiedades que quieras! 🐦",
      instruction: "Crea un componente \`Pajarito\` que reciba \`nombre\` y \`cancion\` como props, y muestre '{nombre} canta: {cancion} 🐦'",
      initialCode: `// Componente con múltiples props:\n// function Pajarito({ nombre, cancion }) {\n//   return <p>{nombre} canta: {cancion} 🐦</p>;\n// }\n\n// console.log("Pajarito con nombre y canción");\n// Pajarito({ nombre: "Piolín", cancion: "Tweet tweet" });`,
      validationLogic: (code, logs) => {
          const hasMultipleProps = (code.match(/\{\s*\w+\s*,\s*\w+\s*\}/g) || []).length > 0;
          const hasNombre = code.includes("nombre");
          const hasCancion = code.includes("cancion");
          return {
              success: hasMultipleProps && hasNombre && hasCancion,
              message: "🐦 ¡Tweet! ¡Tu pajarito canta hermoso! ¡Múltiples props dominadas!"
          };
      }
  },
  {
      id: 125,
      title: "React 5: El Osito Abrazador",
      icon: "fa-bear",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **className** en JSX (en lugar de 'class') para darle estilos a nuestros componentes. El osito quiere un abrazo con estilo! 🐻",
      instruction: "Crea un componente \`Osito\` que tenga un div con \`className=\"abrazador\"\` y muestre '¡Abrazo de osito! 🐻'",
      initialCode: `// Componente con className:\n// function Osito() {\n//   return <div className="abrazador">¡Abrazo de osito! 🐻</div>;\n// }\n\n// console.log("Osito abrazador creado");`,
      validationLogic: (code, logs) => {
          const hasClassName = code.includes('className=') || code.includes('className =');
          const hasOsito = code.includes("Osito");
          return {
              success: hasClassName && hasOsito,
              message: "🐻 ¡Abrazo! ¡Tu osito tiene estilo! ¡className aprendido!"
          };
      }
  },
  {
      id: 126,
      title: "React 6: La Mariposa Voladora",
      icon: "fa-butterfly",
      color: "teal",
      type: "react",
      section: "react",
      description: "Los componentes pueden tener **estilos inline** usando objetos JavaScript. La mariposa quiere volar con colores hermosos! 🦋",
      instruction: "Crea un componente \`Mariposa\` con un div que tenga estilo inline \`style={{ color: 'pink', fontSize: '20px' }}\` y muestre '¡Vuelo libre! 🦋'",
      initialCode: `// Componente con estilos inline:\n// function Mariposa() {\n//   return (\n//     <div style={{ color: 'pink', fontSize: '20px' }}>\n//       ¡Vuelo libre! 🦋\n//     </div>\n//   );\n// }\n\n// console.log("Mariposa voladora creada");`,
      validationLogic: (code, logs) => {
          const hasStyle = code.includes("style={{") || code.includes("style={{");
          const hasColor = code.includes("color:");
          return {
              success: hasStyle && hasColor,
              message: "🦋 ¡Vuelo! ¡Tu mariposa es hermosa! ¡Estilos inline dominados!"
          };
      }
  },
  {
      id: 127,
      title: "React 7: El Elefante Memorable",
      icon: "fa-elephant",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **arrays** en JSX para mostrar listas de cosas. El elefante tiene una memoria increíble y recuerda a todos sus amigos! 🐘",
      instruction: "Crea un componente \`Elefante\` que muestre una lista de amigos usando \`map\`. Crea un array \`amigos = ['Luna', 'Sol', 'Estrella']\` y muéstralos con \`{amigos.map(...)}\`",
      initialCode: `// Componente con lista:\n// function Elefante() {\n//   const amigos = ['Luna', 'Sol', 'Estrella'];\n//   return (\n//     <ul>\n//       {amigos.map(amigo => <li key={amigo}>{amigo} 🐘</li>)}\n//     </ul>\n//   );\n// }\n\n// console.log("Elefante con amigos creado");`,
      validationLogic: (code, logs) => {
          const hasMap = code.includes(".map(");
          const hasArray = code.includes("['") || code.includes('["');
          const hasKey = code.includes("key=");
          return {
              success: hasMap && hasArray && hasKey,
              message: "🐘 ¡Tromp! ¡Tu elefante recuerda a todos! ¡Listas en JSX dominadas!"
          };
      }
  },
  {
      id: 128,
      title: "React 8: El Pingüino Bailarín",
      icon: "fa-penguin",
      color: "purple",
      type: "react",
      section: "react",
      description: "Los componentes pueden tener **condicionales** con \`&&\` o \`?\`. El pingüino baila solo si está feliz! 🐧",
      instruction: "Crea un componente \`Pinguino\` que reciba una prop \`feliz\` (true/false). Si está feliz, muestra '¡Estoy bailando! 🐧', si no, muestra 'Estoy triste 😢'",
      initialCode: `// Componente con condicional:\n// function Pinguino({ feliz }) {\n//   return (\n//     <div>\n//       {feliz ? <p>¡Estoy bailando! 🐧</p> : <p>Estoy triste 😢</p>}\n//     </div>\n//   );\n// }\n\n// console.log("Pingüino creado");\n// Pinguino({ feliz: true });`,
      validationLogic: (code, logs) => {
          const hasConditional = code.includes("?") && code.includes(":");
          const hasFeliz = code.includes("feliz");
          return {
              success: hasConditional && hasFeliz,
              message: "🐧 ¡Baila! ¡Tu pingüino está feliz! ¡Condicionales en JSX aprendidos!"
          };
      }
  },
  {
      id: 129,
      title: "React 9: El León Valiente",
      icon: "fa-lion",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **fragmentos** \`<></>\` o \`<React.Fragment>\` para envolver múltiples elementos sin crear un div extra. El león es valiente y no necesita contenedores! 🦁",
      instruction: "Crea un componente \`Leon\` que use un fragmento \`<>\` para mostrar dos párrafos: '¡Rugido poderoso! 🦁' y 'Soy el rey de la selva'",
      initialCode: `// Componente con fragmento:\n// function Leon() {\n//   return (\n//     <>\n//       <p>¡Rugido poderoso! 🦁</p>\n//       <p>Soy el rey de la selva</p>\n//     </>\n//   );\n// }\n\n// console.log("León creado");`,
      validationLogic: (code, logs) => {
          const hasFragment = code.includes("<>") || code.includes("<React.Fragment>");
          const hasMultipleElements = (code.match(/<p>/g) || []).length >= 2;
          return {
              success: hasFragment && hasMultipleElements,
              message: "🦁 ¡Rugido! ¡Tu león es valiente! ¡Fragmentos dominados!"
          };
      }
  },
  {
      id: 130,
      title: "React 10: El Delfín Juguetón",
      icon: "fa-dolphin",
      color: "pink",
      type: "react",
      section: "react",
      description: "Los componentes pueden tener **eventos** como \`onClick\`. El delfín quiere jugar cuando haces clic! 🐬",
      instruction: "Crea un componente \`Delfin\` con un botón que tenga \`onClick\` y muestre '¡Splash! Estoy jugando 🐬' cuando hagas clic. Usa \`const handleClick = () => { ... }\`",
      initialCode: `// Componente con evento:\n// function Delfin() {\n//   const handleClick = () => {\n//     console.log("¡Splash! Estoy jugando 🐬");\n//   };\n//   return <button onClick={handleClick}>¡Hazme clic!</button>;\n// }\n\n// console.log("Delfín creado");`,
      validationLogic: (code, logs) => {
          const hasOnClick = code.includes("onClick=");
          const hasHandleClick = code.includes("handleClick");
          return {
              success: hasOnClick && hasHandleClick,
              message: "🐬 ¡Splash! ¡Tu delfín juega perfecto! ¡Eventos aprendidos!"
          };
      }
  },
  {
      id: 131,
      title: "React 11: El Canguro Saltarín con Estado",
      icon: "fa-kangaroo",
      color: "purple",
      type: "react",
      section: "react",
      description: "¡Hora de aprender **useState**! Es como una cajita mágica que recuerda cosas. El canguro quiere contar sus saltos! 🦘",
      instruction: "Crea un componente \`Canguro\` que use \`useState\` para contar saltos. Usa \`const [saltos, setSaltos] = useState(0)\` y un botón que incremente los saltos.",
      initialCode: `// Componente con useState:\n// import { useState } from 'react';\n// function Canguro() {\n//   const [saltos, setSaltos] = useState(0);\n//   return (\n//     <div>\n//       <p>Saltos: {saltos} 🦘</p>\n//       <button onClick={() => setSaltos(saltos + 1)}>Saltar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Canguro con estado creado");`,
      validationLogic: (code, logs) => {
          const hasUseState = code.includes("useState");
          const hasSetState = code.includes("setSaltos") || code.includes("setState");
          const hasOnClick = code.includes("onClick");
          return {
              success: hasUseState && hasSetState && hasOnClick,
              message: "🦘 ¡Salto! ¡Tu canguro cuenta perfecto! ¡useState dominado!"
          };
      }
  },
  {
      id: 132,
      title: "React 12: La Jirafa que Crece",
      icon: "fa-giraffe",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **useState** con diferentes tipos de datos. La jirafa quiere crecer y cambiar su altura! 🦒",
      instruction: "Crea un componente \`Jirafa\` con \`useState\` para la altura (número). Muestra la altura y un botón que la aumente en 10cm cada vez.",
      initialCode: `// useState con número:\n// import { useState } from 'react';\n// function Jirafa() {\n//   const [altura, setAltura] = useState(200);\n//   return (\n//     <div>\n//       <p>Altura: {altura}cm 🦒</p>\n//       <button onClick={() => setAltura(altura + 10)}>Crecer</button>\n//     </div>\n//   );\n// }\n\n// console.log("Jirafa que crece creada");`,
      validationLogic: (code, logs) => {
          const hasUseState = code.includes("useState");
          const hasNumber = code.includes("useState(") && (code.includes("200") || code.includes("0"));
          const hasIncrement = code.includes("+ 10") || code.includes("+10");
          return {
              success: hasUseState && hasNumber && hasIncrement,
              message: "🦒 ¡Crece! ¡Tu jirafa es alta! ¡useState con números dominado!"
          };
      }
  },
  {
      id: 133,
      title: "React 13: El Mono Charlatán",
      icon: "fa-monkey",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **useState** con strings (textos). El mono quiere cambiar lo que dice! 🐵",
      instruction: "Crea un componente \`Mono\` con \`useState\` para un mensaje (string). Muestra el mensaje y un input que lo cambie con \`onChange\`.",
      initialCode: `// useState con string:\n// import { useState } from 'react';\n// function Mono() {\n//   const [mensaje, setMensaje] = useState("¡Ooh ooh!");\n//   return (\n//     <div>\n//       <p>{mensaje} 🐵</p>\n//       <input value={mensaje} onChange={(e) => setMensaje(e.target.value)} />\n//     </div>\n//   );\n// }\n\n// console.log("Mono charlatán creado");`,
      validationLogic: (code, logs) => {
          const hasUseState = code.includes("useState");
          const hasString = code.includes('useState("') || code.includes("useState('");
          const hasOnChange = code.includes("onChange=");
          return {
              success: hasUseState && hasString && hasOnChange,
              message: "🐵 ¡Ooh! ¡Tu mono habla perfecto! ¡useState con strings dominado!"
          };
      }
  },
  {
      id: 134,
      title: "React 14: El Panda que Cambia de Humor",
      icon: "fa-panda",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **useState** con booleanos (true/false). El panda cambia entre feliz y triste! 🐼",
      instruction: "Crea un componente \`Panda\` con \`useState\` para \`feliz\` (boolean). Muestra un emoji diferente según si está feliz o no, y un botón que cambie el estado.",
      initialCode: `// useState con booleano:\n// import { useState } from 'react';\n// function Panda() {\n//   const [feliz, setFeliz] = useState(true);\n//   return (\n//     <div>\n//       <p>{feliz ? '😊 Feliz' : '😢 Triste'} 🐼</p>\n//       <button onClick={() => setFeliz(!feliz)}>Cambiar humor</button>\n//     </div>\n//   );\n// }\n\n// console.log("Panda creado");`,
      validationLogic: (code, logs) => {
          const hasUseState = code.includes("useState");
          const hasBoolean = code.includes("useState(true)") || code.includes("useState(false)");
          const hasToggle = code.includes("!feliz") || code.includes("setFeliz(!");
          return {
              success: hasUseState && hasBoolean && hasToggle,
              message: "🐼 ¡Cambio! ¡Tu panda cambia de humor! ¡useState con booleanos dominado!"
          };
      }
  },
  {
      id: 135,
      title: "React 15: El Zorro Astuto",
      icon: "fa-fox",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **múltiples useState** en un componente. El zorro es astuto y puede recordar muchas cosas a la vez! 🦊",
      instruction: "Crea un componente \`Zorro\` con dos \`useState\`: uno para \`nombre\` y otro para \`edad\`. Muestra ambos y botones para cambiarlos.",
      initialCode: `// Múltiples useState:\n// import { useState } from 'react';\n// function Zorro() {\n//   const [nombre, setNombre] = useState("Zorro");\n//   const [edad, setEdad] = useState(3);\n//   return (\n//     <div>\n//       <p>{nombre}, {edad} años 🦊</p>\n//       <button onClick={() => setNombre("Astuto")}>Cambiar nombre</button>\n//       <button onClick={() => setEdad(edad + 1)}>Cumplir años</button>\n//     </div>\n//   );\n// }\n\n// console.log("Zorro astuto creado");`,
      validationLogic: (code, logs) => {
          const useStateCount = (code.match(/useState/g) || []).length;
          const hasMultiple = useStateCount >= 2;
          return {
              success: hasMultiple,
              message: "🦊 ¡Astuto! ¡Tu zorro recuerda todo! ¡Múltiples useState dominados!"
          };
      }
  },
  {
      id: 136,
      title: "React 16: El Koala Dormilón",
      icon: "fa-koala",
      color: "pink",
      type: "react",
      section: "react",
      description: "¡Hora de aprender **useEffect**! Es como un asistente que hace cosas cuando algo cambia. El koala se despierta cuando cambias algo! 🐨",
      instruction: "Crea un componente \`Koala\` con \`useState\` para \`despierto\` y \`useEffect\` que muestre en consola 'El koala se despertó' cuando \`despierto\` cambie a true.",
      initialCode: `// useEffect básico:\n// import { useState, useEffect } from 'react';\n// function Koala() {\n//   const [despierto, setDespierto] = useState(false);\n//   useEffect(() => {\n//     if (despierto) {\n//       console.log("El koala se despertó 🐨");\n//     }\n//   }, [despierto]);\n//   return (\n//     <div>\n//       <p>{despierto ? 'Despierto' : 'Durmiendo'} 🐨</p>\n//       <button onClick={() => setDespierto(!despierto)}>Despertar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Koala creado");`,
      validationLogic: (code, logs) => {
          const hasUseEffect = code.includes("useEffect");
          const hasDependency = code.includes("[despierto]") || code.includes("[");
          return {
              success: hasUseEffect && hasDependency,
              message: "🐨 ¡Despierta! ¡Tu koala usa useEffect! ¡Efectos aprendidos!"
          };
      }
  },
  {
      id: 137,
      title: "React 17: El Lobo que Aúlla",
      icon: "fa-wolf",
      color: "purple",
      type: "react",
      section: "react",
      description: "**useEffect** puede ejecutarse solo una vez al montar el componente (con array vacío []). El lobo aúlla cuando aparece por primera vez! 🐺",
      instruction: "Crea un componente \`Lobo\` con \`useEffect\` que solo se ejecute una vez (array vacío []) y muestre en consola '¡Auuuu! 🐺' cuando el componente se monte.",
      initialCode: `// useEffect una sola vez:\n// import { useEffect } from 'react';\n// function Lobo() {\n//   useEffect(() => {\n//     console.log("¡Auuuu! 🐺");\n//   }, []);\n//   return <p>Lobo aullador 🐺</p>;\n// }\n\n// console.log("Lobo creado");`,
      validationLogic: (code, logs) => {
          const hasUseEffect = code.includes("useEffect");
          const hasEmptyArray = code.includes("], []") || code.includes("],[])");
          return {
              success: hasUseEffect && hasEmptyArray,
              message: "🐺 ¡Auuuu! ¡Tu lobo aúlla perfecto! ¡useEffect con [] dominado!"
          };
      }
  },
  {
      id: 138,
      title: "React 18: El Tigre Feroz",
      icon: "fa-tiger",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **useEffect** con cleanup (limpieza). El tigre limpia después de sí mismo! 🐅",
      instruction: "Crea un componente \`Tigre\` con \`useEffect\` que retorne una función de limpieza. La función debe mostrar en consola 'El tigre se fue 🐅' cuando el componente se desmonte.",
      initialCode: `// useEffect con cleanup:\n// import { useEffect } from 'react';\n// function Tigre() {\n//   useEffect(() => {\n//     console.log("El tigre llegó 🐅");\n//     return () => {\n//       console.log("El tigre se fue 🐅");\n//     };\n//   }, []);\n//   return <p>Tigre feroz 🐅</p>;\n// }\n\n// console.log("Tigre creado");`,
      validationLogic: (code, logs) => {
          const hasUseEffect = code.includes("useEffect");
          const hasReturn = code.includes("return () =>") || code.includes("return() =>");
          return {
              success: hasUseEffect && hasReturn,
              message: "🐅 ¡Rugido! ¡Tu tigre limpia perfecto! ¡Cleanup aprendido!"
          };
      }
  },
  {
      id: 139,
      title: "React 19: El Caballo Galopante",
      icon: "fa-horse",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos pasar **funciones como props**. El caballo puede recibir una función para galopar! 🐴",
      instruction: "Crea un componente \`Caballo\` que reciba una prop \`onGalopar\` (función) y un botón que la llame. También crea un componente padre que pase la función.",
      initialCode: `// Funciones como props:\n// function Caballo({ onGalopar }) {\n//   return (\n//     <div>\n//       <p>Caballo 🐴</p>\n//       <button onClick={onGalopar}>Galopar</button>\n//     </div>\n//   );\n// }\n\n// function Establo() {\n//   const handleGalopar = () => console.log("¡Galopando! 🐴");\n//   return <Caballo onGalopar={handleGalopar} />;\n// }\n\n// console.log("Caballo creado");`,
      validationLogic: (code, logs) => {
          const hasFunctionProp = code.includes("onGalopar") && code.includes("function");
          const hasParent = code.includes("Establo") || code.includes("handleGalopar");
          return {
              success: hasFunctionProp && hasParent,
              message: "🐴 ¡Galopa! ¡Tu caballo funciona perfecto! ¡Funciones como props dominadas!"
          };
      }
  },
  {
      id: 140,
      title: "React 20: El Oso Polar en el Frío",
      icon: "fa-snowflake",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **children** para pasar contenido a componentes. El oso polar puede tener hijos (otros componentes) dentro! 🐻‍❄️",
      instruction: "Crea un componente \`OsoPolar\` que reciba \`children\` y los muestre dentro de un div. Luego úsalo envolviendo un párrafo con 'Estoy en el frío 🐻‍❄️'",
      initialCode: `// Children prop:\n// function OsoPolar({ children }) {\n//   return <div className="oso-polar">{children}</div>;\n// }\n\n// function App() {\n//   return (\n//     <OsoPolar>\n//       <p>Estoy en el frío 🐻‍❄️</p>\n//     </OsoPolar>\n//   );\n// }\n\n// console.log("Oso polar creado");`,
      validationLogic: (code, logs) => {
          const hasChildren = code.includes("{ children }") || code.includes("children");
          const hasUsage = code.includes("<OsoPolar>") || code.includes("</OsoPolar>");
          return {
              success: hasChildren && hasUsage,
              message: "🐻‍❄️ ¡Frío! ¡Tu oso polar tiene hijos! ¡Children dominados!"
          };
      }
  },
  {
      id: 141,
      title: "React 21: El Cangrejo que Camina de Lado",
      icon: "fa-crab",
      color: "teal",
      type: "react",
      section: "react",
      description: "¡Hora de **useRef**! Es como una cajita que guarda una referencia sin causar re-renders. El cangrejo guarda su posición! 🦀",
      instruction: "Crea un componente \`Cangrejo\` con \`useRef\` para un input. Usa \`const inputRef = useRef(null)\` y \`inputRef.current.focus()\` en un botón.",
      initialCode: `// useRef básico:\n// import { useRef } from 'react';\n// function Cangrejo() {\n//   const inputRef = useRef(null);\n//   const handleFocus = () => {\n//     inputRef.current.focus();\n//   };\n//   return (\n//     <div>\n//       <input ref={inputRef} placeholder="Cangrejo 🦀" />\n//       <button onClick={handleFocus}>Enfocar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Cangrejo creado");`,
      validationLogic: (code, logs) => {
          const hasUseRef = code.includes("useRef");
          const hasRef = code.includes("ref={") || code.includes("ref =");
          return {
              success: hasUseRef && hasRef,
              message: "🦀 ¡Camina! ¡Tu cangrejo usa refs! ¡useRef dominado!"
          };
      }
  },
  {
      id: 142,
      title: "React 22: El Pulpo con Muchos Brazos",
      icon: "fa-octopus",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **useMemo** para memorizar cálculos costosos. El pulpo tiene muchos brazos pero solo calcula cuando es necesario! 🐙",
      instruction: "Crea un componente \`Pulpo\` con \`useMemo\` que calcule el cuadrado de un número. Usa \`const resultado = useMemo(() => numero * numero, [numero])\`",
      initialCode: `// useMemo básico:\n// import { useState, useMemo } from 'react';\n// function Pulpo() {\n//   const [numero, setNumero] = useState(5);\n//   const resultado = useMemo(() => numero * numero, [numero]);\n//   return (\n//     <div>\n//       <p>Número: {numero}, Cuadrado: {resultado} 🐙</p>\n//       <button onClick={() => setNumero(numero + 1)}>Aumentar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Pulpo creado");`,
      validationLogic: (code, logs) => {
          const hasUseMemo = code.includes("useMemo");
          const hasDependency = code.includes("[numero]") || code.includes("[");
          return {
              success: hasUseMemo && hasDependency,
              message: "🐙 ¡Brazos! ¡Tu pulpo memoriza perfecto! ¡useMemo dominado!"
          };
      }
  },
  {
      id: 143,
      title: "React 23: El Camello del Desierto",
      icon: "fa-camel",
      color: "purple",
      type: "react",
      section: "react",
      description: "¡Hora de **useCallback**! Memoriza funciones para evitar recrearlas. El camello guarda energía como agua en el desierto! 🐪",
      instruction: "Crea un componente \`Camello\` con \`useCallback\` para una función. Usa \`const handleClick = useCallback(() => { ... }, [])\`",
      initialCode: `// useCallback básico:\n// import { useCallback } from 'react';\n// function Camello() {\n//   const handleClick = useCallback(() => {\n//     console.log("Camello caminando 🐪");\n//   }, []);\n//   return (\n//     <div>\n//       <p>Camello 🐪</p>\n//       <button onClick={handleClick}>Caminar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Camello creado");`,
      validationLogic: (code, logs) => {
          const hasUseCallback = code.includes("useCallback");
          const hasDependency = code.includes("], [") || code.includes("],[]");
          return {
              success: hasUseCallback && hasDependency,
              message: "🐪 ¡Desierto! ¡Tu camello usa callbacks! ¡useCallback dominado!"
          };
      }
  },
  {
      id: 144,
      title: "React 24: El Hipopótamo en el Agua",
      icon: "fa-hippo",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos crear **hooks personalizados** para reutilizar lógica. El hipopótamo crea su propio hook para nadar! 🦛",
      instruction: "Crea un hook personalizado \`useNadar\` que retorne \`{ nadando, empezarNadar }\`. Luego úsalo en un componente \`Hipopotamo\`.",
      initialCode: `// Hook personalizado:\n// function useNadar() {\n//   const [nadando, setNadando] = useState(false);\n//   const empezarNadar = () => setNadando(true);\n//   return { nadando, empezarNadar };\n// }\n\n// function Hipopotamo() {\n//   const { nadando, empezarNadar } = useNadar();\n//   return (\n//     <div>\n//       <p>{nadando ? 'Nadando' : 'En tierra'} 🦛</p>\n//       <button onClick={empezarNadar}>Nadar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Hipopótamo creado");`,
      validationLogic: (code, logs) => {
          const hasCustomHook = code.includes("function useNadar") || code.includes("const useNadar");
          const hasUsage = code.includes("useNadar()");
          return {
              success: hasCustomHook && hasUsage,
              message: "🦛 ¡Agua! ¡Tu hipopótamo tiene hook personalizado! ¡Hooks custom dominados!"
          };
      }
  },
  {
      id: 145,
      title: "React 25: El Flamenco Elegante",
      icon: "fa-flamingo",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **contexto** con \`createContext\` y \`useContext\` para compartir datos. El flamenco comparte su elegancia con todos! 🦩",
      instruction: "Crea un contexto \`EleganteContext\` con \`createContext\` y úsalo en un componente \`Flamenco\` con \`useContext\`.",
      initialCode: `// Context API:\n// import { createContext, useContext } from 'react';\n// const EleganteContext = createContext("Elegante");\n\n// function Flamenco() {\n//   const elegante = useContext(EleganteContext);\n//   return <p>{elegante} 🦩</p>;\n// }\n\n// function App() {\n//   return (\n//     <EleganteContext.Provider value="Soy elegante">\n//       <Flamenco />\n//     </EleganteContext.Provider>\n//   );\n// }\n\n// console.log("Flamenco creado");`,
      validationLogic: (code, logs) => {
          const hasCreateContext = code.includes("createContext");
          const hasUseContext = code.includes("useContext");
          const hasProvider = code.includes("Provider");
          return {
              success: hasCreateContext && hasUseContext && hasProvider,
              message: "🦩 ¡Elegante! ¡Tu flamenco usa contexto! ¡Context API dominado!"
          };
      }
  },
  {
      id: 146,
      title: "React 26: El Erizo Espinoso",
      icon: "fa-hedgehog",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **useReducer** para manejar estados complejos. El erizo tiene muchas espinas (estados) que necesita organizar! 🦔",
      instruction: "Crea un componente \`Erizo\` con \`useReducer\` que tenga acciones 'agregar' y 'quitar' espinas. Usa \`const [espinas, dispatch] = useReducer(...)\`",
      initialCode: `// useReducer básico:\n// import { useReducer } from 'react';\n// function reducer(estado, accion) {\n//   switch(accion.tipo) {\n//     case 'agregar': return estado + 1;\n//     case 'quitar': return Math.max(0, estado - 1);\n//     default: return estado;\n//   }\n// }\n\n// function Erizo() {\n//   const [espinas, dispatch] = useReducer(reducer, 0);\n//   return (\n//     <div>\n//       <p>Espinas: {espinas} 🦔</p>\n//       <button onClick={() => dispatch({ tipo: 'agregar' })}>Agregar</button>\n//       <button onClick={() => dispatch({ tipo: 'quitar' })}>Quitar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Erizo creado");`,
      validationLogic: (code, logs) => {
          const hasUseReducer = code.includes("useReducer");
          const hasReducer = code.includes("function reducer") || code.includes("const reducer");
          const hasDispatch = code.includes("dispatch");
          return {
              success: hasUseReducer && hasReducer && hasDispatch,
              message: "🦔 ¡Espinas! ¡Tu erizo usa reducer! ¡useReducer dominado!"
          };
      }
  },
  {
      id: 147,
      title: "React 27: El Búho Sabio",
      icon: "fa-owl",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **lazy loading** con \`React.lazy\` y \`Suspense\` para cargar componentes cuando se necesiten. El búho es sabio y carga solo lo necesario! 🦉",
      instruction: "Crea un componente \`Buho\` con \`React.lazy\` y envuélvelo en \`Suspense\` con un fallback 'Cargando...'",
      initialCode: `// Lazy loading:\n// import { lazy, Suspense } from 'react';\n// const Buho = lazy(() => Promise.resolve({ default: () => <p>Búho sabio 🦉</p> }));\n\n// function App() {\n//   return (\n//     <Suspense fallback={<p>Cargando...</p>}>\n//       <Buho />\n//     </Suspense>\n//   );\n// }\n\n// console.log("Búho creado");`,
      validationLogic: (code, logs) => {
          const hasLazy = code.includes("lazy(") || code.includes("React.lazy");
          const hasSuspense = code.includes("Suspense");
          const hasFallback = code.includes("fallback");
          return {
              success: hasLazy && hasSuspense && hasFallback,
              message: "🦉 ¡Sabio! ¡Tu búho carga lazy! ¡Lazy loading dominado!"
          };
      }
  },
  {
      id: 148,
      title: "React 28: El Pato que Nada",
      icon: "fa-duck",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **memo** para evitar re-renders innecesarios. El pato solo se actualiza cuando es necesario! 🦆",
      instruction: "Crea un componente \`Pato\` envuelto en \`React.memo\`. El componente debe recibir props y solo re-renderizarse si las props cambian.",
      initialCode: `// React.memo:\n// import { memo } from 'react';\n// const Pato = memo(function Pato({ nombre }) {\n//   console.log("Pato renderizado");\n//   return <p>{nombre} 🦆</p>;\n// });\n\n// function App() {\n//   const [contador, setContador] = useState(0);\n//   return (\n//     <div>\n//       <p>Contador: {contador}</p>\n//       <button onClick={() => setContador(contador + 1)}>Incrementar</button>\n//       <Pato nombre="Donald" />\n//     </div>\n//   );\n// }\n\n// console.log("Pato creado");`,
      validationLogic: (code, logs) => {
          const hasMemo = code.includes("memo(") || code.includes("React.memo");
          const hasComponent = code.includes("function Pato") || code.includes("const Pato");
          return {
              success: hasMemo && hasComponent,
              message: "🦆 ¡Nada! ¡Tu pato usa memo! ¡Optimización dominada!"
          };
      }
  },
  {
      id: 149,
      title: "React 29: El Conejo Veloz",
      icon: "fa-rabbit",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **forwardRef** para pasar refs a componentes hijos. El conejo es veloz y necesita pasar referencias! 🐰",
      instruction: "Crea un componente \`Conejo\` con \`forwardRef\` que reciba una ref y la pase a un input. Usa \`const Conejo = forwardRef((props, ref) => { ... })\`",
      initialCode: `// forwardRef:\n// import { forwardRef } from 'react';\n// const Conejo = forwardRef((props, ref) => {\n//   return <input ref={ref} placeholder="Conejo veloz 🐰" />;\n// });\n\n// function App() {\n//   const inputRef = useRef(null);\n//   return (\n//     <div>\n//       <Conejo ref={inputRef} />\n//       <button onClick={() => inputRef.current.focus()}>Enfocar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Conejo creado");`,
      validationLogic: (code, logs) => {
          const hasForwardRef = code.includes("forwardRef");
          const hasRefParam = code.includes("(props, ref)") || code.includes("(props,ref)");
          return {
              success: hasForwardRef && hasRefParam,
              message: "🐰 ¡Veloz! ¡Tu conejo usa forwardRef! ¡Refs avanzados dominados!"
          };
      }
  },
  {
      id: 150,
      title: "React 30: El Pez Dorado",
      icon: "fa-fish",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **portales** con \`createPortal\` para renderizar fuera del árbol DOM. El pez puede nadar fuera de su pecera! 🐠",
      instruction: "Crea un componente \`Pez\` que use \`createPortal\` para renderizar un mensaje fuera del componente. Usa \`import { createPortal } from 'react-dom'\`",
      initialCode: `// Portal:\n// import { createPortal } from 'react-dom';\n// function Pez() {\n//   return (\n//     <div>\n//       <p>Pez en la pecera 🐠</p>\n//       {createPortal(\n//         <p>Pez fuera de la pecera 🐠</p>,\n//         document.body\n//       )}\n//     </div>\n//   );\n// }\n\n// console.log("Pez creado");`,
      validationLogic: (code, logs) => {
          const hasCreatePortal = code.includes("createPortal");
          const hasReactDom = code.includes("react-dom");
          return {
              success: hasCreatePortal && hasReactDom,
              message: "🐠 ¡Nada! ¡Tu pez usa portales! ¡Portales dominados!"
          };
      }
  },
  {
      id: 151,
      title: "React 31: La Ardilla Acumuladora",
      icon: "fa-squirrel",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos combinar múltiples hooks. La ardilla acumula nueces (datos) usando varios hooks a la vez! 🐿️",
      instruction: "Crea un componente \`Ardilla\` que use \`useState\`, \`useEffect\`, y \`useMemo\` juntos. Acumula 'nueces' y muestra el total.",
      initialCode: `// Múltiples hooks:\n// import { useState, useEffect, useMemo } from 'react';\n// function Ardilla() {\n//   const [nueces, setNueces] = useState(0);\n//   useEffect(() => {\n//     console.log("Nueces cambiaron:", nueces);\n//   }, [nueces]);\n//   const total = useMemo(() => nueces * 2, [nueces]);\n//   return (\n//     <div>\n//       <p>Nueces: {nueces}, Total: {total} 🐿️</p>\n//       <button onClick={() => setNueces(nueces + 1)}>Agregar nuez</button>\n//     </div>\n//   );\n// }\n\n// console.log("Ardilla creada");`,
      validationLogic: (code, logs) => {
          const hasUseState = code.includes("useState");
          const hasUseEffect = code.includes("useEffect");
          const hasUseMemo = code.includes("useMemo");
          return {
              success: hasUseState && hasUseEffect && hasUseMemo,
              message: "🐿️ ¡Acumula! ¡Tu ardilla usa múltiples hooks! ¡Combinación dominada!"
          };
      }
  },
  {
      id: 152,
      title: "React 32: El Mapache Nocturno",
      icon: "fa-raccoon",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos crear **componentes controlados** donde el estado controla el input. El mapache controla todo de noche! 🦝",
      instruction: "Crea un componente \`Mapache\` con un input controlado. Usa \`value\` y \`onChange\` para controlar completamente el input.",
      initialCode: `// Componente controlado:\n// import { useState } from 'react';\n// function Mapache() {\n//   const [valor, setValor] = useState("");\n//   return (\n//     <div>\n//       <input\n//         value={valor}\n//         onChange={(e) => setValor(e.target.value)}\n//         placeholder="Mapache 🦝"\n//       />\n//       <p>Valor: {valor}</p>\n//     </div>\n//   );\n// }\n\n// console.log("Mapache creado");`,
      validationLogic: (code, logs) => {
          const hasValue = code.includes("value={") || code.includes("value =");
          const hasOnChange = code.includes("onChange=");
          const hasSetState = code.includes("setValor") || code.includes("setState");
          return {
              success: hasValue && hasOnChange && hasSetState,
              message: "🦝 ¡Nocturno! ¡Tu mapache controla perfecto! ¡Componentes controlados dominados!"
          };
      }
  },
  {
      id: 153,
      title: "React 33: El Loro Parlanchín",
      icon: "fa-parrot",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **formularios** en React. El loro quiere un formulario para repetir lo que dice! 🦜",
      instruction: "Crea un componente \`Loro\` con un formulario que tenga un input y un botón submit. Usa \`onSubmit\` y \`preventDefault\`.",
      initialCode: `// Formulario:\n// import { useState } from 'react';\n// function Loro() {\n//   const [mensaje, setMensaje] = useState("");\n//   const handleSubmit = (e) => {\n//     e.preventDefault();\n//     console.log("El loro dice:", mensaje);\n//   };\n//   return (\n//     <form onSubmit={handleSubmit}>\n//       <input\n//         value={mensaje}\n//         onChange={(e) => setMensaje(e.target.value)}\n//         placeholder="¿Qué dice el loro? 🦜"\n//       />\n//       <button type="submit">Repetir</button>\n//     </form>\n//   );\n// }\n\n// console.log("Loro creado");`,
      validationLogic: (code, logs) => {
          const hasForm = code.includes("<form");
          const hasOnSubmit = code.includes("onSubmit=");
          const hasPreventDefault = code.includes("preventDefault");
          return {
              success: hasForm && hasOnSubmit && hasPreventDefault,
              message: "🦜 ¡Parlanchín! ¡Tu loro usa formularios! ¡Forms dominados!"
          };
      }
  },
  {
      id: 154,
      title: "React 34: El Cangrejo Ermitaño",
      icon: "fa-hermit-crab",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **render props** para compartir lógica. El cangrejo ermitaño comparte su casita (lógica) con otros! 🦀",
      instruction: "Crea un componente \`CangrejoErmitano\` que use render props. El componente debe recibir una función \`render\` y llamarla con datos.",
      initialCode: `// Render props:\n// function CangrejoErmitano({ render }) {\n//   const casita = "Cómoda";\n//   return render(casita);\n// }\n\n// function App() {\n//   return (\n//     <CangrejoErmitano\n//       render={(casita) => <p>Mi casita es {casita} 🦀</p>}\n//     />\n//   );\n// }\n\n// console.log("Cangrejo ermitaño creado");`,
      validationLogic: (code, logs) => {
          const hasRender = code.includes("render");
          const hasRenderCall = code.includes("render(") || code.includes("render (");
          return {
              success: hasRender && hasRenderCall,
              message: "🦀 ¡Ermitaño! ¡Tu cangrejo usa render props! ¡Patrón dominado!"
          };
      }
  },
  {
      id: 155,
      title: "React 35: El Unicornio Mágico",
      icon: "fa-unicorn",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **Higher Order Components (HOC)** para envolver componentes. El unicornio es mágico y puede dar superpoderes a otros! 🦄",
      instruction: "Crea un HOC \`conMagia\` que envuelva un componente y le agregue una prop \`magico\`. Luego úsalo en un componente \`Unicornio\`.",
      initialCode: `// HOC:\n// function conMagia(Componente) {\n//   return function ComponenteMagico(props) {\n//     return <Componente {...props} magico={true} />;\n//   };\n// }\n\n// function Unicornio({ magico }) {\n//   return <p>{magico ? 'Mágico' : 'Normal'} 🦄</p>;\n// }\n\n// const UnicornioMagico = conMagia(Unicornio);\n\n// console.log("Unicornio creado");`,
      validationLogic: (code, logs) => {
          const hasHOC = code.includes("function conMagia") || code.includes("const conMagia");
          const hasSpread = code.includes("{...props}");
          return {
              success: hasHOC && hasSpread,
              message: "🦄 ¡Mágico! ¡Tu unicornio usa HOC! ¡HOCs dominados!"
          };
      }
  },
  {
      id: 156,
      title: "React 36: El Dragón Feroz",
      icon: "fa-dragon",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos usar **error boundaries** con \`componentDidCatch\` para manejar errores. El dragón protege contra errores! 🐉",
      instruction: "Crea un componente \`Dragon\` que sea un error boundary. Usa \`class ErrorBoundary extends React.Component\` con \`componentDidCatch\`.",
      initialCode: `// Error Boundary:\n// class ErrorBoundary extends React.Component {\n//   constructor(props) {\n//     super(props);\n//     this.state = { hasError: false };\n//   }\n//   static getDerivedStateFromError(error) {\n//     return { hasError: true };\n//   }\n//   componentDidCatch(error, errorInfo) {\n//     console.log("Error capturado:", error);\n//   }\n//   render() {\n//     if (this.state.hasError) {\n//       return <p>Algo salió mal 🐉</p>;\n//     }\n//     return this.props.children;\n//   }\n// }\n\n// console.log("Dragón creado");`,
      validationLogic: (code, logs) => {
          const hasClass = code.includes("class ErrorBoundary") || code.includes("extends");
          const hasComponentDidCatch = code.includes("componentDidCatch");
          return {
              success: hasClass && hasComponentDidCatch,
              message: "🐉 ¡Feroz! ¡Tu dragón captura errores! ¡Error boundaries dominados!"
          };
      }
  },
  {
      id: 157,
      title: "React 37: El Fénix que Renace",
      icon: "fa-phoenix",
      color: "pink",
      type: "react",
      section: "react",
      description: "Podemos usar **lifecycle methods** en componentes de clase. El fénix renace en cada ciclo de vida! 🦅",
      instruction: "Crea un componente de clase \`Fenix\` con \`componentDidMount\`, \`componentDidUpdate\`, y \`componentWillUnmount\`.",
      initialCode: `// Lifecycle methods:\n// class Fenix extends React.Component {\n//   componentDidMount() {\n//     console.log("Fénix montado 🦅");\n//   }\n//   componentDidUpdate() {\n//     console.log("Fénix actualizado 🦅");\n//   }\n//   componentWillUnmount() {\n//     console.log("Fénix desmontado 🦅");\n//   }\n//   render() {\n//     return <p>Fénix 🦅</p>;\n//   }\n// }\n\n// console.log("Fénix creado");`,
      validationLogic: (code, logs) => {
          const hasDidMount = code.includes("componentDidMount");
          const hasDidUpdate = code.includes("componentDidUpdate");
          const hasWillUnmount = code.includes("componentWillUnmount");
          return {
              success: hasDidMount && hasDidUpdate && hasWillUnmount,
              message: "🦅 ¡Renace! ¡Tu fénix usa lifecycle! ¡Lifecycle dominado!"
          };
      }
  },
  {
      id: 158,
      title: "React 38: El Grillo Cantor",
      icon: "fa-cricket",
      color: "purple",
      type: "react",
      section: "react",
      description: "Podemos usar **custom hooks** para compartir lógica entre componentes. El grillo canta la misma canción en diferentes lugares! 🦗",
      instruction: "Crea un custom hook \`useCantar\` que retorne \`{ cancion, cambiarCancion }\`. Luego úsalo en un componente \`Grillo\`.",
      initialCode: `// Custom hook:\n// function useCantar() {\n//   const [cancion, setCancion] = useState("Cri cri");\n//   const cambiarCancion = (nueva) => setCancion(nueva);\n//   return { cancion, cambiarCancion };\n// }\n\n// function Grillo() {\n//   const { cancion, cambiarCancion } = useCantar();\n//   return (\n//     <div>\n//       <p>{cancion} 🦗</p>\n//       <button onClick={() => cambiarCancion("Nueva canción")}>Cambiar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Grillo creado");`,
      validationLogic: (code, logs) => {
          const hasCustomHook = code.includes("function useCantar") || code.includes("const useCantar");
          const hasUsage = code.includes("useCantar()");
          return {
              success: hasCustomHook && hasUsage,
              message: "🦗 ¡Canta! ¡Tu grillo usa custom hook! ¡Hooks personalizados dominados!"
          };
      }
  },
  {
      id: 159,
      title: "React 39: El Colibrí Veloz",
      icon: "fa-hummingbird",
      color: "teal",
      type: "react",
      section: "react",
      description: "Podemos optimizar con **React.memo** y comparadores personalizados. El colibrí es tan veloz que solo se actualiza cuando es necesario! 🐦",
      instruction: "Crea un componente \`Colibri\` con \`React.memo\` y una función comparadora personalizada. La función debe comparar props y decidir si re-renderizar.",
      initialCode: `// memo con comparador:\n// import { memo } from 'react';\n// const Colibri = memo(function Colibri({ velocidad }) {\n//   return <p>Velocidad: {velocidad} 🐦</p>;\n// }, (prevProps, nextProps) => {\n//   return prevProps.velocidad === nextProps.velocidad;\n// });\n\n// function App() {\n//   const [velocidad, setVelocidad] = useState(100);\n//   return (\n//     <div>\n//       <Colibri velocidad={velocidad} />\n//       <button onClick={() => setVelocidad(velocidad + 10)}>Acelerar</button>\n//     </div>\n//   );\n// }\n\n// console.log("Colibrí creado");`,
      validationLogic: (code, logs) => {
          const hasMemo = code.includes("memo(");
          const hasComparator = code.includes("(prevProps, nextProps)") || code.includes("prevProps") && code.includes("nextProps");
          return {
              success: hasMemo && hasComparator,
              message: "🐦 ¡Veloz! ¡Tu colibrí está optimizado! ¡Memo avanzado dominado!"
          };
      }
  },
  {
      id: 160,
      title: "React 40: El Zoológico Completo",
      icon: "fa-zoo",
      color: "purple",
      type: "react",
      section: "react",
      description: "¡Felicidades! 🎉 Has llegado al final de React. Ahora combina TODO lo aprendido: hooks, context, memo, formularios, y más. ¡Crea un zoológico completo con todos los animales!",
      instruction: "Crea un componente \`Zoologico\` que use múltiples componentes de animales, useState, useEffect, useContext, y formularios. Muestra al menos 3 animales diferentes con sus propias funcionalidades.",
      initialCode: `// Proyecto final - Zoológico:\n// import { useState, useEffect, createContext, useContext } from 'react';\n// const ZoologicoContext = createContext();\n\n// function Gatito({ nombre }) {\n//   return <p>{nombre} 🐱</p>;\n// }\n\n// function Perrito({ nombre }) {\n//   return <p>{nombre} 🐶</p>;\n// }\n\n// function Zoologico() {\n//   const [animales, setAnimales] = useState(["Gatito", "Perrito"]);\n//   useEffect(() => {\n//     console.log("Zoológico abierto");\n//   }, []);\n//   return (\n//     <ZoologicoContext.Provider value={{ animales }}>\n//       <div>\n//         <h1>Mi Zoológico 🦁</h1>\n//         {animales.map(animal => (\n//           animal === "Gatito" ? <Gatito key={animal} nombre="Miau" /> :\n//           <Perrito key={animal} nombre="Guau" />\n//         ))}\n//       </div>\n//     </ZoologicoContext.Provider>\n//   );\n// }\n\n// console.log("Zoológico completo creado");`,
      validationLogic: (code, logs) => {
          const hasMultipleComponents = (code.match(/function \w+/g) || []).length >= 3;
          const hasUseState = code.includes("useState");
          const hasUseEffect = code.includes("useEffect");
          const hasContext = code.includes("createContext") || code.includes("useContext");
          const hasMap = code.includes(".map(");
          return {
              success: hasMultipleComponents && hasUseState && hasUseEffect && (hasContext || hasMap),
              message: "🦁 🐱 🐶 🐰 🐻 🦊 🐼 🐨 🦘 🐘 🐧 🦁 🐺 🐅 🐴 🐻‍❄️ 🦀 🐙 🐪 🦛 🦩 🦔 🦉 🦆 🐰 🐠 🐿️ 🦝 🦜 🦀 🦄 🐉 🦅 🦗 🐦 ¡ZOOLOGICO COMPLETO! ¡ERES UNA EXPERTA EN REACT! 🎊🏆✨"
          };
      }
  }
];
