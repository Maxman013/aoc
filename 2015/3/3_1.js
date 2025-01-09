const fs = require("fs");
var input = fs.readFileSync("3.txt", {encoding: "utf8"});

var visited = ["0,0"];
var currentLocation = [0, 0];
for (i = 0; i < input.length; i++) {
    switch (input.substr(i, 1)) {
        case "^":
            currentLocation[1]++;
            break;
        case ">":
            currentLocation[0]++;
            break;
        case "v":
            currentLocation[1]--;
            break;
        case "<":
            currentLocation[0]--;
    }

    var currentLocationStr = `${currentLocation[0]},${currentLocation[1]}`;

    if (!visited.includes(currentLocationStr)) visited.push(currentLocationStr);
}

console.log(visited.length);