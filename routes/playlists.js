var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  // lib file db function to retrieve all playlists goes here
  
  dbcalls.findAllPlaylists().then(function(data){
    var playlists = data;
    dbcalls.findAllSongs().then(function(data){
      res.render('playlists', { title: 'PLAYLISTS', songs: data, playlists: playlists });
    })
  })
});

router.post('/', function(req, res, next) {
  //lib file db function to insert a playlist goes here
  var songsArray = [];
  for (var i = 1; i <= req.body.totalSongs; i++){
    var songInputName = 'song' + i;
    if (req.body[songInputName]){
      songsArray.push(req.body[songInputName]);
    }
  }
  dbcalls.insertPlaylist(req.body.playlist, songsArray).then(function(data){
    res.redirect('/')
  })
})

router.get('/:id', function(req, res, next){
  dbcalls.findPlaylistByID(req.params.id).then(function(data){
    var playlistName = data.name;
    var songFindArray = data.songs.map(function(each){
      return dbcalls.findSongByID(each);
    })
    Promise.all(songFindArray).then(function(data){
      res.render('showPlaylist', {id: req.params.id, name: playlistName, songs: data})
    })
  })
})

router.get('/:id/edit', function(req, res, next){
  dbcalls.findPlaylistByID(req.params.id).then(function(data){
    var playlistName = data.name;
    var songFindArray = data.songs.map(function(each){
      return dbcalls.findSongByID(each);
    })
    Promise.all(songFindArray).then(function(data){
      var existingSongs = data;
      dbcalls.findAllSongs().then(function(data){
        console.log('-----existing-----');
        console.log(existingSongs);
        console.log('-----SONGS--------');
        console.log(data)
        res.render('playlistEdit', {id: req.params.id, name: playlistName, songs: data, oldSongs: existingSongs})  
      })
    })
  })
})

router.post('/:id/edit', function(req, res, next){
  var songsArray = [];
  for (var i = 1; i <= req.body.totalSongs; i++){
    var songInputName = 'song' + i;
    if (req.body[songInputName]){
      songsArray.push(req.body[songInputName]);
    }
  }
  dbcalls.updatePlaylist(req.body.playlistID, songsArray).then(function(data){
    res.redirect('/');
  })
})

module.exports = router;