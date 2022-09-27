import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import LoginForm from "pages/LoginPage/components/LoginForm";
import { faker } from "@faker-js/faker";
import { build, perBuild, oneOf } from "@jackfranklin/test-data-bot";

const buildFormData = build({
  fields: {
    email: oneOf("u1@com.ua", "u2@com.ua"),
    password: perBuild(() => faker.internet.password()),
  },
});

test("onChange  should change email and password elements", async () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );

  const { email, password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  fireEvent.change(emailEl, { target: { value: email } });
  fireEvent.change(passwordEl, { target: { value: password } });
  fireEvent.click(btnEl);

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);
  const form = screen.getByRole("form", { name: /login/i });
  expect(form).toHaveClass("loading");
});

test("should invoke handleChange", async () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );

  const { email, password } = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  await userEvent.type(emailEl, email);
  await userEvent.type(passwordEl, password);

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);

  await userEvent.click(btnEl);
  expect(submit).toHaveBeenCalledTimes(1);
  expect(submit).toHaveBeenCalledWith({ email, password });

  const formMsg = screen.queryByRole("alert");
  expect(formMsg).toBeNull();
});

test("shold show error messages", async () => {
  const submit = jest.fn(() => Promise.resolve());
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>
  );

  const { email, password } = buildFormData({
    overrides: {
      email: "noemail",
    },
  });

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  await userEvent.type(emailEl, email);
  await userEvent.type(passwordEl, password);

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);

  await userEvent.click(btnEl);
  expect(submit).toHaveBeenCalledTimes(0);

  const formMsg = screen.getByRole("alert");
  expect(formMsg).not.toBeEmptyDOMElement();

  const form = screen.getByRole("form", { name: /login/i });
  expect(form).not.toHaveClass("loading");
});
