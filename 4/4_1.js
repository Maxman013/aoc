const fs = require("fs");
const md5 = require("md5");
const input = fs.readFileSync("4.txt", {encoding: "utf8"});

var append = 0;
while (true) {
    if (md5(`${input}${++append}`).substring(0, 5) == "00000") break;
}

console.log(append);