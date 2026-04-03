# Guía de conceptos JavaScript

Documento de referencia para estudiar **fundamentos**, **funcionamiento interno**, **estructuras**, **asincronía**, **navegador** y **temas avanzados**. Pensado para consulta rápida y estudio profundo.

---

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

| Declaración | Ámbito | Redeclaración | Reasignación | Comportamiento especial |
|-------------|--------|---------------|--------------|-------------------------|
| **`var`** | Función o global | Sí | Sí | **Hoisting**: existe como `undefined` hasta la asignación |
| **`let`** | Bloque | No (en el mismo bloque) | Sí | **TDZ** (*temporal dead zone*): no accesible antes de la línea de declaración |
| **`const`** | Bloque | No | No (del **enlace**) | Constante de **enlace**: el identificador no se reasigna; objetos/arrays pueden **mutarse** por dentro |

- **`var`**: ámbito de **función** (o global), no de bloque.
- **`let` / `const`**: ámbito de **bloque** `{}`.

**Ejemplo**

```js
var x = 1;
let y = 2;
const z = { n: 3 };
y = 20;
// z = {}; // Error: no reasignar const
z.n = 30; // válido: mutar el objeto
```

**Notas clave**

- Con `const`, solo es constante la **referencia**, no necesariamente el contenido interno de objetos o arrays.

---

### Tipos de datos

JavaScript es **dinámicamente tipado**: el tipo se asocia al valor, no a la variable.

**Tipos primitivos**

- `undefined`, `null`, `boolean`, `number`, `bigint`, `string`, `symbol`

**Todo lo demás es objeto**

- Incluye arrays, funciones, fechas, etc.

**Comportamiento**

- **Primitivos**: se **copian por valor**; son **inmutables** en el sentido de que no “modificas” el valor en el sitio (reasignas otra cosa).
- **Referencia** (objetos): comparten **identidad**; `===` compara la **referencia**, no una igualdad profunda del contenido.

**Ejemplo**

```js
typeof 42; // "number"
typeof "hola"; // "string"
const a = [1, 2];
const b = a;
a === b; // true (misma referencia)
```

**Notas clave**

- `typeof null` es `"object"` por razones históricas del lenguaje; para comprobar `null` usa comparación explícita (`value === null`).

---

### Operadores

- **Aritméticos**: `+`, `-`, `*`, `/`, `%`, `**` (exponenciación).
- **Asignación**: `=`, `+=`, `-=`, etc.
- **Comparación**
  - `==` / `!=`: con **coerción** de tipos.
  - `===` / `!==`: **estrictos** (sin coerción); uso **recomendado** en código moderno.
- **Lógicos**: `&&`, `||`, `!`.
- **Nullish coalescing**: `??` — el valor de la derecha solo se usa si la izquierda es **`null`** o **`undefined`** (no trata `0` ni `""` como “ausencia”, a diferencia de `||` en muchos casos).
- **Incremento / decremento**: `++`, `--` (prefijo y sufijo cambian el **valor devuelto** en la expresión).
- **Otros útiles**: `typeof`, `instanceof`, ternario `cond ? a : b`, optional chaining `?.`

**Ejemplo**

```js
const edad = 18;
const puedeVotar = edad >= 18 ? "sí" : "no";
const nombre = null;
const display = nombre ?? "anónimo"; // solo null/undefined usan el default
```

**Errores comunes**

- `==` puede producir comparaciones sorprendentes por coerción; prefiere `===` salvo que tengas un motivo muy claro.

---

### Condicionales (`if`, `else`, `switch`)

**`if` / `else if` / `else`**

- Ejecuta bloques según condiciones; la condición se **coerciona a booleano** de forma implícita si no usas comparaciones explícitas.

**`switch`**

- Compara una expresión con varios `case` (en la práctica habitual de JS, equivalencia **estricta** respecto al valor del `switch`).
- Usa **`break`** para no **caer** (*fall-through*) al siguiente `case`.
- **`default`**: rama cuando no coincide ningún `case`.

**Ejemplo**

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

**Notas clave**

- Sin `break`, el flujo continúa en el siguiente `case` (a veces es intencional, pero suele ser fuente de bugs).

---

### Bucles (`for`, `while`, `do while`)

