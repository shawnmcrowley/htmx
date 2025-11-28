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


// Add Get Method Returning JSON and Using HTMX Templates

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
  // If request came from HTMX (HX-Request header), return a small HTML fragment
  // so the panel displays a readable card instead of raw JSON.
  if (req.headers["hx-request"]) {
    const uptimeSeconds = Math.round(healthcheck.uptime);
    const timeString = new Date(healthcheck.timestamp).toLocaleString();
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif">
        <h3 style="margin:0 0 8px 0;color:#222">Service Health</h3>
        <ul style="margin:0;padding-left:18px;color:#333">
          <li><strong>Status:</strong> ${healthcheck.message}</li>
          <li><strong>Uptime:</strong> ${uptimeSeconds} s</li>
          <li><strong>Checked:</strong> ${timeString}</li>
        </ul>
      </div>
    `;
    res.send(html);
  } else {
    res.json(healthcheck);
  }
});

// Server-side templates endpoint: fetch API and render as HTML
app.get("/templates", async (req, res) => {
  try {
    const apiUrl = "https://api.spaceflightnewsapi.net/v4/blogs/";
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Build HTML from the API response
    let html = `<h1>JSON Templates</h1>
<p>HTMX JSON API Test</p>
<p><strong>Found ${data.count} articles</strong></p>`;

    if (data.results && data.results.length > 0) {
      data.results.slice(0, 5).forEach((blog) => {
        const published = new Date(blog.published_at).toLocaleDateString();
        html += `
<div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #ddd;">
  <h2 style="margin: 0 0 8px 0;">
    <a href="${blog.url}" target="_blank" style="color: #2563eb; text-decoration: none;">
      ${blog.title}
    </a>
  </h2>
  <h4 style="margin: 0 0 8px 0; color: #666; font-size: 0.9rem;">
    ${blog.news_site} • ${published}
  </h4>
  <p style="margin: 0; color: #555; line-height: 1.5;">${blog.summary}</p>
</div>`;
      });
    } else {
      html += `<p>No articles found.</p>`;
    }

    res.send(html);
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.send(
      `<div style="color: red;"><p>Error loading templates:</p><pre>${err.message}</pre></div>`
    );
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
