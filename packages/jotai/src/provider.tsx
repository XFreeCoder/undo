import { Provider, createStore } from 'jotai';
import { ReactNode, useMemo } from 'react';
import { DefaultHistory, type History, type State } from '@undo/core';
import { historyAtom, hasUndoAtom, hasRedoAtom } from './store';

type Props = {
  history?: History<State>;
  children: ReactNode;
};

export function HistoryProvider({ history, children }: Props) {
  const store = useMemo(() => {
    const store = createStore();

    store.sub(historyAtom, () => {
      const history = store.get(historyAtom);
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
    });

    const innerHistory = history || new DefaultHistory();
    store.set(historyAtom, innerHistory);

    return store;
  }, [history]);

  return <Provider store={store}>{children}</Provider>;
}
