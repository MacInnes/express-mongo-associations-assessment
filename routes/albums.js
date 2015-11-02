var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

router.get('/', function(req, res, next) {
  // lib file db function to retrieve all albums goes here
  res.render('albums', { title: 'ALBUMS'});
});

router.post('/', function(req, res, next) {
  dbcalls.insertAlbum
  //lib file db function to insert album goes here
  res.redirect('/albums');
})

module.exports = router;