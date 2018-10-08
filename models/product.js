'use strict';

var constants = require('../utils/constants.js');
const network = require('../libs/fabric-lib/food-supply-chain-network.js');

var Product = class {

    constructor(opts) {
        this.id = opts.id,
        this.objectType = opts.objectType || constants.ObjectTypes.Product,
        this.parent = opts.parent,
        this.name = opts.name,
        this.content = opts.content;
        this.content = (opts.content && opts.content instanceof Object) ? 
                        JSON.stringify(opts.content) : opts.content;
    }

    toString()
    {        
        return "[ Product-id: " + this.id + " , name: " + this.name + 
            " , objectType: " + this.objectType + " , content: " + this.content + " ]";   
    }

    create()
    {
        return network.invoke('createTraceable', this);
    }

    update()
    {
        return network.invoke('updateTraceable', this);        
    }

    static find(id)
    {
        let objectType = constants.ObjectTypes.Product;
        return network.query('getObject', id, objectType);
    }

    static findLogs(productId)
    {
        return network.query('getLogsOfProduct', productId);
    }
}

module.exports = Product;