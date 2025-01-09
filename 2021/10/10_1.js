const fs = require("fs");
var input = fs.readFileSync("10.txt", {encoding: "utf8"}).split('\n');

var score = 0;
for (i = 0; i < input.length; i++) {
    var brackets = input[i].split('');
    var stack = [];
    while (brackets.length > 0) {
        var bracket = brackets.shift();
        if (bracket == ")" && stack.pop() != "(") {
            score += 3;
            brackets = [];
        } else if (bracket == "]" && stack.pop() != "[") {
            score += 57;
            brackets = [];
        } else if (bracket == "}" && stack.pop() != "{") {
            score += 1197;
            brackets = [];
        } else if (bracket == ">" && stack.pop() != "<") {
            score += 25137;
            brackets = [];
        } else if (["(", "[", "{", "<"].includes(bracket)) {
            stack.push(bracket);
        }
    }
}

console.log(score);