const Calculator = require("../hard/calculator");
describe("Calculator", () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  afterEach(() => {
    calc.clear();
  });
  test("expression with invalid parentheses", () => {
    expect(() => calc.calculate("10 + (2 + 3")).toThrow(Error);
    expect(() => calc.calculate("10 + 2) + 3")).toThrow(Error);
    expect(() => calc.calculate(")10 + 2(")).toThrow(Error);
  });
});
