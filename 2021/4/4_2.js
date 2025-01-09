const fs = require("fs");
var input = fs.readFileSync("4.txt", {encoding: "utf8"}).split('\n').filter(e => e != ""); // filter required to remove blank lines

const draws = input.shift().split(',');

// populate boards array - boards[board num][line num][entry num]
var boards = [];
var counter = 0;
while (input.length > 0) {
    var board = [];
    for (i = 0; i < 5; i++) {
        board[i] = input.shift().split(' ').filter(e => e != ""); // filter required to remove the extra space for single-digit board entries
    }
    boards[counter++] = board;
}

for (i = 0; i < draws.length; i++) {
    var draw = draws[i];
    var winningBoard; // stores the winning board, with marked entries denoted as X
    var toRemove = []; // stores which boards have won and need to be removed
    for (j = 0; j < boards.length; j++) {
        var board = boards[j];
        // iterate over each line in the board
        for (k = 0; k < board.length; k++) {
            var line = board[k];
            // mark all occurrences of drawn number in this line
            for (l = 0; l < line.length; l++) {
                if (line[l] == draw) {
                    line[l] = "X";
                }
            }

            // see if this line leads to a horizontal win
            if (arraysEqual(line, ["X", "X", "X", "X", "X"])) {
                // difference here is if we don't have the last board, remove it from the list
                if (boards.length > 1) {
                    toRemove.push(j);
                } else {
                    winningBoard = board;
                }
            }
        }

        // every occurrence of the drawn number has been marked in this board, check for vertical wins
        for (k = 0; k < 5; k++) {
            var vertWin = true;
            for (l = 0; l < 5; l++) {
                vertWin &= (board[l][k] == "X");
            }

            if (vertWin) {
                // difference here is if we don't have the last board, remove it from the list
                if (boards.length > 1) {
                    if (toRemove[toRemove.length - 1] != j) {
                        toRemove.push(j);
                    }
                } else {
                    winningBoard = board;
                }
            }
        }
    }

    // at this point we have marked every occurrence of the drawn number, check if we have a winning board
    if (winningBoard) {
        var score = 0;
        for (j = 0; j < winningBoard.length; j++) {
            line = winningBoard[j];
            for (k = 0; k < line.length; k++) {
                if (line[k] != "X") {
                    score += parseInt(line[k], 10);
                }
            }
        }
        score *= draw;
        console.log(score);
        break;
    }

    // if we reach here we have not found a winning board, repeat with next draw
    for (j = 0; j < toRemove.length; j++) {
        boards.splice(toRemove[j] - j, 1);
    }
}

// stack overflow solution for checking array equality
function arraysEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}