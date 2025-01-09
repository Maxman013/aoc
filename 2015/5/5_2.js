const fs = require("fs");
const input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');

var counter = 0;
for (i = 0; i < input.length; i++) {
    var twoLetterStrings = [];
    var prevTwoChar = "";
    var hasSeparatedDouble = false;
    var hasDouble = false;
    for (j = 0; j < input[i].length; j++) {
        var currentChar = input[i].substring(j, j + 1);

        hasDouble ||= (j > 0) && twoLetterStrings.includes(input[i].substring(j - 1, j) + currentChar);
        hasSeparatedDouble ||= (j > 1) && (prevTwoChar.substring(0, 1) == currentChar);

        if (hasDouble && hasSeparatedDouble) {
            counter++;
            break;
        }

        if (prevTwoChar.length == 2) {
            twoLetterStrings.push(prevTwoChar);
            prevTwoChar = prevTwoChar.substring(1, 2) + currentChar;
        } else {
            prevTwoChar += currentChar;
        }
    }
}

console.log(counter);