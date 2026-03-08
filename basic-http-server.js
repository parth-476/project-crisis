const http = require("http");

const PORT = process.env.HTTP_PORT || 4000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Native HTTP module server is running.");
    return;
  }

  if (req.method === "GET" && req.url === "/api/info") {
    const payload = {
      topic: "Node.js HTTP module endpoint demo",
      evaluation: "Backend first evaluation",
      time: new Date().toISOString()
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found in native HTTP server" }));
});

server.listen(PORT, () => {
  console.log(`Native HTTP server running at http://localhost:${PORT}`);
});
