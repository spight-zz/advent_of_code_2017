var fs = require('fs');

class Stack {
    constructor () {
        this.data = [];
    }

    pop () {
        var output = this.data.shift();
        if (typeof output === 'undefined')
            return null
        return output
    }

    push (value) {
        this.data.unshift(value);
    }

    peek () {
        return this.data[0];
    }

    get height () {
        return this.data.length;
    }
}

function count_groups(input) {
    var stack = new Stack(), total = 0, garbage = 0;
    for (var i = 0; i < input.length; i += 1) {
        var chr = input[i];
        if (chr === '{')
            stack.push(chr)
        if (chr === '}') {
            total += stack.height;
            if (stack.pop() === null)
                console.log("Something went wrong at position `" + i + "`")
        }
        if (chr === '!')
            console.log("Unexpected `!` at position `" + i + "`");
        if (chr === '<') {
            i += 1
            while (input[i] != '>') {
                if (input[i] === '!')
                    i += 1
                else
                    garbage += 1
                i += 1;
            }
        }
    }
    return [total, garbage]
}

fs.readFile('example.txt', 'utf8', (e, c) => {
    console.log("Tests");
    for (var line of c.trim().split("\n")) {
        var parts = line.split(":")
        var goal = parts[0];
        var stream = parts[1];
        console.log(goal == count_groups(stream)[0], goal, stream)
    }

    fs.readFile('example2.txt', 'utf8', (e, c) => {
        for (var line of c.trim().split("\n")) {
            var parts = line.split(":")
            var goal = parts[0];
            var stream = parts[1];
            console.log(goal == count_groups(stream)[1], goal, stream)
        }

        fs.readFile('input.txt', 'utf8', (e, c) => {
            console.log("Result:", count_groups(c.trim()))
        })
    })
})
