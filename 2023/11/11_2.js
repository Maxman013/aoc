const fs = require("fs");
let input = fs.readFileSync("11.txt", {encoding: "utf8"}).split('\n');

let grid = [];
for (i = 0; i < input.length; i++) {
    grid.push(input[i].split(''));
}

let expansionRows = [];
let expansionCols = [];

// first, do the expansion in rows
for (i = 0; i < grid.length; i++) {
    if (grid[i].indexOf("#") == -1) {
        expansionRows.push(i);
    }
}

// next, do the expansion in columns
for (i = 0; i < grid[0].length; i++) {
    let col = [];
    for (j = 0; j < grid.length; j++) {
        col.push(grid[j][i]);
    }

    if (col.indexOf("#") == -1) {
        expansionCols.push(i);
    }
}

// finally, we calculate the shortest distance between pairs
// this is just given by the taxicab distance
let galaxies = [];
for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == "#") {
            galaxies.push([i, j]);
        }
    }
}

let distance = 0;
for (i = 0; i < galaxies.length - 1; i++) {
    for (j = i + 1; j < galaxies.length; j++) {
        distance += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);

        // now we need to add expansions
        for (k = 0; k < expansionRows.length; k++) {
            if (Math.min(galaxies[i][0], galaxies[j][0]) < expansionRows[k] && expansionRows[k] < Math.max(galaxies[i][0], galaxies[j][0])) {
                distance += 999999;
            }
        }

        for (k = 0; k < expansionCols.length; k++) {
            if (Math.min(galaxies[i][1], galaxies[j][1]) < expansionCols[k] && expansionCols[k] < Math.max(galaxies[i][1], galaxies[j][1])) {
                distance += 999999;
            }
        }
    }
}

console.log(distance);