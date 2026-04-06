# Guía de conceptos JavaScript

Documento de referencia para estudiar **fundamentos**, **funcionamiento interno**, **estructuras**, **asincronía**, **navegador** y **temas avanzados**. Pensado para consulta rápida y estudio profundo.

---

## Tabla de contenidos

### [FUNDAMENTOS](#fundamentos)

- [Variables (`var`, `let`, `const`)](#variables-var-let-const)
- [Tipos de datos](#tipos-de-datos)
- [Value vs Reference en JavaScript](#value-vs-reference-en-javascript)
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
- [Prototipos](#prototipos-en-javascript)
- [Herencia prototipal](#herencia-prototipal)
- [Clases (`class`)](#clases-class)
- [Encapsulación](#encapsulación)
- [Inmutabilidad](#inmutabilidad)
- [Currying](#currying)
- [Funciones puras](#funciones-puras)

---

## FUNDAMENTOS

### Variables (`var`, `let`, `const`)

Las variables en JavaScript se pueden declarar usando `var`, `let` o `const`. Cada una tiene diferencias importantes en ámbito (*scope*), re-declaración, reasignación y comportamiento interno.

#### Comparación rápida

| Declaración | Ámbito (Scope) | Redeclaración | Reasignación | Comportamiento especial |
|-------------|----------------|---------------|--------------|-------------------------|
| `var` | Función o global | ✅ Sí | ✅ Sí | **Hoisting**: se eleva y se inicializa como `undefined` |
| `let` | Bloque `{}` | ❌ No | ✅ Sí | **Temporal Dead Zone (TDZ)** |
| `const` | Bloque `{}` | ❌ No | ❌ No | Referencia constante (no se puede reasignar) |

#### Conceptos clave

**1. Ámbito (Scope)**

`var` tiene ámbito de función, no respeta bloques `{}`. `let` y `const` tienen ámbito de bloque.

```js
if (true) {
  var a = 10;
  let b = 20;
}

console.log(a); // 10
console.log(b); // ReferenceError
```

**2. Hoisting**

El *hoisting* significa que las declaraciones se "mueven" al inicio de su contexto.

*`var`*

```js
console.log(x); // undefined
var x = 5;
```

Internamente:

```js
var x;
console.log(x); // undefined
x = 5;
```

*`let` y `const` (TDZ)*

```js
console.log(y); // ReferenceError
let y = 10;
```

Esto ocurre por la **Temporal Dead Zone (TDZ)**: la variable existe, pero no se puede usar antes de su declaración.

**3. Reasignación vs redeclaración**

```js
let a = 1;
a = 2; // permitido

let a = 3; // Error: no se puede redeclarar en el mismo bloque

var b = 1;
var b = 2; // permitido (puede causar errores difíciles de detectar)
```

**4. `const` y mutabilidad**

**🧠 La idea principal**

`const` **no** hace el objeto inmutable. Lo que hace es **proteger la referencia**, no el contenido.

**🔗 ¿Qué significa “referencia”?**

Cuando haces esto:

```js
const obj = { n: 1 };
```

`obj` no contiene el objeto directamente: guarda una **referencia** (una dirección en memoria) al objeto. Es como si `obj` fuera un puntero hacia ese objeto.

**🔒 ¿Qué bloquea `const`?**

`const` impide **cambiar esa referencia**:

```js
const obj = { n: 1 };

obj = { n: 2 }; // Error
```

Porque estás intentando que `obj` apunte a **otro** objeto distinto.

**🔓 ¿Qué sí permite?**

Modificar el contenido **dentro del mismo** objeto:

```js
const obj = { n: 1 };

obj.n = 2; // válido
```

Aquí la referencia es la misma; solo cambias lo que hay dentro.

**📦 Ejemplo con memoria (modelo mental)**

```text
obj ─────► { n: 1 }
```

Después de `obj.n = 2;`:

```text
obj ─────► { n: 2 }
```

La flecha (referencia) no cambió; solo cambió el contenido.

**🚫 Pero esto sí rompe la regla**

```js
obj = { n: 3 }; // Error
```

Sería otra flecha hacia otro objeto: cambiaste la referencia.

**🧊 ¿Cómo hacer un objeto realmente inmutable?**

Puedes usar:

```js
const obj = Object.freeze({ n: 1 });

obj.n = 2; // no cambia el valor; en modo estricto lanza TypeError
```

`Object.freeze` es **superficial** (*shallow*): no congela objetos anidados.

Con **arrays** pasa lo mismo que con objetos: no reasignas el enlace, pero sí puedes mutar el contenido del mismo array.

```js
const arr = [1, 2, 3];

arr.push(4); // válido
arr = []; // Error
```

**🧾 Resumen simple**

- `const` = no puedes cambiar **a dónde apunta** la variable.
- Sí puedes cambiar **lo que hay dentro** (en objetos y arrays), porque se manejan por **referencia**.

#### Buenas prácticas

- Usa `const` por defecto.
- Usa `let` solo cuando necesites reasignar.
- Evita `var` en código moderno.
- Declara las variables lo más cerca posible de donde se usan.
- Prefiere nombres descriptivos.

#### Ejemplo completo

```js
function example() {
  if (true) {
    var x = 1;
    let y = 2;
    const z = { n: 3 };

    y = 20;
    z.n = 30;
  }

  console.log(x); // 1
  console.log(y); // ReferenceError
}
```

#### Resumen

- **`var`**: antiguo, flexible pero propenso a errores.
- **`let`**: moderno, permite cambios controlados.
- **`const`**: moderno, evita reasignaciones accidentales.

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

### Value vs Reference en JavaScript

**🧠 Idea central:** en JavaScript los primitivos se comportan como **valor** y los objetos como **referencia**; al pasar argumentos a una función, lo que se copia es siempre un valor (que, para objetos, es la referencia).

#### 🔹 1. Variable por valor (*pass by value*)

Una variable **guarda el valor directamente**. Cuando la copias, se crea una **copia independiente**.

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

`a` y `b` son dos valores separados; cambiar `b` no afecta a `a`.

#### 🔹 2. Variable por referencia (*pass by reference*, en la práctica)

La variable guarda una **referencia** (dirección en memoria) al objeto. Cuando “copias” la variable, **ambas apuntan al mismo objeto**.

```js
const obj1 = { value: 10 };
const obj2 = obj1;

obj2.value = 20;

console.log(obj1.value); // 20
console.log(obj2.value); // 20
```

`obj1` y `obj2` apuntan al **mismo** objeto; cambiar uno se refleja en el otro.

#### 🔍 Diferencia clave

| Tipo | Qué se copia | ¿Afecta al original? |
|------|--------------|----------------------|
| Por valor | El valor | No |
| Por referencia | La referencia (memoria) | Sí |

#### 📦 Tipos en JavaScript

**Primitivos → por valor**

`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`

```js
let x = "hello";
let y = x;

y = "bye";

console.log(x); // "hello"
```

**Objetos → por referencia**

Incluye `object`, `array`, `function` y, en general, todo lo que no es primitivo.

```js
const arr1 = [1, 2];
const arr2 = arr1;

arr2.push(3);

console.log(arr1); // [1, 2, 3]
```

#### ⚠️ Importante (esto confunde mucho)

JavaScript **no** es *pass by reference* “puro” en el sentido de otros lenguajes: en la práctica se habla de **pass by value of the reference** (*call by sharing*): **se copia la referencia** como valor, no “el mismo identificador” del llamado. Dos variables pueden compartir el mismo objeto en memoria.

#### 🧾 Resumen simple

- **Primitivos** → copias el **valor**.
- **Objetos** → copias la **referencia**; por eso los objetos se **comparten** entre variables.

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

**🧠 Explicación simple**

JavaScript solo tiene **un hilo** (*single-thread*) → solo puede hacer **una cosa a la vez**.

Entonces, ¿cómo maneja cosas asíncronas como `setTimeout` o `Promise`? Usa el **Event Loop**.

#### Las 3 piezas clave

**1. Call Stack (pila de ejecución)**

- Donde se ejecuta el código **síncrono**.
- Funciona como una pila (**LIFO**).

**2. Task Queue (macrotareas)**

Ejemplos: `setTimeout`, `setInterval`, eventos del DOM.

Van a una cola de macrotareas.

**3. Microtask Queue (microtareas)**

Ejemplos: `Promise.then`, `queueMicrotask`.

Tienen **más prioridad** que la cola de macrotareas.

#### ¿Qué hace el Event Loop?

**Regla clave:** cuando el **call stack** está vacío, el Event Loop:

1. Ejecuta **todas** las microtareas pendientes.
2. Luego ejecuta **una** macrotarea.
3. Repite.

#### Ejemplo paso a paso

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

**Ejecución (paso a paso)**

**1. Código síncrono primero**

- `console.log("A")` → imprime `A`.
- `console.log("D")` → imprime `D`.

Salida hasta aquí: `A`, luego `D`.

**2. Lo asíncrono**

- `setTimeout` → el callback va a la **cola de macrotareas**.
- `Promise.then` → el callback va a la **cola de microtareas**.

**3. Stack vacío → entra el Event Loop**

Primero se drenan las **microtareas** → imprime `C`.

**4. Después, macrotareas**

Imprime `B`.

**Resultado final:** `A`, `D`, `C`, `B`.

#### Regla de oro

Las **microtareas siempre** se ejecutan **antes** que las macrotareas, **aunque** el `setTimeout` tenga `0` ms.

#### Visual rápido

```text
Call stack vacío
       ↓
Microtareas (Promise, queueMicrotask) → primero
       ↓
Macrotareas (setTimeout, DOM, …) → después
```

#### Error común

Pensar que `setTimeout(..., 0)` se ejecuta “al instante”. **No** es inmediato: solo significa “cuando puedas” (stack vacío y **después** de haber vaciado las microtareas).

#### Resumen simple

- JS ejecuta primero lo **síncrono**.
- Luego: **microtareas** (promesas, `queueMicrotask`) y después **macrotareas** (`setTimeout`, etc.).
- El Event Loop **repite** este ciclo constantemente.

---

### Execution Context

**🧠 Idea simple:** un **Execution Context** es **el lugar donde JavaScript ejecuta tu código**.

#### 🔧 ¿Qué hay dentro?

Cada contexto incluye, en esencia:

- **`this`** → quién está “activo” como receptor de la llamada (según **cómo** invocas la función).
- **Variables** → enlaces que declaras (`let`, `const`, `var`, parámetros, etc.).
- **Scope** / **entorno léxico** → a qué variables puede acceder (cadena de *scopes*).

*(Hay más detalle en motores reales — p. ej. fase de creación vs ejecución — pero este modelo sirve para razonar el día a día.)*

#### 🔁 Tipos (muy simple)

**🌍 1. Global**

- Se crea cuando arranca el programa.
- Solo hay **uno** (el contexto global de ese programa / *realm*).
- En el navegador suele asociarse al objeto global (`globalThis` / `window`).

**⚙️ 2. Función**

- Se crea en cada **invocación** de una función (cada llamada puede tener su propio contexto).

#### 📌 Ejemplo fácil

```js
const o = {
  x: 1,
  m() {
    return this.x;
  },
};

o.m(); // 1
```

#### 🧩 ¿Qué pasa aquí?

Llamas `o.m()` → se crea un contexto de función donde **`this`** queda ligado a **`o`**. Por eso `return this.x` devuelve `1`.

#### ⚠️ Ejemplo importante (método extraído)

```js
const o = {
  x: 1,
  m() {
    return this.x;
  },
};

const fn = o.m;
fn();
```

#### 😵 ¿Por qué falla?

Aquí **no** llamas `o.m()`, sino `fn()` (función suelta). **`this`** ya **no** es `o`: en **modo estricto** suele ser `undefined` (y en modo no estricto, el objeto global — otro detalle que explica bugs silenciosos).

#### 🔥 Regla clave

**`this` depende de cómo llamas la función**, no de dónde está escrita en el código.

#### 🧾 Resumen corto

- **Execution Context** = el entorno donde corre ese trozo de código.
- Hay **uno global** y **uno por cada invocación** de función (en este modelo simplificado).
- Incluye **`this`**, variables locales y acceso vía **scope**.
- **`this` cambia** según la forma de la llamada (`obj.metodo()`, `fn()`, `call`/`apply`/`bind`, `new`, etc.).

---

### Memory Heap

**🧠 Idea simple:** el **Memory Heap** es el lugar en memoria donde viven los **objetos** y los datos dinámicos “grandes” (en el modelo mental habitual: todo lo que no es un primitivo ligado directamente al frame).

#### 🔧 ¿Cómo funciona?

JavaScript (en la práctica del motor) combina dos zonas:

**1. Stack (rápido, por frame)**

- Valores primitivos locales y metadatos del frame.
- **Referencias** (punteros) hacia lo que vive en el heap.

**2. Heap (memoria dinámica)**

- Objetos `{}`, arrays `[]`, funciones como valores, etc.

Lo “complejo” o de tamaño variable suele vivir en el **heap**; el **stack** guarda referencias y el trabajo síncrono de la llamada actual.

#### 📦 Ejemplo simple

```js
const obj = { name: "Jochy" };
```

- `obj` (el **enlace** / variable local) vive en el **stack** (del frame actual).
- El objeto `{ name: "Jochy" }` vive en el **heap**.
- `obj` **apunta** a ese objeto.

#### 🧹 Garbage Collector (limpieza automática)

El motor **libera memoria automáticamente** cuando los valores ya no son **alcanzables** (nadie puede llegar a ellos desde el código en ejecución).

```js
let obj = { name: "Jochy" };

obj = null;
```

Si no queda ninguna otra referencia al objeto `{ name: "Jochy" }`, el **garbage collector** puede reclamar ese espacio del heap.

#### 🔥 Parte importante: closures

Aquí suele confundirse la gente.

```js
function f() {
  const grande = new Array(1e6).fill(0);
  return () => grande[0];
}

const g = f();
```

#### 🧩 ¿Qué pasa aquí?

- Se crea `grande` (un array grande en el **heap**).
- Se devuelve una función que **cierra** sobre `grande`: `() => grande[0]`.

Esa función **recuerda** `grande` a través del **entorno léxico** (closure).

#### 🤯 ¿Por qué no se borra el array?

Aunque `f()` ya terminó, **`g` sigue usando** `grande` (indirectamente: la función retornada lo referencia). Mientras `g` exista y sea alcanzable, **`grande` sigue en memoria** y el GC **no** puede eliminarlo.

#### 🧠 Idea clave

Una **closure** mantiene **vivas** las variables del entorno que la función necesita. **Mientras la función interna exista y esté referenciada**, esos datos del heap pueden seguir ocupando memoria.

#### ⚠️ Esto puede causar problemas

Si creas muchas closures que capturan datos grandes:

```js
const g1 = f();
const g2 = f();
const g3 = f();
```

Cada llamada a `f()` puede dejar **otro** array grande en el heap mientras la closure correspondiente siga viva.

#### 🧾 Resumen simple

- **Heap** = donde viven objetos, arrays y valores dinámicos “pesados”.
- **Stack** = frames de llamada; referencias y primitivos locales (modelo mental).
- **Garbage Collector** = elimina lo **inalcanzable**.
- **Closures** = pueden **impedir** que se libere memoria mientras la función que captura siga referenciada.

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

El valor de **`this`** no depende de **dónde** se define la función, sino de **cómo** se llama (invoca).

👉 **Regla principal:**

`this` se determina en **tiempo de ejecución** según la forma de invocación.

🧭 **Casos principales**

**1. 🧱 Método de objeto**

Cuando una función se llama como método de un objeto:

```js
const obj = {
  x: 10,
  getX() {
    return this.x;
  },
};

obj.getX(); // 10
```

- ✔ `this` → el objeto (`obj`)

**2. 🌍 Función suelta (no estricta)**

```js
function mostrarThis() {
  return this;
}

mostrarThis(); // window (en navegador)
```

- ✔ `this` → objeto global (`window` en navegador)

**3. ⚠️ Función suelta en modo estricto**

```js
"use strict";

function mostrarThis() {
  return this;
}

mostrarThis(); // undefined
```

- ✔ `this` → `undefined`
- 👉 Más seguro, evita errores silenciosos

**4. 🎯 `call`, `apply`, `bind` (`this` explícito)**

```js
function saludar() {
  return `Hola ${this.nombre}`;
}

const persona = { nombre: "Jochy" };

saludar.call(persona); // "Hola Jochy"
saludar.apply(persona); // "Hola Jochy"

const nueva = saludar.bind(persona);
nueva(); // "Hola Jochy"
```

- ✔ `this` → lo que tú definas manualmente

**5. 🆕 Con `new` (constructor)**

```js
function Persona(nombre) {
  this.nombre = nombre;
}

const p = new Persona("Jochy");
p.nombre; // "Jochy"
```

- ✔ `this` → nueva instancia creada

**6. 🏹 Arrow functions (`this` léxico)**

Las arrow functions **no** tienen su propio `this`.

Toman el `this` del contexto donde fueron **creadas**.

```js
const obj = {
  x: 10,
  regular() {
    return this.x;
  },
  arrow: () => this?.x,
};

obj.regular(); // 10
obj.arrow(); // undefined (depende del contexto exterior)
```

- 👉 `this` en arrow **no** es `obj`, sino el exterior (ej: `window` o `undefined`)

**7. 🔄 Método extraído (cambio de contexto)**

```js
const obj = {
  x: 5,
  getX() {
    return this.x;
  },
};

const fn = obj.getX;
fn(); // undefined o window.x
```

- ❌ Se pierde el contexto
- 👉 ya no se llama como método de `obj`

**8. 🧠 Solución: `bind` para mantener `this`**

```js
const obj = {
  x: 5,
  getX() {
    return this.x;
  },
};

const fn = obj.getX.bind(obj);
fn(); // 5
```

- ✔ `this` queda fijado correctamente

🎯 **Resumen rápido**

| Cómo se llama | Valor de `this` |
| ------------- | --------------- |
| `obj.metodo()` | `obj` |
| función normal | `window` / `undefined` (strict) |
| `call`/`apply`/`bind` | el que tú pases |
| `new` | nueva instancia |
| arrow function | `this` del entorno |
| método extraído | se pierde el contexto |

---

### Prototipos en JavaScript

En JavaScript, los objetos pueden **heredar** propiedades y métodos de otros objetos a través de algo llamado **prototipo**.

👉 Cada objeto tiene un **enlace interno** a otro objeto, llamado su **prototipo**.

🧭 **¿Cómo funciona?**

Cuando accedes a una propiedad:

1. JavaScript la busca en el **objeto actual**.
2. Si no la encuentra → la busca en su **prototipo**.
3. Si no está → sigue **subiendo** en la **cadena de prototipos**.
4. Hasta llegar a **`null`**.

👉 A esto se le llama **prototype chain** (cadena de prototipos).

✅ **Ejemplo básico**

```js
const padre = {
  saluda() {
    return "hola";
  },
};

const hijo = Object.create(padre);

hijo.saluda(); // "hola"
```

- ✔ `hijo` no tiene `saluda`
- ✔ JavaScript lo busca en su prototipo (`padre`)

🔍 **Ver el prototipo**

```js
Object.getPrototypeOf(hijo) === padre; // true
```

🧱 **Funciones constructoras y `.prototype`**

Las funciones en JavaScript tienen una propiedad llamada **`.prototype`**, que se usa cuando creas objetos con **`new`**.

```js
function Persona(nombre) {
  this.nombre = nombre;
}

Persona.prototype.saludar = function () {
  return `Hola, soy ${this.nombre}`;
};

const p = new Persona("Jochy");

p.saludar(); // "Hola, soy Jochy"
```

- ✔ `p` hereda `saludar` desde `Persona.prototype`
- ✔ No se copia el método: se **comparte**

🔗 **Cadena de prototipos (ejemplo visual)**

```js
const abuelo = { a: 1 };
const padre = Object.create(abuelo);
const hijo = Object.create(padre);

hijo.a; // 1
```

🔎 **Búsqueda:** `hijo` ❌ → `padre` ❌ → `abuelo` ✅

⚠️ **Sobrescritura (override)**

Si defines una propiedad en el objeto hijo, **tapa** la del prototipo al leer desde el hijo:

```js
const padre = { x: 1 };
const hijo = Object.create(padre);

hijo.x = 10;

hijo.x; // 10
padre.x; // 1
```

🎯 **¿Por qué es importante?**

- 🔁 Permite **reutilizar** código sin duplicarlo
- ⚡ Mejora el **rendimiento** (los métodos se comparten)
- 🧩 Es la base de la **herencia** en JavaScript
- 🧠 Fundamental para entender **`class`** (azúcar sintáctico sobre prototipos)

🧠 **Regla fácil de recordar**

Si un objeto **no tiene** algo… lo busca en su **padre** (prototipo).

📊 **Resumen**

| Concepto | Explicación |
| -------- | ----------- |
| Prototipo | Objeto del que otro hereda |
| `Object.create()` | Crea un objeto con un prototipo dado |
| `.prototype` | Usado por funciones constructoras con `new` |
| Cadena de prototipos | Búsqueda hacia arriba hasta `null` |
| Override | El hijo puede sobrescribir |

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

**¿Qué es currying?** Es convertir una función que recibe **varios argumentos a la vez** en una **serie de funciones** que reciben **un argumento a la vez**.

👉 **En lugar de esto:**

```js
function suma(a, b) {
  return a + b;
}
```

👉 **Haces esto:**

```js
const suma = (a) => (b) => a + b;
```

**¿Qué pasa con `suma(10)`?**

- No devuelve un número.
- Devuelve **otra función**.

```js
const masDiez = suma(10);
// masDiez es equivalente a: (b) => 10 + b

masDiez(5); // 15  → internamente: 10 + 5
```

🎯 **Idea clave:** guardar un valor **ahora** y usarlo **después** (*partial application*).

**Ejemplo útil — reutilizar lógica con un valor fijo:**

```js
const aplicarDescuento = (descuento) => (precio) =>
  precio - precio * descuento;

const descuento20 = aplicarDescuento(0.2);

descuento20(100); // 80
descuento20(200); // 160
```

🧱 **Por qué sirve:** reutilización, código más flexible, aplicar argumentos poco a poco, muy usado en estilo funcional (React, librerías FP).

⚠️ **Regla fácil:** cada función recibe **un solo argumento** y devuelve otra función hasta “terminar”.

🧠 **Mini resumen:** normal `f(a, b)` → currying `f(a)(b)`; divide la ejecución en pasos.

---

### Funciones puras

Una **función pura** es una función que se comporta de forma **totalmente predecible**.

Cumple **dos reglas principales**:

**1. Determinismo**

Si le das los mismos argumentos, **siempre** devuelve el mismo resultado.

- misma entrada → misma salida

**2. Sin efectos secundarios**

No modifica nada fuera de ella ni depende de cosas externas (para calcular su resultado).

⚠️ **¿Qué se considera un efecto secundario?**

En programación funcional, una función deja de ser pura si:

- 🔄 Modifica variables externas (estado global o compartido)
- 🌐 Hace peticiones (API, base de datos, etc.)
- 📂 Lee o escribe archivos
- 🖥️ Manipula el DOM
- 🖨️ Imprime en consola (`console.log`)
- ⏰ Depende del tiempo (`Date`, reloj del sistema)

*(En proyectos reales muchas funciones son intencionalmente impuras; lo importante es **saber** cuándo lo son y aislarlas.)*

✅ **Ejemplo de función pura**

```js
function cuadrado(n) {
  return n * n;
}
```

- ✔ Siempre devuelve lo mismo para el mismo `n`
- ✔ No usa variables externas
- ✔ No modifica nada fuera

❌ **Ejemplo de función impura**

```js
let contador = 0;

function incrementar() {
  contador++;
}
```

- ❌ Modifica una variable externa
- ❌ Depende del estado previo

⚖️ **Otro ejemplo claro**

✔ **Pura**

```js
function suma(a, b) {
  return a + b;
}
```

👉 `suma(2, 3)` siempre será `5`.

❌ **Impura**

```js
function obtenerHora() {
  return new Date();
}
```

- ❌ Depende del tiempo (estado externo)
- ❌ Cada llamada puede devolver algo diferente

🎯 **¿Por qué son importantes?**

- 🧪 Más fáciles de testear (no necesitas mocks ni estado global)
- 🔍 Más fáciles de entender
- 🔁 Más reutilizables
- 🐛 Menos bugs inesperados
- 🧩 Ideales para componer funciones

🧠 **Regla fácil de recordar**

Piensa en una **calculadora**: le das números → te da un resultado → no cambia nada más.

📊 **Resumen rápido**

| Función pura | Función impura |
| ------------ | -------------- |
| Solo usa sus argumentos | Usa estado externo |
| Misma entrada → misma salida | Puede cambiar el resultado |
| Sin efectos secundarios | Tiene efectos secundarios |

---

*Última revisión conceptual: referencia de estudio; contrasta siempre con la documentación oficial ([MDN](https://developer.mozilla.org/), [ECMAScript](https://tc39.es/ecma262/)) para detalles de versión y compatibilidad.*
