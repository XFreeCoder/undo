import { useAtomValue, Getter, WritableAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { hasRedoAtom, hasUndoAtom, historyAtom } from './store';
import { State, Transaction } from '@undo/core';

function useHasUndo() {
  return useAtomValue(hasUndoAtom);
}

function useHasRedo() {
  return useAtomValue(hasRedoAtom);
}

function useUndo() {
  return useAtomCallback((get) => {
    const history = get(historyAtom);
    const state = history.undo();
    state.undo();
  });
}

function useRedo() {
  return useAtomCallback((get) => {
    const history = get(historyAtom);
    const state = history.redo();
    state.redo();
  });
}

type Setter = <Value, Result>(
  atom: WritableAtom<Value, [Value], Result>,
  value: Value,
) => Result;

function useHistoryCallback<Result, Args extends unknown[]>(
  callback: (get: Getter, set: Setter, ...args: Args) => Result,
  options?: any,
): (...args: Args) => Result {
  return useAtomCallback<Result, Args>((get, set, ...args) => {
    const undoTransaction: Transaction = new Transaction();
    const redoTransaction: Transaction = new Transaction();
    const setWithHistory: Setter = (atom, value) => {
      const prevValue = get(atom);
      const undo = () => {
        set(atom, prevValue);
      };
      const redo = () => {
        set(atom, value);
      };

      undoTransaction.push(undo);
      redoTransaction.push(redo);
      return set(atom, value);
    };
    const result = callback(get, setWithHistory, ...args);
    const state: State = {
      undo: undoTransaction.reverse().commit(),
      redo: redoTransaction.commit(),
    };
    const history = get(historyAtom);
    history.push(state);
    return result;
  }, options);
}

export { useHasUndo, useHasRedo, useUndo, useRedo, useHistoryCallback };
