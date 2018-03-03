// debugger; //<--allows you to stop execution in browser at this point, and look at event

//This works: even.target.id returns "11" (if you want to go back, in html doc use z[j-2])
// if(event.target.id === "11"){
//   alert('hello');
// }

let playerBoardSelectable = false;
let shipSelectedData = [[false, false, false, false, false], [0, 0, 0, 0, 0]];
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

// $('.notifications-list').empty();
// $('<li>Hello World</li>').appendTo($('.notifications-list'));

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
    let shipNumber = Number(event.target.id);
    let shipID = `#${shipNumber}`;
    //Add message to notifications...
    switch(shipNumber){

    }
    initSelector(shipNumber, shipID);
  });

  $('body').on('keypress', function(event){
    if(playerBoardSelectable && event.originalEvent.code === 'Enter'){
      switch(shipNumber){
      case 0:
        if(tempShipLocArray.length === 5 && maxDiff(tempShipLocArray) === 5){
          shipLocObject[shipNumber] = tempShipLocArray;
          resetBoard();
          tempShipLocArray = [];
        }else{
          $('<li>').text("Try again!").appendTo();
        }
        break;
      default:
        break;
      }
    }
  });

});
