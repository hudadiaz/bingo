class GameController < ApplicationController
  def show
    redirect_to root_path unless Game.find(params[:id])
  end
  
  def new
    game = Game.new()
    redirect_to game_path(id: game.id)
  end

  def find
    redirect_to game_path(id: params[:id])
  end
end
