var fs = require('fs');

function main1 (input) {
    input = parseInt(input);
    ring_value = Math.ceil(Math.sqrt(input)) // # the edge length of the ring
    if (ring_value % 2 == 0)
      ring_value += 1

    square = ring_value * ring_value
    last_square = (ring_value - 2) * (ring_value - 2)
    offset = (square - last_square) / 4
    stage1 = ((ring_value - 1) / 2)

    // Distance from the closest corner
    dist_fc = (input - last_square) % offset
    dist_fc = Math.min(dist_fc, Math.abs(offset - dist_fc))
    stage2 = offset/2 - dist_fc;
    return stage1 + stage2
}

function main2 (input) {
    // Just do this one by hand... It isn't worth scripting :()
}


fs.readFile('input.txt', 'utf8', (e, contents) => {
  console.log(main1(contents));
  console.log(main2(contents));
})
