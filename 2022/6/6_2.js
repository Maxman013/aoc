const fs = require("fs");
var input = fs.readFileSync("6.txt", {encoding: "utf8"}).split('');

var marker = 0;
var lastFourteen = [];
for (i = 0; i < 13; i++) {
    lastFourteen.push(input[i]);
}
for (i = 13; i < input.length; i++) {
    if (!lastFourteen.includes(input[i]) && !hasDuplicates(lastFourteen)) {
        marker = i;
        break;
    }

    lastFourteen.push(input[i]);
    lastFourteen.shift();
}

console.log(marker + 1);

function hasDuplicates(array) {
    return (new Set(array)).size != array.length;
}