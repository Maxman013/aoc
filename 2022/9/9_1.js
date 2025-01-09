const fs = require("fs");
var input = fs.readFileSync("9.txt", {encoding: "utf8"}).split('\n');

var headPos = [0, 0];
var tailPos = [0, 0];
var tailMoves = [];
for (i = 0; i < input.length; i++) {
    var move = input[i].split(' ');
    for (j = 0; j < move[1]; j++) {
        moveRope(move[0]);
        var newMove = true;
        for (k = 0; k < tailMoves.length; k++) {
            newMove &&= !(tailPos[0] == tailMoves[k][0]) || !(tailPos[1] == tailMoves[k][1]);
        }
        if (newMove) tailMoves.push([tailPos[0], tailPos[1]]);
    }
}

console.log(tailMoves.length);

function moveRope(dir) {
    switch (dir) {
        case "U":
            headPos[1]++;
            break;
        case "D":
            headPos[1]--;
            break;
        case "L":
            headPos[0]--;
            break;
        case "R":
            headPos[0]++;
    }

    if (Math.abs(headPos[0] - tailPos[0]) <= 1 && Math.abs(headPos[1] - tailPos[1]) <= 1) return;

    tailPos[0] += Math.sign(headPos[0] - tailPos[0]) * 1;
    tailPos[1] += Math.sign(headPos[1] - tailPos[1]) * 1;
}