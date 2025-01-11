const fs = require("fs");
let input = fs.readFileSync("6.txt", {encoding: "utf8"}).split('\n');

// same as before, but we just join() everything up
let time = input[0].split(" ").filter(str => str != "" && !isNaN(str)).join("");
let distance = input[1].split(" ").filter(str => str != "" && !isNaN(str)).join("");
let wins = 0;

// there's probably just a formula for this (no for loop required), but brute forcing takes less effort
for (j = 0; j <= time; j++) {
    // speed (= time held down) * time remaining
    let boatDistance = j * (time - j);

    if (boatDistance > distance) {
        wins++;
    }
}

console.log(wins);