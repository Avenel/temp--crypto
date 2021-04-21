import { Block } from './Block';
import { Transaction } from './Transaction';

class Blockchain {
  public chain: Block[];

  public constructor () {
    this.chain = [];
  }

  public addTransaction ({ transaction }: {
    transaction: Transaction;
  }): void {
    // ...
  }
}

export { Blockchain };
