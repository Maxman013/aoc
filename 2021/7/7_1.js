const fs = require("fs");
var input = fs.readFileSync("7.txt", {encoding: "utf8"}).split(',').map(Number);

var fuels = [];
for (i = 0; i < Math.max(...input); i++) {
    fuels[i] = 0;
    for (j = 0; j < input.length; j++) {
        fuels[i] += Math.abs(input[j] - i);
    }
}

console.log(Math.min(...fuels));