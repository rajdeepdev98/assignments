const fs = require("fs");
console.log(__dirname);

fs.readFile(__dirname + "/abc.txt", "utf-8", (err, text) => {
  console.log("The text is\n", text);
});

// for (let i = 0; i < 1000000; i++) {
//   console.log(i);
// }

let content = "New text2";
fs.writeFile(__dirname + "/abc.txt", content, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log("File written successfully!");
  }
});
