const http = require("http");

const target = process.env.REDIRECT_TARGET;

if (!target) {
  console.error("REDIRECT_TARGET environment variable is not set.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const location = target.replace(/\/$/, "") + req.url;

  const log = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.url,
    redirect_to: location,
    user_agent: req.headers["user-agent"],
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress
  };

  console.log(JSON.stringify(log));

  // 302 Temporary Redirect
  const status = parseInt(process.env.REDIRECT_STATUS || "302", 10);
  res.writeHead(status, { Location: location });
  res.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Redirect server running on port ${port}`);
});