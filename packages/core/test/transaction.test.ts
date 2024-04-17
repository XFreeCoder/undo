import { beforeEach, expect, test } from 'vitest';
import { Transaction } from '../src';

let transaction: Transaction;

beforeEach(() => {
  transaction = new Transaction();
});

test('commit should work', () => {
  let result = '';
  const appendA = () => (result += 'a');
  const appendB = () => (result += 'b');

  const run = transaction
    .push(appendA)
    .push(appendB)
    .push(appendB)
    .push(appendA)
    .commit();
  run();
  expect(result).toBe('abba');
});

test('reverse should work', () => {
  let result = '';
  const appendA = () => (result += 'a');
  const appendB = () => (result += 'b');

  const run = transaction
    .push(appendA)
    .push(appendB)
    .push(appendA)
    .push(appendB)
    .reverse()
    .commit();
  run();

  expect(result).toBe('baba');
});
