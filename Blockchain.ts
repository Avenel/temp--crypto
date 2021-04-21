import { Block } from './Block';
import { Transaction } from './Transaction';

class Blockchain {
  public pendingTransactions: Transaction[];

  public chain: Block[];

  public difficulty: number;

  public constructor () {
    this.pendingTransactions = [];
    this.chain = [
      this.generateGenesisBlock()
    ];
    this.difficulty = 6;
  }

  private generateGenesisBlock (): Block {
    const genesisBlock = new Block({
      timestamp: Date.now(),
      transactions: [],
      previousHash: ''
    });

    return genesisBlock;
  }

  public addTransaction ({ transaction }: {
    transaction: Transaction;
  }): void {
    if (!transaction.isValid()) {
      throw new Error('Can not add invalid transactions.');
    }

    this.pendingTransactions.push(transaction);
  }

  public getLatestBlock (): Block {
    return this.chain[this.chain.length - 1];
  }

  public minePendingTransactions (): void {
    const block = new Block({
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      previousHash: this.getLatestBlock().hash
    });

    block.mine({ difficulty: this.difficulty });

    this.chain.push(block);
    this.pendingTransactions = [];
  }
}

export { Blockchain };
