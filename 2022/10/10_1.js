const fs = require("fs");
var input = fs.readFileSync("10.txt", {encoding: "utf8"}).split('\n');

var X = 1;
var cycle = 0;
var strength = 0;
for (i = 0; i < input.length; i++) {
    cycle++;
    if (cycle % 40 == 20) {
        strength += cycle * X;
    }

    if (input[i] == "noop") continue;

    cycle++;
    if (cycle % 40 == 20) {
        strength += cycle * X;
    }
    X += Number(input[i].substring(5));
}

console.log(strength);