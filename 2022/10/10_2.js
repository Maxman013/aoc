const fs = require("fs");
var input = fs.readFileSync("10.txt", {encoding: "utf8"}).split('\n');

var X = 1;
var cycle = 0;
var line = "";
for (i = 0; i < input.length; i++) {
    cycle++;
    var drawPixel = cycle % 40;
    if ((drawPixel == 0 && X >= 38) || (drawPixel != 0 && Math.abs(drawPixel - X - 1) <= 1)) line += "▓"; else line += " ";
    if (drawPixel == 0) {
        console.log(line);
        line = "";
    }

    if (input[i] == "noop") continue;

    cycle++;
    drawPixel = cycle % 40;
    if ((drawPixel == 0 && X >= 38) || (drawPixel != 0 && Math.abs(drawPixel - X - 1) <= 1)) line += "▓"; else line += " ";
    if (drawPixel == 0) {
        console.log(line);
        line = "";
    }

    X += Number(input[i].substring(5));
}