import { beforeEach, expect, test, vi } from 'vitest';
import { ChangeNotifier, VoidCallback } from '../src';

class Notifier extends ChangeNotifier {}

let notifier: Notifier;
let listener: VoidCallback;

beforeEach(() => {
  notifier = new Notifier();
  listener = vi.fn();
});

test('hasListeners should return correct value', () => {
  expect(notifier.hasListeners).toBeFalsy();
  notifier.addListener(listener);
  expect(notifier.hasListeners).toBeTruthy();
});

test('add a existing listener should not throw an error', () => {
  notifier.addListener(listener);
  expect(() => notifier.addListener(listener)).toThrowError(
    'listener already exists.',
  );
});

test('remove a non-existing listener should not throw an error', () => {
  expect(() => notifier.removeListener(listener)).toThrowError(
    'listener does not exist.',
  );
});

test('addListener and removeListener should work correctly', () => {
  expect(notifier.hasListeners).toBeFalsy();
  notifier.addListener(listener);
  expect(notifier.hasListeners).toBeTruthy();
  notifier.removeListener(listener);
  expect(notifier.hasListeners).toBeFalsy();
});

test('notifyListeners should work correctly', () => {
  notifier.addListener(listener);
  notifier.notifyListeners();
  expect(listener).toHaveBeenCalledTimes(1);

  notifier.notifyListeners();
  notifier.notifyListeners();
  expect(listener).toHaveBeenCalledTimes(3);
});

test('dispose should work correctly', () => {
  notifier.addListener(listener);
  expect(notifier.hasListeners).toBeTruthy();
  notifier.dispose();
  expect(notifier.hasListeners).toBeFalsy();
});
