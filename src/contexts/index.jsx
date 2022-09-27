import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserContextProvider } from "contexts/UserContext";
import { FilmsContextProvider } from "contexts/FilmContext";

export const queryConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryConfig);

function AppProviders({ children }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <FilmsContextProvider>
            {children}
            <ReactQueryDevtools />
          </FilmsContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Router>
  );
}

export { AppProviders };
