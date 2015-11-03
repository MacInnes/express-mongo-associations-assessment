var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

router.get('/', function(req, res, next) {
  dbcalls.findArtists().then(function(data){
    res.render('artists', { title: 'ARTISTS', artists: data });
  })
});

router.get('/:id', function(req, res, next) {
  dbcalls.findArtistByID(req.params.id).then(function(data){
    var outputObject = {artist: data.artist, _id: data._id};
    dbcalls.findAlbumsByArtist(data._id).then(function(data){
      console.log("data:" + data);
      // add albums array to outputObject, links for albums should redirect through albums routes
      res.render('showArtist', {artist: outputObject})
    })  
  })
})

router.get('/edit/:id', function(req, res, next) {
  dbcalls.findArtistByID(req.params.id).then(function(data){
    res.render('editArtist', {artist: data})
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
  if (req.body.artistSelectBox === 'none' || req.body.artistSelectBox === undefined){
    //validations
    dbcalls.findArtist(req.body.artist).then(function(data){
      if(data){
        errors.push('Artist already exists');
        dbcalls.findArtists().then(function(data){
          res.render('artists', {title: 'ARTISTS', artists: data, errors: errors})
        })
        
      } else {
        dbcalls.insertArtist(req.body.artist).then(function(data){
          var artistID = data._id;
          dbcalls.findAlbum(req.body.album).then(function(data){
            if(data){
              errors.push('Album already exists, please edit it to make changes.');
              dbcalls.findArtists().then(function(data){
                res.render('artists', {title: 'ARTISTS', artists: data, errors: errors})
              })
            } else {
              dbcalls.insertAlbum(req.body.album, req.body.artist).then(function(data){
                console.log('Album inserted')
                dbcalls.findArtists().then(function(data){
                  res.render('artists', {title: 'ARTISTS', artists: data, errors: errors})
                })
              })
            }
          })
        })
      }
    });
    
  } else {
    //validations
    dbcalls.findArtist(req.body.artistSelectBox).then(function(data){
      if(data){
        console.log('artist already exists')
      }
    }, function(reason){
      dbcalls.insertArtist(req.body.artistSelectBox).then(function(data){
        console.log('no artist found')
        res.render('index');
      })
    })
  }
})
module.exports = router;