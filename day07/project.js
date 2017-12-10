var fs = require('fs');

function main1 (input) {
    var lines = input.split("\n").map(x => split_line(x));

    var candidates = {}

    for (var line of lines)
        candidates[line.name] = null;

    for (var line of lines)
        for (var name of line.subtowers)
            delete candidates[name];

    return Object.keys(candidates)[0]
}

function main2 (input) {
    var lines = input.split("\n").map(x => split_line(x));
    var nodes = {}

    for (var line of lines) {
        nodes[line.name] = {name: line.name, weight: line.weight, children: line.subtowers, parent: null}
    }
    for (var key in nodes) {
        var node = nodes[key];
        for (var i in node.children) {
            node.children[i] = nodes[node.children[i]]
            node.children[i].parent = node;
        }
    }
    var root_node;
    for (var key in nodes) {
        if (nodes[key].parent === null) {
            root_node = nodes[key];
            break;
        }
    }

    return balance(root_node).solution;





    // var weights = node.parent.children.map(x => x.weight).sort();
    // common_weight = weights[1]
}

function balance (node) {
    var output = {weight: node.weight, solution: null}
    var weights = []
    for (var child of node.children) {
        var info = balance(child)
        if (info.solution === null) {
            weights.push(info.weight)
        }
        else {
            return info;
        }
    }

    if (same(weights)) {
        for (var weight of weights)
            output.weight += weight;
    }
    else {
        // Found the problem node
        weights.sort()
        var common_weight = weights[1];
        var weird_weight = weights[0];
        if (weird_weight == common_weight)
            weird_weight = weights[weights.length-1]
        var offset = common_weight - weird_weight

        var bad_node;
        for (var child of node.children)
            if (balance(child).weight == weird_weight) {
                bad_node = child;
                break;
            }
        output.solution = bad_node.weight + offset;
    }
    return output
}

function same(weights) {
    // Returns true if all the values are the same, and false otherwise
    var value = weights[0];
    for (var i = 1; i < weights.length; i += 1)
        if (weights[i] !== value)
            return false
    return true
}

function split_line(line) {
    // Splits a given line into the separate parts
    // Returns an object with name, weight, and subtowers keys
    output = {name: null, weight: null, subtowers: []}
    main_parts = line.trim().split(" -> ");
    sub_parts = main_parts[0].split(" ");
    output.name = sub_parts[0];

    output.weight = parseInt(sub_parts[1].match(/(\d+)/)[0]);

    if (main_parts.length > 1)
        output.subtowers = main_parts[1].split(", ");

    return output
}

fs.readFile('input.txt', 'utf8', (e, c) => {
    // console.log(main1(c.trim()));
    console.log(main2(c.trim()));
})
