import crypto from 'crypto';
import { Transaction } from './Transaction';

class Block {
  public timestamp: number;

  public transactions: Transaction[];

  public previousHash: string;

  public nonce: number;

  public hash: string;

  public constructor ({ timestamp, transactions, previousHash }: {
    timestamp: number;
    transactions: Transaction[];
    previousHash: string;
  }) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.getHash();
  }

  public getHash (): string {
    const valueToBeHashed = `${this.timestamp}-${JSON.stringify(this.transactions)}-${this.previousHash}-${this.nonce}`;

    const hashAlgorithm = crypto.createHash('sha256');
    const hash = hashAlgorithm.update(valueToBeHashed).digest('hex');

    return hash;
  }

  public mine ({ difficulty }: {
    difficulty: number;
  }): void {
    const requiredPrefix = '0'.repeat(difficulty);

    while (!this.hash.startsWith(requiredPrefix)) {
      this.nonce += 1;
      this.hash = this.getHash();
    }
  }
}

export { Block };
