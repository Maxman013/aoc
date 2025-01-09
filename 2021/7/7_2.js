const fs = require("fs");
var input = fs.readFileSync("7.txt", {encoding: "utf8"}).split(',').map(Number);

var fuels = [];
for (i = 0; i < Math.max(...input); i++) {
    fuels[i] = 0;
    for (j = 0; j < input.length; j++) {
        var n = Math.abs(input[j] - i);
        fuels[i] += n * (n + 1) / 2;
    }
}

console.log(Math.min(...fuels));