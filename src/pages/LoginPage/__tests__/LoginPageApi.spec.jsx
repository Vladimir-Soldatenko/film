import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import { UserContextProvider } from "contexts/UserContext";
import users from "test/users";

const fakeData = { email: "u4@com.ua", password: "secret" };
const mockToken = users[0].token;

const mockLogin = jest.fn();
jest.mock("contexts/UserContext", () => ({
  useLogin: () => mockLogin,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("onChange  should change email and password elements", async () => {
  render(
    <Router>
      <LoginPage />
    </Router>,
    { wrapper: UserContextProvider }
  );

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  await userEvent.type(emailEl, fakeData.email);
  await userEvent.type(passwordEl, fakeData.password);
  await userEvent.click(btnEl);

  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith(mockToken);

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/films");
});
