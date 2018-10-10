'use strict';

function convertEndorsement2JSON(endorsement) {
    return endorsement.endorser.Mspid
}

function convertTransactionAction2JSON(action) {
    let proposalResponse = {
        hash: action.payload.action.proposal_response_payload.proposal_hash,
        rw_set: action.payload.action.proposal_response_payload.extension.results.ns_rwset,
        status: action.payload.action.proposal_response_payload.extension.response.status,
    }
    let creator = {
        name: action.header.creator.Mspid,
        nonce: action.header.nonce.toString('hex'),
        cert: action.header.creator.IdBytes,
    }
    let endorsers = action.payload.action.endorsements.map(convertEndorsement2JSON).join(', ');
    return {
        creator: creator,
        chaincode_input: action.payload.chaincode_proposal_payload.input.toString('utf8'),
        chaincode: action.payload.action.proposal_response_payload.extension.chaincode_id.name,
        chaincode_version: action.payload.action.proposal_response_payload.extension.chaincode_id.version,
        proposal_response: proposalResponse,
        endorsers: endorsers
    }
}

function convertBlockTransaction2JSON(transaction) {
    var actions = []
    if (transaction.payload.data.actions !== undefined) {
        actions = transaction.payload.data.actions.map(convertTransactionAction2JSON);
    }
    return {
        type: transaction.payload.header.channel_header.typeString,
        time: transaction.payload.header.channel_header.timestamp,
        tx_id: transaction.payload.header.channel_header.tx_id,
        creator: transaction.payload.header.signature_header.creator.Mspid,
        channel: transaction.payload.header.channel_header.channel_id,
        actions: actions
    }
}

function convertBlock2JSON(block) {
    let header = {
        number: block.header.number,
        previous_hash: block.header.previous_hash,
        data_hash: block.header.data_hash
    }
    let transactions = block.data.data.map(convertBlockTransaction2JSON);

    return {
        header: header,
        transactions: transactions
    }
}

module.exports.convertBlock2JSON = convertBlock2JSON;

function convertTransaction2JSON(transaction) {
    let payload = transaction.transactionEnvelope.payload;
    let header = payload.header;
    var actions = []
    if (payload.data.actions !== undefined) {
        actions = payload.data.actions.map(convertTransactionAction2JSON);
    }
    return {
        type: header.channel_header.typeString,
        time: header.channel_header.timestamp,
        tx_id: header.channel_header.tx_id,
        creator: header.signature_header.creator.Mspid,
        channel: header.channel_header.channel_id,
        actions: actions
    }
}

module.exports.convertTransaction2JSON = convertTransaction2JSON;

function convertChaincode2JSON(chaincode) {
    return {
        name: chaincode.name,
        version: chaincode.version,
    }
}

function convertChaincodeArray2JSON(chaincodes) {
    var result = []
    if (chaincodes.chaincodes !== undefined) {
        result = chaincodes.chaincodes.map(convertChaincode2JSON);
    }
    return result
}

module.exports.convertChaincodeArray2JSON = convertChaincodeArray2JSON;