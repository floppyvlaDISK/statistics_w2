const formatNumber = require("./formatNumber");

function countIntervalsHits(intervalsData) {
  const hitsForXY = {};
  const hits = {};
  for (let i = 0; i < intervalsData.intervalsX.length; i++) {
    hitsForXY[i] = {};
    for (let j = 0; j < intervalsData.intervalsY.length; j++) {
      const xInterval = intervalsData.intervalsX[i];
      const yInterval = intervalsData.intervalsY[j];
      const isLastX = intervalsData.intervalsX.length - 1 === i;
      const isLastY = intervalsData.intervalsY.length - 1 === j;
      const key = `${intervalToString(xInterval)}-${intervalToString(
        yInterval
      )}`;
      hits[key] = 0;
      hitsForXY[i][j] = 0;
      for (let k = 0; k < intervalsData.rawCoordinates.length; k++) {
        if (
          withinInterval(
            xInterval,
            intervalsData.rawCoordinates[k][0],
            isLastX
          ) &&
          withinInterval(yInterval, intervalsData.rawCoordinates[k][1], isLastY)
        ) {
          hits[key]++;
          hitsForXY[i][j]++;
        }
      }
    }
  }
  return {
    hits,
    XY: calculateXY(intervalsData, hitsForXY),
  };
}

function withinInterval(interval, coordinate, isInclusive) {
  const left = interval[0] <= coordinate;
  let right;
  if (isInclusive) {
    right = coordinate <= interval[1];
  } else {
    right = coordinate < interval[1];
  }
  return left && right;
}

function intervalToString(interval) {
  return `[${interval[0]}; ${interval[1]})`;
}

function calculateXY(intervalsData, hitsForXY) {
  const result = {};
  for (let i = 0; i < intervalsData.intervalsMidPointsX.length; i++) {
    result[i] = {};
    for (let j = 0; j < intervalsData.intervalsMidPointsY.length; j++) {
      if (hitsForXY[i][j]) {
        result[i][
          `${intervalsData.intervalsMidPointsX[i]} - ${intervalsData.intervalsMidPointsY[j]}`
        ] = formatNumber(
          intervalsData.intervalsMidPointsX[i] *
            intervalsData.intervalsMidPointsY[j] *
            hitsForXY[i][j]
        );
      }
    }
  }
  return result;
}

module.exports = countIntervalsHits;
