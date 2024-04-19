import { useAtomValue, Getter, useStore } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { DefaultHistory, History, State, Transaction } from '@undo/core';
import { useLayoutEffect, useCallback } from 'react';
import { hasRedoAtom, hasUndoAtom, historyAtom, initStore } from './store';
import {
  UseAtomValueOptions,
  UseAtomCallbackOptions,
  UseHistoryCallbackSetter,
} from './types';

function useHasUndo(options?: UseAtomValueOptions) {
  return useAtomValue(hasUndoAtom, options);
}

function useHasRedo(options?: UseAtomValueOptions) {
  return useAtomValue(hasRedoAtom, options);
}

function useUndo(options?: UseAtomCallbackOptions) {
  return useAtomCallback(
    useCallback((get) => {
      const history = get(historyAtom);
      const state = history.undo();
      state.undo();
    }, []),
    options,
  );
}

function useRedo(options?: UseAtomCallbackOptions) {
  return useAtomCallback(
    useCallback((get) => {
      const history = get(historyAtom);
      const state = history.redo();
      state.redo();
    }, []),
    options,
  );
}

function useClear(options?: UseAtomCallbackOptions) {
  return useAtomCallback(
    useCallback((get) => {
      const history = get(historyAtom);
      history.clear();
    }, []),
    options,
  );
}

function useHistory(history?: History<State>) {
  const store = useStore();
  useLayoutEffect(() => {
    initStore(store, history || new DefaultHistory());
  }, [store, history]);
}

/* eslint-disable no-unused-vars */
function useHistoryCallback<Result, Args extends unknown[]>(
  callback: (
    get: Getter,
    set: UseHistoryCallbackSetter,
    ...args: Args
  ) => Result,
  options?: UseAtomCallbackOptions,
): (...args: Args) => Result {
  return useAtomCallback<Result, Args>((get, set, ...args) => {
    const undoTransaction = new Transaction();
    const redoTransaction = new Transaction();
    const setWithHistory: UseHistoryCallbackSetter = (atom, value) => {
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

export {
  useHasUndo,
  useHasRedo,
  useUndo,
  useRedo,
  useClear,
  useHistory,
  useHistoryCallback,
};
