//server.js
import express from "express";


const app = express();

const HOST = "localhost";
const PORT = 8020;

app.use(express.static('public'));
app.get('/data', (req, res) => {
    console.log("Received request for /data");
    const htmlContent = `<p>This content was loaded from the server via HTMX using GET Method!</p><p><a href="/">Back to Dashboard</a></p>`;
    res.send(htmlContent);
});
 

app.post('/contacts', (req, res) => {
    // Process form submission, save data
    const newContactName = req.body.name;
    // Return HTML for the new contact list item
    res.send(`<li>${newContactName}</li>`);
});

  // Start the server
  app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
  });