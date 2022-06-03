// const promise1 = new Promise((resolve, reject) => {
//   const number = Math.random();
//   setTimeout(function () {
//     if (number > 0.5) {
//       resolve(number);
//     } else {
//       reject("Error in Promise 1");
//     }
//   }, 3000);
// });

// const promise2 = new Promise((resolve, reject) => {
//   const number = Math.random() + 0.5;
//   setTimeout(function () {
//     if (number > 0.5) {
//       resolve(number);
//     } else {
//       reject("Error in Promise 2");
//     }
//   }, 2000);
// });

// const promise3 = new Promise((resolve, reject) => {
//   const number = Math.random() - 0.5;
//   setTimeout(function () {
//     if (number > 0.5) {
//       resolve(number);
//     } else {
//       reject("Error in Promise 3");
//     }
//   }, 5000);
// });

// const thenCallback = function (number) {
//   console.log("Then callback", number);
// };

// const catchCallback = function (err) {
//   console.log("Catch callback", err);
// };

// const finallyCallback = function () {
//   console.log("Finally callback");
// };

// console.log(promise1);
//promise1.then(thenCallback).catch(catchCallback).finally(finallyCallback);

// Promise.all([promise1, promise2, promise3])
//   .then(function (val) {
//     console.log("Success:", val);
//   })
//   .catch(function (err) {
//     console.log("Error:", err);
//   });

function resolveAfter2sec() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("Done in 2 seconds");
    }, 2000)
  );
}

function resolveAfter1sec() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve("Done in 1 seconds");
    }, 1000)
  );
}

async function main() {
  const result1 = await resolveAfter2sec();
  console.log(result1);
  const result2 = resolveAfter1sec();
  console.log(result2);
}

main();
