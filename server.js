//server.js
import express from "express";


const app = express();

const HOST = "localhost";
const PORT = 8020;

app.use(express.static('public'));

// Get Route for Main Dashboard Page

app.get('/data', (req, res) => {
    console.log("Received request for /data");
    const htmlContent = `<p>This content was loaded from the server via HTMX using GET Method!</p><p><a href="/">Back to Dashboard</a></p>`;
    res.send(htmlContent);
});
 
// Post Route for Contact Form Submission

app.post('/contacts', (req, res) => {
    // Process form submission, save data
    const newContactName = req.body.name;
    // Return HTML for the new contact list item
    res.send(`<li>${newContactName}</li>`);
});

/**
   * Health check endpoint `/health`
   * 
   * @path {HOST}:{PORT}/health
   * @return status {200:OK}
   * @return uptime : how long has been server up & running
   * @return timestamp : Time of response from server  
   */
  app.get('/health', (req, res) =>{
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now()}
      res.send(JSON.stringify(healthcheck));
  }); 


  // Start the server
  app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
  });