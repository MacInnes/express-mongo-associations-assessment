var express = require('express');
var router = express.Router();
var dbcalls = require('../lib/dbcalls');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbcalls.test();
  // lib file db function to retrieve all songs goes here
  res.render('songs', { title: 'SONGS' });
});

router.post('/', function(req, res, next) {
  // lib file db function to insert song goes here
  res.redirect('/songs');
})

module.exports = router;