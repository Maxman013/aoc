const fs = require("fs");
var input = fs.readFileSync("11.txt", {encoding: "utf8"}).split('\n');

class Monkey {
    items = [];

    setOperation(operation) {
        this.operation = operation;
    }

    setDivBy(divByTest) {
        this.divByTest = divByTest;
    }

    setTruePassTo(truePassTo) {
        this.truePassTo = truePassTo;
    }

    setFalsePassTo(falsePassTo) {
        this.falsePassTo = falsePassTo;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem() {
        return this.items.shift();
    }
}

var monkeys = [];
var inspections = [];
var mod = 1;
var crMonkey = new Monkey();
for (i = 0; i < input.length; i++) {
    switch (i % 7) {
        case 1:
            var items = input[i].split(":")[1].split(',').map(Number);
            for (j = 0; j < items.length; j++) {
                crMonkey.addItem(items[j]);
            }
            break;
        case 2:
            crMonkey.setOperation(input[i].substring(23));
            break;
        case 3:
            crMonkey.setDivBy(Number(input[i].substring(21)));
            mod *= Number(input[i].substring(21));
            break;
        case 4:
            crMonkey.setTruePassTo(Number(input[i].substring(29)));
            break;
        case 5:
            crMonkey.setFalsePassTo(Number(input[i].substring(30)));
            break;
        case 6:
            monkeys.push(crMonkey);
            inspections.push(0);
            crMonkey = new Monkey();
    }
}
monkeys.push(crMonkey);
inspections.push(0);

for (i = 0; i < 10000; i++) {
    for (j = 0; j < monkeys.length; j++) {
        var monkey = monkeys[j];
        while (monkey.items.length > 0) {
            inspections[j]++;
            var item = monkey.removeItem();
            item = performOperation(item, monkey.operation);
            if (item % monkey.divByTest == 0) monkeys[monkey.truePassTo].addItem(item); else monkeys[monkey.falsePassTo].addItem(item);
        }
    }
}

inspections.sort((a, b) => b - a);
console.log(inspections[0] * inspections[1]);

function performOperation(item, operation) {
    if (operation.substring(0, 1) == "+") {
        if (operation.substring(2) == "old") item += item; else item += Number(operation.substring(2));
    } else {
        if (operation.substring(2) == "old") item *= item; else item *= Number(operation.substring(2));
    }

    return item % mod;
}