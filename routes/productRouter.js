var uuidv1 = require('uuid/v1');
var express = require('express');
var bodyParser = require('body-parser');
var Product = require('../models/product.js');
var constants = require('../utils/constants.js');

var router = express.Router();
router.use(bodyParser.json());

//=============== /api/v1/products  ===================
router.route('/')
.get(function (req, res, next) {      
    return next(new Error('Out of scope, this action is not implemented yet.'));
})

.post(function (req, res, next) {
    var newProduct = new Product({
        id: req.body.id || uuidv1(),
        objectType: constants.ObjectTypes.Product,
        parent: req.body.parent,
        name: req.body.name,
        content: req.body.content
    })
    newProduct.create().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the Product : ' + newProduct.id);        
        }
    }).catch(err => {
        if(err) return next(err);        
    });    
})

.delete(function (req, res, next) {
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/products/productId  ===================
router.route('/:productId')
.get(function (req, res, next) {    
    Product.find(req.params.productId).then(Product => {       
        res.json(Product);
    }).catch(err => {
        if(err) return next(err);
    });    
})

.put(function (req, res, next) {
    var updateProduct = new Product({
        id: req.params.productId,        
        parent: req.body.parent,
        name: req.body.name,
        content: req.body.content
    })
    updateProduct.update().then(status => {        
        if(status == "SUCCESS")
        {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Updated the Product : ' + updateProduct.id);
        }
    }).catch(err => {
        if(err) return next(err);
    });
})

.delete(function (req, res, next) {    
    return next(new Error('Out of scope, this action is not implemented yet.'));
});

//=============== /api/v1/products/productId/logs  ===================
router.route('/:productId/logs')
.get(function (req, res, next) {
    Product.findLogs(req.params.productId).then(Logs => {       
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