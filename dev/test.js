const Zlockchain = require('./zlockchain')
const praycoin = new Zlockchain();


const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1623326698100,
            "transactions": [],
            "nonce": 0,
            "hash": "0",
            "prevBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1623326727164,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "prevBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1623326740993,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "13739340c9e411eb9cdeb3ba4611d446",
                    "transactionId": "24c97100c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2a9cd5e0c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2adcc510c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2b22a7b0c9e411eb9cdeb3ba4611d446"
                }
            ],
            "nonce": 9475,
            "hash": "0000d81c5d6f111d354c011162dd0f47ec2a16d45bd6670093ac08d10038087e",
            "prevBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1623326745652,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "13739340c9e411eb9cdeb3ba4611d446",
                    "transactionId": "2d04d530c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2e44f650c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2e8337d0c9e411eb9cdeb3ba4611d446"
                },
                {
                    "amount": 2,
                    "sender": "sender1",
                    "recipient": "recipient4",
                    "transactionId": "2ec5bf10c9e411eb9cdeb3ba4611d446"
                }
            ],
            "nonce": 56100,
            "hash": "00005cd11ed7862f0aa8483c394f307d5adde944bd9cd048f6e1eeef24f80286",
            "prevBlockHash": "0000d81c5d6f111d354c011162dd0f47ec2a16d45bd6670093ac08d10038087e"
        },
        {
            "index": 5,
            "timestamp": 1623326753455,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "13739340c9e411eb9cdeb3ba4611d446",
                    "transactionId": "2fcb9650c9e411eb9cdeb3ba4611d446"
                }
            ],
            "nonce": 53167,
            "hash": "00007ec3b76db7f513ced6eb4c888dd383f37d5c43e185ac3ae714f76af005b2",
            "prevBlockHash": "00005cd11ed7862f0aa8483c394f307d5adde944bd9cd048f6e1eeef24f80286"
        },
        {
            "index": 6,
            "timestamp": 1623326753955,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "13739340c9e411eb9cdeb3ba4611d446",
                    "transactionId": "34723b00c9e411eb9cdeb3ba4611d446"
                }
            ],
            "nonce": 5958,
            "hash": "0000c14f74279fce6f8be9de4982e00ea2f44f4e4a0a310be735efe7554f4375",
            "prevBlockHash": "00007ec3b76db7f513ced6eb4c888dd383f37d5c43e185ac3ae714f76af005b2"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 100,
            "sender": "00",
            "recipient": "13739340c9e411eb9cdeb3ba4611d446",
            "transactionId": "34be8640c9e411eb9cdeb3ba4611d446"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
};




console.log('Valid:', praycoin.chainIsValid(bc1.chain));

