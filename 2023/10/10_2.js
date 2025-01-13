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

// to calculate the longest distance, we will start at S and follow the pipe until we get back to S
// we also need to keep track of vertices for later (shoelace formula)
let currentPos = [...startingPos];
let vertices = [];

// we have to do a special case for S to start off
if (startingNeighbours["L"]) {
    if (startingNeighbours["U"] || startingNeighbours["D"]) {
        vertices.push([...currentPos]);
    }
    move(currentPos, "L");
} else if (startingNeighbours["R"]) {
    vertices.push([...currentPos]);
    move(currentPos, "R");
} else {
    move(currentPos, "U");
}

// now continue moving until we get back to the start
while (grid[currentPos[0]][currentPos[1]] != "S") {
    moveStep(currentPos, vertices);
}

// ok, now i remember this thing called Pick's theorem from an MSS talk that
// gave the area of a polygon by counting lattice points. this sounds useful
// Pick's theorem: area = interior points + (boundary points) / 2 - 1
// => interior points = area - (boundary points) / 2 + 1
let area = shoelaceArea(vertices);
let boundaryPoints = getBoundary(grid);

console.log(area - (boundaryPoints) / 2 + 1);

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
// however, we now mark the pipe as part of the main loop
function moveStep(pos, vertices) {
    let gridPos = grid[pos[0]][pos[1]];
    grid[pos[0]][pos[1]] = "S";

    switch (gridPos) {
        case "|":
            move(pos, pos[2] == "U" ? "U" : "D");
            break;
        case "F":
            vertices.push([...currentPos]);
            move(pos, pos[2] == "U" ? "R" : "D");
            break;
        case "7":
            vertices.push([...currentPos]);
            move(pos, pos[2] == "U" ? "L" : "D");
            break;
        case "J":
            vertices.push([...currentPos]);
            move(pos, pos[2] == "D" ? "L" : "U");
            break;
        case "L":
            vertices.push([...currentPos]);
            move(pos, pos[2] == "D" ? "R" : "U");
            break;
        case "-":
            move(pos, pos[2] == "L" ? "L" : "R");
    }
}

// find the area of a polygon using the shoelace formula
// area = |sum (x_i y_{i+1} - x_{i+1} y_i)| / 2, with x_n = x_0, y_n = y_0
function shoelaceArea(vertices) {
    let sum = 0;
    for (i = 0; i < vertices.length; i++) {
        sum += vertices[i][0] * vertices[(i + 1) % vertices.length][1] - vertices[(i + 1) % vertices.length][0] * vertices[i][1];
    }

    return Math.abs(sum) / 2;
}

// count the number of boundary points (given by "S") in the grid
function getBoundary(grid) {
    let counter = 0;
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "S") {
                counter++;
            }
        }
    }

    return counter;
}