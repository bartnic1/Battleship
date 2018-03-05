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
//Define a local user database storing wins and losses
let userData = {"Alfreds Futterkiste": {wins: 35, losses: 0}};
let userList = [];
let currentUser;
//Shots taken by computer
let shotsTaken = [];
let compShips;
let compShipsHit;
//Keeps track of hits server ships have taken
let serverMaxHits = 17;
let serverShipsHit = 0;
//Time in milliseconds
let serverResponseTime = 1500;

const gridSettings = {
  gridBoundary: {letters: 'ABCDEFGHIJ'}
};
const leaderVals = {
  userInfo: []
};


//Imported server functions, used in various paths below.
const serverFunctions = require("./serverFunctions.js");

//Renders the basic intro page.
app.get("/", (req, res) => {
  res.render("intro");
});

// { john: { wins: 0, losses: 0 }
// This adds a new user to a local database (userData)
app.put("/users", (req, res) => {
  if(userData[req.body.name] === undefined){
    userData[req.body.name] = {wins: 0, losses: 0};
    currentUser = req.body.name;
  }
  currentUser = req.body.name;
  res.send(`Welcome, ${req.body.name}!`);
});

//Upon navigating back to the home page, an ajax request determines whether a user was previously
//logged in. If so, the UI changes to reflect the appropriate state.
app.get("/users/current", (req, res) => {
  if(currentUser === undefined){
    res.send("nobody");
  }else{
    res.send(currentUser);
  }
});

//This is used to populate a leaderboard table, to show who has the most wins
app.get("/stats", (req, res) => {
  userList = [];
  for(user in userData){
    userList.push({user: user, wins: userData[user].wins, losses: userData[user].losses});
  }
  userList.sort(function(a, b){ return b.wins - a.wins; });
  leaderVals.userInfo = userList;
  res.render("leaderboard", leaderVals);
});

//Updates the stats based on a win or loss
app.put("/stats", (req, res) => {
  if(currentUser !== undefined){
    if(req.body.endState === "victory"){
      userData[currentUser].wins++;
    }else if(req.body.endState === "defeat"){
      userData[currentUser].losses++;
    }
  }
});

//Every time a new game of battleship is started, the game data is reset.
app.get("/battle", (req, res) => {
  shotsTaken = [];
  compShips = undefined;
  compShipsHit = undefined;
  serverMaxhITS = 17;
  serverShipsHit = 0;
  res.render("battle", gridSettings);
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
  let response = [];
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

//This asks the server to shoot a random spot on the player's board.
//Future modifications of this game will include a harder AI that shoots nearer to previous hits.
app.put("/battle/getShot", (req, res) => {
  let newShot = serverFunctions.takeShot(shotsTaken);
  shotsTaken.push(newShot);
  //Simulate server "thinking"
  setTimeout(function(){ return res.send(newShot); }, serverResponseTime);
});

//Logs to console if server is running
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});