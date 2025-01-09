const fs = require("fs");
var input = fs.readFileSync("3.txt", {encoding: "utf8"});

var visited = ["0,0"];
var currentLocationOne = [0, 0];
var currentLocationTwo = [0, 0];
for (i = 0; i < input.length; i++) {
    switch (input.substr(i, 1)) {
        case "^":
            i % 2 == 0 ? currentLocationOne[1]++ : currentLocationTwo[1]++;
            break;
        case ">":
            i % 2 == 0 ? currentLocationOne[0]++ : currentLocationTwo[0]++;
            break;
        case "v":
            i % 2 == 0 ? currentLocationOne[1]-- : currentLocationTwo[1]--;
            break;
        case "<":
            i % 2 == 0 ? currentLocationOne[0]-- : currentLocationTwo[0]--;
    }

    var currentLocationStr = i % 2 == 0 ? `${currentLocationOne[0]},${currentLocationOne[1]}` : `${currentLocationTwo[0]},${currentLocationTwo[1]}`;

    if (!visited.includes(currentLocationStr)) visited.push(currentLocationStr);
}

console.log(visited.length);