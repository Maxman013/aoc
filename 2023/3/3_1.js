const fs = require("fs");
let input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');
let board = [];
let sum = 0;

for (i = 0; i < input.length; i++) {
    board.push(input[i].split(''));
}

for (i = 0; i < board.length; i++) {
    for (j = 0; j < board.length; j++) {
        if(!isNaN(board[i][j])) {
            let state = getAdjacent(board, i, j, Number(board[i][j]));

            // skip over ones we've already checked
            j += Math.floor(Math.log10(state[1]));

            for (k = 0; k < state[0].length; k++) {
                if (isNaN(state[0][k]) && state[0][k] != '.') {
                    sum += state[1];
                    break;
                }
            }
        }
    }
}

console.log(sum);

function getAdjacent(grid, posx, posy, number) {
    let adjacent = [];
    if (posx > 0) {
        adjacent.push(grid[posx - 1][posy]);
        if (posy > 0) {
            adjacent.push(grid[posx - 1][posy - 1]);
        }
        if (posy < grid[posx].length - 1) {
            adjacent.push(grid[posx - 1][posy + 1]);
        }
    } if (posx < grid.length - 1) {
        adjacent.push(grid[posx + 1][posy]);
        if (posy > 0) {
            adjacent.push(grid[posx + 1][posy - 1]);
        }
        if (posy < grid[posx].length - 1) {
            adjacent.push(grid[posx + 1][posy + 1]);
        }
    }
    if (posy > 0) {
        adjacent.push(grid[posx][posy - 1]);
    }
    if (posy < grid[posx].length - 1) {
        // check to see if we are in a string of digits to form an entire number
        if (!isNaN(grid[posx][posy + 1])) {
            let old = adjacent;
            let next = getAdjacent(grid, posx, posy + 1, number * 10 + Number(grid[posx][posy + 1]));
            adjacent = old.concat(next[0]);
            number = next[1];
        } else {
            adjacent.push(grid[posx][posy + 1]);
        }
    }

    return [adjacent, number];
}