import { MemoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export function renderWithClient(ui) {
  const queryClient = new QueryClient();
  const { rerender, ...result } = render(
    <Router>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Router>
  );
  return {
    ...result,
    rerender: (rerenderUi) =>
      rerender(
        <Router>
          <QueryClientProvider client={queryClient}>
            {rerenderUi}
          </QueryClientProvider>
        </Router>
      ),
  };
}

export function createWrapper() {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <Router>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Router>
  );
}
