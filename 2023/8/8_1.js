const fs = require("fs");
let input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

let directions = input[0];

// the network will be formatted as an object, with key-value pairs given as
// node: {"L": nodeL, "R": nodeR}
let network = {};
for (i = 2; i < input.length; i++) {
    network[input[i].substring(0, 3)] = {"L": input[i].substring(7, 10), "R": input[i].substring(12, 15)};
}

let steps = 0;
let currentNode = "AAA";
while (currentNode != "ZZZ") {
    // due to the cyclic nature of the directions, we can use modulo
    currentNode = network[currentNode][directions.substring(steps % directions.length, steps % directions.length + 1)];
    steps++;
}

console.log(steps);