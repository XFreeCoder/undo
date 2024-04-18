import { atom } from 'jotai';
import { History, State, DefaultHistroy } from '@undo/core';

const historyAtom = atom<History<State>>(new DefaultHistroy<State>());
historyAtom.debugLabel = 'history';

const hasUndoAtom = atom<boolean>(false);
hasUndoAtom.debugLabel = 'hasUndo';

const hasRedoAtom = atom<boolean>(false);
hasRedoAtom.debugLabel = 'hasRedo';

export { historyAtom, hasUndoAtom, hasRedoAtom };
