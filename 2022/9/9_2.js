const fs = require("fs");
var input = fs.readFileSync("9.txt", {encoding: "utf8"}).split('\n');

var knotPos = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var tailMoves = [];
for (i = 0; i < input.length; i++) {
    var move = input[i].split(' ');
    for (j = 0; j < move[1]; j++) {
        moveRope(move[0]);
        var newMove = true;
        for (k = 0; k < tailMoves.length; k++) {
            newMove &&= !(knotPos[9][0] == tailMoves[k][0]) || !(knotPos[9][1] == tailMoves[k][1]);
        }
        if (newMove) tailMoves.push([knotPos[9][0], knotPos[9][1]]);
    }
}

console.log(tailMoves.length);

function moveRope(dir) {
    switch (dir) {
        case "U":
            knotPos[0][1]++;
            break;
        case "D":
            knotPos[0][1]--;
            break;
        case "L":
            knotPos[0][0]--;
            break;
        case "R":
            knotPos[0][0]++;
    }

    for (knot = 1; knot < 10; knot++) {
        if (Math.abs(knotPos[knot - 1][0] - knotPos[knot][0]) <= 1 && Math.abs(knotPos[knot - 1][1] - knotPos[knot][1]) <= 1) break;

        knotPos[knot][0] += Math.sign(knotPos[knot - 1][0] - knotPos[knot][0]) * 1;
        knotPos[knot][1] += Math.sign(knotPos[knot - 1][1] - knotPos[knot][1]) * 1;
    }
}