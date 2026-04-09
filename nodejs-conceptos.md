# Guía de conceptos Node.js

Referencia breve sobre el entorno de ejecución, el modelo de concurrencia y utilidades comunes.

## Tabla de contenidos

- [¿Qué es Node.js?](#qué-es-nodejs)
- [¿Qué es REPL en Node.js?](#qué-es-repl-en-nodejs)
- [¿Qué significa E/S?](#qué-significa-es)
- [¿Qué es npm?](#qué-es-npm)
- [¿Qué es `node_modules`?](#qué-es-node_modules)
- [¿Qué es `package.json`?](#qué-es-packagejson)
- [¿Qué son los módulos en Node.js?](#qué-son-los-módulos-en-nodejs)
- [¿Qué hace `module.exports`?](#qué-hace-moduleexports)
- [¿Cómo se importan las bibliotecas externas?](#cómo-se-importan-las-bibliotecas-externas)
- [¿Cuáles son algunas de las bibliotecas de Node.js más utilizadas?](#cuáles-son-algunas-de-las-bibliotecas-de-nodejs-más-utilizadas)
- [¿Cuáles son las ventajas y desventajas de Node.js?](#cuáles-son-las-ventajas-y-desventajas-de-nodejs)
- [Modelo asíncrono, event loop y escalabilidad](#modelo-asíncrono-event-loop-y-escalabilidad)
- [¿Cuál es la diferencia entre funciones síncronas y asíncronas?](#cuál-es-la-diferencia-entre-funciones-síncronas-y-asíncronas)
- [¿Cuál es el orden en que se ejecutan las tareas asíncronas?](#cuál-es-el-orden-en-que-se-ejecutan-las-tareas-asíncronas)
- [¿Cómo gestiona Node.js las solicitudes?](#cómo-gestiona-nodejs-las-solicitudes)
- [¿Por qué Node.js es de un solo hilo?](#por-qué-nodejs-es-de-un-solo-hilo)
- [Si Node es de un solo hilo, ¿cómo escala?](#si-node-es-de-un-solo-hilo-cómo-escala)
- [¿Qué es una función de devolución de llamada en Node.js?](#qué-es-una-función-de-devolución-de-llamada-en-nodejs)
- [¿Por qué las promesas son mejores que las devoluciones de llamada?](#por-qué-las-promesas-son-mejores-que-las-devoluciones-de-llamada)
- [¿Qué es el flujo de control en Node.js?](#qué-es-el-flujo-de-control-en-nodejs)
- [Objetos globales](#objetos-globales)
- [¿Cómo se manejan las variables de entorno en Node.js?](#cómo-se-manejan-las-variables-de-entorno-en-nodejs)
- [¿Qué herramientas ayudan a garantizar un estilo de código coherente?](#qué-herramientas-ayudan-a-garantizar-un-estilo-de-código-coherente)

---

## ¿Qué es Node.js?

Node.js es un **entorno de ejecución de JavaScript del lado del servidor** basado en el motor **V8** de Chrome.

Proporciona acceso a **APIs** de bajo nivel, como **sistemas de archivos**, **redes** y **procesos**.

---

## ¿Qué es REPL en Node.js?

**REPL** viene de **Read–Eval–Print Loop** (en español: **leer**, **evaluar**, **imprimir**, **bucle**): lees una línea, el motor **evalúa** el JavaScript, **muestra** el resultado y vuelve a esperar otra entrada.

Es una **consola interactiva** para ejecutar código JavaScript con Node **sin** crear un archivo `.js` cada vez.

En la **terminal**, escribe:

```sh
node
```

y entras al REPL (para salir suele usarse **`.exit`**, **`Ctrl+D`** o **`Ctrl+C`** dos veces).

**Sirve para:** probar **fragmentos** de código, depurar **lógica** rápida y **explorar** módulos o APIs desde la consola.

---

## ¿Qué significa E/S?

**E/S** significa **Entrada/Salida** (en inglés *Input/Output* o **I/O**).

Se refiere a cualquier operación en la que un programa **recibe datos** (**entrada**) o **envía datos** (**salida**) hacia un **recurso externo** (disco, red, otro proceso, etc.).

---

## ¿Qué es npm?

**npm** (*Node Package Manager*) es el **gestor de paquetes** por defecto de Node.js: sirve para **instalar**, **compartir** y **gestionar dependencias** (librerías) en un proyecto.

Combina un **repositorio** de paquetes publicados con una **herramienta de línea de comandos** (`npm install`, `npm publish`, etc.) que facilita **reutilizar código** en lugar de implementarlo todo desde cero.

---

## ¿Qué es `node_modules`?

**`node_modules`** es la **carpeta** donde se **almacenan** todas las **dependencias** (paquetes) que instalas en tu proyecto usando **npm**.

---

## ¿Qué es `package.json`?

**`package.json`** es un archivo en formato **JSON** que **define** y **configura** un proyecto de Node.js.

Incluye **información esencial** sobre el proyecto, sus **dependencias** y **cómo ejecutarlo** (entre otros metadatos).

### Qué incluye

**Información del proyecto** — nombre, versión, descripción, etc.

**Dependencias** — librerías necesarias para que la aplicación **funcione** en producción:

```json
"dependencies": {
  "express": "^4.18.2"
}
```

**Dependencias de desarrollo** — herramientas solo para desarrollo (pruebas, recarga, lint…):

```json
"devDependencies": {
  "nodemon": "^3.0.0"
}
```

**Scripts** — comandos acortados que ejecutas con **`npm run`**:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

### Para qué sirve

- **Gestionar dependencias** (`npm install`, versiones, lockfile junto a `package-lock.json`).
- **Ejecutar comandos** del proyecto (`npm start`, `npm run dev`, etc.).
- **Compartir la misma configuración** entre desarrolladores (junto con el repositorio).

---

## ¿Qué son los módulos en Node.js?

Los **módulos** en Node.js son **archivos** (o conjuntos de archivos) que **encapsulan** código (funciones, variables u objetos) para **organizarlo**, **reutilizarlo** y **evitar conflictos** en el *scope* global.

**Cada archivo** en Node.js es un **módulo** por defecto, lo que permite **dividir** una aplicación en partes más **pequeñas** y **mantenibles**.

### Tipos de módulos

#### 1. Módulos nativos

Son los que vienen **incluidos** en Node.js, por ejemplo:

- **`fs`** — sistema de archivos  
- **`http`** — servidor / cliente HTTP  
- **`path`** — manipulación de rutas  

#### 2. Módulos locales

Son **archivos** que tú creas dentro del proyecto. Ejemplo en **CommonJS**:

`math.js`

```js
function sumar(a, b) {
  return a + b;
}

module.exports = { sumar };
```

`app.js`

```js
const { sumar } = require("./math");

console.log(sumar(2, 3)); // 5
```

#### 3. Módulos de terceros

Son **paquetes** instalados con **npm**, por ejemplo:

- **express**
- **lodash**
- **mongoose**

### Importar y exportar (CommonJS)

- **Exportar** → `module.exports` (o `exports`)
- **Importar** → `require()`

### Idea clave (útil en entrevistas)

Los **módulos** permiten **estructurar** el código en partes **reutilizables** y **desacopladas**, mejorando la **organización** y la **escalabilidad** de las aplicaciones en Node.js.

---

## ¿Qué hace `module.exports`?

**`module.exports`** es el objeto que Node.js usa para definir **qué parte** de un módulo (archivo) será **accesible** desde otros archivos.

En la práctica, **todo lo que asignes** a `module.exports` es lo que podrás **importar** con **`require()`**.

### Ejemplo básico

`math.js`

```js
function sumar(a, b) {
  return a + b;
}

module.exports = sumar;
```

`app.js`

```js
const sumar = require("./math");

console.log(sumar(2, 3)); // 5
```

### Exportar varias cosas

`math.js`

```js
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

module.exports = {
  sumar,
  restar,
};
```

`app.js`

```js
const { sumar, restar } = require("./math");
```

### Idea clave (útil en entrevistas)

**`module.exports`** define la **“interfaz pública”** del módulo: qué funciones o datos pueden **reutilizarse** desde otros archivos.

---

## ¿Cómo se importan las bibliotecas externas?

**1. Instalar el paquete** con **npm** (queda en `node_modules` y se registra en `package.json`):

```sh
npm install nombre-del-paquete
```

**2. Importarlo en el código** de una de estas formas:

**CommonJS** (sistema tradicional de Node):

```js
const express = require("express");
```

**ES Modules** (sintaxis moderna; suele requerir `"type": "module"` en `package.json` o archivos `.mjs`):

```js
import express from "express";
```

**`require`** es el modelo **clásico** de Node (**CommonJS**); **`import`** corresponde a **ES Modules**, el estándar de módulos de JavaScript en el lenguaje.

### Idea clave (útil en entrevistas)

Primero **`npm install`**, luego **`require()`** o **`import`** según el sistema de módulos del proyecto.

---

## ¿Cuáles son algunas de las bibliotecas de Node.js más utilizadas?

Algunas muy habituales en proyectos reales (la lista varía según el equipo y el dominio):

- **Express** — *framework* web minimalista para **rutas** y **middleware**.
- **Mongoose** — **ODM** de MongoDB para **esquemas** y **validaciones**.
- **dotenv** — carga y gestiona **variables de entorno** desde archivos `.env`.
- **axios** o **node-fetch** — **cliente HTTP** para hacer peticiones salientes.
- **Winston** o **Pino** — **logging** (registro de eventos y depuración en producción).
- **nodemon** — **reinicia** el proceso de Node al **guardar** cambios en los archivos (desarrollo).
- **Jest** o **Mocha** — **pruebas** automatizadas (*testing*).

---

## ¿Cuáles son las ventajas y desventajas de Node.js?

### Ventajas

- **Rendimiento** muy bueno en cargas de trabajo con **mucho E/S** (APIs, tiempo real, proxies, etc.).
- **Un solo lenguaje** (**JavaScript** o **TypeScript**) en **frontend** y **backend**.
- **Gran ecosistema** gracias a **npm** y la comunidad.
- El modelo **asíncrono** y **no bloqueante** encaja bien con **alta concurrencia** de conexiones y operaciones de I/O.

### Desventajas

- **No es la mejor opción** para tareas **CPU-intensivas** (cálculo pesado, procesamiento de vídeo grande en un solo hilo, etc.) sin **Worker Threads**, procesos hijos u otros patrones.
- Los **patrones asíncronos** (*callbacks*, promesas, `async`/`await`) pueden costar al **principio**.
- El ecosistema es **flexible** y **menos unificado** que algunos *frameworks* muy **opinados** y “todo en uno” (p. ej. **Spring** o **Laravel**): hay muchas formas válidas de montar un proyecto, lo que exige **criterio** y acuerdos en el equipo.

---

## Modelo asíncrono, event loop y escalabilidad

Utiliza un modelo de **E/S asíncrono** y **basado en eventos**.

El **bucle de eventos** (*event loop*) gestiona las tareas asíncronas; las **operaciones de bloqueo** se envían al **grupo de subprocesos** (*thread pool*) de **libuv**.

Este modelo permite la escalabilidad **sin necesidad de multihilo**.

---

## ¿Cuál es la diferencia entre funciones síncronas y asíncronas?

La diferencia está en **cómo se ejecutan** y en **cómo** se gestiona el **tiempo de espera** (sobre todo en operaciones lentas como E/S).

### Funciones síncronas

Se ejecutan de forma **secuencial**, una detrás de otra. Cada operación **bloquea** la ejecución hasta que termina.

```js
console.log("Inicio");

const data = leerArchivoSync(); // bloquea hasta terminar

console.log("Fin");
```

Aquí **`Fin`** **no** se ejecuta hasta que `leerArchivoSync` ha terminado.

### Funciones asíncronas

**No bloquean** el hilo de esa forma: el programa puede **seguir** mientras la operación se completa **en segundo plano** (y el resultado llega por *callback*, promesa, etc.).

```js
console.log("Inicio");

leerArchivoAsync((data) => {
  console.log("Archivo listo");
});

console.log("Fin");
```

Aquí **`Fin`** suele imprimirse **antes** que `"Archivo listo"`.

### Diferencias clave

| Aspecto | **Síncronas** | **Asíncronas** |
|--------|----------------|----------------|
| **Bloqueo** | Bloquean el hilo mientras dura la operación | No bloquean: permiten otras tareas |
| **Orden** | Orden estricto, paso a paso | Concurrencia lógica; el orden de finalización puede variar |
| **Enfoque** | Más simples de leer en secuencia | Más adecuadas para I/O; requieren *callbacks*, promesas o `async`/`await` |

### Idea clave (útil en entrevistas)

Las funciones **síncronas** **esperan** a que cada paso termine antes de continuar. Las **asíncronas** permiten **seguir** la ejecución y encajan muy bien con **E/S** en Node.js, donde no conviene **bloquear** el hilo principal esperando discos o red.

---

## ¿Cuál es el orden en que se ejecutan las tareas asíncronas?

El orden **real** no es solo “como aparece en el código”: depende del **event loop**, de las **colas** (*queues*) y del **tipo** de tarea (*microtask* vs *macrotask*).

### Orden general (modelo mental)

1. **Código síncrono** (*call stack*) — se ejecuta **primero**, línea por línea, hasta vaciar lo pendiente en ese turno.
2. **`process.nextTick()`** — cola con **máxima prioridad** entre lo “inmediato” asíncrono: se drena **justo después** del código síncrono del turno actual, **antes** que promesas y **antes** que las *macrotareas* del event loop.
3. **Microtareas** (principalmente **promesas**: `.then`, `.catch`, `.finally`) — se ejecutan **después** de `nextTick` y **antes** de pasar a la siguiente *macrotarea*.
4. **Event loop** — *macrotareas* por **fases** (timers, I/O pendiente, *check* / `setImmediate`, *close callbacks*, etc.).

Las **fases** del loop en Node incluyen, entre otras: **timers** (`setTimeout`, `setInterval`), **pending callbacks**, **poll** (mucho I/O), **check** (`setImmediate`), **close callbacks**. El detalle exacto puede consultarse en la [documentación de Node sobre el event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick).

### Ejemplo

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

setImmediate(() => console.log("3"));

Promise.resolve().then(() => console.log("4"));

process.nextTick(() => console.log("5"));

console.log("6");
```

**Salida típica:**

```text
1
6
5
4
```

Luego **`2`** o **`3`** (el orden entre `setTimeout(..., 0)` y `setImmediate` **no está garantizado** de la misma forma en todos los contextos; en el *top-level* de un script suele variar según versión y entorno).

### Orden resumido (clave en entrevistas)

1. Código **síncrono**
2. **`process.nextTick`**
3. **Microtareas** (promesas)
4. **Timers** (`setTimeout`, `setInterval`)
5. **I/O** (*poll*, según lo pendiente)
6. **`setImmediate`** (fase *check*)
7. ***Close* callbacks**

### Idea clave

Node **prioriza** primero el código **síncrono**, luego **`nextTick`**, luego **microtareas** (promesas) y después las **fases** del **event loop**; eso fija el **orden efectivo** de las tareas asíncronas.

---

## ¿Cómo gestiona Node.js las solicitudes?

Node.js gestiona las solicitudes con un modelo **asíncrono**, **no bloqueante** y **basado en eventos**, lo que permite atender **muchas conexiones concurrentes** con **un solo hilo** de JavaScript.

Cuando llega una solicitud (por ejemplo, a un **servidor HTTP**), el flujo habitual es:

1. **Recepción de la solicitud** — el servidor recibe la petición y entra en el flujo que gestiona el **event loop**.
2. **Ejecución en el hilo principal** — si la tarea es **rápida** (lógica simple, respuesta inmediata), se ejecuta en el hilo principal sin delegar.
3. **Delegación de tareas pesadas** — si hace falta algo **lento** (leer archivos, consultar una base de datos, etc.), Node **delega** el trabajo a **libuv** (E/S del SO, *thread pool*, según el caso).
4. **Continuación sin bloqueo** — mientras esa operación sigue en segundo plano, el **event loop** puede **seguir atendiendo otras solicitudes**.
5. **Callback / promesa** — cuando la operación termina, el resultado se **encola** (p. ej. microtareas de promesas o callbacks de I/O).
6. **El event loop ejecuta la respuesta** — el loop **retoma** la tarea completada, ejecuta el **callback** o **resuelve la promesa**, y se envía la **respuesta al cliente**.

---

## ¿Por qué Node.js es de un solo hilo?

Node.js es de un solo hilo porque está **diseñado para simplificar el modelo de concurrencia** y **maximizar el rendimiento** en operaciones de **entrada/salida (I/O)**.

Utiliza **un único hilo principal** para ejecutar el código JavaScript y un **event loop** que gestiona las solicitudes. Eso **evita** muchos problemas habituales de sistemas **multihilo**: **bloqueos** (*deadlocks*), **condiciones de carrera** y la **complejidad de sincronización** entre hilos.

En lugar de crear **un hilo por cada solicitud**, Node.js **delega** las operaciones costosas o bloqueantes a **libuv**, que puede usar el **sistema operativo** o un **thread pool** para procesarlas en segundo plano. Mientras tanto, el **hilo principal** sigue **libre** para atender otras solicitudes.

Además, el motor **V8** de Google está **optimizado** para ejecutar código JavaScript en **un solo hilo** de forma muy eficiente.

**En resumen:** Node.js es de un solo hilo para mantener **simplicidad** y **eficiencia**, usando **asincronía** y **delegación de tareas** para lograr **concurrencia** sin necesidad de **múltiples hilos**.

---

## Si Node es de un solo hilo, ¿cómo escala?

El **event loop** gestiona la **concurrencia** en Node.js **programando** las operaciones de **entrada/salida (I/O)** de forma **no bloqueante**, de modo que el **hilo principal** **sigue ejecutando otras tareas** mientras las operaciones asíncronas **obtienen sus resultados** (sin bloquearse esperando en vacío).

La librería **libuv** se encarga de manejar las operaciones **asíncronas** en segundo plano, utilizando un **thread pool** para ejecutar tareas que **podrían bloquear**, como **acceso al sistema de archivos** u operaciones de **criptografía**.

Las primitivas asíncronas —**callbacks**, **promesas** y **`async`/`await`**— permiten **coordinar** y **manejar el flujo** de estas operaciones y facilitan escribir código asíncrono de forma más **clara** y **mantenible**.

---

## ¿Qué es una función de devolución de llamada en Node.js?

Una **función de devolución de llamada** (*callback*) en Node.js es una **función que pasas como argumento** a otra función y que se **ejecuta después** de que una operación **asíncrona** ha **terminado**.

Se usa sobre todo para **manejar el resultado** de tareas que **tardan**: leer archivos, consultar una base de datos, llamadas a APIs, etc., **sin bloquear** el **hilo principal**.

**Ejemplo** (API basada en *callback* del módulo `fs` en **CommonJS**):

```js
const fs = require("fs");

fs.readFile("archivo.txt", "utf8", (error, data) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Contenido:", data);
});
```

---

## ¿Por qué las promesas son mejores que las devoluciones de llamada?

Las promesas son **mejores** que los *callbacks* para muchos casos porque ofrecen una forma más **clara**, **estructurada** y **manejable** de trabajar con código asíncrono.

### 1. Evitan el “callback hell”

Con *callbacks* anidados, el código se vuelve difícil de leer y mantener:

```js
doA(() => {
  doB(() => {
    doC(() => {
      // difícil de entender
    });
  });
});
```

Con **promesas**:

```js
doA()
  .then(() => doB())
  .then(() => doC());
```

Más **lineal** y fácil de seguir.

### 2. Mejor manejo de errores

Con *callbacks*, a menudo debes manejar errores **en cada nivel**. Con **promesas**, puedes centralizar con **`.catch()`**:

```js
doA()
  .then(() => doB())
  .then(() => doC())
  .catch((err) => console.error(err));
```

### 3. Encadenamiento (*chaining*)

Las promesas permiten **encadenar** operaciones manteniendo un flujo **lógico** y explícito.

### 4. Integración con `async`/`await`

Las promesas son la **base** de `async`/`await`, que permite escribir código asíncrono de forma muy legible:

```js
async function ejecutar() {
  try {
    await doA();
    await doB();
    await doC();
  } catch (err) {
    console.error(err);
  }
}
```

### Idea clave (útil en entrevistas)

Las **promesas** mejoran la **legibilidad**, el **manejo de errores** y la **composición** del código asíncrono, y evitan gran parte de la complejidad de los **callbacks anidados**.

---

## ¿Qué es el flujo de control en Node.js?

El **flujo de control** es la forma en que se **organiza** y **ordena** la ejecución de las operaciones, sobre todo cuando hay **código asíncrono**.

Como Node es **no bloqueante**, muchas tareas **no** siguen un orden secuencial “línea a línea” como en un script puramente síncrono; el flujo de control sirve para decidir **cuándo** y en **qué orden** se ejecutan las funciones cuando intervienen esperas de I/O, temporizadores, etc.

### Cómo se maneja

En la práctica se coordina con:

- **Callbacks**
- **Promesas** (`.then`, `.catch`, etc.)
- **`async`/`await`**

### Ejemplo con *callback*

```js
leerArchivo((data) => {
  procesarData(data, () => {
    guardarResultado();
  });
});
```

El **orden real** depende de **cuándo terminan** las operaciones asíncronas, no solo del orden textual.

### Ejemplo con `async`/`await`

```js
async function ejecutar() {
  const data = await leerArchivo();
  const resultado = await procesarData(data);
  await guardarResultado();
}
```

Aquí el **orden de lectura** es más **claro** y parece **secuencial**, aunque por debajo siguen siendo operaciones asíncronas.

### Por qué es importante

- **Orquestar** la ejecución cuando hay operaciones **asíncronas**.
- **Evitar** usar un resultado **antes** de que exista (condiciones de carrera lógicas).
- **Mejorar** la legibilidad y el mantenimiento del código.

### Idea clave (útil en entrevistas)

El **flujo de control** define **cómo se coordinan** las operaciones en Node.js, en especial las **asíncronas**, usando **callbacks**, **promesas** y **`async`/`await`** para mantener un **orden de ejecución** coherente con lo que el programa necesita hacer.

---

## Objetos globales

Node.js expone identificadores **globales** sin importarlos en muchos proyectos. `process` está disponible de forma uniforme; `__dirname` es directo en **CommonJS** (`require`). En **módulos ES** (`import`) a menudo se deriva de `import.meta.url`.

### `process`

Objeto con información y control del **proceso** actual de Node.js: por ejemplo **variables de entorno** (`process.env`), **argumentos de la línea de comandos** (`process.argv`), señales de salida, etc.

### `__dirname`

Cadena con la **ruta absoluta del directorio** donde está el **archivo actual** (no el directorio de trabajo desde el que lanzaste `node`).

```js
console.log(process.cwd()); // directorio desde el que ejecutaste node
console.log(__dirname); // carpeta del archivo que contiene esta línea (CommonJS)
```

---

## ¿Cómo se manejan las variables de entorno en Node.js?

Las **variables de entorno** sirven para guardar **configuración** que depende del **entorno** o es **sensible** (claves API, credenciales, puertos, URLs de base de datos) **sin** dejarla fija (*hardcodeada*) en el código fuente.

### Cómo acceder a ellas

Node.js las expone en el objeto global **`process.env`**:

```js
console.log(process.env.PORT);
```

### Definir variables de entorno

**1. Desde la terminal** (ejemplo en Unix / macOS):

```sh
PORT=3000 node app.js
```

**2. Con un archivo `.env`** (muy habitual en desarrollo)

Instala **dotenv** y cárgalo al **inicio** de la aplicación:

```sh
npm install dotenv
```

```js
require("dotenv").config();

console.log(process.env.DB_URL);
```

Ejemplo de **`.env`** (no es JSON; son pares `CLAVE=valor`):

```env
PORT=3000
DB_URL=postgres://user:password@localhost:5432/db
```

### Buenas prácticas

- No subir **`.env`** a Git; usar **`.gitignore`** para ignorarlo.
- **Separar** configuración por entorno (*development*, *production*, etc.).
- **Validar** las variables **requeridas** al iniciar la aplicación.

### Idea clave (útil en entrevistas)

Las variables de entorno permiten **configurar** la app de forma **segura** y **flexible**; se leen con **`process.env`**, y en proyectos locales es común usar **`.env`** junto con **dotenv**.

---

## ¿Qué herramientas ayudan a garantizar un estilo de código coherente?

- **ESLint** — hace cumplir reglas de calidad y estilo, y **detecta errores** y patrones problemáticos de forma automática.
- **Prettier** — formatea el código de forma **uniforme** (indentación, comillas, saltos de línea, etc.) para que todo el equipo vea el mismo estilo.
- **Husky** + **lint-staged** — ejecutan comprobaciones (lint, formato, tests ligeros) **antes de cada confirmación** (*commit*), para no subir código que rompe las reglas acordadas.
- **CI** (GitHub Actions, GitLab CI, etc.) y **extensiones del editor** — repiten las mismas reglas en el servidor y en cada máquina de desarrollo, de modo que el estilo se **aplica en todos los entornos**.

---

*Para detalles de versiones, `import.meta` en ESM y compatibilidad, consulta la [documentación oficial de Node.js](https://nodejs.org/docs/latest/api/).*
