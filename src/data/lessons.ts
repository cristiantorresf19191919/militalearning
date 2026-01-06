export type LessonType = 'javascript' | 'html' | 'css';
export type LessonColor = 'purple' | 'pink' | 'teal';

export type Lesson = {
  id: number;
  title: string;
  icon: string;
  color: LessonColor;
  type: LessonType;
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
      description: "Los textos (strings) tienen superpoderes. Puedes convertirlos a mayúsculas con \`toUpperCase()\`, a minúsculas con \`toLowerCase()\`, y más cosas chéveres.",
      instruction: "Convierte el texto \`"Hola Mundo"\` a mayúsculas y también obtén su longitud con \`.length\`.",
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
  }
];
