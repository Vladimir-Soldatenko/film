import { renderHook, act } from "@testing-library/react";
import cases from "jest-in-case";
import useCounter from "counter/useCounter";

cases(
  "useCounter",
  ({ step, initialCount, postIncrement, postDecrement }) => {
    const { result } = renderHook(useCounter, {
      initialProps: { initialCount, step },
    });

    act(() => result.current.increment());
    expect(result.current.count).toBe(postIncrement);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(postDecrement);
  },
  {
    basic: {
      postIncrement: 1,
      postDecrement: 0,
    },
    initCount: {
      initialCount: 2,
      postIncrement: 3,
      postDecrement: 2,
    },
    step: {
      step: 2,
      postIncrement: 2,
      postDecrement: 0,
    },
    "init count and step": {
      initialCount: 5,
      step: 2,
      postIncrement: 7,
      postDecrement: 5,
    },
  }
);

/* 
cases( 
  "Name_test",
  ({arg1, arg2, ....}) => {test},
  {case1: {....}, case2: {....}}
) */
