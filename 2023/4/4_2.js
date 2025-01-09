const fs = require("fs");
let input = fs.readFileSync("4.txt", {encoding: "utf8"}).split('\n');
let cards = [];
let counts = {};

for (i = 0; i < input.length; i++) {
    cards.push(i + 1);
    counts[i + 1] = counts[i + 1] ? counts[i + 1] + 1 : 1;

    let card = input[i].split(": ")[1].split(" | ");
    let winning = card[0].split(' ').filter(item => item != "");
    let numbers = card[1].split(' ').filter(item => item != "");

    let matches = 0;
    for (j = 0; j < numbers.length; j++) {
        if (winning.includes(numbers[j])) {
            let toAdd = ++matches + i + 1;
            for (k = 0; k < counts[i + 1]; k++) {
                cards.push(toAdd);
                counts[toAdd] = counts[toAdd] ? counts[toAdd] + 1 : 1;
            }
        }
    }
}

console.log(cards.length);