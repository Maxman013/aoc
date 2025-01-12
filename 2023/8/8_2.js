const fs = require("fs");
let input = fs.readFileSync("8.txt", {encoding: "utf8"}).split('\n');

let directions = input[0];

// the network will be formatted as an object, with key-value pairs given as
// node: {"L": nodeL, "R": nodeR}
let network = {};
for (i = 2; i < input.length; i++) {
    network[input[i].substring(0, 3)] = {"L": input[i].substring(7, 10), "R": input[i].substring(12, 15)};
}

// initially populate currentNodes with nodes ending in A
let currentNodes = [];
Object.entries(network).forEach(([k, v]) => {
    if (k.substring(2) == "A") {
        currentNodes.push(k);
    }
});

let steps = [];
for (i = 0; i < currentNodes.length; i++) {
    steps[i] = 0;
    while (currentNodes[i].substring(2) != "Z") {
        currentNodes[i] = network[currentNodes[i]][directions.substring(steps[i] % directions.length, steps[i] % directions.length + 1)];
        steps[i]++;
    }
}

// we want to find the LCM (for some reason, it just seems to work. it shouldn't be the solution in general)
console.log(lcmArr(steps));

// Euclidean algorithm
function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
}

// we assume a and b are not both zero
function lcm(a, b) {
    return a * b / gcd(a, b);
}

// to take the lcm of many numbers
// we use the formula lcm(a, b, c) = lcm(a, lcm(b, c))
function lcmArr(nums) {
    return nums.length == 1 ? nums[0] : lcm(nums[0], lcmArr(nums.splice(1)));
}