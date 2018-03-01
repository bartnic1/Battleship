// debugger; //<--allows you to stop execution in browser at this point, and look at event

$(document).ready(function(){


  $('.board1').on('click', function(event){

    if(event.target.id === "1A"){
      alert('hello');
    }
  });

  $('#player-1').on('click', function(event){
    alert('hello');
  })

  // $('.notifications-list').empty();
  // $('<li>Hello World</li>').appendTo($('.notifications-list'));
  // $('<li>Hello World</li>').appendTo($('.notifications-list'));
  // $('<li>Hello World</li>').appendTo($('.notifications-list'));

});
