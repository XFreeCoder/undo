'use client';

import {
  useHasRedo,
  useHasUndo,
  useHistory,
  useHistoryCallback,
  useRedo,
  useUndo,
} from '@xfreecoder/undo/jotai';
import { Button, ButtonGroup, Center, Container, Stack, Text } from '@repo/ui';
import { atom, useAtomValue } from 'jotai';

const countAtom = atom(0);
countAtom.debugLabel = 'count';

function useIncrement() {
  return useHistoryCallback((get, set) => {
    const count = get(countAtom);
    set(countAtom, count + 1);
  });
}

function useDecrement() {
  return useHistoryCallback((get, set) => {
    const count = get(countAtom);
    set(countAtom, count - 1);
  });
}

function UndoButton() {
  const undo = useUndo();
  const hasUndo = useHasUndo();

  return (
    <Button isDisabled={!hasUndo} onClick={undo}>
      Undo
    </Button>
  );
}

function RedoButton() {
  const redo = useRedo();
  const hasRedo = useHasRedo();

  return (
    <Button isDisabled={!hasRedo} onClick={redo}>
      Redo
    </Button>
  );
}

function IncrementButton() {
  const increment = useIncrement();

  return <Button onClick={increment}>+</Button>;
}

function DecrementButton() {
  const decrement = useDecrement();

  return <Button onClick={decrement}>-</Button>;
}

function Counter() {
  const count = useAtomValue(countAtom);

  return <Text>{count}</Text>;
}

export function Playground(): JSX.Element {
  useHistory();

  return (
    <Container h="full">
      <Center h="full">
        <Stack>
          <Counter />
          <ButtonGroup>
            <DecrementButton />
            <IncrementButton />
          </ButtonGroup>
          <ButtonGroup>
            <UndoButton />
            <RedoButton />
          </ButtonGroup>
        </Stack>
      </Center>
    </Container>
  );
}
