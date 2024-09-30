const fs = require('fs');

// Load JSON from a file
function loadJSON(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Decode values
function decodeValues(data) {
    const decodedPoints = [];
    for (let key in data) {
        if (key !== "keys") {
            const x = parseInt(key);
            const base = parseInt(data[key].base);
            const y = parseInt(data[key].value, base);
            decodedPoints.push([x, y]);
        }
    }
    return decodedPoints;
}

// Main function
function main() {
    // Load data from JSON file
    const data = loadJSON('testcase2.json');
    
    // Decode values
    const decodedPoints = decodeValues(data);
    console.log("Decoded Points:", decodedPoints);

    // Additional logic to find polynomial and wrong points would go here
}

main();