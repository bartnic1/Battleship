// debugger; //<--allows you to stop execution in browser at this point, and look at event

let playerBoardSelectable = false;
let shipSelectedData = [[false, false, false, false, false], [0, 0, 0, 0, 0]];
// 0: Carrier(5), 1:Battleship(4), 2:Cruiser(3), 3:Submarine(3), 4:Destroyer(2)
let shipLengths = [["Carrier", 5], ["Battleship", 4], ["Cruiser", 3], ["Submarine", 3], ["Destroyer", 2]];
let shipNumber;
let tempShipLocArray = [];
let shipLocObject = {};

function sum(array){
  let sum = 0;
  for(let val of array){
    sum += val;
  }
  return sum;
}

function initSelector(shipNumber, shipID){
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
    $(shipID).css("opacity", "0.7");
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

function resetBoard(){

}

$(document).ready(function(){

  $('.board1').on('click', function(event){
    let targetID = event.target.id;
    if(playerBoardSelectable){
      $(`#${targetID}`).css("background-color", "red");
      tempShipLocArray.push(targetID);
    }
  });

  // TO DO : add message to notifications when user clicks on specific ship.
  // Below, when enter is pressed, check whether everything is okay, then log correct message
  // make sure to define maxDiff and resetboard!

  // Once data is successfully entered, you have to make it impossible to select the same ship again.
  // Also, you need to make sure users don't overlap ships (probably want to keep the red stuff).

  // 0: Carrier(5), 1:Battleship(4), 2:Cruiser(3), 3:Submarine(3), 4:Destroyer(2)
  $('#ships-box-player').on('click', function(event){
    shipNumber = Number(event.target.id);
    let shipID = `#${shipNumber}`;

    //Add message to notifications panel
    let message;
    let shipNotifier = $('.ship-selection');
    initSelector(shipNumber, shipID);
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
    if(playerBoardSelectable && event.originalEvent.code === 'Enter'){
      if(tempShipLocArray.length === shipLengths[shipNumber][1] && shapeValid(tempShipLocArray, shipLengths[shipNumber][1])){
        shipLocObject[shipLengths[shipNumber][0]] = tempShipLocArray;
        console.log("It works!");
      }else{
        resetBoard();
      }
    }
  });
});
