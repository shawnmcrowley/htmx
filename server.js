//server.js
import express from "express";

const app = express();

const HOST = "localhost";
const PORT = 8020;

app.use(express.static("public"));

// Get Route for Main Dashboard Page

app.get("/data", (req, res) => {
  console.log("Received request for /data");
  const htmlContent = `<details><p><a href="/">Back to Dashboard</a><summary>This content was loaded from the server via HTMX using GET Method!</summary></details>`;
  res.send(htmlContent);
});

// Post Route for Contact Form Submission

app.get("/dialog", (req, res) => {
  console.log("Received request for /dialog");
  const htmlContent = `<dialog id="demo">
  <h2>🎉 This is a Native Modal</h2>
  <p>No JavaScript library needed.</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('demo').showModal()">
  Open Modal
</button>`;
  // Return Dialog
  res.send(htmlContent);
});

/**
 * Health check endpoint `/health`
 *
 * @path {HOST}:{PORT}/health
 * @return status {200:OK}
 * @return uptime : how long has been server up & running
 * @return timestamp : Time of response from server
 */
app.get("/health", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  res.send(JSON.stringify(healthcheck));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
