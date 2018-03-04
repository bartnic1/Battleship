//List of things to do:

// 1. Get rid of repeating random int function in serverfunctions

// 2. Stretch: Get images of ships, evenly divided, loaded onto the board when playing;
// will also need to work out how they will look when damaged - it seems to override background-color.

// 3. Add side-images of ships to computer or opponent's tray.

// 4. Get basic gameplay working!!!!! (priority - see gameplay event handlers)

// Cases: Its yellow, want to untarget. Its black or white: Can't target. Its blue, want to target.
// Won't need to worry about ships since you won't be able to see them (and even then background-color
// should still exist).

// Simple solution:

const express = require("express");
const app = express();
// http://localhost:8080
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
//Add ?_method=DELETE to the end of your normal path, also use POST
const methodOverride = require('method-override');
const path = require("path");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'public')));

//Server Data

const gridSettings = {
  gridBoundary: {letters: 'ABCDEFGHIJ'}
};

//Imported server functions
const serverFunctions = require("./serverFunctions.js");

app.get("/battle", (req, res) => {
  res.render("battle", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
});

app.post("/battle", (req, res) => {
  let compShips = serverFunctions.generateShips(req.body);
  res.send(compShips);
});

app.put("/battle", (req, res) => {
  let newShot = setTimeout(serverFunctions.randomShot(), 5000);
  res.send(newShot);
});

//Logs to console if server is running
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});