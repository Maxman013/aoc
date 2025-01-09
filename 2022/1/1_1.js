const fs = require("fs");
var input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n').map(Number);

var calories = [];
var sum = 0;
for (i = 0; i < input.length; i++) {
    // "" gets mapped to 0, so we use that as a delimiter between elves
    if (input[i] == 0) {
        calories.push(sum);
        sum = 0;
    } else {
        sum += input[i];
    }
}
calories.push(sum);

// this sorts in descending order
calories.sort((a, b) => {return b - a;});
console.log(calories[0]);