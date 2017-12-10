var fs = require('fs');

class Machine {
    constructor(input) {
        this.blocks = input.trim().split(/\s+/).map(x => parseInt(x));
        this.steps = 0;  // Total number of steps taken
        this.seen = {};
    }

    run() {
        while(typeof this.seen[this.blocks.toString()] === 'undefined') {
            this.seen[this.blocks.toString()] = this.steps;
            var idx = this.findLargest();
            this.mancala(idx);
            this.steps += 1;
        }
    }

    findLargest() {
        var max = 0;
        for (var size of this.blocks)
            if (size > max)
                max = size
        for (var i in this.blocks)
            if (this.blocks[i] == max)
                return parseInt(i);
    }

    mancala(start_idx) {
        var pebbles = this.blocks[start_idx];
        this.blocks[start_idx] = 0;
        var idx = start_idx + 1;
        while (pebbles > 0) {
            pebbles -= 1;
            this.blocks[idx % this.blocks.length] += 1;
            idx += 1;
        }
    }
}

function main1 (input) {
    machine = new Machine(input);
    machine.run()
    return [machine.steps, machine.steps - machine.seen[machine.blocks.toString()]]

}

function main2 (input) {
    machine = new Machine(input);
    while(!machine.step(2));
    return machine.steps
}

fs.readFile('input.txt', 'utf8', (e, contents) => {
    console.log(main1(contents.trim()));
    // console.log(main2(contents.trim()));
})
