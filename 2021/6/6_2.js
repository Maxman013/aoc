const fs = require("fs");
var input = fs.readFileSync("6.txt", {encoding: "utf8"}).split(',').map(Number);

var fishes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for (i = 0; i < input.length; i++) {
    fishes[input[i]]++;
}

for (i = 0; i < 256; i++) {
    var temp = fishes.shift();
    fishes[8] = temp;
    fishes[6] += temp;
}

var sum = 0;
for (i = 0; i < fishes.length; i++) {
    sum += fishes[i];
}
console.log(sum);