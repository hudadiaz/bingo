class GameController < ApplicationController
  def show
  end
  
  def new
    game = Game.new()
    redirect_to game_path(id: game.id)
  end

  def find
    redirect_to game_path(id: params[:id])
  end
end
