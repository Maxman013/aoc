const fs = require("fs");
var input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

var score = 0;
for (i = 0; i < input.length; i++) {
    var choices = input[i].split(' ');
    switch (choices[1]) {
        case "X":
            if (choices[0] == "A") score += 3;
            if (choices[0] == "B") score += 1;
            if (choices[0] == "C") score += 2;
            break;

        case "Y":
            score += 3;
            if (choices[0] == "A") score += 1;
            if (choices[0] == "B") score += 2;
            if (choices[0] == "C") score += 3;
            break;
        
        case "Z":
            score += 6;
            if (choices[0] == "A") score += 2;
            if (choices[0] == "B") score += 3;
            if (choices[0] == "C") score += 1;
    }
}

console.log(score);