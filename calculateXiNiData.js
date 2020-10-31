const formatNumber = require("./formatNumber");

const n = [11, 7, 11, 20, 7, 11, 5, 8, 11, 9];

function calculateXiNiData(intervalsData) {
  return {
    "Xi * Ni": calculateXiTimesNi(intervalsData),
    "Xi^2": calculateXiSquared(intervalsData),
    "Xi^2 * Ni": calculateXiSquaredTimesNi(intervalsData),
    "Xi * Ni Sum": calculateXiTimesNiSum(intervalsData),
    "Xi^2 * Ni Sum": calculateXiSquaredTimesNiSum(intervalsData),
    "Xi Medium": calculateXiTimesNiMedium(intervalsData),
    "Xi^2 Medium": calculateXiSquaredTimesNiMedium(intervalsData),
    "D(Xi)": calculateDXi(intervalsData),
    "S(Xi)": calculateSXi(intervalsData),
  };
}

function calculateXiTimesNi(intervalsData) {
  const result = [];
  for (let i = 0; i < intervalsData.intervalsMidPointsX.length; i++) {
    result.push(formatNumber(intervalsData.intervalsMidPointsX[i] * n[i]));
  }
  return result;
}

function calculateXiSquared(intervalsData) {
  const result = [];
  for (let i = 0; i < intervalsData.intervalsMidPointsX.length; i++) {
    result.push(
      formatNumber(Math.pow(intervalsData.intervalsMidPointsX[i], 2))
    );
  }
  return result;
}

function calculateXiSquaredTimesNi(intervalsData) {
  const result = [];
  const xiSquared = calculateXiSquared(intervalsData);
  for (let i = 0; i < xiSquared.length; i++) {
    result.push(formatNumber(xiSquared[i] * n[i]));
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
    calculateXiTimesNiSum(intervalsData) /
      intervalsData.intervalsMidPointsX.length
  );
}

function calculateXiSquaredTimesNiMedium(intervalsData) {
  return formatNumber(
    calculateXiSquaredTimesNiSum(intervalsData) /
      intervalsData.intervalsMidPointsX.length
  );
}

function calculateDXi(intervalsData) {
  return formatNumber(
    calculateXiSquaredTimesNiMedium(intervalsData) -
      Math.pow(calculateXiTimesNiMedium(intervalsData), 2)
  );
}

function calculateSXi(intervalsData) {
  return Math.sqrt(calculateDXi(intervalsData));
}

module.exports = calculateXiNiData;