- **`for`**: inicialización, condición y actualización en una sola cabecera; adecuado cuando controlas o conoces bien el número de iteraciones.
- **`while`**: evalúa la condición **antes** de cada iteración; el cuerpo puede **no ejecutarse nunca**.
- **`do...while`**: ejecuta **al menos una vez** y luego evalúa la condición.

**Variantes de iteración**

- **`for...of`**: sobre **iterables** (valores).
- **`for...in`**: sobre **claves enumerables** de objetos; **cuidado** con propiedades **heredadas** de la cadena de prototipos (filtra con `hasOwn` / `Object.hasOwn` cuando corresponda).

**Ejemplo**

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

---

### Funciones (declaración, expresión, arrow)

- **Declaración**: `function nombre() {}` — **hoisting** completo del nombre: invocable en todo su ámbito de función antes de la línea textual.
- **Expresión**: `const f = function() {}` — la variable sigue las reglas de `let`/`const` (no uses antes de declarar).
- **Arrow**: `const f = () => {}` — **no** tiene `this` propio ni el objeto **`arguments`** de funciones clásicas; **lexical** `this` del entorno donde se definió; muy usadas en callbacks cortos.

**Ejemplo**

```js
function suma(a, b) {
  return a + b;
}

const resta = function (a, b) {
  return a - b;
};

const mult = (a, b) => a * b;
```

**Notas clave**

- No uses arrow functions como métodos de objeto cuando necesites que `this` sea la instancia (salvo que quieras explícitamente el `this` léxico exterior).

---

## FUNCIONAMIENTO INTERNO

### Scope (global, local, block)

- **Global**: accesible desde casi todo el programa (p. ej. propiedades de `globalThis` / `window` en navegador).
- **Local (función)**: variables dentro de una función; **`var`** queda ligado a la **función**, no al bloque.
- **Bloque**: `let`, `const` y `class` limitados al par de llaves `{}` donde se declaran.

**Ejemplo**

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

---

### Hoisting

El motor **reorganiza** mentalmente el código: las **declaraciones** se procesan antes de la ejecución línea a línea en su ámbito.

- **`function` declarada**: se puede invocar **antes** en el código (identificador y cuerpo disponibles en el ámbito).
- **`var`**: el identificador existe desde el inicio del ámbito con valor **`undefined`** hasta la asignación.
- **`let` / `const`**: el “binding” existe pero entra en **TDZ** hasta la línea de declaración (acceso previo → error).

**Ejemplo**

```js
console.log(hoistedVar); // undefined (var existe, sin valor aún)
var hoistedVar = 1;

antes(); // funciona: la declaración function se eleva completa
function antes() {
  console.log("ok");
}
```

---

### Closures

Una **closure** es una función que **conserva** el **entorno léxico** donde se creó: sigue accediendo a variables externas aunque la función externa ya haya terminado. Sirve para **factories**, **módulos** y **estado privado** simulado.

**Ejemplo**

```js
function crearContador() {
  let n = 0;
  return () => ++n;
}
const c = crearContador();
c(); // 1
c(); // 2
```

---

### Call Stack

Pila de **frames** de ejecución: cada llamada a función **apila** un frame; al retornar, se **desapila**. Recursión sin límite puede provocar **stack overflow**. JavaScript en un hilo usa **un** call stack principal para ese hilo.

**Ejemplo**

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

---

### Event Loop

Coordina el **call stack**, la **cola de tareas** (*macrotasks*, p. ej. `setTimeout`) y las **microtareas** (p. ej. callbacks de **promesas**). Cuando el stack está vacío, el loop toma la siguiente tarea. Las **microtareas** se drenan **antes** del siguiente **macrotask**.

