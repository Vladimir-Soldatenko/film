import { renderHook, act } from "@testing-library/react";
import useCounter from "counter/useCounter";

test("useCounter", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(1);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});

test("allows customization of the inital state", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 3 },
  });
  expect(result.current.count).toBe(3);

  act(() => result.current.increment());
  expect(result.current.count).toBe(4);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(3);
});

test("allows customizate step", () => {
  const { result } = renderHook(useCounter, {
    initialProps: { step: 3 },
  });
  expect(result.current.count).toBe(0);

  act(() => result.current.increment());
  expect(result.current.count).toBe(3);

  act(() => result.current.decrement());
  expect(result.current.count).toBe(0);
});
