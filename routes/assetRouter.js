var uuidv1 = require('uuid/v1');
var express = require('express');
var bodyParser = require('body-parser');
var Asset = require('../models/asset.js');
var constants = require('../utils/constants.js');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.get(function (req, res, next) {      
    return next(new Error('Out of scope, this action is not implemented yet.'));
})

.post(function (req, res, next) {
    var newAsset = new Asset({
        id: req.body.id || uuidv1(),
        objectType: constants.ObjectTypes.Asset,
        parent: req.body.parent,
        name: req.body.name,
        content: req.body.content
    })
    newAsset.create().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the Asset : ' + newAsset.id);        
        }
    }).catch(err => {
        if(err) return next(err);        
    });    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

// ======================================================

router.route('/:assetId')
.get(function (req, res, next) {    
    Asset.find(req.params.assetId).then(Asset => {       
        res.json(Asset);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.put(function (req, res, next) {
    var updateAsset = new Asset({
        id: req.params.assetId,    
        parent: req.body.parent,    
        name: req.body.name,
        content: req.body.content
    })
    updateAsset.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the Asset : ' + updateAsset.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {    
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

// ======================================================

module.exports = router;