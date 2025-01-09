const fs = require("fs");
var input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

var sum = 0;
for (i = 0; i < input.length; i++) {
    var notes = input[i].split('|');
    var digits = [];
    var scrambled = notes[0].split(' ');
    scrambled.pop();
    scrambled.sort((a, b) => a.length - b.length); // sort based on string length
    digits[1] = scrambled.shift(); // first digit will have 2 letters, this is 1
    digits[7] = scrambled.shift(); // second digit has 3 letters, this is 7
    digits[4] = scrambled.shift(); // third digit has 4 letters, this is 4
    digits[8] = scrambled.pop(); // last digit has 7 letters, this is 8
    var len5 = [scrambled.shift(), scrambled.shift(), scrambled.shift()];
    var len6 = scrambled;
    var c, e, f;
    // first, find 6 (characterised by either no c, other letter in 1 is f)
    for (j = 0; j < len6.length; j++) {
        if (!len6[j].includes(digits[1].substr(0, 1))) {
            c = digits[1].substr(0, 1);
            f = digits[1].substr(1, 1);
            digits[6] = len6[j];
            len6.splice(j, 1);
        } else if (!len6[j].includes(digits[1].substr(1, 1))) {
            c = digits[1].substr(1, 1);
            f = digits[1].substr(0, 1);
            digits[6] = len6[j];
            len6.splice(j, 1);
        }
    }

    // now find the length 5 letters (no c = 5, no f = 2, else 3)
    for (j = 0; j < len5.length; j++) {
        if (!len5[j].includes(c)) {
            digits[5] = len5[j];
            // we can find e using this, the letter that's not in 1 nor 5
            for (k = 0; k < digits[8].length; k++) {
                var letter = digits[8].substr(k, 1)
                if (digits[1].includes(letter) || digits[5].includes(letter)) {
                    continue;
                }
                e = letter;
            }
        } else if (!len5[j].includes(f)) {
            digits[2] = len5[j];
        } else {
            digits[3] = len5[j];
        }
    }

    // now we can find 0 and 9 (no e = 0, else 9)
    for (j = 0; j < len6.length; j++) {
        if (len6[j].includes(e)) {
            digits[0] = len6[j];
        } else {
            digits[9] = len6[j];
        }
    }

    // sort all strings in digits array alphabetically
    for (j = 0; j < digits.length; j++) {
        digits[j] = digits[j].split('').sort().join('');
    }

    var output = notes[1].split(' ');
    output.shift();
    for (j = 0; j < output.length; j++) {
        var digit = output[j].split('').sort().join('');
        sum += digits.indexOf(digit) * Math.pow(10, 3 - j);
    }
}

console.log(sum);