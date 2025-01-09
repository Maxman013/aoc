const fs = require("fs");
let input = fs.readFileSync("5ex.txt", {encoding: "utf8"}).split('\n');
let seedsInstr = input[0].split(": ")[1].split(' ');
let intervals = [];
let seeds = [];

// populate seeds intervals
for (i = 0; i < seedsInstr.length; i++) {
    let start = Number(seedsInstr[i]);
    let range = Number(seedsInstr[++i]);
    intervals.push([start, start + range - 1]);
}

console.log(intervals);

// the idea here is that the maps are just a piecewise linear function:
// f(x) = {x + dest - source, if x in [source, source + range];
//          ...
//         x, otherwise}
// let's say we have
// f(x) = {x + 3 - 1, if x in [1, 100];
//         x + 1 - 101, if x in [101, 102];
//         x, otherwise}
// then f([50, 60]) = [f(50), f(60)] = [52, 62]
// also f([95, 105]) = [f(95), f(100)] u [f(101), f(102)] u [f(103), f(105)] = [97, 102] u [1, 2] u [103, 105]
// notice how we had to keep track of changepoints!


for (i = 3; i < input.length; i++) {
    // new level of maps, set all to be unconverted
    if (input[i] == "") {
        for (j = 0; j < seeds.length; j++) {
            if (seeds[j].substring(0, 1) == "a") {
                seeds[j] = seeds[j].substring(1);
            }
        }
        i++
    } else {
        let line = input[i].split(' ').map(Number);
        for (j = 0; j < seeds.length; j++) {
            if (seeds[j] >= line[1] && seeds[j] <= line[1] + line[2]) {
                // dot means already converted, skip this one
                seeds[j] = "a" + (line[0] + Number(seeds[j]) - line[1]);
            }
        }
    }
}

// get rid of converted markers
for (i = 0; i < seeds.length; i++) {
    if (seeds[i].substring(0, 1) == "a") {
        seeds[i] = seeds[i].substring(1);
    }
}

console.log(Math.min(...seeds));