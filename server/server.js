//List of things to do:

// 2. Stretch: Get images of ships, evenly divided, loaded onto the board when playing;
// will also need to work out how they will look when damaged - it seems to override background-color.

// New idea: After placement is done, rearrange (sort) your array from lowest to highest.
// Set the appropriate background-image, using the sorted order.
// If going vertically, need to use new set of rotated images.

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
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));

//Server Data

const gridSettings = {
  gridBoundary: {letters: 'ABCDEFGHIJ'}
};
//Time in milliseconds
let serverResponseTime = 3000;

//Shots taken by computer
let shotsTaken = [];
let compShips;
let compShipsHit;
//Keeps track of hits server ships have taken
let serverMaxHits = 17;
let serverShipsHit = 0;

//Imported server functions
const serverFunctions = require("./serverFunctions.js");

app.get("/battle", (req, res) => {
  res.render("battle", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
});

//This generates a board of ships for the computer, as an object:
//{"Carrier": [[1,2],[1,3],[1,4],[1,5],[1,6]], "Battleship": ...}
app.post("/battle", (req, res) => {
  compShips = serverFunctions.generateShips(req.body);
  compShipsHit = serverFunctions.shipsHitObject(compShips);
  res.send(compShips);
});

//This logs a shot taken by the user, increments a server-side counter, and tells the user
//if it was a hit or a miss.
app.put("/battle/placeShot", (req, res) => {
  let placedShot = [Number(req.body.target[0]), Number(req.body.target[1])];
  let response = [0, 0, 0];
  for(let ship in compShips){
    for(let coord of compShips[ship]){
      if(placedShot[0] === coord[0] && placedShot[1] === coord[1]){
        serverShipsHit++;
        compShipsHit[ship]--;
        if(compShipsHit[ship] <= 0){
          response[1] = ship;
        }else{
          response[1] = "none";
        }
        response[0] = "HIT";
        if(serverShipsHit >= serverMaxHits){
          response[2] = "Player 1 Wins!";
          return res.send(response);
        }else{
          response[2] = "none";
          return res.send(response);
        }
      }
    }
  }
  response[0] = "MISS";
  response[1] = "none";
  response[2] = "none";
  return res.send(response);
});

app.get("/battle/getShot", (req, res) => {
  let newShot = serverFunctions.randomShot(shotsTaken);
  shotsTaken.push(newShot);
  //Simulate server "thinking"
  setTimeout(function(){ return res.send(newShot); }, serverResponseTime);
});

//Logs to console if server is running
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});