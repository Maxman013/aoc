const fs = require("fs");
var input = fs.readFileSync("9.txt", {encoding: "utf8"}).split('\n');

for (i = 0; i < input.length; i++) {
    input[i] = input[i].split('').map(Number);
}

var risk = 0;
for (i = 0; i < input.length; i++) {
    for (j = 0; j < input[i].length; j++) {
        var height = input[i][j]
        if ((i == 0 || input[i - 1][j] > height) && (j == 0 || input[i][j - 1] > height) && (i == input.length - 1 || input[i + 1][j] > height) && (j == input[i].length - 1 || input[i][j + 1] > height)) {
            risk += height + 1;
        }
    }
}
console.log(risk);