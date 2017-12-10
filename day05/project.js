var fs = require('fs');

class Machine {
    constructor(input) {
        this.instructions = input.trim().split("\n").map(x => parseInt(x));
        this.location = 0;  // Current instruction pointer
        this.steps = 0;  // Total number of steps taken
    }

    load(input) {
        this.instructions = input.trim().split().map(x => parseInt(x));
    }

    step(version) {
        var instruction = this.instructions[this.location];
        var new_location = this.location + instruction;
        if (version == 2 && instruction >= 3) {
            this.instructions[this.location] -= 1;
        }
        else {
            this.instructions[this.location] += 1;
        }
        this.steps += 1;
        if (instruction + this.location >= this.instructions.length) {
            this.location = null
            return true;
        }
        else {
            this.location = new_location;
            return false
        }
    }
}

function main1 (input) {
    machine = new Machine(input);
    while(!machine.step());
    return machine.steps
}

function main2 (input) {
    machine = new Machine(input);
    while(!machine.step(2));
    return machine.steps
}

fs.readFile('input.txt', 'utf8', (e, contents) => {
    console.log(main1(contents.trim()));
    console.log(main2(contents.trim()));
})
