const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const previousBlockHash = '9TR0FDSNJFBSDJF';
const currentBlockData = [
  {
    amount: 101,
    sender: 'NF234FSDFFSFSA',
    recipient: '645VBDVBD'
  },
  {
    amount: 30,
    sender: 'FDSFC34FSDFFSFS',
    recipient: 'KIUYK645VBDVBD'
  },
  {
    amount: 200,
    sender: '12BDNF234FSDFFSFS',
    recipient: 'NFBS645VBDVBD'
  },
];

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData));

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 17095))