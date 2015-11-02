window.onload = function(){
  $('#albumLength').change(function(){
    var count = $('#albumLength').val();
    $('#songs').empty();
    for (var i = 1; i <= count; i++){
      $('#songs').append('<div><label>Song:<input type=\'text\' name=\'song' + i + '\'></input></label></div>')
    }
  });
  $('#artistSelect').change(function(){
    var artist = $('#artistSelect').val();
    if (artist === 'none'){
      $('#artist').show();
    } else {
      $('#artist').hide();
    }
  })
}

