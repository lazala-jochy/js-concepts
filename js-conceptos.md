# Guía de conceptos JavaScript

Documento de referencia para estudiar fundamentos, funcionamiento interno, estructuras, asincronía, navegador y temas avanzados.

## Tabla de contenidos

### [FUNDAMENTOS](#fundamentos)

- [Variables (`var`, `let`, `const`)](#variables-var-let-const)
- [Tipos de datos](#tipos-de-datos)
- [Operadores](#operadores)
- [Condicionales (`if`, `else`, `switch`)](#condicionales-if-else-switch)
- [Bucles (`for`, `while`, `do while`)](#bucles-for-while-do-while)
- [Funciones (declaración, expresión, arrow)](#funciones-declaración-expresión-arrow)

### [FUNCIONAMIENTO INTERNO](#funcionamiento-interno)

- [Scope (global, local, block)](#scope-global-local-block)
- [Hoisting](#hoisting)
- [Closures](#closures)
- [Call Stack](#call-stack)
- [Event Loop](#event-loop)
- [Execution Context](#execution-context)
- [Memory Heap](#memory-heap)

### [ESTRUCTURAS Y MÉTODOS](#estructuras-y-métodos)

- [Objetos](#objetos)
- [Arrays](#arrays)
- [Destructuring](#destructuring)
- [Spread / Rest](#spread--rest)
- [Métodos de arrays (`map`, `filter`, `reduce`, `forEach`)](#métodos-de-arrays-map-filter-reduce-foreach)
- [Métodos de objetos (`Object.keys`, `Object.values`, etc.)](#métodos-de-objetos-objectkeys-objectvalues-etc)

### [ASINCRONÍA](#asincronía)

- [Callbacks](#callbacks)
- [Promises](#promises)
- [`async` / `await`](#async--await)
- [Manejo de errores (`try` / `catch`)](#manejo-de-errores-try--catch)
- [`Promise.all`](#promiseall)
- [`Promise.allSettled`](#promiseallsettled)
- [`Promise.race`](#promiserace)

### [DOM Y NAVEGADOR](#dom-y-navegador)

- [DOM manipulation](#dom-manipulation)
- [Event listeners](#event-listeners)
- [Event bubbling / capturing](#event-bubbling--capturing)
- [Fetch API](#fetch-api)
- [`LocalStorage` / `SessionStorage`](#localstorage--sessionstorage)

### [JAVASCRIPT AVANZADO](#javascript-avanzado)

- [`this`](#this)
- [Prototipos](#prototipos)
- [Herencia prototipal](#herencia-prototipal)
- [Clases (`class`)](#clases-class)
- [Encapsulación](#encapsulación)
- [Inmutabilidad](#inmutabilidad)
- [Currying](#currying)
- [Funciones puras](#funciones-puras)

---

## FUNDAMENTOS

### Variables (`var`, `let`, `const`)

- **`var`**: Declara una variable con **ámbito de función** (o global). Se puede redeclarar y reasignar. Existe **hoisting** y la inicialización queda en `undefined` hasta la línea de asignación.
- **`let`**: Declara una variable con **ámbito de bloque**. No se puede redeclarar en el mismo bloque; sí reasignar. No se accede antes de la declaración (TDZ: *temporal dead zone*).
- **`const`**: Declara una **constante de enlace**: no se puede reasignar el identificador. También es de **bloque**. El valor puede ser mutable si es un objeto o array (solo el enlace es constante).

**Ejemplo:**

```js
var x = 1;
let y = 2;
const z = { n: 3 };
y = 20;
// z = {}; // Error: no reasignar const
z.n = 30; // válido: mutar el objeto
```

### Tipos de datos

JavaScript es **dinámicamente tipado**. Los tipos primitivos son: **`undefined`**, **`null`**, **`boolean`**, **`number`**, **`bigint`**, **`string`**, **`symbol`**. Todo lo demás es **objeto** (incluidos arrays, funciones, fechas, etc.).

- **Primitivos**: se copian por valor; inmutables en el sentido de que no puedes “cambiar” el primitivo en sitio (reasignas otra cosa).
- **Referencia**: objetos comparten identidad; comparar con `===` compara la referencia, no el contenido profundo.

**Ejemplo:**

```js
typeof 42; // "number"
typeof "hola"; // "string"
const a = [1, 2];
const b = a;
a === b; // true (misma referencia)
```

### Operadores

- **Aritméticos**: `+`, `-`, `*`, `/`, `%`, `**` (exponenciación).
- **Asignación**: `=`, `+=`, `-=`, etc.
- **Comparación**: `==` / `!=` (coerción), `===` / `!==` (estricto, recomendado).
- **Lógicos**: `&&`, `||`, `??` (nullish coalescing: solo `null`/`undefined`), `!`.
- **Incremento/decremento**: `++`, `--` (prefijo y sufijo cambian el valor devuelto).
- **Otros**: `typeof`, `instanceof`, operador ternario `cond ? a : b`, optional chaining `?.`, encadenamiento nullish.

**Ejemplo:**

```js
const edad = 18;
const puedeVotar = edad >= 18 ? "sí" : "no";
const nombre = null;
const display = nombre ?? "anónimo"; // solo null/undefined usan el default
```

### Condicionales (`if`, `else`, `switch`)

- **`if / else if / else`**: ejecuta bloques según condiciones booleanas. La condición se convierte a booleano de forma implícita salvo que uses comparaciones explícitas.
- **`switch`**: compara una expresión con varios `case` (normalmente con **strict equality** tras `switch` en JS clásico). Importante: **`break`** para no “caer” al siguiente `case`; `default` para el resto.

**Ejemplo:**

```js
const rol = "admin";
if (rol === "admin") {
  console.log("acceso total");
} else if (rol === "user") {
  console.log("acceso limitado");
} else {
  console.log("invitado");
}

switch (rol) {
  case "admin":
    console.log("admin");
    break;
  default:
    console.log("otro");
}
```

### Bucles (`for`, `while`, `do while`)

- **`for`**: inicialización, condición y actualización en una línea; ideal cuando conoces o controlas el número de iteraciones.
- **`while`**: evalúa la condición **antes** de cada iteración; puede no ejecutarse nunca.
- **`do...while`**: ejecuta **al menos una vez** y luego evalúa la condición.

También existen `for...of` (iterables, valores) y `for...in` (claves enumerables de objetos; cuidado con propiedades heredadas).

**Ejemplo:**

```js
for (let i = 0; i < 3; i++) console.log(i);

let n = 0;
while (n < 2) {
  n++;
}

let m = 0;
do {
  m++;
} while (m < 1);

for (const v of [10, 20]) console.log(v);
```

### Funciones (declaración, expresión, arrow)

- **Declaración de función**: `function nombre() {}` — tiene hoisting completo (el nombre está disponible en todo el ámbito de la función).
- **Expresión de función**: `const f = function() {}` — la variable obedece a `let`/`const` (no usar antes de declarar).
- **Arrow functions**: `const f = () => {}` — no tienen `this` propio ni `arguments` de función clásica; útiles para callbacks cortos y lexican `this` del exterior.

**Ejemplo:**

```js
function suma(a, b) {
  return a + b;
}

const resta = function (a, b) {
  return a - b;
};

const mult = (a, b) => a * b;
```

---

## FUNCIONAMIENTO INTERNO

### Scope (global, local, block)

- **Global**: variables accesibles desde cualquier parte del programa (p. ej. propiedades de `globalThis` / `window` en navegador).
- **Local (de función)**: variables declaradas dentro de una función; solo visibles ahí (`var` está ligado a la función).
- **De bloque**: `let` y `const` (y `class`) limitados al par de llaves `{}` donde se declaran.

**Ejemplo:**

```js
const enGlobal = 1;
function demo() {
  const local = 2;
  if (true) {
    const bloque = 3;
    // bloque solo existe aquí
  }
}
```

### Hoisting

El motor “eleva” declaraciones a la cima de su ámbito **antes** de ejecutar el código. Las **declaraciones de función** completas se pueden invocar antes en el código; **`var`** se eleva como `undefined`; **`let`/`const`** elevan el “binding” pero entran en **TDZ** hasta la línea de declaración.

**Ejemplo:**

```js
console.log(hoistedVar); // undefined (var existe, sin valor aún)
var hoistedVar = 1;

antes(); // funciona: la declaración function se eleva completa
function antes() {
  console.log("ok");
}
```

### Closures

Una **closure** es una función que **recuerda** el entorno léxico donde se creó: sigue teniendo acceso a variables externas aunque la función externa ya haya terminado. Permite factories, módulos y estado privado simulado.

**Ejemplo:**

```js
function crearContador() {
  let n = 0;
  return () => ++n;
}
const c = crearContador();
c(); // 1
c(); // 2
```

### Call Stack

Pila de **frames** de ejecución: cada llamada a función apila un frame; al terminar, se desapila. Una llamada recursiva sin límite puede desbordar la pila (**stack overflow**). JavaScript en un solo hilo usa **un** call stack principal para ese hilo.

**Ejemplo:**

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {}
a(); // call stack: a → b → c, luego se vacía al volver
```

### Event Loop

Mecanismo que coordina el **call stack**, la **cola de tareas** (*task queue / macrotasks*) y las **microtareas** (p. ej. promesas). Cuando el stack está vacío, el loop toma la siguiente tarea y la ejecuta. Las microtareas se vacían antes del siguiente macrotask.

**Ejemplo:**

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Orden típico: A, D, C, B (microtarea antes que el timeout macrotarea)
```

### Execution Context

Entorno en el que se ejecuta un fragmento de código: contiene el **this binding**, el **entorno léxico** (scope chain) y el estado de la función. Global y por cada invocación de función (y a veces global de `eval` en modo estricto, etc.).

**Ejemplo:**

```js
const o = {
  x: 1,
  m() {
    return this.x; // this = o al llamar o.m()
  },
};
o.m(); // 1
```

### Memory Heap

Región donde viven **objetos** y datos dinámicos (referenciados desde el stack). El **garbage collector** libera lo que ya no es alcanzable; los closures mantienen vivas las variables que capturan si la función sigue referenciada.

**Ejemplo:**

```js
function f() {
  const grande = new Array(1e6).fill(0);
  return () => grande[0];
}
const g = f(); // el array sigue en el heap mientras exista g
```

---

## ESTRUCTURAS Y MÉTODOS

### Objetos

Colecciones de **pares clave-valor**. Las claves suelen ser strings o symbols; los valores pueden ser cualquier tipo. Acceso con `obj.prop` o `obj["prop"]`.

**Ejemplo:**

```js
const user = { name: "Ana", edad: 30 };
user.name;
user["edad"];
```

### Arrays

Lista ordenada indexada numéricamente; es un objeto especializado con `.length` y métodos de iteración. Índices desde `0`.

**Ejemplo:**

```js
const nums = [10, 20, 30];
nums[0]; // 10
nums.push(40);
```

### Destructuring

Sintaxis para **extraer** valores de arrays u objetos en variables:

**Ejemplo:**

```js
const arr = [1, 2, 3];
const [a, b] = arr;

const user = { name: "Luis", edad: 25 };
const { name, edad: años } = user;

const [x = 0] = [];
const { nick = "guest" } = {};
```

Permite valores por defecto y renombrado (`{ name: n }`).

### Spread / Rest

- **Spread** (`...`): “expande” un iterable u objeto en otro contexto (array literal, argumentos, objeto literal).
- **Rest** (`...args`): agrupa el resto de elementos en un array (parámetros o destructuring).

**Ejemplo:**

```js
const copia = [...[1, 2], 3];
function suma(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
const [primero, ...resto] = [1, 2, 3, 4];
```

### Métodos de arrays (`map`, `filter`, `reduce`, `forEach`)

- **`forEach`**: ejecuta una función por cada elemento; **no devuelve** un array útil (devuelve `undefined`); no se puede `break` como en un `for` clásico.
- **`map`**: devuelve un **nuevo array** con la misma longitud, transformando cada elemento.
- **`filter`**: devuelve un **nuevo array** con elementos que cumplen la condición.
- **`reduce`**: reduce el array a **un solo valor** acumulando (con acumulador e índice opcional).

**Ejemplo:**

```js
const n = [1, 2, 3];
n.forEach((x) => console.log(x));
const doble = n.map((x) => x * 2);
const pares = n.filter((x) => x % 2 === 0);
const total = n.reduce((acc, x) => acc + x, 0);
```

### Métodos de objetos (`Object.keys`, `Object.values`, etc.)

- **`Object.keys(obj)`**: array de claves **enumerables** propias.
- **`Object.values(obj)`**: valores de esas propiedades.
- **`Object.entries(obj)`**: pares `[clave, valor]`.
- **`Object.assign`**, **`Object.freeze` / `seal` / `preventExtensions`**, **`Object.hasOwn`**, **`Object.fromEntries`**, etc., según necesidad.

**Ejemplo:**

```js
const o = { a: 1, b: 2 };
Object.keys(o); // ["a","b"]
Object.values(o); // [1,2]
Object.entries(o); // [["a",1],["b",2]]
Object.fromEntries([
  ["x", 10],
  ["y", 20],
]);
```

---

## ASINCRONÍA

### Callbacks

Funciones pasadas para que se ejecuten **más tarde** (p. ej. al terminar I/O o un temporizador). El patrón callback puede llevar a **callback hell** si se anidan muchas operaciones.

**Ejemplo:**

```js
setTimeout(() => console.log("más tarde"), 1000);

function leerArchivo(ruta, callback) {
  // simulación: al terminar llama callback(err, data)
  callback(null, "contenido");
}
```

### Promises

Objeto que representa un valor **futuro**: estados **pending**, **fulfilled** o **rejected**. Encadenamiento con `.then` / `.catch` / `.finally`; un `then` puede devolver otra promesa para secuencias.

**Ejemplo:**

```js
const p = new Promise((resolve, reject) => {
  resolve(42);
});
p.then((v) => v * 2)
  .then(console.log)
  .catch(console.error);
```

### `async` / `await`

`async` marca una función que **siempre** devuelve una promesa. `await` pausa la función `async` hasta que la promesa se resuelve (sin bloquear el hilo principal: el trabajo continúa vía microtareas).

**Ejemplo:**

```js
async function cargar() {
  const res = await Promise.resolve("ok");
  return res;
}
cargar().then(console.log);
```

### Manejo de errores (`try` / `catch`)

`try` ejecuta código; `catch` captura excepciones; `finally` corre siempre. Con `async/await`, errores de promesas rechazadas se capturan con `try/catch` alrededor del `await`.

**Ejemplo:**

```js
try {
  JSON.parse("{");
} catch (e) {
  console.error("JSON inválido", e.message);
} finally {
  console.log("siempre");
}
```

### `Promise.all`

Recibe un iterable de promesas; se cumple con un **array de resultados** en orden si **todas** cumplen; si **una** falla, rechaza con esa razón.

**Ejemplo:**

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1,2]
```

### `Promise.allSettled`

Espera a que **todas** terminen (éxito o fallo); devuelve un array de objetos `{ status, value | reason }`. Nunca rechaza por un solo fallo.

**Ejemplo:**

```js
Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject(new Error("fallo")),
]).then(console.log);
```

### `Promise.race`

Se resuelve o rechaza con el **primer** settled de las promesas dadas (útil para timeouts o “la primera que responda”).

**Ejemplo:**

```js
const rápida = Promise.resolve("A");
const lenta = new Promise((r) => setTimeout(() => r("B"), 1000));
Promise.race([rápida, lenta]).then(console.log); // "A"
```

---

## DOM Y NAVEGADOR

### DOM manipulation

El **DOM** es la representación en árbol del HTML. Se puede **seleccionar** nodos (`querySelector`, `getElementById`, etc.), **crear** (`createElement`), **modificar** texto/atributos/clases, **insertar** (`appendChild`, `insertBefore`) y **eliminar** nodos.

**Ejemplo (navegador):**

```js
const el = document.querySelector("#app");
const p = document.createElement("p");
p.textContent = "Hola";
el?.appendChild(p);
```

### Event listeners

`addEventListener(evento, handler, opciones)` registra respuestas a eventos; `removeEventListener` requiere la **misma referencia** de función. Opciones: `once`, `passive`, `capture`.

**Ejemplo (navegador):**

```js
const handler = () => console.log("click");
document.body.addEventListener("click", handler);
document.body.removeEventListener("click", handler);
```

### Event bubbling / capturing

Los eventos atraviesan el DOM en **tres fases**: captura (de raíz a objetivo), objetivo, y **bubbling** (de objetivo a raíz). Por defecto los handlers escuchan en fase de bubbling; `capture: true` invierte el orden.

**Ejemplo (navegador):** supón HTML `<div id="outer"><button id="inner"></button></div>`.

```js
document.getElementById("outer")?.addEventListener(
  "click",
  () => console.log("outer (bubbling)"),
  false
);
document.getElementById("outer")?.addEventListener(
  "click",
  () => console.log("outer (capture)"),
  true
);
// Al hacer clic en #inner: primero capture en outer, luego el botón, luego bubbling en outer
```

### Fetch API

API basada en **promesas** para peticiones HTTP (`fetch(url, options)`). Respuesta inicial hay que leer con `.json()`, `.text()`, etc. Errores HTTP **no** rechazan la promesa por defecto; hay que comprobar `response.ok`.

**Ejemplo (navegador):**

```js
fetch("https://api.example.com/data")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(console.log)
  .catch(console.error);
```

### `LocalStorage` / `SessionStorage`

Almacenamiento clave-valor en el navegador (solo strings). **localStorage** persiste entre sesiones; **sessionStorage** por pestaña hasta cerrarla. Misma API; tamaño limitado y origen aislado (same-origin policy).

**Ejemplo (navegador):**

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
sessionStorage.setItem("tabId", "123");
```

---

## JAVASCRIPT AVANZADO

### `this`

El valor de **`this`** depende de **cómo** se invoca la función: método de objeto (objeto base), función suelta en modo no estricto (`window` en navegador), `call`/`apply`/`bind`, constructor `new`, o arrow (léxico, no propio). En modo estricto, función suelta puede dar `undefined`.

**Ejemplo:**

```js
const obj = {
  x: 1,
  regular() {
    return this.x;
  },
  arrow: () => this?.x, // léxico: this del ámbito exterior (p. ej. undefined en módulo)
};
obj.regular(); // 1
```

### Prototipos

Cada objeto puede enlazar a otro objeto como **prototipo** (`Object.getPrototypeOf`). La cadena de prototipos resuelve propiedades no encontradas en el objeto. Las funciones constructoras tienen `.prototype` usado al instanciar con `new`.

**Ejemplo:**

```js
const padre = { saluda() { return "hola"; } };
const hijo = Object.create(padre);
hijo.saluda(); // delega al prototipo
Object.getPrototypeOf(hijo) === padre; // true
```

### Herencia prototipal

Reutilización mediante **delegación**: un objeto delega en su prototipo. `extends` en clases es azúcar sintáctico sobre esta cadena.

**Ejemplo:**

```js
const animal = { tipo: "animal" };
const perro = Object.create(animal);
perro.ladra = () => "guau";
perro.tipo; // hereda por la cadena de prototipos
```

### Clases (`class`)

Sintaxis declarativa para constructores y métodos; **no** es un nuevo modelo de herencia distinto del prototipal. Métodos van en el prototipo; campos de instancia pueden ir en el cuerpo de clase.

**Ejemplo:**

```js
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hola, ${this.name}`;
  }
}
new User("Ana").greet();
```

### Encapsulación

Ocultar detalles internos y exponer una API estable. En JS moderno: **campos privados** `#privado`, módulos ES, closures, convenciones con `_`.

**Ejemplo:**

```js
class Cuenta {
  #saldo = 0;
  depositar(n) {
    this.#saldo += n;
  }
  ver() {
    return this.#saldo;
  }
}
```

### Inmutabilidad

No mutar datos originales; producir **nuevas** estructuras (spread, `slice`, etc.). Facilita razonar sobre el estado y optimizaciones en algunos entornos.

**Ejemplo:**

```js
const estado = { items: [1, 2] };
const nuevo = { ...estado, items: [...estado.items, 3] };
```

### Currying

Transformar `f(a, b, c)` en `f(a)(b)(c)` — funciones que devuelven funciones hasta completar argumentos. Útil para reutilización y partial application.

**Ejemplo:**

```js
const suma = (a) => (b) => a + b;
const masDiez = suma(10);
masDiez(5); // 15
```

### Funciones puras

Misma entrada → misma salida; **sin efectos secundarios** observables (no I/O, no mutar estado externo). Base del estilo funcional y más fáciles de testear.

**Ejemplo:**

```js
function cuadrado(n) {
  return n * n;
}
let externo = 0;
function impura() {
  externo++; // efecto lateral
}
```

---

*Última revisión conceptual: referencia de estudio; contrasta siempre con la documentación oficial (MDN, ECMAScript) para detalles de versión y compatibilidad.*
