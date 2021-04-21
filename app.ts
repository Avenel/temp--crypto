import { Blockchain } from './Blockchain';
import { Transaction } from './Transaction';

const blockchain = new Blockchain();

blockchain.addTransaction({
  transaction: new Transaction({ fromAddress: 'golo', toAddress: 'manuel', amount: 100 })
});

blockchain.minePendingTransactions();

blockchain.addTransaction({
  transaction: new Transaction({ fromAddress: 'golo', toAddress: 'manuel', amount: 50 })
});

blockchain.addTransaction({
  transaction: new Transaction({ fromAddress: 'manuel', toAddress: 'golo', amount: 40 })
});

blockchain.minePendingTransactions();

console.log(JSON.stringify(blockchain, null, 2));
