class GameController < ApplicationController
  def show
    game = Game.find(params[:id])
    return redirect_to root_path unless game
    return redirect_to root_path if game.status == 'ended'
  end
  
  def new
    game = Game.new()
    redirect_to game_path(id: game.id)
  end

  def find
    redirect_to game_path(id: params[:id])
  end
end
