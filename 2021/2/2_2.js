const fs = require("fs");

var input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');
var position = [0, 0]; // position[0] is horizontal position, position[1] is depth
var aim = 0;

for (i = 0; i < input.length; i++) {
    var instruction = input[i].split(' ');
    switch (instruction[0]) {
        case "forward":
            position[0] += parseInt(instruction[1], 10);
            position[1] += parseInt(instruction[1], 10) * aim;
            break;
        case "down":
            aim += parseInt(instruction[1], 10);
            break;
        case "up":
            aim -= parseInt(instruction[1], 10);
    }
}

console.log(position[0] * position[1]);