const fs = require("fs");
var input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');

// populate 1000x1000 area with 0s, number indicates number of crossings
var area = [];
for (i = 0; i < 1000; i++) {
    area[i] = [];
    for (j = 0; j < 1000; j++) {
        area[i][j] = 0;
    }
}

for (i = 0; i < input.length; i++) {
    var line = input[i].split(' ');
    var pos1 = line[0].split(',');
    var pos2 = line[2].split(',');

    // include only horizontal/vertical lines
    if (pos1[0] == pos2[0]) {
        for (j = Math.min(pos1[1], pos2[1]); j < Math.max(pos1[1], pos2[1]) + 1; j++) {
            area[pos1[0]][j]++;
        }
    } else if (pos1[1] == pos2[1]) {
        for (j = Math.min(pos1[0], pos2[0]); j < Math.max(pos1[0], pos2[0]) + 1; j++) {
            area[j][pos1[1]]++;
        }
    } else {
        continue;
    }
}

var counter = 0;
for (i = 0; i < 1000; i++) {
    for (j = 0; j < 1000; j++) {
        if (area[i][j] > 1) {
            counter++;
        }
    }
}

console.log(counter);