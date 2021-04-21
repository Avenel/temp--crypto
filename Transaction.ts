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
    if (!fromAddress || !toAddress) {
      throw new Error('From address and to address must be given.');
    }
    if (fromAddress === toAddress) {
      throw new Error('Can not send money to yourself.');
    }
    if (amount <= 0) {
      throw new Error('Amount must be positive.');
    }

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

  public isValid (): boolean {
    // TODO: Add some validation logic here, including verifying the hash to ensure
    //       that the transaction has not been tampered with.

    return true;
  }
}

export { Transaction };
