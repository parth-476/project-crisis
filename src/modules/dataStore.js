const fs = require("fs/promises");
const path = require("path");

const storePath = path.join(__dirname, "..", "..", "data", "reports.json");

async function ensureStore() {
  try {
    await fs.access(storePath);
  } catch (error) {
    const initialData = { reports: [] };
    await fs.writeFile(storePath, JSON.stringify(initialData, null, 2), "utf-8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(storePath, "utf-8");
  return JSON.parse(raw);
}

async function writeStore(data) {
  await fs.writeFile(storePath, JSON.stringify(data, null, 2), "utf-8");
}

async function getReports() {
  const store = await readStore();
  return [...store.reports].sort((a, b) => b.id - a.id);
}

async function getReportById(id) {
  const reports = await getReports();
  return reports.find((report) => report.id === id);
}

async function addReport(input) {
  const store = await readStore();

  const report = {
    id: Date.now(),
    zone: input.zone,
    severity: input.severity,
    issueType: input.issueType,
    population: Number(input.population),
    notes: input.notes || "",
    createdAt: new Date().toISOString()
  };

  store.reports.push(report);
  await writeStore(store);

  return report;
}

module.exports = {
  getReports,
  getReportById,
  addReport
};
