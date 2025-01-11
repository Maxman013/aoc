const fs = require("fs");
let input = fs.readFileSync("7.txt", {encoding: "utf8"}).split('\n');

let hands = [];
for (i = 0; i < input.length; i++) {
    hands.push(input[i].split(' '));
}

// collate hands by type - HC, P, 2P, 3OAK, FH, 4OAK, 5OAK
let handsByType = [[], [], [], [], [], [], []];
let cardOrder = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

// first, we put the hands in order of strength
for (i = 0; i < hands.length; i++) {
    let numOccurrences = [];
    let jokers = 0;

    for (j = 0; j < cardOrder.length; j++) {
        // add special case for jokers - we don't want to count them like normal
        if (j == 0) {
            jokers += countOccurrences(hands[i][0], cardOrder[j]);
        } else {
            numOccurrences.push(countOccurrences(hands[i][0], cardOrder[j]));
        }
    }

    // all hands now get a "joker bonus", where jokers are added to the most common card
    if (Math.max(...numOccurrences) + jokers == 5) {
        // 5 of a kind
        handsByType[6].push(hands[i]);
    } else if (Math.max(...numOccurrences) + jokers == 4) {
        // 4 of a kind
        handsByType[5].push(hands[i]);
    } else if (Math.max(...numOccurrences) + jokers == 3) {
        // We need a joker check here. If jokers = 1, then we want exactly 2x 2 [2(J) + 2].
        // Else, we want exactly 1x 2 [3 + 2]. If there are 2 jokers, they must have been given to
        // a 1, and there could be no other 2s. They can't be shared, since 4OAK is better than FH.
        if ((jokers == 1 && numOccurrences.indexOf(2) != numOccurrences.lastIndexOf(2)) || (jokers != 1 && numOccurrences.indexOf(2) != -1)) {
            // full house
            handsByType[4].push(hands[i]);
        } else {
            // 3 of a kind
            handsByType[3].push(hands[i]);
        }
    } else if (Math.max(...numOccurrences) + jokers == 2) {
        // No joker check needed here. If there is a joker, the only possibility is 1(J), so
        // 1 is the maximum and we cannot have 2P. Otherwise, we have 2P as normal.
        if (numOccurrences.indexOf(2) != numOccurrences.lastIndexOf(2)) {
            // 2 pair
            handsByType[2].push(hands[i]);
        } else {
            // pair
            handsByType[1].push(hands[i]);
        }
    } else {
        // high card
        handsByType[0].push(hands[i]);
    }
}

// next, we sort each hand strength by card order
for (i = 0; i < handsByType.length; i++) {
    handsByType[i].sort((a, b) => {
        let handA = a[0];
        let handB = b[0];

        // go through each card in order and compare card strengths
        for (j = 0; j < 5; j++) {
            let result = cardOrder.indexOf(handA.substring(j, j + 1)) - cardOrder.indexOf(handB.substring(j, j + 1));
            if (result != 0) {
                return result;
            }
        }
    });
}

// finally, we put all the hands back in order
hands = [];
for (i = 0; i < handsByType.length; i++) {
    for (j = 0; j < handsByType[i].length; j++) {
        hands.push(handsByType[i][j]);
    }
}

// we can now calculate the winnings, with rank indexed by i
let winnings = 0;
for (i = 0; i < hands.length; i++) {
    winnings += hands[i][1] * (i + 1);
}

console.log(winnings);

function countOccurrences(hand, card) {
    let occurrences = 0;
    
    handArr = hand.split('');
    for (k = 0; k < handArr.length; k++) {
        if (handArr[k] == card) {
            occurrences++;
        }
    }

    return occurrences;
}