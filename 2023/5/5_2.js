const fs = require("fs");
let input = fs.readFileSync("5.txt", {encoding: "utf8"}).split('\n');
let seedsInstr = input[0].split(": ")[1].split(' ');
let intervals = [];
let mappings = [];

// populate seeds intervals
for (i = 0; i < seedsInstr.length; i++) {
    let start = Number(seedsInstr[i]);
    let range = Number(seedsInstr[++i]);
    intervals.push([start, start + range - 1]);
}

// sort intervals based on starting location
intervals.sort((a, b) => a[0] - b[0]);

let thisLevel = [];

// parse maps, put into workable format
for (i = 3; i < input.length; i++) {
    // new level of maps
    if (input[i] == "") {
        // sort each line in the mapping by source
        mappings.push(thisLevel.sort((a, b) => a[1] - b[1]));
        thisLevel = [];
        i++;
    } else {
        let line = input[i].split(' ').map(Number);
        // reformat lines to be of the form [dest - source, source, source + range]
        thisLevel.push([line[0] - line[1], line[1], line[1] + line[2] - 1]);
    }
}

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
// notice how we had to keep track of breakpoints!

for (i = 0; i < mappings.length; i++) {
    let level = mappings[i];

    // first, we need to figure out breakpoints (or how many subintervals we need to split this into)
    for (j = 0; j < intervals.length; j++) {
        let interval = intervals[j];
        for (k = 0; k < level.length; k++) {
            if (interval[1] < level[k][1] || level[k][2] < interval[0]) {
                // intersection is empty
                continue;
            }

            // seed interval goes lower than map interval, so breakpoint is needed at map interval lower bound
            if (interval[0] < level[k][1]) {
                // create new seed interval
                intervals.push([level[k][1], interval[1]]);
                intervals.sort((a, b) => a[0] - b[0]);

                // update current seed interval
                intervals[j][1] = level[k][1] - 1;
            }

            // seed interval goes higher than map interval, so breakpoint is needed at map interval upper bound
            if (level[k][2] < interval[1]) {
                // create new seed interval
                intervals.push([level[k][2] + 1, interval[1]]);
                intervals.sort((a, b) => a[0] - b[0]);

                // update current seed interval
                intervals[j][1] = level[k][2];
            } 
        }
    }

    // now that we have all the subintervals we need, apply the mapping to it
    for (j = 0; j < intervals.length; j++) {
        for (k = 0; k < level.length; k++) {
            // find the interval we are fully contained inside
            if (intervals[j][1] < level[k][1] || level[k][2] < intervals[j][0]) {
                // intersection is empty
                continue;
            }

            // apply the mapping
            intervals[j][0] += level[k][0];
            intervals[j][1] += level[k][0];

            break;
        }
    }

    intervals.sort((a, b) => a[0] - b[0]);

    // finally, we can recombine any subintervals that are actually continguous
    for (j = 0; j < intervals.length - 1; j++) {
        if (intervals[j][1] == intervals[j + 1][0]) {
            // recombine
            intervals[j][1] = intervals[j + 1][1];
            intervals.splice(j + 1, 1);
            j--;
        }
    }
}

// output smallest element of smallest interval
console.log(intervals[0][0]);