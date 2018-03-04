// debugger; //<--allows you to stop execution in browser at this point, and look at event

//------------------------------------------------------//
//Global variables and booleans                         //
//------------------------------------------------------//
//Startup variables
let gameIsSettingUp = true;
let playerBoardSelectable = false;
let shipSelectedData = [[false, false, false, false, false], [0, 0, 0, 0, 0]];
// 0: Carrier(5), 1:Battleship(4), 2:Cruiser(3), 3:Submarine(3), 4:Destroyer(2)
let shipIDLength = [["Carrier", 5], ["Battleship", 4], ["Cruiser", 3], ["Submarine", 3], ["Destroyer", 2]];
let player1ShipIDs = {Carrier: "#0", Battleship: "#1", Cruiser: "#2", Submarine: "#3", Destroyer: "#4"};
let player2ShipIDs = {Carrier: "#5", Battleship: "#6", Cruiser: "#7", Submarine: "#8", Destroyer: "#9"};
let shipNumber;
// Used to store data on ship locations
let gridBoundary = "ABCDEFGHIJ";
let tempShipLocArray = [];
let finalShipLocations = {};
let playerShipsHit = {};
// Game state variables
let fireTarget;
let prevTarget;
let shotCondition = [0, 0, 0];

let playerTurn = false;
let clientShipsHit = 0;
let clientMaxHits = 17;

//------------------------------------------------------//
//Functions used in loading resources                   //
//------------------------------------------------------//


//To be implemented upon completion of core tasks
function loadShipsOnBoard(playerShips){
  // console.log("hello");
}

function loadShipsOnTray(){
  $('#0').css("background-image", 'url("../images/carrierShokaku1942.png")');
  $('#1').css("background-image", 'url("../images/battleshipKongo1944.png")');
  $('#2').css("background-image", 'url("../images/cruiserNagato1944.png")');
  $('#3').css("background-image", 'url("../images/Typhoon_class_SSBN.png")');
  $('#4').css("background-image", 'url("../images/ZumwaltClassDestroyer.png")');
  $('#5').css("background-image", 'url("../images/carrierShokaku1942.png")');
  $('#6').css("background-image", 'url("../images/battleshipKongo1944.png")');
  $('#7').css("background-image", 'url("../images/cruiserNagato1944.png")');
  $('#8').css("background-image", 'url("../images/Typhoon_class_SSBN.png")');
  $('#9').css("background-image", 'url("../images/ZumwaltClassDestroyer.png")');
}

function loadSunkShipOnTray(id){
  switch(id){
  case '#0': $('#0').css("background-image", 'url("../images/carrierOriskanySinking.png")');
    break;
  case '#1': $('#1').css("background-image", 'url("../images/battleshipUSSTowersSinking.png")');
    break;
  case '#2': $('#2').css("background-image", 'url("../images/cruiserUSSMassachusetts1921Sinking.png")');
    break;
  case '#3': $('#3').css("background-image", 'url("../images/submarineU175_sinking.png")');
    break;
  case '#4': $('#4').css("background-image", 'url("../images/destroyerWakatsuki1944Sinking.png")');
    break;
  case '#5': $('#5').css("background-image", 'url("../images/carrierOriskanySinking.png")');
    break;
  case '#6': $('#6').css("background-image", 'url("../images/battleshipUSSTowersSinking.png")');
    break;
  case '#7': $('#7').css("background-image", 'url("../images/cruiserUSSMassachusetts1921Sinking.png")');
    break;
  case '#8': $('#8').css("background-image", 'url("../images/submarineU175_sinking.png")');
    break;
  case '#9': $('#9').css("background-image", 'url("../images/destroyerWakatsuki1944Sinking.png")');
    break;
  default:
    break;
  }
}

//------------------------------------------------------//
//Functions used in setup phase (and some utility)      //
//------------------------------------------------------//


function sum(array){
  let sum = 0;
  for(let val of array){
    sum += val;
  }
  return sum;
}

