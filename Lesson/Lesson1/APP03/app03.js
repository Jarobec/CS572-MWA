console.log("1: Start app");

const laterWork = setTimeout(function () {
  console.log("2: In setTimeout");
}, 3000);

console.log("3: End app");
