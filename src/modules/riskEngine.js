const severityWeights = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4
};

function calculateRiskScore(report, weather) {
  const severityPart = (severityWeights[report.severity] || 1) * 18;
  const populationPart = Math.min(report.population / 10000, 5) * 6;
  const weatherPart =
    Math.min(weather.rainfall / 10, 5) +
    Math.min(weather.windSpeed / 10, 4) +
    Math.max((weather.temperature - 25) / 5, 0);

  return Number((severityPart + populationPart + weatherPart).toFixed(2));
}

function levelFromScore(score) {
  if (score >= 70) return "critical";
  if (score >= 50) return "high";
  if (score >= 30) return "medium";
  return "low";
}

function predictRiskZones(reports, weather) {
  const zoneMap = {};

  reports.forEach((report) => {
    const score = calculateRiskScore(report, weather);
    if (!zoneMap[report.zone]) {
      zoneMap[report.zone] = [];
    }
    zoneMap[report.zone].push(score);
  });

  const topZones = Object.keys(zoneMap)
    .map((zone) => {
      const scores = zoneMap[zone];
      const avgScore = scores.reduce((sum, value) => sum + value, 0) / scores.length;

      return {
        zone,
        score: Number(avgScore.toFixed(2)),
        riskLevel: levelFromScore(avgScore)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return {
    totalZones: topZones.length,
    topZones
  };
}

function suggestResources(selectedZones) {
  return selectedZones.map((zoneEntry) => {
    const zoneName = zoneEntry.zone || zoneEntry;
    const riskLevel = zoneEntry.riskLevel || "medium";

    const recommendation = {
      zone: zoneName,
      riskLevel,
      ambulances: riskLevel === "critical" ? 6 : riskLevel === "high" ? 4 : 2,
      rescueTeams: riskLevel === "critical" ? 5 : riskLevel === "high" ? 3 : 1,
      foodKits: riskLevel === "critical" ? 800 : riskLevel === "high" ? 500 : 200
    };

    return recommendation;
  });
}

function runSimulation(scenario, zones) {
  const defaultZones = zones.length ? zones : ["Zone-A", "Zone-B"];
  const estimatedResponseMinutes = 20 + defaultZones.length * 7;

  return {
    scenario,
    zones: defaultZones,
    estimatedResponseMinutes,
    status: "simulation-ready",
    note: "Use this output to demonstrate emergency simulation mode."
  };
}

module.exports = {
  predictRiskZones,
  suggestResources,
  runSimulation
};
