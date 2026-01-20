"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import * as Babel from "@babel/standalone";
import { buildPokemonPreviewHTML } from "@/lib/buildPokemonPreviewHTML";
import styles from "./page.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className={styles.editorLoader}>Cargando el editor...</div>,
});

const serverCode = `// server.js — Backend con Node.js y Express
// Ejecuta: npm init -y && npm install express
// Luego: node server.js

const express = require("express");
const app = express();

// Middleware: permite leer el cuerpo de la petición en JSON
app.use(express.json());

// Base de datos en memoria (solo para aprender)
let users = [
  { id: 1, name: "Milita", email: "milita@example.com" },
  { id: 2, name: "Gorilín", email: "gorilin@example.com" },
];

// ——— GET: Leer/obtener recursos ———
// Obtener todos los usuarios
app.get("/api/users", (req, res) => {
  res.json({ success: true, data: users });
});

// Obtener un usuario por ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: "Usuario no encontrado" });
  }
  res.json({ success: true, data: user });
});

// ——— POST: Crear un nuevo recurso ———
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Faltan name o email" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// ——— PUT: Actualizar un recurso existente ———
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Usuario no encontrado" });
  }
  users[index] = { ...users[index], ...(name && { name }), ...(email && { email }) };
  res.json({ success: true, data: users[index] });
});

// ——— DELETE: Eliminar un recurso ———
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Usuario no encontrado" });
  }
  users.splice(index, 1);
  res.json({ success: true, message: "Usuario eliminado" });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
`;

const clientCode = `// frontend.js — Cómo el Frontend habla con el Backend
// Usa fetch() para enviar peticiones a los endpoints del backend.
// La URL base: http://localhost:3000 (donde corre tu server.js)

const API = "http://localhost:3000/api";

// ——— GET: Obtener datos ———
async function getUsers() {
  const res = await fetch(API + "/users");
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error al obtener");
  return json.data;
}

async function getUser(id) {
  const res = await fetch(API + "/users/" + id);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error");
  return json.data;
}

// ——— POST: Crear (enviamos JSON en el body) ———
async function createUser(name, email) {
  const res = await fetch(API + "/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error al crear");
  return json.data;
}

// ——— PUT: Actualizar ———
async function updateUser(id, data) {
  const res = await fetch(API + "/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error al actualizar");
  return json.data;
}

// ——— DELETE: Eliminar ———
async function deleteUser(id) {
  const res = await fetch(API + "/users/" + id, { method: "DELETE" });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Error al eliminar");
  return json;
}

// Ejemplo: al enviar un formulario
// const user = await createUser("Milita", "milita@example.com");
// console.log("Creado:", user);
`;

const axiosCode = `// 🍌 React + Axios — "La lista de súper devs de Gorilín"
// npm install axios
// Axios: mismo fetch pero con esteroides. JSON automático, interceptores, mejor manejo de errores.

import axios from "axios";
import { useState, useEffect } from "react";

// 1) Crear una instancia: baseURL + headers por defecto. ¡No repitas la URL en cada llamada!
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

// 2) Opcional: interceptor para loguear o manejar errores globales
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.warn("🍌 Gorilín dice: algo falló en la API", err.response?.data);
    return Promise.reject(err);
  }
);

export function UserListAxios() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET al montar: carga la lista
  useEffect(() => {
    let cancelled = false;
    api.get("/users")
      .then((res) => { if (!cancelled) setUsers(res.data.data); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // POST: crear y actualizar estado local (evitas un GET extra si el backend devuelve el nuevo)
  const addUser = async (name, email) => {
    setError(null);
    try {
      const { data } = await api.post("/users", { name, email });
      setUsers((prev) => [...prev, data.data]);
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  // DELETE: borrar y filtrar en estado
  const removeUser = async (id) => {
    try {
      await api.delete("/users/" + id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      setError(e.response?.data?.error || e.message);
    }
  };

  if (loading) return <p>Cargando... 🦍</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>
          {u.name} — {u.email}
          <button onClick={() => removeUser(u.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}

// Best practice: centraliza la API en un archivo (api.js) y los hooks en otro (useUsers.js).
`;

