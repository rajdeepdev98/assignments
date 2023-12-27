/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

const vowels = ["a", "e", "i", "o", "u"];
function countVowels(str) {
  // Your code here

  let cnt = 0;
  str
    .toLowerCase()
    .split("")
    .forEach((element) => {
      if (vowels.includes(element)) {
        cnt++;
      }
    });
  return cnt;
}

console.log(countVowels("abce"));
module.exports = countVowels;
