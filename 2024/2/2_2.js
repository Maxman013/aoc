const fs = require("fs");
let input = fs.readFileSync("2.txt", {encoding: "utf8"}).split('\n');

let safe = 0;
for (i = 0; i < input.length; i++) {
    let report = input[i].split(' ').map(Number);
    if (testReport(report) || testOneBadReport(report)) {
        safe += 1;
    }
}

console.log(safe);

function testReport(report) {
    let sign = Math.sign(report[0] - report[1]);

    for (j = 0; j < report.length - 1; j++) {
        if (!isBetween(1, Math.abs(report[j] - report[j + 1]), 3) || sign != Math.sign(report[j] - report[j + 1])) {
            return false;
        }
    }

    return true;
}

function testOneBadReport(report) {

    for (k = 0; k < report.length; k++) {
        let reportCopy = [...report];
        reportCopy.splice(k, 1);

        if (testReport(reportCopy)) {
            return true;
        }
    }

    return false;
}

// returns true if a <= b <= c
function isBetween(a, b, c) {
    return a <= b && b <= c;
}