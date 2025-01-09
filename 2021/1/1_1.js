const fs = require("fs");

var input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n').map(Number);
var count = 0;

for (i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
        count++;
    }
}

console.log(count);