const fs = require("fs");
let input = fs.readFileSync("12.txt", {encoding: "utf8"}).split('\n');

let rows = [];
for (i = 0; i < input.length; i++) {
    let line = input[i].split(' ');
    rows.push([line[0].split(''), line[1].split(',').map(Number)]);
}

// trying recursion
let arrangements = 0;
for (i = 0; i < rows.length; i++) {
    arrangements += fillRow(rows[i][0], rows[i][1]);
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

        // remove the '#' and if we have just finished a string of '#', remove that string from nums
        springs.shift();
        if (nums.length > 0 && nums[0] == 0) {
            nums.shift();
        }

        return count + fillRow(springs, nums);
    }

    springs[0] = '.';
    count += fillRow([...springs], [...nums]);

    springs[0] = '#';
    return count + fillRow(springs, nums);
}