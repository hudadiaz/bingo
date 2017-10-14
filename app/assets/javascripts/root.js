$(document).on('turbolinks:load', function() {
  if (localStorage.playerName) {
    $('#playerName').html(localStorage.playerName)
  } else {
    var name = prompt("What's your name?").substr(0, 10)
    if (name.length) {
      localStorage.playerName = name
      $('#playerName').html(localStorage.playerName)
    }
  }

  $('#playerName').on('keypress', function(e) {
    var content = $(this).html()
    if (content.length >= 10) {
      e.preventDefault()
      return false
    }
  })

  $('#playerName').on('keyup', function(e) {
    var content = $(this).html()
    if (content.length > 0 && content.length <= 10) {
      localStorage.playerName = $(this).html()
    }
  })
})