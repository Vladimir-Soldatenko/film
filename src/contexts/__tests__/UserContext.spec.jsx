import { renderHook, act } from "@testing-library/react";
import jwtDecode from "jwt-decode";
import { useLogin, useLogout, UserContextProvider } from "contexts/UserContext";
import { setAuthorizationHeader } from "api";

const wrapper = ({ children }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

const mockToken = "12345";
jest.mock("jwt-decode", () => jest.fn());

jest.mock("api");

afterEach(() => {
  jest.resetAllMocks();
  delete localStorage.filmsToken;
});

test("useLogin should return function", async () => {
  jwtDecode.mockImplementation(() => ({ user: {} }));
  const { result } = renderHook(() => useLogin(), { wrapper });
  act(() => result.current(mockToken));

  expect(jwtDecode).toBeCalledTimes(1);
  expect(jwtDecode).toBeCalledWith(mockToken);

  expect(setAuthorizationHeader).toBeCalledTimes(1);
  expect(localStorage.filmsToken).toBe(mockToken);
});

test("useLogout remove token from localStorage", async () => {
  jwtDecode.mockImplementation(() => ({ user: {} }));
  const { result } = renderHook(() => useLogout(), { wrapper });

  localStorage.filmsToken = "12345";
  act(() => result.current());

  expect(setAuthorizationHeader).toBeCalledTimes(1);
  expect(localStorage.filmsToken).not.toBe(mockToken);
  expect(localStorage.filmsToken).toBe(undefined);
});
