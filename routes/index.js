var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SONGS Landing page' });
});

// :id is artist id for album list
router.get('/:id/albums', function(req, res, next){

  dbcalls.findArtistByID(req.params.id).then(function(data){
    var outputObject = {artist: data.artist, artistID: data._id, albums: []};
    dbcalls.findAlbumsByArtist(req.params.id).then(function(data){
      if(data){
        console.log(data)
        for (var i = 0; i < data.length; i++){
          outputObject.albums.push(data[i]);
        }
        res.render('albums', {albums: outputObject});
      } else {
        res.render('albums', {albums: outputObject});
      }
      
    })
  }) 
})

//:id is album id for editing
router.get('/:id/album/edit', function(req, res, next){
  dbcalls.findAlbumByID(req.params.id).then(function(data){
    var outputObject = {albumID: req.params.id, album: data.name, songs: []};
    dbcalls.findSongsByAlbum(data._id).then(function(data){
      for (var i = 0; i < data.length; i++){
        outputObject.songs.push(data[i]);
      }
      console.log(outputObject);
      res.render('albumEdit', {album: outputObject})
    })
  })
})

router.post('/album/edit', function(req, res, next){

  dbcalls.updateAlbum(req.body.albumID, req.body.album).then(function(data){
    var songsArray = [];
    var songsIDArray = [];
    for (var i = 1; i <= req.body.albumLength; i++){
      var track = 'song' + i;
      var id = 'songID' + i;
      songsArray.push(req.body[track]);
      songsIDArray.push(req.body[id]);
    }
    var songFindArray = songsIDArray.map(function(each){
      return dbcalls.findSongByID(each);
    })
    Promise.all(songFindArray).then(function(data){

      var updateArray = [];
      for (var i = 0; i < data.length; i++){
        updateArray.push(dbcalls.updateSong(data[i]._id, songsArray[i]))
      }
      Promise.all(updateArray).then(function(data){
        res.redirect('/');
      })
    })
    
  })
  
})

module.exports = router;
