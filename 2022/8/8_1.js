const fs = require("fs");
var input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

var visible = 0;
var trees = [];
for (i = 0; i < input.length; i++) {
    trees[i] = [];
    var line = input[i].split('').map(Number);
    for (j = 0; j < line.length; j++) {
        trees[i][j] = line[j];
    }
}

for (i = 0; i < trees.length; i++) {
    for (j = 0; j < trees[i].length; j++) {
        if (isVisible(i, j, "up") || isVisible(i, j, "down") || isVisible(i, j, "left") || isVisible(i, j, "right")) visible++;
    }
}

function isVisible(x, y, dir) {
    switch (dir) {
        case "left":
            for (k = 1; y - k >= 0; k++) {
                if (trees[x][y - k] >= trees[x][y]) return false;
            }
            break;
        case "right":
            for (k = 1; y + k < trees[x].length; k++) {
                if (trees[x][y + k] >= trees[x][y]) return false;
            }
            break;
        case "up":
            for (k = 1; x - k >= 0; k++) {
                if (trees[x - k][y] >= trees[x][y]) return false;
            }
            break;
        case "down":
            for (k = 1; x + k < trees.length; k++) {
                if (trees[x + k][y] >= trees[x][y]) return false;
            }
    }

    return true;
}

console.log(visible);