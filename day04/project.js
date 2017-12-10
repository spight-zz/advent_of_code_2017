var fs = require('fs');

function main1 (input) {
    var total = 0;
    for (var line of input.split("\n")) {
        var words = line.split(/\s/).sort();
        var valid = true
        for (var i = 0 ; i < words.length ; i += 1) {
            if (i < words.length - 1 && words[i] == words[i+1]) {
                valid = false;
                break;
            }
        }
        if (valid)
            total += 1
    }
    return total;
}

function main2 (input) {
    var total = 0;
    for (var line of input.split("\n")) {
        var words = line.split(/\s/);
        console.log(words)
        var new_words = []
        for (var word of words) {
            console.log(word, word.split("").sort().join(""))
            new_words.push(word.split("").sort().join(""))
        }
        words = new_words.sort();
        var valid = true
        for (var i = 0 ; i < words.length ; i += 1) {
            if (i < words.length - 1 && words[i] == words[i+1]) {
                valid = false;
                break;
            }
        }
        if (valid)
            total += 1
    }
    return total;
}

fs.readFile('input.txt', 'utf8', (e, content) => {
    console.log(main1(content.trim()));
    console.log(main2(content.trim()));
})
