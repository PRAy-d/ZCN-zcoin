const port = process.argv[2];

var express = require('express')
var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Zlockchain = require('./zlockchain');
const praycoin = new Zlockchain();

const uuid = require('uuid/v1');
const nodeAddress = uuid().split('-').join('');

const rp = require('request-promise');
app.get('/', function (req, res) {
    res.send('Zlockchain bebe')
});

app.get('/zlockchain', function (req, res) {
    res.send(praycoin);
});

app.post('/transaction', function (req, res) {
    const newTransaction = req.body;
    const blockIndex = praycoin.addTransactionToPendingTransactions(newTransaction);
    res.json({
        note: `transaction will be added in block ${blockIndex}`
    });
});
app.post('/transaction/broadcast', function (req, res) {
    const newTransaction = praycoin.createNewTransaction(req.body.amount,
        req.body.sender, req.body.recipient);
    praycoin.addTransactionToPendingTransactions(newTransaction);

    const requestPromises = [];
    praycoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        }
        requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises)
        .then(data => {
            res.json({
                note: 'transaction created and broadcast successfully'
            })
        });
});

app.get('/mine', function (req, res) {
    const lastBlock = praycoin.getLastBlock();
    const prevBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: praycoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = praycoin.proofOfWork(prevBlockHash, currentBlockData);
    const blockHash = praycoin.hashBlock(prevBlockHash, currentBlockData, nonce);
    const newBlock = praycoin.createNewBlock(nonce, prevBlockHash, blockHash);

    res.json({
        note: "New Block mined successfully",
        block: newBlock
    });

    praycoin.createNewTransaction(1, "00", nodeAddress)
});

app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;

    if (praycoin.networkNodes.indexOf(newNodeUrl) == -1)
        praycoin.networkNodes.push(newNodeUrl);

    const regNodesPromises = [];
    praycoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl: newNodeUrl },
            json: true,
        }
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises)
        .then(data => {
            const bulkRegisterOptions = {
                uri: newNodeUrl + '/register-nodes-bulk',
                method: 'POST',
                body: {
                    allNetworkNodes: [...praycoin.networkNodes,
                    praycoin.currentNodeUrl]
                },
                json: true
            };
            return rp(bulkRegisterOptions);
        })
        .then(data => {
            res.json({ note: 'New Node registered with network successfully' });
        });
});

app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;

    const nodeNotAlreadyPresesnt = praycoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = praycoin.currentNodeUrl !== newNodeUrl;

    if (nodeNotAlreadyPresesnt && notCurrentNode)
        praycoin.networkNodes.push(newNodeUrl);

    res.json({ note: 'New Node registered successfully' });
});

app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresesnt = praycoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = praycoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresesnt && notCurrentNode)
            praycoin.networkNodes.push(networkNodeUrl);
    });
    res.json({ note: 'Bulk registration successful' });
});

app.listen(port, function () {
    console.log(`listening on port ${port}...`);
});