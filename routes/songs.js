var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('songs', { title: 'SONGS' });
});

router.get('/albums', function(req, res, next) {
  res.render('albums', { title: 'ALBUMS' });
});

router.get('/artists', function(req, res, next) {
  res.render('artists', { title: 'ARTISTS' });
});

module.exports = router;