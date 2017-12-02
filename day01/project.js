var fs = require('fs');

function main(input, offset) {
    var total = 0

    // If the following character matches the current character, add to total
    for (var i = 0; i < input.length; i += 1)
        if (input[i] == input[(i + offset) % input.length ])
            total += parseInt(input[i]);
    console.log(total)
}

fs.readFile('input1.txt', 'utf8', function(err, contents) {
    main(contents.trim(), 1)
    main(contents.trim(), contents.trim().length / 2)
})
