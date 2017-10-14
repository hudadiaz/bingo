class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room]}"
  end

  def join(data)
    game.join(data['player'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game
  end

  def ready(data)
    game.ready(data['player_id'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game
  end

  def play(data)
    game.move(data['data']['player_id'], data['data']['number'])
    ActionCable.server.broadcast "room_#{params[:room]}", game: game
  end

  private

    def game
      Game.find params[:room]
    end
end