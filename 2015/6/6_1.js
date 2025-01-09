const fs = require("fs");
const input = fs.readFileSync("6.txt", {encoding: "utf8"}).split('\n');

var grid = [];
for (i = 0; i < 1000; i++) {
    grid[i] = [];
    for (j = 0; j < 1000; j++) {
        grid[i][j] = false;
    }
}

for (i = 0; i < input.length; i++) {
    var instruction = input[i].split(' ');
    var startCoord = instruction[instruction.length - 3].split(',');
    var endCoord = instruction[instruction.length - 1].split(',');
    for (j = startCoord[0]; j <= endCoord[0]; j++) {
        for (k = startCoord[1]; k <= endCoord[1]; k++) {
            if (instruction[0] == "toggle") {
                grid[j][k] ^= true;
            } else if (instruction[1] == "on" ) {
                grid[j][k] = true;
            } else {
                grid[j][k] = false;
            }
        }
    }
}

var counter = 0;
for (i = 0; i < 1000; i++) {
    for (j = 0; j < 1000; j++) {
        if (grid[i][j]) counter++;
    }
}

console.log(counter);