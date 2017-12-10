var fs = require('fs');

var machine;
var operations = {
    '<': function (a, b) {return a < b},
    '>': function (a, b) {return a > b},
    '>=': function (a, b) {return a >= b},
    '<=': function (a, b) {return a <= b},
    '==': function (a, b) {return a == b},
    '!=': function (a, b) {return a != b},
}

function split_line (line) {
    output =  {
        register: null,
        offset: 0,
        condition: {
            register: null,
            op: null,
            value: null
        }
    }
    parts = line.split(" ");
    output.register = parts[0];
    output.offset = parseInt(parts[2]);
    if (parts[1] == "dec")
        output.offset *= -1;
    output.condition.register = parts[4];
    output.condition.value = parseInt(parts[6]);
    condition_func = operations[parts[5]];
    if (typeof condition_func !== 'undefined')
        output.condition.op = condition_func
    else
        console.log("Got unexpected operator '" + parts[5] +"'");
    return output
}

class Machine {
    constructor (input) {
        this.registers = {}
        this.instructions = input.split("\n").map(split_line);
        this.location = 0;
        this.max = 0;
    }

    get(locus) {
        if (typeof this.registers[locus] === 'undefined') {
            this.registers[locus] = 0;
        }
        return this.registers[locus];
    }

    inc (locus, offset) {
        if (typeof this.registers[locus] === 'undefined') {
            this.registers[locus] = 0;
        }
        this.registers[locus] += offset
        if (this.registers[locus] > this.max)
            this.max = this.registers[locus]
    }

    step () {
        console.log(this.registers,  this.location)
        var i = this.instructions[this.location];
        var c = i.condition;
        if (c.op(this.get(c.register), c.value)) {
            this.inc(i.register, i.offset);
        }
        this.location += 1
    }

}

function main1 (input) {
    var max = null;
    for (var register in machine.registers) {
        var value = machine.registers[register]
        if (max === null || value > max)
            max = value;
    }
    return max;
}

function main2 (input) {
    return machine.max;
}

fs.readFile('input.txt', 'utf8', (e, c) => {
    machine = new Machine(c.trim());
    while(machine.location < machine.instructions.length)
        machine.step();
    console.log(main1());
    console.log(main2());
})
