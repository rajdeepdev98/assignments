const fs = require("fs");

const filename = __dirname + "/abc.txt";

fs.readFile(filename, "utf-8", (err, data) => {
  let str = "";
  //   console.log(data);

  data.split(/[\r\n]/).forEach((line) => {
    if (line.length == 0) return;
    // console.log(line.split(" ") + "lol");
    line = line
      .split(" ")
      .filter((el) => {
        return el != " " && el != "";
      })
      .join(" ");
    // console.log(line);

    str += line;
    str += "\n";
  });
  //   console.log(str);

  fs.writeFile(filename, str, (err) => {
    if (err) console.log("error");
    else console.log("File written successfully");
  });
});
