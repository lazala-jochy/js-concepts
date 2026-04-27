# JavaScript Concepts Guide

> A reference document for studying **fundamentals**, **internals**, **data structures**, **async**, **the browser**, and **advanced topics**. Built for quick lookup and deep study.

---

## Table of Contents

### [Fundamentals](#fundamentals)
- [Variables (`var`, `let`, `const`)](#variables-var-let-const)
- [Data types](#data-types)
- [Value vs Reference](#value-vs-reference)
- [Operators](#operators)
- [Conditionals](#conditionals)
- [Loops](#loops)
- [Functions](#functions)
- [First-class functions](#first-class-functions)

### [Internals](#internals)
- [Scope](#scope)
- [Hoisting](#hoisting)
- [Closures](#closures)
- [Call Stack](#call-stack)
- [Event Loop](#event-loop)
- [Execution Context](#execution-context)
- [Memory Heap](#memory-heap)

### [Structures & Methods](#structures--methods)
- [Objects](#objects)
- [Arrays](#arrays)
- [Destructuring](#destructuring)
- [Spread / Rest](#spread--rest)
- [Array methods](#array-methods-map-filter-reduce-foreach)
- [Object methods](#object-methods)

### [Async](#async)
- [Callbacks](#callbacks)
- [Promises](#promises)
- [async / await](#async--await)
- [Error handling](#error-handling)
- [Promise combinators](#promise-combinators)

### [DOM & Browser](#dom--browser)
- [DOM manipulation](#dom-manipulation)
- [Event listeners](#event-listeners)
- [Event bubbling / capturing](#event-bubbling--capturing)
- [Fetch API](#fetch-api)
- [Web Storage](#web-storage)

### [Advanced](#advanced)
- [`this`](#this)
- [Prototypes](#prototypes)
- [Prototypal inheritance](#prototypal-inheritance)
- [Classes](#classes)
- [Encapsulation](#encapsulation)
- [Immutability](#immutability)
- [Currying](#currying)
- [Pure functions](#pure-functions)

---

## Fundamentals

### Variables (`var`, `let`, `const`)

JavaScript has three ways to declare variables. Each differs in **scope**, **hoisting behavior**, and **reassignment rules**.

| | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block `{}` | Block `{}` |
| Redeclaration | Yes | No | No |
| Reassignment | Yes | Yes | No |
| Hoisting | `undefined` | TDZ error | TDZ error |

#### Scope

`var` is function-scoped — it ignores `if`, `for`, and other blocks. `let` and `const` are block-scoped.

```js
if (true) {
  var a = 10;
  let b = 20;
  const c = 30;
}

console.log(a); // 10   — var leaked out of the block
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```

#### Hoisting

All declarations are processed before code runs. The difference is what value they hold until the declaration line is reached.

```js
// var is hoisted and initialized as undefined
console.log(x); // undefined (no error)
var x = 5;

// let/const are hoisted but stay in the Temporal Dead Zone (TDZ)
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

Internally, JavaScript treats your `var` code like this:

```js
var x;          // declaration hoisted
console.log(x); // undefined
x = 5;          // assignment stays in place
```

#### Temporal Dead Zone (TDZ)

`let` and `const` exist from the start of their block but cannot be accessed until the declaration line. Accessing them before that throws a `ReferenceError`.

```js
{
  // TDZ starts here for 'name'
  console.log(name); // ReferenceError

  let name = "Ana"; // TDZ ends here
  console.log(name); // "Ana"
}
```

#### `const` and mutability

`const` protects the **reference**, not the value. You cannot point the variable at a new object, but you can modify the object it already points to.

```js
const user = { name: "Ana" };

user.name = "Luis"; // valid — same object, different content
user = {};          // TypeError — you're changing the reference

const nums = [1, 2, 3];
nums.push(4);  // valid
nums = [];     // TypeError
```

To make an object truly immutable, use `Object.freeze()`:

```js
const config = Object.freeze({ debug: false });
config.debug = true; // silently ignored (TypeError in strict mode)
```

> `Object.freeze` is shallow — nested objects are still mutable.

#### Best practices

- Use `const` by default.
- Use `let` only when you need to reassign.
- Avoid `var` in modern code — its function scope and hoisting behavior cause subtle bugs.
- Declare variables as close as possible to where they are used.

---

### Data types

JavaScript is **dynamically typed** — types are associated with values, not variables.

#### Primitives (7 types)

```js
undefined   // a variable that has not been assigned
null        // intentional absence of value
boolean     // true or false
number      // 64-bit float: 42, 3.14, NaN, Infinity
bigint      // arbitrary precision integer: 9007199254740993n
string      // "hello", 'world', `template ${literal}`
symbol      // unique, non-colliding identifier: Symbol("id")
```

Primitives are **immutable** and **compared by value**.

#### Objects (everything else)

Arrays, functions, dates, maps, sets, and plain objects `{}` are all objects. Objects are **mutable** and **compared by reference**.

```js
typeof 42;          // "number"
typeof "hi";        // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object"  ← historical bug in JS, not fixable
typeof [];          // "object"
typeof function(){}; // "function"
typeof Symbol();    // "symbol"
typeof 42n;         // "bigint"
```

> To check for `null`, use strict equality: `value === null`. `typeof null` returns `"object"`, which is misleading.

---

### Value vs Reference

When you work with primitives, JavaScript copies the **value**. When you work with objects, JavaScript copies the **reference** (a pointer to the same memory location).

#### Primitives — copy by value

```js
let a = 10;
let b = a; // b gets a copy of the value

b = 20;

console.log(a); // 10 — unchanged
console.log(b); // 20
```

#### Objects — copy by reference

```js
const obj1 = { score: 10 };
const obj2 = obj1; // obj2 points to the SAME object

obj2.score = 99;

console.log(obj1.score); // 99 — both variables see the change
console.log(obj2.score); // 99
```

```
obj1 ──┐
       ├──► { score: 99 }
obj2 ──┘
```

#### How to copy an object without sharing it

```js
// Shallow copy (one level deep)
const copy = { ...original };
const copy = Object.assign({}, original);

// Deep copy (all levels)
const deep = structuredClone(original);
```

> Arrays behave the same way: `const b = a` shares the array, `const b = [...a]` makes a shallow copy.

---

### Operators

#### Equality: `==` vs `===`

`===` (strict) checks value AND type — always prefer it. `==` coerces types, which produces surprising results.

```js
0 == "0"   // true  — type coercion converts string to number
0 === "0"  // false — different types

null == undefined  // true
null === undefined // false

NaN === NaN // false — NaN is never equal to itself
Number.isNaN(NaN) // true — correct way to check
```

#### Logical operators

```js
// && returns the first falsy value, or the last value if all are truthy
true && "hello" // "hello"
null && "hello" // null

// || returns the first truthy value, or the last value if all are falsy
null || "default"  // "default"
"hello" || "default" // "hello"

// ?? (nullish coalescing) — only triggers on null or undefined
0 ?? "default"     // 0     ← 0 is not null/undefined
null ?? "default"  // "default"
```

#### Optional chaining `?.`

Safely access nested properties without crashing on `null` or `undefined`.

```js
const user = null;

user.address.city       // TypeError — crashes
user?.address?.city     // undefined — safe

user?.getProfile?.()    // also works on method calls
```

#### Ternary

```js
const label = age >= 18 ? "adult" : "minor";
```

---

### Conditionals

#### `if / else if / else`

```js
const role = "editor";

if (role === "admin") {
  console.log("full access");
} else if (role === "editor") {
  console.log("can edit");
} else {
  console.log("read only");
}
```

#### `switch`

Use `switch` when comparing one value against many fixed cases. Always add `break` — without it, execution falls through to the next case.

```js
switch (role) {
  case "admin":
    console.log("full access");
    break;
  case "editor":
    console.log("can edit");
    break;
  default:
    console.log("read only");
}
```

> Intentional fall-through (no `break`) is valid but should be clearly commented so it does not look like a bug.

---

### Loops

```js
// Classic for — when you control the counter
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while — condition checked before each iteration
let n = 0;
while (n < 3) {
  n++;
}

// do...while — body runs at least once
do {
  n++;
} while (n < 1);

// for...of — iterate over values of any iterable
for (const item of ["a", "b", "c"]) {
  console.log(item);
}

// for...in — iterate over enumerable keys of an object
const obj = { x: 1, y: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
```

> Avoid `for...in` on arrays — it iterates keys (as strings) and can pick up inherited properties. Use `for...of` or array methods instead.

---

### Functions

#### Declaration vs expression vs arrow

```js
// Declaration — hoisted completely, callable before the line
function add(a, b) {
  return a + b;
}

// Expression — not hoisted (follows let/const rules)
const subtract = function(a, b) {
  return a - b;
};

// Arrow — concise, no own `this` or `arguments`
const multiply = (a, b) => a * b;

// Single expression: implicit return (no braces needed)
const square = n => n * n;

// Returning an object literal: wrap in parentheses
const makeUser = name => ({ name, active: true });
```

#### Default parameters

```js
function greet(name = "stranger") {
  return `Hello, ${name}`;
}

greet();         // "Hello, stranger"
greet("Ana");    // "Hello, Ana"
```

#### Rest parameters

```js
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3, 4); // 10
```

> Arrow functions do not have their own `this` or `arguments`. Do not use them as object methods when you need `this` to refer to the object.

---

### First-class functions

In JavaScript, functions are values. You can store them in variables, pass them as arguments, and return them from other functions.

```js
// Store in a variable
const greet = name => `Hello, ${name}`;

// Pass as an argument (callback pattern)
function run(fn, value) {
  return fn(value);
}
run(greet, "Jochy"); // "Hello, Jochy"

// Return from another function (factory pattern)
function multiplier(factor) {
  return number => number * factor;
}

const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15
```

---

## Internals

### Scope

Scope determines where a variable is visible.

```
Global scope
└── Function scope (var, function declarations)
    └── Block scope (let, const, class)
```

```js
const global = "I'm everywhere";

function outer() {
  const outerVar = "outer";

  function inner() {
    const innerVar = "inner";
    console.log(global);   // accessible
    console.log(outerVar); // accessible (closure)
    console.log(innerVar); // accessible
  }

  console.log(innerVar); // ReferenceError — not in scope
}
```

---

### Hoisting

JavaScript processes declarations before executing code. Only the **declaration** is hoisted, not the assignment.

```js
// function declarations: fully hoisted
sayHi(); // "hi" — works before the line

function sayHi() {
  console.log("hi");
}

// var: hoisted as undefined
console.log(x); // undefined
var x = 10;

// let / const: hoisted but in TDZ — error if accessed early
console.log(y); // ReferenceError
let y = 10;

// Function expressions: follow variable rules
greet(); // TypeError: greet is not a function
var greet = function() { return "hello"; };
```

---

### Closures

A closure is a function that **remembers the variables from its outer scope** even after that outer function has finished executing.

```js
function makeCounter() {
  let count = 0; // private to makeCounter

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    value()     { return count; },
  };
}

const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.value();     // 1
```

Each call to `makeCounter()` creates an independent `count` — closures do not share state unless they share the same outer scope.

**Common use cases:** data privacy, factory functions, memoization, event handlers that remember context.

```js
// Practical: pre-configured function
function createLogger(prefix) {
  return message => console.log(`[${prefix}] ${message}`);
}

const info = createLogger("INFO");
const warn = createLogger("WARN");

info("server started"); // [INFO] server started
warn("disk low");       // [WARN] disk low
```

---

### Call Stack

The call stack is a LIFO structure that tracks which function is currently running.

```js
function c() { console.log("c"); }
function b() { c(); }
function a() { b(); }

a();
// Stack grows:   a → b → c
// Stack shrinks: c ← b ← a
```

When a function is called, a **frame** is pushed. When it returns, the frame is popped. Infinite recursion fills the stack until a **stack overflow** error occurs.

```js
// Stack overflow
function recurse() { recurse(); }
recurse(); // RangeError: Maximum call stack size exceeded
```

---

### Event Loop

JavaScript is single-threaded. The event loop is how it handles async operations without blocking.

**The three queues:**

```
Call Stack       — synchronous code runs here
Microtask Queue  — Promise callbacks, queueMicrotask (HIGH priority)
Macrotask Queue  — setTimeout, setInterval, DOM events (LOWER priority)
```

**The rule:** when the call stack is empty, drain ALL microtasks first, then take ONE macrotask, then repeat.

```js
console.log("A"); // sync

setTimeout(() => console.log("B"), 0); // macrotask

Promise.resolve()
  .then(() => console.log("C"));       // microtask

console.log("D"); // sync

// Output: A → D → C → B
```

**Why `setTimeout(fn, 0)` is not instant:** "0ms" means "add to macrotask queue". It still waits for the call stack to empty AND all microtasks to drain.

```js
// Microtasks always beat macrotasks
Promise.resolve().then(() => {
  console.log("microtask 1");
  Promise.resolve().then(() => console.log("microtask 2")); // also runs before macrotask
});

setTimeout(() => console.log("macrotask"), 0);

// microtask 1 → microtask 2 → macrotask
```

---

### Execution Context

Every time JavaScript runs code, it creates an **execution context** — the environment where that code runs.

An execution context contains:
- `this` — what the current receiver is
- Variables — local bindings
- Scope chain — access to outer scopes

**Types:**
- **Global** — created once when the program starts
- **Function** — created on every function call
- **Eval** — (avoid)

```js
const obj = {
  x: 10,
  getX() { return this.x; }, // `this` = obj when called as obj.getX()
};

obj.getX(); // 10

// Extract the method — context is lost
const fn = obj.getX;
fn(); // undefined (strict mode) or window.x (non-strict)

// Fix: bind the context
const bound = obj.getX.bind(obj);
bound(); // 10
```

> `this` is determined by **how** a function is called, not where it is defined.

---

### Memory Heap

The heap is where JavaScript stores objects, arrays, and other dynamic data. Primitives and references (pointers) live on the stack frame; the actual object data lives on the heap.

```
Stack frame          Heap
──────────────       ───────────────────
user ──────────────► { name: "Ana" }
nums ──────────────► [1, 2, 3]
```

**Garbage collection:** JavaScript automatically frees memory when values become unreachable (no references pointing to them).

```js
let obj = { data: "big" };
obj = null; // original object is now unreachable → GC can free it
```

**Closures and memory leaks:** a closure keeps its outer variables alive as long as the inner function exists.

```js
function load() {
  const huge = new Array(1_000_000).fill(0); // lives on the heap
  return () => huge[0]; // closure keeps huge alive
}

const fn = load(); // huge is NOT garbage collected while fn exists
fn = null;         // now huge can be collected
```

---

## Structures & Methods

### Objects

```js
const user = {
  name: "Ana",
  age: 30,
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

// Access
user.name;       // dot notation
user["age"];     // bracket notation (useful for dynamic keys)

// Add / update / delete
user.email = "ana@example.com";
user.age = 31;
delete user.email;

// Check existence
"name" in user;              // true
user.hasOwnProperty("name"); // true (own property only)
Object.hasOwn(user, "name"); // modern equivalent
```

---

### Arrays

```js
const nums = [10, 20, 30, 40];

nums[0];        // 10
nums.length;    // 4
nums.at(-1);    // 40 — last element (modern)

// Mutating methods
nums.push(50);       // add to end
nums.pop();          // remove from end
nums.unshift(0);     // add to start
nums.shift();        // remove from start
nums.splice(1, 2);   // remove 2 elements at index 1

// Non-mutating methods
nums.slice(1, 3);    // new array [20, 30]
nums.concat([50]);   // new array with 50 appended
[...nums, 50];       // same with spread
```

---

### Destructuring

```js
// Array destructuring
const [first, second, , fourth] = [1, 2, 3, 4];
const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// Object destructuring
const { name, age } = { name: "Ana", age: 30 };

// Rename while destructuring
const { name: userName } = { name: "Ana" };
console.log(userName); // "Ana"

// Default values
const { role = "user" } = {}; // role = "user"

// Nested
const { address: { city } } = { address: { city: "Madrid" } };

// In function parameters
function display({ name, age = 0 }) {
  return `${name} is ${age}`;
}
```

---

### Spread / Rest

```js
// Spread: expand an iterable into individual items
const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b]; // [1, 2, 3, 4]

// Clone an array (shallow)
const copy = [...original];

// Spread into object
const base = { theme: "dark" };
const extended = { ...base, lang: "en" }; // { theme: "dark", lang: "en" }

// Rest: collect remaining items
function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4); // 10
```

---

### Array methods (`map`, `filter`, `reduce`, `forEach`)

All four accept a callback. None of them mutate the original array.

```js
const products = [
  { name: "Coffee", price: 3, inStock: true },
  { name: "Tea",    price: 2, inStock: false },
  { name: "Juice",  price: 4, inStock: true },
];

// map — transform every element, returns same-length array
const names = products.map(p => p.name);
// ["Coffee", "Tea", "Juice"]

// filter — keep elements matching the condition
const available = products.filter(p => p.inStock);
// [{ name: "Coffee"... }, { name: "Juice"... }]

// reduce — accumulate to a single value
const total = products.reduce((sum, p) => sum + p.price, 0);
// 9

// forEach — side effects only; returns undefined
products.forEach(p => console.log(p.name));

// Chaining
const availableTotal = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0); // 7
```

---

### Object methods

```js
const scores = { alice: 90, bob: 75, carol: 88 };

Object.keys(scores);    // ["alice", "bob", "carol"]
Object.values(scores);  // [90, 75, 88]
Object.entries(scores); // [["alice", 90], ["bob", 75], ["carol", 88]]

// Rebuild from entries (useful after transforming entries)
const boosted = Object.fromEntries(
  Object.entries(scores).map(([k, v]) => [k, v + 5])
);
// { alice: 95, bob: 80, carol: 93 }

// Merge objects
const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark" };
const config = Object.assign({}, defaults, userPrefs);
// { theme: "dark", lang: "en" }

// Same with spread (preferred)
const config2 = { ...defaults, ...userPrefs };
```

---

## Async

### Callbacks

A callback is a function passed as an argument to be called later — the original async pattern.

```js
// Simple callback
setTimeout(() => console.log("1 second later"), 1000);

// Node-style: error-first callbacks
function readFile(path, callback) {
  // on success:  callback(null, data)
  // on failure:  callback(error, null)
}

readFile("data.json", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

The problem: **callback hell** — deeply nested callbacks become hard to read and maintain.

```js
// Callback hell
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getItems(orders[0], (items) => {
      // ... impossible to follow
    });
  });
});
```

---

### Promises

A Promise represents a value that will be available in the future. It is in one of three states: `pending`, `fulfilled`, or `rejected`.

```js
const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    if (id > 0) resolve({ id, name: "Ana" });
    else reject(new Error("Invalid ID"));
  });

// Consuming with .then / .catch / .finally
fetchUser(1)
  .then(user => user.name)
  .then(name => console.log(name))  // "Ana"
  .catch(err => console.error(err)) // any error in the chain lands here
  .finally(() => console.log("done")); // runs regardless of outcome

// Chaining: each .then can return a new promise
fetchUser(1)
  .then(user => fetchOrders(user.id)) // returns another promise
  .then(orders => console.log(orders))
  .catch(err => console.error(err));
```

---

### `async` / `await`

`async/await` is syntactic sugar over Promises — it makes async code read like synchronous code.

```js
async function loadDashboard(userId) {
  const user   = await fetchUser(userId);    // waits for the promise
  const orders = await fetchOrders(user.id); // then waits for this one
  const stats  = await fetchStats(user.id);

  return { user, orders, stats };
}

// An async function always returns a promise
loadDashboard(1).then(console.log);
```

**Important:** `await` pauses only the `async` function, not the whole thread. The event loop keeps running.

```js
// Run in parallel when operations are independent
async function loadAll(userId) {
  const [user, settings] = await Promise.all([
    fetchUser(userId),
    fetchSettings(userId),
  ]);
  return { user, settings };
}
```

---

### Error handling

```js
// try/catch with async/await
async function loadUser(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    return { user, orders };
  } catch (err) {
    console.error("Failed to load:", err.message);
    return null;
  } finally {
    console.log("request finished");
  }
}

// Custom error types
class NotFoundError extends Error {
  constructor(resource) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}

async function getUser(id) {
  const user = await db.find(id);
  if (!user) throw new NotFoundError("User");
  return user;
}

// Catch specific error types
try {
  const user = await getUser(99);
} catch (err) {
  if (err instanceof NotFoundError) {
    showEmptyState();
  } else {
    reportToSentry(err);
  }
}
```

---

### Promise combinators

Use these when you need to coordinate multiple async operations.

```js
const p1 = fetchUser(1);
const p2 = fetchUser(2);
const p3 = fetchUser(3);

// Promise.all — all must succeed; fails fast on first rejection
const [u1, u2, u3] = await Promise.all([p1, p2, p3]);

// Promise.allSettled — waits for all regardless of success/failure
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.error(r.reason);
});

// Promise.race — resolves/rejects with whichever settles first
const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), 5000)
);
const data = await Promise.race([fetchUser(1), timeout]);

// Promise.any — resolves with first success; rejects only if ALL fail
const fastest = await Promise.any([p1, p2, p3]);
```

| Combinator | Use when |
|---|---|
| `Promise.all` | All results needed, fail fast |
| `Promise.allSettled` | All results needed, handle failures individually |
| `Promise.race` | Want whichever finishes first (e.g. timeout pattern) |
| `Promise.any` | Want first success, tolerate some failures |

---

## DOM & Browser

### DOM manipulation

```js
// Selecting elements
const el   = document.querySelector("#app");       // first match
const all  = document.querySelectorAll(".item");   // NodeList
const byId = document.getElementById("title");

// Reading / writing content
el.textContent = "Hello";           // safe: escapes HTML
el.innerHTML = "<strong>Hi</strong>"; // careful: XSS risk

// Attributes and classes
el.setAttribute("aria-label", "close");
el.getAttribute("id");
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("open");

// Creating and inserting elements
const card = document.createElement("div");
card.className = "card";
card.textContent = "New card";

el.appendChild(card);           // append as last child
el.prepend(card);               // first child
el.before(card);                // before el in the DOM
el.insertAdjacentHTML("beforeend", "<p>Fast insert</p>");

// Removing
card.remove();
```

---

### Event listeners

```js
const button = document.querySelector("#submit");

// Add
button.addEventListener("click", handleClick);

// Remove — must pass the same function reference
button.removeEventListener("click", handleClick);

// Options
button.addEventListener("click", handleClick, {
  once: true,    // auto-removes after first fire
  passive: true, // tells browser you won't call preventDefault (scroll perf)
  capture: true, // fire during capture phase instead of bubbling
});

// Event object
function handleClick(event) {
  event.preventDefault();  // block default behavior (form submit, link nav)
  event.stopPropagation(); // stop bubbling up to parent elements
  console.log(event.target);   // element that was clicked
  console.log(event.currentTarget); // element the listener is attached to
}
```

---

### Event bubbling / capturing

When an event fires on an element, it travels in three phases:

```
1. Capturing  — window → document → html → body → ... → target
2. Target     — the element that was clicked
3. Bubbling   — target → ... → body → html → document → window
```

```html
<div id="outer">
  <button id="inner">Click me</button>
</div>
```

```js
document.getElementById("outer").addEventListener("click", () => {
  console.log("outer bubbling"); // fires 2nd (default: bubbling)
}, false);

document.getElementById("outer").addEventListener("click", () => {
  console.log("outer capturing"); // fires 1st (capture phase)
}, true);

document.getElementById("inner").addEventListener("click", () => {
  console.log("inner"); // fires between the two
});

// Click: outer capturing → inner → outer bubbling
```

**Event delegation** — attach one listener to a parent instead of many to children:

```js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    console.log("clicked item:", e.target.textContent);
  }
});
```

---

### Fetch API

```js
// Basic GET
const res = await fetch("https://api.example.com/users");

// fetch does NOT reject on 4xx/5xx — always check res.ok
if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
const users = await res.json();

// POST with JSON body
const newUser = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ana", role: "admin" }),
}).then(r => r.json());

// Full example with error handling
async function api(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}
```

---

### Web Storage

```js
// localStorage — persists across sessions (same origin)
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");  // "dark"
localStorage.removeItem("theme");
localStorage.clear();

// sessionStorage — cleared when the tab closes
sessionStorage.setItem("tabId", crypto.randomUUID());

// Both only store strings — serialize objects with JSON
const prefs = { theme: "dark", lang: "en" };
localStorage.setItem("prefs", JSON.stringify(prefs));
const stored = JSON.parse(localStorage.getItem("prefs"));

// Utility wrapper to avoid repetition
const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  del: (key) => localStorage.removeItem(key),
};
```

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Lifetime | Until cleared | Until tab closes |
| Scope | Same origin | Same tab + origin |
| Capacity | ~5 MB | ~5 MB |

---

## Advanced

### `this`

`this` is determined by **how a function is called**, not where it is defined.

```js
// Method call — this = the object
const obj = { x: 10, getX() { return this.x; } };
obj.getX(); // 10

// Plain call — this = undefined (strict) or global
function show() { return this; }
show(); // undefined in strict mode

// call / apply / bind — explicit this
function greet() { return `Hi, ${this.name}`; }
const person = { name: "Jochy" };
greet.call(person);  // "Hi, Jochy"
greet.apply(person); // "Hi, Jochy"
const greetJochy = greet.bind(person);
greetJochy();        // "Hi, Jochy"

// new — this = the new instance
function User(name) { this.name = name; }
const u = new User("Ana"); // u.name = "Ana"

// Arrow functions — lexical this (from outer scope, never own)
const timer = {
  label: "work",
  start() {
    setTimeout(() => console.log(this.label), 1000); // "work" — arrow captures outer this
  },
};
```

| How called | `this` value |
|---|---|
| `obj.method()` | `obj` |
| `fn()` | `undefined` (strict) / global |
| `fn.call(x)` | `x` |
| `new Fn()` | new instance |
| Arrow function | outer `this` |

---

### Prototypes

Every object has an internal link (`[[Prototype]]`) to another object. Property lookups walk this chain until they find the property or reach `null`.

```js
const animal = {
  breathe() { return "breathing"; },
};

const dog = Object.create(animal);
dog.bark = function() { return "woof"; };

dog.bark();    // "woof"   — own property
dog.breathe(); // "breathing" — found on prototype

Object.getPrototypeOf(dog) === animal; // true
```

**Chain example:**

```
dog → animal → Object.prototype → null
```

```js
dog.toString(); // works — found on Object.prototype
```

**Function constructors and `.prototype`:**

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const p = new Person("Ana");
p.greet(); // "Hi, I'm Ana"

// p's chain: p → Person.prototype → Object.prototype → null
```

> Methods on `.prototype` are **shared** across all instances — not copied. This saves memory.

---

### Prototypal inheritance

```js
const vehicle = {
  start() { return `${this.type} starting`; },
};

const car = Object.create(vehicle);
car.type = "car";
car.honk = function() { return "beep"; };

car.start(); // "car starting" — delegated to vehicle
car.honk();  // "beep" — own method
```

`extends` in classes is syntactic sugar over this same prototype chain.

---

### Classes

Classes are a clean syntax on top of JavaScript's prototype system. They do not introduce a different inheritance model.

```js
class Animal {
  #sound; // private field

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  speak() {
    return `${this.name} says ${this.#sound}`;
  }

  static create(name, sound) { // factory helper
    return new Animal(name, sound);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, "woof");
  }

  fetch(item) {
    return `${this.name} fetches the ${item}`;
  }
}

const rex = new Dog("Rex");
rex.speak();       // "Rex says woof"
rex.fetch("ball"); // "Rex fetches the ball"
rex instanceof Dog;    // true
rex instanceof Animal; // true
```

---

### Encapsulation

Hiding internal state and exposing only a controlled API.

```js
// Private class fields (modern — preferred)
class BankAccount {
  #balance = 0;
  #owner;

  constructor(owner, initial = 0) {
    this.#owner = owner;
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
    return this;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this;
  }

  get balance() { return this.#balance; }
  get owner()   { return this.#owner; }
}

const account = new BankAccount("Ana", 100);
account.deposit(50).withdraw(30); // chaining
account.balance; // 120
account.#balance; // SyntaxError — truly private
```

---

### Immutability

Immutability means never modifying existing data — instead, produce new structures with the changes applied.

```js
// Mutable (bad practice for shared state)
const state = { count: 0, items: [] };
state.count++;          // mutates original
state.items.push("x");  // mutates original

// Immutable (predictable, easier to debug)
const next = {
  ...state,
  count: state.count + 1,
  items: [...state.items, "x"],
};

// Array operations without mutation
const nums = [1, 2, 3, 4, 5];

const added   = [...nums, 6];              // add
const removed = nums.filter(n => n !== 3); // remove
const updated = nums.map(n => n === 2 ? 99 : n); // update one item

// Deep freeze
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
}
```

---

### Currying

Currying transforms a multi-argument function into a series of single-argument functions.

```js
// Normal
function add(a, b) { return a + b; }
add(2, 3); // 5

// Curried
const add = a => b => a + b;
add(2)(3); // 5

const add10 = add(10); // partially applied — returns b => 10 + b
add10(5);  // 15
add10(20); // 30
```

**Real-world use:**

```js
// Curried validator
const validate = regex => message => value =>
  regex.test(value) ? null : message;

const required  = validate(/.+/)("Field is required");
const isEmail   = validate(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)("Invalid email");
const minLength = n => validate(new RegExp(`.{${n},}`))(`Min ${n} characters`);

required("");         // "Field is required"
required("Ana");      // null
isEmail("not-email"); // "Invalid email"
isEmail("a@b.com");   // null
minLength(8)("hi");   // "Min 8 characters"
```

```js
// Curried API call factory
const request = method => url => body =>
  fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

const post = request("POST");
const put  = request("PUT");

const createUser = post("/api/users");
const updateUser = id => put(`/api/users/${id}`);

createUser({ name: "Ana" });
updateUser(1)({ name: "Ana Updated" });
```

---

### Pure functions

A pure function always produces the same output for the same input and causes no side effects.

```js
// Pure — deterministic, no side effects
function formatPrice(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

formatPrice(9.99); // "$9.99" — always the same

// Impure — depends on external state
let tax = 0.1;
function addTax(price) {
  return price + price * tax; // depends on external variable
}

// Made pure — takes all inputs as arguments
function addTax(price, taxRate) {
  return price + price * taxRate;
}
```

**Why purity matters:**

```js
// Pure functions compose cleanly
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const processPrice = pipe(
  price => price * 1.1,        // add tax
  price => Math.round(price),  // round
  price => `$${price}`,        // format
);

processPrice(9.99); // "$11"
```

| Pure | Impure |
|---|---|
| Same input → same output always | May return different results |
| No side effects | Modifies external state |
| Easy to test (no mocks needed) | Requires setup/teardown in tests |
| Safe to run in any order | Order-dependent |
| Composable | Hard to compose reliably |

---

*For the authoritative reference, always consult [MDN Web Docs](https://developer.mozilla.org/) and the [ECMAScript specification](https://tc39.es/ecma262/).*
