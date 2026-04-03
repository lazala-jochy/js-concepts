# js-concepts

Guías de conceptos para estudiar. La guía **JavaScript** tiene un resumen en este README; el detalle ampliado está en **[js-conceptos.md](./js-conceptos.md)**.

## Índice del repositorio

| Tema        | Documento                                                                 |
| ----------- | ------------------------------------------------------------------------- |
| JavaScript  | [js-conceptos.md](./js-conceptos.md) — guía completa                      |
| Node.js     | *Próximamente — añade `nodejs-conceptos.md` en la raíz y enlázalo aquí.* |

Cuando agregues una guía nueva, crea un archivo con un nombre claro (por ejemplo `nodejs-conceptos.md`, `typescript-conceptos.md`) y añade una fila a la tabla apuntando a `./nombre-del-archivo.md`.

---

## Tabla de contenidos (JavaScript)

### 🔹 FUNDAMENTOS

- Variables (`var`, `let`, `const`)
- Tipos de datos
- Operadores
- Condicionales
- Bucles
- Funciones

### ⚙️ FUNCIONAMIENTO INTERNO

- Scope
- Hoisting
- Closures
- Call Stack
- Event Loop
- Execution Context
- Memory Heap

### 📦 ESTRUCTURAS Y MÉTODOS

- Objetos
- Arrays
- Destructuring
- Spread / Rest
- Métodos de arrays
- Métodos de objetos

### ⏳ ASINCRONÍA

- Callbacks
- Promises
- Async / Await
- Manejo de errores
- Métodos de `Promise`

### 🌐 DOM Y NAVEGADOR

- DOM
- Eventos
- Fetch
- Storage

### 🚀 JAVASCRIPT AVANZADO

- `this`
- Prototipos
- Clases
- Encapsulación
- Inmutabilidad
- Currying
- Funciones puras

---

## 🔹 FUNDAMENTOS

### Variables (`var`, `let`, `const`)

| Tipo    | Scope   | Reasignar | Redeclarar | Notas                    |
| ------- | ------- | --------- | ---------- | ------------------------ |
| `var`   | función | ✅        | ✅         | hoisting con `undefined` |
| `let`   | bloque  | ✅        | ❌         | tiene TDZ                |
| `const` | bloque  | ❌        | ❌         | no cambia la referencia  |

```js
const obj = { n: 1 };
obj.n = 2; // permitido
// obj = {} // error
```

👉 **Best practice:** usa `const` por defecto; `let` si necesitas cambiar el valor.

### Tipos de datos

🧩 **Primitivos (por valor):** `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`

📦 **Objetos (por referencia):** arrays, funciones, objetos, etc.

```js
const a = [1];
const b = a;

a === b; // true (misma referencia)
```

⚠️ **Error común:** pensar que comparar objetos compara el contenido.

### Operadores

- `===` mejor que `==`
- `??` solo usa el default si es `null` o `undefined`
- `?.` evita errores si algo no existe

```js
const name = user?.name ?? "guest";
```

### Condicionales

```js
if (rol === "admin") {
  // acceso total
} else {
  // otro rol
}
```

👉 `switch` es útil para muchos casos; recuerda `break`.

### Bucles

- `for` → control total
- `while` → depende de la condición
- `for...of` → valores
- `for...in` → propiedades

```js
for (const v of [1, 2, 3]) console.log(v);
```

### Funciones

Tipos:

```js
function normal() {}
const expresion = function () {};
const arrow = () => {};
```

⚠️ **Arrow functions:**

- No tienen `this` propio
- No tienen `arguments` de función clásica

---

## ⚙️ FUNCIONAMIENTO INTERNO

### Scope

Dónde vive una variable:

- Global
- Función
- Bloque

### Hoisting

JavaScript procesa las declaraciones antes de ejecutar el código línea a línea.

```js
console.log(a); // undefined
var a = 10;
```

⚠️ `let` y `const` → error si accedes antes (TDZ).

### Closures

Función que recuerda variables externas.

```js
function contador() {
  let n = 0;
  return () => ++n;
}
```

👉 Muy usado en factories y encapsulación.

### Call Stack

Pila de ejecución: `a` → `b` → `c` → (vuelve).

⚠️ Demasiada recursión sin límite → stack overflow.

