const fs = require("fs");
const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let input = fs.readFileSync("1.txt", {encoding: "utf8"}).split('\n');

let sum = 0;
for (i = 0; i < input.length; i++) {
    let line = input[i].split('');
    let lastNum = 0;
    let calibration = 0;
    let storedLetters = "";
    
    for (j = 0; j < line.length; j++) {
        if (isNaN(line[j])) {
            storedLetters += line[j];
            let l = storedLetters.length;
            let index = Math.max(digits.indexOf(storedLetters.substr(l - 3)), digits.indexOf(storedLetters.substr(l - 4)), digits.indexOf(storedLetters.substr(l - 5)));
            if (l > 2 && index != -1) {
                word = digits.indexOf()
                if (lastNum == 0) {
                    calibration = 10 * index;
                }
            
                lastNum = index;
            }
        } else {
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