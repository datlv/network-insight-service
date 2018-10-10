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

function convertTransaction2JSON(transaction) {
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
    let transactions = block.data.data.map(convertTransaction2JSON);

    return {
        header: header,
        transactions: transactions
    }
}

module.exports.convertBlock2JSON = convertBlock2JSON;