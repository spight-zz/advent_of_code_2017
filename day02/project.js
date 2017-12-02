var fs = require('fs');

function main1 (input) {
    var total = 0, low, high, line, value;
    for (line of input.split("\n")) {
        high = -1;  // Lower than lowest possible value
        low = null;  // No reasonable highest possible value
        for (value of line.split("\t")) {
            value = parseInt(value);
            if (value > high)
                high = value
            if (low === null || value < low)
                low = value
        }
        total += high - low
    }
    return total;
}

function main2 (input) {
    var total = 0, line, values, i, j;
    for (line of input.split("\n")) {
        // Convert to integers and sort numerically
        values = line.split("\t").map(x => parseInt(x)).sort((x, y) => y - x);

        // Loop over values, highest to lowest, and break at first
        // divisible pair
        outer_loop:
        for (i = 0; i < values.length; i += 1)
            for (j = i + 1; j < values.length; j += 1)
                if (values[i] % values[j] == 0)
                    break outer_loop
        total += values[i] / values[j];
    }
    return total;
}

fs.readFile('input.txt', 'utf8', function (errors, contents) {
    console.log(main1(contents.trim()));
    console.log(main2(contents.trim()));
})
