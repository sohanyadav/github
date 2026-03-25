const { add, subtract, multiply, divide } = require("../src/math");

describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
  test("adds a negative and a positive number", () => {
    expect(add(-1, 4)).toBe(3);
  });
  test("adds two zeros", () => {
    expect(add(0, 0)).toBe(0);
  });
});

describe("subtract()", () => {
  test("subtracts two numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });
  test("result can be negative", () => {
    expect(subtract(2, 5)).toBe(-3);
  });
});

describe("multiply()", () => {
  test("multiplies two numbers", () => {
    expect(multiply(3, 5)).toBe(15);
  });
  test("multiplying by zero returns zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });
});

describe("divide()", () => {
  test("divides two numbers", () => {
    expect(divide(20, 4)).toBe(5);
  });
  test("throws on divide by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});
