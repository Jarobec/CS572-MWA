const fibonacci = function (number) {
  if (number <= 2) {
    return 1;
  } else {
    return fibonacci(number - 1) + fibonacci(number - 2);
  }
};

process.argv.forEach((val, i) => {
  if (i > 1) {
    const result = fibonacci(Math.abs(val));
    console.log(`Fibonacci of ${val} is ${result}`);
  }
});
