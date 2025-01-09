const fs = require("fs");
var input = fs.readFileSync("12.txt", {encoding: "utf8"}).split('\n');

class Vertex {
    incidentTo = [];
    constructor(position, elevation) {
        this.position = position;
        this.elevation = elevation;
    }
}

var grid = [];

for (i = 0; i < input.length; i++) {
    for (j = 0; j < input[i].length; j++) {
        grid.push(new Vertex([j, i], input[i].split('')[j]));
    }
}
for (i = 0; i < grid.length; i++) {

}

console.log(grid);