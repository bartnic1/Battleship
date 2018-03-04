// debugger; //<--allows you to stop execution in browser at this point, and look at event

let playerBoardSelectable = false;
let shipSelectedData = [[false, false, false, false, false], [0, 0, 0, 0, 0]];
// 0: Carrier(5), 1:Battleship(4), 2:Cruiser(3), 3:Submarine(3), 4:Destroyer(2)
let shipIDLength = [["Carrier", 5], ["Battleship", 4], ["Cruiser", 3], ["Submarine", 3], ["Destroyer", 2]];
let shipNumber;
// Used in setting up the board
let tempShipLocArray = [];

// Holds final ship locations
let finalShipLocations = {};

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
  let allShipCoordValues = Object.values(finalShipLocations);
  if(allShipCoordValues.length === 5){
    for(coordinateArray of allShipCoordValues){
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

//Multiple css properties added for cross-browser support
function setGlowFirst(player1, player2){
  player1.css("-webkit-animation", "neon3 1.5s ease-in-out infinite alternate");
  player1.css("-moz-animation", "neon3 1.5s ease-in-out infinite alternate");
  player1.css("animation", "neon3 1.5s ease-in-out infinite alternate");
  player2.css("-webkit-animation", "0");
  player2.css("-moz-animation", "0");
  player2.css("animation", "0");
}

$(document).ready(function(){

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
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
        break;
      case 1:
        message = "Battleship: 4 linear spaces";
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
        break;
      case 2:
        message = "Cruiser: 3 linear spaces";
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
        break;
      case 3:
        message = "Submarine: 3 linear spaces";
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
        break;
      case 4:
        message = "Destroyer: 2 linear spaces";
        shipNotifier.empty();
        $(`<li>${message}</li>`).appendTo(shipNotifier);
        break;
      default:
        break;
      }
    }else{
      shipNotifier.empty();
    }

  });

  $('body').on('keypress', function(event){
    if(playerBoardSelectable && event.originalEvent.code === 'Space'){
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
      $(`<li>All ships placed. Press new game above to begin!</li>`).appendTo($('.ships-placed'));
      $('.new-game').css("visibility", "visible");
    }
  });

  //TO DO NEW:

  //Disallow player from selecting from their ship box
  //Allow player to shoot enemy, and enemy to shoot player. The first person who hits

  $('.new-game').on('click', function(event){
    //Reset notifications and hide new-game button
    $('.ships-placed').empty();
    $('.intro').empty();
    $('.new-game').css("visibility", "hidden");
    //Send ship data to server for reference (i.e. how many ships to generate, and their lengths)
    $.post("/battle", finalShipLocations).done(function(res){
      for (let row of Object.values(res)){
        for (let coordinate of row){
          $(`#o${coordinate[0]}${coordinate[1]}`).css("background-color", "red");
        }
      }
      //Show the roll die button to see whether the user rolls a higher number than the computer
      $('.roll-die').css("visibility", "visible");
      $(`<li>Press the roll dodecahedron button; the player with the highest number goes first!</li>`).appendTo('.intro');
    });
  });

  $('.roll-die').on('click', function(event){
    let userRoll = 0;
    let opponentRoll = 0;
    while(userRoll === opponentRoll){
      userRoll = getRandomInt(12) + 1;
      opponentRoll = getRandomInt(12) + 1;
    }
    $(`<li>You rolled: ${userRoll}</li>`).appendTo($('.intro'));
    $(`<li>Your opponent rolled: ${opponentRoll}</li>`).appendTo($('.intro'));
    if(userRoll > opponentRoll){
      $('<li>Nice roll! You go first.</li>').appendTo($('.intro'));
      setGlowFirst($('#player'), $('#opponent'));
    }else{
      $('<li>Nice try! You go second.</li>').appendTo($('.intro'));
      setGlowFirst($('#opponent'), $('#player'));
    }
  });
});
