# Guía de conceptos Node.js

Referencia breve sobre el entorno de ejecución, el modelo de concurrencia y utilidades comunes.

## Tabla de contenidos

- [¿Qué es Node.js?](#qué-es-nodejs)
- [Modelo asíncrono, event loop y escalabilidad](#modelo-asíncrono-event-loop-y-escalabilidad)
- [Objetos globales](#objetos-globales)
  - [`process`](#process)
  - [`__dirname`](#__dirname)

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

*Para detalles de versiones, `import.meta` en ESM y compatibilidad, consulta la [documentación oficial de Node.js](https://nodejs.org/docs/latest/api/).*
