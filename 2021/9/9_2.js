const fs = require("fs");
var input = fs.readFileSync("9.txt", {encoding: "utf8"}).split('\n');

for (i = 0; i < input.length; i++) {
    input[i] = input[i].split('').map(Number);
}

// find low points
var lowpoints = [];
for (i = 0; i < input.length; i++) {
    for (j = 0; j < input[i].length; j++) {
        var height = input[i][j]
        if ((i == 0 || input[i - 1][j] > height) && (j == 0 || input[i][j - 1] > height) && (i == input.length - 1 || input[i + 1][j] > height) && (j == input[i].length - 1 || input[i][j + 1] > height)) {
            lowpoints.push([i, j]);
        }
    }
}

// get the basin size of each low point basin
var basins = [];
for (i = 0; i < lowpoints.length; i++) {
    basins.push(getBasinSize(lowpoints[i], []));
}

// get sizes of three largest basins
var sizes = [];
for (i = 0; i < basins.length; i++) {
    if (sizes.length < 3) {
        sizes.push(basins[i].length);
        sizes.sort((a, b) => {return a - b;});
    } else if (sizes[0] < basins[i].length) {
        sizes[0] = basins[i].length;
        sizes.sort((a, b) => {return a - b;});
    }
}

console.log(sizes[0] * sizes[1] * sizes[2]);

// recursive function that returns the basin corresponding to a low point
function getBasinSize(cell, inBasin) {
    // if cell already checked this basin - return
    for (j = 0; j < inBasin.length; j++) {
        if (inBasin[j][0] == cell[0] && inBasin[j][1] == cell[1]) {
            return inBasin;
        }
    }

    // add cell to already checked cells
    inBasin.push(cell);

    // check each cardinal direction - if not empty and not 9, run function on that cell.
    // if empty or 9, go to next direction
    if (cell[0] != 0 && input[cell[0] - 1][cell[1]] != 9) {
        inBasin = getBasinSize([cell[0] - 1, cell[1]], inBasin);
    }
    if (cell[1] != 0 && input[cell[0]][cell[1] - 1] != 9) {
        inBasin = getBasinSize([cell[0], cell[1] - 1], inBasin);
    }
    if (cell[0] != input.length - 1 && input[cell[0] + 1][cell[1]] != 9) {
        inBasin = getBasinSize([cell[0] + 1, cell[1]], inBasin);
    }
    if (cell[1] != input.length - 1 && input[cell[0]][cell[1] + 1] != 9) {
        inBasin = getBasinSize([cell[0], cell[1] + 1], inBasin);
    }

    return inBasin;
}