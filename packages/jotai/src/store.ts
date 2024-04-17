import { atom, createStore } from 'jotai';
import { History, State, DefaultHistroy } from '@undo/core';

const historyAtom = atom<History<State>>(new DefaultHistroy<State>());

const hasUndoAtom = atom<boolean>(false);

const hasRedoAtom = atom<boolean>(false);

const historyStore = createStore();

historyStore.set(historyAtom, new DefaultHistroy<State>());
historyStore.set(hasUndoAtom, false);
historyStore.set(hasRedoAtom, false);

export { historyAtom, hasUndoAtom, hasRedoAtom, historyStore };
