import { beforeEach, expect, test } from "vitest";
import { DefaultHistroy, History, LinkedList } from "../src";

let history: History<number>;

beforeEach(() => {
  history = new DefaultHistroy();
});

test("undo empty history should throw error", () => {
  expect(() => history.undo()).toThrowError("No more undo history.");
});

test("redo empty history should throw error", () => {
  expect(() => history.redo()).toThrowError("No more redo history.");
});

test("should return correct undo/redo state", () => {
  history.push(1);
  history.push(2);
  expect(history.undo()).toBe(2);
  expect(history.redo()).toBe(2);
  expect(history.undo()).toBe(2);

  history.push(3);
  expect(history.undo()).toBe(3);
  expect(history.undo()).toBe(1);
});

test("should return correct undo/redo stack size", () => {
  expect(history.undoStackSize()).toBe(0);
  expect(history.redoStackSize()).toBe(0);

  history.push(1);
  expect(history.undoStackSize()).toBe(1);
  expect(history.redoStackSize()).toBe(0);

  history.push(2);
  expect(history.undoStackSize()).toBe(2);
  expect(history.redoStackSize()).toBe(0);

  history.undo();
  expect(history.undoStackSize()).toBe(1);
  expect(history.redoStackSize()).toBe(1);

  history.redo();
  expect(history.undoStackSize()).toBe(2);
  expect(history.redoStackSize()).toBe(0);

  history.undo();
  history.undo();
  expect(history.undoStackSize()).toBe(0);
  expect(history.redoStackSize()).toBe(2);

  history.push(3);
  expect(history.undoStackSize()).toBe(1);
  expect(history.redoStackSize()).toBe(0);
});

test("isUndoStackEmpty should return true after undo the last state", () => {
  history.push(1);
  history.undo();
  expect(history.isUndoStackEmpty()).toBeTruthy();
});

test("isUndoStackEmpty should return false after push a new state", () => {
  history.push(1);
  expect(history.isUndoStackEmpty()).toBeFalsy();
});

test("isRedoStackEmpty should return true after redo the last state", () => {
  history.push(1);
  history.undo();
  history.redo();
  expect(history.isRedoStackEmpty()).toBeTruthy();
});

test("isRedoStackEmpty should return false after undo", () => {
  history.push(1);
  history.undo();
  expect(history.isRedoStackEmpty()).toBeFalsy();
});

test("limit should work correctly", () => {
  history = new DefaultHistroy(new LinkedList(), new LinkedList(), 2);
  history.push(1);
  history.push(2);
  history.push(3);
  history.push(4);
  expect(history.undoStackSize()).toBe(2);
  expect(history.undo()).toBe(4);
  expect(history.undo()).toBe(3);
});
