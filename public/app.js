async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function toPrettyJson(data) {
  return JSON.stringify(data, null, 2);
}

async function loadReports() {
  const target = document.getElementById("reportTableWrap");
  const data = await requestJson("/api/disasters");

  if (!data.reports.length) {
    target.innerHTML = "<p>No reports available.</p>";
    return;
  }

  const rows = data.reports.map((report) => `
    <tr>
      <td>${report.id}</td>
      <td>${report.zone}</td>
      <td>${report.severity}</td>
      <td>${report.issueType}</td>
      <td>${report.population}</td>
    </tr>
  `).join("");

  target.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Zone</th>
          <th>Severity</th>
          <th>Issue</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function loadRiskPrediction() {
  const list = document.getElementById("riskList");
  const data = await requestJson("/api/risk-zones?rainfall=45&windSpeed=28&temperature=31");

  list.innerHTML = "";

  data.prediction.topZones.forEach((zone) => {
    const li = document.createElement("li");
    li.textContent = `${zone.zone} -> score ${zone.score} (${zone.riskLevel})`;
    list.appendChild(li);
  });
}

async function generateAlert() {
  const output = document.getElementById("alertOutput");
  const alert = await requestJson("/api/alerts/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });

  output.textContent = toPrettyJson(alert);
}

async function loadResourcePlan() {
  const output = document.getElementById("resourceOutput");
  const data = await requestJson("/api/resources/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });

  output.textContent = toPrettyJson(data);
}

async function runSimulation(scenario) {
  const output = document.getElementById("simulationOutput");
  const data = await requestJson("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario, zones: ["Coastal-West", "Hill-North"] })
  });

  output.textContent = toPrettyJson(data);
}

function bindEvents() {
  const form = document.getElementById("reportForm");
  const reportStatus = document.getElementById("reportStatus");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    reportStatus.classList.remove("error");
    reportStatus.textContent = "Submitting...";

    try {
      await requestJson("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      form.reset();
      reportStatus.textContent = "Report submitted successfully";
      await loadReports();
    } catch (error) {
      reportStatus.classList.add("error");
      reportStatus.textContent = error.message;
    }
  });

  document.getElementById("loadRiskBtn").addEventListener("click", () => loadRiskPrediction());
  document.getElementById("alertBtn").addEventListener("click", () => generateAlert());
  document.getElementById("resourceBtn").addEventListener("click", () => loadResourcePlan());
  document.getElementById("simulateFlood").addEventListener("click", () => runSimulation("flood-drill"));
  document.getElementById("simulateHeat").addEventListener("click", () => runSimulation("heatwave-drill"));
  document.getElementById("refreshReports").addEventListener("click", () => loadReports());
}

async function init() {
  bindEvents();
  await loadReports();
  await loadRiskPrediction();
}

init().catch((error) => {
  console.error(error);
});
