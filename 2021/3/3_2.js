const fs = require("fs");

var input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');

function calc (arr, bit, oxyFlag) {
    if (arr.length == 1) {
        return parseInt(arr[0], 2);
    }

    var count = 0;
    for (i = 0; i < arr.length; i++) {
        count += parseInt(arr[i].substring(bit, bit + 1), 10);
    }
    count /= arr.length;

    var wantedBit = +(count < 0.5 ? !oxyFlag : oxyFlag);

    var newArr = [];
    for (i = 0; i < arr.length; i++) {
        if (arr[i].substring(bit, bit + 1) == wantedBit) {
            newArr.push(arr[i]);
        }
    }

    return calc(newArr, bit + 1, oxyFlag);
}

console.log(calc(input, 0, true) * calc(input, 0, false));