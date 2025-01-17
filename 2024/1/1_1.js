const fs = require("fs");
let input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n');

let listOne = [];
let listTwo = [];

for (i = 0; i < input.length; i++) {
    let line = input[i].split(' ');
    listOne.push(Number(line[0]));
    listTwo.push(Number(line[3]));
}

listOne.sort();
listTwo.sort();

let distance = 0;
for (i = 0; i < listOne.length; i++) {
    distance += Math.abs(listOne[i] - listTwo[i]);
}

console.log(distance);