**Ejemplo**

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Orden típico: A, D, C, B (microtarea antes que el timeout macrotarea)
```

---

### Execution Context

Entorno donde corre un fragmento de código: incluye el **binding de `this`**, el **entorno léxico** (cadena de scopes) y el estado de la función. Hay contexto **global** y uno por **invocación** de función (y casos especiales como `eval` según modo estricto).

**Ejemplo**

```js
const o = {
  x: 1,
  m() {
    return this.x; // this = o al llamar o.m()
  },
};
o.m(); // 1
```

---

### Memory Heap

Región donde residen **objetos** y datos dinámicos (referenciados desde el stack). El **garbage collector** libera lo **inalcanzable**. Las **closures** mantienen vivas las variables capturadas mientras la función interna siga referenciada.

**Ejemplo**

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

Colecciones de **pares clave-valor**. Claves habituales: **strings** o **symbols**. Valores: cualquier tipo. Acceso: `obj.prop` o `obj["prop"]`.

**Ejemplo**

```js
const user = { name: "Ana", edad: 30 };
user.name;
user["edad"];
```

---

### Arrays

Lista ordenada con índices numéricos; objeto especializado con **`.length`** y métodos de iteración. Primer índice: **0**.

**Ejemplo**

```js
const nums = [10, 20, 30];
nums[0]; // 10
nums.push(40);
```

---

### Destructuring

Sintaxis para **extraer** valores de arrays u objetos en variables enlazadas.

- Soporta **valores por defecto** y **renombrado** en objetos (`{ edad: años }`).

**Ejemplo**

```js
const arr = [1, 2, 3];
const [a, b] = arr;

const user = { name: "Luis", edad: 25 };
const { name, edad: años } = user;

const [x = 0] = [];
const { nick = "guest" } = {};
```

---

### Spread / Rest

- **Spread (`...`)**: **expande** un iterable u objeto (según contexto: literal de array, argumentos, literal de objeto).
- **Rest (`...args`)**: **agrupa** el resto en un array (rest parameters o rest en destructuring).

**Ejemplo**

```js
const copia = [...[1, 2], 3];
function suma(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
const [primero, ...resto] = [1, 2, 3, 4];
```

---

### Métodos de arrays (`map`, `filter`, `reduce`, `forEach`)

- **`forEach`**: ejecuta una función por elemento; **no** devuelve un array útil (devuelve `undefined`); **no** equivale a `for` con `break`/`continue` de la misma forma.
- **`map`**: nuevo array de la **misma longitud**, transformando cada elemento.
- **`filter`**: nuevo array solo con elementos que **cumplen** la condición.
- **`reduce`**: reduce a **un valor** acumulando (acumulador e índice opcionales).

**Ejemplo**

```js
const n = [1, 2, 3];
n.forEach((x) => console.log(x));
const doble = n.map((x) => x * 2);
const pares = n.filter((x) => x % 2 === 0);
const total = n.reduce((acc, x) => acc + x, 0);
```

**Errores comunes**

- Esperar un array nuevo de `forEach` o poder “cortar” la iteración como en un `for` clásico.

---

### Métodos de objetos (`Object.keys`, `Object.values`, etc.)

- **`Object.keys(obj)`**: array de claves **enumerables propias**.
- **`Object.values(obj)`**: valores de esas propiedades.
- **`Object.entries(obj)`**: pares `[clave, valor]`.
- Otras utilidades según necesidad: **`Object.assign`**, **`Object.freeze` / `seal` / `preventExtensions`**, **`Object.hasOwn`**, **`Object.fromEntries`**, etc.

**Ejemplo**

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

Funciones pasadas para ejecutarse **más tarde** (I/O, temporizadores, etc.). Muchos niveles anidados producen **callback hell** (código difícil de leer y mantener).

**Ejemplo**

```js
setTimeout(() => console.log("más tarde"), 1000);

function leerArchivo(ruta, callback) {
  // simulación: al terminar llama callback(err, data)
  callback(null, "contenido");
}
```

---

### Promises

Representan un valor **futuro**. Estados: **pending**, **fulfilled**, **rejected**. Encadenamiento con **`.then` / `.catch` / `.finally`**; un `then` puede devolver otra promesa para secuencias.

**Ejemplo**

```js
const p = new Promise((resolve, reject) => {
  resolve(42);
});
p.then((v) => v * 2)
  .then(console.log)
  .catch(console.error);
```

---

### `async` / `await`

- **`async`**: la función **siempre** devuelve una **promesa**.
- **`await`**: pausa la función `async` hasta la resolución de la promesa **sin bloquear el hilo principal** (el trabajo continúa vía **microtareas** y el event loop).

**Ejemplo**

```js
async function cargar() {
  const res = await Promise.resolve("ok");
  return res;
}
cargar().then(console.log);
```

---

### Manejo de errores (`try` / `catch`)

- **`try`**: bloque a ejecutar.
- **`catch`**: captura excepciones lanzadas.
- **`finally`**: se ejecuta **siempre** (éxito o error).

Con **`async`/`await`**, los rechazos de promesas se capturan con **`try`/`catch`** alrededor del **`await`**.

**Ejemplo**

```js
try {
  JSON.parse("{");
} catch (e) {
  console.error("JSON inválido", e.message);
} finally {
  console.log("siempre");
}
```

---

### `Promise.all`

Recibe un **iterable de promesas**:

- Si **todas** cumplen: resultado es un **array de valores** en **orden**.
- Si **una** falla: rechazo con esa **razón** (no espera al resto para fallar).

**Ejemplo**

```js
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // [1,2]
```

---

### `Promise.allSettled`

Espera a que **todas** terminen (éxito o fallo). Devuelve un array de objetos `{ status, value | reason }`. **No** rechaza el agregado por un solo fallo.

**Ejemplo**

```js
Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject(new Error("fallo")),
]).then(console.log);
```

---

### `Promise.race`

Se **resuelve** o **rechaza** con el **primer** settled entre las promesas dadas. Útil para **timeouts** o “la primera que responda”.

**Ejemplo**

```js
const rápida = Promise.resolve("A");
const lenta = new Promise((r) => setTimeout(() => r("B"), 1000));
Promise.race([rápida, lenta]).then(console.log); // "A"
```

---

## DOM Y NAVEGADOR

### DOM manipulation

El **DOM** es el árbol del documento HTML. Operaciones típicas:

- **Seleccionar**: `querySelector`, `getElementById`, etc.
- **Crear**: `createElement`
- **Modificar**: texto, atributos, clases
- **Insertar**: `appendChild`, `insertBefore`
- **Eliminar** nodos

**Ejemplo (navegador)**

```js
const el = document.querySelector("#app");
const p = document.createElement("p");
p.textContent = "Hola";
el?.appendChild(p);
```

---

### Event listeners

- **`addEventListener(evento, handler, opciones)`**: registra el manejador.
- **`removeEventListener`**: requiere la **misma referencia** de función que en `addEventListener`.

**Opciones** (entre otras): `once`, `passive`, `capture`.

**Ejemplo (navegador)**

```js
const handler = () => console.log("click");
document.body.addEventListener("click", handler);
document.body.removeEventListener("click", handler);
```

---

### Event bubbling / capturing

Fases del evento en el DOM:

1. **Capturing**: de la raíz hacia el objetivo.
2. **Target**: el elemento objetivo.
3. **Bubbling**: del objetivo hacia la raíz.

Por defecto los handlers suelen registrarse en fase **bubbling**; **`capture: true`** invierte el orden de ejecución en la fase de captura.

**Ejemplo (navegador)** — HTML: `<div id="outer"><button id="inner"></button></div>`.

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

---

### Fetch API

API **basada en promesas** para HTTP: `fetch(url, options)`.

- La **respuesta** hay que **consumir** con `.json()`, `.text()`, etc.
- Los **códigos HTTP de error** (4xx, 5xx) **no** rechazan la promesa por defecto: comprueba **`response.ok`** (o el status) explícitamente.

**Ejemplo (navegador)**

```js
fetch("https://api.example.com/data")
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(console.log)
  .catch(console.error);