const reactQueryCode = `// 🚀 React Query (TanStack Query) — Nivel full-stack pro
// npm install @tanstack/react-query
// React Query: caché, refetch automático, loading/error integrados, y mutaciones que actualizan la UI sin volver a pedir.

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

// ——— useQuery: para GET. Gestiona loading, error, caché y refetch. ———
function useUsers() {
  return useQuery({
    queryKey: ["users"],           // Identificador de la caché. Mismo key = mismos datos.
    queryFn: async () => {
      const { data } = await api.get("/users");
      return data.data;
    },
    staleTime: 5 * 60 * 1000,      // 5 min: no refetch si los datos son "frescos".
  });
}

// ——— useMutation: para POST, PUT, DELETE. onSuccess → invalidar caché y la UI se actualiza sola. ———
function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => api.post("/users", user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // La query "users" se marca obsoleta y se vuelve a ejecutar. ¡Lista actualizada sin tu ayuda!
    },
  });
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete("/users/" + id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

// ——— Componente: sin useState de loading/error ni useEffect. React Query lo hace. ———
function UserListReactQuery() {
  const { data: users, isLoading, error } = useUsers();
  const addMutation = useAddUser();
  const deleteMutation = useDeleteUser();

  const handleAdd = () => addMutation.mutate({ name: "Nuevo", email: "nuevo@mail.com" });
  const handleDelete = (id) => deleteMutation.mutate(id);

  if (isLoading) return <p>Cargando... 🚀</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ul>
      {users?.map((u) => (
        <li key={u.id}>
          {u.name} — {u.email}
          <button onClick={() => handleDelete(u.id)} disabled={deleteMutation.isPending}>Eliminar</button>
        </li>
      ))}
      <li><button onClick={handleAdd} disabled={addMutation.isPending}>➕ Añadir</button></li>
    </ul>
  );
}

// No olvides envolver la app: <QueryClientProvider client={new QueryClient()}> ... </QueryClientProvider>
`;

const POKEMON_DEFAULT_API = `import axios from "axios";

const POKE_API = "https://pokeapi.co/api/v2";

// api/pokemon.js — En un proyecto real: archivo aparte. Al concatenar, fetchPokemonList queda en el scope.
const fetchPokemonList = async (limit = 20) => {
  const { data } = await axios.get(POKE_API + "/pokemon?limit=" + limit);
  return data.results;
};
`;

const POKEMON_DEFAULT_HOOK = `import React from "react";

// hooks/usePokemon.js — Custom hook: separa la lógica de la API del componente. Best practice.
const usePokemon = (limit = 20) => {
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState(null);
  React.useEffect(() => {
    let cancelled = false;
    fetchPokemonList(limit)
      .then((r) => { if (!cancelled) setList(r); })
      .catch((e) => { if (!cancelled) setErr(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [limit]);
  return { list, loading, err };
};
`;

const POKEMON_DEFAULT_APP = `import React from "react";

const PokemonCard = ({ name, url }) => {
  const id = url.split("/").filter(Boolean).pop() || "1";
  const img = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png";
  return (
    <div className="pokemon-card">
      <img src={img} alt={name} />
      <span>{name}</span>
    </div>
  );
};

const App = () => {
  const { list, loading, err } = usePokemon(12);
  if (loading) return <p className="pokemon-loading">Cargando Pokémon... 🦍</p>;
  if (err) return <p className="pokemon-err">Error: {err}</p>;
  return (
    <div className="pokemon-grid">
      {list.map((p) => (
        <PokemonCard key={p.name} name={p.name} url={p.url} />
      ))}
    </div>
  );
};

export default App;
`;

