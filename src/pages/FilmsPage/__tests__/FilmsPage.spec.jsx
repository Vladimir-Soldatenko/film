import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { server, rest } from "test/server";
import FilmsPage from "pages/FilmsPage";
import { AppProviders } from "contexts";

jest.mock("contexts/UserContext", () => ({
  ...jest.requireActual("contexts/UserContext"),
  useIsAuth: () => ({ isAdmin: true }),
}));

test("should render admin buttons", async () => {
  render(<FilmsPage />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));
  const adminButtons = await screen.findByRole("button", {
    name: /admin-buttons/i,
  });
  expect(adminButtons).toBeInTheDocument();
});

test("should render spinner", async () => {
  server.use(
    rest.get("/api/authfilms", async (req, res, ctx) => {
      return res(ctx.json({ films: [] }));
    })
  );
  render(<FilmsPage />, { wrapper: AppProviders });
  await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));
  expect(screen.getByLabelText("message")).toBeInTheDocument();
});
