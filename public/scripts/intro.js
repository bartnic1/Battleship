$(document).ready(function(){
  $('.userSubmit').on('click', function(event){
    event.preventDefault();
    let formData = $('.userName').serialize();
    $.post("/users?_method=PUT", formData).done(function(res){
      $('.userDiv').css("visibility", "hidden");
      $('.logout').css("visibility", "visible");
      $('.welcome').text(res);
    });
  });

  $('.logout').on('click', function(event){
    $('.userDiv').css("visibility", "visible");
    $('.logout').css("visibility", "hidden");
    $('.welcome').text('');
  });

  $.get("/users/current").done(function(res){
    if(res !== 'nobody'){
      $('.welcome').text(`Welcome, ${res}!`);
      $('.userDiv').css("visibility", "hidden");
      $('.logout').css("visibility", "visible");
    }
  });
});