import { HStack } from '@repo/ui';
import { Playground } from './playground';

export default function Page(): JSX.Element {
  return (
    <main>
      <HStack h="full">
        <Playground />
        <Playground />
      </HStack>
    </main>
  );
}
