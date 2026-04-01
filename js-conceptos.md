# Guía de conceptos JavaScript

Documento de referencia para estudiar fundamentos, funcionamiento interno, estructuras, asincronía, navegador y temas avanzados.

---

## FUNDAMENTOS

### Variables (`var`, `let`, `const`)

- **`var`**: Declara una variable con **ámbito de función** (o global). Se puede redeclarar y reasignar. Existe **hoisting** y la inicialización queda en `undefined` hasta la línea de asignación.
- **`let`**: Declara una variable con **ámbito de bloque**. No se puede redeclarar en el mismo bloque; sí reasignar. No se accede antes de la declaración (TDZ: *temporal dead zone*).
- **`const`**: Declara una **constante de enlace**: no se puede reasignar el identificador. También es de **bloque**. El valor puede ser mutable si es un objeto o array (solo el enlace es constante).

### Tipos de datos

JavaScript es **dinámicamente tipado**. Los tipos primitivos son: **`undefined`**, **`null`**, **`boolean`**, **`number`**, **`bigint`**, **`string`**, **`symbol`**. Todo lo demás es **objeto** (incluidos arrays, funciones, fechas, etc.).

- **Primitivos**: se copian por valor; inmutables en el sentido de que no puedes “cambiar” el primitivo en sitio (reasignas otra cosa).
- **Referencia**: objetos comparten identidad; comparar con `===` compara la referencia, no el contenido profundo.

### Operadores

- **Aritméticos**: `+`, `-`, `*`, `/`, `%`, `**` (exponenciación).
- **Asignación**: `=`, `+=`, `-=`, etc.
- **Comparación**: `==` / `!=` (coerción), `===` / `!==` (estricto, recomendado).
- **Lógicos**: `&&`, `||`, `??` (nullish coalescing: solo `null`/`undefined`), `!`.
- **Incremento/decremento**: `++`, `--` (prefijo y sufijo cambian el valor devuelto).
- **Otros**: `typeof`, `instanceof`, operador ternario `cond ? a : b`, optional chaining `?.`, encadenamiento nullish.

### Condicionales (`if`, `else`, `switch`)

- **`if / else if / else`**: ejecuta bloques según condiciones booleanas. La condición se convierte a booleano de forma implícita salvo que uses comparaciones explícitas.
- **`switch`**: compara una expresión con varios `case` (normalmente con **strict equality** tras `switch` en JS clásico). Importante: **`break`** para no “caer” al siguiente `case`; `default` para el resto.

### Bucles (`for`, `while`, `do while`)

- **`for`**: inicialización, condición y actualización en una línea; ideal cuando conoces o controlas el número de iteraciones.
- **`while`**: evalúa la condición **antes** de cada iteración; puede no ejecutarse nunca.
- **`do...while`**: ejecuta **al menos una vez** y luego evalúa la condición.

También existen `for...of` (iterables, valores) y `for...in` (claves enumerables de objetos; cuidado con propiedades heredadas).

### Funciones (declaración, expresión, arrow)

- **Declaración de función**: `function nombre() {}` — tiene hoisting completo (el nombre está disponible en todo el ámbito de la función).
- **Expresión de función**: `const f = function() {}` — la variable obedece a `let`/`const` (no usar antes de declarar).
- **Arrow functions**: `const f = () => {}` — no tienen `this` propio ni `arguments` de función clásica; útiles para callbacks cortos y lexican `this` del exterior.

---

## FUNCIONAMIENTO INTERNO

### Scope (global, local, block)

- **Global**: variables accesibles desde cualquier parte del programa (p. ej. propiedades de `globalThis` / `window` en navegador).
- **Local (de función)**: variables declaradas dentro de una función; solo visibles ahí (`var` está ligado a la función).
- **De bloque**: `let` y `const` (y `class`) limitados al par de llaves `{}` donde se declaran.

### Hoisting

