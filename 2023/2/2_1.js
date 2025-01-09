const fs = require("fs");
let input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

let sum = 0;
for (i = 0; i < input.length; i++) {
    let line = input[i].split(': ')[1].split('; ');
    let possible = true;

    for (j = 0; j < line.length; j++) {
        let clue = line[j].split(', ');

        for (k = 0; k < clue.length; k++) {
            let info = clue[k].split(' ');

            switch (info[1]) {
                case "red":
                    possible &= (info[0] <= 12);
                    break;
                case "green":
                    possible &= (info[0] <= 13);
                    break;
                case "blue":
                    possible &= (info[0] <= 14);
            }
        }
    }

    if (possible) sum += i + 1;
}

console.log(sum);