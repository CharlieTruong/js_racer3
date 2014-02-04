$(document).ready(function() {

  game = new Game();

  $(document).on('keyup', function(e) {
    game.render(e);
    game.check_win();
  });
});

function Player(key, name){
  var key = key;
  this.name = name;

  var update_player_position = function(name){
    var start_pos = $(name + " .active")[0].cellIndex;
    var new_pos = start_pos + 2;

    $(name + " td").removeClass("active");
    $(name + " td:nth-child(" + new_pos + ")").addClass("active");
  };

  this.check_move = function(e){
    if(e.keyCode== key){
      update_player_position(this.name);
    };
  };
};

function Game(){
  var player1 = new Player(80,"#player1");
  var player2 = new Player(81,"#player2");
  var players = [player1,player2];
  var start = $.now();

  this.render = function(e){
    $.each(players,function(index,player){
      player.check_move(e);
    });
  };

  this.check_win = function(){
    $.each(players,function(index,player){
      if($(player.name + " .active")[0].cellIndex == 14) {
        $(document).unbind("keyup",this.render);
        declare_winner(player.name);
      }
    });
  };

  var declare_winner = function(name){
    var duration = $.now() - start;
    alert(name + " wins!");
    post_info(name,duration);
  };

  var post_info = function(name,duration){
    var game_id = $("#player1 > td:nth-of-type(1)").data("game-id");
    $.ajax({
        type: "POST",
        url: "/end",
        data: { winner:name,
                time: duration
              },
        success:function(){
          window.location.href = '/end/' + game_id
        }
      });
  };
};