```

**Errores comunes**

- Asumir que `fetch` rechaza en 404/500; solo falla en problemas de red u otros errores de fetch.

---

### `LocalStorage` / `SessionStorage`

Almacenamiento **clave-valor** en el navegador (**solo strings**).

- **`localStorage`**: persiste entre sesiones (mismo origen).
- **`sessionStorage`**: por **pestaña** hasta cerrarla.

Misma **API**; tamaño limitado; aislado por **origen** (*same-origin policy*).

**Ejemplo (navegador)**

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
sessionStorage.setItem("tabId", "123");
```

---

## JAVASCRIPT AVANZADO

### `this`

El valor de **`this`** lo fija la **forma de invocación**:

- **Método** de objeto: suele ser el **objeto base** de la llamada.
- **Función suelta** en modo no estricto (navegador): a menudo **`window`**.
- **`call` / `apply` / `bind`**: fijan `this` explícitamente.
- **`new`**: `this` es la instancia nueva.
- **Arrow functions**: **`this` léxico** del entorno donde se definieron (no tienen `this` propio).

En **modo estricto**, una función suelta puede tener **`undefined`** como `this` (no el objeto global).

**Ejemplo**

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

---

### Prototipos

Los objetos pueden enlazar a otro objeto como **prototipo** (`Object.getPrototypeOf`). La **cadena de prototipos** resuelve propiedades no encontradas en el objeto. Las **funciones constructoras** tienen **`.prototype`**, usado al instanciar con **`new`**.