function initSelector(shipNumber){
  $('.ship-error').empty();
  $('.ships-placed').empty();
  $('.new-game').css("visibility", "hidden");
  let shipID = `#${shipNumber}`;
  shipSelectedData[0][shipNumber] = !shipSelectedData[0][shipNumber];
  if(shipSelectedData[0][shipNumber]){
    shipSelectedData[1][shipNumber] = 1;
    if(sum(shipSelectedData[1]) > 1){
      shipSelectedData[1][shipNumber] = 0;
      shipSelectedData[0][shipNumber] = false;
    }
  }else{
    shipSelectedData[1][shipNumber] = 0;
  }
  if(shipSelectedData[1][shipNumber] === 1){
    $(shipID).css("opacity", "0.5");
    playerBoardSelectable = true;
  }else{
    $(shipID).css("opacity", "1.0");
    playerBoardSelectable = false;
  }
}

//locArray is passed in as an array of strings: ["11", "34", "85", ...]
function shapeValid(locArray, shipLength){
  function checkFirstShape(coordValsA, coordValsB){
    let coordValsAligned = true;
    let min = 11;
    let max = 0;
    //Check if xvals are aligned, or yvals are aligned
    for(let index = 1; index < locArray.length; index++){
      if(coordValsA[0] !== coordValsA[index]){
        coordValsAligned = false;
      }
    }
    //If so, get the max difference between yvals and xvals (respective to above)
    if(coordValsAligned){
      for(let val of coordValsB){
        if(val < min){
          min = val;
        }
        if(val > max){
          max = val;
        }
      }
      return max - min + 1;
    }
    return 0;
  }
  let xVals = [];
  let yVals = [];
  for(let coordinate of locArray){
    xVals.push(Number(coordinate[0]));
    yVals.push(Number(coordinate[1]));
  }
  let xLength = checkFirstShape(xVals, yVals);
  let yLength = checkFirstShape(yVals, xVals);
  if(xLength === shipLength || yLength === shipLength){
    return true;
  }else{
    return false;
  }
}

function resetBoard(locArray){
  for(loc of locArray){
    $(`#${loc}`).css("background-color", '#1520ed');
  }
}

function getColour(targetID){
  return $(`#${targetID}`).css("background-color");
}

function checkIfDone(){
  let allShipCoords = Object.values(finalShipLocations);
  if(allShipCoords.length === 5){
    for(coordinateArray of allShipCoords){
      if (coordinateArray.length === 0){
        return false;
      }
    }
  }else{
    return false;
  }
  return true;
}

function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

function getID(coordinate){
  return `#${coordinate[0]}${coordinate[1]}`;
}

function getCoord(player2ID){
  let sliced = player2ID.slice(1);
  let coord = [Number(sliced[0]), Number(sliced[1])];
  return coord;
}

function shipsHitObject(playerShips){
  let shipsHitObj = {};
  for (let ship in playerShips){
    shipsHitObj[ship] = playerShips[ship].length;
  }
  return shipsHitObj;
}

//------------------------------------------------------//
//Functions used in gameplay                            //
//------------------------------------------------------//

//Multiple css properties added for cross-browser support
function setGlowFirst(player1, player2){
  player1.css("-webkit-animation", "neon3 1.5s ease-in-out infinite alternate");
  player1.css("-moz-animation", "neon3 1.5s ease-in-out infinite alternate");
  player1.css("animation", "neon3 1.5s ease-in-out infinite alternate");
  player2.css("-webkit-animation", "0");
  player2.css("-moz-animation", "0");
  player2.css("animation", "0");
}

function addLog(coordinate, player, result){
  if(result[0] === "MISS" || result[0] === "HIT"){
    $(`<li>${player} shoots at ${coordinate[0]}${gridBoundary[coordinate[1]]}: ${result[0]}</li>`).prependTo('.log-body');
  }
  if(result[1] !== "none"){
    $(`<li>${player} has sunk a ${result[1]}!</li>`).prependTo('.log-body');
  }
  if(result[2] !== "none"){
    $('<li>Congratulations, you win!</li>').prependTo('.log-body');
  }
}

