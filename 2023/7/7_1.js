const fs = require("fs");
let input = fs.readFileSync("7.txt", {encoding: "utf8"}).split('\n');

let hands = [];
for (i = 0; i < input.length; i++) {
    hands.push(input[i].split(' '));
}

// collate hands by type - HC, P, 2P, 3OAK, FH, 4OAK, 5OAK
let handsByType = [[], [], [], [], [], [], []];
let cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

// first, we put the hands in order of strength
for (i = 0; i < hands.length; i++) {
    let numOccurrences = [];
    for (j = 0; j < cardOrder.length; j++) {
        numOccurrences.push(countOccurrences(hands[i][0], cardOrder[j]));
    }

    if (Math.max(...numOccurrences) == 5) {
        // 5 of a kind
        handsByType[6].push(hands[i]);
    } else if (Math.max(...numOccurrences) == 4) {
        // 4 of a kind
        handsByType[5].push(hands[i]);
    } else if (Math.max(...numOccurrences) == 3) {
        if (numOccurrences.indexOf(2) != -1) {
            // full house
            handsByType[4].push(hands[i]);
        } else {
            // 3 of a kind
            handsByType[3].push(hands[i]);
        }
    } else if (Math.max(...numOccurrences) == 2) {
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