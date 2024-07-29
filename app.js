const fs = require('fs');
const calculateCommission = require('./src/calculateCommission');

const inputFile = 'input.json';     // JSON file with processed transactions

// Reading and parsing JSON file
const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));       // array of objects

// Calculation of commission and output of the result
(async () => {
    for (const [index] of input.entries()) {
        console.log((await calculateCommission(input, index)).toFixed(2));
    };
})();