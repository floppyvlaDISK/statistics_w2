const formatNumber = require("./formatNumber");

function calculateCorrelationCoefficient(XiNiData, YiNiData, XY) {
  return formatNumber(
    (XY - XiNiData["Xi Medium"] * YiNiData["Yi Medium"]) /
      (XiNiData["S(Xi)"] * YiNiData["S(Yi)"])
  );
}

module.exports = calculateCorrelationCoefficient;
