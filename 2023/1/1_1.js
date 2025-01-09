const fs = require("fs");
let input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n');

let sum = 0;
for (i = 0; i < input.length; i++) {
    let line = input[i].split('');
    let lastNum = 0;
    let calibration = 0;

    for (j = 0; j < line.length; j++) {
        if (!isNaN(line[j])) {
            if (lastNum == 0) {
                calibration = 10 * line[j];
            }

            lastNum = Number(line[j]);
        }
    }

    calibration += lastNum;
    sum += calibration;
}

console.log(sum);