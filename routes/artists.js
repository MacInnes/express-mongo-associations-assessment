var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

router.get('/', function(req, res, next) {
  dbcalls.findArtists().then(function(data){
    res.render('artists', { artists: data });
  })
});

router.get('/:id', function(req, res, next) {
  dbcalls.findArtistByID(req.params.id).then(function(data){
    var outputObject = {artist: data.artist, _id: data._id};
    dbcalls.findAlbumsByArtist(req.params.id).then(function(data){
      // add albums array to outputObject, links for albums should redirect through albums routes
      res.render('showArtist', {artist: outputObject, albums: data})
    })  
  })
})

router.get('/edit/:id', function(req, res, next) {
  dbcalls.findArtistByID(req.params.id).then(function(data){
    res.render('editArtist', {artist: data})
  })
})

router.get('/delete/:id', function(req, res, next){
  dbcalls.findAlbumsByArtist(req.params.id).then(function(data){
    console.log('------ALBUMS FOUND---------')
    var albumsPromisesArray = data.map(function(album){
      return dbcalls.deleteAlbum(album._id);
    });
    dbcalls.findSongsByArtist(req.params.id).then(function(data){
      console.log('------SONGS FOUND---------')
      var songsPromisesArray = data.map(function(song){
        return dbcalls.deleteSong(song._id);
      })
      Promise.all(albumsPromisesArray).then(function(data){
        console.log('-----ALBUMS DELETED------')
        Promise.all(songsPromisesArray).then(function(data){
          console.log('-----SONGS DELETED------')
          dbcalls.deleteArtist(req.params.id).then(function(data){
            console.log('-----THE END------')
            res.redirect('/')
          })
        })
      })
    })
  })
})

router.post('/edit/:id', function(req, res, next){
  dbcalls.updateArtist(req.params.id, req.body.artist).then(function(data){
    res.redirect('/');
  })
})

router.post('/', function(req, res, next) {
  var errors = [];
  //lib file db function to insert an artist goes here
  if (req.body.artist.length === 0){
    errors.push('Please enter an artist.');
    dbcalls.findArtists().then(function(data){
      res.render('artists', { errors: errors, artists: data });
    })
  } else {
    dbcalls.insertArtist(req.body.artist).then(function(data){
      res.redirect('/artists');
    })
  }
})









module.exports = router;