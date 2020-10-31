const generateIntervalsData = require("./generateIntervalsData");
const countIntervalsHits = require("./countIntervalsHits");
const data = require("./data.json");

console.log(countIntervalsHits(generateIntervalsData(data)));
