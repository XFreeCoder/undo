import { beforeEach, expect, test } from 'vitest';
import { LinkedList, List } from '../src';

let list: List<number>;

beforeEach(() => {
  list = new LinkedList();
});

test('pop empty list should throw error', () => {
  expect(() => list.pop()).toThrowError('The list is empty.');
});

test('push then pop', () => {
  list.push(1);
  list.push(2);
  expect(list.pop()).toBe(2);
  expect(list.pop()).toBe(1);
});

test('shift empty list should throw error', () => {
  expect(() => list.shift()).toThrowError('The list is empty.');
});

test('unshift then shift', () => {
  list.unshift(1);
  list.unshift(2);
  expect(list.shift()).toBe(2);
  expect(list.shift()).toBe(1);
});

test('unshift then pop ', () => {
  list.unshift(1);
  list.unshift(2);
  expect(list.pop()).toBe(1);
  expect(list.pop()).toBe(2);
});

test('push then shift', () => {
  list.push(1);
  list.push(2);
  expect(list.shift()).toBe(1);
  expect(list.shift()).toBe(2);
});

test('isEmpty should return true for empty list', () => {
  expect(list.isEmpty).toBeTruthy();
});

test('isEmpty should return false for non-empty list', () => {
  list.push(1);
  expect(list.isEmpty).toBeFalsy();
});

test('isEmpty should return true after clear', () => {
  list.push(1);
  list.unshift(2);
  expect(list.isEmpty).toBeFalsy();
  list.clear();
  expect(list.isEmpty).toBeTruthy();
});

test('should return correct size', () => {
  expect(list.size).toBe(0);

  list.push(1);
  expect(list.size).toBe(1);

  list.unshift(2);
  list.push(3);
  expect(list.size).toBe(3);

  list.pop();
  expect(list.size).toBe(2);

  list.shift();
  expect(list.size).toBe(1);

  list.clear();
  expect(list.size).toBe(0);
});
