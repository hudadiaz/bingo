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
    play: function(data, roomId) {
      return this.perform('play', {
        data: data,
        room: roomId
      });
    },
    ready: function(player_id, roomId) {
      return this.perform('ready', {
        player_id: player_id,
        room: roomId
      });
    }
  });

  $(document).on('played', function(e, data) {
    self.room.play(data, roomId);
  });

  $(document).on('playerReady', function() {
    self.room.ready(app.player.id, roomId);
  });

  return self;
};
