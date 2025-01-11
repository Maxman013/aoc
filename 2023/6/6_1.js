const fs = require("fs");
let input = fs.readFileSync("6.txt", {encoding: "utf8"}).split('\n');

// only include numbers
let times = input[0].split(" ").filter(str => str != "" && !isNaN(str));
let distances = input[1].split(" ").filter(str => str != "" && !isNaN(str));
let wins = 1;

for (i = 0; i < times.length; i++) {
    let time = times[i];
    let distance = distances[i];

    let numWins = 0;
    for (j = 0; j <= time; j++) {
        // speed (= time held down) * time remaining
        let boatDistance = j * (time - j);

        if (boatDistance > distance) {
            numWins++;
        }
    }

    wins *= numWins;
}

console.log(wins);