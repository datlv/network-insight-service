var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('templates/index', {});
});

router.get('/channel-info/:channelID', function (req, res, next) {
  let channelID = req.params.channelID;
  res.render('templates/channel-info', { channelID: channelID });
});

module.exports = router;
