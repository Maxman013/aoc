const fs = require("fs");
let input = fs.readFileSync("11.txt", {encoding: "utf8"}).split('\n');

let grid = [];
for (i = 0; i < input.length; i++) {
    grid.push(input[i].split(''));
}

// first, do the expansion in rows
for (i = 0; i < grid.length; i++) {
    if (grid[i].indexOf("#") == -1) {
        grid.splice(i + 1, 0, Array(grid[0].length).fill("."));
        i++;
    }
}

// next, do the expansion in columns
for (i = 0; i < grid[0].length; i++) {
    let col = [];
    for (j = 0; j < grid.length; j++) {
        col.push(grid[j][i]);
    }

    if (col.indexOf("#") == -1) {
        for (j = 0; j < grid.length; j++) {
            grid[j].splice(i + 1, 0, ".");
        }
        i++;
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
    }
}

console.log(distance);