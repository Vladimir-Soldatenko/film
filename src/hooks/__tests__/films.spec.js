import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useLoadFilms, useSaveFilm } from "hooks/films";
import films from "test/films";

const queryClient = new QueryClient();
const wrapper = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("should load all films", async () => {
  const { result } = renderHook(() => useLoadFilms(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(films);
});

test.skip("should correct update", () => {});

test.skip("should correct create", () => {});