function enemyTurnAction(){
  function checkShot(res){
    for (let shiptype in finalShipLocations){
      for (let coordinate of finalShipLocations[shiptype]){
        if(Number(coordinate[0]) === res[0] && Number(coordinate[1]) === res[1]){
          clientShipsHit++;
          playerShipsHit[shiptype]--;
          if(playerShipsHit[shiptype] <= 0){
            shotCondition[1] = shiptype;
            loadSunkShipOnTray(player1ShipIDs[shiptype]);
          }else{
            shotCondition[1] = "none";
          }
          if(clientShipsHit >= clientMaxHits){
            shotCondition[2] = "Player 2 Wins!";
          }else{
            shotCondition[2] = "none";
          }
          $(getID(res)).css("background-color", "black");
          shotCondition[0] = "HIT";
          return;
        }
      }
    }
    shotCondition[0] = "MISS";
    shotCondition[1] = "none";
    shotCondition[2] = "none";
    $(getID(res)).css("background-color", "white");
    return;
  }
  fireTarget = undefined;
  playerTurn = false;
  setGlowFirst($('#opponent'), $('#player'));
  $.get("/battle/getShot", function(res) {
    checkShot(res);
    setGlowFirst($('#player'), $('#opponent'));
    playerTurn = true;
    addLog(res, "Player 2", shotCondition);
  });
}

function playerTurnAction(fireTarget){
  let coord = getCoord(fireTarget);
  $.post("/battle/placeShot?_method=PUT", {target: coord}).done(function(res){
    if(res[0] === "HIT"){
      $(`#${fireTarget}`).css("background-color", "black");
    }else if(res[0] === "MISS"){
      $(`#${fireTarget}`).css("background-color", "white");
    }
    if(res[1] !== "none"){
      loadSunkShipOnTray(player2ShipIDs[res[1]]);
    }
    addLog(coord, "Player 1", res);
  });
  enemyTurnAction();
}

//------------------------------------------------------//
//Document.ready event handlers                         //
//------------------------------------------------------//

