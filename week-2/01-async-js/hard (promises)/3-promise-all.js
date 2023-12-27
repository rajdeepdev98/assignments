/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5);
    }, t * 1000);
  });
}

function wait3(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(6);
    }, t * 1000);
  });
}
async function calculateTime(t1, t2, t3) {
  let startTime = new Date().getTime();
  //   Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(() => {
  //     let endTime = new Date().getTime();
  //     console.log(endTime - startTime);
  //     return endTime - startTime;
  //   });
  //   let promAll = Promise.all([wait1(t1), wait2(t2), wait3(t3)]);
  const val = await Promise.all([wait1(t1), wait2(t2), wait3(t3)]);
  let endTime = new Date().getTime();
  console.log(endTime - startTime);
  console.log(val);
  return endTime - startTime;
}

let val = calculateTime(1, 2, 3);
// console.log("hello " + calculateTime(1, 2, 3));
console.log(val);
module.exports = calculateTime;
