class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room]}"
  end

  def join(data)
    game.join(data['player'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game, action: :join
  end

  def ready(data)
    game.ready(data['player_id'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game, action: :ready
  end

  def move(data)
    game.move(data['data']['player_id'], data['data']['number'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game, action: :move
  end

  def update_player(data)
    game.update_player(data['player'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game, action: :update_player
  end

  private

    def game
      Game.find params[:room]
    end
end