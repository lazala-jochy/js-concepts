# ⚛️ React — Guía Completa de Conceptos y Ejemplos

<div align="center">

> Una referencia práctica con los conceptos esenciales de React, ordenados de fundamentos a avanzado.

</div>

---

## Tabla de Contenidos

<details open>
<summary><strong>Índice</strong> (24 secciones)</summary>

1. [¿Qué es React?](#qué-es-react)
2. [JSX](#jsx)
3. [Componentes](#componentes)
4. [Props](#props)
5. [State (useState)](#state-usestate)
6. [Renderizado Condicional](#renderizado-condicional)
7. [Listas y Keys](#listas-y-keys)
8. [Manejo de Eventos](#manejo-de-eventos)
9. [Formularios](#formularios)
10. [useEffect](#useeffect)
11. [useRef](#useref)
12. [useContext](#usecontext)
13. [useReducer](#usereducer)
14. [useMemo y useCallback](#usememo-y-usecallback)
15. [Hooks Personalizados](#hooks-personalizados)
16. [Composición de Componentes](#composición-de-componentes)
17. [Lifting State Up](#lifting-state-up)
18. [React Router](#react-router)
19. [Manejo de Errores (Error Boundaries)](#manejo-de-errores-error-boundaries)
20. [Lazy Loading y Suspense](#lazy-loading-y-suspense)
21. [Portales](#portales)
22. [Patrones Avanzados](#patrones-avanzados)
23. [Performance y Optimización](#performance-y-optimización)
24. [Buenas Prácticas](#buenas-prácticas)

</details>

---

## ¿Qué es React?

React es una **biblioteca de JavaScript** para construir interfaces de usuario, creada por Meta. Se basa en el concepto de **componentes** reutilizables y un **DOM virtual** que optimiza las actualizaciones del DOM real.

**Características clave:**
- Declarativo: describes *qué* mostrar, React decide *cómo* actualizarlo.
- Basado en componentes: la UI se divide en piezas independientes.
- Unidireccional: el flujo de datos va de padre a hijo.

---

## JSX

JSX (JavaScript XML) es una extensión de sintaxis que permite escribir HTML dentro de JavaScript. Babel lo transforma a llamadas `React.createElement()`.

```jsx
// JSX
const elemento = <h1 className="titulo">Hola, mundo</h1>;

// Lo que genera Babel (detrás de escena)
const elemento = React.createElement('h1', { className: 'titulo' }, 'Hola, mundo');
```

**Reglas importantes de JSX:**

```jsx
// ✅ Un solo elemento raíz (o Fragment)
return (
  <>
    <h1>Título</h1>
    <p>Párrafo</p>
  </>
);

// ✅ Las expresiones JS van entre llaves
const nombre = "Ana";
return <p>Hola, {nombre}</p>;

// ✅ className en lugar de class
return <div className="contenedor">...</div>;

// ✅ Atributos en camelCase
return <input onChange={handleChange} />;

// ✅ Etiquetas auto-cerradas
return <img src="foto.jpg" alt="Foto" />;
```

---

## Componentes

Los componentes son la unidad básica de React. Pueden ser **funciones** (recomendado) o clases.

### Componente Funcional

```jsx
// Componente simple
function Saludo() {
  return <h1>¡Hola, mundo!</h1>;
}

// Con arrow function
const Saludo = () => <h1>¡Hola, mundo!</h1>;

export default Saludo;
```

### Componente de Clase (legacy)

```jsx
import { Component } from 'react';

class Saludo extends Component {
  render() {
    return <h1>¡Hola, {this.props.nombre}!</h1>;
  }
}
```

### Uso de un Componente

```jsx
import Saludo from './Saludo';

function App() {
  return (
    <div>
      <Saludo />
      <Saludo />
    </div>
  );
}
```

> **Convención:** Los componentes siempre empiezan con **mayúscula**. `<saludo />` sería un elemento HTML, `<Saludo />` es un componente React.

---

## Props

Las **props** (propiedades) son la forma en que los componentes reciben datos de su padre. Son de solo lectura.

```jsx
// Definición del componente con props
function TarjetaUsuario({ nombre, edad, avatar }) {
  return (
    <div className="tarjeta">
      <img src={avatar} alt={nombre} />
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
    </div>
  );
}

// Uso pasando props
function App() {
  return (
    <TarjetaUsuario
      nombre="Ana García"
      edad={28}
      avatar="https://ejemplo.com/ana.jpg"
    />
  );
}
```

### Props con valores por defecto

```jsx
function Boton({ texto = "Aceptar", color = "azul", onClick }) {
  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      {texto}
    </button>
  );
}

// O con defaultProps (forma antigua)
Boton.defaultProps = {
  texto: "Aceptar",
  color: "azul",
};
```

### La prop especial `children`

La prop `children prop` es una propiedad especial en React que representa el contenido que se coloca dentro de un componente cuando se utiliza.

Permite que un componente envuelva y renderice elementos hijos de forma dinámica, sin necesidad de definirlos explícitamente dentro de su propia implementación.

```jsx
function Contenedor({ children, titulo }) {
  return (
    <div className="contenedor">
      <h2>{titulo}</h2>
      <div className="contenido">{children}</div>
    </div>
  );
}

// Uso
<Contenedor titulo="Mi sección">
  <p>Este es el contenido interno.</p>
  <button>Clic aquí</button>
</Contenedor>
```

---

## State (useState)

`useState` es un hook de React que permite a un componente funcional crear y manejar estado interno, es decir, datos que pueden cambiar con el tiempo y provocar que el componente se vuelva a renderizar.

Como funciona?

`useState` funciona creando una variable de estado y una función para actualizarla.

Internamente, React guarda ese estado entre renderizados. Cuando llamas a la función de actualización, React:

*actualiza el valor

*vuelve a ejecutar el componente

*renderiza la UI con el nuevo estado

Además, cada llamada a useState es independiente y mantiene su propio valor a lo largo del ciclo de vida del componente.

```jsx
import { useState } from 'react';

function Contador() {
  const [cuenta, setCuenta] = useState(0); // [valor, función actualizadora]

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={() => setCuenta(cuenta + 1)}>+1</button>
      <button onClick={() => setCuenta(cuenta - 1)}>-1</button>
      <button onClick={() => setCuenta(0)}>Reset</button>
    </div>
  );
}
```

### Estado con objetos

```jsx
function Formulario() {
  const [usuario, setUsuario] = useState({ nombre: '', email: '' });

  const actualizarCampo = (campo, valor) => {
    // Siempre crear un nuevo objeto (no mutar el estado)
    setUsuario(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <form>
      <input
        value={usuario.nombre}
        onChange={e => actualizarCampo('nombre', e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={usuario.email}
        onChange={e => actualizarCampo('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}
```

### Estado con arrays

```jsx
function ListaTareas() {
  const [tareas, setTareas] = useState(['Comprar', 'Estudiar']);

  const agregar = (nueva) => setTareas(prev => [...prev, nueva]);
  const eliminar = (indice) => setTareas(prev => prev.filter((_, i) => i !== indice));

  return (
    <ul>
      {tareas.map((tarea, i) => (
        <li key={i}>
          {tarea}
          <button onClick={() => eliminar(i)}>✕</button>
        </li>
      ))}
    </ul>
  );
}
```

### Actualizaciones basadas en el estado anterior

```jsx
// ✅ Correcto: usar la función de actualización cuando el nuevo estado depende del anterior
setContador(prev => prev + 1);

// ⚠️ Puede fallar en actualizaciones múltiples:
setContador(contador + 1);
```

---

## Renderizado Condicional

```jsx
function Perfil({ estaAutenticado, nombre }) {
  // Con operador ternario
  return (
    <div>
      {estaAutenticado ? (
        <p>Bienvenido, {nombre}</p>
      ) : (
        <p>Por favor, inicia sesión.</p>
      )}
    </div>
  );
}

// Con && (cortocircuito) — muestra algo o nada
function Notificacion({ mensajes }) {
  return (
    <div>
      {mensajes.length > 0 && (
        <p>Tienes {mensajes.length} mensajes nuevos.</p>
      )}
    </div>
  );
}

// Con if/else antes del return
function EstadoCarga({ cargando, datos, error }) {
  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{datos.map(d => <li key={d.id}>{d.nombre}</li>)}</ul>;
}
```

---

## Listas y Keys

Las **keys** ayudan a React identificar qué elementos cambiaron en una lista. Deben ser únicas entre hermanos.

```jsx
const productos = [
  { id: 1, nombre: 'Manzana', precio: 1.2 },
  { id: 2, nombre: 'Banana', precio: 0.8 },
  { id: 3, nombre: 'Naranja', precio: 1.5 },
];

function ListaProductos() {
  return (
    <ul>
      {productos.map(producto => (
        // ✅ Usar id único como key, no el índice del array
        <li key={producto.id}>
          {producto.nombre} — ${producto.precio}
        </li>
      ))}
    </ul>
  );
}
```

> **⚠️ Evitar el índice como key** cuando la lista puede cambiar de orden o se pueden eliminar/insertar elementos, ya que causa bugs de renderizado.

---

## Manejo de Eventos

```jsx
function EjemploEventos() {
  const handleClick = (e) => {
    e.preventDefault(); // Prevenir comportamiento por defecto
    console.log('Clic!', e.target);
  };

  const handleChange = (e) => {
    console.log('Valor:', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  // Pasar argumentos a handlers
  const handleEliminar = (id) => (e) => {
    console.log('Eliminando id:', id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Clic</button>
      <button onClick={handleEliminar(42)}>Eliminar #42</button>
    </form>
  );
}
```

---

## Formularios

### Formulario Controlado (recomendado)

Un formulario controlado en React es cuando el valor del input está completamente manejado por el estado del componente. React es la fuente de verdad y decide qué valor tiene el input en todo momento.

```jsx
import { useState } from 'react';

function FormularioContacto() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    pais: 'mx',
    suscrito: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando:', datos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={datos.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="email"
        type="email"
        value={datos.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="mensaje"
        value={datos.mensaje}
        onChange={handleChange}
      />
      <select name="pais" value={datos.pais} onChange={handleChange}>
        <option value="mx">México</option>
        <option value="ar">Argentina</option>
        <option value="es">España</option>
      </select>
      <label>
        <input
          name="suscrito"
          type="checkbox"
          checked={datos.suscrito}
          onChange={handleChange}
        />
        Suscribirse al boletín
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

### Formulario no Controlado

Un formulario no controlado es cuando el valor del input no está en el estado de React, sino que lo maneja directamente el DOM. React solo accede al valor cuando lo necesita, normalmente usando referencias.

```jsx
  import { useRef } from "react";

function Form() {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Form;

```

---

## useEffect

`useEffect` permite realizar **efectos secundarios**: llamadas a APIs, suscripciones, manipulación del DOM, timers, etc.

Se ejecuta después de que el componente se renderiza y puede volver a ejecutarse cuando cambian ciertas dependencias.

```jsx
import { useState, useEffect } from 'react';

function EjemploEfectos({ userId }) {
  const [usuario, setUsuario] = useState(null);
  const [titulo, setTitulo] = useState('App');

  // 1. Ejecuta en cada render
  useEffect(() => {
    console.log('Se ejecuta siempre');
  });

  // 2. Ejecuta solo una vez (al montar)
  useEffect(() => {
    console.log('Componente montado');
    return () => console.log('Componente desmontado'); // cleanup
  }, []);

  // 3. Ejecuta cuando cambia userId
  useEffect(() => {
    let cancelado = false;

    async function cargarUsuario() {
      const res = await fetch(`/api/usuarios/${userId}`);
      const data = await res.json();
      if (!cancelado) setUsuario(data);
    }

    cargarUsuario();

    return () => { cancelado = true; }; // cleanup para evitar race conditions
  }, [userId]);

  // 4. Sincronizar con el título del documento
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);

  return <div>{usuario ? usuario.nombre : 'Cargando...'}</div>;
}
```

### Reglas de los Hooks

- Solo llamar hooks en el **nivel superior** (no dentro de if/for/funciones).
- Solo llamar hooks dentro de **componentes React** o hooks personalizados.

---

## useRef

`useRef` devuelve un objeto mutable cuyo `.current` no provoca re-renders al cambiar. Útil para acceder al DOM o guardar valores entre renders.

```jsx
import { useRef, useEffect } from 'react';

function EjemploRef() {
  // 1. Referencia al DOM
  const inputRef = useRef(null);

  const enfocarInput = () => {
    inputRef.current.focus();
  };

  // 2. Valor persistente sin provocar re-render
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });

  // 3. Guardar el valor anterior de una prop/estado
  const [nombre, setNombre] = useState('');
  const nombreAnterior = useRef('');
  useEffect(() => {
    nombreAnterior.current = nombre;
  }, [nombre]);

  return (
    <div>
      <input ref={inputRef} placeholder="Escribe aquí..." />
      <button onClick={enfocarInput}>Enfocar</button>
      <p>Renders: {renderCount.current}</p>
      <p>Nombre anterior: {nombreAnterior.current}</p>
    </div>
  );
}
```

---

## useContext

Permite compartir datos entre componentes sin pasar props manualmente en cada nivel (**prop drilling**).

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const TemaContext = createContext('claro');

// 2. Proveedor — envuelve los componentes que necesitan el valor
function App() {
  const [tema, setTema] = useState('claro');

  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <Pagina />
    </TemaContext.Provider>
  );
}

// 3. Consumidor — cualquier componente dentro del Provider
function Boton() {
  const { tema, setTema } = useContext(TemaContext);

  return (
    <button
      style={{ background: tema === 'claro' ? '#fff' : '#333' }}
      onClick={() => setTema(t => t === 'claro' ? 'oscuro' : 'claro')}
    >
      Tema actual: {tema}
    </button>
  );
}
```

---

## useReducer

Alternativa a `useState` para lógica de estado compleja o con múltiples sub-valores.

useReducer es un hook de React que se usa para manejar estado complejo mediante una función reductora.

Funciona recibiendo el estado actual y una acción, y devuelve un nuevo estado. Es útil cuando la lógica de actualización del estado es más estructurada o depende de múltiples condiciones.

```jsx
import { useReducer } from 'react';

// Estado inicial
const estadoInicial = { cuenta: 0, historial: [] };

// Reducer: función pura (estado, acción) => nuevoEstado
function reducer(estado, accion) {
  switch (accion.type) {
    case 'INCREMENTAR':
      return {
        cuenta: estado.cuenta + 1,
        historial: [...estado.historial, '+1'],
      };
    case 'DECREMENTAR':
      return {
        cuenta: estado.cuenta - 1,
        historial: [...estado.historial, '-1'],
      };
    case 'RESET':
      return estadoInicial;
    default:
      throw new Error(`Acción desconocida: ${accion.type}`);
  }
}

function Contador() {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);

  return (
    <div>
      <p>Cuenta: {estado.cuenta}</p>
      <p>Historial: {estado.historial.join(', ')}</p>
      <button onClick={() => dispatch({ type: 'INCREMENTAR' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

---

## useMemo y useCallback

Hooks de optimización para evitar cálculos o re-creaciones innecesarias.

### useMemo — memoriza un valor calculado

useMemo es un hook de React que memoriza el resultado de un cálculo para evitar ejecutarlo nuevamente en cada render.
Solo vuelve a calcular el valor cuando cambian sus dependencias.

```jsx
import { useMemo, useState } from 'react';

function ListaFiltrada({ items }) {
  const [filtro, setFiltro] = useState('');

  // Solo recalcula cuando items o filtro cambian
  const itemsFiltrados = useMemo(() => {
    console.log('Filtrando...'); // Solo se imprime cuando cambia el input
    return items.filter(item =>
      item.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [items, filtro]);

  return (
    <>
      <input value={filtro} onChange={e => setFiltro(e.target.value)} />
      <ul>{itemsFiltrados.map(i => <li key={i.id}>{i.nombre}</li>)}</ul>
    </>
  );
}
```

### useCallback — memoriza una función

useCallback es una función que memoriza otra función para evitar que se cree de nuevo en cada render.

Solo cambia cuando cambian sus dependencias, lo que ayuda a mejorar el rendimiento y evitar renderizados innecesarios.

```jsx
import { useCallback, useState } from 'react';

function Padre() {
  const [cuenta, setCuenta] = useState(0);

  // Sin useCallback, esta función se recrea en cada render del Padre
  const handleClic = useCallback(() => {
    console.log('Clic en hijo');
  }, []); // Sin dependencias: siempre la misma referencia

  return (
    <>
      <button onClick={() => setCuenta(c => c + 1)}>Cuenta: {cuenta}</button>
      <Hijo onClick={handleClic} />
    </>
  );
}

// memo evita re-render si las props no cambiaron
const Hijo = React.memo(({ onClick }) => {
  console.log('Hijo renderizado');
  return <button onClick={onClick}>Hijo</button>;
});
```

---

## Hooks Personalizados

Los **custom hooks** permiten extraer y reutilizar lógica con estado entre componentes. Siempre empiezan con `use`.

```jsx
// useFetch.js — hook para peticiones HTTP
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);

    fetch(url)
      .then(res => res.json())
      .then(data => { if (!cancelado) { setDatos(data); setCargando(false); } })
      .catch(err => { if (!cancelado) { setError(err); setCargando(false); } });

    return () => { cancelado = true; };
  }, [url]);

  return { datos, cargando, error };
}

// Uso en cualquier componente
function Usuarios() {
  const { datos, cargando, error } = useFetch('/api/usuarios');

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{datos.map(u => <li key={u.id}>{u.nombre}</li>)}</ul>;
}
```

```jsx
// useLocalStorage.js
import { useState } from 'react';

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  });

  const guardar = (nuevoValor) => {
    setValor(nuevoValor);
    localStorage.setItem(clave, JSON.stringify(nuevoValor));
  };

  return [valor, guardar];
}

// Uso
function Preferencias() {
  const [tema, setTema] = useLocalStorage('tema', 'claro');
  return <button onClick={() => setTema(t => t === 'claro' ? 'oscuro' : 'claro')}>{tema}</button>;
}
```

---

## Composición de Componentes

React favorece la **composición** sobre la herencia.

La component composition es una forma de construir interfaces combinando componentes pequeños y reutilizables dentro de otros componentes.

En lugar de heredar comportamiento, se basa en unir piezas para crear estructuras más complejas y flexibles.

```jsx
// Patrón: Componente contenedor genérico
function Modal({ titulo, children, onCerrar }) {
  return (
    <div className="overlay">
      <div className="modal">
        <header>
          <h2>{titulo}</h2>
          <button onClick={onCerrar}>✕</button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

// Uso con diferentes contenidos
function App() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <button onClick={() => setAbierto(true)}>Abrir modal</button>
      {abierto && (
        <Modal titulo="Confirmar acción" onCerrar={() => setAbierto(false)}>
          <p>¿Estás seguro de continuar?</p>
          <button>Confirmar</button>
        </Modal>
      )}
    </>
  );
}
```

---

## Lifting State Up

Cuando dos componentes necesitan compartir estado, se "eleva" al ancestro común más cercano.

```jsx
// ❌ Problema: cada componente tiene su propio estado aislado

// ✅ Solución: el estado vive en el padre
function Conversor() {
  const [celsius, setCelsius] = useState('');

  const fahrenheit = celsius !== '' ? (celsius * 9/5) + 32 : '';

  return (
    <div>
      <InputTemperatura
        escala="Celsius"
        valor={celsius}
        onChange={setCelsius}
      />
      <InputTemperatura
        escala="Fahrenheit"
        valor={fahrenheit}
        onChange={f => setCelsius((f - 32) * 5/9)}
      />
    </div>
  );
}

function InputTemperatura({ escala, valor, onChange }) {
  return (
    <label>
      {escala}:
      <input
        type="number"
        value={valor}
        onChange={e => onChange(e.target.value)}
      />
    </label>
  );
}
```

---

## React Router

La librería estándar para navegación en aplicaciones React (v6).

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// Configuración de rutas
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/usuarios">Usuarios</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/:id" element={<DetalleUsuario />} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
}

// Acceder a parámetros de ruta
function DetalleUsuario() {
  const { id } = useParams();
  return <p>Usuario #{id}</p>;
}

// Navegación programática
function FormularioLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // ... lógica de login
    navigate('/dashboard');
  };

  return <button onClick={handleLogin}>Iniciar sesión</button>;
}
```

---

## Manejo de Errores (Error Boundaries)

Los Error Boundaries capturan errores de JavaScript en el árbol de componentes hijo. Solo pueden ser **clases**.

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hayError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hayError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error capturado:', error, info);
  }

  render() {
    if (this.state.hayError) {
      return (
        <div>
          <h2>Algo salió mal</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hayError: false })}>
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Uso
function App() {
  return (
    <ErrorBoundary>
      <ComponenteQuePuedeFallar />
    </ErrorBoundary>
  );
}
```

---

## Lazy Loading y Suspense

Carga componentes de forma diferida para mejorar el rendimiento inicial.

Lazy Loading en React es una técnica para cargar componentes solo cuando se necesitan, en lugar de cargarlos todos al inicio, lo que mejora el rendimiento.

Suspense es una funcionalidad que permite mostrar un estado de carga (como un loader) mientras esos componentes se están cargando de forma diferida.

```jsx
import { lazy, Suspense } from 'react';

// Importación dinámica
const PaginaDashboard = lazy(() => import('./PaginaDashboard'));
const PaginaReportes = lazy(() => import('./PaginaReportes'));

function App() {
  return (
    <Suspense fallback={<p>Cargando página...</p>}>
      <Routes>
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/reportes" element={<PaginaReportes />} />
      </Routes>
    </Suspense>
  );
}
```

---

## Portales

Permiten renderizar un componente fuera del árbol del DOM de su padre, manteniendo el contexto de React.

Los portals permiten renderizar un componente fuera de su jerarquía normal en el DOM.

Es decir, aunque el componente pertenece a un árbol en React, su salida se monta en otro lugar del DOM, lo que es útil para elementos como modales o overlays.

```jsx
import { createPortal } from 'react-dom';

function Tooltip({ texto, children }) {
  return (
    <>
      {children}
      {createPortal(
        <div className="tooltip">{texto}</div>,
        document.getElementById('tooltip-root') // elemento en el HTML
      )}
    </>
  );
}
```

Útil para: modales, tooltips, notificaciones que necesitan escapar del `overflow: hidden` del padre.

---

## Patrones Avanzados

### Higher-Order Component (HOC)

Un Higher-Order Component es una función que recibe un componente y devuelve un nuevo componente con funcionalidad adicional.

Se usa para reutilizar lógica sin modificar el componente original.

```jsx
// Función que recibe un componente y devuelve uno mejorado
function conAutenticacion(ComponenteProtegido) {
  return function ComponenteEnvuelto(props) {
    const { estaAutenticado } = useAuth();

    if (!estaAutenticado) {
      return <Redirect to="/login" />;
    }

    return <ComponenteProtegido {...props} />;
  };
}

const PanelAdmin = conAutenticacion(PanelAdminBase);
```

### Render Props

render props es una técnica donde un componente recibe una función como propiedad y la usa para decidir qué renderizar.

Permite compartir lógica entre componentes de forma flexible sin acoplar la UI.

```jsx
// El componente delega el renderizado al padre via prop
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });

  return (
    <div onMouseMove={handleMove}>
      {render(pos)}
    </div>
  );
}

// Uso
<MouseTracker render={({ x, y }) => <p>Cursor en: {x}, {y}</p>} />
```

### Compound Components

Los Compound Components son un patrón donde varios componentes trabajan juntos como un conjunto, compartiendo estado y comportamiento implícitamente.

Permiten construir APIs más flexibles, donde el usuario del componente puede organizar la estructura libremente mientras los componentes internos siguen coordinados entre sí.

```jsx
// Componentes que comparten estado implícitamente via contexto
const AccordionContext = createContext();

function Accordion({ children }) {
  const [abierto, setAbierto] = useState(null);
  return (
    <AccordionContext.Provider value={{ abierto, setAbierto }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, titulo, children }) {
  const { abierto, setAbierto } = useContext(AccordionContext);
  const estaAbierto = abierto === id;

  return (
    <div>
      <button onClick={() => setAbierto(estaAbierto ? null : id)}>{titulo}</button>
      {estaAbierto && <div>{children}</div>}
    </div>
  );
}

Accordion.Item = AccordionItem;

// Uso
<Accordion>
  <Accordion.Item id="1" titulo="Pregunta 1">Respuesta 1</Accordion.Item>
  <Accordion.Item id="2" titulo="Pregunta 2">Respuesta 2</Accordion.Item>
</Accordion>
```

---

## Performance y Optimización

### React.memo

React.memo es una función que evita que un componente se vuelva a renderizar si sus props no han cambiado.

Hace una comparación superficial de las props y solo actualiza el componente cuando detecta diferencias.

```jsx
// Evita re-renders si las props no cambiaron
const ListaItem = React.memo(function ListaItem({ texto, onClick }) {
  console.log('Renderizando item:', texto);
  return <li onClick={onClick}>{texto}</li>;
});
```

### Virtualización de listas largas

Para listas de miles de elementos, usar `react-window` o `react-virtualized`:

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window';

function ListaGrande({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index].nombre}</div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Code Splitting por ruta

```jsx
// Cada ruta carga su JS solo cuando se visita
const Inicio = lazy(() => import('./Inicio'));
const Tienda = lazy(() => import('./Tienda'));
const Carrito = lazy(() => import('./Carrito'));
```

---

### Virutal Dom

El Virtual DOM es una representación en memoria del DOM real.

React lo usa para comparar cambios (diffing) y actualizar solo las partes necesarias del DOM real, haciendo el renderizado más eficiente.

---

## Buenas Prácticas

### Estructura de archivos recomendada

```
src/
├── components/          # Componentes reutilizables
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.test.jsx
│   │   └── index.js
│   └── Modal/
├── pages/               # Componentes de página (una por ruta)
├── hooks/               # Custom hooks
├── context/             # Contextos de React
├── utils/               # Funciones utilitarias
├── services/            # Llamadas a APIs
└── App.jsx
```

### Reglas generales

```jsx
// ✅ Un componente por archivo
// ✅ Nombres descriptivos en PascalCase para componentes
// ✅ Nunca mutar el estado directamente
setItems(prev => [...prev, nuevoItem]); // ✅
items.push(nuevoItem); // ❌

// ✅ Extraer lógica compleja a custom hooks
// ✅ Usar keys estables (ids, no índices)
// ✅ Separar la lógica de negocio de la UI
// ✅ Tipar las props con PropTypes o TypeScript

import PropTypes from 'prop-types';

Boton.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  deshabilitado: PropTypes.bool,
};

// ✅ Cleanup en useEffect para evitar memory leaks
useEffect(() => {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id); // ← siempre hacer cleanup
}, []);

// ✅ Lazy initializer para useState costoso
const [datos, setDatos] = useState(() => JSON.parse(localStorage.getItem('datos')) ?? []);
```

---

## Resumen de Hooks

| Hook | Para qué sirve |
|------|----------------|
| `useState` | Estado local del componente |
| `useEffect` | Efectos secundarios (fetch, DOM, timers) |
| `useRef` | Referencia al DOM o valor persistente sin re-render |
| `useContext` | Consumir un contexto |
| `useReducer` | Estado complejo con múltiples acciones |
| `useMemo` | Memorizar un valor calculado |
| `useCallback` | Memorizar una función |
| `useId` | Generar IDs únicos para accesibilidad |
| `useLayoutEffect` | Como useEffect pero síncrono tras el DOM |
| `useImperativeHandle` | Exponer métodos del hijo al padre via ref |

---

<div align="center">

*Generado con ❤️ | React 18+ | Actualizado 2025*

</div>
