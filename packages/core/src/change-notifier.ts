import { Listenable, VoidCallback } from './types';

export abstract class ChangeNotifier implements Listenable {
  private listeners: Set<VoidCallback>;

  constructor() {
    this.listeners = new Set();
  }

  get hasListeners(): boolean {
    return this.listeners.size > 0;
  }

  addListener(listener: VoidCallback): void {
    if (this.listeners.has(listener) === false) {
      this.listeners.add(listener);
    } else {
      throw new Error('listener already exists.');
    }
  }

  removeListener(listener: VoidCallback): void {
    if (this.listeners.has(listener)) {
      this.listeners.delete(listener);
    } else {
      throw new Error('listener does not exist.');
    }
  }

  dispose(): void {
    this.listeners.clear();
  }

  notifyListeners(): void {
    this.listeners.forEach((callback) => {
      callback();
    });
  }
}
