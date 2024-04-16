import { LinkedList } from "./linked-list";
import type { History, List } from "./types";

export class DefaultHistroy<State> implements History<State> {
  private undoStack: List<State>;
  private redoStack: List<State>;
  private readonly limit: number;

  constructor(
    undoStack: List<State> = new LinkedList(),
    redoStack: List<State> = new LinkedList(),
    limit = 100,
  ) {
    this.undoStack = undoStack;
    this.redoStack = redoStack;
    this.limit = limit;
  }

  undo(): State {
    if (this.isUndoStackEmpty()) {
      throw new Error("No more undo history");
    }
    const state = this.undoStack.pop();
    this.redoStack.push(state);
    return state;
  }

  redo(): State {
    if (this.isRedoStackEmpty()) {
      throw new Error("No more redo history");
    }
    const state = this.redoStack.pop();
    this.undoStack.push(state);
    return state;
  }

  push(state: State): void {
    if (this.undoStack.size() > this.limit) {
      this.undoStack.shift();
    }
    this.undoStack.push(state);
    this.redoStack.clear();
  }

  undoStackSize(): number {
    return this.undoStack.size();
  }

  isUndoStackEmpty(): boolean {
    return this.undoStack.isEmpty();
  }

  redoStackSize(): number {
    return this.redoStack.size();
  }

  isRedoStackEmpty(): boolean {
    return this.redoStack.isEmpty();
  }
}
