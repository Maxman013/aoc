const fs = require("fs");
let input = fs.readFileSync("4.txt", {encoding: "utf8"}).split('\n');
let sum = 0;

for (i = 0; i < input.length; i++) {
    let card = input[i].split(": ")[1].split(" | ");
    let winning = card[0].split(' ').filter(item => item != "");
    let numbers = card[1].split(' ').filter(item => item != "");

    let matches = 0;
    for (j = 0; j < numbers.length; j++) {
        if (winning.includes(numbers[j])) {
            matches++;
        }
    }

    if (matches > 0) sum += 2 ** (matches - 1);
}

console.log(sum);