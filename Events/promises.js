
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 2000);
  });
}

async function main() {
  console.log("Starting...");

  const data = await getData();

  console.log(data);
  console.log("Finished");
}

main();
