const fs = require("fs");
let input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

let sum = 0;
for (i = 0; i < input.length; i++) {
    let line = input[i].split(': ')[1].split('; ');
    // [red, green, blue]
    let minPossible = [0, 0, 0];

    for (j = 0; j < line.length; j++) {
        let clue = line[j].split(', ');

        for (k = 0; k < clue.length; k++) {
            let info = clue[k].split(' ');

            switch (info[1]) {
                case "red":
                    minPossible[0] = Math.max(minPossible[0], info[0]);
                    break;
                case "green":
                    minPossible[1] = Math.max(minPossible[1], info[0]);
                    break;
                case "blue":
                    minPossible[2] = Math.max(minPossible[2], info[0]);
            }
        }
    }
    
    sum += minPossible[0] * minPossible[1] * minPossible[2];
}

console.log(sum);