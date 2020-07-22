// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// Set up the file directory
const public = path.resolve(__dirname, "public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// API Route to return the notes in json format
app.get("/api/notes", function(request, response) {
    let data = JSON.parse(fs.readFileSync("./db/db.json"));
    return response.json(data);
});


// Basic route that sends the user first to the AJAX Page

app.get("*", function(request, response) {
    response.sendFile(path.join(public, "index.html"));
});

// Route to notes page  
app.get("/notes", function(request, response) {
    response.sendFile(path.join(public, "notes.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});