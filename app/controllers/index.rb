require 'pry'

get '/' do
  session.clear
  # @game = Game.all
  # Look in app/views/index.erb
  erb :index
end

post '/' do
  if params[:player1] == params[:player2]
    @message = "Player 1 must have a different name from Player 2"
    erb :index
  else
    p1 = Player.find_or_create_by_name(params[:player1])
    p2 = Player.find_or_create_by_name(params[:player2])
    session[:p1] = p1.name
    session[:p2] = p2.name
    game = Game.create
    session[:game_id] = game.id
    p1.games << game
    p2.games << game
    redirect to '/game'
  end
end

get '/game' do
  erb :game
end

post '/end' do
  puts params
  game = Game.find_by_id(session[:game_id])
  if params[:winner] == "#player1"
    game.update(winner: session[:p1], time: params[:time])
    game.save
  else
    game.update(winner: session[:p2], time: params[:time])
    game.save
  end
  "true"
end


get '/end/:game_id' do
  @game = Game.find_by_id(params[:game_id])
  erb :end

end
# post '/game' do


#   erb :game
# end
