const fs = require("fs");
let input = fs.readFileSync("12.txt", {encoding: "utf8"}).split('\n');

let rows = [];
for (i = 0; i < input.length; i++) {
    let line = input[i].split(' ');
    let springs = line[0].split('');
    let nums = line[1].split(',').map(Number);

    // unfold
    let foldedSprings = [...springs];
    let foldedNums = [...nums];

    for (j = 0; j < 4; j++) {
        springs.push('?');
        springs = springs.concat(foldedSprings);
        nums = nums.concat(foldedNums);
    }

    rows.push([springs, nums]);
}

let arrangements = 0;
let lookupTable = {};
for (i = 0; i < rows.length; i++) {
    let thisArrangement = fillRow(rows[i][0], rows[i][1]);
    arrangements += thisArrangement;
}

console.log(arrangements);

function fillRow(springs, nums) {
    if (springs.length == 0) {
        // if we're empty, we'd better have no more '#'
        if (nums.length == 0 || (nums.length == 1 && nums[0] == 0)) {
            return 1;
        }
        return 0;
    }

    // so this is a topic i've never heard about before - memoisation
    // basically we have a lookup table and if our exact situation has happened before, we can take a shortcut
    let checkState = springs.join('') + "|" + nums.join(',');
    if (lookupTable.hasOwnProperty(checkState)) {
        return lookupTable[checkState];
    }

    let count = 0;

    if (springs[0] == '#') {
        // if we have no more '#' to do, we're bad
        if (nums.length == 0 || nums[0] == 0) {
            return 0;
        }

        // remove the '#' and reduce num of '#' by 1 (negative means we're in a string of '#')
        springs.shift();
        nums[0] = -Math.abs(nums[0]) + 1;
        return count + fillRow(springs, nums);
    }

    if (springs[0] == '.') {
        // if we are supposed to be in a current string of '#', we're bad
        if (nums.length > 0 && nums[0] < 0) {
            return 0;
        }

        // keep old state for storage
        let oldState = springs.join('') + "|" + nums.join(',');

        // remove the '#' and if we have just finished a string of '#', remove that string from nums
        springs.shift();
        if (nums.length > 0 && nums[0] == 0) {
            nums.shift();
        }

        count += fillRow(springs, nums);

        lookupTable[oldState] = count;
        return count;
    }

    // keep old state for storage
    let oldState = springs.join('') + "|" + nums.join(',');

    // we are a '?', so try filling it with a '.' and a '#'
    springs[0] = '.';
    count += fillRow([...springs], [...nums]);

    springs[0] = '#';
    count += fillRow(springs, nums);

    lookupTable[oldState] = count;
    return count;
}