const fs = require("fs");
let input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');
let seeds = input[0].split(": ")[1].split(' ');

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