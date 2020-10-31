function countIntervalsHits(intervalsData) {
  const result = {};
  for (let i = 0; i < intervalsData.intervalsX.length; i++) {
    for (let j = 0; j < intervalsData.intervalsY.length; j++) {
      const xInterval = intervalsData.intervalsX[i];
      const yInterval = intervalsData.intervalsY[j];
      const isLastX = intervalsData.intervalsX.length - 1 === i;
      const isLastY = intervalsData.intervalsY.length - 1 === j;
      const key = `${intervalToString(xInterval)}-${intervalToString(
        yInterval
      )}`;
      result[key] = 0;
      for (let k = 0; k < intervalsData.rawCoordinates.length; k++) {
        if (
          withinInterval(
            xInterval,
            intervalsData.rawCoordinates[k][0],
            isLastX
          ) &&
          withinInterval(yInterval, intervalsData.rawCoordinates[k][1], isLastY)
        ) {
          result[key]++;
        }
      }
    }
  }
  return result;
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

module.exports = countIntervalsHits;
