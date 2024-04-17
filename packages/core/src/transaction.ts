import { VoidCallback } from './types';

export class Transaction {
  private operations: VoidCallback[];

  constructor() {
    this.operations = [];
  }

  push(callback: VoidCallback) {
    this.operations.push(callback);
    return this;
  }

  reverse() {
    this.operations.reverse();
    return this;
  }

  commit() {
    return () => {
      this.operations.forEach((fn) => fn());
    };
  }
}
