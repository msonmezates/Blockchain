const sha256 = require('sha256');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    // create the genesis block(first block in blockchain)
    this.createNewBlock(100, '0', '0'); // give some arbitrary values
  }
  // Each block will be stored in newBlock object
  createNewBlock (nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce, // an arbitrary number that can only be used once
      hash, // all transactions will be compressed into a single string 
      previousBlockHash
    };
    this.pendingTransactions = []; // make sure to clear the transactions 
    this.chain.push(newBlock);

    return newBlock;
  }
  
  getLastBlock () {
    return this.chain[this.chain.length-1];
  }

  createNewTransaction (amount, sender, recipient) {
    const newTransaction = {
      amount,
      sender,
      recipient
    };
    this.pendingTransactions.push(newTransaction);
    // return number of the block
    return this.getLastBlock()['index'] + 1;
  }

  hashBlock (previousBlockHash, currentBlockData, nonce) {
    // combine previous hash with nonce and current block(make sure to convert the object into a string)
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData); //nonce was initially number so convert it to a string
    const hash = sha256(dataAsString);
    return hash;
  }

  proofOfWork (previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    while(hash.substring(0,4) !== '0000') { // we want 0000whatever for our proof of work
      nonce++; // increase nonce and run function until it hits the condition
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
      console.log(hash);
    }

    return nonce;
  }
}
module.exports = Blockchain;