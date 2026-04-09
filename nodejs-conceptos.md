# Guía de conceptos Node.js

Referencia breve sobre el entorno de ejecución, el modelo de concurrencia y utilidades comunes.

## Tabla de contenidos

- [¿Qué es Node.js?](#qué-es-nodejs)
- [Modelo asíncrono, event loop y escalabilidad](#modelo-asíncrono-event-loop-y-escalabilidad)
- [¿Cómo gestiona Node.js las solicitudes?](#cómo-gestiona-nodejs-las-solicitudes)
- [¿Por qué Node.js es de un solo hilo?](#por-qué-nodejs-es-de-un-solo-hilo)
- [Objetos globales](#objetos-globales)
- [¿Qué herramientas ayudan a garantizar un estilo de código coherente?](#qué-herramientas-ayudan-a-garantizar-un-estilo-de-código-coherente)

---

## ¿Qué es Node.js?

Node.js es un **entorno de ejecución de JavaScript del lado del servidor** basado en el motor **V8** de Chrome.

Proporciona acceso a **APIs** de bajo nivel, como **sistemas de archivos**, **redes** y **procesos**.

---

## Modelo asíncrono, event loop y escalabilidad

Utiliza un modelo de **E/S asíncrono** y **basado en eventos**.

El **bucle de eventos** (*event loop*) gestiona las tareas asíncronas; las **operaciones de bloqueo** se envían al **grupo de subprocesos** (*thread pool*) de **libuv**.

Este modelo permite la escalabilidad **sin necesidad de multihilo**.

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

## ¿Qué herramientas ayudan a garantizar un estilo de código coherente?

- **ESLint** — hace cumplir reglas de calidad y estilo, y **detecta errores** y patrones problemáticos de forma automática.
- **Prettier** — formatea el código de forma **uniforme** (indentación, comillas, saltos de línea, etc.) para que todo el equipo vea el mismo estilo.
- **Husky** + **lint-staged** — ejecutan comprobaciones (lint, formato, tests ligeros) **antes de cada confirmación** (*commit*), para no subir código que rompe las reglas acordadas.
- **CI** (GitHub Actions, GitLab CI, etc.) y **extensiones del editor** — repiten las mismas reglas en el servidor y en cada máquina de desarrollo, de modo que el estilo se **aplica en todos los entornos**.

---

*Para detalles de versiones, `import.meta` en ESM y compatibilidad, consulta la [documentación oficial de Node.js](https://nodejs.org/docs/latest/api/).*
