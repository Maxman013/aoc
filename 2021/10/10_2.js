const fs = require("fs");
var input = fs.readFileSync("10.txt", {encoding: "utf8"}).split('\n');

var scores = [];
for (i = 0; i < input.length; i++) {
    var brackets = input[i].split('');
    var stack = [];
    var corrupted = false;
    while (brackets.length > 0) {
        var bracket = brackets.shift();
        if (bracket == ")" && stack.pop() != "(") {
            corrupted = true;
            brackets = [];
        } else if (bracket == "]" && stack.pop() != "[") {
            corrupted = true;
            brackets = [];
        } else if (bracket == "}" && stack.pop() != "{") {
            corrupted = true;
            brackets = [];
        } else if (bracket == ">" && stack.pop() != "<") {
            corrupted = true;
            brackets = [];
        } else if (["(", "[", "{", "<"].includes(bracket)) {
            stack.push(bracket);
        }
    }
    if (corrupted) continue;

    var score = 0;
    while (stack.length > 0) {
        score *= 5;
        switch (stack.pop()) {
            case "(":
                score += 1;
                break;
            case "[":
                score += 2;
                break;
            case "{":
                score += 3;
                break;
            case "<":
                score += 4;
        }
    }

    scores.push(score);
}

scores.sort((a,b) => {return a-b;});
console.log(scores[scores.length / 2 - 0.5]);