const fs = require("fs");
var input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');

var sum = 0;
for (i = 0; i < input.length / 3; i++) {
    var rucksackOne = input[3 * i].split('');
    var rucksackTwo = input[3 * i + 1].split('');
    var rucksackThree = input[3 * i + 2].split('');

    for (j = 0; j < rucksackOne.length; j++) {
        if (rucksackTwo.includes(rucksackOne[j]) && rucksackThree.includes(rucksackOne[j])) {
            var charCode = rucksackOne[j].charCodeAt();
            sum += (charCode > 96) ? charCode - 96 : charCode - 38;
            break;
        }
    }
}

console.log(sum);