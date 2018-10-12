var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('templates/index', {});
});

router.get('/channel/:channelID', function (req, res, next) {
  let channelID = req.params.channelID;
  let chaincode = req.query.chaincode;
  let txid = req.query.txid;
  res.render('templates/channel-info', { channelID: channelID, chaincode: chaincode, txid: txid });
});

module.exports = router;
