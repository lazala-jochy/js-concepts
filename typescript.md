# 🧠 TypeScript — Guía Completa para Expertos

> Domina TypeScript desde los fundamentos hasta los patrones más avanzados.

---

## 📚 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tipos Básicos](#tipos-básicos)
3. [Tipos Especiales](#tipos-especiales)
4. [Interfaces](#interfaces)
5. [Type Aliases](#type-aliases)
6. [Uniones e Intersecciones](#uniones-e-intersecciones)
7. [Funciones](#funciones)
8. [Clases](#clases)
9. [Generics](#generics)
10. [Narrowing y Type Guards](#narrowing-y-type-guards)
11. [Utility Types](#utility-types)
12. [Mapped Types](#mapped-types)
13. [Template Literal Types](#template-literal-types)
14. [Conditional Types](#conditional-types)
15. [Infer](#infer)
16. [Decoradores](#decoradores)
17. [Módulos y Namespaces](#módulos-y-namespaces)
18. [Declaration Files (.d.ts)](#declaration-files-dts)
19. [tsconfig.json](#tsconfigjson)
20. [Patrones Avanzados](#patrones-avanzados)

---

## Introducción

TypeScript es un superset de JavaScript con tipado estático. Se compila a JavaScript puro.

```bash
npm install -g typescript
tsc --init        # Crea tsconfig.json
tsc archivo.ts    # Compila
tsc --watch       # Modo observador
```

---

## Tipos Básicos

```ts
// Primitivos
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;
let nada: null = null;
let indefinido: undefined = undefined;

// BigInt y Symbol
let grande: bigint = 9007199254740991n;
let id: symbol = Symbol("id");

// Arrays
let numeros: number[] = [1, 2, 3];
let letras: Array<string> = ["a", "b"];

// Tuplas
let punto: [number, number] = [10, 20];
let entrada: [string, number] = ["edad", 25];

// Enum
enum Direccion {
  Norte,
  Sur,
  Este,
  Oeste,
}
const dir: Direccion = Direccion.Norte; // 0

// Enum con valores
enum Estado {
  Activo = "ACTIVO",
  Inactivo = "INACTIVO",
}

// Const Enum (más eficiente, se elimina en compilación)
const enum Color {
  Rojo,
  Verde,
  Azul,
}
```

---

## Tipos Especiales

```ts
// any — desactiva el tipado (evitar cuando sea posible)
let dato: any = "hola";
dato = 42;
dato = true;

// unknown — más seguro que any, requiere comprobación antes de usar
let entrada: unknown = obtenerDato();
if (typeof entrada === "string") {
  console.log(entrada.toUpperCase()); // OK
}

// never — representa valores que nunca ocurren
function lanzarError(msg: string): never {
  throw new Error(msg);
}

function bucleInfinito(): never {
  while (true) {}
}

// void — función sin retorno
function log(msg: string): void {
  console.log(msg);
}

// object — cualquier valor no primitivo
let obj: object = { a: 1 };

// Literal types — valores exactos
let direccion: "norte" | "sur" = "norte";
let codigo: 200 | 404 | 500 = 200;
```

---

## Interfaces

```ts
// Definición básica
interface Persona {
  nombre: string;
  edad: number;
  email?: string;          // Propiedad opcional
  readonly id: number;     // Solo lectura
}

// Métodos en interfaces
interface Animal {
  nombre: string;
  hablar(): string;
  mover(distancia?: number): void;
}

// Extensión de interfaces
interface Empleado extends Persona {
  empresa: string;
  salario: number;
}

// Interfaces para funciones
interface Comparador {
  (a: number, b: number): boolean;
}
const mayor: Comparador = (a, b) => a > b;

// Interfaces para indexación
interface Diccionario {
  [clave: string]: string;
}
const traducciones: Diccionario = { hola: "hello" };

// Interfaces para clases
interface Serializable {
  serializar(): string;
  deserializar(data: string): void;
}

// Fusión de declaraciones (Declaration Merging)
interface Config {
  host: string;
}
interface Config {
  puerto: number;
}
// Resultado: { host: string; puerto: number }
```

---

## Type Aliases

```ts
// Alias básico
type ID = string | number;
type Nombre = string;

// Alias de objeto
type Punto = {
  x: number;
  y: number;
};

// Alias de función
type Callback = (error: Error | null, resultado?: string) => void;

// Alias recursivo
type ArbolJSON = {
  valor: string;
  hijos?: ArbolJSON[];
};

// Diferencia clave con Interface:
// - type puede usar uniones, intersecciones y tipos primitivos
// - interface puede fusionarse (declaration merging)
// - Ambos pueden extenderse, pero con sintaxis diferente

type Admin = Persona & { permisos: string[] }; // Intersección con type
```

---

## Uniones e Intersecciones

```ts
// Unión (|) — uno u otro
type StringONumber = string | number;
type Resultado = "exito" | "error" | "pendiente";

function formatear(valor: string | number): string {
  return valor.toString();
}

// Intersección (&) — combina tipos
type A = { nombre: string };
type B = { edad: number };
type AB = A & B; // { nombre: string; edad: number }

// Discriminated Unions — patrón muy poderoso
type Circulo = { tipo: "circulo"; radio: number };
type Rectangulo = { tipo: "rectangulo"; ancho: number; alto: number };
type Forma = Circulo | Rectangulo;

function area(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo":
      return Math.PI * forma.radio ** 2;
    case "rectangulo":
      return forma.ancho * forma.alto;
  }
}
```

---

## Funciones

```ts
// Tipos de parámetros y retorno
function sumar(a: number, b: number): number {
  return a + b;
}

// Parámetros opcionales y por defecto
function saludar(nombre: string, titulo: string = "Sr."): string {
  return `Hola, ${titulo} ${nombre}`;
}

// Rest parameters
function concat(...partes: string[]): string {
  return partes.join(" ");
}

// Overloads — múltiples firmas
function procesar(x: number): number;
function procesar(x: string): string;
function procesar(x: number | string): number | string {
  if (typeof x === "number") return x * 2;
  return x.toUpperCase();
}

// Funciones genéricas
function identidad<T>(valor: T): T {
  return valor;
}
identidad<string>("hola");
identidad(42); // inferencia automática

// Tipo de función
type Operacion = (a: number, b: number) => number;
const multiplicar: Operacion = (a, b) => a * b;

// Funciones como parámetros
function aplicar(fn: (x: number) => number, valor: number): number {
  return fn(valor);
}

// this tipado
interface Contador {
  count: number;
  incrementar(this: Contador): void;
}
```

---

## Clases

```ts
// Clase básica
class Animal {
  // Modificadores de acceso
  public nombre: string;
  private edad: number;
  protected tipo: string;
  readonly especie: string;

  constructor(nombre: string, edad: number, especie: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.tipo = "animal";
    this.especie = especie;
  }

  // Shorthand en constructor (equivalente al anterior)
  // constructor(public nombre: string, private edad: number) {}

  // Getters y Setters
  get info(): string {
    return `${this.nombre} (${this.edad} años)`;
  }

  set setEdad(valor: number) {
    if (valor > 0) this.edad = valor;
  }

  // Métodos estáticos
  static crear(nombre: string): Animal {
    return new Animal(nombre, 0, "desconocido");
  }
}

// Herencia
class Perro extends Animal {
  constructor(nombre: string, private raza: string) {
    super(nombre, 0, "canino");
  }

  ladrar(): string {
    return "¡Guau!";
  }

  // Sobreescritura de método
  override toString(): string {
    return `${this.nombre} - ${this.raza}`;
  }
}

// Clases abstractas
abstract class Figura {
  abstract calcularArea(): number;

  describir(): string {
    return `Área: ${this.calcularArea()}`;
  }
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }

  calcularArea(): number {
    return this.lado ** 2;
  }
}

// Implementar interfaces
class Gato extends Animal implements Serializable {
  serializar(): string {
    return JSON.stringify({ nombre: this.nombre });
  }

  deserializar(data: string): void {
    const obj = JSON.parse(data);
    this.nombre = obj.nombre;
  }
}

// Clases genéricas
class Caja<T> {
  constructor(private contenido: T) {}

  obtener(): T {
    return this.contenido;
  }
}
const caja = new Caja<number>(42);
```

---

## Generics

```ts
// Función genérica
function primero<T>(arr: T[]): T {
  return arr[0];
}

// Múltiples parámetros de tipo
function par<K, V>(clave: K, valor: V): [K, V] {
  return [clave, valor];
}

// Restricciones (constraints)
function longitud<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// Keyof con generics
function obtenerPropiedad<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}

const persona = { nombre: "Ana", edad: 30 };
obtenerPropiedad(persona, "nombre"); // "Ana"

// Generics en interfaces
interface Repositorio<T> {
  buscarPorId(id: number): T;
  guardar(entidad: T): void;
  eliminar(id: number): boolean;
}

// Default type parameters
interface ApiResponse<T = any> {
  datos: T;
  status: number;
  mensaje: string;
}

// Varianza — covarianza/contravarianza
type Productor<out T> = () => T;    // Solo produce
type Consumidor<in T> = (x: T) => void; // Solo consume
```

---

## Narrowing y Type Guards

```ts
// typeof
function doble(x: string | number) {
  if (typeof x === "string") return x.repeat(2);
  return x * 2;
}

// instanceof
function procesar(x: Date | string) {
  if (x instanceof Date) return x.toISOString();
  return new Date(x).toISOString();
}

// in operator
type Pajaro = { volar(): void };
type Pez = { nadar(): void };

function mover(animal: Pajaro | Pez) {
  if ("volar" in animal) animal.volar();
  else animal.nadar();
}

// Type Predicates (is)
function esString(valor: unknown): valor is string {
  return typeof valor === "string";
}

// Assertion Functions
function afirmar(condicion: boolean, msg: string): asserts condicion {
  if (!condicion) throw new Error(msg);
}

// Exhaustiveness checking
function verificarTodo(x: never): never {
  throw new Error(`Caso no manejado: ${x}`);
}

// Discriminated Union + exhaustiveness
function manejarForma(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo": return Math.PI * forma.radio ** 2;
    case "rectangulo": return forma.ancho * forma.alto;
    default: return verificarTodo(forma); // Error en compilación si falta un caso
  }
}
```

---

## Utility Types

```ts
// Partial<T> — todas las propiedades opcionales
type PersonaParcial = Partial<Persona>;
// { nombre?: string; edad?: number; email?: string; id?: number }

// Required<T> — todas las propiedades requeridas
type PersonaRequerida = Required<PersonaParcial>;

// Readonly<T> — todas las propiedades de solo lectura
type PersonaInmutable = Readonly<Persona>;

// Pick<T, K> — seleccionar propiedades
type NombreYEdad = Pick<Persona, "nombre" | "edad">;

// Omit<T, K> — excluir propiedades
type SinId = Omit<Persona, "id">;

// Record<K, V> — objeto con claves y valores tipados
type PaginaPorNombre = Record<string, number>;
const paginas: PaginaPorNombre = { inicio: 1, contacto: 2 };

// Exclude<T, U> — excluir miembros de unión
type SoloStrings = Exclude<string | number | boolean, number | boolean>;
// string

// Extract<T, U> — extraer miembros de unión
type Numeros = Extract<string | number | boolean, number>;
// number

// NonNullable<T> — eliminar null y undefined
type Seguro = NonNullable<string | null | undefined>;
// string

// ReturnType<T> — tipo de retorno de función
function obtenerUsuario() {
  return { id: 1, nombre: "Ana" };
}
type Usuario = ReturnType<typeof obtenerUsuario>;
// { id: number; nombre: string }

// Parameters<T> — tipos de parámetros como tupla
function crear(nombre: string, edad: number) {}
type Params = Parameters<typeof crear>;
// [nombre: string, edad: number]

// ConstructorParameters<T>
class Punto { constructor(public x: number, public y: number) {} }
type PuntoParams = ConstructorParameters<typeof Punto>; // [number, number]

// InstanceType<T>
type InstanciaPunto = InstanceType<typeof Punto>; // Punto

// Awaited<T> — tipo resuelto de una Promise
type Resuelto = Awaited<Promise<string>>; // string
type Anidado = Awaited<Promise<Promise<number>>>; // number
```

---

## Mapped Types

```ts
// Básico — iterar sobre propiedades
type Opcional<T> = {
  [K in keyof T]?: T[K];
};

// Solo lectura
type Inmutable<T> = {
  readonly [K in keyof T]: T[K];
};

// Modificadores (+/-)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
type Obligatorio<T> = {
  [K in keyof T]-?: T[K];
};

// Remapeo de claves con as
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
type PersonaGetters = Getters<{ nombre: string; edad: number }>;
// { getNombre: () => string; getEdad: () => number }

// Filtrar propiedades
type SoloStrings2<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Mapped type con valor transformado
type Stringify<T> = {
  [K in keyof T]: string;
};
```

---

## Template Literal Types

```ts
// Concatenación de tipos literales
type Saludo = `Hola, ${string}`;
type EventoBoton = `on${"Click" | "Focus" | "Blur"}`;
// "onClick" | "onFocus" | "onBlur"

// Combinaciones
type Eje = "X" | "Y" | "Z";
type Propiedad = "posicion" | "rotacion";
type Transformacion = `${Propiedad}${Eje}`;
// "posicionX" | "posicionY" | "posicionZ" | "rotacionX" ...

// Con utility types de string
type Mayusculas = Uppercase<"hola">; // "HOLA"
type Minusculas = Lowercase<"HOLA">; // "hola"
type Capitalizar = Capitalize<"hola">; // "Hola"
type Descapitalizar = Uncapitalize<"Hola">; // "hola"

// Patrón evento/handler
type Eventos = "click" | "focus" | "blur";
type Handlers = {
  [K in Eventos as `on${Capitalize<K>}`]: (e: Event) => void;
};
// { onClick: ..., onFocus: ..., onBlur: ... }
```

---

## Conditional Types

```ts
// Básico: T extends U ? X : Y
type EsString<T> = T extends string ? true : false;
type A = EsString<string>;  // true
type B = EsString<number>;  // false

// Distribución sobre uniones
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]

// Evitar distribución
type ToArrayNoDistrib<T> = [T] extends [any] ? T[] : never;
type D = ToArrayNoDistrib<string | number>; // (string | number)[]

// Tipos condicionales recursivos
type Flatten<T> = T extends Array<infer Item> ? Flatten<Item> : T;
type E = Flatten<number[][][]>; // number

// DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

---

## Infer

```ts
// Extraer tipo de retorno manualmente
type MiReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extraer tipo de elemento de array
type ElementoArray<T> = T extends (infer E)[] ? E : never;
type F = ElementoArray<string[]>; // string

// Extraer primer elemento de tupla
type Primero<T extends any[]> = T extends [infer P, ...any[]] ? P : never;
type G = Primero<[string, number, boolean]>; // string

// Extraer último elemento
type Ultimo<T extends any[]> = T extends [...any[], infer L] ? L : never;

// Promesa anidada
type DesenvuelvePromesa<T> = T extends Promise<infer U>
  ? DesenvuelvePromesa<U>
  : T;

// Extraer parámetros de función
type MisParametros<T> = T extends (...args: infer P) => any ? P : never;

// Tipo de this en función
type ThisTipo<T> = T extends (this: infer This, ...args: any[]) => any
  ? This
  : never;
```

---

## Decoradores

> Requiere `"experimentalDecorators": true` en tsconfig.

```ts
// Decorador de clase
function sellado(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sellado
class MiClase {}

// Decorador con parámetros (factory)
function componente(nombre: string) {
  return function (constructor: Function) {
    console.log(`Componente registrado: ${nombre}`);
  };
}

@componente("MiComponente")
class Vista {}

// Decorador de método
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Llamando ${key} con`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Servicio {
  @log
  obtener(id: number) {
    return { id };
  }
}

// Decorador de propiedad
function noNulo(target: any, key: string) {
  let valor: any;
  Object.defineProperty(target, key, {
    get: () => valor,
    set: (v) => {
      if (v == null) throw new Error(`${key} no puede ser nulo`);
      valor = v;
    },
  });
}

// Decorador de parámetro
function requerido(target: any, key: string, index: number) {
  console.log(`Parámetro ${index} de ${key} es requerido`);
}
```

---

## Módulos y Namespaces

```ts
// Exportación
export const PI = 3.14;
export function calcular() {}
export class Matematica {}
export default class Principal {}

// Importación
import Principal, { PI, calcular } from "./modulo";
import * as Mat from "./matematica";

// Re-exportación
export { PI as constante } from "./modulo";
export * from "./otro-modulo";

// Importación de tipos (no emite código)
import type { Persona } from "./tipos";

// Namespaces (para organizar código sin módulos)
namespace Geometria {
  export interface Punto {
    x: number;
    y: number;
  }

  export function distancia(a: Punto, b: Punto): number {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }
}

const p1: Geometria.Punto = { x: 0, y: 0 };

// Módulos ambientales
declare module "*.svg" {
  const content: string;
  export default content;
}
```

---

## Declaration Files (.d.ts)

```ts
// Para librerías sin tipos — crear archivo .d.ts

// Declarar módulo
declare module "mi-libreria" {
  export function funcion(x: string): number;
  export class MiClase {
    constructor(config: Config);
    metodo(): void;
  }
  interface Config {
    url: string;
    timeout?: number;
  }
}

// Declarar variable global
declare const VERSION: string;
declare function fetch(url: string): Promise<Response>;

// Extender tipos existentes
declare global {
  interface Window {
    miPlugin: () => void;
  }
  interface Array<T> {
    ultimo(): T | undefined;
  }
}

// Augmentation de módulo
declare module "express" {
  interface Request {
    usuario?: { id: number; rol: string };
  }
}
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    // Objetivo de compilación
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM"],

    // Rutas
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": ".",
    "paths": {
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    },

    // Rigor
    "strict": true,               // Habilita todas las opciones strict
    "strictNullChecks": true,      // null y undefined son tipos separados
    "strictFunctionTypes": true,   // Varianza correcta en funciones
    "noImplicitAny": true,         // Error si tipo infiere 'any'
    "noImplicitThis": true,        // Error si 'this' es 'any'
    "exactOptionalPropertyTypes": true, // Distingue undefined de ausente

    // Extras
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    // Interoperabilidad
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,

    // Avanzadas
    "declaration": true,           // Genera .d.ts
    "declarationMap": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Patrones Avanzados

### Builder Pattern con tipos fluidos

```ts
class QueryBuilder<T extends object> {
  private conditions: Partial<T> = {};

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.conditions[key] = value;
    return this;
  }

  build(): Partial<T> {
    return this.conditions;
  }
}
```

### Branded Types (tipos nominales)

```ts
type UserId = number & { readonly _brand: "UserId" };
type ProductId = number & { readonly _brand: "ProductId" };

function crearUserId(id: number): UserId {
  return id as UserId;
}

// Evita mezclar IDs de diferentes entidades
function obtenerUsuario(id: UserId) { /* ... */ }
const uid = crearUserId(1);
obtenerUsuario(uid); // ✅
obtenerUsuario(1);   // ❌ Error de tipos
```

### Opaque Types con módulos

```ts
// Simular tipos opacos
export type Email = string & { readonly __email: unique symbol };
export function validarEmail(s: string): Email {
  if (!s.includes("@")) throw new Error("Email inválido");
  return s as Email;
}
```

### Higher-Kinded Types (simulado)

```ts
interface Functor<F> {
  map<A, B>(fa: F, f: (a: A) => B): F;
}
```

### Satisfies operator (TS 4.9+)

```ts
type Palette = Record<string, string | [number, number, number]>;

const colores = {
  rojo: [255, 0, 0],
  verde: "#00ff00",
  azul: [0, 0, 255],
} satisfies Palette;

// colores.rojo es [number, number, number] (no string | [number,number,number])
colores.rojo.map(x => x * 2); // ✅ TypeScript sabe que es un array
```

### Recursive Types

```ts
// Tipo JSON válido
type JSON =
  | string
  | number
  | boolean
  | null
  | JSON[]
  | { [key: string]: JSON };

// Ruta profunda de objeto
type DeepPath<T, Prev extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? DeepPath<T[K], `${Prev}${K}.`> | `${Prev}${K}`
    : `${Prev}${K}`;
}[keyof T & string];
```

### Variadic Tuple Types

```ts
type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B];
type T1 = Concat<[string, number], [boolean]>; // [string, number, boolean]

// Función curry tipada
function curry<T extends unknown[], R>(
  fn: (...args: T) => R
): T extends [infer First, ...infer Rest]
  ? (arg: First) => (...args: Rest) => R
  : never {
  return ((arg: any) => (...rest: any[]) => fn(arg, ...rest)) as any;
}
```

### Assertion Functions avanzadas

```ts
function esDefinido<T>(val: T): asserts val is NonNullable<T> {
  if (val == null) throw new Error("Valor nulo o indefinido");
}

let nombre: string | undefined = obtenerNombre();
esDefinido(nombre);
console.log(nombre.toUpperCase()); // TS sabe que no es undefined
```

---

## 🔑 Resumen de Conceptos Clave

| Concepto | Uso Principal |
|---|---|
| `interface` | Contratos de objetos, clases, extensión y fusión |
| `type` | Alias, uniones, intersecciones, tipos complejos |
| `generics` | Reutilización con tipos flexibles y seguros |
| `narrowing` | Afinar tipos en bloques condicionales |
| `utility types` | Transformar tipos existentes sin redefinir |
| `mapped types` | Generar tipos iterando propiedades |
| `conditional types` | Tipos que dependen de condiciones en tiempo de compilación |
| `infer` | Extraer tipos dentro de tipos condicionales |
| `satisfies` | Validar sin perder información de tipos inferidos |
| `branded types` | Tipos nominales para mayor seguridad semántica |
| `.d.ts` | Describir módulos externos sin TypeScript |
| `strict mode` | Máxima seguridad de tipos habilitada |

---

> **Recurso oficial:** [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
> **Playground:** [typescriptlang.org/play](https://www.typescriptlang.org/play)
