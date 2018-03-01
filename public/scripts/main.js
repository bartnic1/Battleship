// debugger; //<--allows you to stop execution in browser at this point, and look at event

//This works: even.target.id returns "11" (if you want to go back, in html doc use z[j-2])
// if(event.target.id === "11"){
//   alert('hello');
// }

let playerBoardSelectable = false;
let shipSelectedData = [[false, false, false, false, false], [0, 0, 0, 0, 0]];

function sum(array){
  let sum = 0;
  for(let val of array){
    sum += val;
  }
  return sum;
}

function initSelector(entry, shipObject){
  shipSelectedData[0][entry] = !shipSelectedData[0][entry];
  if(shipSelectedData[0][entry]){
    shipSelectedData[1][entry] = 1;
    if(sum(shipSelectedData[1]) > 1){
      shipSelectedData[1][entry] = 0;
      shipSelectedData[0][entry] = false;
    }
  }else{
    shipSelectedData[1][entry] = 0;
  }
  if(shipSelectedData[1][entry] === 1){
    $(shipObject).css("opacity", "0.7");
    playerBoardSelectable = true;
  }else{
    $(shipObject).css("opacity", "1.0");
    playerBoardSelectable = false;
  }
}

// $('.notifications-list').empty();
// $('<li>Hello World</li>').appendTo($('.notifications-list'));

$(document).ready(function(){

  $('.board1').on('click', function(event){
    if(playerBoardSelectable){
      $(`#${event.target.id}`).css("background-color", "red");
    };
  });

  // 0: Carrier(5), 1:
  $('#ships-box-player').on('click', function(event){
    let shipEntry = Number(event.target.id);
    let shipObject = `#${shipEntry}`;
    initSelector(shipEntry, shipObject);
  });

});
