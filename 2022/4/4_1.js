const fs = require("fs");
var input = fs.readFileSync("4.txt", {encoding: "utf8"}).split('\n');

var fullyContains = 0;
for (i = 0; i < input.length; i++) {
    var ranges = input[i].split(',');
    var rangeOne = ranges[0].split('-').map(Number);
    var rangeTwo = ranges[1].split('-').map(Number);

    if ((rangeOne[0] <= rangeTwo[0] && rangeOne[1] >= rangeTwo[1]) || (rangeOne[0] >= rangeTwo[0] && rangeOne[1] <= rangeTwo[1])) fullyContains++;
}

console.log(fullyContains);