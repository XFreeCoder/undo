import { beforeEach, expect, test, vi } from 'vitest';
import { DefaultHistory, History, LinkedList } from '../src';

let history: History<number>;

beforeEach(() => {
  history = new DefaultHistory();
});

test('undo empty history should throw error', () => {
  expect(() => history.undo()).toThrowError('No more undo history.');
});

test('redo empty history should throw error', () => {
  expect(() => history.redo()).toThrowError('No more redo history.');
});

test('should return correct undo/redo state', () => {
  history.push(1);
  history.push(2);
  expect(history.undo()).toBe(2);
  expect(history.redo()).toBe(2);
  expect(history.undo()).toBe(2);

  history.push(3);
  expect(history.undo()).toBe(3);
  expect(history.undo()).toBe(1);
});

test('hasUndo should return false after undo the last state', () => {
  history.push(1);
  history.undo();
  expect(history.hasUndo).toBeFalsy();
});

test('hasUndo should return true after push a new state', () => {
  history.push(1);
  expect(history.hasUndo).toBeTruthy();
});

test('hasRedo should return false after redo the last state', () => {
  history.push(1);
  history.undo();
  history.redo();
  expect(history.hasRedo).toBeFalsy();
});

test('hasRedo should return true after undo', () => {
  history.push(1);
  history.undo();
  expect(history.hasRedo).toBeTruthy();
});

test('limit should work correctly', () => {
  history = new DefaultHistory(new LinkedList(), new LinkedList(), 2);
  history.push(1);
  history.push(2);
  history.push(3);
  history.push(4);
  expect(history.undo()).toBe(4);
  expect(history.undo()).toBe(3);
  expect(history.hasUndo).toBeFalsy();
});

test('change state should notifier listener', () => {
  const listener = vi.fn();
  history.addListener(listener);
  history.push(1);
  expect(listener).toHaveBeenCalledTimes(1);

  history.push(2);
  history.undo();
  history.redo();
  history.clear();
  expect(listener).toHaveBeenCalledTimes(5);
});
