var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('albums', { title: 'ALBUMS' });
});

module.exports = router;