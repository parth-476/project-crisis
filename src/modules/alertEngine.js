function buildAlert(zoneInfo) {
  const level = zoneInfo.riskLevel || "medium";

  const advisoryMap = {
    low: "Monitor situation and keep local teams informed.",
    medium: "Prepare resources and issue a local caution notice.",
    high: "Trigger district control room and pre-position rescue teams.",
    critical: "Send emergency warnings and activate rapid response protocol."
  };

  return {
    alertId: `ALT-${Date.now()}`,
    zone: zoneInfo.zone,
    riskLevel: level,
    score: zoneInfo.score,
    advisory: advisoryMap[level] || advisoryMap.medium,
    createdAt: new Date().toISOString()
  };
}

module.exports = {
  buildAlert
};
