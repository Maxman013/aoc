const fs = require("fs");
var input = fs.readFileSync("6.txt", {encoding: "utf8"}).split('');

var marker = 0;
var lastThree = [input[0], input[1], input[2]];
for (i = 3; i < input.length; i++) {
    if (!lastThree.includes(input[i]) && !hasDuplicates(lastThree)) {
        marker = i;
        break;
    }

    lastThree.push(input[i]);
    lastThree.shift();
}

console.log(marker + 1);

function hasDuplicates(array) {
    return (new Set(array)).size != array.length;
}