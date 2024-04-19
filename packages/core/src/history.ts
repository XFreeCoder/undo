import { ChangeNotifier } from './change-notifier';
import { LinkedList } from './list';
import type { History, List } from './types';

export class DefaultHistory<State>
  extends ChangeNotifier
  implements History<State>
{
  private undoStack: List<State>;
  private redoStack: List<State>;
  private readonly limit: number;

  constructor(
    undoStack: List<State> = new LinkedList(),
    redoStack: List<State> = new LinkedList(),
    limit = 100,
  ) {
    super();
    this.undoStack = undoStack;
    this.redoStack = redoStack;
    this.limit = limit;
  }

  undo(): State {
    if (this.undoStack.isEmpty) {
      throw new Error('No more undo history.');
    }
    const state = this.undoStack.pop();
    this.redoStack.push(state);
    this.notifyListeners();
    return state;
  }

  redo(): State {
    if (this.redoStack.isEmpty) {
      throw new Error('No more redo history.');
    }
    const state = this.redoStack.pop();
    this.undoStack.push(state);
    this.notifyListeners();
    return state;
  }

  push(state: State): void {
    if (this.undoStack.size >= this.limit) {
      this.undoStack.shift();
    }
    this.undoStack.push(state);
    this.redoStack.clear();
    this.notifyListeners();
  }

  clear(): void {
    this.undoStack.clear();
    this.redoStack.clear();
    this.notifyListeners();
  }

  get hasUndo(): boolean {
    return this.undoStack.isEmpty === false;
  }

  get hasRedo(): boolean {
    return this.redoStack.isEmpty === false;
  }
}
