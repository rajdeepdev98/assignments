/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(t * 1000);
      resolve(t);
    }, 1000 * t);
  });
}

function wait2(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(t * 1000);
      resolve(t);
    }, 1000 * t);
  });
}

function wait3(t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(t * 1000);
      resolve(t);
    }, 1000 * t);
  });
}

function calculateTime(t1, t2, t3) {
  let startTime = new Date().getTime();
  return wait1(t1)
    .then((val) => {
      return wait2(t2);
    })

    .then((val) => {
      return wait3(t3);
    })
    .then((val) => {
      let endTime = new Date().getTime();
      //   console.log("et", endTime - startTime);
      return new Promise((resolve, reject) => {
        resolve(endTime - startTime);
      });
    });
  //   let endTime = new Date().getTime();
  //   return endTime - startTime;
}

// const test = async () => {
//   const val = await calculateTime(1, 2, 3);
//   console.log("lol" + val);
// };
// test();

module.exports = calculateTime;
