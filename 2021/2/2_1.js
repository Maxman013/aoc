const fs = require("fs");

var input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');
var position = [0, 0]; // position[0] is horizontal position, position[1] is depth

for (i = 0; i < input.length; i++) {
    var instruction = input[i].split(' ');
    switch (instruction[0]) {
        case "forward":
            position[0] += parseInt(instruction[1], 10);
            break;
        case "down":
            position[1] += parseInt(instruction[1], 10);
            break;
        case "up":
            position[1] -= parseInt(instruction[1], 10);
    }
}

console.log(position[0] * position[1]);