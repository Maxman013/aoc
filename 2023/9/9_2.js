const fs = require("fs");
let input = fs.readFileSync("9.txt", {encoding: "utf8"}).split('\n');

let rows = [];
for (i = 0; i < input.length; i++) {
    rows.push(input[i].split(' ').map(Number));
}

let sum = 0;
for (i = 0; i < rows.length; i++) {
    // first, find the differences
    let steps = [rows[i]];
    let stepNum = 0;
    while (countZeroes(steps[stepNum]) != steps[stepNum].length) {
        let newStep = [];
        for (j = 0; j < steps[stepNum].length - 1; j++) {
            newStep.push(steps[stepNum][j + 1] - steps[stepNum][j]);
        }
        steps.push(newStep);
        stepNum++;
    }

    // finally, extrapolate from the end backwards
    let extrapolation = 0;
    for (j = steps.length - 1; j >= 0; j--) {
        extrapolation *= -1;
        extrapolation += steps[j][0];
    }

    sum += extrapolation;
}

console.log(sum);

function countZeroes(nums) {
    let occurrences = 0;
    
    for (k = 0; k < nums.length; k++) {
        if (nums[k] == 0) {
            occurrences++;
        }
    }

    return occurrences;
}