const fs = require("fs");
let input = fs.readFileSync("3.txt", {encoding: "utf8"}).split('\n');
let board = [];
let sum = 0;

for (i = 0; i < input.length; i++) {
    board.push(input[i].split(''));
}

// THIS IS VERY INELEGANT BUT I CANT THINK OF A BETTER WAY WITH MY CURRENT STRUCTURE
for (i = 0; i < board.length; i++) {
    for (j = 0; j < board[i].length; j++) {
        if(board[i][j] == '*') {
            let adj = getAdjacent(board, i, j);
            let numbers = [];
            for (k = 0; k < adj.length; k++) {
                if (!isNaN(adj[k])) {
                    let num;
                    switch (k) {
                        case 0:
                            num = adj[0];
                            if (!isNaN(adj[2])) {
                                adj[2] = '.';
                                num = getNumber(num, i - 1, j, true);
                            }
                            if (!isNaN(adj[1])) {
                                adj[1] = '.';
                                num = getNumber(num, i - 1, j, false);
                            }
                            numbers.push(num);
                            break;
                        case 1:
                            numbers.push(getNumber(adj[1], i - 1, j - 1, false));
                            break;
                        case 2:
                            numbers.push(getNumber(adj[2], i - 1, j + 1, true));
                            break;
                        case 3:
                            num = adj[3];
                            if (!isNaN(adj[5])) {
                                adj[5] = '.';
                                num = getNumber(num, i + 1, j, true);
                            }
                            if (!isNaN(adj[4])) {
                                adj[4] = '.';
                                num = getNumber(num, i + 1, j, false);
                            }
                            numbers.push(num);
                            break;
                        case 4:
                            numbers.push(getNumber(adj[4], i + 1, j - 1, false));
                            break;
                        case 5:
                            numbers.push(getNumber(adj[5], i + 1, j + 1, true));
                            break;
                        case 6:
                            numbers.push(getNumber(adj[6], i, j - 1, false));
                            break;
                        case 7:
                            numbers.push(getNumber(adj[7], i, j + 1, true));
                    }
                }
            }

            if (numbers.length == 2) {
                sum += numbers[0] * numbers[1];
            }
        }
    }
}

console.log(sum);

// the array we get is of the form [U, UL, UR, D, DL, DR, L, R]
function getAdjacent(grid, posx, posy) {
    let adjacent = [];

    if (posx > 0) {
        adjacent.push(grid[posx - 1][posy]);
        if (posy > 0) {
            adjacent.push(grid[posx - 1][posy - 1]);
        } else {
            adjacent.push('.');
        }
        if (posy < grid[posx].length - 1) {
            adjacent.push(grid[posx - 1][posy + 1]);
        } else {
            adjacent.push('.');
        }
    } else {
        adjacent.push('.');
        adjacent.push('.');
        adjacent.push('.');
    }
    if (posx < grid.length - 1) {
        adjacent.push(grid[posx + 1][posy]);
        if (posy > 0) {
            adjacent.push(grid[posx + 1][posy - 1]);
        } else {
            adjacent.push('.');
        }
        if (posy < grid[posx].length - 1) {
            adjacent.push(grid[posx + 1][posy + 1]);
        } else {
            adjacent.push('.');
        }
    } else {
        adjacent.push('.');
        adjacent.push('.');
        adjacent.push('.');
    }
    if (posy > 0) {
        adjacent.push(grid[posx][posy - 1]);
    } else {
        adjacent.push('.');
    }
    if (posy < grid[posx].length - 1) {
        adjacent.push(grid[posx][posy + 1]);
    } else {
        adjacent.push('.');
    }

    return adjacent;
}

// get number that current position lies in, directionally
function getNumber(number, posx, posy, goRight) {
    if (goRight) {
        if (posy == board[posx].length - 1 || isNaN(board[posx][posy + 1])) {
            return number;
        }

        return getNumber(number + board[posx][posy + 1], posx, posy + 1, goRight);
    } else {
        if (posy == 0 || isNaN(board[posx][posy - 1])) {
            return number;
        }

        return getNumber(board[posx][posy - 1] + number, posx, posy - 1, goRight);
    }
}