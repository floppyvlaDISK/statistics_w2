function generateIntervalsData(coordinatePairs) {
  const stepX = generateStep(coordinatePairs.map((pair) => pair[0]));
  const stepY = generateStep(coordinatePairs.map((pair) => pair[1]));
  const intervalsX = generateInterval(
    coordinatePairs.map((pair) => pair[0]),
    stepX
  );
  const intervalsY = generateInterval(
    coordinatePairs.map((pair) => pair[1]),
    stepY
  );
  return {
    stepX,
    stepY,
    intervalsX,
    intervalsY,
    minX: findMin(coordinatePairs.map((pair) => pair[0])),
    maxX: findMax(coordinatePairs.map((pair) => pair[0])),
    minY: findMin(coordinatePairs.map((pair) => pair[1])),
    maxY: findMax(coordinatePairs.map((pair) => pair[1])),
    rawCoordinates: [...coordinatePairs],
  };
}

function generateStep(values) {
  return formatNumber((findMax(values) - findMin(values)) / 10);
}

function generateInterval(values, step) {
  const result = [];
  const vMin = findMin(values);
  let begin = formatNumber(vMin);
  for (let i = 0; i < 10; i++) {
    const end = formatNumber(vMin + (i + 1) * step);
    result.push([begin, end]);
    begin = end;
  }
  return result;
}

function findMin(values) {
  return Math.min(...values.map((v) => Number(v)));
}

function findMax(values) {
  return Math.max(...values.map((v) => Number(v)));
}

function formatNumber(value) {
  return Number(value.toFixed(5));
}

module.exports = generateIntervalsData;
