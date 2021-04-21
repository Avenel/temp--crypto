import crypto from 'crypto';

class Transaction {
  public fromAddress: string;

  public toAddress: string;

  public amount: number;

  public timestamp: number;

  public constructor ({ fromAddress, toAddress, amount }: {
    fromAddress: string;
    toAddress: string;
    amount: number;
  }) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  public getHash (): string {
    const valueToBeHashed = `${this.fromAddress}-${this.toAddress}-${this.amount}-${this.timestamp}`;

    const hashAlgorithm = crypto.createHash('sha256');
    const hash = hashAlgorithm.update(valueToBeHashed).digest('hex');

    return hash;
  }
}

export { Transaction };
