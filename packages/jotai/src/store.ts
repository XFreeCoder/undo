import { atom, getDefaultStore, Getter } from 'jotai';
import { History, State, DefaultHistory } from '@undo/core';
import { Store } from './types';

const historyAtom = atom<History<State> | null>(null);
historyAtom.debugLabel = 'history';

const hasUndoAtom = atom<boolean>(false);
hasUndoAtom.debugLabel = 'hasUndo';

const hasRedoAtom = atom<boolean>(false);
hasRedoAtom.debugLabel = 'hasRedo';

function getHisotry(get: Getter) {
  const history = get(historyAtom);

  if (history === null) {
    throw new Error(
      'History is not initialized, Please call initHistory() first. If you are using React, you can call useHistory() instead.',
    );
  }

  return history;
}

function initHistory(store: Store, history: History<State>) {
  store.set(historyAtom, history);
  store.set(hasUndoAtom, history.hasUndo);
  store.set(hasRedoAtom, history.hasRedo);

  const listener = () => {
    store.set(hasUndoAtom, history.hasUndo);
    store.set(hasRedoAtom, history.hasRedo);
  };
  history.addListener(listener);

  return () => {
    history.removeListener(listener);
  };
}

initHistory(getDefaultStore(), new DefaultHistory());

export { hasUndoAtom, hasRedoAtom, initHistory, getHisotry };
