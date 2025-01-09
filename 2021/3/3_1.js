const fs = require("fs");

var input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');
var bits = [];
var gamma = 0;
var epsilon = 0;
var bitLength = input[0].length;
for (i = 0; i < bitLength; i++) {
    bits[i] = 0;
}


for (i = 0; i < input.length; i++) {
    for (j = 0; j < bitLength; j++) {
        bits[j] += parseInt(input[i].substring(j, j + 1), 10);
    }
}

for (i = 0; i < bitLength; i++) {
    if (bits[i] / input.length > 0.5) {
        gamma += Math.pow(2, bitLength - i - 1);
    } else {
        epsilon += Math.pow(2, bitLength - i - 1);
    }
}

console.log(gamma * epsilon);