# Guía de conceptos Node.js

Referencia breve sobre el entorno de ejecución, el modelo de concurrencia y utilidades comunes.

---

## ¿Qué es Node.js?

Node.js es un **entorno de ejecución** que permite ejecutar código **JavaScript fuera del navegador**, principalmente en el **servidor**. Está pensado para construir aplicaciones **rápidas y escalables**, sobre todo **APIs** y **servicios en tiempo real**.

---

## Single-threaded pero non-blocking

Node.js usa **un solo hilo principal** (*single-threaded*), pero puede atender **muchas operaciones a la vez** gracias a su modelo **no bloqueante** (*non-blocking*).

Eso significa que el hilo principal **no se queda bloqueado** esperando a que terminen tareas lentas (por ejemplo leer un archivo o consultar una base de datos): registra el trabajo y **sigue ejecutando** otras cosas mientras la operación se completa **en segundo plano** (I/O asíncrono, colas del *event loop*, etc.).

---

## Motor V8

**V8** es el motor de JavaScript desarrollado por **Google** que Node.js utiliza para ejecutar tu código.

Compila JavaScript a **código máquina** de forma muy eficiente, lo que contribuye al **rendimiento** de Node.js.

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
