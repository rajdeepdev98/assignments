/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(result = 0) {
    this.result = result;
  }
  add(num) {
    this.result += num;
  }
  subtract(num) {
    this.result -= num;
  }
  multiply(num) {
    this.result *= num;
  }
  divide(num) {
    if (num == 0) throw new Error("error");
    this.result /= num;
  }
  clear() {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  precedence(op) {
    if (op == "*" || op == "/") return 2;
    else if (op == "+" || op == "-") return 1;
    else return -1;
  }
  infixToPostfix = (exp) => {
    let postfix = [];
    console.log("exp = ", exp);
    let stack = [];
    for (let i = 0; i < exp.length; i++) {
      if (!isNaN(parseFloat(exp[i]))) {
        postfix.push(exp[i]);
        // console.log("lol" + exp[i]);
      } else if (exp[i] == "(") stack.push("(");
      else if (exp[i] == ")") {
        while (stack[stack.length - 1] != "(") {
          console.log("lol1" + exp[i]);
          console.log(stack);
          console.log(postfix);
          postfix.push(stack[stack.length - 1]);
          stack.pop();
        }
        stack.pop();
      } else {
        while (
          stack.length != 0 &&
          this.precedence(exp[i]) <= this.precedence(stack[stack.length - 1])
        ) {
          console.log("lol2");
          postfix.push(stack[stack.length - 1]);
          // console.log(lolx + postfix);
          stack.pop();
        }
        stack.push(exp[i]);
        // console.log(stack);
      }
    }
    while (stack.length != 0) {
      console.log("lol3");
      postfix.push(stack[stack.length - 1]);
      stack.pop();
    }
    return postfix;
  };
  valFromPostFix(postfix) {
    let stack = [];
    let val = 0;
    // console.log("exp" + postfix);
    for (let i = 0; i < postfix.length; i++) {
      // console.log(stack);
      if (!isNaN(parseFloat(postfix[i]))) {
        stack.push(parseFloat(postfix[i]));
      } else {
        let b = stack[stack.length - 1];
        let a = stack[stack.length - 2];
        if (postfix[i] == "/" && b == 0) throw new Error("Error");
        stack.pop();
        stack.pop();
        switch (postfix[i]) {
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          default:
        }
      }
    }
    return stack[stack.length - 1];
  }
  valid(exp) {
    for (let i = 0; i < exp.length; i++) {
      if (!exp[i].match(new RegExp("[0-9]|[()*/+-.]"))) {
        console.log("mismatch " + exp[i]);
        return false;
      }
    }
    // let par="";
    let cnt = 0;
    for (let i = 0; i < exp.length; i++) {
      if (exp[i] == "(") cnt++;
      else if (exp[i] == ")") cnt--;
      if (cnt < 0) {
        console.log("par err");
        return false;
      }
    }
    if (cnt != 0) return false;
    return true;
  }
  calculate(exp) {
    let lst = "";

    exp = exp
      .split("")
      .filter((val) => {
        return val != " ";
      })
      .join("");
    console.log(exp);
    if (!this.valid(exp)) {
      console.log("error");
      throw new Error("Error");
    }
    console.log("valid");
    let numExp = [];
    for (let i = 0; i < exp.length; i++) {
      console.log("lst =" + lst);
      if (!isNaN(parseFloat(exp[i])) || exp[i] == ".") {
        lst += exp[i];
      } else {
        if (lst != "") numExp.push(lst);
        numExp.push(exp[i]);
        lst = "";
      }
    }
    if (lst != "") numExp.push(lst);
    console.log("numexp", numExp);

    let postfix = this.infixToPostfix(numExp);

    console.log("postfix =", postfix);
    this.result = this.valFromPostFix(postfix);
    return this.result;
  }
}

// let cal = new Calculator(0);
// // console.log(cal.infixToPostfix("10 - (4 + 2)"));
// console.log(cal.calculate("10 + 2) + 3"));

module.exports = Calculator;
