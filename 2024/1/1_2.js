const fs = require("fs");
let input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n');

let listOne = [];
let listTwo = [];

for (i = 0; i < input.length; i++) {
    let line = input[i].split(' ');
    listOne.push(Number(line[0]));
    listTwo.push(Number(line[3]));
}

let score = 0;
for (i = 0; i < listOne.length; i++) {
    score += listOne[i] * countOccurrences(listTwo, listOne[i]);
}

console.log(score);

function countOccurrences(arr, entry) {
    let occurrences = 0;

    for (k = 0; k < arr.length; k++) {
        if (arr[k] == entry) {
            occurrences++;
        }
    }

    return occurrences;
}