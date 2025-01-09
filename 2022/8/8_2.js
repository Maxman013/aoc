const fs = require("fs");
var input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

var maxScenicScore = 0;
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
        if (scenicScore(i, j) > maxScenicScore) {
            maxScenicScore = scenicScore(i, j);
        }
    }
}

function scenicScore(x, y) {
    var score = 1;

    var dirScore = 0;
    for (k = 1; y - k >= 0; k++) {
        dirScore++;
        if (trees[x][y - k] >= trees[x][y]) break;
    }
    score *= dirScore;

    dirScore = 0;
    for (k = 1; y + k < trees[x].length; k++) {
        dirScore++;
        if (trees[x][y + k] >= trees[x][y]) break;
    }
    score *= dirScore;

    dirScore = 0;
    for (k = 1; x - k >= 0; k++) {
        dirScore++;
        if (trees[x - k][y] >= trees[x][y]) break;
    }
    score *= dirScore;

    dirScore = 0;
    for (k = 1; x + k < trees.length; k++) {
        dirScore++;
        if (trees[x + k][y] >= trees[x][y]) break;
    }
    score *= dirScore;

    return score;
}

console.log(maxScenicScore);