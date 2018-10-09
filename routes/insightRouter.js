var express = require('express');
var bodyParser = require('body-parser');

var Client = require('fabric-client');
var client = Client.loadFromConfig('configs/fabric-network-config/connection-profile.yaml');
// ======================================================

function encroll(org) {
    var caService;
    let username = `admin-${org}`;
    let password = `admin-${org}pw`;
    console.log(`Encroll with username ${username}`);
    client.loadFromConfig(`configs/fabric-network-config/${org}-profile.yaml`);

    // init the storages for client's state and cryptosuite state based on connection profile configuration 
    return client.initCredentialStores()
        .then(() => {
            // tls-enrollment
            caService = client.getCertificateAuthority();
            return caService.enroll({
                enrollmentID: username,
                enrollmentSecret: password,
                profile: 'tls',
                attr_reqs: [
                    { name: "hf.Registrar.Roles" },
                    { name: "hf.Registrar.Attributes" }
                ]
            }).then((enrollment) => {
                console.log('Successfully called the CertificateAuthority to get the TLS material');
                let key = enrollment.key.toBytes();
                let cert = enrollment.certificate;

                // set the material on the client to be used when building endpoints for the user
                client.setTlsClientCertAndKey(cert, key);
                return client.setUserContext({ username: username, password: password });
            })
        })
}
// ======================================================

var router = express.Router();
router.use(bodyParser.json());

router.route('/org/:org')
    .get(function (req, res, next) {
        let org = req.params.org;
        return encroll(org)
            .then(() => {
                let peers = client.getPeersForOrg();
                return client.queryChannels(peers[0])
                    .then(channelQueryResponses => {
                        return res.json(channelQueryResponses);
                    }).catch(err => {
                        if (err) return next(err);
                    });
            })
    });
// ======================================================

router.route('/org/:org/channel/:channel_name')
    .get(function (req, res, next) {
        let org = req.params.org;
        let channel_name = req.params.channel_name;
        return encroll(org)
            .then(() => {
                return client.getChannel(channel_name);
            })
            .then((channel) => {
                return channel.queryInfo()
                    .then(queryResponses => {
                        return res.json(queryResponses);
                    }).catch(err => {
                        if (err) return next(err);
                    });
            })
            .catch(err => {
                if (err) return next(err);
            });
    });
// ======================================================

router.route('/org/:org/channel/:channel_name/block/:block')
    .get(function (req, res, next) {
        let org = req.params.org;
        let channel_name = req.params.channel_name;
        let block = parseInt(req.params.block);
        return encroll(org)
            .then(() => {
                return client.getChannel(channel_name);
            })
            .then((channel) => {
                return channel.queryBlock(block)
                    .then(queryResponses => {
                        return res.json(queryResponses);
                    }).catch(err => {
                        if (err) return next(err);
                    });
            })
            .catch(err => {
                if (err) return next(err);
            });
    });
// ======================================================

router.route('/org/:org/channel/:channel_name/tx/:transaction_id')
    .get(function (req, res, next) {
        let org = req.params.org;
        let channel_name = req.params.channel_name;
        let transaction_id = req.params.transaction_id;
        return encroll(org)
            .then(() => {
                return client.getChannel(channel_name);
            })
            .then((channel) => {
                return channel.queryTransaction(transaction_id)
                    .then(queryResponses => {
                        return res.json(queryResponses);
                    }).catch(err => {
                        if (err) return next(err);
                    });
            })
            .catch(err => {
                if (err) return next(err);
            });
    });
// ======================================================

module.exports = router;