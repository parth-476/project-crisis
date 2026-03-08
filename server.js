const express = require("express");
const path = require("path");
const fs = require("fs");

const { getReports, getReportById, addReport } = require("./src/modules/dataStore");
const { predictRiskZones, suggestResources, runSimulation } = require("./src/modules/riskEngine");
const { buildAlert } = require("./src/modules/alertEngine");
const { requestLogger } = require("./src/modules/logger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "CrisisBrain backend is running",
    time: new Date().toISOString()
  });
});

app.get("/api/disasters", async (req, res, next) => {
  try {
    const severityFilter = req.query.severity;
    const reports = await getReports();

    const filteredReports = severityFilter
      ? reports.filter((report) => report.severity === severityFilter)
      : reports;

    res.json({ count: filteredReports.length, reports: filteredReports });
  } catch (error) {
    next(error);
  }
});

app.get("/api/disasters/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const report = await getReportById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.json(report);
  } catch (error) {
    return next(error);
  }
});

app.get("/api/reports", async (req, res, next) => {
  try {
    const reports = await getReports();
    res.json({ count: reports.length, reports });
  } catch (error) {
    next(error);
  }
});

app.post("/api/reports", async (req, res, next) => {
  try {
    const { zone, severity, issueType, population, notes } = req.body;

    if (!zone || !severity || !issueType || !population) {
      return res.status(400).json({
        message: "zone, severity, issueType and population are required"
      });
    }

    const savedReport = await addReport({
      zone,
      severity,
      issueType,
      population: Number(population),
      notes: notes || ""
    });

    return res.status(201).json({ message: "Report submitted", report: savedReport });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/risk-zones", async (req, res, next) => {
  try {
    const reports = await getReports();

    const weather = {
      rainfall: Number(req.query.rainfall || 35),
      windSpeed: Number(req.query.windSpeed || 25),
      temperature: Number(req.query.temperature || 30)
    };

    const prediction = predictRiskZones(reports, weather);

    res.json({ weather, prediction });
  } catch (error) {
    next(error);
  }
});

app.post("/api/alerts/test", async (req, res, next) => {
  try {
    const reports = await getReports();
    const prediction = predictRiskZones(reports, {
      rainfall: 40,
      windSpeed: 30,
      temperature: 32
    });

    const selectedZone = req.body.zone || (prediction.topZones[0] && prediction.topZones[0].zone);

    if (!selectedZone) {
      return res.status(400).json({ message: "No zone available for alert" });
    }

    const zoneInfo = prediction.topZones.find((zone) => zone.zone === selectedZone) || {
      zone: selectedZone,
      riskLevel: "medium",
      score: 50
    };

    const alert = buildAlert(zoneInfo);
    return res.json(alert);
  } catch (error) {
    return next(error);
  }
});

app.post("/api/resources/suggest", async (req, res, next) => {
  try {
    const reports = await getReports();
    const prediction = predictRiskZones(reports, {
      rainfall: 42,
      windSpeed: 33,
      temperature: 29
    });

    const selectedZones = Array.isArray(req.body.selectedZones)
      ? req.body.selectedZones
      : prediction.topZones.slice(0, 3);

    const suggestions = suggestResources(selectedZones);

    return res.json({ suggestions });
  } catch (error) {
    return next(error);
  }
});

app.post("/api/simulate", async (req, res, next) => {
  try {
    const { scenario, zones } = req.body;
    const simulationResult = runSimulation(scenario || "flood-drill", zones || []);

    return res.json(simulationResult);
  } catch (error) {
    return next(error);
  }
});

app.get("/report-guide", (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "public", "report-guide.html");
    const stream = fs.createReadStream(filePath);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(500).json({
    message: "Internal server error",
    details: err.message
  });
});

app.listen(PORT, () => {
  console.log(`CrisisBrain backend running at http://localhost:${PORT}`);
});
