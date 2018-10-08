'use strict';

var constants = require('../utils/constants.js');
const network = require('../libs/fabric-lib/food-supply-chain-network.js');

var AuditAction = class {

    constructor(opts) {
        this.id = opts.id;
        this.objectType = opts.objectType || constants.ObjectTypes.AuditAction;        
        this.time = opts.time;
        this.auditor = opts.auditor;
        this.location = opts.location;
        this.objectId = opts.objectId;
        this.content = (opts.content && opts.content instanceof Object) ? 
                        JSON.stringify(opts.content) : opts.content;
    }

    toString()
    {
        return "[ AuditAction-id: " + this.id + " , time: " + this.time +         
        " , objectType: " + this.objectType + " , objectId: " + this.objectId + " , content: " + this.content + " ]";   
    }

    create()
    {
        return network.invoke('createAuditAction', this);        
    }

    update()
    {
        return network.invoke('updateAuditAction', this);        
    }

    static find(id)
    {
        let objectType = constants.ObjectTypes.AuditAction;
        return network.query('getObject', id, objectType);
    }    
}

module.exports = AuditAction;