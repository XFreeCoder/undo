/* eslint-disable no-unused-vars */

interface History<State> {
  undo(): State;
  redo(): State;
  push(state: State): void;
  undoStackSize(): number;
  isUndoStackEmpty(): boolean;
  redoStackSize(): number;
  isRedoStackEmpty(): boolean;
}

interface List<T> {
  /**
   * @description remove the last element from the list and returns that element.
   */
  pop(): T;

  /**
   * @description add the specified element to the end of the list.
   */
  push(value: T): void;

  /**
   * @description remove the first element from the list and returns that removed element.
   */
  shift(): T;

  /**
   * @description add the specified element to the beginning of the list.
   */
  unshift(value: T): void;

  /**
   * @description remove all elements from the list
   */
  clear(): void;

  /**
   * @description returns the number of elements in the list
   */
  size(): number;

  /**
   * @description returns whether the list is empty
   */
  isEmpty(): boolean;
}

interface Transaction {
  commit(): void;
}

interface State {
  undo: Transaction;
  redo: Transaction;
}

export type { History, List, Transaction, State };