**Ejemplo**

```js
const padre = { saluda() { return "hola"; } };
const hijo = Object.create(padre);
hijo.saluda(); // delega al prototipo
Object.getPrototypeOf(hijo) === padre; // true
```

---

### Herencia prototipal

Reutilización por **delegación**: un objeto delega en su prototipo. La sintaxis **`extends`** en clases es **azúcar** sobre esta mecánica.

**Ejemplo**

```js
const animal = { tipo: "animal" };
const perro = Object.create(animal);
perro.ladra = () => "guau";
perro.tipo; // hereda por la cadena de prototipos
```

---

### Clases (`class`)

Sintaxis declarativa para constructores y métodos. **No** introduce un modelo de herencia distinto del **prototipal**. Los métodos de instancia típicos van en el **prototipo**; los **campos de clase** pueden declararse en el cuerpo de la clase.

**Ejemplo**

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

---

### Encapsulación

Ocultar detalles internos y exponer una API estable. En JS moderno:

- **Campos privados** `#privado`
- **Módulos ES**
- **Closures**
- Convenciones con **`_`** (no enforcement del lenguaje)

**Ejemplo**

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

---

### Inmutabilidad

Evitar **mutar** datos compartidos; producir **nuevas** estructuras (`spread`, `slice`, etc.). Facilita el razonamiento sobre el estado y puede ayudar a optimizaciones en algunos entornos.

**Ejemplo**

```js
const estado = { items: [1, 2] };
const nuevo = { ...estado, items: [...estado.items, 3] };
```

---

### Currying

**Currying** es transformar una función que recibe **varios argumentos a la vez** en una **cadena de funciones** que reciben **un argumento cada una**: de `f(a, b, c)` a `f(a)(b)(c)`. Eso permite **aplicar argumentos poco a poco** (*partial application*) y reutilizar las funciones intermedias.

**Versión normal vs currificada**

En lugar de:

```js
function suma(a, b) {
  return a + b;
}
```

Versión currificada:

```js
const suma = (a) => (b) => a + b;
```

**Qué devuelve cada paso**

- `suma(10)` **no** devuelve un número: devuelve **otra función** `(b) => 10 + b`.
- Al guardar `const masDiez = suma(10)`, `masDiez` es esa función parcialmente aplicada.
- `masDiez(5)` → `15` (internamente `10 + 5`).

**Idea clave**

“**Guardar un valor ahora, usarlo después**”: el primer argumento queda cerrado en el closure; los siguientes se pasan en llamadas posteriores.

**Ejemplo práctico (reutilización con un valor fijo)**

```js
const aplicarDescuento = (descuento) => (precio) =>
  precio - precio * descuento;

const descuento20 = aplicarDescuento(0.2);

descuento20(100); // 80
descuento20(200); // 160
```

Aquí reutilizas la misma lógica con el descuento **0.2** ya fijado.

**Por qué es útil**

- **Reutilización** de funciones configuradas.
- Código más **composable** y flexible.
- Encaja con **aplicación parcial** y estilos **funcionales** (p. ej. en React o librerías FP).

**Regla mnemotécnica**

Cada función recibe **un** argumento y devuelve otra función hasta que ya no queden argumentos por aplicar.

**Mini resumen**

| Estilo   | Forma      |
| -------- | ---------- |
| Normal   | `f(a, b)`  |
| Currying | `f(a)(b)`  |

Divide la ejecución en **pasos** y permite fijar argumentos de forma incremental.

---

### Funciones puras

Misma entrada → misma salida; **sin efectos secundarios** observables relevantes (no I/O, no mutar estado externo de forma que afecte otros). Base del estilo funcional y más sencillas de **testear**.

**Ejemplo**

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

*Última revisión conceptual: referencia de estudio; contrasta siempre con la documentación oficial ([MDN](https://developer.mozilla.org/), [ECMAScript](https://tc39.es/ecma262/)) para detalles de versión y compatibilidad.*
