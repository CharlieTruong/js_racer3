function update_player_position(player){
  var index = $(player + " .active")[0].cellIndex;
  var new_pos = index + 2;

  $(player + " td").removeClass("active");
  $(player + " td:nth-child(" + new_pos + ")").addClass("active");
};

function win(player, start){
  if($(player +" .active")[0].cellIndex == 14) {
    var end = $.now();
    var duration = end - start;
    var game_id = $("#player1 > td:nth-of-type(1)").data("game-id");
    $.ajax({
      type: "POST",
      url: "/end",
      data: { winner:player,
              time: duration
            },
      success:function(){
        window.location.href = '/end/' + game_id
      }
    }); // end of ajax
  }; // end of IF
}; // End of function

var start = $.now();

$(document).on('keyup', function(e) {

  if(e.keyCode==80){  // p == 80
    update_player_position("#player1");
    win("#player1", start)
  };
  if(e.keyCode==81){ // q == 81
    update_player_position("#player2");
    win("#player2", start);
  };
});
