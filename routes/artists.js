var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

router.get('/', function(req, res, next) {
  dbcalls.findArtists().then(function(data){
    res.render('artists', { title: 'ARTISTS', artists: data });
  })
  
});

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