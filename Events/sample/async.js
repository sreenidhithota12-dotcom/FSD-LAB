console.log("Start");

setTimeout(() => {
  console.log("Data received");
}, 2000);

console.log("End");

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}