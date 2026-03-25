/**
 * Greeting utility — added to trigger CI pipeline test.
 */

function greet(name) {
  if (!name) throw new Error("Name is required");
  return `Hello, ${name}!`;
}

function greetAll(names) {
  if (!Array.isArray(names)) throw new Error("names must be an array");
  return names.map(greet);
}

module.exports = { greet, greetAll };
