function update_player_position(player){
  var index = $(player + " .active")[0].cellIndex;
  var new_pos = index + 2;

  $(player + " td").removeClass("active");
  $(player + " td:nth-child(" + new_pos + ")").addClass("active");
};

function win(player){
  if($(player +" .active")[0].cellIndex == 14) {
    $('table').after("<p>" + player + "wins!</p>" );
    };
};

$(document).on('keyup', function(e) {
  if(e.keyCode==80){  // p == 80
    update_player_position("#player1");
    win("#player1");
  };
  if(e.keyCode==81){ // q == 81
    update_player_position("#player2");
    win("#player2");
  };
});
