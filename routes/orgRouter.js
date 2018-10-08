var uuidv1 = require('uuid/v1');
var express = require('express');
var bodyParser = require('body-parser');
var Org = require('../models/org.js');
var constants = require('../utils/constants.js');

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.get(function (req, res, next) {      
    return next(new Error('Out of scope, this action is not implemented yet.'));
})

.post(function (req, res, next) {

    if(req.body.traceables)
    {
        let newOrgData = {
            traceable: req.body.traceables,
            auditors: req.body.auditors
        };

        newOrgData.traceable.forEach(function(item) {
            if(item.content)
            {
                item.content = JSON.stringify(item.content);
            }
        });

        newOrgData.auditors.forEach(function(item) {
            if(item.content)
            {
                item.content = JSON.stringify(item.content);
            }
        });

        Org.create(newOrgData).then(status => {        
            if(status == "SUCCESS")
            {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Added the org. : ' + newOrgData.traceable[0].id);        
            }
        }).catch(err => {
            if(err) return next(err);        
        });    
    }
    else
    {
        var newOrg = new Org({
            id: req.body.id || uuidv1(),
            objectType: constants.ObjectTypes.Org,
            parent : req.body.parent,
            name: req.body.name,
            content: req.body.content
        })

        newOrg.create().then(status => {        
            if(status == "SUCCESS")
            {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Added the Org : ' + newOrg.id);        
            }
        }).catch(err => {
            if(err) return next(err);        
        });
    }
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

// ======================================================

router.route('/:orgId')
.get(function (req, res, next) {    
    Org.find(req.params.orgId).then(org => {       
        res.json(org);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.put(function (req, res, next) {
    var org = new Org({
        id: req.params.orgId,        
        parent : req.body.parent,
        name: req.body.name,
        content: req.body.content
    })
    org.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the org : ' + org.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {    
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

module.exports = router;