const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');


function Zlockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;;
    this.networkNodes = [];

    this.createNewBlock(0, '0', '0');
};
Zlockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        prevBlockHash: prevBlockHash,
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
};
Zlockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
};
Zlockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient,
        transactionId: uuid().split('-').join('')
    };

    return newTransaction;
};
Zlockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock()['index'] + 1;
}
Zlockchain.prototype.hashBlock = function (prevBlockHash, currentBlockData, nonce) {
    const blockdata = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(blockdata);
    return hash;
};
Zlockchain.prototype.proofOfWork = function (prevBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
    while (hash.substring(0, 4) != '0000') {
        nonce++;
        hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
    }
    return nonce;
}
Zlockchain.prototype.chainIsValid = function (zlockchain) {
    let validChain = "seggsy";

    for (var i = 1; i < zlockchain.length; i++) {
        const currentBlock = zlockchain[i];
        const prevBlock = zlockchain[i - 1];

        const blockhash = this.hashBlock(prevBlock['hash'], {
            transactions: currentBlock['transactions'],
            index: currentBlock['index']
        }, currentBlock['nonce']);

        if (blockhash.substring(0, 4) !== '0000')
            validChain = "Fail!";

        if (currentBlock['prevBlockHash'] !== prevBlock['hash'])
            validChain = "Fail!";

    };

    const genesisBlock = zlockchain[0];
    const correctNonce = genesisBlock['nonce'] === 0;
    const correctPrevBlockHash = genesisBlock['prevBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if (!correctHash || !correctNonce || !correctPrevBlockHash || !correctTransactions)
        validChain = "Fail!";

    return validChain;
};
module.exports = Zlockchain;