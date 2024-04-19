/* eslint-disable no-unused-vars */
import { useStore, WritableAtom } from 'jotai';

type Store = ReturnType<typeof useStore>;

type UseAtomCallbackOptions = Parameters<typeof useStore>[0];

type UseAtomValueOptions = UseAtomCallbackOptions & { delay?: number };

type UseHistoryCallbackSetter = <Value, Result>(
  atom: WritableAtom<Value, [Value], Result>,
  value: Value,
) => Result;

export type {
  Store,
  UseAtomCallbackOptions,
  UseAtomValueOptions,
  UseHistoryCallbackSetter,
};
