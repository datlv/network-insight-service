var uuidv1 = require('uuid/v1');
var express = require('express');
var bodyParser = require('body-parser');
var Auditor = require('../models/auditor.js');
var AuditAction = require('../models/auditAction.js');
var constants = require('../utils/constants.js');

var router = express.Router();
router.use(bodyParser.json());


//=============== /api/v1/auditors  ===================
router.route('/')
.get(function (req, res, next) {      
    return next(new Error('Out of scope, this action is not implemented yet.'));
})

.post(function (req, res, next) {
    var newAuditor = new Auditor({
        id: req.body.id ||uuidv1(),
        objectType: constants.ObjectTypes.Auditor,
        name: req.body.name,
        content: req.body.content
    })
    newAuditor.create().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the Auditor : ' + newAuditor.id);        
        }
    }).catch(err => {
        if(err) return next(err);        
    });    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/auditors/auditorId  ==================
router.route('/:auditorId')
.get(function (req, res, next) {    
    Auditor.find(req.params.auditorId).then(auditor => {       
        res.json(auditor);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.put(function (req, res, next) {
    var newAuditor = new Auditor({
        id: req.params.auditorId,
        objectType: constants.ObjectTypes.Auditor,
        name: req.body.name,
        content: req.body.content
    })
    newAuditor.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the Auditor : ' + newAuditor.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {    
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/auditors/auditorId/audit-actions  ==================
router.route('/:auditorId/audit-actions')
.get(function (req, res, next) {
    Auditor.findAudits(req.params.auditorId).then(auditActions => {       
        res.json(auditActions);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.post(function (req, res, next) {
    var newAuditAction = new AuditAction({
        id:         req.body.id || uuidv1(),
        objectType: req.body.objectType || constants.ObjectTypes.AuditAction,
        time:       req.body.time,
        auditor:    req.body.auditor || req.params.auditorId,
        location:   req.body.location,
        objectId:   req.body.objectId,
        content:    req.body.content
    })
    newAuditAction.create().then(status => {
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the AuditAction : ' + newAuditAction.id);
        }
    }).catch(err => {
        if(err) return next(err);        
    });    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/auditors/auditorId/audit-Actions/auditActionId  ==================
router.route('/:auditorId/audit-actions/:auditActionId')
.get(function (req, res, next) {
    AuditAction.find(req.params.auditActionId).then(auditAction => {       
        res.json(auditAction);
    }).catch(err => {
        if(err) return next(err);
    });
})

.put(function (req, res, next) {
    var updateAuditAction = new AuditAction({
        id:         req.params.auditActionId ||uuidv1(),        
        time:       req.body.time,
        auditor:    req.body.auditor,
        location:   req.body.location,
        objectId:   req.body.objectId,
        content:    req.body.content
    })
    updateAuditAction.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the AuditAction : ' + updateAuditAction.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

module.exports = router;