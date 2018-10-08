var uuidv1 = require('uuid/v1');
var express = require('express');
var bodyParser = require('body-parser');
var Supplychain = require('../models/supply-chain.js');
var Log = require('../models/log.js');
var constants = require('../utils/constants.js');

var router = express.Router();
router.use(bodyParser.json());

//=============== /api/v1/supply-chains  ===================
router.route('/')
.get(function (req, res, next) {      
    return next(new Error('Out of scope, this action is not implemented yet.'));
})

.post(function (req, res, next) {
    var newSupplychain = new Supplychain({
        id: req.body.id || uuidv1(),
        objectType: constants.ObjectTypes.Supplychain,
        name: req.body.name,
        content: req.body.content
    })
    newSupplychain.create().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the Supplychain : ' + newSupplychain.id);        
        }
    }).catch(err => {
        if(err) return next(err);        
    });    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/supply-chains/supplychainId  ===================
router.route('/:supplychainId')
.get(function (req, res, next) {    
    Supplychain.find(req.params.supplychainId).then(Supplychain => {       
        res.json(Supplychain);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.put(function (req, res, next) {
    var updateSupplychain = new Supplychain({
        id: req.params.supplychainId,
        objectType: req.body.objectType || constants.ObjectTypes.Supplychain,
        name: req.body.name,
        content: req.body.content
    })
    updateSupplychain.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the Supplychain : ' + updateSupplychain.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {    
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/supply-chains/supplychainId/logs  ===================
router.route('/:supplychainId/logs')
.get(function (req, res, next) {
    Supplychain.findLogs(req.params.supplychainId).then(Logs => {       
        res.json(Logs);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.post(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

module.exports = router;