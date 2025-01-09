const fs = require("fs");
var input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');

var sum = 0;
for (i = 0; i < input.length; i++) {
    var rucksack = input[i].split('');
    var compartmentOne = rucksack.slice(0, rucksack.length / 2);
    var compartmentTwo = rucksack.slice(rucksack.length / 2);

    for (j = 0; j < compartmentOne.length; j++) {
        if (compartmentTwo.includes(compartmentOne[j])) {
            var charCode = compartmentOne[j].charCodeAt();
            sum += (charCode > 96) ? charCode - 96 : charCode - 38;
            break;
        }
    }
}

console.log(sum);