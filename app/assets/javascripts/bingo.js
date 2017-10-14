var Bingo = function() {
  var self = this
  
  self.initialize = function () {
    self.arrangement = []
    self.markings = []
    
    for (var i=0; i<5; i++) {
      self.arrangement.push([])
      self.markings.push([])
      for (var j=0; j<5; j++){
        self.arrangement[i].push(null)
        self.markings[i].push(false)
      }
    }
  }
  
  self.randomize = function () {
    var value_list = []
    
    for (var i=0; i<25; i++){
      value_list[i] = i+1
    }
    
    shuffleArray(value_list)
    
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++){
        self.arrangement[i][j] = value_list[(i*5)+j]
      }
    }
  }
  
  self.find = function (value) {
    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++){
        if (self.arrangement[i][j] == value) {
          return {row: i, col: j}
        }
      }
    }
    return null
  }
  
  self.clear = function (position) {
    if (position.row >= 0 && position.row <= 4 &&
        position.col >= 0 && position.col <= 4) {
      self.arrangement[position.row][position.col] = null
    } 
  }

  self.set = function (position, value) {
    if (
      value >= 1 && value <= 25 &&
      position.row >= 0 && position.row <= 4 &&
      position.col >= 0 && position.col <= 4
      ) {
      var current_pos = self.find(value)
    if (current_pos) {
      self.clear(current_pos)
    }
    self.arrangement[position.row][position.col] = value
  }

  return self.arrangement
  }

  self.mark = function (value) {
    if (value >= 1 && value <= 25) {
      var current_pos = self.find(value)
      if (current_pos) {
        self.markings[current_pos.row][current_pos.col] = true
        return self.markings
      }
    }
    return false
  }

  self.check_score = function () {
    var h = [true, true, true, true, true]
    var v = [true, true, true, true, true]
    var d = [true, true]
    var score = 0

    for (var i=0; i<5; i++) {
      for (var j=0; j<5; j++){
        h[j] = h[j] && self.markings[i][j]
        v[i] = v[i] && self.markings[i][j]
      }
      d[0] = d[0] && self.markings[i][i]
      d[1] = d[1] && self.markings[4-i][i]
    }
    for (var i=0; i<5; i++) {
      score += h[i] + v[i]
    }
    score += d[0] + d[1]

    return {
      score: score,
      vertical: v,
      horizontal: h,
      diagonal: d
    }
  }

  self.initialize()
  return self
}