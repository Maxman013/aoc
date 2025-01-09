const fs = require("fs");
const input = fs.readFileSync("1.txt", {encoding: "utf8"});

var floor = 0;
for (i = 0; i < input.length; i++) {
    if (input.substr(i, 1) == "(") {
        floor++;
    } else {
        floor--;
    }

    if (floor < 0) {
        console.log(i + 1);
        break;
    }
}