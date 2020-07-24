/*jshint esversion: 6 */

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

// Function to update the db.json file
function updateNotes(notesArray) {
    notesArray = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json", notesArray);
}

// Routes
// =============================================================

// API Route to return the notes in json format
app.get("/api/notes", function(request, response) {
    notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
    return response.json(notesArray);
});

// API Route to save latest notes array
app.post("/api/notes", function(request, response) {
    notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
    let newNote = request.body;
    //Add an id to the note
    if (typeof notesArray !== 'undefined' && notesArray.length > 0) {
        let lastNoteId = notesArray[notesArray.length - 1].id;
        newNote.id = lastNoteId + 1;
    } else {
        newNote.id = 1;
    }
    notesArray.push(newNote);
    updateNotes(notesArray);
    response.end();
});

// API Route to delete a note
app.delete("/api/notes/:id", function(request, response) {
    notesArray = JSON.parse(fs.readFileSync("./db/db.json"));
    let noteToDeleteId = request.params.id;
    console.log(noteToDeleteId);
    for (var i = 0; i < notesArray.length; i++) {
        if (noteToDeleteId == notesArray[i].id) {
            notesArray.splice(i, 1);
        }
    }
    updateNotes(notesArray);
    response.end();
});

// Basic route that sends the user first to the AJAX Page
app.get("/", function(request, response) {
    response.sendFile(path.join(public, "index.html"));
});

// Route to notes page  
app.get("/notes", function(request, response) {
    response.sendFile(path.join(public, "notes.html"));
});

// Route to home page if user does not enter an endpoint
app.get("*", function(request, response) {
    response.redirect('/');
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});