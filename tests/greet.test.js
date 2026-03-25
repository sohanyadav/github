const { greet, greetAll } = require("../src/greet");

describe("greet()", () => {
  test("returns greeting for a name", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
  });
  test("throws when name is empty", () => {
    expect(() => greet("")).toThrow("Name is required");
  });
  test("throws when name is undefined", () => {
    expect(() => greet()).toThrow("Name is required");
  });
});

describe("greetAll()", () => {
  test("greets multiple names", () => {
    expect(greetAll(["Alice", "Bob"])).toEqual(["Hello, Alice!", "Hello, Bob!"]);
  });
  test("returns empty array for empty input", () => {
    expect(greetAll([])).toEqual([]);
  });
  test("throws when input is not an array", () => {
    expect(() => greetAll("Alice")).toThrow("names must be an array");
  });
});