El motor “eleva” declaraciones a la cima de su ámbito **antes** de ejecutar el código. Las **declaraciones de función** completas se pueden invocar antes en el código; **`var`** se eleva como `undefined`; **`let`/`const`** elevan el “binding” pero entran en **TDZ** hasta la línea de declaración.

### Closures

Una **closure** es una función que **recuerda** el entorno léxico donde se creó: sigue teniendo acceso a variables externas aunque la función externa ya haya terminado. Permite factories, módulos y estado privado simulado.

### Call Stack

Pila de **frames** de ejecución: cada llamada a función apila un frame; al terminar, se desapila. Una llamada recursiva sin límite puede desbordar la pila (**stack overflow**). JavaScript en un solo hilo usa **un** call stack principal para ese hilo.

### Event Loop

Mecanismo que coordina el **call stack**, la **cola de tareas** (*task queue / macrotasks*) y las **microtareas** (p. ej. promesas). Cuando el stack está vacío, el loop toma la siguiente tarea y la ejecuta. Las microtareas se vacían antes del siguiente macrotask.

### Execution Context

Entorno en el que se ejecuta un fragmento de código: contiene el **this binding**, el **entorno léxico** (scope chain) y el estado de la función. Global y por cada invocación de función (y a veces global de `eval` en modo estricto, etc.).

### Memory Heap

Región donde viven **objetos** y datos dinámicos (referenciados desde el stack). El **garbage collector** libera lo que ya no es alcanzable; los closures mantienen vivas las variables que capturan si la función sigue referenciada.

---

## ESTRUCTURAS Y MÉTODOS

### Objetos

Colecciones de **pares clave-valor**. Las claves suelen ser strings o symbols; los valores pueden ser cualquier tipo. Acceso con `obj.prop` o `obj["prop"]`.

### Arrays

Lista ordenada indexada numéricamente; es un objeto especializado con `.length` y métodos de iteración. Índices desde `0`.

### Destructuring

Sintaxis para **extraer** valores de arrays u objetos en variables:

```js
const [a, b] = arr;
const { name, age } = user;
```

Permite valores por defecto y renombrado (`{ name: n }`).

### Spread / Rest

- **Spread** (`...`): “expande” un iterable u objeto en otro contexto (array literal, argumentos, objeto literal).
- **Rest** (`...args`): agrupa el resto de elementos en un array (parámetros o destructuring).

### Métodos de arrays (`map`, `filter`, `reduce`, `forEach`)

- **`forEach`**: ejecuta una función por cada elemento; **no devuelve** un array útil (devuelve `undefined`); no se puede `break` como en un `for` clásico.
- **`map`**: devuelve un **nuevo array** con la misma longitud, transformando cada elemento.
- **`filter`**: devuelve un **nuevo array** con elementos que cumplen la condición.
- **`reduce`**: reduce el array a **un solo valor** acumulando (con acumulador e índice opcional).

### Métodos de objetos (`Object.keys`, `Object.values`, etc.)

- **`Object.keys(obj)`**: array de claves **enumerables** propias.
- **`Object.values(obj)`**: valores de esas propiedades.
- **`Object.entries(obj)`**: pares `[clave, valor]`.
- **`Object.assign`**, **`Object.freeze` / `seal` / `preventExtensions`**, **`Object.hasOwn`**, **`Object.fromEntries`**, etc., según necesidad.

---

## ASINCRONÍA

### Callbacks

Funciones pasadas para que se ejecuten **más tarde** (p. ej. al terminar I/O o un temporizador). El patrón callback puede llevar a **callback hell** si se anidan muchas operaciones.

### Promises

Objeto que representa un valor **futuro**: estados **pending**, **fulfilled** o **rejected**. Encadenamiento con `.then` / `.catch` / `.finally`; un `then` puede devolver otra promesa para secuencias.

### `async` / `await`

`async` marca una función que **siempre** devuelve una promesa. `await` pausa la función `async` hasta que la promesa se resuelve (sin bloquear el hilo principal: el trabajo continúa vía microtareas).

