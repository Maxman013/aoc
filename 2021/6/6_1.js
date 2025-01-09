const fs = require("fs");
var input = fs.readFileSync("6.txt", {encoding: "utf8"}).split(',').map(Number);

for (i = 0; i < 80; i++) {
    for (j = 0; j < input.length; j++) {
        if (input[j] == 0) {
            input[j] = 6;
            input.push(9);
        } else {
            input[j]--;
        }
    }
}

console.log(input.length);