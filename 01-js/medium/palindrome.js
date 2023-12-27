/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/
const isALetter = (c) => {
  return c.toLowerCase() != c.toUpperCase(); //true in case of letters
};

function isPalindrome(str) {
  let str2 = str.split("").filter(isALetter).reverse().join("").toLowerCase();
  let str1 = str.split("").filter(isALetter).join("").toLowerCase();

  // console.log(str1, str2);
  return str1 == str2;
}

console.log(isPalindrome("Able, was I ere I saw Elba!"));
module.exports = isPalindrome;
