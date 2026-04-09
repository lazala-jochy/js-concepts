# Guía de conceptos Node.js

Referencia breve sobre el entorno de ejecución, el modelo de concurrencia y utilidades comunes.

---

## ¿Qué es Node.js?

Node.js es un **entorno de ejecución de JavaScript del lado del servidor**, construido sobre el motor **V8** de Google. Permite ejecutar código JavaScript **fuera del navegador** y está pensado para aplicaciones **escalables** y de **alto rendimiento**.

## Modelo asíncrono y hilo principal

Funciona con un modelo **asíncrono**, **no bloqueante** y **basado en eventos**. En lugar de abrir **un hilo por cada solicitud**, usa **un solo hilo principal** que coordina la ejecución del código JavaScript.

## Event loop y libuv

El **event loop** gestiona las operaciones asíncronas: escucha eventos y ejecuta los **callbacks** cuando las tareas terminan. Lo que puede **bloquear** o ser costoso (por ejemplo **acceso al sistema de archivos** u operaciones pesadas) se **delega** a **libuv**, que usa un **thread pool** para procesar parte de ese trabajo **en segundo plano** (mientras el modelo lógico de tu código sigue siendo no bloqueante en el hilo principal).

## V8 y libuv

El motor **V8** compila JavaScript a **código máquina**, lo que permite una ejecución **rápida**. **libuv** aporta la capa de **E/S asíncrona** y **concurrencia** (event loop, thread pool, etc.) de forma eficiente.

---

## Objetos globales (`process`, `__dirname`)

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
