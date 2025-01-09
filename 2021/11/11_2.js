const fs = require("fs");
var input = fs.readFileSync("11.txt", {encoding: "utf8"}).split('\n');

var grid = [];
for (i = 0; i < input.length; i++) {
    grid[i] = input[i].split('').map(Number);
}

var steps = 0;
while (true) {
    steps++;
    var flashes = 0;
    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            if (grid[i][j] != "F") {
                grid[i][j] += 1;
                if (grid[i][j] > 9) {
                    flash(grid, i, j);
                }
            }
        }
    }

    for (i = 0; i < grid.length; i++) {
        for (j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == "F") {
                grid[i][j] = 0;
            }
        }
    }

    if (flashes == 100) {
        break;
    }
}

console.log(steps);

function flash(grid, i, j) {
    flashes++;
    grid[i][j] = "F";
    if (i != 0) {
        if (grid[i - 1][j] != "F") {
            grid[i - 1][j] += 1;
            if (grid[i - 1][j] > 9) {
                flash(grid, i - 1, j);
            }
        }
        if (j != 0 && grid[i - 1][j - 1] != "F") {
            grid[i - 1][j - 1] += 1;
            if (grid[i - 1][j - 1] > 9) {
                flash(grid, i - 1, j - 1);
            }
        }
        if (j != grid[i].length - 1 && grid[i - 1][j + 1] != "F") {
            grid[i - 1][j + 1] += 1;
            if (grid[i - 1][j + 1] > 9) {
                flash(grid, i - 1, j + 1);
            }
        }
    }
    if (i != grid.length - 1) {
        if (grid[i + 1][j] != "F") {
            grid[i + 1][j] += 1;
            if (grid[i + 1][j] > 9) {
                flash(grid, i + 1, j);
            }
        }
        if (j != 0 && grid[i + 1][j - 1] != "F") {
            grid[i + 1][j - 1] += 1;
            if (grid[i + 1][j - 1] > 9) {
                flash(grid, i + 1, j - 1);
            }
        }
        if (j != grid[i].length - 1 && grid[i + 1][j + 1] != "F") {
            grid[i + 1][j + 1] += 1;
            if (grid[i + 1][j + 1] > 9) {
                flash(grid, i + 1, j + 1);
            }
        }
    }
    if (j != 0 && grid[i][j - 1] != "F") {
        grid[i][j - 1] += 1;
        if (grid[i][j - 1] > 9) {
            flash(grid, i, j - 1);
        }
    }
    if (j != grid[i].length - 1 && grid[i][j + 1] != "F") {
        grid[i][j + 1] += 1;
        if (grid[i][j + 1] > 9) {
            flash(grid, i, j + 1);
        }
    }
}