var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbcalls.test();
  // lib file db function to retrieve all playlists goes here
  res.render('playlists', { title: 'PLAYLISTS' });
});

router.post('/', function(req, res, next) {
  //lib file db function to insert a playlist goes here
  res.redirect('/playlists')
})

module.exports = router;