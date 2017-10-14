MakeGameChannel = function(app, roomId) {
  var self = this
  self.room = app.cable.subscriptions.create({
    channel: "GameChannel",
    room: roomId
  }, {
    connected: function() {
      return this.perform('join', {
        player: app.player,
        room: roomId
      });
    },
    disconnected: function() {},
    received: function(data) {
      return app.updateState(data['game']);
    },
    move: function(data, roomId) {
      return this.perform('move', {
        data: data,
        room: roomId
      });
    },
    ready: function(player_id, roomId) {
      return this.perform('ready', {
        player_id: player_id,
        room: roomId
      });
    },
    update_player: function(player, roomId) {
      var playerCopy = JSON.parse(JSON.stringify(player));
      delete playerCopy.board.arrangement
      return this.perform('update_player', {
        player: playerCopy,
        room: roomId
      });
    }
  });

  $(document).on('playerReady', function() {
    self.room.ready(app.player.id, roomId);
  });

  $(document).on('moved', function(e, data) {
    self.room.move(data, roomId);
  });

  $(document).on('marked', function(e, data) {
    self.room.update_player(data, roomId);
  });

  return self.room;
};
