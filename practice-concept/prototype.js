/*
==================================================
📘 JavaScript Prototypes — Full Guide (with examples)
==================================================

🔹 1. Object Creation

These two are the same:
*/

const animal1 = {};
const animal2 = new Object();

/*
Both objects are automatically linked to:
👉 Object.prototype
*/


/*
🔹 2. What is a Prototype?

A prototype is:
👉 an object used as a fallback when a property is not found in the current object
*/


/*
🔹 3. Prototype Chain

Every object has a hidden link:

animal → Object.prototype → null
*/


/*
🔹 4. Types of Properties
*/

// ✅ Own properties (defined directly on the object)
const animal = {};
animal.name = "Dog";

console.log(animal.name); // "Dog"


// ✅ Prototype properties (come from Object.prototype)
console.log(animal.toString()); // "[object Object]"


/*
🔹 5. How JavaScript Looks for Properties

When accessing a property:

animal.type

Steps:
1. Look inside animal
2. If not found → go to prototype
3. If found → return value
*/

const parent = {
  type: "animal"
};

const dog = Object.create(parent);

console.log(dog.type); // "animal"
// dog does not have 'type', but parent does


/*
🔹 6. Methods vs Properties

Important rule:
👉 Everything is a property in JavaScript

- If the value is a function → it's called a method
- If the value is not a function → it's a property
*/

console.log(typeof animal.toString); // "function"
console.log(typeof animal.constructor); // "function"


/*
🔹 7. What’s inside Object.prototype?

Mostly methods:
*/

console.log(animal.toString());
console.log(animal.hasOwnProperty("name"));
console.log(animal.valueOf());

/*
Also includes:
- constructor (property that points to Object function)
*/

console.log(animal.constructor); // [Function: Object]


/*
🔹 8. Custom Prototype (Important)

You can create your own prototype with properties:
*/

const parent2 = {
  type: "animal",
  legs: 4
};

const dog2 = Object.create(parent2);

console.log(dog2.type); // "animal"
console.log(dog2.legs); // 4


/*
🔹 9. Overriding Properties

If the object defines the same property:
*/

dog2.type = "mammal";

console.log(dog2.type); // "mammal"
// Now JavaScript stops looking in the prototype


/*
🔹 10. Deleting Properties

If we delete the own property:
*/

delete dog2.type;

console.log(dog2.type); // "animal"
// Falls back to prototype again


/*
🔹 11. Checking Property Ownership
*/

console.log(dog2.hasOwnProperty("type")); // false
// Because 'type' is from prototype

dog2.type = "mammal";

console.log(dog2.hasOwnProperty("type")); // true


/*
🔹 12. Inspect Prototype
*/

console.log(Object.getPrototypeOf(dog2)); // parent2


/*
🔹 13. Key Concepts

- Objects can inherit from other objects
- Prototype = shared data + behavior
- JavaScript uses lookup, not copying
*/


/*
🔹 Final Definition

Prototype Chain:
👉 JavaScript looks for a property in the object first.
👉 If not found, it looks in the prototype.
👉 It continues until it finds it or reaches null.
*/


/*
🔹 Mental Model

Object = your own data
Prototype = shared backup
JavaScript = looks up when needed
*/