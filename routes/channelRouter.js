var express = require('express');
var bodyParser = require('body-parser');
var fsx = require('fs-extra');

var Client = require('fabric-client');
var client = Client.loadFromConfig('configs/fabric-network-config/connection-profile.yaml');
// ======================================================

class ChannelRouter {

    constructor() {
    }

    encroll(org) {
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
}

var currentClient = new ChannelRouter();
var router = express.Router();
router.use(bodyParser.json());

router.route('/:org')
    .get(function (req, res, next) {
        let org = req.params.org;
        return currentClient
            .encroll(org)
            .then(() => {
                let peers = client.getPeersForOrg();
                client.queryChannels(peers[0]).then(channelQueryResponses => {
                    res.json(channelQueryResponses);
                }).catch(err => {
                    if (err) return next(err);
                });
            })
    });

module.exports = router;