### Event Loop (clave 🔥)

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

**Resultado:** `A` → `D` → `C` → `B`

📌 **Regla importante:** primero código síncrono; luego microtareas (promesas); luego macrotareas (`setTimeout`).

### Execution Context

Cada función crea su propio entorno: variables, `this`, scope.

### Memory Heap

Dónde viven los objetos.

⚠️ Si algo sigue referenciado → no se borra (GC).

---

## 📦 ESTRUCTURAS Y MÉTODOS

### Objetos

```js
const user = { name: "Ana" };
```

### Arrays

```js
const nums = [1, 2, 3];
```

### Destructuring

```js
const { name } = user;
const [a, b] = [1, 2];
```

### Spread / Rest

```js
const copy = [...arr];

function sum(...nums) {}
```

### Métodos de arrays

- `arr.map()` — transforma
- `arr.filter()` — filtra
- `arr.reduce()` — acumula
- `arr.forEach()` — solo ejecuta (no devuelve un array nuevo útil)

---

## ⏳ ASINCRONÍA

### Callbacks

```js
setTimeout(() => {}, 1000);
```

### Promises

```js
fetch(url)
  .then((res) => res.json())
  .catch((err) => {});
```

### Async / Await

```js
const data = await fetch(url);
```

👉 Suele leerse más claro que encadenar muchos `.then()`.

### Manejo de errores

```js
try {
  await algo();
} catch (e) {}
```

### Métodos importantes

- `Promise.all` — falla si una falla
- `Promise.allSettled` — espera a todas (éxito o error)
- `Promise.race` — gana la primera que termina

---

## 🌐 DOM Y NAVEGADOR

### DOM

```js
document.querySelector("#id");
```

### Eventos

```js
element.addEventListener("click", () => {});
```

### Event bubbling

Los eventos suben en el DOM (de hijo hacia padre).

### Fetch

```js
const res = await fetch(url);
```

⚠️ **Ojo:** `fetch` no rechaza la promesa por errores HTTP (4xx/5xx); comprueba `res.ok` o el status.

### Storage

```js
localStorage.setItem("key", "value");
```

---

## 🚀 JAVASCRIPT AVANZADO

### `this`

Depende de **cómo** llamas la función, no solo de dónde está escrita.

### Prototipos

JavaScript usa herencia por prototipos; las clases son azúcar sintáctico sobre ese modelo.

### Clases

```js
class User {}
```

### Encapsulación

```js
class A {
  #privado = 1;
}
```

### Inmutabilidad

```js
const newState = { ...state };
```

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

### 🧠 Funciones puras

Una función pura es una función que:

👉 Siempre devuelve el mismo resultado si recibe los mismos argumentos  
👉 No produce efectos secundarios (no cambia nada fuera de ella)

🔍 ¿Qué significa "sin efectos secundarios"?

Que la función NO:

modifica variables externas  
cambia el estado global  
hace peticiones (fetch)  
escribe en consola o archivos  
modifica el DOM  

✅ Ejemplo de función pura

```js
function cuadrado(n) {
  return n * n;
}
```

✔ Si llamas cuadrado(2) → siempre será 4  
✔ No depende de nada externo  
✔ No cambia nada fuera

❌ Ejemplo de función impura

```js
let contador = 0;

function incrementar() {
  contador++; // modifica algo externo
}
```

🚫 Problemas:

El resultado depende del estado externo  
Es difícil de predecir  
Es más difícil de testear  

⚡ Otro ejemplo claro

```js
function suma(a, b) {
  return a + b;
}
```

👉 Siempre:

```js
suma(2, 3); // 5
suma(2, 3); // 5
```

⚠️ Ejemplo impuro más real

```js
function obtenerHora() {
  return new Date();
}
```

🚫 No es pura porque:

Cada vez devuelve algo diferente  
Depende del tiempo (estado externo)  

🎯 ¿Por qué son importantes?

✅ Más fáciles de testear  
✅ Más predecibles  
✅ Menos bugs  
✅ Más fáciles de reutilizar  

🧱 Regla fácil de recordar

👉 Una función pura es como una calculadora

Mismos inputs → mismo output  
No cambia nada fuera  

🧠 Resumen corto

✔ Depende solo de sus argumentos  
✔ No modifica nada externo  
❌ No usa estado global  
