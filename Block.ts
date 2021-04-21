import { Transaction } from './Transaction';

class Block {
  public timestamp: number;

  public transactions: Transaction[];

  public constructor ({ timestamp, transactions }: {
    timestamp: number;
    transactions: Transaction[];
  }) {
    this.timestamp = timestamp;
    this.transactions = transactions;
  }
}

export { Block };
