$(document).on('turbolinks:load', function() {
  this.App || (this.App = {});
 
  App.cable = ActionCable.createConsumer();
  App.room = new MakeGameChannel(App, location.pathname.split('/game/')[1])
  App.game = {}
  App.player = new Player()
  App.numbers = []
  App.calls = []

  App.updateState = function (game) {
    App.game = game
    if (App.game['status'] == 'playing') {
      App.move(App.game.number)
      if (App.player['id'] == App.game.current_player_id) {
        $('.your-turn').show()
      } else {
        $('.your-turn').hide()
      }
    }
  }

  App.move = function (number) {
    App.calls.push(number)
    App.player.board.mark(number)
    var cell = $('.game-board > .row > .cell[data-number="' + number + '"]');
    $(cell).addClass('marked')
    $(cell).off('click')
  }

  var queue_number = function (number) {
    $('.number-queue').append(
      $('<div>', { class: 'cell',  html: number })
    )
  }

  var requeue_number = function (number) {
    $('.number-queue').prepend(
      $('<div>', { class: 'cell',  html: number })
    )
  }

  var dequeue_number = function (number) {
    $('.number-queue > .cell').first().remove()
  }

  var buildBoardFromData = function (data) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        var cell = '#cell_'+i+j
        $(cell).html(data[i][j])
        $(cell).data('number', data[i][j])
        $(cell).attr('data-number', data[i][j])
        $(cell).addClass('dirty')
        $(cell).removeClass('pristine')
      }
    }
  }

  for (var i = 25; i > 0; i--) {
    App.numbers.push(i)
    queue_number(25-i+1)
  }

  $('.game-board > .row > .cell').on('click', function() {
    $('.game-board > .row > .cell').removeClass('active')
    $(this).addClass('active')

    if ($(this).hasClass('pristine')) {
      $(this).removeClass('pristine')
      $(this).addClass('dirty')
      var number = App.numbers.pop()
      var position = $(this).data('position')
      App.player.board.set(position, number)
      $(this).html(number)
      $(this).data('number', number)
      $(this).attr('data-number', number)
      dequeue_number()
    } else if ($(this).hasClass('dirty')) {
      $(this).removeClass('dirty')
      $(this).addClass('pristine')
      var position = $(this).data('position')
      App.numbers.push($(this).data('number'))
      requeue_number($(this).data('number'))
      App.player.board.set(position, null)
      $(this).html(null)
      $(this).data('number', null)
      $(this).attr('data-number', null)
    }
  })

  $('#readyBtn').on('click', function() {
    if (App.numbers.length) return false;
    
    $(document).trigger('playerReady')
    $('#readyBtn, #randomBtn').remove()
    $('.game-board > .row > .cell').off('click')
    $('.game-board > .row > .cell').removeClass('active')

    $('.game-board > .row > .cell').on('click', function() {
      if (App.game.current_player_id == App.player['id']) {
        var number = $(this).data('number')
        $(document).trigger('played', {
          player_id: App.player.id,
          number: number
        })
      }
    })
  })

  $('#randomBtn').on('click', function() {
    App.numbers = []
    $('.number-queue').html(null)
    App.player.board.randomize()
    buildBoardFromData(App.player.board.arrangement)
  })
})