export default function BackendPage() {
  const [serverCodeState, setServerCodeState] = useState(serverCode);
  const [clientCodeState, setClientCodeState] = useState(clientCode);
  const [axiosCodeState, setAxiosCodeState] = useState(axiosCode);
  const [reactQueryCodeState, setReactQueryCodeState] = useState(reactQueryCode);

  const [pokemonFiles, setPokemonFiles] = useState({ api: POKEMON_DEFAULT_API, usePokemon: POKEMON_DEFAULT_HOOK, App: POKEMON_DEFAULT_APP });
  const [pokemonTab, setPokemonTab] = useState<"api" | "usePokemon" | "App">("api");
  const [pokemonPreviewHtml, setPokemonPreviewHtml] = useState("");
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  const [isPokemonRunning, setIsPokemonRunning] = useState(false);

  const compilePokemon = useCallback((override?: { api: string; usePokemon: string; App: string }) => {
    setIsPokemonRunning(true);
    setPokemonError(null);
    try {
      const files = override || pokemonFiles;
      const concat = files.api + "\n\n" + files.usePokemon + "\n\n" + files.App;
      const result = Babel.transform(concat, {
        presets: [
          ["env", { modules: "commonjs" }],
          ["react", { runtime: "classic" }],
        ],
        sourceType: "module",
        filename: "App.jsx",
      }).code;
      if (!result) throw new Error("No se pudo compilar.");
      setPokemonPreviewHtml(buildPokemonPreviewHTML(result));
    } catch (e: unknown) {
      setPokemonError(e instanceof Error ? e.message : String(e));
      setPokemonPreviewHtml("");
    } finally {
      setIsPokemonRunning(false);
    }
  }, [pokemonFiles]);

  useEffect(() => {
    compilePokemon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        compilePokemon();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compilePokemon]);

  const setPokemonFile = useCallback((tab: "api" | "usePokemon" | "App", code: string) => {
    setPokemonFiles((prev) => ({ ...prev, [tab]: code }));
  }, []);

  const resetPokemon = useCallback(() => {
    setPokemonFiles({ api: POKEMON_DEFAULT_API, usePokemon: POKEMON_DEFAULT_HOOK, App: POKEMON_DEFAULT_APP });
    setPokemonError(null);
    const def = { api: POKEMON_DEFAULT_API, usePokemon: POKEMON_DEFAULT_HOOK, App: POKEMON_DEFAULT_APP };
    setTimeout(() => compilePokemon(def), 0);
  }, [compilePokemon]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Backend & APIs</p>
        <h1 className={styles.title}>
          Cómo se comunican el Frontend y el Backend
        </h1>
        <p className={styles.subtitle}>
          Aprende endpoints, REST API, GET, POST, PUT, DELETE con Node.js, <code>fetch</code>,{" "}
          <code>Axios</code> en React y <code>React Query</code> para ser full‑stack. De cero, sin aburrirte 🍌
        </p>
      </section>

      <div className={styles.content}>
        {/* ——— THE BIG PICTURE ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>El panorama: Frontend, Backend y API</h2>
          <div className={styles.sectionBody}>
            <p>
              <strong>Frontend</strong> es lo que el usuario ve y toca: botones, formularios, textos.
              Se ejecuta en el navegador (HTML, CSS, JavaScript, React).
            </p>
            <p>
              <strong>Backend</strong> es el servidor: recibe peticiones, procesa datos, guarda en base de datos
              y devuelve respuestas. No lo ve el usuario; trabaja “detrás”.
            </p>
            <p>
              <strong>API</strong> (Application Programming Interface) es el “contrato” entre ambos:
              un conjunto de <strong>endpoints</strong> (URLs) a los que el frontend envía peticiones
              y de los que recibe respuestas, casi siempre en <strong>JSON</strong>.
            </p>
          </div>
          <div className={styles.imgWrap}>
            <Image
              src="/backend/frontendCommunicatesBackend.webp"
              alt="El frontend y el backend se comunican a través de una API"
              width={900}
              height={500}
              unoptimized
            />
            <p className={styles.imgCaption}>
              El frontend envía peticiones al backend; el backend responde. La API define las reglas.
            </p>
          </div>
          <div className={styles.imgWrap}>
            <Image
              src="/backend/FrontendUsesRestAPI.jpg"
              alt="El frontend usa una REST API para obtener y enviar datos"
              width={900}
              height={500}
            />
            <p className={styles.imgCaption}>
              El frontend usa la REST API para leer, crear, actualizar y borrar datos.
            </p>
          </div>
        </section>

        {/* ——— HTTP METHODS ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Métodos HTTP y CRUD</h2>
          <div className={styles.sectionBody}>
            <p>
              Cada petición usa un <strong>método HTTP</strong> que indica la intención:
            </p>
            <ul className={styles.ul}>
              <li><strong>GET</strong> — Leer/obtener. No envía cuerpo. Ej: listar usuarios, ver un detalle.</li>
              <li><strong>POST</strong> — Crear. Envía datos en el cuerpo (JSON). Ej: registrar usuario, enviar formulario.</li>
              <li><strong>PUT</strong> — Actualizar (reemplazar). Envía los nuevos datos en el cuerpo.</li>
              <li><strong>DELETE</strong> — Eliminar. Normalmente sin cuerpo.</li>
            </ul>
            <p>
              Esto se conoce como <strong>CRUD</strong>: Create (POST), Read (GET), Update (PUT), Delete (DELETE).
            </p>
          </div>
          <div className={styles.imgWrap}>
            <Image
              src="/backend/HttpMethods.png"
              alt="Correspondencia entre CRUD y los métodos HTTP: Create→POST, Read→GET, Update→PUT, Delete→DELETE"
              width={900}
              height={400}
            />
            <p className={styles.imgCaption}>
              CRUD y métodos HTTP: cada acción tiene su verbo.
            </p>
          </div>
          <div className={styles.sectionBody}>
            <p>
              Un <strong>endpoint</strong> es una URL concreta: por ejemplo <code>GET /api/users</code> (listar)
              o <code>POST /api/users</code> (crear). El mismo path puede tener distintos métodos:{" "}
              <code>GET /api/users/1</code> (leer uno), <code>PUT /api/users/1</code> (actualizar),{" "}
              <code>DELETE /api/users/1</code> (eliminar).
            </p>
            <p>
              Las respuestas incluyen un <strong>código de estado HTTP</strong>: <code>200</code> (éxito, GET/PUT/DELETE),
              <code>201</code> (creado, POST), <code>400</code> (petición mal formada), <code>404</code> (recurso no encontrado).
              El frontend usa <code>res.ok</code> o <code>res.status</code> para decidir si todo fue bien.
            </p>
          </div>
          <table className={styles.endpointTable}>
            <thead>
              <tr>
                <th>Método</th>
                <th>Endpoint</th>
                <th>Qué hace</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={styles.get}>GET</td><td><code>/api/users</code></td><td>Listar todos</td></tr>
              <tr><td className={styles.get}>GET</td><td><code>/api/users/:id</code></td><td>Obtener uno</td></tr>
              <tr><td className={styles.post}>POST</td><td><code>/api/users</code></td><td>Crear uno</td></tr>
              <tr><td className={styles.put}>PUT</td><td><code>/api/users/:id</code></td><td>Actualizar uno</td></tr>
              <tr><td className={styles.delete}>DELETE</td><td><code>/api/users/:id</code></td><td>Eliminar uno</td></tr>
            </tbody>
          </table>
        </section>

        {/* ——— THE 5-STEP FLOW ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>El flujo completo, paso a paso</h2>
          <div className={styles.sectionBody}>
            <p>
              Imagina que el usuario llena un formulario para registrarse. Así es el camino de los datos:
            </p>
          </div>

          <div className={styles.stepGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>1</span>
                <h3 className={styles.stepTitle}>El usuario llena un formulario</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  En el frontend hay inputs: nombre, email, etc. El usuario escribe y pulsa “Enviar”.
                  Esos valores viven en el estado de React o en el DOM.
                </p>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>2</span>
                <h3 className={styles.stepTitle}>El frontend crea el JSON</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  Antes de enviar, el frontend convierte los datos del formulario en un objeto JavaScript
                  y luego en texto JSON con <code>JSON.stringify({`{ name, email }`})</code>.
                </p>
                <div className={styles.stepImg}>
                  <Image
                    src="/backend/theFrontEndCreatesTheJsonData.jpg"
                    alt="El frontend crea los datos en formato JSON"
                    width={800}
                    height={450}
                  />
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>3</span>
                <h3 className={styles.stepTitle}>El frontend envía la petición</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  Con <code>fetch(url, {`{ method: "POST", headers: { "Content-Type": "application/json" }, body: json }`})</code>
                  se envía la petición HTTP al endpoint del backend (ej: <code>POST /api/users</code>).
                </p>
                <div className={styles.stepImg}>
                  <Image
                    src="/backend/theFrontEndSendsTheRequest.jpg"
                    alt="El frontend envía la petición HTTP al backend"
                    width={800}
                    height={450}
                  />
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>4</span>
                <h3 className={styles.stepTitle}>El backend recibe, procesa y guarda</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  El servidor (Express) recibe la petición, lee <code>req.body</code>, valida los datos,
                  los guarda en base de datos (o en memoria) y prepara la respuesta.
                </p>
                <div className={styles.stepImg}>
                  <Image
                    src="/backend/theBackEndProcessesTheRequest.jpg"
                    alt="El backend procesa la petición y guarda en la base de datos"
                    width={800}
                    height={450}
                  />
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>5</span>
                <h3 className={styles.stepTitle}>El backend envía la respuesta</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  El backend responde con <code>res.status(201).json({`{ success: true, data: newUser }`})</code>.
                  Esa respuesta viaja por la red de vuelta al navegador.
                </p>
                <div className={styles.stepImg}>
                  <Image
                    src="/backend/theBackEndSendsAResponse.jpg"
                    alt="El backend envía la respuesta JSON al frontend"
                    width={800}
                    height={450}
                  />
                </div>
              </div>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepBadge}>6</span>
                <h3 className={styles.stepTitle}>El frontend actualiza la UI</h3>
              </div>
              <div className={styles.stepBody}>
                <p>
                  El frontend recibe la respuesta con <code>await res.json()</code>, actualiza el estado
                  (React, etc.) y la interfaz: mensaje de éxito, nueva fila en la lista, etc.
                </p>
                <div className={styles.stepImg}>
                  <Image
                    src="/backend/theFrontEndUpdatesTheUi.jpg"
                    alt="El frontend actualiza la interfaz con la respuesta del backend"
                    width={800}
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— CODE: BACKEND ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Código: Backend con Node.js y Express</h2>
          <div className={styles.sectionBody}>
            <p>
              En el backend usamos <strong>Express</strong> para definir rutas (endpoints). Cada ruta
              recibe <code>req</code> (petición) y <code>res</code> (respuesta). Con <code>req.body</code>
              leemos el JSON enviado en POST/PUT; con <code>res.json(...)</code> devolvemos JSON.
            </p>
            <p>
              <code>app.use(express.json())</code> es esencial para que Express parsee el cuerpo en JSON.
            </p>
          </div>
          <div className={styles.editorSection}>
            <div className={styles.editorLabel}>server.js — Edita y explora</div>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <div className={styles.pill}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.editorCardTitle}>server.js</span>
                <span className={styles.editorCardHint}>Node.js + Express</span>
              </div>
              <div className={styles.editorBody}>
                <MonacoEditor
                  language="javascript"
                  value={serverCodeState}
                  onChange={(v) => setServerCodeState(v || "")}
                  theme="vs-dark"
                  height="520px"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ——— CODE: FRONTEND (NIVEL 1) ——— */}
        <section className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>Código: Frontend con fetch</h2>
            <span className={styles.levelBadgeLevel1}>Nivel 1</span>
          </div>
          <div className={styles.sectionBody}>
            <p>
              En el frontend usamos <strong>fetch(url, options)</strong>. Para GET no hace falta <code>body</code>.
              Para POST y PUT: <code>method</code>, <code>headers: {`{ "Content-Type": "application/json" }`}</code>
              y <code>body: JSON.stringify(datos)</code>. Para leer la respuesta: <code>const json = await res.json()</code>.
            </p>
            <blockquote className={styles.blockquote}>
              Asegúrate de que el backend (server.js) esté corriendo en el puerto 3000 para que estas
              peticiones funcionen. Mismo origen (localhost) o CORS configurado si frontend y backend
              están en puertos distintos.
            </blockquote>
          </div>
          <div className={styles.editorSection}>
            <div className={styles.editorLabel}>frontend.js — Edita y explora</div>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <div className={styles.pill}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.editorCardTitle}>frontend.js</span>
                <span className={styles.editorCardHint}>fetch + async/await</span>
              </div>
              <div className={styles.editorBody}>
                <MonacoEditor
                  language="javascript"
                  value={clientCodeState}
                  onChange={(v) => setClientCodeState(v || "")}
                  theme="vs-dark"
                  height="420px"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ——— NIVEL 2: REACT + AXIOS ——— */}
        <section className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>React + Axios: estado y backend</h2>
            <span className={styles.levelBadge}>Nivel 2</span>
          </div>
          <div className={styles.sectionBody}>
            <p>
              <strong>Axios</strong> es una librería para hacer peticiones HTTP. ¿Por qué usarla si ya tenemos <code>fetch</code>?
              Parsea JSON por ti (<code>res.data</code> en vez de <code>res.json()</code>), lanza errores cuando <code>status {">"}= 400</code>,
              y tiene <strong>interceptores</strong> para loguear, añadir tokens o manejar errores en un solo sitio. En React, combinas Axios
              con <code>useState</code> y <code>useEffect</code> para guardar <code>data</code>, <code>loading</code> y <code>error</code>.
            </p>
            <p>
              <strong>Buena práctica:</strong> crea una instancia con <code>axios.create({`{ baseURL, headers }`})</code> y úsala en toda la app.
              Así no repites la URL ni los headers. Si un día añades un token JWT, lo pones en un interceptor y listo.
            </p>
          </div>
          <div className={styles.proTip}>
            <span className={styles.proTipIcon}>💡</span>
            <div>
              <strong>Pro tip:</strong> en <code>useEffect</code> haz <code>let cancelled = false</code> y en el <code>finally</code> solo
              actualices estado si <code>!cancelled</code>. En el cleanup: <code>cancelled = true</code>. Así evitas actualizar estado
              si el componente se desmontó antes de que llegue la respuesta (evitas memory leaks y warnings).
            </div>
          </div>
          <div className={styles.editorSection}>
            <div className={styles.editorLabel}>React + Axios — La lista de súper devs de Gorilín 🍌</div>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <div className={styles.pill}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.editorCardTitle}>UserListAxios.jsx</span>
                <span className={styles.editorCardHint}>axios + useState + useEffect</span>
              </div>
              <div className={styles.editorBody}>
                <MonacoEditor
                  language="javascript"
                  value={axiosCodeState}
                  onChange={(v) => setAxiosCodeState(v || "")}
                  theme="vs-dark"
                  height="540px"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ——— NIVEL 3: REACT QUERY ——— */}
        <section className={styles.section}>
          <div className={styles.sectionHeaderRow}>
            <h2 className={styles.sectionTitle}>React Query: caché, mutaciones y menos código</h2>
            <span className={styles.levelBadge}>Nivel 3</span>
          </div>
          <div className={styles.sectionBody}>
            <p>
              <strong>React Query</strong> (TanStack Query) es la evolución: ya no gestionas <code>loading</code>, <code>error</code> ni
              <code>useEffect</code> a mano. Con <code>useQuery</code> obtienes <code>data</code>, <code>isLoading</code>, <code>error</code> y
              <strong>caché</strong>: si dos componentes piden lo mismo, solo se hace una petición. Puedes definir <code>staleTime</code> para
              no refetchear todo el rato. Con <code>useMutation</code> haces POST/PUT/DELETE y en <code>onSuccess</code> llamas a{" "}
              <code>queryClient.invalidateQueries({`{ queryKey: ["users"] }`})</code> para marcar esos datos como obsoletos: React Query
              los vuelve a pedir y la UI se actualiza sola. Menos código, menos bugs, más tiempo para bananas.
            </p>
            <p>
              <strong>Best practices:</strong> usa <code>queryKey</code> como array (<code>["users"]</code>, <code>["users", id]</code>) para
              invalidar por recurso. Envuelve la app en <code>{"<QueryClientProvider client={new QueryClient()}>"}</code>. Sigue usando Axios
              (o fetch) dentro de <code>queryFn</code> y <code>mutationFn</code>; React Query solo orquesta.
            </p>
          </div>
          <div className={styles.proTip}>
            <span className={styles.proTipIcon}>🦍</span>
            <div>
              <strong>Gorilín dice:</strong> si tu formulario crea un usuario y el backend devuelve el objeto creado, en <code>onSuccess</code>
              puedes usar <code>{`queryClient.setQueryData(["users"], (old) => [...old, data.data])`}</code> para meterlo en caché sin hacer
              otro GET. ¡Más rápido y menos carga en el servidor!
            </div>
          </div>
          <div className={styles.editorSection}>
            <div className={styles.editorLabel}>React Query — useQuery + useMutation 🚀</div>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <div className={styles.pill}>
                  <span className={styles.dot} style={{ background: "#ff5f56" }} />
                  <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                  <span className={styles.dot} style={{ background: "#27c93f" }} />
                </div>
                <span className={styles.editorCardTitle}>UserListReactQuery.jsx</span>
                <span className={styles.editorCardHint}>@tanstack/react-query</span>
              </div>
              <div className={styles.editorBody}>
                <MonacoEditor
                  language="javascript"
                  value={reactQueryCodeState}
                  onChange={(v) => setReactQueryCodeState(v || "")}
                  theme="vs-dark"
                  height="560px"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ——— COMPARACIÓN: CUÁNDO USAR CADA UNO ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>¿Fetch, Axios o React Query? No te compliques</h2>
          <div className={styles.sectionBody}>
            <p>
              Depende de tu nivel y del proyecto. Aquí va la guía rápida para no perderse:
            </p>
          </div>
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonCardHeader}>
                <span className={styles.comparisonEmoji}>📦</span>
                <h3 className={styles.comparisonTitle}>fetch</h3>
              </div>
              <p>Nativo, cero deps. Ideal para: scripts, proyectos muy pequeños o cuando no quieres instalar nada. Tú controlas todo (y todo el loading/error).</p>
            </div>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonCardHeader}>
                <span className={styles.comparisonEmoji}>🍌</span>
                <h3 className={styles.comparisonTitle}>Axios</h3>
              </div>
              <p>JSON automático, interceptores, mejor DX. Ideal para: React con <code>useState</code>/<code>useEffect</code>, cuando quieres menos boilerplate que fetch pero sin añadir “magia”.</p>
            </div>
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonCardHeader}>
                <span className={styles.comparisonEmoji}>🚀</span>
                <h3 className={styles.comparisonTitle}>React Query</h3>
              </div>
              <p>Caché, refetch, mutaciones con invalidación. Ideal para: listados, dashboards, datos que se reutilizan en varias pantallas. Menos estado propio, más productividad.</p>
            </div>
          </div>
          <blockquote className={styles.blockquote}>
            En la vida real: <strong>fetch</strong> para cosas simples; <strong>Axios</strong> cuando te canses de <code>res.json()</code> y los interceptores;{" "}
            <strong>React Query</strong> cuando tengas listas, filtros y “¿y si el usuario vuelve atrás, tengo que cargar de nuevo?”. Muchos equipos usan Axios dentro de React Query: Axios para la petición, React Query para orquestar.
          </blockquote>

          {/* ——— ENTRY CARD: Nivel con esteroides ——— */}
          <a
            href="#pokemon-api"
            className={styles.entryCard}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("pokemon-api")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className={styles.entryCardEmoji}>💪</span>
            <div className={styles.entryCardBody}>
              <h3 className={styles.entryCardTitle}>Nivel Gorilín con esteroides: Pokemon API</h3>
              <p className={styles.entryCardText}>
                Axios, custom hooks, módulos separados (api, hooks, App) y <strong>preview en vivo</strong> que atrapa Pokemons de verdad. Si fetch fue el desayuno y React Query el gimnasio, esto es cuando Gorilín se pone la camiseta de “Full‑stack”.
              </p>
              <span className={styles.entryCardCta}>Ver el demo →</span>
            </div>
          </a>
        </section>

        {/* ——— POKEMON API: WORKBENCH CON PREVIEW ——— */}
        <section id="pokemon-api" className={styles.section}>
          <div className={styles.pokemonBlock}>
            <div className={styles.pokemonBlockHeader}>
              <div className={styles.sectionHeaderRow}>
                <h2 className={styles.sectionTitle}>Pokemon API: Axios, hooks y preview en vivo</h2>
                <span className={styles.levelBadgeSteroids}>Con esteroides 💪</span>
              </div>
              <p className={styles.pokemonBlockIntro}>
                Archivos separados (api, hook, App), Babel concatena y compila. El iframe carga React + Axios, pide a{" "}
                <code>https://pokeapi.co</code> y pinta los Pokemon. <strong>Ejecutar</strong> y <strong>Reset</strong> como en React Live.
              </p>
              <div className={styles.pokemonActions}>
                <button type="button" className={styles.runButton} onClick={() => compilePokemon()}>
                  <i className={`fas ${isPokemonRunning ? "fa-circle-notch fa-spin" : "fa-play"}`} />
                  {isPokemonRunning ? "Compilando…" : "Ejecutar (Ctrl+Enter)"}
                </button>
                <button type="button" className={styles.resetButton} onClick={resetPokemon}>
                  <i className="fas fa-undo" /> Reset
                </button>
              </div>
            </div>
            <div className={styles.pokemonWorkbench}>
              <div className={styles.pokemonEditorCol}>
                <div className={styles.pokemonTabs}>
                  {(["api", "usePokemon", "App"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      className={pokemonTab === t ? styles.pokemonTabActive : styles.pokemonTab}
                      onClick={() => setPokemonTab(t)}
                    >
                      {t === "api" ? "api.js" : t === "usePokemon" ? "usePokemon.js" : "App.jsx"}
                    </button>
                  ))}
                </div>
                <div className={styles.editorCard}>
                  <div className={styles.editorCardHeader}>
                    <div className={styles.pill}>
                      <span className={styles.dot} style={{ background: "#ff5f56" }} />
                      <span className={styles.dot} style={{ background: "#ffbd2e" }} />
                      <span className={styles.dot} style={{ background: "#27c93f" }} />
                    </div>
                    <span className={styles.editorCardTitle}>
                      {pokemonTab === "api" ? "api.js" : pokemonTab === "usePokemon" ? "usePokemon.js" : "App.jsx"}
                    </span>
                    <span className={styles.editorCardHint}>Módulos + Babel</span>
                  </div>
                  <div className={styles.editorBody}>
                    <MonacoEditor
                      language="javascript"
                      value={pokemonFiles[pokemonTab]}
                      onChange={(v) => setPokemonFile(pokemonTab, v || "")}
                      theme="vs-dark"
                      height="420px"
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        wordWrap: "on",
                        scrollBeyondLastLine: false,
                        tabSize: 2,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.pokemonPreviewCol}>
                <div className={styles.previewCard}>
                  <div className={styles.previewHeader}>
                    <span>Preview en vivo — PokeAPI</span>
                    {pokemonError ? (
                      <span className={styles.badgeError}>Error</span>
                    ) : (
                      <span className={styles.badgeOk}>🦍</span>
                    )}
                  </div>
                  <div className={styles.previewBody}>
                    {pokemonError ? (
                      <pre className={styles.errorBox}>{pokemonError}</pre>
                    ) : pokemonPreviewHtml ? (
                      <iframe
                        title="Pokemon API Preview"
                        className={styles.previewFrame}
                        srcDoc={pokemonPreviewHtml}
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <span className={styles.placeholder}>Ejecuta para cargar los Pokémon…</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ——— RESUMEN ——— */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumen rápido</h2>
          <div className={styles.sectionBody}>
            <ul className={styles.ul}>
              <li><strong>Endpoint</strong> = URL + método HTTP (ej: <code>GET /api/users</code>).</li>
              <li><strong>REST API</strong> = conjunto de endpoints que siguen CRUD (GET, POST, PUT, DELETE).</li>
              <li><strong>Backend</strong> (Express): <code>{`app.get/post/put/delete("ruta", (req, res) => { ... })`}</code>.</li>
              <li><strong>Frontend</strong>: <code>fetch</code> o <code>axios</code>; en React: <code>useState</code>+<code>useEffect</code> o <code>useQuery</code>/<code>useMutation</code>.</li>
              <li><strong>Axios</strong>: instancia con <code>baseURL</code>, interceptores; menos boilerplate que fetch.</li>
              <li><strong>React Query</strong>: <code>useQuery</code> (caché, loading, error) y <code>useMutation</code> + <code>invalidateQueries</code> para actualizar la UI.</li>
              <li>Flujo: Formulario → JSON → request (fetch/axios) → Backend procesa → response → UI se actualiza (o se invalida la query).</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
