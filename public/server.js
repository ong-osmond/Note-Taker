// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

app.get("/", function(request, response) {
    response.sendFile(path.join(__dirname, "index.html"));
});

// Route to notes page  
app.get("/notes", function(request, response) {
    response.sendFile(path.join(__dirname, "notes.html"));
});

// API Route to return the notes in json format
app.get("/api/notes", function(request, response) {
    console.log("Notes");
    let data = JSON.parse(fs.readFileSync('../db/db.json'));
    //console.log(data);
    //response.sendFile(path.join(__dirname, '/db/', 'db.json')); //displays the notes in a file format
    return response.json(data);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});