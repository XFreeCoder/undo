import { atom, getDefaultStore } from 'jotai';
import { History, State, DefaultHistory } from '@undo/core';
import { Store } from './types';

const history: History<State> = new DefaultHistory();

const historyAtom = atom<History<State>>(history);
historyAtom.debugLabel = 'history';

const hasUndoAtom = atom<boolean>(false);
hasUndoAtom.debugLabel = 'hasUndo';

const hasRedoAtom = atom<boolean>(false);
hasRedoAtom.debugLabel = 'hasRedo';

function initStore(store: Store, history: History<State>) {
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

initStore(getDefaultStore(), history);

export { historyAtom, hasUndoAtom, hasRedoAtom, initStore };
