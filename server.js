// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const { stringify } = require("querystring");

// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// Set up the file directory
const public = path.resolve(__dirname, "public");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Additional setup to allow Express to access the assets and db folders
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/db", express.static(__dirname + "/db"));

// Initialise the Notes Array
var notesArray = [];

// Routes
// =============================================================

// API Route to return the notes in json format
app.get("/api/notes", function(request, response) {
    let existingNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    notesArray = existingNotes;
    return response.json(existingNotes);
});

// API Route to save latest notes array
app.post("/api/notes", function(request, response) {
    var newNote = request.body;
    notesArray.push(newNote);
    notesArray = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json", notesArray);
    response.end();
});

// Basic route that sends the user first to the AJAX Page
app.get("/", function(request, response) {
    //console.log(request.url);
    response.sendFile(path.join(public, "index.html"));
});

// Route to notes page  
app.get("/notes", function(request, response) {
    response.sendFile(path.join(public, "notes.html"));
});

// Route to home page if user does not enter an endpoint
app.get("*", function(req, response) {
    response.sendFile(path.join(__dirname, "index.html"))
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});