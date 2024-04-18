'use client';

import { HStack } from '@repo/ui';
import { Playground } from './playground';
import { DefaultHistroy } from '@undo/jotai';

const myHistory = new DefaultHistroy(undefined, undefined, 20);

export default function Page(): JSX.Element {
  return (
    <main>
      <HStack h="full">
        <Playground />
        <Playground />
        <Playground history={myHistory} />
      </HStack>
    </main>
  );
}
