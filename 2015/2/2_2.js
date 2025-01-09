const fs = require("fs");
const input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

var ribbon = 0;
for (i = 0; i < input.length; i++) {
    var dimensions = input[i].split('x').map(Number);
    var volume = dimensions[0] * dimensions[1] * dimensions[2];
    var smallest = Math.min(...dimensions);
    dimensions = dimensions.filter(e => e != smallest);
    var mid;
    if (dimensions.length < 2) {
        mid = smallest;
    } else {
        mid = Math.min(...dimensions);
    }
    ribbon += 2 * smallest + 2 * mid + volume;
}
console.log(ribbon);