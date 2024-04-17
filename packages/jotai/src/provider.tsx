import { Provider, useStore } from 'jotai';
import { ReactNode, useLayoutEffect } from 'react';
import { historyAtom, historyStore, hasUndoAtom, hasRedoAtom } from './store';
import type { History, State } from '@undo/core';

function InitHistory({
  history,
  children,
}: {
  history: History<State>;
  children: ReactNode;
}) {
  const store = useStore();

  useLayoutEffect(() => {
    store.set(historyAtom, history);
    const listener = () => {
      store.set(hasUndoAtom, history.hasUndo);
      store.set(hasRedoAtom, history.hasRedo);
    };
    history.addListener(listener);
    return () => {
      history.removeListener(listener);
    };
  }, [history, store]);

  return <>{children}</>;
}

export function HistoryProvider(props: {
  history: History<State>;
  children: ReactNode;
}) {
  return (
    <Provider store={historyStore}>
      <InitHistory {...props} />
    </Provider>
  );
}
