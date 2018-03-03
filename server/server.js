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

const gridSettings = {
  gridBoundary: {letters: 'ABCDEFGHIJ'}
};

app.get("/battle", (req, res) => {
  res.render("battle", gridSettings);
});

app.get("/", (req, res) => {
  res.render("intro");
});

//NEW TO DO!

//Need to create a local function that auto-generates a series of ships, and stores them locally on
//the server (for now, no databases - but will want to use one later to keep a log of wins/losses)

//Using the "done" call-back of the post request made after pressing "new game", need to create
//new boolean that disallows players from clicking on their ship box.

//The same callback will create an event listener on the enemy board

function generateShips(ships){
  //Creates a random int from 0 up to but not including max
  function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
  }
  function generateLine(direction, coord, length){
    let points = [coord];
    switch(direction){
    case "north":
      for(let i = 1; i < length; i++){
        points.push([coord[0], coord[1] - i]);
      }
      break;
    case "east":
      for(let i = 1; i < length; i++){
        points.push([coord[0] + i, coord[1]]);
      }
      break;
    case "south":
      for(let i = 1; i < length; i++){
        points.push([coord[0], coord[1] + i]);
      }
      break;
    case "west":
      for(let i = 1; i < length; i++){
        points.push([coord[0] - i, coord[1]]);
      }
      break;
    default:
      break;
    }
    return points;
  }

  function isColliding(points, allShipLocs){
    for(newPoint of points){
      for(existingPoint of allShipLocs){
        if(newPoint[0] === existingPoint[0] && newPoint[1] === existingPoint[1]){
          return true;
        }
      }
    }
    return false;
  }

  let allShipLocs = [];
  let computerShips = {};
  let points;
  for(ship in ships){
    badCoordinate = true;
    let length = ships[ship].length;
    while(badCoordinate){
      let x = getRandomInt(10);
      let y = getRandomInt(10);
      let coord = [x, y];
      //Check all four cardinal directions; if any work, check for intersections with other ships
      if(y - length + 1 >= 0){
        points = generateLine("north", coord, length);
        if(!isColliding(points, allShipLocs)){
          break;
        }
      }if(x + length - 1 <= 9){
        points = generateLine("east", coord, length);
        if(!isColliding(points, allShipLocs)){
          break;
        }
      }if(y + length - 1 <= 9){
        points = generateLine("south", coord, length);
        if(!isColliding(points, allShipLocs)){
          break;
        }
      }if(x - length + 1 >= 0){
        points = generateLine("south", coord, length);
        if(!isColliding(points, allShipLocs)){
          break;
        }
      }
    }
    for (coordinate of points){
      allShipLocs.push(coordinate);
    }
    computerShips[ship] = points;
  }
  return computerShips;
}

app.post("/battle", (req, res) => {
  let compShips = generateShips(req.body);
  console.log(compShips);
  res.send(compShips);
});

//Logs to console if server is running
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});