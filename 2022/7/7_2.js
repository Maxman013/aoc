const fs = require("fs");
var input = fs.readFileSync("7.txt", {encoding: "utf8"}).split('\n');

var dirs = {"/": {}};

var currentDir = [];
for (i = 0; i < input.length; i++) {
    var line = input[i].split(' ');
    if (line[1] == "cd") {
        (line[2] == "..") ? currentDir.pop() : currentDir.push(line[2]);
    } else if (line[0] != "$") {
        var dir = dirs;
        for (j = 0; j < currentDir.length; j++) {
            dir = dir[currentDir[j]];
        }

        if (line[0] == "dir") {
            dir[line[1]] = {};
        } else {
            dir[line[1]] = parseInt(line[0]);
        }
    }
}

var smallestSize = Infinity;
var outermostSize = getDirSize(["/"], true);
getDirSize(["/"], false);

function getDirSize(dirArr, firstRun) {
    var size = 0;

    var dir = dirs;
    for (j = 0; j < dirArr.length; j++) {
        dir = dir[dirArr[j]];
    }

    var contents = Object.keys(dir);
    
    for (let j = 0; j < contents.length; j++) {
        if (typeof dir[contents[j]] == "number") {
            size += dir[contents[j]];
        } else {
            dirArr.push(contents[j])
            size += getDirSize(dirArr, firstRun);
            dirArr.pop();
        }
    }

    if (!firstRun && 70000000 - outermostSize + size >= 30000000 && size < smallestSize) smallestSize = size;
    return size;
}

console.log(smallestSize);