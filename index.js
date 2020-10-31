const generateIntervalsData = require("./generateIntervalsData");
const countIntervalsHits = require("./countIntervalsHits");
const calculateXiNiData = require("./calculateXiNiData");
const data = require("./data.json");

const intervalsData = generateIntervalsData(data);
// console.log(intervalsData);
// console.log(countIntervalsHits(intervalsData));
console.log(calculateXiNiData(intervalsData));
