'use strict';

var constants = require('../utils/constants.js');
const network = require('../libs/fabric-lib/food-supply-chain-network.js');

var Supplychain = class {

    constructor(opts) {
        this.id = opts.id,
        this.objectType = opts.objectType || constants.ObjectTypes.Supplychain,
        this.name = opts.name,
        this.content = opts.content;
    }

    toString()
    {        
        return "[ Supplychain-id: " + this.id + " , name: " + this.name + 
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
        let objectType = constants.ObjectTypes.Supplychain;
        return network.query('getObject', id, objectType);
    }

    static findLogs(supplychainId)
    {
        return network.query('getLogsOfSupplychain', supplychainId);
    }
}

module.exports = Supplychain;