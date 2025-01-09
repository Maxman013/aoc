const fs = require("fs");
var input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

var digits = 0;
for (i = 0; i < input.length; i++) {
    var notes = input[i].split('|')[1].split(' ');
    notes.shift();
    for (j = 0; j < notes.length; j++) {
        if (notes[j].length == 2 || notes[j].length == 3 || notes[j].length == 4 || notes[j].length == 7) {
            digits++;
        }
    }
}

console.log(digits);