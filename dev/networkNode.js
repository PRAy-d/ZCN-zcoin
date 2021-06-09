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


app.get('/', function (req, res) {
    res.send('Zlockchain bebe')
});

app.get('/zlockchain', function (req, res) {
    res.send(praycoin);
});

app.post('/transaction', function (req, res) {
    const blockIndex = praycoin.createNewTransaction(req.body.amount,
        req.body.sender, req.body.recipient)
    res.json({
        note: `transaction will be added in block ${blockIndex}`
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

app.listen(port, function () {
    console.log(`listening on port ${port}...`);
});