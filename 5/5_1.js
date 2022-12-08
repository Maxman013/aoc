const fs = require("fs");
const input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');

const vowels = ['a', 'e', 'i', 'o', 'u'];
const badStrings = ["ab", "cd", "pq", "xy"];

var counter = 0;
for (i = 0; i < input.length; i++) {
    var lastChar = "";
    var vowelCount = 0;
    var hasBadString = false;
    var hasDouble = false;
    for (j = 0; j < input[i].length; j++) {
        var currentChar = input[i].substring(j, j + 1);
        if (badStrings.includes(lastChar + currentChar)) {
            hasBadString = true;
            break;
        }
        if (vowels.includes(currentChar)) vowelCount++;
        hasDouble ||= (j != 0) && (lastChar == currentChar);

        lastChar = currentChar;
    }

    if ((vowelCount >= 3) && hasDouble && !hasBadString) counter++;
}

console.log(counter);