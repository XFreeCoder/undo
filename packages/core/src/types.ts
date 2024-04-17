/* eslint-disable no-unused-vars */

type VoidCallback = () => void;

interface Listenable {
  /**
   * @description Register a closure to be called when the object notifies its listeners.
   */
  addListener(listener: VoidCallback): void;

  /**
   * @description Remove a previously registered closure from the list of closures that the
   * object notifies.
   */
  removeListener(listener: VoidCallback): void;
}

interface History<State> extends Listenable {
  undo(): State;
  redo(): State;
  push(state: State): void;
  clear(): void;
  get hasUndo(): boolean;
  get hasRedo(): boolean;
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
  get size(): number;

  /**
   * @description returns whether the list is empty
   */
  get isEmpty(): boolean;
}

interface State {
  undo: VoidCallback;
  redo: VoidCallback;
}

export type { Listenable, History, List, State, VoidCallback };
