const fs = require("fs");
let input = fs.readFileSync("10.txt", {encoding: "utf8"}).split('\n');

let grid = [];
for (i = 0; i < input.length; i++) {
    grid.push(input[i].split(''));
}

// find starting position
let startingPos = [];
for (i = 0; i < grid.length; i++) {
    if (grid[i].indexOf("S") != -1) {
        startingPos = [i, grid[i].indexOf("S")];
        break;
    }
}

// now, we need to figure out what type of pipe goes in the S spot
let startingNeighbours = {"L": false, "R": false, "U": false, "D": false};

// determine which neighbouring pipes connect to S
if (startingPos[0] != 0 && ["|", "F", "7"].indexOf(grid[startingPos[0] - 1][startingPos[1]]) != -1) {
    startingNeighbours["U"] = true;
}
if (startingPos[0] != grid.length - 1 && ["|", "J", "L"].indexOf(grid[startingPos[0] + 1][startingPos[1]]) != -1) {
    startingNeighbours["D"] = true;
}
if (startingPos[1] != 0 && ["-", "L", "F"].indexOf(grid[startingPos[0]][startingPos[1] - 1]) != -1) {
    startingNeighbours["L"] = true;
}
if (startingPos[1] != grid[0].length - 1 && ["-", "J", "7"].indexOf(grid[startingPos[0]][startingPos[1] + 1]) != -1) {
    startingNeighbours["R"] = true;
}

// to calculate the longest distance, we will start at S and follow the pipe in both directions
// once we meet up again, the distance we've travelled is the longest distance
// we have to do a special case for S to start off
let leftPos = [...startingPos];
let rightPos = [...startingPos];
if (startingNeighbours["L"]) {
    if (startingNeighbours["U"]) {
        // J
        move(leftPos, "L");
        move(rightPos, "U");
    } else if (startingNeighbours["D"]) {
        // 7
        move(leftPos, "L");
        move(rightPos, "D");
    } else {
        // -
        move(leftPos, "L");
        move(rightPos, "R");
    }
} else if (startingNeighbours["R"]) {
    if (startingNeighbours["U"]) {
        // L
        move(leftPos, "U");
        move(rightPos, "R");
    } else {
        // F
        move(leftPos, "D");
        move(rightPos, "R");
    }
} else {
    // |
    move(leftPos, "U");
    move(rightPos, "D");
}

let distance = 1;
while (leftPos[0] != rightPos[0] || leftPos[1] != rightPos[1]) {
    moveStep(leftPos);
    moveStep(rightPos);
    distance++;
}

console.log(distance);

// moves a position in a given direction (U,D,L,R) and sets the "moved from" flag
function move(pos, dir) {
    pos[2] = dir;
    switch (dir) {
        case "U":
            pos[0]--;
            break;
        case "D":
            pos[0]++;
            break;
        case "L":
            pos[1]--;
            break;
        case "R":
            pos[1]++;
    }
}

// performs a move step, updating the given position to move along the pipe in the correct direction
function moveStep(pos) {
    switch (grid[pos[0]][pos[1]]) {
        case "|":
            move(pos, pos[2] == "U" ? "U" : "D");
            break;
        case "F":
            move(pos, pos[2] == "U" ? "R" : "D");
            break;
        case "7":
            move(pos, pos[2] == "U" ? "L" : "D");
            break;
        case "J":
            move(pos, pos[2] == "D" ? "L" : "U");
            break;
        case "L":
            move(pos, pos[2] == "D" ? "R" : "U");
            break;
        case "-":
            move(pos, pos[2] == "L" ? "L" : "R");
    }
}