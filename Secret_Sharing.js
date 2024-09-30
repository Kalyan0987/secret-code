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



// Load JSON from file
function loadJson(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Decode the y-values from their respective bases
function decodeValues(data) {
  let decodedPoints = [];
  for (let key in data) {
    if (key !== "keys") {
      const x = parseInt(key);
      const base = parseInt(data[key]["base"]);
      const y = parseInt(data[key]["value"], base);
      decodedPoints.push([x, y]);
    }
  }
  return decodedPoints;
}

// Find Lagrange polynomial and the constant term (C)
function lagrangeInterpolation(points, k) {
  let c = 0;
  for (let i = 0; i < k; i++) {
    let xi = points[i][0];
    let yi = points[i][1];
    let li = 1;

    for (let j = 0; j < k; j++) {
      if (j !== i) {
        li *= (0 - points[j][0]) / (xi - points[j][0]);
      }
    }
    c += yi * li;
  }
  return Math.round(c); // Secret (constant term)
}


// Find wrong points by checking which points don't lie on the interpolated curve
function findWrongPoints(points, k) {
  let correctPoints = points.slice(0, k);
  const c = lagrangeInterpolation(correctPoints, k);

  let wrongPoints = [];
  for (let i = k; i < points.length; i++) {
    const [x, y] = points[i];
    let interpolatedY = lagrangeInterpolation(correctPoints, k);

    if (interpolatedY !== y) {
      wrongPoints.push([x, y]);
    }
  }
  return wrongPoints;
}

function main() {
  const testFiles = ["testcase1.json", "testcase2.json"];

  testFiles.forEach((testFile) => {
    const data = loadJson(testFile);
    const { n, k } = data.keys;

    // Decode values
    const decodedPoints = decodeValues(data);

    // Find the polynomial constant term (C)
    const c = lagrangeInterpolation(decodedPoints, k);
    console.log(`Secret (constant term) for ${testFile}: ${c}`);

    // If this is the second test case, find wrong points
    if (testFile === "testcase2.json") {
      const wrongPoints = findWrongPoints(decodedPoints, k);
      console.log(`Wrong points for ${testFile}:`, wrongPoints);
    }
  });
}

main();
