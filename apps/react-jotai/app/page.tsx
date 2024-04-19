import { HStack } from '@repo/ui';
import { Playground } from './playground';
import { Provider } from 'jotai';

export default function Page(): JSX.Element {
  return (
    <main>
      <HStack h="full">
        <Playground />
        <Provider>
          <Playground />
        </Provider>
      </HStack>
    </main>
  );
}