$(document).ready(function(){

  loadShipsOnTray();
  //This event handler is used determine which parts of the board can be selected on setup
  $('.board1').on('click', function(event){
    let targetID = event.target.id;
    if(playerBoardSelectable){
      if(getColour(targetID) === "rgb(21, 32, 237)"){
        $(`#${targetID}`).css("background-color", "red");
        tempShipLocArray.push(targetID);
      }
    }
  });

  // 0: Carrier(5), 1:Battleship(4), 2:Cruiser(3), 3:Submarine(3), 4:Destroyer(2)
  $('#ships-box-player').on('click', function(event){
    if(gameIsSettingUp){
      shipNumber = Number(event.target.id);
      //Add message to notifications panel
      let message;
      let shipNotifier = $('.ship-selection');
      initSelector(shipNumber);
      let finalShipEntry = finalShipLocations[shipIDLength[shipNumber][0]];
      if(finalShipEntry !== undefined){
        if(finalShipEntry.length !== 0){
          resetBoard(finalShipEntry);
          finalShipLocations[shipIDLength[shipNumber][0]] = [];
        }
      }
      if(playerBoardSelectable){
        switch(shipNumber){
        case 0:
          message = "Carrier: 5 linear spaces";
          break;
        case 1:
          message = "Battleship: 4 linear spaces";
          break;
        case 2:
          message = "Cruiser: 3 linear spaces";
          break;
        case 3:
          message = "Submarine: 3 linear spaces";
          break;
        case 4:
          message = "Destroyer: 2 linear spaces";
          break;
        default:
          break;
        }
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
      }else{
        shipNotifier.empty();
      }
    }
  });

  $('body').on('keypress', function(event){
    if(gameIsSettingUp){
      if(playerBoardSelectable && event.originalEvent.code === 'Space'){
        event.preventDefault();
        //Test if ship has correct dimensions
        if(tempShipLocArray.length === shipIDLength[shipNumber][1] && shapeValid(tempShipLocArray, shipIDLength[shipNumber][1])){
          //If ship has correct length, keep track of these permanent coordinates
          finalShipLocations[shipIDLength[shipNumber][0]] = tempShipLocArray;
          initSelector(shipNumber);
          //Remove notifications
          $('.ship-selection').empty();

        //Notify player of incorrect placement, and reset board
        }else{
          let errorNode = $('.ship-error');
          errorNode.empty();
          $(`<li>Incorrect shape entered. Try again!</li>`).appendTo(errorNode);
          resetBoard(tempShipLocArray);
        }
        //Reset the temp location array for another ship
        tempShipLocArray = [];
      }
      //When all ships placed, allow new game button to be pressed
      if(checkIfDone()){
        playerShipsHit = shipsHitObject(finalShipLocations);
        $('.ships-placed').empty();
        $(`<li>All ships placed. Press new game (above) to begin!</li>`).appendTo('.ships-placed');
        $('.new-game').css("visibility", "visible");
      }
    }
  });

  // NEW GAME SETUP

  $('.new-game').on('click', function(event){
    //Reset notifications and hide new-game button
    $('.ships-placed').empty();
    $('.intro').empty();
    //Send ship data to server for reference (i.e. how many ships to generate, and their lengths)
    $.post("/battle", finalShipLocations).done(function(res){
      gameIsSettingUp = false;
      loadShipsOnBoard(finalShipLocations);
      //For testing purposes only (in reality, won't send res data over network!)
      // for (let row of Object.values(res)){
      //   for (let coordinate of row){
      //     $(`#o${coordinate[0]}${coordinate[1]}`).css("background-color", "red");
      //   }
      // }
      //Show the roll die button to see whether the user rolls a higher number than the computer
      $('.new-game').css("visibility", "hidden");
      $('.roll-die').css("visibility", "visible");
      $(`<li>Press the roll dodecahedron button; the player with the highest number goes first!</li>`).appendTo('.intro');
    });
  });

  //Determines who goes first, and indicates whose turn it is using a special css glow effect.
  $('.roll-die').on('click', function(event){
    $('.intro').empty();
    let userRoll = 0;
    let opponentRoll = 0;
    while(userRoll === opponentRoll){
      userRoll = getRandomInt(12) + 1;
      opponentRoll = getRandomInt(12) + 1;
    }
    //Results of dice rolling:
    $(`<li>You rolled: ${userRoll}</li>`).appendTo('.intro');
    $(`<li>Your opponent rolled: ${opponentRoll}</li>`).appendTo('.intro');
    if(userRoll > opponentRoll){
      $('<li>Nice roll! You go first.</li>').appendTo('.intro');
      setGlowFirst($('#player'), $('#opponent'));
      playerTurn = true;
    }else{
      $('<li>Nice try! You go second.</li>').appendTo('.intro');
      setGlowFirst($('#opponent'), $('#player'));
      //Call a function to deal with the enemy turn.
      enemyTurnAction();
    }

    //Hide or show relevant buttons
    $('.roll-die').css("visibility", "hidden");
    $('.fire').css("visibility", "visible");
    $('.quit').css("visibility", "visible");
    // After a few seconds, display the rules:
    setTimeout(function(){
      $('.intro').empty();
      $('<li>The game has now begun. To win, you must sink all your opponent\'s ships.</li>').appendTo('.intro');
      $('<li>Click an enemy tile to select/deselect it. When ready, hit the fire button.</li>').appendTo('.intro');
      $('<li>Misses are marked in white; hits with black. Good luck!</li>').appendTo('.intro');
    }, 4000);
  });

  // GAMEPLAY EVENT HANDLERS
  $('.board2').on('click', function(event){
    if(playerTurn === true){
      let target = event.target.id;
      //Deny user the ability to target areas that have been hit (black) or missed (white)
      if(getColour(target) !== "rgb(255, 255, 255)" && getColour(target) !== "rgb(0, 0, 0)"){
        //If previous target was yellow, then turn it back to the background color
        if(getColour(prevTarget) === "rgb(255, 255, 0)"){
          $(`#${prevTarget}`).css("background-color", "rgb(21, 32, 237)");
        }
        //Turns untargeted square to targeted (yellow) square
        if(getColour(target) === "rgb(21, 32, 237)"){
          $(`#${target}`).css("background-color", "rgb(255, 255, 0)");
          fireTarget = target;
          prevTarget = target;
        }
      }
    }
  });

  $('.fire').on('click', function(event){
    if(playerTurn === true && fireTarget !== undefined){
      playerTurnAction(fireTarget);
    }
  });
});
