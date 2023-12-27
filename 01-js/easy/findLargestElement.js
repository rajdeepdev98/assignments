/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  if (numbers.length == 0) return undefined;
  let mn = -10000000000;
  numbers.forEach((num) => {
    mn = Math.max(mn, num);
  });
  return mn;
}
console.log(findLargestElement([-15, -27, -8, -12]));

module.exports = findLargestElement;
