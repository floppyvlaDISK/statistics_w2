const formatNumber = require("./formatNumber");

function calculateXiNiData(intervalsData, nValues, varName = "X") {
  const intervalsDataEnriched = { ...intervalsData, nValues, varName };
  return {
    [`${varName}i * Ni`]: calculateXiTimesNi(intervalsDataEnriched),
    [`${varName}i^2`]: calculateXiSquared(intervalsDataEnriched),
    [`${varName}i^2 * Ni`]: calculateXiSquaredTimesNi(intervalsDataEnriched),
    [`${varName}i * Ni Sum`]: calculateXiTimesNiSum(intervalsDataEnriched),
    [`${varName}i^2 * Ni Sum`]: calculateXiSquaredTimesNiSum(
      intervalsDataEnriched
    ),
    [`${varName}i Medium`]: calculateXiTimesNiMedium(intervalsDataEnriched),
    [`${varName}i^2 Medium`]: calculateXiSquaredTimesNiMedium(
      intervalsDataEnriched
    ),
    [`D(${varName}i)`]: calculateDXi(intervalsDataEnriched),
    [`S(${varName}i)`]: calculateSXi(intervalsDataEnriched),
  };
}

function calculateXiTimesNi(intervalsData) {
  const result = [];
  for (
    let i = 0;
    i < intervalsData[`intervalsMidPoints${intervalsData.varName}`].length;
    i++
  ) {
    result.push(
      formatNumber(intervalsData[`intervalsMidPoints${intervalsData.varName}`][i] * intervalsData.nValues[i])
    );
  }
  return result;
}

function calculateXiSquared(intervalsData) {
  const result = [];
  for (let i = 0; i < intervalsData[`intervalsMidPoints${intervalsData.varName}`].length; i++) {
    result.push(
      formatNumber(Math.pow(intervalsData[`intervalsMidPoints${intervalsData.varName}`][i], 2))
    );
  }
  return result;
}

function calculateXiSquaredTimesNi(intervalsData) {
  const result = [];
  const xiSquared = calculateXiSquared(intervalsData);
  for (let i = 0; i < xiSquared.length; i++) {
    result.push(formatNumber(xiSquared[i] * intervalsData.nValues[i]));
  }
  return result;
}

function calculateXiTimesNiSum(intervalsData) {
  return calculateXiTimesNi(intervalsData).reduce(
    (result, item) => result + item,
    0
  );
}

function calculateXiSquaredTimesNiSum(intervalsData) {
  return calculateXiSquaredTimesNi(intervalsData).reduce(
    (result, item) => result + item,
    0
  );
}

function calculateXiTimesNiMedium(intervalsData) {
  return formatNumber(
    calculateXiTimesNiSum(intervalsData) / intervalsData.rawCoordinates.length
  );
}

function calculateXiSquaredTimesNiMedium(intervalsData) {
  return formatNumber(
    calculateXiSquaredTimesNiSum(intervalsData) /
      intervalsData.rawCoordinates.length
  );
}

function calculateDXi(intervalsData) {
  return formatNumber(
    calculateXiSquaredTimesNiMedium(intervalsData) -
      Math.pow(calculateXiTimesNiMedium(intervalsData), 2)
  );
}

function calculateSXi(intervalsData) {
  return formatNumber(Math.sqrt(calculateDXi(intervalsData)));
}

module.exports = calculateXiNiData;
