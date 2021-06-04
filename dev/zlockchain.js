function Zlockchain() {
    this.chain = [];
    this.newTransactions = [];
}
Zlockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions,
        nonce: nonce,
        hash: hash,
        prevBlockHash: prevBlockHash,
    };
    this.newTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}
module.exports = Zlockchain;