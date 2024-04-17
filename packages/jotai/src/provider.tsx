import { Provider, useStore } from 'jotai';
import { ReactNode, useLayoutEffect } from 'react';
import { historyAtom, historyStore, hasUndoAtom, hasRedoAtom } from './store';
import { DefaultHistroy, type History, type State } from '@undo/core';

type Props = {
  history?: History<State>;
  children: ReactNode;
};

function InitHistory({ history = new DefaultHistroy(), children }: Props) {
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

export function HistoryProvider(props: Props) {
  return (
    <Provider store={historyStore}>
      <InitHistory {...props} />
    </Provider>
  );
}
