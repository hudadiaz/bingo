function Player() {
  var self = this

  if (localStorage.player_id === undefined) {
    localStorage.player_id = makeid()
  }

  self.id = localStorage.player_id
  self.board = new Bingo()
  self.ready = false

  return self
}