var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

router.get('/', function(req, res, next) {
  // lib file db function to retrieve all albums goes here
  res.render('albums', { title: 'ALBUMS'});
});

router.post('/', function(req, res, next){
  var errors = [];
  dbcalls.findAlbumCheck(req.body.album, req.body.artistID).then(function(data){
    if(data){
      errors.push('album already exists, please edit to make changes'); // sessions to push the errors?
      res.redirect('/' + req.body.artistID + '/albums');
    } else {
      dbcalls.insertAlbumByArtistID(req.body.artistID, req.body.album).then(function(data){
        var songsArray = [];
        for (var i = 1; i <= req.body.albumLength; i++){
          var track = 'song' + i;
          songsArray.push(req.body[track])
        }
        songsArray.forEach(function(each){
          return dbcalls.insertSong(each, data._id, req.body.artistID)
        });
        Promise.all(songsArray).then(function(data){
          res.redirect('/');
        })
      })
    }
  })
})

module.exports = router;