### Manejo de errores (`try` / `catch`)

`try` ejecuta código; `catch` captura excepciones; `finally` corre siempre. Con `async/await`, errores de promesas rechazadas se capturan con `try/catch` alrededor del `await`.

### `Promise.all`

Recibe un iterable de promesas; se cumple con un **array de resultados** en orden si **todas** cumplen; si **una** falla, rechaza con esa razón.

### `Promise.allSettled`

Espera a que **todas** terminen (éxito o fallo); devuelve un array de objetos `{ status, value | reason }`. Nunca rechaza por un solo fallo.

### `Promise.race`

Se resuelve o rechaza con el **primer** settled de las promesas dadas (útil para timeouts o “la primera que responda”).

---

## DOM Y NAVEGADOR

### DOM manipulation

El **DOM** es la representación en árbol del HTML. Se puede **seleccionar** nodos (`querySelector`, `getElementById`, etc.), **crear** (`createElement`), **modificar** texto/atributos/clases, **insertar** (`appendChild`, `insertBefore`) y **eliminar** nodos.

### Event listeners

`addEventListener(evento, handler, opciones)` registra respuestas a eventos; `removeEventListener` requiere la **misma referencia** de función. Opciones: `once`, `passive`, `capture`.

### Event bubbling / capturing

Los eventos atraviesan el DOM en **tres fases**: captura (de raíz a objetivo), objetivo, y **bubbling** (de objetivo a raíz). Por defecto los handlers escuchan en fase de bubbling; `capture: true` invierte el orden.

### Fetch API

API basada en **promesas** para peticiones HTTP (`fetch(url, options)`). Respuesta inicial hay que leer con `.json()`, `.text()`, etc. Errores HTTP **no** rechazan la promesa por defecto; hay que comprobar `response.ok`.

### `LocalStorage` / `SessionStorage`

Almacenamiento clave-valor en el navegador (solo strings). **localStorage** persiste entre sesiones; **sessionStorage** por pestaña hasta cerrarla. Misma API; tamaño limitado y origen aislado (same-origin policy).

---

## JAVASCRIPT AVANZADO

### `this`

El valor de **`this`** depende de **cómo** se invoca la función: método de objeto (objeto base), función suelta en modo no estricto (`window` en navegador), `call`/`apply`/`bind`, constructor `new`, o arrow (léxico, no propio). En modo estricto, función suelta puede dar `undefined`.

### Prototipos

Cada objeto puede enlazar a otro objeto como **prototipo** (`Object.getPrototypeOf`). La cadena de prototipos resuelve propiedades no encontradas en el objeto. Las funciones constructoras tienen `.prototype` usado al instanciar con `new`.

### Herencia prototipal

Reutilización mediante **delegación**: un objeto delega en su prototipo. `extends` en clases es azúcar sintáctico sobre esta cadena.

### Clases (`class`)

Sintaxis declarativa para constructores y métodos; **no** es un nuevo modelo de herencia distinto del prototipal. Métodos van en el prototipo; campos de instancia pueden ir en el cuerpo de clase.

### Encapsulación

Ocultar detalles internos y exponer una API estable. En JS moderno: **campos privados** `#privado`, módulos ES, closures, convenciones con `_`.

### Inmutabilidad

No mutar datos originales; producir **nuevas** estructuras (spread, `slice`, etc.). Facilita razonar sobre el estado y optimizaciones en algunos entornos.

### Currying

Transformar `f(a, b, c)` en `f(a)(b)(c)` — funciones que devuelven funciones hasta completar argumentos. Útil para reutilización y partial application.

### Funciones puras

Misma entrada → misma salida; **sin efectos secundarios** observables (no I/O, no mutar estado externo). Base del estilo funcional y más fáciles de testear.

---

*Última revisión conceptual: referencia de estudio; contrasta siempre con la documentación oficial (MDN, ECMAScript) para detalles de versión y compatibilidad.*
