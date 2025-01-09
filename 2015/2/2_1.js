const fs = require("fs");
const input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

var paper = 0;
for (i = 0; i < input.length; i++) {
    var dimensions = input[i].split('x').map(Number);
    var faces = [dimensions[0] * dimensions[1], dimensions[0] * dimensions[2], dimensions[1] * dimensions[2]];
    paper += 2 * faces[0] + 2 * faces[1] + 2 * faces[2] + Math.min(...faces);
}
console.log(paper);