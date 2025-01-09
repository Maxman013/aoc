const fs = require("fs");
var input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');

var stacks = [[], [], [], [], [], [], [], [], []];
var inputType = true;
for (i = 0; i < input.length; i++) {
    if (inputType) {
        if (input[i].substring(0, 1) != "[") {
            inputType = false;
            continue;
        }

        var boxes = input[i].split(' ');
        var stack = 0;
        for (j = 0; j < boxes.length; j++) {
            if (boxes[j] != "") {
                stacks[stack++].unshift(boxes[j].substr(1, 1));
            } else {
                j += 3;
                stack++;
            }
        }
    } else {
        if (input[i].substring(0, 1) != "m") continue;
        var command = input[i].split(' ');
        for (j = 0; j < command[1]; j++) {
            stacks[command[5] - 1].push(stacks[command[3] - 1].pop());
        }
    }
}

var output = "";
for (i = 0; i < 9; i++) {
    output += stacks[i].pop();
}
console.log(output);