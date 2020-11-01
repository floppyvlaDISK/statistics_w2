const generateIntervalsData = require("./generateIntervalsData");
const countIntervalsHits = require("./countIntervalsHits");
const calculateXiNiData = require("./calculateXiNiData");
const data = require("./data.json");

const intervalsData = generateIntervalsData(data);
// console.log(intervalsData);
// console.log(countIntervalsHits(intervalsData));
// console.log(
//   calculateXiNiData(intervalsData, [11, 7, 11, 20, 7, 11, 5, 8, 11, 9], "X")
// );
// console.log(
//   calculateXiNiData(intervalsData, [1, 5, 40, 30, 13, 7, 1, 2, 0, 1], "Y")
// );
console.log(countIntervalsHits(intervalsData));
